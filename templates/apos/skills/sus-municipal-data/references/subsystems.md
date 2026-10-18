# SUS source contracts

| System | Source | Interpretation and access |
|---|---|---|
| SIA | https://datasus.saude.gov.br/acesso-a-informacao/producao-ambulatorial-sia-sus/ | Ambulatory production; quantities presented/approved. TabNet/export first, official DBC files later with dictionary. Not unique users. |
| SIH | https://datasus.saude.gov.br/acesso-a-informacao/morbidade-hospitalar-do-sus-sih-sus/ | Hospitalizations/AIH; choose service location versus residence. Not a patient census. |
| SISAB | https://sisaps.saude.gov.br/sistemas/sisab/ | Public APS reports; distinguish registered population, validated production and users. No public API confirmed in this package. |
| CNES | https://datasus.saude.gov.br/cnes-estabelecimentos | Establishment structure/capacity by competence; not all municipal employees. |
| BNAFAR | https://dadosabertos.saude.gov.br/dataset/bnafar-posicao-de-estoque | Stock resources; independently verify dispensing/withdrawal availability and date. Catalog observed 2026-10-18 marked maintenance and last resource June/2026 despite page update October; do not assume freshness. |

Public aggregate unique treatment users, dispensing and local stock records remain validation dependencies. Confirm current access and schema before use. No clinical model or medication dose inference is supplied.
