import copy
import hashlib
import json
import sys
import tempfile
import unittest
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
from packages.knowledge_governance.controls import dependency_fingerprint, impact_report, project_state, select_risk, START, END
from packages.knowledge_governance.validate import validate

class Controls(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        docs = []
        for key, deps in [('a', ['b']), ('b', ['c']), ('c', []), ('unrelated', [])]:
            (self.root / key).write_text(key)
            docs.append(dict(id=key, path=key, revision=1, sha256=hashlib.sha256(key.encode()).hexdigest(),
                lifecycle='approved', graph_scope='vigente', owner='maintainer', purpose='test',
                read_when=['test'], classification='public', depends_on=[dict(id=d, revision=1) for d in deps]))
        for path in ['code.py', 'test.py']:
            (self.root/path).write_text('original')
        self.req = dict(id='r', specification='a', acceptance='accept', status='implemented', implementation=['code.py'], tests=['test.py'])
        self.m = dict(schema_version=2, documents=docs, requirements=[self.req],
                      current_state_ref=dict(path='state.json', keys=['knowledge_checkpoint']), state_projections=['view.md'])
        self.state = dict(checkpoint='CP', status='tested', next_action='review')
        (self.root/'state.json').write_text(json.dumps(dict(knowledge_checkpoint=self.state)))
        (self.root/'view.md').write_text('Manual before\n'+START+'\n'+END+'\nManual after\n')
        project_state(self.root, self.m, write=True)
    def fingerprint(self):
        return dependency_fingerprint(self.root, self.m, self.req)
    def test_transitive_bytes_without_revision_bump_invalidate(self):
        before=self.fingerprint(); (self.root/'c').write_text('changed')
        self.assertNotEqual(before,self.fingerprint())
    def test_unrelated_changes_do_not_invalidate(self):
        before=self.fingerprint(); (self.root/'unrelated').write_text('changed')
        self.assertEqual(before,self.fingerprint())
    def test_implementation_and_tests_invalidate(self):
        for path in ('code.py','test.py'):
            before=self.fingerprint(); (self.root/path).write_text('changed')
            self.assertNotEqual(before,self.fingerprint())
    def test_acceptance_change_invalidates(self):
        before=self.fingerprint(); self.req['acceptance']='different'
        self.assertNotEqual(before,self.fingerprint())
    def test_revision_change_invalidates(self):
        before=self.fingerprint(); self.m['documents'][2]['revision']=2
        self.assertNotEqual(before,self.fingerprint())
    def test_source_commit_change_invalidates(self):
        before=self.fingerprint(); self.m['documents'][2]['source']={'commit':'a'*40}
        self.assertNotEqual(before,self.fingerprint())
    def test_cycles_rejected(self):
        self.m['documents'][2]['depends_on']=[dict(id='a', revision=1)]
        with self.assertRaises(ValueError):self.fingerprint()
    def test_missing_dependency_rejected(self):
        self.m['documents'][2]['depends_on']=[dict(id='absent', revision=1)]
        with self.assertRaises(KeyError):self.fingerprint()
    def test_path_escape_rejected(self):
        self.m['documents'][0]['path']='../outside'
        with self.assertRaises(ValueError):self.fingerprint()
    def test_report_never_promotes(self):
        self.assertEqual(impact_report(self.root,self.m)[0]['status'],'unverified')
        self.assertEqual(self.req['status'],'implemented')
    def test_verified_evidence_invalidates_after_dependency_change(self):
        from datetime import date
        self.req['status']='verified'
        self.req['evidence']=dict(result='passed',spec_revision=1,command='test',verified_by='reviewer',implemented_by='builder',observed_on=date.today().isoformat(),max_age_days=7,artifacts=[dict(path='test.py',sha256=hashlib.sha256(b'original').hexdigest())],dependency_fingerprint=self.fingerprint())
        self.assertEqual(validate(self.root,self.m),[])
        (self.root/'c').write_text('changed')
        self.m['documents'][2]['sha256']=hashlib.sha256(b'changed').hexdigest()
        self.assertTrue(any('revalidation' in x for x in validate(self.root,self.m)))
        self.assertEqual(impact_report(self.root,self.m)[0]['status'],'revalidation_required')
    def test_projection_idempotent_preserves_manual_text(self):
        self.assertEqual(project_state(self.root,self.m),[])
        self.assertTrue((self.root/'view.md').read_text().endswith('Manual after\n'))
    def test_state_change_detects_drift_then_regenerates(self):
        self.state['checkpoint']='CP2'
        (self.root/'state.json').write_text(json.dumps(dict(knowledge_checkpoint=self.state)))
        self.assertEqual(project_state(self.root,self.m),['view.md'])
        project_state(self.root,self.m,write=True)
        self.assertEqual(project_state(self.root,self.m),[])
    def test_missing_marker_prevents_all_writes(self):
        (self.root/'bad.md').write_text('no markers'); self.m['state_projections'].append('bad.md')
        before=(self.root/'view.md').read_bytes()
        with self.assertRaises(ValueError):project_state(self.root,self.m,write=True)
        self.assertEqual((self.root/'view.md').read_bytes(),before)
    def test_duplicate_marker_rejected(self):
        (self.root/'view.md').write_text(START+START+END)
        with self.assertRaises(ValueError):project_state(self.root,self.m)
    def test_v2_rejects_duplicate_authority(self):
        self.m['current_state']=self.state
        self.assertTrue(any('duplicate current_state' in e for e in validate(self.root,self.m)))
    def test_doc_only_lite_with_lite_floor(self):
        self.assertEqual(select_risk(['docs/how-to.md'],'Lite')['level'],'Lite')
    def test_implementation_standard(self):
        self.assertEqual(select_risk(['apps/demo/main.py'],'Lite')['level'],'Standard')
    def test_governance_and_unknown_strict(self):
        for path in ('.apos/policy.json','.github/workflows/gate.yml','docs/knowledge/contract.md','unknown'):
            self.assertEqual(select_risk([path],'Lite')['level'],'Strict')
    def test_intent_floor_cannot_be_lowered(self):
        self.assertEqual(select_risk(['docs/a.md'],'Strict')['level'],'Strict')
        self.assertEqual(select_risk([])['level'],'Strict')
    def test_invalid_floor_rejected(self):
        with self.assertRaises(ValueError):select_risk([], 'anything')

if __name__=='__main__':unittest.main()
