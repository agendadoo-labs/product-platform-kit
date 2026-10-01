# APOS — Active State and History-on-Demand

APOS separates current operational truth from preserved history. The default context contains only active state, applicable contracts, current decisions, fresh Evidence and the active runbook. Historical material remains versioned: relevant catalogued Warm sources are retrieved automatically, while Cold sources require a recorded trigger and reason. See LAYERED-MEMORY.md.

## Document classes

| Class | Purpose | Default retrieval |
| --- | --- | --- |
| `current_state` | Current system state | included |
| `runbook` | Current operation, verification and recovery | included |
| `setup_guide` | Reproduce current configuration | task-dependent |
| `decision` | Rationale governing the current change | related only |
| `evidence` | Revision-bound observation | related and fresh |
| `case_history` | Closed case chronology | Warm by relevance or Cold by trigger |
| `incident` | Failure, root cause and corrective action | Warm by relevance or Cold by trigger |
| `checkpoint` | Intermediate execution snapshot | Warm by relevance or Cold by trigger |
| `superseded` | Replaced source | Warm by relevance or Cold by trigger |

## Retrieval contract

1. Bootstrap indexes active model, ProductState and open Intents.
2. Context Compiler selects the smallest authoritative dependency graph.
3. Paths in `document_lifecycle.historical_path_markers` are excluded from the mandatory baseline; the layered catalog retrieves related history independently.
4. The Intent records query and any required_source_ids; Cold additionally requires trigger and reason. Broad include_historical remains a legacy escape hatch.
5. `ContextManifest.retrieval.layered` records selected/deferred sources, authority, hashes, triggers and unresolved retrieval issues.
6. Token pressure never authorizes omission of active governing context.

## Writing contract

- A runbook is a replace-in-place projection of the last validated procedure, not a cumulative diary.
- Incident, case history, checkpoint and superseded material live in separate paths and retain provenance.
- Live case state belongs to the authoritative runtime or database; documentation contains only minimized, dated projections.
- Every active human document declares status, type, version, validation date and source of truth.
- Supersession is explicit; deletion of historical material is not required for efficient retrieval.

## Recommended layout

```text
docs/<domain>/
  CURRENT.md
  RUNBOOK.md
  SETUP.md
  decisions/
  evidence/
  incidents/
  history/
  archive/
```

This layout is a default, not a requirement to create empty directories. Create an artifact only when it guides, constrains, explains, verifies or reconstructs work.

Regra vigente de recuperação: Hot mantém as fontes governantes; Warm relacionado pode entrar automaticamente pelo catálogo; Cold exige `context_request.trigger` e `reason` registrados. `include_historical=true` permanece compatível para auditorias amplas. Veja o guia LAYERED-MEMORY no diretório de documentação APOS. Histórico recuperado nunca ganha autoridade vigente por relevância.
