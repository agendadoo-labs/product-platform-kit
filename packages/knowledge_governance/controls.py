"""Dependency evidence, single-source projections and conservative risk selection."""
import hashlib
import json
from pathlib import Path

START = '<!-- knowledge-state:start -->'
END = '<!-- knowledge-state:end -->'
LEVELS = ('Lite', 'Standard', 'Strict')


def safe_file(root, path):
    root = Path(root).resolve()
    target = (root / path).resolve()
    if not target.is_relative_to(root):
        raise ValueError('path escapes repository: ' + path)
    return target


def digest(value):
    return hashlib.sha256(json.dumps(value, sort_keys=True, separators=(',', ':'), ensure_ascii=False).encode()).hexdigest()


def dependency_fingerprint(root, manifest, requirement):
    """Bind evidence to actual transitive inputs, not only declared revisions."""
    documents = {d['id']: d for d in manifest['documents']}
    visited, active, inputs = set(), set(), []
    def visit(key):
        if key in active:
            raise ValueError('dependency cycle: ' + key)
        if key in visited:
            return
        doc = documents[key]
        active.add(key)
        for dep in doc.get('depends_on', []):
            visit(dep['id'])
        active.remove(key)
        visited.add(key)
        inputs.append({k: doc.get(k) for k in ('id', 'revision', 'lifecycle', 'graph_scope', 'depends_on')})
        inputs[-1]['sha256'] = hashlib.sha256(safe_file(root, doc['path']).read_bytes()).hexdigest()
        # Observation dates are freshness, not semantic changes. Commits are inputs.
        inputs[-1]['source_commit'] = doc.get('source', {}).get('commit')
    visit(requirement['specification'])
    artifacts = {p: hashlib.sha256(safe_file(root, p).read_bytes()).hexdigest()
                 for p in sorted(set(requirement.get('implementation', []) + requirement.get('tests', [])))}
    return digest({'documents': sorted(inputs, key=lambda d: d['id']), 'artifacts': artifacts,
                   'acceptance': requirement['acceptance'], 'specification': requirement['specification'],
                   'id': requirement['id']})


def impact_report(root, manifest):
    result = []
    for req in manifest.get('requirements', []):
        fingerprint = dependency_fingerprint(root, manifest, req)
        recorded = req.get('evidence', {}).get('dependency_fingerprint')
        result.append({'requirement': req['id'], 'fingerprint': fingerprint,
                       'status': 'unverified' if req['status'] != 'verified' else
                       ('current' if recorded == fingerprint else 'revalidation_required')})
    return result


def resolve_state(root, manifest):
    ref = manifest['current_state_ref']
    value = json.loads(safe_file(root, ref['path']).read_text())
    for key in ref['keys']:
        value = value[key]
    for key in ('checkpoint', 'status', 'next_action'):
        if not isinstance(value[key], str) or not value[key].strip() or '\n' in value[key]:
            raise ValueError('invalid state field: ' + key)
    return value


def state_block(state):
    return START + '\n\nCheckpoint: ' + state['checkpoint'] + '\n\nStatus: ' + state['status'] + '\n\nNext: ' + state['next_action'] + '\n\n' + END


def replace_block(content, state):
    if content.count(START) != 1 or content.count(END) != 1:
        raise ValueError('exactly one state marker pair required')
    start, end = content.index(START), content.index(END)
    if end < start:
        raise ValueError('reversed state markers')
    return content[:start] + state_block(state) + content[end + len(END):]


def project_state(root, manifest, write=False):
    state = resolve_state(root, manifest)
    updates = []
    paths = manifest['state_projections']
    if not paths or len(paths) != len(set(paths)):
        raise ValueError('empty or duplicate projections')
    # Validate every target before any write. Never creates a missing marker silently.
    for path in paths:
        target = safe_file(root, path)
        current = target.read_text()
        expected = replace_block(current, state)
        if expected != current:
            updates.append((target, expected, path))
    if write:
        for target, expected, _ in updates:
            target.write_text(expected)
    return [path for _, _, path in updates]


def select_risk(paths, floor='Strict'):
    if floor not in LEVELS:
        raise ValueError('unknown ceremony floor')
    level = LEVELS.index(floor)
    reasons = []
    for path in sorted(set(paths)):
        # Only explanatory docs are eligible for Lite. Governed docs are contracts.
        if path.startswith(('docs/knowledge/', '.apos/', '.github/', 'packages/knowledge_governance/', 'scripts/')):
            risk = 2
        elif path.startswith('docs/') and path.endswith('.md'):
            risk = 0
        elif path.startswith(('packages/', 'apps/')):
            risk = 1
        else:
            risk = 2  # unknown, entrypoint or policy changes fail conservatively
        level = max(level, risk)
        reasons.append({'path': path, 'minimum': LEVELS[risk]})
    return {'level': LEVELS[level], 'floor': floor, 'reasons': reasons,
            'limits': 'Technical gate only; never grants authority or independent acceptance.'}
