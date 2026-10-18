"""Explicit projections/impact and risk-based checks. Git base is required for gate."""
import argparse
import json
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
from packages.knowledge_governance.controls import impact_report, project_state, select_risk, LEVELS
from packages.knowledge_governance.validate import validate


def git(*args):
    return subprocess.check_output(['git', '-C', str(ROOT), *args]).decode()


def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument('action', choices=['check', 'project', 'impact', 'gate'])
    p.add_argument('--base', help='Trusted CI event base commit; mandatory for gate')
    p.add_argument('--intent', default='I-PPK-KNOWLEDGE-001')
    a = p.parse_args()
    manifest = json.loads((ROOT / '.apos/knowledge/catalog.json').read_text())
    if a.action == 'project':
        print(json.dumps({'updated': project_state(ROOT, manifest, write=True)})); return
    if a.action == 'impact':
        print(json.dumps(impact_report(ROOT, manifest), indent=2)); return
    errors = validate(ROOT, manifest)
    if errors:
        raise ValueError('; '.join(errors))
    if a.action == 'check':
        print('Knowledge controls passed'); return
    if not a.base or not re.fullmatch('[0-9a-f]{40}', a.base) or a.base == '0' * 40:
        raise ValueError('gate needs a trusted full base SHA; no silent Lite fallback')
    if not re.fullmatch('[A-Za-z0-9-]+', a.intent):
        raise ValueError('invalid intent ID')
    # Both old and new intent floors apply. Removing or changing a floor cannot lower it.
    floors = []
    path = '.apos/intents/' + a.intent + '.json'
    for content in (git('show', a.base + ':' + path), (ROOT / path).read_text()):
        intent = json.loads(content)
        value = intent.get('ceremony_selection', intent.get('ceremony', 'Strict'))
        if isinstance(value, dict):
            value = value.get('level', 'Strict')
        floors.append(str(value).capitalize())
    floor = max(floors, key=LEVELS.index)
    paths = git('diff', '--no-renames', '--name-only', '-z', a.base, 'HEAD').split('\0')
    report = select_risk([p for p in paths if p], floor)
    print(json.dumps(report, indent=2), flush=True)
    # Mandatory integrity floor remains on every level. Existing other CI stays active.
    checks = [[sys.executable, 'scripts/verify_document_metadata.py']]
    if report['level'] in ('Standard', 'Strict'):
        checks.append([sys.executable, '-m', 'unittest', 'discover', '-s', 'scripts/tests', '-p', 'test_knowledge*.py', '-v'])
    if report['level'] == 'Strict':
        checks += [['npm', 'run', 'check'], ['npm', 'run', 'test:apos']]
    for command in checks:
        subprocess.run(command, cwd=ROOT, check=True)

if __name__ == '__main__':
    try:
        main()
    except (OSError, ValueError, KeyError, TypeError, subprocess.CalledProcessError) as exc:
        print('Knowledge controls failed: ' + str(exc), file=sys.stderr)
        sys.exit(1)
