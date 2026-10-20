---
title: APOS — Intents abertos
updated: 2026-10-18
---

# Intents abertos

> Projeção da revisão 21 do ProductState. Não editar manualmente.

| Intent | Estado | Cerimônia | Próximo checkpoint |
|---|---|---|---|
| `I-PPK-KNOWLEDGE-001` | active | Strict | CP-KG-TECH-001 technical controls; CP-020 independent transfer pending |
| `I-PPK-DOC-ORG-001` | active | Strict | Não definido. |
| `I-PPK-APOS-009` | active | standard | Não definido. |
| `I-PPK-APOS-010` | active | standard | Não definido. |
| `I-PPK-SKILLS-001` | active | standard | Não definido. |
| `I-PPK-SEO-001` | active | standard | Não definido. |
| `I-PPK-ANALYTICS-001` | candidate | standard | Não definido. |

## I-PPK-KNOWLEDGE-001

- **Estado do Intent:** active.
- **Estado operacional:** active.
- **Problema:** Human knowledge projections can mix published, local and historical states, duplicate context and lose provenance.
- **Resultado esperado:** A reusable, reversible projection contract with pinned provenance, explicit relationships, checkpoints and measured retrieval adoption.
- **Próximo checkpoint:** CP-KG-TECH-001 technical controls; CP-020 independent transfer pending
- **Decisões:** `D-PPK-KG-018`, `D-PPK-KG-TECH-001`, `D-PPK-KNOWLEDGE-001`, `D-PPK-KNOWLEDGE-002`, `D-PPK-START-001`.
- **Última execução:** nenhuma.
- **Última evidência:** `E-PPK-KNOWLEDGE-001` — passou.
- **Incertezas:** nenhuma registrada.

## I-PPK-DOC-ORG-001

- **Estado do Intent:** active.
- **Estado operacional:** sem workstream.
- **Problema:** Nomes genéricos e metadados incompletos dificultam selecionar documentação confiável.
- **Resultado esperado:** Inventário explícito, nomes inteligíveis, metadados, compatibilidade e retomada verificáveis.
- **Próximo checkpoint:** Não definido.
- **Decisões:** `D-PPK-DOC-017`, `D-PPK-DOC-ORG-001`.
- **Última execução:** nenhuma.
- **Última evidência:** `E-PPK-DOC-ORG-001` — passou.
- **Incertezas:** nenhuma registrada.

## I-PPK-APOS-009

- **Estado do Intent:** active.
- **Estado operacional:** sem workstream.
- **Problema:** Growing projects can turn runbooks into cumulative diaries, forcing agents to load obsolete incidents and intermediate states before understanding current operation.
- **Resultado esperado:** APOS provides a reusable active-state and history-on-demand contract enforced by the Context Compiler and consumer starter.
- **Próximo checkpoint:** Não definido.
- **Decisões:** `D-PPK-APOS-009`.
- **Última execução:** `AR-PPK-APOS-009` — succeeded.
- **Última evidência:** `E-PPK-APOS-016` — passou.
- **Incertezas:** nenhuma registrada.

## I-PPK-APOS-010

- **Estado do Intent:** active.
- **Estado operacional:** sem workstream.
- **Problema:** Recuperação binária de histórico não atende memória organizacional crescente; precisamos avaliar literatura, recuperação progressiva e maturidade com evidências.
- **Resultado esperado:** Revisão primária documentada, memória local em camadas integrada e testada, comparação de maturidade com limites explícitos.
- **Próximo checkpoint:** Não definido.
- **Decisões:** `D-PPK-APOS-010`, `D-PPK-INTEGRATION-016`.
- **Última execução:** `AR-PPK-APOS-010` — succeeded.
- **Última evidência:** `E-PPK-APOS-017` — passou.
- **Incertezas:** catalog is a curated subset; real-task recall, costs and savings unmeasured; mandatory source baseline remains broad; temporal filtering and semantic retrieval not implemented.

## I-PPK-SKILLS-001

- **Estado do Intent:** active.
- **Estado operacional:** sem workstream.
- **Problema:** Skill registration needs a single practical guide that distinguishes procedures, APOS capabilities, source authority and runtime support.
- **Resultado esperado:** Traceable registration guide for the kit and Valora with verifiable references and no consumer coupling in templates.
- **Próximo checkpoint:** Não definido.
- **Decisões:** `D-PPK-SKILLS-001`.
- **Última execução:** `AR-PPK-SKILLS-001` — succeeded.
- **Última evidência:** `E-PPK-SKILLS-001` — passou.
- **Incertezas:** Downstream adoption not measured.

## I-PPK-SEO-001

- **Estado do Intent:** active.
- **Estado operacional:** sem workstream.
- **Problema:** SEO e GEO precisam ser princípio recuperável desde a criação do conteúdo público.
- **Resultado esperado:** Princípio permanente e template genérico com critérios verificáveis de SEO/GEO.
- **Próximo checkpoint:** Não definido.
- **Decisões:** `D-PPK-SEO-001`.
- **Última execução:** `AR-PPK-SEO-001` — succeeded.
- **Última evidência:** `E-PPK-SEO-001` — passou.
- **Incertezas:** Downstream adoption not measured.

## I-PPK-ANALYTICS-001

- **Estado do Intent:** candidate.
- **Estado operacional:** sem workstream.
- **Problema:** Analytical procedures need portable contracts and provider-owned semantics
- **Resultado esperado:** Git-versioned neutral skill and schemas, independently loadable without a proprietary host
- **Próximo checkpoint:** Não definido.
- **Decisões:** `D-PPK-ANALYTICS-001`.
- **Última execução:** nenhuma.
- **Última evidência:** `E-PPK-ANALYTICS-001` — passou.
- **Incertezas:** nenhuma registrada.

## Memória por Intent

O `intent_id` liga Intent, Decisions, AgentRuns e Evidence. ProductState resume a situação; workstreams registram dependências e próximo checkpoint. A memória do Intent é esse subgrafo rastreável, não uma narrativa paralela.
