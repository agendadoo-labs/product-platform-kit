---
id: "DOC-PPK-DATA-001"
type: "reference"
scope: "Product Platform Kit"
document_role: "architecture"
purpose: "Orientar consumo confiável de fontes externas no domínio existente de dados."
read_when: ["Criar ou alterar ingestão, qualidade, lineage ou análise relativa"]
status: "candidate"
authority: "derived_from_governing_contract"
tier: "warm"
updated: "2026-10-18"
---
# Dados externos e análise relativa

Orientar consumo confiável de fontes externas no domínio existente de dados.

Fontes governantes: `.apos/domains/data-intelligence.json`, contrato `C-PPK-DATA-001`, Intent `I-PPK-DATA-001`, Decision `D-PPK-DATA-001`. Registro verificável: `.apos/skills/data-skills.json`.

## Avaliação do domínio existente

`data_intelligence` já integra o catálogo de capacidades. Telemetria e coleta possuem referências; DataMap governa entidades e lineage. A arquitetura de `packages/map-core/docs/DATA-ARCHITECTURE.md` já define raw com hash, staging, reconciliação, promoção atômica e retenção. Este incremento reaproveita esses princípios e acrescenta um contrato comum para fontes externas. Não cria outro macrodomínio nem altera a versão do método APOS.

## Composição

| Skill | Responsabilidade | Evidência e limite |
|---|---|---|
| public-data-ingestion | Orquestrar qualidade e confiabilidade | Referência Python local para um recurso JSON; testes de falhas, cache e hashes |
| pncp-procurement-data | Compras, itens e etapas financeiras | Procedimento; valor homologado não comprova pagamento |
| ibge-municipal-data | Identidade municipal, população e edições | Procedimento; separar censo, estimativa e competência |
| sus-municipal-data | Produção, estabelecimentos e utilização | Procedimento; procedimentos não equivalem a pacientes únicos |
| municipal-transparency-data | Pessoal, despesas, almoxarifado e unidade consumidora | Procedimento por família; cada município exige contrato próprio |
| relative-outlier-analysis | Comparações com denominadores e coortes | Referência Python determinística; candidato a revisão, nunca conclusão de crime |

Um núcleo evita divergência de retries e lineage. Procedimentos por família preservam diferenças de acesso, granularidade e semântica; não criar uma skill por cidade salvo diferenças operacionais suficientes. O produto mantém catálogo de fontes e regras locais; o Worker adota uma revisão explícita com hashes. Copiar arquivos não comprova integração ao dispatcher ou disponibilidade em todas as interfaces.

## Arquitetura e controles

Fonte → snapshot raw imutável → validação/quarentena → normalização → reconciliação → versão publicada → métricas → revisão humana. Registrar identificador da fonte, URL sem segredo, competência, instante de captura, hash, versão do schema/transformação, execução, entradas e saídas. A lineage customizada deve mapear Job/Run/Dataset se houver futura exportação OpenLineage; não declarar compatibilidade sem teste do schema oficial.

A referência implementa GET limitado, HTTPS e allowlist, timeout, limite de corpo e tentativas, backoff com jitter, Retry-After, classificação de erros, ETag/Last-Modified, cache verificado, replay offline, lock local, snapshot por conteúdo, publicação atômica e preservação da última versão válida. Veja `public-data-ingestion/references/reliability-contract.md` para limites exatos. Não oferece deadline rígido para servidor que envia bytes lentamente, contenção distribuída, paginação completa, fila persistente, scheduler ou isolamento de DNS.

Cada adaptador operacional deve provar paginação/contagens, chaves e deduplicação, janela incremental e sobreposição, correções tardias, schema drift, quarentena, limites de uso/licença, falha parcial, retomada e restauração. HTTP 200 ou coleção vazia não provam completude. Tratar 401/403 como problema de acesso, não repetir indiscriminadamente. Retomar somente páginas/checkpoints confirmados; atualizar watermark após reconciliação e publicação. Documentar limites de custo, volume, concorrência, retenção, responsáveis e destino dos incidentes.

Contratos de qualidade incluem completude, unicidade, validade, consistência, atualização e reconciliação financeira. Definir SLOs por fonte antes de produção, inclusive tolerância a atraso e erro; não inventar um percentual universal. Mudança incompatível bloqueia promoção e preserva versão anterior. Backfills são limitados, identificados e não sobrescrevem silenciosamente edições anteriores.

## Frequência e análise

Fatos mensais: consumir após competência disponível e reconsultar janela de retificação definida pelo consumidor. Dimensões anuais/por edição: capturar a edição e retificações, verificando metadados periodicamente. Estruturas organizacionais: histórico por vigência, conferência mensal ou mudança conhecida. A configuração de frequência não ativa automaticamente execução recorrente.

Comparar numerador e denominador no mesmo período, universo, unidade e etapa. Manter pessoas distintas, vínculos e FTE separados. Órgão comprador, pagador, solicitante e consumidor não são equivalentes. Rateio requer evidência e conservação de quantidades; parcela desconhecida permanece explícita. Material durável exige estoque, vida útil e distribuição; medicamento exige apresentação, dosagem, estoque e demanda pertinente. População é contextualização, não prova suficiente de demanda. Dados pessoais de saúde e folha não pertencem ao repositório nem ao vault.

## Aceite e reversão

Rodar `python3 scripts/verify_data_skills.py`, testes dos dois executáveis e validações APOS. Os testes determinísticos não certificam todas as fontes reais. Reverter o commit candidato e retornar ao manifesto anterior; dados do consumidor permanecem sob sua política. Publicação em main e adoção operacional são etapas distintas.

Referências: [HTTP Semantics, RFC 9110](https://www.rfc-editor.org/rfc/rfc9110.html), [OpenLineage facets](https://openlineage.io/docs/spec/facets/). Padrões orientam os contratos; não constituem certificação da implementação.
