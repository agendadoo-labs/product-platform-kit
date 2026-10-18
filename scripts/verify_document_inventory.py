"""Check canonical documentation metadata, compatibility links and preserved references."""
import hashlib,json,re
from pathlib import Path
root=Path(__file__).resolve().parents[1]
manifest=json.loads((root/'docs/documentation-inventory.json').read_text())
seen=set()
for row in manifest['records']:
 path=root/row['path'];text=path.read_text()
 if row['classification']=='generated_or_reference_preserved':
  assert hashlib.sha256(path.read_bytes()).hexdigest()==row['sha256'],f'Reference changed: {path}'
  continue
 assert text.startswith('---\n'),path
 meta={}
 for line in text.split('\n---\n',1)[0][4:].splitlines():
  k,_,v=line.partition(':');meta[k]=json.loads(v)
 for key in ['id','scope','document_role','purpose','read_when','status','authority','tier','updated']:assert meta.get(key),(path,key)
 assert meta['id'] not in seen,meta['id'];seen.add(meta['id'])
 assert meta['id']==row['id'],path
 assert isinstance(meta['read_when'],list) and meta['read_when'],path
 assert meta['purpose'] in text.split('\n---\n',1)[1],path
for old,new in manifest['renames'].items():
 assert (root/new).is_file(),new
 text=(root/old).read_text();assert '"redirect"' in text and Path(new).name in text,old
print(f"Documentation inventory passed: {len(manifest['records'])} records, {len(manifest['renames'])} readable canonical paths")
