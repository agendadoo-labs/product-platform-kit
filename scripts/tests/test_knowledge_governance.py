import copy
import hashlib
import importlib.util
import tempfile
import unittest
from datetime import date
from pathlib import Path

spec=importlib.util.spec_from_file_location('kg',Path(__file__).resolve().parents[2]/'packages/knowledge_governance/validate.py')
kg=importlib.util.module_from_spec(spec);spec.loader.exec_module(kg)

class KnowledgeGovernanceTests(unittest.TestCase):
    def setUp(self):
        self.tmp=tempfile.TemporaryDirectory();self.addCleanup(self.tmp.cleanup);self.root=Path(self.tmp.name)
        (self.root/'spec.md').write_text('specification')
        (self.root/'impl.py').write_text('implementation')
        (self.root/'test.py').write_text('test')
        self.doc={'id':'S1','path':'spec.md','sha256':hashlib.sha256(b'specification').hexdigest(),'revision':1,'graph_scope':'vigente','lifecycle':'approved','owner':'team','purpose':'Specify behavior','read_when':['Implement feature'],'classification':'internal','depends_on':[]}
        self.m={'schema_version':1,'documents':[self.doc],'requirements':[],'current_state':{'checkpoint':'CP-1','status':'candidate','next_action':'review'},'state_projections':['current.md']}
        (self.root/'current.md').write_text(kg.render_state(self.m['current_state']))
    def errors(self):return '\n'.join(kg.validate(self.root,self.m,date(2026,10,18)))
    def test_valid_inventory(self):self.assertEqual(self.errors(),'')
    def test_content_drift(self):
        (self.root/'spec.md').write_text('changed');self.assertIn('content changed',self.errors())
    def test_historical_cannot_be_current(self):
        self.doc['lifecycle']='superseded';self.assertIn('not approved',self.errors())
    def test_missing_owner(self):
        self.doc['owner']='';self.assertIn('missing owner',self.errors())
    def test_duplicate_id(self):
        self.m['documents'].append(copy.deepcopy(self.doc));self.assertIn('duplicate document id',self.errors())
    def test_dependency_version_changed(self):
        self.doc['depends_on']=[{'id':'S1','revision':2}];self.assertIn('dependency revision changed',self.errors())
    def test_dependency_cycle(self):
        self.doc['depends_on']=[{'id':'S1','revision':1}];self.assertIn('dependency cycle',self.errors())
    def test_missing_dependency(self):
        self.doc['depends_on']=[{'id':'missing','revision':1}];self.assertIn('missing dependency',self.errors())
    def test_stale_observation(self):
        self.doc['source']={'commit':'a'*40,'observed_commit':'a'*40,'observed_on':'2026-10-01','max_age_days':7};self.assertIn('expired',self.errors())
    def test_changed_remote(self):
        self.doc['source']={'commit':'a'*40,'observed_commit':'b'*40,'observed_on':'2026-10-18','max_age_days':7};self.assertIn('remote revision differs',self.errors())
    def test_projection_conflict(self):
        (self.root/'current.md').write_text('CP-0');self.assertIn('projection drift',self.errors())
    def test_path_escape(self):
        self.doc['path']='../outside';self.assertIn('escapes repository',self.errors())
    def test_requirement_without_test(self):
        self.m['requirements']=[{'id':'R1','specification':'S1','acceptance':'Observable result','status':'implemented','implementation':['impl.py'],'tests':[]}];self.assertIn('missing implementation or tests',self.errors())
    def test_verified_requires_separate_evidence(self):
        self.m['requirements']=[{'id':'R1','specification':'S1','acceptance':'Observable result','status':'verified','implementation':['impl.py'],'tests':['test.py'],'evidence':{'result':'passed','spec_revision':1,'command':'test','verified_by':'same','implemented_by':'same','observed_on':'2026-10-18','max_age_days':7,'artifacts':[]}}];self.assertIn('no separate verification identity',self.errors())

if __name__=='__main__':unittest.main()
