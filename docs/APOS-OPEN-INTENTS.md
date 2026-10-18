---
title: APOS — Intents abertos
updated: 2026-10-18
---

# Intents abertos

> Projeção da revisão 15 do ProductState. Não editar manualmente.

| Intent | Estado | Cerimônia | Próximo checkpoint |
|---|---|---|---|
| `I-PPK-KNOWLEDGE-001` | active | Strict | Review optional contract candidate and validation; implement generator separately before claiming retrieval or synchronization gains. |
| `I-PPK-DOC-ORG-001` | active | Strict | Não definido. |

## I-PPK-KNOWLEDGE-001

- **Estado do Intent:** active.
- **Estado operacional:** active.
- **Problema:** Human knowledge projections can mix published, local and historical states, duplicate context and lose provenance.
- **Resultado esperado:** A reusable, reversible projection contract with pinned provenance, explicit relationships, checkpoints and measured retrieval adoption.
- **Próximo checkpoint:** Review optional contract candidate and validation; implement generator separately before claiming retrieval or synchronization gains.
- **Decisões:** `D-PPK-KNOWLEDGE-001`, `D-PPK-KNOWLEDGE-002`.
- **Última execução:** nenhuma.
- **Última evidência:** `E-PPK-KNOWLEDGE-001` — passou.
- **Incertezas:** nenhuma registrada.

## I-PPK-DOC-ORG-001

- **Estado do Intent:** active.
- **Estado operacional:** sem workstream.
- **Problema:** Nomes genéricos e metadados incompletos dificultam selecionar documentação confiável.
- **Resultado esperado:** Inventário explícito, nomes inteligíveis, metadados, compatibilidade e retomada verificáveis.
- **Próximo checkpoint:** Não definido.
- **Decisões:** `D-PPK-DOC-ORG-001`.
- **Última execução:** nenhuma.
- **Última evidência:** `E-PPK-DOC-ORG-001` — passou.
- **Incertezas:** nenhuma registrada.

## Memória por Intent

O `intent_id` liga Intent, Decisions, AgentRuns e Evidence. ProductState resume a situação; workstreams registram dependências e próximo checkpoint. A memória do Intent é esse subgrafo rastreável, não uma narrativa paralela.
