---
title: APOS — memória atual do projeto
updated: 2026-10-18
---

# Memória atual do projeto

> Projeção determinística. Fontes operacionais: `.apos/`. Não editar manualmente.

- ProductState: `PS-PRODUCT-PLATFORM-KIT`, revisão 17.
- Modelo ativo: `product-platform-kit-apos-2.3.0`.
- Intents satisfeitos: 10.
- Intents abertos: 6.
- Mapa de dados: `DM-PPK-001`, revisão 4.

## Trabalho aberto

| Intent | Estado | Cerimônia | Próximo checkpoint |
|---|---|---|---|
| `I-PPK-KNOWLEDGE-001` | active | Strict | Review optional contract candidate and validation; implement generator separately before claiming retrieval or synchronization gains. |
| `I-PPK-DOC-ORG-001` | active | Strict | Não definido. |
| `I-PPK-APOS-009` | active | standard | Não definido. |
| `I-PPK-APOS-010` | active | standard | Não definido. |
| `I-PPK-SKILLS-001` | active | standard | Não definido. |
| `I-PPK-SEO-001` | active | standard | Não definido. |

## Decisões recentes

- **2026-10-18 · D-PPK-DOC-017:** Extend descriptive document taxonomy to CP-016 additions; preserve dated observations and locked skill bundles, add navigable historical entries and current metadata. Compatibility redirects retained; current retrieval catalog points to complete canonical sources.
- **2026-10-18 · D-PPK-DOC-ORG-001:** Aplicar taxonomia em lotes limitados, conservar caminhos técnicos necessários e metadados externos para referências imutáveis.
- **2026-10-18 · D-PPK-INTEGRATION-016:** Reconcile layered-memory, skill guide and SEO contract on current main; defer stale and temporally invalid current sources; retain historical provenance.
- **2026-10-17 · D-PPK-KNOWLEDGE-001:** Treat a knowledge vault as a provenance-preserving projection of published Git state, with separate local deltas and historical checkpoints.
- **2026-10-17 · D-PPK-KNOWLEDGE-002:** Consolidar manutenção documental e implementação em guia portátil de entrada, ligado ao README, AGENTS e bootstrap APOS.
- **2026-10-17 · D-PPK-LLM-001:** Registrar llm_engineering como domínio transversal; separar contrato reutilizável, runtime compartilhado e oracle de negócio.
- **2026-10-01 · D-PPK-APOS-009:** Use active-only retrieval by default. Runbooks are replace-in-place projections of the latest validated procedure; incidents, cases, checkpoints and superseded sources are preserved in historical paths and loaded only through explicit Intent opt-in.
- **2026-10-01 · D-PPK-APOS-010:** Mandatory current baseline plus lexical Warm catalog; justified relevant Cold retrieval with authority and provenance. No source truncation. External retrieval services require measured benefit.
- **2026-09-14 · D-PPK-RELEASE-001:** Adicionar ao APOS um gate semântico de release que observa o ambiente-alvo antes de promover qualquer cliente dependente.
- **2026-09-13 · D-PPK-CAPABILITY-002:** Modelar Commercial Model como uma camada transversal Economic Control Plane sobre os 14 macrodomínios, adicionar commercial_model e economic_control_plane ao domínio Business & Growth e registrar o grafo de influência sem criar autoridade implícita sobre os domínios afetados.

## Fontes para aprofundar

- `.apos/intents/`: problema e resultado esperado.
- `.apos/decisions/`: escolhas e autoridade.
- `.apos/runs/`: execução e incertezas.
- `.apos/evidence/`: verificação independente.
- `.apos/data/data-map.json`: entidades, relações e linhagem.
