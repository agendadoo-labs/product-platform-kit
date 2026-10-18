"""Bounded HTTPS JSON snapshot ingestion; no scheduler or distributed guarantees."""
import argparse
import hashlib
import json
import os
import random
import re
import time
import uuid
from datetime import datetime, timezone
from email.utils import parsedate_to_datetime
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import urlparse, parse_qsl
from urllib.request import Request, build_opener, HTTPRedirectHandler

VERSION = 'public-json-snapshot-v1'
RETRY = {408, 429, 500, 502, 503, 504}

class IngestionError(Exception):
    pass

class NoRedirect(HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        raise IngestionError('redirect_requires_review')

def digest(data): return hashlib.sha256(data).hexdigest()
def now(): return datetime.now(timezone.utc).isoformat()
def encoded(value): return (json.dumps(value, ensure_ascii=False, sort_keys=True, indent=2, allow_nan=False)+'\n').encode()

def atomic(path, data):
    tmp = path.with_name(path.name+'.'+uuid.uuid4().hex+'.tmp')
    try:
        with tmp.open('xb') as f:
            f.write(data); f.flush(); os.fsync(f.fileno())
        os.replace(tmp, path)
    finally:
        tmp.unlink(missing_ok=True)

def validate(job):
    required={'source_id','url','allowed_hosts','reference_period','schema_version','json_type','classification','record_schema','max_attempts','max_bytes','timeout_seconds','min_interval_seconds','max_retry_wait_seconds','max_total_seconds'}
    if set(job) != required: raise IngestionError('job_contract_mismatch')
    if job['classification'] != 'public_non_personal': raise IngestionError('classification_requires_different_adapter')
    if not all(isinstance(job[k],str) and job[k] for k in ['source_id','reference_period','schema_version']): raise IngestionError('missing_source_metadata')
    u=urlparse(job['url'])
    if u.scheme!='https' or u.username or u.password or u.fragment or u.port not in (None,443):raise IngestionError('url_not_public_https')
    hosts=job['allowed_hosts']
    if not isinstance(hosts,list) or not hosts or any(not isinstance(h,str) or not re.fullmatch(r'[a-z0-9.-]+',h) or '.' not in h for h in hosts): raise IngestionError('invalid_host_allowlist')
    if u.hostname not in hosts or u.hostname in ('localhost','127.0.0.1') or re.fullmatch(r'[0-9.]+',u.hostname):raise IngestionError('host_not_allowed')
    if any(re.search(r'token|secret|password|api.?key|authorization',k,re.I) for k,v in parse_qsl(u.query)):raise IngestionError('credential_in_url')
    if not isinstance(job['record_schema'],dict) or any(v not in ('string','number','integer','boolean','array','object') for v in job['record_schema'].values()):raise IngestionError('invalid_record_schema')
    if job['json_type'] not in ('array','object'):raise IngestionError('unsupported_schema')
    for key,low,high in [('max_attempts',1,5),('max_bytes',1,10000000),('timeout_seconds',1,60),('min_interval_seconds',0,60),('max_retry_wait_seconds',0,60),('max_total_seconds',1,300)]:
        value=job[key]
        if type(value) not in (int,float) or not low<=value<=high:raise IngestionError('invalid_limit_'+key)
    if type(job['max_attempts']) is not int or type(job['max_bytes']) is not int:raise IngestionError('integer_limit_required')

def decode(body,kind,schema):
    try:
        value=json.loads(body,parse_constant=lambda x: (_ for _ in ()).throw(ValueError('nonfinite')))
    except (ValueError,UnicodeError):raise IngestionError('invalid_json')
    if not isinstance(value,list if kind=='array' else dict):raise IngestionError('schema_root_mismatch')
    types={'string':str,'number':(int,float),'integer':int,'boolean':bool,'array':list,'object':dict}
    records=value if kind=='array' else [value]
    for record in records:
        for field, expected in schema.items():
            if not isinstance(record,dict) or field not in record or not isinstance(record[field],types[expected]) or (expected in ('number','integer') and isinstance(record[field],bool)):
                raise IngestionError('record_schema_mismatch')
    return value

def retry_delay(headers,attempt,jitter):
    raw=headers.get('Retry-After')
    if raw is not None:
        try:return max(0,float(int(raw)))
        except (ValueError,TypeError):
            try:return max(0,(parsedate_to_datetime(raw)-datetime.now(timezone.utc)).total_seconds())
            except (ValueError,TypeError,OverflowError):raise IngestionError('invalid_retry_after')
    return min(2**attempt,30)+jitter()

def collect(job,folder,offline=False,opener=None,sleep=time.sleep,jitter=random.random):
    validate(job)
    folder=Path(folder);folder.mkdir(parents=True,exist_ok=True)
    key=digest(encoded(job));base=folder/key;base.mkdir(exist_ok=True)
    lock=base/'writer.lock'
    try:fd=os.open(lock,os.O_CREAT|os.O_EXCL|os.O_WRONLY,0o600)
    except FileExistsError:raise IngestionError('writer_locked_inspect_before_recovery')
    os.close(fd)
    run_id=str(uuid.uuid4());start=time.monotonic();events=[];latest=base/'latest.json'
    job_hash=key
    def event(status,**extra):
        rec={'run_id':run_id,'event':status,'at':now(),'job_hash':job_hash,'source_id':job['source_id'],**extra}
        events.append(rec);atomic(base/(run_id+'.events.json'),encoded(events))
    def cached():
        if not latest.exists():return None
        meta=json.loads(latest.read_text());sha=meta.get('sha256','')
        if not re.fullmatch(r'[0-9a-f]{64}',sha):raise IngestionError('invalid_cached_hash')
        body=(base/(sha+'.json')).read_bytes()
        if digest(body)!=sha:raise IngestionError('cache_hash_mismatch')
        decode(body,job['json_type'],job['record_schema']);return meta
    try:
        event('START');cache=cached()
        if offline:
            if cache is None:raise IngestionError('offline_cache_miss')
            event('COMPLETE',mode='offline',output_sha256=cache['sha256']);return cache
        open_call=opener or build_opener(NoRedirect()).open
        headers={'User-Agent':'public-data-ingestion/1.0','Accept':'application/json','Accept-Encoding':'identity'}
        if cache:
            if cache.get('etag'):headers['If-None-Match']=cache['etag']
            elif cache.get('last_modified'):headers['If-Modified-Since']=cache['last_modified']
        last_request=None
        for attempt in range(job['max_attempts']):
            if last_request is not None:
                wait=max(0,job['min_interval_seconds']-(time.monotonic()-last_request))
                if time.monotonic()-start+wait>=job['max_total_seconds']:raise IngestionError('deadline_before_request')
                sleep(wait)
            remaining=job['max_total_seconds']-(time.monotonic()-start)
            if remaining<=0:raise IngestionError('deadline_before_request')
            last_request=time.monotonic();event('REQUEST',attempt=attempt+1)
            try:
                with open_call(Request(job['url'],headers=headers),timeout=min(job['timeout_seconds'],remaining)) as response:
                    status=response.status;rh=response.headers
                    if status!=200:raise IngestionError('unexpected_http_'+str(status))
                    length=rh.get('Content-Length')
                    if length and int(length)>job['max_bytes']:raise IngestionError('response_too_large')
                    body=response.read(job['max_bytes']+1)
                if time.monotonic()-start>job['max_total_seconds']:raise IngestionError('deadline_after_response')
                if len(body)>job['max_bytes']:raise IngestionError('response_too_large')
                value=decode(body,job['json_type'],job['record_schema']);sha=digest(body);blob=base/(sha+'.json')
                if blob.exists():
                    if digest(blob.read_bytes())!=sha:raise IngestionError('existing_blob_corrupted')
                else:atomic(blob,body)
                meta={'schema_version':1,'adapter_version':VERSION,'source_id':job['source_id'],'url':job['url'],'reference_period':job['reference_period'],'source_schema_version':job['schema_version'],'retrieved_at':now(),'sha256':sha,'bytes':len(body),'row_count':len(value) if isinstance(value,list) else None,'http_status':200,'etag':rh.get('ETag'),'last_modified':rh.get('Last-Modified'),'job_hash':job_hash,'run_id':run_id,'previous_sha256':cache['sha256'] if cache else None,'coverage':'single_resource_only_not_dataset_complete','lineage':{'input_url':job['url'],'output_sha256':sha,'transformation':'identity','code_version':VERSION}}
                atomic(base/(run_id+'.manifest.json'),encoded(meta));atomic(latest,encoded(meta));event('COMPLETE',output_sha256=sha,bytes=len(body));return meta
            except HTTPError as error:
                status=error.code;rh=error.headers
                if status==304:
                    if cache is None:raise IngestionError('304_without_cache')
                    event('COMPLETE',mode='not_modified',output_sha256=cache['sha256']);return cache
                event('HTTP_ERROR',http_status=status,attempt=attempt+1)
                if status not in RETRY or attempt+1==job['max_attempts']:raise IngestionError('http_'+str(status)+'_stopped')
                wait=retry_delay(rh,attempt,jitter)
            except (URLError,TimeoutError,ConnectionError) as error:
                event('TRANSPORT_ERROR',error_type=type(error).__name__,attempt=attempt+1)
                if attempt+1==job['max_attempts']:raise IngestionError('transport_attempts_exhausted')
                wait=retry_delay({},attempt,jitter)
            if wait>job['max_retry_wait_seconds'] or time.monotonic()-start+wait>=job['max_total_seconds']:
                raise IngestionError('retry_deferred_resume_later')
            event('RETRY_WAIT',seconds=wait);sleep(wait)
        raise IngestionError('attempts_exhausted')
    except Exception as error:
        event('FAIL',error_type=type(error).__name__,reason=str(error) if isinstance(error,IngestionError) else 'local_or_transport_error')
        raise
    finally:
        lock.unlink(missing_ok=True)

def main():
    p=argparse.ArgumentParser();p.add_argument('job',type=Path);p.add_argument('--folder',required=True,type=Path);p.add_argument('--offline',action='store_true');a=p.parse_args()
    print(json.dumps(collect(json.loads(a.job.read_text()),a.folder,a.offline),ensure_ascii=False,indent=2))

if __name__=='__main__':main()
