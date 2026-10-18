import copy,io,json,tempfile,unittest
from pathlib import Path
from urllib.error import HTTPError,URLError
from ingest import collect,IngestionError,validate,encoded,digest,retry_delay,NoRedirect

def job():
 return dict(source_id='test-aggregate',url='https://example.gov.br/data',allowed_hosts=['example.gov.br'],reference_period='2026-09',schema_version='v1',json_type='array',record_schema={'count':'integer'},classification='public_non_personal',max_attempts=3,max_bytes=1000,timeout_seconds=2,min_interval_seconds=0,max_retry_wait_seconds=10,max_total_seconds=20)
class Response(io.BytesIO):
 status=200
 def __init__(self,b=b'[{"count":1}]',headers=None):super().__init__(b);self.headers=headers or {'ETag':'"one"'}
class Fake:
 def __init__(self,steps):self.steps=list(steps);self.calls=[]
 def __call__(self,request,**kw):
  self.calls.append(dict(request.header_items()));x=self.steps.pop(0)
  if isinstance(x,Exception):raise x
  return x
class Tests(unittest.TestCase):
 def setUp(self):self.temp=tempfile.TemporaryDirectory();self.addCleanup(self.temp.cleanup);self.folder=Path(self.temp.name)
 def runjob(self,opener,**kw):return collect(job(),self.folder,opener=opener,sleep=lambda _:None,jitter=lambda:0,**kw)
 def test_snapshot_offline_hash(self):
  original=self.runjob(Fake([Response()]));offline=self.runjob(Fake([]),offline=True);self.assertEqual(original['sha256'],offline['sha256']);self.assertEqual(original['lineage']['transformation'],'identity')
 def test_304_conditional(self):
  self.runjob(Fake([Response()]));fake=Fake([HTTPError(job()['url'],304,'',{},None)]);self.runjob(fake);self.assertEqual(fake.calls[0]['If-none-match'],'"one"')
 def test_304_without_cache(self):
  with self.assertRaises(IngestionError):self.runjob(Fake([HTTPError(job()['url'],304,'',{},None)]))
 def test_retry_503_then_success(self):
  fake=Fake([HTTPError(job()['url'],503,'',{},None),Response()]);self.runjob(fake);self.assertEqual(len(fake.calls),2)
 def test_429_respects_retry_after(self):
  waits=[];fake=Fake([HTTPError(job()['url'],429,'',{'Retry-After':'3'},None),Response()]);collect(job(),self.folder,opener=fake,sleep=waits.append,jitter=lambda:0);self.assertIn(3,waits)
 def test_long_retry_after_defers(self):
  fake=Fake([HTTPError(job()['url'],429,'',{'Retry-After':'120'},None)])
  with self.assertRaisesRegex(IngestionError,'deferred'):self.runjob(fake)
  self.assertEqual(len(fake.calls),1)
 def test_permanent_error_not_retried(self):
  fake=Fake([HTTPError(job()['url'],404,'',{},None)])
  with self.assertRaises(IngestionError):self.runjob(fake)
  self.assertEqual(len(fake.calls),1)
 def test_transport_attempt_cap(self):
  fake=Fake([URLError('failure')]*3)
  with self.assertRaises(IngestionError):self.runjob(fake)
  self.assertEqual(len(fake.calls),3)
 def test_schema_failure_preserves_last_good(self):
  good=self.runjob(Fake([Response()]));latest=self.folder/digest(encoded(job()))/'latest.json';before=latest.read_bytes()
  with self.assertRaises(IngestionError):self.runjob(Fake([Response(b'[{"count":"bad"}]')]))
  self.assertEqual(latest.read_bytes(),before)
 def test_bounded_body(self):
  with self.assertRaisesRegex(IngestionError,'too_large'):self.runjob(Fake([Response(b' '*1001)]))
 def test_corrupt_cache_fails_closed(self):
  m=self.runjob(Fake([Response()]));p=self.folder/digest(encoded(job()))/(m['sha256']+'.json');p.write_bytes(b'[]')
  with self.assertRaisesRegex(IngestionError,'hash_mismatch'):self.runjob(Fake([]),offline=True)
 def test_missing_cache(self):
  with self.assertRaisesRegex(IngestionError,'cache_miss'):self.runjob(Fake([]),offline=True)
 def test_lock_does_not_get_deleted_by_second_writer(self):
  b=self.folder/digest(encoded(job()));b.mkdir();lock=b/'writer.lock';lock.write_text('')
  with self.assertRaisesRegex(IngestionError,'writer_locked'):self.runjob(Fake([]))
  self.assertTrue(lock.exists())
 def test_failure_event_and_lock_release(self):
  with self.assertRaises(IngestionError):self.runjob(Fake([Response(b'not-json')]))
  b=self.folder/digest(encoded(job()));self.assertFalse((b/'writer.lock').exists());self.assertEqual(json.loads(next(b.glob('*.events.json')).read_text())[-1]['event'],'FAIL')
 def test_sensitive_or_nonapproved_jobs_refused(self):
  for field,value in [('classification','personal'),('url','http://example.gov.br/x'),('url','https://evil.example/x'),('url','https://example.gov.br/x?token=a')]:
   j=job();j[field]=value
   with self.assertRaises(IngestionError):validate(j)
 def test_redirect_refused(self):
  with self.assertRaises(IngestionError):NoRedirect().redirect_request(None,None,302,'',{},'https://evil.example/')
 def test_boolean_not_integer(self):
  with self.assertRaisesRegex(IngestionError,'schema'):self.runjob(Fake([Response(b'[{"count":true}]')]))
 def test_empty_array_is_resource_empty_not_no_municipal_activity(self):
  m=self.runjob(Fake([Response(b'[]')]));self.assertEqual(m['row_count'],0);self.assertIn('not_dataset_complete',m['coverage'])
if __name__=='__main__':unittest.main()
