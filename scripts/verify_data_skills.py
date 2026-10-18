"""Verify exact contents of the candidate data skill bundles."""
import hashlib,json
from pathlib import Path
root=Path(__file__).resolve().parents[1]
registry=json.loads((root/'.apos/skills/data-skills.json').read_text())
seen=set()
for skill in registry['skills']:
 assert skill['id'] not in seen
 seen.add(skill['id'])
 folder=(root/skill['path']).resolve()
 assert root in folder.parents
 actual={str(p.relative_to(folder)):hashlib.sha256(p.read_bytes()).hexdigest() for p in folder.rglob('*') if p.is_file() and '__pycache__' not in p.parts and p.suffix!='.pyc'}
 assert actual==skill['files'],skill['id']
 assert (folder/'SKILL.md').read_text().startswith('---\nname: '+skill['id']+'\n'),skill['id']
print('Verified',len(seen),'skill bundles and exact SHA-256 manifests; no runtime adoption implied.')
