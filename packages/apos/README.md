# APOS v0.1

Local, executable reference for Intent → execution → verification → evidence → ProductState. See the [specification](../../docs/APOS-v0.1.md) and [manifesto](../../docs/AGENTIC-PRODUCT-MANIFESTO.md).

From this directory, with Python 3.9 or newer:

```sh
python3 -m unittest discover -s tests -v
python3 -m apos --export evidence/local
```

The demo builds a domain catalog, verifies five mandatory contracts and atomically records revision 1 in `.apos.sqlite`. Repeat the command to replay the same execution without side effects. Inspect `evidence/local/run.json` for full inputs, decision, run, checks and state; `catalog.md` contains the published artifact. `evidence/bootstrap` contains the original observed run.

Use `--db /tmp/apos-experiment.sqlite --key my-experiment` for an independent experiment. `--intent` and `--contracts` select input files. Unknown or higher-risk capabilities return blocked (exit 2), failed verification returns exit 2, and success returns exit 0. There is no approval bypass or production adapter.

The Python API exposes `Engine.run(..., expected_revision=N)` for optimistic state checks. The supplied executor is deterministic and local. This demonstrates the execution protocol; it is not an LLM agent integration.
