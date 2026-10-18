import copy
import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path
from analyze import analyze


def row(i, value, entity=None):
    return dict(id=str(i), entity_id=entity or str(i), cohort='reviewed-peer-group', period='2026-09', metric='staplers_per_employee', unit='item/person', denominator_kind='active_people', stage='delivered', numerator_source='fixture-n', denominator_source='fixture-d', numerator=str(value), denominator='1', comparable=True, period_aligned=True)


def payload(rows):
    return dict(schema_version=1, parameters=dict(min_peers=10, iqr_multiplier='1.5', median_ratio='1.3'), rows=rows)


class AnalysisTests(unittest.TestCase):
    def test_extreme_target_excluded_from_reference(self):
        r=analyze(payload([row(i,i) for i in range(1,11)]+[row(99,100)]))['results'][-1]
        self.assertEqual(r['reference_count'],10);self.assertEqual(r['median'],'5.5');self.assertEqual(r['status'],'above_reference_review_candidate')
    def test_four_municipalities_insufficient(self):
        self.assertTrue(all(r['status']=='insufficient_reference' for r in analyze(payload([row(i,i) for i in range(1,5)]))['results']))
    def test_twenty_staplers_is_descriptive(self):
        r=row(1,10000);r['denominator']='500'
        result=analyze(payload([r]))['results'][0];self.assertEqual(result['ratio'],'20');self.assertEqual(result['status'],'insufficient_reference')
    def test_missing_and_zero_denominators(self):
        for value in [None,0,'NaN','Infinity',False,-1]:
            r=row(1,2);r['denominator']=value
            self.assertEqual(analyze(payload([r]))['results'][0]['status'],'insufficient_data')
    def test_zero_numerator_not_missing(self):
        self.assertEqual(analyze(payload([row(1,0)]))['results'][0]['ratio'],'0')
    def test_locale_not_inferred(self):
        self.assertEqual(analyze(payload([row(1,'1.000,00')]))['results'][0]['status'],'insufficient_data')
    def test_duplicate_observation_rejected(self):
        with self.assertRaises(ValueError):analyze(payload([row(1,1),row(1,2)]))
    def test_repeated_entities_not_independent(self):
        rows=[row(i,i,'same-entity') for i in range(1,12)]+[row(99,100)]
        r=analyze(payload(rows))['results'][-1];self.assertEqual(r['reference_count'],0);self.assertEqual(r['excluded_ambiguous_peer_entities'],1)
    def test_period_and_stage_never_mixed(self):
        for field in ['cohort','period','metric','unit','denominator_kind','stage']:
            rows=[row(i,i) for i in range(1,11)]+[row(99,100)];rows[-1][field]='different'
            self.assertEqual(analyze(payload(rows))['results'][-1]['reference_count'],0)
    def test_quality_flag_required(self):
        for field in ['comparable','period_aligned']:
            r=row(1,1);r[field]=False;self.assertEqual(analyze(payload([r]))['results'][0]['status'],'insufficient_data')
    def test_all_equal_reference_degenerate(self):
        rows=[row(i,1) for i in range(1,11)]+[row(99,100)]
        self.assertEqual(analyze(payload(rows))['results'][-1]['status'],'degenerate_reference')
    def test_no_unknown_personal_fields(self):
        r=row(1,1);r['person_name']='not allowed'
        with self.assertRaises(ValueError):analyze(payload([r]))
    def test_parameters_explicit(self):
        p=payload([]);p['parameters']={}
        with self.assertRaises(ValueError):analyze(p)
    def test_deterministic_no_overwrite_cli(self):
        with tempfile.TemporaryDirectory() as directory:
            d=Path(directory);source=d/'input.json';source.write_text(json.dumps(payload([row(1,10)])))
            script=Path(__file__).with_name('analyze.py')
            for filename in ['one.json','two.json']:
                subprocess.run([sys.executable,str(script),str(source),'--output',str(d/filename)],check=True,capture_output=True)
            self.assertEqual((d/'one.json').read_bytes(),(d/'two.json').read_bytes())
            failed=subprocess.run([sys.executable,str(script),str(source),'--output',str(d/'one.json')],capture_output=True)
            self.assertNotEqual(failed.returncode,0)

if __name__=='__main__':unittest.main()
