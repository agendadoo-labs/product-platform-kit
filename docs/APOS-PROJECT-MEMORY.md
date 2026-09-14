---
title: APOS — memória atual do projeto
updated: 2026-09-13
---

# Memória atual do projeto

> Projeção determinística. Fontes operacionais: `.apos/`. Não editar manualmente.

- ProductState: `PS-PRODUCT-PLATFORM-KIT`, revisão 12.
- Modelo ativo: `product-platform-kit-apos-2.3.0`.
- Intents satisfeitos: 9.
- Intents abertos: 0.
- Mapa de dados: `DM-PPK-001`, revisão 1.

## Trabalho aberto

| Intent | Estado | Cerimônia | Próximo checkpoint |
|---|---|---|---|
| — | nenhum | — | — |

## Decisões recentes

- **2026-09-14 · D-PPK-RELEASE-001:** Adicionar ao APOS um gate semântico de release que observa o ambiente-alvo antes de promover qualquer cliente dependente.
- **2026-09-13 · D-PPK-CAPABILITY-002:** Modelar Commercial Model como uma camada transversal Economic Control Plane sobre os 14 macrodomínios, adicionar commercial_model e economic_control_plane ao domínio Business & Growth e registrar o grafo de influência sem criar autoridade implícita sobre os domínios afetados.
- **2026-09-12 · D-PPK-APOS-007:** Adicionar ao starter um DataMap dedicado e projeções determinísticas de memória e Intents abertos, verificadas em checkpoint; ProductState conserva apenas um ponteiro tipado para o mapa.
- **2026-09-12 · D-PPK-APOS-008:** Tratar reconstrução como cadeia de estados heterogêneos, gerar Intents resolvidos do subgrafo APOS e oferecer um Recovery Manifest que referencia segredos sem armazená-los.
- **2026-09-12 · D-PPK-CAPABILITY-001:** Usar o Digital Product Capability Map v2 como ontologia de composição do kit, separado do Epistemic Registry, e governar a evolução por cobertura evidenciada, regras de ativação e prioridade por valor reutilizável.
- **2026-09-09 · D-PPK-APOS-006:** Adicionar um Session Bootstrap determinístico antes da inferência: ler ponteiro ativo, ProductState, Intents abertos, decisões e coordenação; depois compilar o subgrafo completo somente para o Intent em foco.
- **2026-09-08 · D-PPK-APOS-005:** Publicar APOS v0.2 primeiro e, em seguida, criar uma trilha de onboarding executável e coerente na main do toolkit.
- **2026-09-07 · D-PPK-APOS-003:** Add preservation-by-default and a reusable Change Envelope in product-platform-kit-apos-2.2.0 and consumer-apos-1.2.0.
- **2026-09-07 · D-PPK-APOS-004:** Adopt APOS v0.2 with maturity-based architecture, selective context compilation and governed provider-neutral AI execution.
- **2026-09-06 · D-PPK-APOS-001:** Substituir o starter operacional baseado em papéis pelo modelo product-platform-kit-apos-2.0.0 e pelo template templates/apos.

## Fontes para aprofundar

- `.apos/intents/`: problema e resultado esperado.
- `.apos/decisions/`: escolhas e autoridade.
- `.apos/runs/`: execução e incertezas.
- `.apos/evidence/`: verificação independente.
- `.apos/data/data-map.json`: entidades, relações e linhagem.
