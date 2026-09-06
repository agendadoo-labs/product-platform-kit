# APOS v0.1 — executable repository specification

Status: experimental local reference implementation. APOS version 0.1 is independent of Product Platform Kit version 0.2.0.

The [Agentic Product Manifesto](AGENTIC-PRODUCT-MANIFESTO.md) remains the philosophical layer, preserved from the originating conversation. This specification bounds what the runtime actually proves.

## Outcome and adoption

One builder can submit a declared intent, observe a governed execution, inspect independently computed verification results and reconstruct why product state changed. The kit itself is the first consumer: it generates a readable catalog of its six domain schemas. This is an engineering outcome; it does not claim user adoption, revenue, accessibility certification or production reliability.

Existing Supabase migrations, telemetry, experiments, map-core and design templates remain product infrastructure. APOS is an opt-in local control layer in `packages/apos`. It requires Python 3.9+ and only the standard library. JSON schemas can also be consumed by TypeScript tools. No credentials, model subscription or database service are required for this slice.

The existing agent starter may supply execution capabilities later. Its human role routing is not a mandatory APOS organization chart. Product-specific intents and evidence belong in consumer repositories, consistent with the kit's architecture; this kit contains only its bootstrap intent.

## Repository layout

```
docs/AGENTIC-PRODUCT-MANIFESTO.md   philosophy, unchanged
 docs/APOS-v0.1.md                implementation contract
packages/apos/
  apos/core.py                   policy, executor, verifier, transactional store
  apos/__main__.py               command-line entry point
  schemas/*.schema.json          six closed domain schemas
  product/constitution.json      purpose and authority description
  product/intent.json            measurable bootstrap outcome
  product/contracts.json         five mandatory checks
  tests/test_engine.py           failure and success behavior
  evidence/bootstrap/            actual exported run and observed artifact
```

## Core domain

| Entity | Meaning and essential relationships |
| --- | --- |
| Intent | Problem, population, outcome, required contract IDs, capability, impact, uncertainty, reversibility and proposed status. Satisfaction is derived from ProductState. |
| Contract | Versioned input document with family, human explanation and allowlisted executable check. Every referenced contract must resolve exactly once. |
| AgentRun | One terminal execution attempt, linked to intent, input digest, base state revision and timestamp. |
| Decision | Allow/escalate policy judgment linked to run and exact input digest, with rationale, alternatives and actor. |
| Evidence | Verifier observation linked to intent, run, contract and candidate digest; includes failed results. |
| ProductState | Monotonic revision, satisfied intent IDs, supporting evidence IDs and published artifact digest. |

JSON Schema documents use the Draft 2020-12 envelope and a deliberately small closed profile. The runtime validates types, required fields, additional properties, enums, unique arrays, minimum lengths and integer minima. It is not a general JSON Schema implementation. Cross-object resolution and completion rules are enforced by the engine, not by JSON Schema alone. Inputs and schemas are snapshotted in each execution result. Change intent IDs for new versions; input documents are not mutable backlog records.

## Governance and reversibility

| Classification | v0.1 behavior |
| --- | --- |
| Low impact + low uncertainty + reversible + known local capability | Autonomous execution into a candidate string. |
| High impact or high uncertainty | Escalate; no executor invocation. |
| Compensatable or irreversible | Escalate; no executor invocation. |
| Unknown capability | Escalate; no executor invocation. |
| Missing, malformed or unknown contracts | Reject before execution. |

The policy is implemented in trusted runtime code; `constitution.json` explains it and is not a mechanism for agents to expand their own privileges. There is no `approved=true` bypass. A blocked decision is reviewable, but v0.1 has no approval/resume protocol. Adding one requires authenticated human identity, exact plan/input binding, expiry, scope and single-use approval. Production actions remain out of scope.

Reversibility in this slice comes from constructing an unpublished candidate and committing only after verification. Failure leaves the previous artifact and revision intact. Previous successful snapshots are retained; restoring a historical state as a new revision is a future capability, not an implemented rollback command.

## Execution protocol

1. Validate the intent and resolve exactly the five required contracts.
2. Snapshot intent, contracts and schemas; calculate canonical SHA-256 input digest including policy version.
3. Acquire a SQLite write transaction. Replay an identical idempotency key from its recorded result; reject reuse with different inputs.
4. Check optional expected revision and reject already-satisfied intent IDs.
5. Record a policy decision. Escalation returns a blocked run without invoking execution.
6. Invoke the bounded build capability to produce a candidate catalog.
7. A separate verifier function observes candidate bytes against every contract. The executor cannot report success as evidence.
8. Record evidence and terminal AgentRun. Exceptions produce failed runs with an error, never satisfaction.
9. Only if every mandatory check passes, append a new ProductState snapshot and publish the candidate in the same transaction.
10. Commit the complete execution result. The CLI may export disposable JSON/Markdown projections for review.

SQLite is authoritative. Export files are not a transaction boundary and must not be used to determine completion. ProductState changes, ledger inserts and idempotency results are atomic. A process crash before commit leaves no partial publication; retry can rerun the pure executor. Completed attempts survive process restart. SQLite serializes concurrent writers; the optional revision guard rejects stale proposals. Long-running execution, distributed leases, cancellation and model timeouts are not implemented.

Records reject update/delete through database triggers. This is application-level immutability, not tamper-proof storage against the database owner. The injected Python executor used by tests is trusted code, not a security sandbox; do not run untrusted code in this process. Separate processes, restricted credentials, external verifier identities and signed evidence are prerequisites for broader autonomy.

## Evidence semantics

Five checks represent the bootstrap's product, design, engineering, data and operational constraints: complete domain coverage, catalog structure, basic schema structure, unique domain names and bounded artifact bytes. Their meaning is defined by allowlisted verifier code. Free-text outcome/description fields do not compile into arbitrary tests. To adopt a different outcome, add and review a capability and its verifiers; do not relabel this bootstrap as proof of a new business outcome.

Evidence includes the candidate digest and contract/run IDs. Failed checks are retained without modifying accepted state. A verifier/executor exception records an error in the execution result; absence of evidence never counts as success. The runtime does not measure production SLOs or claim that structural design checks establish accessibility.

## Dogfooding decisions

- **D-001: ship a local bounded experiment.** Chosen over coupling the first runtime to Supabase or an LLM service. This makes governance and failure behavior reproducible before adding external effects.
- **D-002: retain the existing kit architecture.** APOS is a package, not a replacement for authentication, telemetry or experiment infrastructure. Consumer business data stays outside the kit.
- **D-003: separate execution from verification.** Deterministic checks decide the narrow outcome. Process-level independence is deferred and explicitly limits assurance.
- **D-004: use transactional state and evidence.** SQLite avoids publishing a completed state without its supporting observations. JSON files remain portable projections.

The executable bootstrap records its own policy Decision, AgentRun, Evidence and ProductState. These design decisions explain implementation choices; they are not fabricated runtime evidence.

## Acceptance and next boundary

Run the package tests and demo from its README. The committed bootstrap export is an actual observed local run. Tests cover successful lineage, failed verification, policy denial, invalid contracts/schema inputs, idempotency, stale revision, database immutability, restart and transactional failure.

Next increments should add versioned policy documents, authenticated approvals, isolated agent adapters with time/cost limits, contract implementations for the existing telemetry and experiment APIs, and observation windows for product outcomes. Each requires its own Intent and evidence; no ticket system is required.
