"""Validate operator-maintained documentary metadata without scanning runtime data."""
import json
from pathlib import Path
root = Path(__file__).resolve().parents[1]
manifest = json.loads((root / "docs/documentation-manifest.json").read_text())
seen = set()
for row in manifest["documents"]:
    path = root / row["path"]
    assert path.resolve().is_relative_to(root.resolve()), "path escape"
    text = path.read_text()
    assert text.startswith("---\n"), row["path"]
    block = text[4:].split("\n---\n", 1)[0]
    meta = {}
    for line in block.splitlines():
        key, value = line.split(":", 1)
        assert key not in meta, "duplicate field"
        meta[key] = json.loads(value)
    for key in ("id", "type", "scope", "document_role", "purpose", "status", "authority", "tier", "updated"):
        assert isinstance(meta.get(key), str) and meta[key].strip(), key
    assert meta["id"] not in seen, "duplicate id"
    seen.add(meta["id"])
    assert isinstance(meta.get("read_when"), list) and meta["read_when"], "read_when"
    assert all(isinstance(x, str) and x.strip() for x in meta["read_when"]), "read_when item"
    assert meta["id"] == row["id"], "manifest mismatch"
    assert meta["purpose"] in text.split("\n---\n", 1)[1], "human purpose missing"
print(f"Validated {len(seen)} documentation entrypoints; runtime not evaluated.")
