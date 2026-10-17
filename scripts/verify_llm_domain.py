import json
from pathlib import Path
for root in [Path(__file__).resolve().parents[1]]:
 r=Path(root);read=lambda p:json.loads((r/p).read_text())
 d=read('.apos/domains/llm-engineering.json');p=read('.apos/llm/evaluation-policy.json');e=read('.apos/llm/experiment-template.json')
 assert d['id']==p['domain']==e['domain']=='llm_engineering'
 c=read('.apos/context/context-profile.json');reg=read('.apos/epistemic/registry.json')
 ids=[x['id'] for x in c['domains']];assert len(ids)==len(set(ids))
 assert sum(x['domain']=='llm_engineering' for x in reg['domains'])==1
 for x in c['domains']:
  assert all(dep in ids for dep in x.get('dependencies',[]))
 for path in d['artifacts']:assert (r/path).is_file(),path
 assert p['gates']['missing_gate']=='not_eligible'
 assert e['promotion']['status']=='not_eligible' and e['promotion']['reviewer'] is None
 assert all(v is None for v in e['limits'].values())
 assert p['gates']['critical_errors_max']==0
 assert d['freshness_triggers']==p['required_fingerprints']
 print(r.name+': domain, references, dependencies, metrics, fail-closed experiment verified')
