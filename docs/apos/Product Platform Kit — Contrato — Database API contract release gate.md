---
id: "DOC-EF6F3642652019"
type: "contract"
scope: "Product Platform Kit"
document_role: "contract"
purpose: "Definir Database/API contract release gate."
read_when: ["Verificar regras e limites aplicáveis: Database/API contract release gate"]
status: "documented"
authority: "documented_source_not_runtime_verification"
tier: "warm"
updated: "2026-10-18"
---
# Database/API contract release gate

Definir Database/API contract release gate.

## Problem

A migration committed to Git is intended state, not observed state. A frontend, worker or API can be deployed while its required schema, RPC, queue, flag or configuration is still absent from the target environment. Tests that inspect source files do not detect this drift.

## APOS rule

Any dependent client must declare a versioned semantic release contract and observe it in the target environment before promotion. A missing dependency, incompatible version, unreachable handshake or unknown requirement fails closed. The UI must not translate contract failure into zero metrics, an empty result or ordinary user error.

## Economical reference architecture

1. Keep an application-owned manifest with the exact version and required capabilities.
2. Apply additive, backward-compatible infrastructure/data changes first.
3. Expose a least-privilege handshake returning only non-sensitive contract metadata.
4. Compare the target handshake with the manifest during the deployment build.
5. Block promotion on absence or mismatch.
6. Run an authenticated smoke test across the changed boundary.
7. Persist Evidence with environment, artifact revision and observed contract.
8. Keep the previous contract until the client rollback window expires.

The handshake complements migrations and integration tests; it does not replace them. A constant contract version is sufficient when the migration is atomic and maintains the manifest. High-risk systems should additionally execute representative calls and reconcile schema catalogs.

## Security constraints

- Return names and versions only; never secrets, row counts, tenant identifiers or personal data.
- Use a public credential only when the handshake contains no sensitive information; otherwise use a dedicated read-only release identity.
- Business functions keep their normal authentication, authorization and rate limits.
- Credentials remain environment-scoped and outside Git.
- Failure is a blocked release, not an automatic destructive rollback.

## Adoption

Copy `templates/operations/database-release-contract.example.json`, adapt the dependencies and connect the check to the hosting platform's prebuild or pre-promotion stage. Add `ADAPTAR-C-RELEASE-001` to every Intent that changes a client/dependency boundary.

The Valora incident of 14/09/2026 validated the pattern: missing production RPCs broke the admin dashboard; the repaired release added a remote contract check that would have stopped that client build.
