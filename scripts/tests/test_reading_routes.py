import copy
import importlib.util
import json
from pathlib import Path
import unittest

ROOT = Path(__file__).resolve().parents[2]
spec = importlib.util.spec_from_file_location('routes', ROOT/'scripts/verify_reading_routes.py')
module = importlib.util.module_from_spec(spec); spec.loader.exec_module(module)

class ReadingContractTests(unittest.TestCase):
    def setUp(self): self.data = json.loads((ROOT/'docs/reading-routes.json').read_text())
    def test_actual_routes_resolve(self): self.assertEqual(module.validate(ROOT, self.data), [])
    def test_cannot_drop_governing_context(self):
        self.data['baseline'].remove('.apos/active-model.json')
        self.assertTrue(any('baseline' in e for e in module.validate(ROOT, self.data)))
    def test_cannot_reference_outside_repository(self):
        self.data['routes'][0]['read_order'][0]['path'] = '../../private.md'
        self.assertTrue(any('escapes' in e for e in module.validate(ROOT, self.data)))
    def test_missing_document_is_not_silently_ignored(self):
        self.data['routes'][0]['read_order'][0]['path'] = 'docs/absent-document.md'
        self.assertTrue(any('missing' in e for e in module.validate(ROOT, self.data)))
    def test_domain_must_exist_in_active_profile(self):
        self.data['routes'][0]['domains'] = ['invented_domain']
        self.assertTrue(any('domain' in e for e in module.validate(ROOT, self.data)))
    def test_route_identity_is_unambiguous(self):
        self.data['routes'].append(copy.deepcopy(self.data['routes'][0]))
        self.assertTrue(any('duplicate route' in e for e in module.validate(ROOT, self.data)))
if __name__ == '__main__': unittest.main()
