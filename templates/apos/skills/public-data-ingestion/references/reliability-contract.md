# Reliable ingestion contract and maturity

This is a tested local reference, not a production certification or a universal connector.

## Executable core

`python3 scripts/ingest.py JOB.json --folder LOCAL_DIRECTORY` performs one bounded HTTPS GET JSON resource. `--offline` verifies the cached bytes and schema without network. Job fields are all mandatory:

```json
{
  "source_id": "official-population",
  "url": "https://servicodados.ibge.gov.br/api/v3/agregados/6579/metadados",
  "allowed_hosts": ["servicodados.ibge.gov.br"],
  "reference_period": "metadata-edition-observed",
  "schema_version": "reviewed-metadata-v1",
  "json_type": "object",
  "record_schema": {"id": "integer", "nome": "string"},
  "classification": "public_non_personal",
  "max_attempts": 3,
  "max_bytes": 1000000,
  "timeout_seconds": 20,
  "min_interval_seconds": 2,
  "max_retry_wait_seconds": 30,
  "max_total_seconds": 90
}
```

Root type and required top-level record fields are checked; this is not full JSON Schema validation. Additive fields are allowed; semantic/nested validation belongs to the adapter. Do not feed nominal personnel or patient datasets to this raw snapshot helper. Classification is an operator assertion, not an automatic privacy classifier.

| Control | Implemented evidence / boundary |
|---|---|
| Retry | GET only; 408/429/500/502/503/504 and selected transport errors; bounded attempts; exponential delay + jitter; Retry-After seconds/date; long waits defer the run rather than retry early |
| Request controls | HTTPS host allowlist, no redirects, no embedded credentials/obvious secret query keys, request bytes/timeout/attempt caps; host policy is not a network sandbox or DNS-rebinding defense |
| Conditional fetch | ETag or Last-Modified; 304 requires a verified previous snapshot |
| Idempotence | Content-addressed bytes; exact job hash partitions state; offline reads verified; conditional fetch on fresh network run |
| Local concurrency | Exclusive writer lock per job; crash leaves lock requiring operator inspection. Not distributed locking or exactly-once delivery |
| Persistence | Immutable content hashes, per-run manifest and atomic latest pointer; fsync on file, local filesystem only; no multi-file transaction or power-loss guarantee for directory metadata |
| Schema/quality | JSON/root/required field checks before promotion; rejects corrupt cache; preserves previous valid snapshot on schema error; no dataset-wide uniqueness/completeness claim |
| Observability | START, REQUEST, HTTP_ERROR, TRANSPORT_ERROR, RETRY_WAIT, COMPLETE, FAIL; run ID, timestamps, bytes/hash and safe error category; no body or credentials in event log |
| Lineage | Source URL + period + job/config hash + code version + output hash + previous output; identity ingestion edge. Field/row-level transformation lineage is a downstream obligation |
| Deadline | Checks before attempts and after response; socket timeout per request. A hard wall-clock deadline requires process isolation/supervision; slow-drip streams are not strictly bounded by this implementation |
| Failure containment | Attempt cap stops invocation; no automatic infinite resume. Cross-run persistent circuit breaker, metrics backend and dead-letter queue are not implemented |
| Recovery | Offline replay verified in tests. Snapshot availability is not a backup/restore SLA; remote backups and recovery drills are consumer responsibilities |

Pagination is adapter-owned: record page/cursor, expected/received counts and duplicate/repeated pages; checkpoint only proven complete partitions. Deduplicate by stable source identity + version, not object text. For APIs without stable pagination/change tokens, pin a snapshot if supported, reconcile totals and report inconsistency. A single-resource success never means a dataset is complete.

## Production admission, not implemented by a Markdown file

Before scheduling: source-specific semantic contract and integration tests, freshness/volume/drift baselines, owner and alert destination, concurrency quotas, persistent backoff/circuit state, hard process deadline, credential vault if required, backup/restore exercise, retention and legal/privacy review where applicable. Add checks for nulls, uniqueness, referential integrity, range, duplicate joins, partition coverage, time alignment, reversals and data reconciliation. Quarantine failures with reason and previous good version; do not silently coerce them.

For monthly backfills, choose a source-specific revision window, save watermark only after all partitions pass, and reconcile late updates/deletions. Dimension history uses valid-time plus observed-time. Schema migrations are explicit versions with replay compatibility or quarantine. SLOs and thresholds belong to each consuming product, not universal hard-coded numbers.

Lineage should use Job/Run/Dataset identities and exact input-output edges; use OpenLineage export only after validating a pinned event schema. Current local manifests are not claimed as OpenLineage-compliant events. Avoid a Cartesian lineage edge from every input to every output. Transform outputs need code/config hashes, input hashes, join/rejection counts and explicit parents.

Sources: [HTTP semantics / retries and validators](https://www.rfc-editor.org/rfc/rfc9110.html), [urllib transport](https://docs.python.org/3/library/urllib.request.html), [OpenLineage entities and facets](https://openlineage.io/docs/spec/facets/). No framework or vendor is mandated.
