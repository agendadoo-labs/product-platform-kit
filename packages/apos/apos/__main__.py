import argparse
import json
from pathlib import Path
from .core import Engine, ROOT

parser = argparse.ArgumentParser(description='Run the APOS local vertical slice')
parser.add_argument('--db', default='.apos.sqlite')
parser.add_argument('--intent', type=Path, default=ROOT / 'product/intent.json')
parser.add_argument('--contracts', type=Path, default=ROOT / 'product/contracts.json')
parser.add_argument('--key', default='bootstrap-v0.1')
parser.add_argument('--export', type=Path)
args = parser.parse_args()
engine = Engine(args.db)
try:
    result = engine.run(json.loads(args.intent.read_text()), json.loads(args.contracts.read_text()), args.key)
    if args.export:
        args.export.mkdir(parents=True, exist_ok=True)
        (args.export / 'run.json').write_text(json.dumps(result, indent=2) + '\n')
        state, artifact = engine.state()
        (args.export / 'catalog.md').write_text(artifact)
    print(json.dumps({k: result[k] for k in ('run', 'state', 'error')}, indent=2))
    raise SystemExit(0 if result['run']['status'] == 'succeeded' else 2)
finally:
    engine.close()
