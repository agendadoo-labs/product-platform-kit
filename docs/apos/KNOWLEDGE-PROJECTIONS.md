# Knowledge projections and reversible review

Status: optional contract candidate. Intent I-PPK-KNOWLEDGE-001 remains open. This document does not implement synchronization or retrieval and makes no claim of token savings.

## Authority

Git at the configured canonical ref and a resolved commit is the authority for published product state. A worktree, candidate branch or PR is not published state. Preserve unpublished work as an explicit local delta, not as a contradiction to erase. A commit proves recorded content, not deployment, data correctness or service health; those require environment-bound evidence.

A human vault such as Obsidian is a projection for navigation and review. Graph links and relevance scores never override source authority, validity or access permissions. Never interpret a newer timestamp as approval.

## Projection contract

Every managed note declares stable ID, type, status, updated date, authority and retrieval tier. Product notes also identify repository, canonical ref, resolved commit, source path and observed date. Record source blob and projection SHA-256 separately; derived rendering need not have the same bytes as its source. Missing or unavailable metadata is unknown, not fresh or approved.

Separate project, domain, intent, decision, contract and evidence when they form meaningful reusable units. Relations are typed: belongs_to, resolves, governed_by, validated_by and supersedes. IDs are namespaced by project; outgoing links resolve deterministically. Wiki-style links should use vault-relative paths to avoid ambiguous basenames. Obsidian's graph visualizes links; relation types remain in metadata for machine consumers.

Keep current state concise and separate historical checkpoints. Preserve pinned snapshots and templates; identical bytes do not imply redundant purpose. Classify and inspect inbound links before moving or removing anything. Use aliases for synonyms.

## Safe update protocol

1. Resolve the canonical Git ref once and record the commit; read all sources at that commit.
2. Verify source bytes, access scope and local modifications. Capture a before-manifest and backups.
3. Render candidate notes and a diff without modifying current notes. Do not import secrets, raw consumer data or evaluation answers.
4. Validate IDs, local links, metadata, relation targets, hashes and source status. Generated files must not be hand-edited as authoritative records.
5. Compare current file hashes with the captured before-manifest. Any intervening edit aborts replacement and requires reconciliation.
6. Apply through an atomic staging/rename strategy with a transaction journal. On interruption, resume or roll back only the files named by that journal.
7. Persist validation, remaining uncertainty, next action and restoration instructions. A rollback verifies its target hash and preserves later edits.

The template manifest is deliberately incomplete and ineligible for publication/retrieval. It is a contract example, not an implemented validator or sync engine. A filled manifest alone does not authorize publication.

## Context recovery

Start with a compact project state and open Intent. Resolve governing contracts, decisions and evidence before optional related material. Use an explicit permitted catalog; graph display filters are not an access boundary. Historical material requires a recorded reason. Similarity can propose sources but cannot promote them. Preserve source IDs and revisions in the resulting ContextManifest.

Stop rather than silently omit a governing source when the budget is exceeded. Unknown usage remains unknown. Do not load the full vault by default or put held-out answers into memory.

## Adoption checkpoints

| Checkpoint | Acceptance |
|---|---|
| A1 Inventory | Canonical refs identified, unpublished differences labeled, originals preserved |
| A2 Contract | Optional contract reviewed and consumer-specific acceptance defined |
| A3 Projection generator | Deterministic output, stale-source checks, interrupted-update recovery and no overwrite of intervening edits |
| A4 Retrieval binding | Worker selects permitted sources with authority/validity filters and typed relations |
| A5 Evaluation | Baseline and candidate compared on separate questions; source recall, contradictions, semantic success, actual tokens, p95 and cost per verified success |

The kit owns the reusable contract; a runtime owns retrieval mechanisms; each product owns its semantics and evidence. The llm_engineering domain measures gains. Embeddings or inferred graphs follow demonstrated need, not availability.

## Resume and rollback

Read the open Intent, its Decision, workstream and generated project memory. Record source revision, completed checks, pending adoption and next action in each checkpoint. This candidate changes documentation and metadata only: close the PR to decline, or revert the accepted change later. Consumer synchronization requires its own before-manifest and tests.

## References

- [Session bootstrap](SESSION-BOOTSTRAP-AND-MULTI-TEAM.md)
- [DataMap and projections](DATA-MAP-AND-HUMAN-PROJECTIONS.md)
- [LLM engineering](../architecture/LLM_ENGINEERING.md)
- [Manifest template](../../templates/knowledge-projection/manifest.example.json)
