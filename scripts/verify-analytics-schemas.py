"""Structural contract examples; no provider or model-quality certification."""
import copy
import json
from pathlib import Path
from jsonschema import Draft202012Validator, ValidationError
root = Path(__file__).resolve().parents[1]
schemas = {p.stem: json.loads(p.read_text()) for p in (root/'templates/analytics').glob('*.schema.json')}
for schema in schemas.values(): Draft202012Validator.check_schema(schema)
plan = dict(version='1.0',context_hash='a'*64,operation='search',metric='catalog',filters={},group_by=[])
Draft202012Validator(schemas['analysis-plan.schema']).validate(plan)
profile = dict(id='service_hours',revision=1,status='draft',label='Comparable service',matcher='canonical_exact_alias',specification_aliases=['SCOPE X'],attributes={'scope':'X'},normalized_unit='hour',unit_rules=[dict(id='minutes',pattern='minute',multiplier='0.0166666666666667',count_kind='continuous')],missing_specification_policy='exclude',missing_unit_policy='exclude',temporal_basis='service date',review=dict(status='pending',authority='provider',evidence='reference-case'),statistics_policy=dict(min_peer_observations=5,min_peer_entities=3,iqr_multiplier='1.5'),limitations=['Scope equivalence not certified'])
validator = Draft202012Validator(schemas['comparison-profiles.schema'])
validator.validate(dict(version='1.0',profiles=[profile]))
checks=2
for field,value in [('status','approved_by_model'),('revision',0),('specification_aliases',[])]:
 bad=copy.deepcopy(profile);bad[field]=value
 try: validator.validate(dict(version='1.0',profiles=[bad]))
 except ValidationError: checks+=1
 else: raise AssertionError(field)
for multiplier in ['0','-1','NaN']:
 bad=copy.deepcopy(profile);bad['unit_rules'][0]['multiplier']=multiplier
 try: validator.validate(dict(version='1.0',profiles=[bad]))
 except ValidationError: checks+=1
 else: raise AssertionError(multiplier)
try: Draft202012Validator(schemas['analysis-plan.schema']).validate(dict(plan,sql='SELECT 1'))
except ValidationError: checks+=1
else: raise AssertionError('SQL accepted')
print(json.dumps(dict(schemas=len(schemas),behavioral_cases=checks,passed=True)))
