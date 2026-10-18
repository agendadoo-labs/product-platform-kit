"""Validate the unbound optional contract, not consumer adoption or retrieval."""
import hashlib
import json
import re
from pathlib import Path
root=Path(__file__).resolve().parents[1]
read=lambda p:json.loads((root/p).read_text())
x=read('templates/knowledge-projection/manifest.example.json')
assert x['status']=='draft' and x['publishable'] is False
assert x['retrieval']['eligible'] is False
assert all(v is None for v in x['source'].values())
assert x['local_delta']['status']=='unknown'
intent=read('.apos/intents/I-PPK-KNOWLEDGE-001.json')
assert intent['status']=='active'
assert intent['ceremony_selection']['downgrade_allowed'] is False
state=read('.apos/state/product-state.json')
assert intent['id'] in state['candidate_intents'] and intent['id'] not in state['satisfied_intents']
for filename in ['docs/apos/KNOWLEDGE-PROJECTIONS.md','templates/knowledge-projection/README.md']:
 p=root/filename;text=p.read_text()
 assert not re.search(r'/Users/|leo-brain|agendadoo|inteligencia-eleitoral',text)
 for target in re.findall(r'\]\(([^)]+)\)',text):
  if target.startswith(('http:','https:','#')):continue
  assert (p.parent/target).is_file(),target
manifest=read('.apos/context/manifests/I-PPK-KNOWLEDGE-001.json')
assert manifest['status']=='within_budget'
for source in manifest['sources']:
 assert hashlib.sha256((root/source['path']).read_bytes()).hexdigest()==source['sha256'],source['path']
print('Knowledge contract: unbound template, open Intent, local links, neutral scope and context hashes verified.')
