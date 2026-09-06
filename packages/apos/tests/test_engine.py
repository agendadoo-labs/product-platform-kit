import copy
import json
import sqlite3
import tempfile
import unittest
from pathlib import Path
from apos.core import Engine, ROOT, build_catalog, check_model

class EngineTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.engine = Engine(Path(self.tmp.name) / 'apos.db')
        self.intent = json.loads((ROOT / 'product/intent.json').read_text())
        self.contracts = json.loads((ROOT / 'product/contracts.json').read_text())

    def tearDown(self):
        self.engine.close()
        self.tmp.cleanup()

    def run_intent(self, **kw):
        return self.engine.run(self.intent, self.contracts, 'test', **kw)

    def test_complete_trace(self):
        result = self.run_intent()
        self.assertEqual(result['run']['status'], 'succeeded')
        self.assertEqual(result['state']['revision'], 1)
        self.assertEqual(len(result['evidence']), 5)
        self.assertTrue(all(e['passed'] for e in result['evidence']))
        self.assertEqual(set(result['state']['evidence_ids']), {e['id'] for e in result['evidence']})
        for e in result['evidence']:
            self.assertEqual(e['run_id'], result['run']['id'])
            self.assertEqual(e['artifact_digest'], result['state']['artifact_digest'])
        check_model('ProductState', result['state'])

    def test_replay_does_not_execute(self):
        first = self.run_intent()
        second = self.run_intent(executor=lambda _: self.fail('Reexecuted'))
        self.assertEqual(first, second)

    def test_key_collision_rejected(self):
        self.run_intent()
        self.intent['outcome'] = 'Different outcome'
        with self.assertRaises(ValueError): self.run_intent()

    def test_failed_evidence_preserved_state_unchanged(self):
        result = self.run_intent(executor=lambda _: '# fake\n')
        self.assertEqual(result['run']['status'], 'failed')
        self.assertEqual(self.engine.state()[0]['revision'], 0)
        self.assertEqual(len(result['evidence']), 5)
        self.assertTrue(any(not e['passed'] for e in result['evidence']))

    def test_governance_blocks_before_executor(self):
        for field, value in [('risk','irreversible'),('risk','compensatable'),('impact','high'),('uncertainty','high'),('capability','shell')]:
            with self.subTest(field=field, value=value):
                intent = copy.deepcopy(self.intent); intent[field] = value
                result = self.engine.run(intent, self.contracts, field + value, executor=lambda _: self.fail('Executed'))
                self.assertEqual(result['run']['status'], 'blocked')
                self.assertEqual(result['decision']['outcome'], 'escalate')
                self.assertEqual(result['state']['revision'], 0)

    def test_missing_contract_rejected(self):
        self.contracts.pop()
        with self.assertRaises(ValueError): self.run_intent()

    def test_unknown_fields_rejected(self):
        self.intent['approve'] = True
        with self.assertRaises(ValueError): self.run_intent()

    def test_exception_is_failure(self):
        def broken(_): raise RuntimeError('executor failed')
        result = self.run_intent(executor=broken)
        self.assertEqual(result['run']['status'], 'failed')
        self.assertIn('RuntimeError', result['error'])
        self.assertEqual(self.engine.state()[0]['revision'], 0)

    def test_stale_revision_rejected(self):
        with self.assertRaises(ValueError): self.run_intent(expected_revision=9)

    def test_records_are_immutable(self):
        self.run_intent()
        with self.assertRaises(sqlite3.IntegrityError):
            self.engine.db.execute("DELETE FROM records WHERE kind='Evidence'")
        self.engine.db.rollback()

    def test_transaction_failure_publishes_nothing(self):
        self.engine.db.execute("CREATE TRIGGER reject_state BEFORE INSERT ON snapshots BEGIN SELECT RAISE(ABORT,'test failure'); END")
        with self.assertRaises(sqlite3.IntegrityError): self.run_intent()
        self.assertEqual(self.engine.state()[0]['revision'], 0)
        self.assertEqual(self.engine.db.execute('SELECT count(*) FROM records').fetchone()[0], 0)

    def test_reopen_persists_replay(self):
        result = self.run_intent()
        other = Engine(Path(self.tmp.name) / 'apos.db')
        try:
            self.assertEqual(other.run(self.intent, self.contracts, 'test'), result)
        finally: other.close()

if __name__ == '__main__': unittest.main()
