"""APOS v0.1: bounded local execution and atomic evidence-backed state."""
import hashlib
import json
import sqlite3
import uuid
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DOMAINS = ('Intent', 'Contract', 'Evidence', 'Decision', 'AgentRun', 'ProductState')
CHECKS = ('domain_coverage', 'readable_catalog', 'valid_schemas', 'unique_domains', 'bounded_artifact')

def canonical(value):
    return json.dumps(value, sort_keys=True, separators=(',', ':'), ensure_ascii=False)

def digest(value):
    return hashlib.sha256(canonical(value).encode()).hexdigest()

def validate(value, schema):
    """Validate the closed JSON Schema profile used by this repository."""
    allowed = {'$schema', '$id', 'title', 'type', 'additionalProperties', 'required', 'properties', 'items', 'uniqueItems', 'enum', 'minLength', 'minimum'}
    if set(schema) - allowed:
        raise ValueError('Unsupported schema keyword')
    types = {'object': dict, 'array': list, 'string': str, 'integer': int, 'boolean': bool}
    if schema.get('type') not in types or type(value) is not types[schema['type']]:
        raise ValueError('Invalid type')
    if 'enum' in schema and value not in schema['enum']:
        raise ValueError('Invalid enum')
    if isinstance(value, str) and len(value) < schema.get('minLength', 0):
        raise ValueError('Empty string')
    if type(value) is int and value < schema.get('minimum', value):
        raise ValueError('Below minimum')
    if isinstance(value, dict):
        props = schema.get('properties', {})
        if set(schema.get('required', [])) - value.keys():
            raise ValueError('Missing required field')
        if schema.get('additionalProperties') is False and value.keys() - props.keys():
            raise ValueError('Unknown field')
        for k, v in value.items():
            if k in props:
                validate(v, props[k])
    if isinstance(value, list):
        if schema.get('uniqueItems') and len({canonical(v) for v in value}) != len(value):
            raise ValueError('Duplicate item')
        for v in value:
            validate(v, schema['items'])

def schema_for(name):
    return json.loads((ROOT / 'schemas' / (name + '.schema.json')).read_text())

def check_model(name, value):
    validate(value, schema_for(name))

def build_catalog(schemas):
    """Pure executor: returns a candidate, has no store or shell access."""
    return '# APOS Domain Catalog\n\n' + '\n'.join('- ' + s['title'] for s in schemas) + '\n'

def verify(check, candidate, schemas):
    """Trusted verifier evaluates observed bytes, never executor success claims."""
    lines = candidate.splitlines()
    entries = [line[2:] for line in lines if line.startswith('- ')]
    if check == 'domain_coverage':
        return set(entries) == set(DOMAINS)
    if check == 'readable_catalog':
        return lines[:2] == ['# APOS Domain Catalog', ''] and len(lines) == 8
    if check == 'unique_domains':
        return len(entries) == len(set(entries)) == 6
    if check == 'bounded_artifact':
        return len(candidate.encode()) <= 4096
    if check == 'valid_schemas':
        return len(schemas) == 6 and all(s.get('title') == n and s.get('type') == 'object' and s.get('additionalProperties') is False and set(s.get('required', [])) == set(s.get('properties', {})) and bool(s.get('properties')) for s, n in zip(schemas, DOMAINS))
    raise ValueError('Unknown verifier')

class Engine:
    def __init__(self, path):
        self.db = sqlite3.connect(path, timeout=10)
        self.db.execute('PRAGMA foreign_keys=ON')
        self.db.executescript('''
        CREATE TABLE IF NOT EXISTS records (
          kind TEXT NOT NULL, id TEXT NOT NULL, body TEXT NOT NULL,
          PRIMARY KEY(kind,id));
        CREATE TABLE IF NOT EXISTS executions (
          key TEXT PRIMARY KEY, input_digest TEXT NOT NULL, result TEXT NOT NULL);
        CREATE TABLE IF NOT EXISTS snapshots (
          revision INTEGER PRIMARY KEY, state TEXT NOT NULL, artifact TEXT NOT NULL);
        CREATE TRIGGER IF NOT EXISTS immutable_records_update BEFORE UPDATE ON records
          BEGIN SELECT RAISE(ABORT,'immutable record'); END;
        CREATE TRIGGER IF NOT EXISTS immutable_records_delete BEFORE DELETE ON records
          BEGIN SELECT RAISE(ABORT,'immutable record'); END;
        ''')
        with self.db:
            self.db.execute('INSERT OR IGNORE INTO snapshots VALUES (0, ?, ?)', (canonical(dict(id='product-platform-kit', revision=0, satisfied_intents=[], evidence_ids=[], artifact_digest=digest(''))), ''))

    def close(self):
        self.db.close()

    def state(self):
        row = self.db.execute('SELECT state,artifact FROM snapshots ORDER BY revision DESC LIMIT 1').fetchone()
        return json.loads(row[0]), row[1]

    def record(self, kind, value):
        check_model(kind, value)
        self.db.execute('INSERT INTO records VALUES (?,?,?)', (kind, value['id'], canonical(value)))

    def run(self, intent, contracts, key, executor=build_catalog, expected_revision=None):
        check_model('Intent', intent)
        for c in contracts:
            check_model('Contract', c)
        ids = [c['id'] for c in contracts]
        if len(ids) != len(set(ids)) or set(ids) != set(intent['contract_ids']):
            raise ValueError('Contracts must resolve exactly and uniquely')
        if {c['check'] for c in contracts} != set(CHECKS) or len(contracts) != 5:
            raise ValueError('All five v0.1 checks are mandatory')
        if intent['status'] != 'proposed':
            raise ValueError('Only proposed intents execute')
        schemas = [schema_for(n) for n in DOMAINS]
        fingerprint = digest([intent, contracts, schemas, 'apos-policy-0.1'])
        self.db.execute('BEGIN IMMEDIATE')
        try:
            prior = self.db.execute('SELECT input_digest,result FROM executions WHERE key=?', (key,)).fetchone()
            if prior:
                if prior[0] != fingerprint:
                    raise ValueError('Idempotency key reused with different inputs')
                self.db.rollback()
                return json.loads(prior[1])
            state, previous = self.state()
            if expected_revision is not None and expected_revision != state['revision']:
                raise ValueError('Stale product state')
            if intent['id'] in state['satisfied_intents']:
                raise ValueError('Intent already satisfied; propose a new version')
            now = datetime.now(timezone.utc).isoformat()
            run_id = str(uuid.uuid4())
            allowed = intent['risk'] == 'reversible' and intent['impact'] == 'low' and intent['uncertainty'] == 'low' and intent['capability'] == 'build-domain-catalog'
            decision = dict(id=str(uuid.uuid4()), intent_id=intent['id'], run_id=run_id, outcome='allow' if allowed else 'escalate', rationale='Bounded local candidate with atomic publication' if allowed else 'Outside local reversible capability; human judgment required', alternatives=['Defer execution', 'Revise intent to supported local scope'], input_digest=fingerprint, actor='apos-policy-0.1', created_at=now)
            self.record('Decision', decision)
            status, evidence, candidate = 'blocked', [], previous
            error = None
            if allowed:
                try:
                    candidate = executor(schemas)
                    if not isinstance(candidate, str):
                        raise ValueError('Executor must return text')
                    for contract in contracts:
                        passed = verify(contract['check'], candidate, schemas)
                        item = dict(id=str(uuid.uuid4()), intent_id=intent['id'], run_id=run_id, contract_id=contract['id'], passed=passed, observed=f"{contract['check']}: {passed}", artifact_digest=digest(candidate), verifier='apos-verifier-0.1', created_at=now)
                        self.record('Evidence', item)
                        evidence.append(item)
                    status = 'succeeded' if all(e['passed'] for e in evidence) else 'failed'
                except Exception as exc:
                    status, error = 'failed', type(exc).__name__ + ': ' + str(exc)
            run = dict(id=run_id, intent_id=intent['id'], status=status, capability=intent['capability'], input_digest=fingerprint, base_revision=state['revision'], created_at=now)
            self.record('AgentRun', run)
            if status == 'succeeded':
                state = dict(id=state['id'], revision=state['revision'] + 1, satisfied_intents=state['satisfied_intents'] + [intent['id']], evidence_ids=state['evidence_ids'] + [e['id'] for e in evidence], artifact_digest=digest(candidate))
                check_model('ProductState', state)
                self.db.execute('INSERT INTO snapshots VALUES (?,?,?)', (state['revision'], canonical(state), candidate))
            result = dict(run=run, decision=decision, evidence=evidence, state=state, error=error, inputs=dict(intent=intent, contracts=contracts, schemas=schemas))
            self.db.execute('INSERT INTO executions VALUES (?,?,?)', (key, fingerprint, canonical(result)))
            self.db.commit()
            return result
        except BaseException:
            self.db.rollback()
            raise
