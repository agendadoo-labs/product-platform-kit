"""Portable knowledge/specification integrity gate. Standard library only."""
import argparse
import hashlib
import json
import re
from datetime import date
from pathlib import Path

try:
    from .controls import dependency_fingerprint, project_state
except ImportError:
    import importlib.util
    _spec = importlib.util.spec_from_file_location("knowledge_controls", Path(__file__).with_name("controls.py"))
    _controls = importlib.util.module_from_spec(_spec)
    _spec.loader.exec_module(_controls)
    dependency_fingerprint, project_state = _controls.dependency_fingerprint, _controls.project_state

SCOPES = {'vigente', 'historico', 'candidato', 'referencia'}
STATES = {'draft', 'approved', 'superseded', 'retired'}

def validate(root, manifest, today=None):
    today = today or date.today()
    errors = []
    def require(ok, message):
        if not ok:
            errors.append(message)
    def file(path):
        p = (root / path).resolve()
        if not p.is_relative_to(root.resolve()):
            raise ValueError('path escapes repository: ' + path)
        return p
    def fresh(value, days, label):
        age = (today-date.fromisoformat(value)).days
        require(0 <= age <= days, label + ': observation expired or future dated')
    try:
        require(manifest['schema_version'] in (1, 2), 'unsupported schema version')
        documents = manifest['documents']
        by_id = {d['id']: d for d in documents}
        require(len(by_id) == len(documents), 'duplicate document id')
        require(len({d['path'] for d in documents}) == len(documents), 'duplicate document path')
        require(bool(documents), 'empty document inventory')
        for doc in documents:
            label = doc['id']
            require(doc['graph_scope'] in SCOPES, label + ': invalid graph_scope')
            require(doc['lifecycle'] in STATES, label + ': invalid lifecycle')
            require(bool(doc['owner'].strip()), label + ': missing owner')
            require(bool(doc['purpose'].strip()), label + ': missing purpose')
            require(bool(doc['read_when']) and all(isinstance(x,str) and x.strip() for x in doc['read_when']), label + ': missing reading conditions')
            require(doc['classification'] in {'public','internal','restricted'}, label + ': invalid classification')
            content = file(doc['path']).read_bytes()
            require(hashlib.sha256(content).hexdigest() == doc['sha256'], label + ': content changed')
            require(isinstance(doc['revision'],int) and doc['revision'] > 0, label + ': invalid revision')
            if doc['graph_scope'] == 'vigente':
                require(doc['lifecycle'] == 'approved', label + ': current document is not approved')
                require(not doc.get('superseded_by'), label + ': superseded document is current')
            if doc['lifecycle'] == 'superseded':
                require(doc.get('superseded_by') in by_id, label + ': missing successor')
            for dep in doc.get('depends_on',[]):
                target = by_id.get(dep['id'])
                require(target is not None, label + ': missing dependency')
                if target:
                    require(dep['revision'] == target['revision'], label + ': dependency revision changed; review required')
                    if doc['graph_scope'] == 'vigente':
                        require(target['lifecycle'] == 'approved', label + ': dependency not approved')
            source = doc.get('source')
            if source:
                require(source['commit'] == source['observed_commit'], label + ': remote revision differs')
                require(bool(re.fullmatch('[0-9a-f]{40}',source['commit'])), label + ': invalid commit')
                require(isinstance(source['max_age_days'],int) and 0 <= source['max_age_days'] <= 365, label + ': invalid freshness policy')
                fresh(source['observed_on'],source['max_age_days'],label)
            if content.startswith(b'---\n'):
                block=content.decode().split('\n---\n',1)[0]
                match=re.search(r'^graph_scope:\s*"?([^"\n]+)"?$',block,re.M)
                if match:
                    require(match.group(1).strip() == doc['graph_scope'],label + ': frontmatter classification differs')
        # Dependency cycles prevent finite context/impact traversal.
        visiting, done = set(), set()
        def visit(key):
            if key in visiting:
                errors.append(key + ': dependency cycle');return
            if key in done or key not in by_id:return
            visiting.add(key)
            for dep in by_id[key].get('depends_on',[]):visit(dep['id'])
            visiting.remove(key);done.add(key)
        for key in by_id:visit(key)
        requirements = manifest.get('requirements',[])
        require(len({r['id'] for r in requirements}) == len(requirements),'duplicate requirement id')
        for req in requirements:
            label=req['id']
            require(req['specification'] in by_id,label + ': unknown specification')
            require(bool(req['acceptance'].strip()),label + ': empty acceptance criterion')
            require(req['status'] in {'planned','implemented','verified'},label + ': invalid requirement status')
            if req['status'] in {'implemented','verified'}:
                require(bool(req['implementation']) and bool(req['tests']),label + ': missing implementation or tests')
                for path in req['implementation']+req['tests']:require(file(path).is_file(),label + ': missing artifact '+path)
            if req['status'] == 'verified':
                evidence=req['evidence']
                if manifest['schema_version'] == 2:
                    require(evidence.get('dependency_fingerprint') == dependency_fingerprint(root, manifest, req), label + ': dependency inputs changed; revalidation required')
                require(evidence['result'] == 'passed',label + ': evidence failed')
                require(evidence['spec_revision'] == by_id[req['specification']]['revision'],label + ': evidence refers to old specification')
                require(bool(evidence['command'].strip()),label + ': missing verification command')
                require(evidence['verified_by'] != evidence['implemented_by'],label + ': no separate verification identity')
                fresh(evidence['observed_on'],evidence['max_age_days'],label)
                for artifact in evidence['artifacts']:
                    require(hashlib.sha256(file(artifact['path']).read_bytes()).hexdigest()==artifact['sha256'],label+': evidence artifact changed')
                require(bool(evidence['artifacts']),label + ': missing evidence artifacts')
        # Generated current-state views have exactly one structured authority.
        if manifest['schema_version'] == 2:
            require('current_state' not in manifest, 'v2 prohibits duplicate current_state')
            for path in project_state(root, manifest):
                errors.append(path + ': current-state projection drift')
        state=manifest.get('current_state')
        if state:
            expected=render_state(state)
            for path in manifest.get('state_projections',[]):
                require(file(path).read_text()==expected,path+': current-state projection drift')
    except (KeyError,ValueError,TypeError,OSError,AttributeError) as exc:
        errors.append('invalid knowledge manifest: '+str(exc))
    return errors

def render_state(state):
    return '# Current knowledge checkpoint\n\nCheckpoint: '+state['checkpoint']+'\n\nStatus: '+state['status']+'\n\nNext: '+state['next_action']+'\n'

if __name__ == '__main__':
    p=argparse.ArgumentParser(description=__doc__)
    p.add_argument('--root',type=Path,default=Path.cwd())
    p.add_argument('--manifest',default='.apos/knowledge/catalog.json')
    a=p.parse_args()
    try:
        errors=validate(a.root,json.loads((a.root/a.manifest).read_text()))
    except (OSError,ValueError) as exc:errors=[str(exc)]
    print(json.dumps({'passed':not errors,'errors':errors,'limits':'Explicit inventory; recorded observations only; no runtime, permission or semantic approval certification.'},indent=2))
    raise SystemExit(bool(errors))
