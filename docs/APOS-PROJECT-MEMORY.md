---
title: APOS — memória atual do projeto
updated: 2026-09-12
---

# Memória atual do projeto

> Projeção determinística. Fontes operacionais: `.apos/`. Não editar manualmente.

- ProductState: `PS-PRODUCT-PLATFORM-KIT`, revisão 9.
- Modelo ativo: `product-platform-kit-apos-2.3.0`.
- Intents satisfeitos: 7.
- Intents abertos: 0.
- Mapa de dados: `DM-PPK-001`, revisão 1.

## Trabalho aberto

| Intent | Estado | Cerimônia | Próximo checkpoint |
|---|---|---|---|
| — | nenhum | — | — |

## Decisões recentes

- **2026-09-12 · D-PPK-APOS-007:** Adicionar ao starter um DataMap dedicado e projeções determinísticas de memória e Intents abertos, verificadas em checkpoint; ProductState conserva apenas um ponteiro tipado para o mapa.
- **2026-09-09 · D-PPK-APOS-006:** Adicionar um Session Bootstrap determinístico antes da inferência: ler ponteiro ativo, ProductState, Intents abertos, decisões e coordenação; depois compilar o subgrafo completo somente para o Intent em foco.
- **2026-09-08 · D-PPK-APOS-005:** Publicar APOS v0.2 primeiro e, em seguida, criar uma trilha de onboarding executável e coerente na main do toolkit.
- **2026-09-07 · D-PPK-APOS-003:** Add preservation-by-default and a reusable Change Envelope in product-platform-kit-apos-2.2.0 and consumer-apos-1.2.0.
- **2026-09-07 · D-PPK-APOS-004:** Adopt APOS v0.2 with maturity-based architecture, selective context compilation and governed provider-neutral AI execution.
- **2026-09-06 · D-PPK-APOS-001:** Substituir o starter operacional baseado em papéis pelo modelo product-platform-kit-apos-2.0.0 e pelo template templates/apos.
- **2026-09-06 · D-PPK-APOS-002:** Evoluir localmente para product-platform-kit-apos-2.1.0 e consumer-apos-1.1.0 com qualidade, ambientes e exposição progressiva como tipos operacionais versionados.

## Fontes para aprofundar

- `.apos/intents/`: problema e resultado esperado.
- `.apos/decisions/`: escolhas e autoridade.
- `.apos/runs/`: execução e incertezas.
- `.apos/evidence/`: verificação independente.
- `.apos/data/data-map.json`: entidades, relações e linhagem.
