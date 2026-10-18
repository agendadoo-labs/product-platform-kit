"""Validate documentary reading routes; never execute retrieved instructions."""
import argparse
import json
from pathlib import Path

BASELINE = ['AGENTS.md', 'templates/apos/APOS-MAINTENANCE.md', '.apos/active-model.json', '.apos/state/product-state.json']
ROLES = {'governing', 'procedure', 'current_state', 'architecture', 'template', 'plan', 'evidence', 'reference'}

def validate(root, manifest=None):
    root = Path(root).resolve()
    data = manifest if manifest is not None else json.loads((root/'docs/reading-routes.json').read_text())
    errors = []
    if data.get('baseline') != BASELINE:
        errors.append('baseline must retain the ordered agent, maintenance, active-model and state sources')
    domains = {d['id'] for d in json.loads((root/'.apos/context/context-profile.json').read_text())['domains']}
    ids = set()
    def check_path(value):
        if not isinstance(value, str) or not value:
            errors.append('invalid source path'); return
        path = Path(value)
        if path.is_absolute() or not (root/path).resolve().is_relative_to(root):
            errors.append('source escapes repository: '+value)
        elif not (root/path).is_file():
            errors.append('source missing: '+value)
    for p in data.get('baseline', []): check_path(p)
    for route in data.get('routes', []):
        ident = route.get('id')
        if not ident or ident in ids: errors.append('missing or duplicate route ID')
        ids.add(ident)
        for key in ('purpose', 'stop_when', 'do_not_infer'):
            if not isinstance(route.get(key), str) or not route[key].strip(): errors.append(str(ident)+': missing '+key)
        selected = route.get('domains', [])
        if not selected or any(d not in domains for d in selected): errors.append(str(ident)+': unknown or missing domain')
        steps = route.get('read_order', [])
        if not steps: errors.append(str(ident)+': no reading steps')
        seen = set()
        for step in steps:
            check_path(step.get('path'))
            if step.get('role') not in ROLES: errors.append(str(ident)+': unknown source role')
            if step.get('path') in seen: errors.append(str(ident)+': duplicate reading step')
            seen.add(step.get('path'))
    if not ids: errors.append('no routes')
    return errors

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--route')
    args = parser.parse_args()
    root = Path(__file__).resolve().parents[1]
    manifest = json.loads((root/'docs/reading-routes.json').read_text())
    errors = validate(root, manifest)
    if errors: raise SystemExit('\n'.join(errors))
    if args.route:
        route = next((r for r in manifest['routes'] if r['id'] == args.route), None)
        if route is None: raise SystemExit('unknown route: '+args.route)
        print(json.dumps({'baseline':manifest['baseline'], **route}, ensure_ascii=False, indent=2))
    else: print('Reading routes validated: '+str(len(manifest['routes'])))
