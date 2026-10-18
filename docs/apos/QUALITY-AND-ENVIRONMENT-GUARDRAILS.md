---
id: "DOC-C6C85347332AC2"
type: "contract"
scope: "Product Platform Kit"
document_role: "contract"
purpose: "Definir APOS Quality & Environment Guardrails."
read_when: ["Verificar regras e limites aplicáveis: APOS Quality & Environment Guardrails"]
status: "documented"
authority: "documented_source_not_runtime_verification"
tier: "warm"
updated: "2026-10-18"
---
# APOS Quality & Environment Guardrails

Definir APOS Quality & Environment Guardrails.

## Proposta

O APOS passa a representar requisitos não funcionais por `QualityProfile`, ambientes por `EnvironmentProfile`, exceções por `Waiver` e testes de recuperação por `RecoveryExercise`. Esses registros complementam Intent, Contracts e Evidence; não criam uma fonte paralela nem um organograma.

Um cenário de qualidade tem `stimulus`, `context`, `response`, `metric`, `threshold`, `verifier` e `evidence_ttl_days`. Um gate só passa com Evidence positiva, vinculada à revisão e ao ambiente, ainda vigente. Mudanças materiais em dependência, arquitetura, credenciais, classe de dados ou configuração invalidam evidência relacionada.

## Dimensões sugeridas

Segurança/privacidade; disponibilidade/confiabilidade; desempenho/latência; capacidade/escala; custo; consumo de agentes; observabilidade/auditoria; recuperação; manutenção/portabilidade; acessibilidade.

O consumidor seleciona somente o que for aplicável e define os limites. O kit fornece o formato e os anti-erros:

- alerta de orçamento não é hard stop;
- réplica não é backup;
- backup não testado não é prova de recuperação;
- consumo indisponível não é zero;
- exceção não é aprovação permanente;
- evidência vencida ou invalidada não é sucesso.

## Ambientes

O baseline contém `local`, `test`, `preview` e `production`, separados por exposição pública, classe de dados, fronteira de credenciais, controles de custo e gate. O template não fixa Azure, AWS, Supabase, Vercel ou outro fornecedor.

### Contrato de release entre cliente e dependências

Quando cliente e dependência são promovidos separadamente, o gate observa um contrato semântico versionado no ambiente-alvo. Migration ou configuração presente no Git é somente estado pretendido. A promoção segue: mudança aditiva, handshake remoto, cliente dependente, smoke autenticado e Evidence. Falta ou divergência de contrato bloqueia o release e nunca é convertida em zero, vazio ou erro comum de usuário. O padrão reutilizável está em `docs/apos/DATABASE-CONTRACT-RELEASE-GATE.md`.

## Exposure Budget

O starter modela separadamente pessoas, operações, valor econômico e dados expostos durante RTO/RPO. O consumidor define limites e fontes; a decisão usa a maior razão `observado ÷ limite`, nunca a média de riscos diferentes.

Quando a razão excede 1, o consumidor reduz o RTO ou reduz o percentual afetado por um controle verificável e recalcula a exposição. Segurança, privacidade, autorização e integridade financeira são pisos independentes do tráfego. Isso permite começar com uma arquitetura proporcional e criar gatilhos objetivos de evolução conforme uso e valor crescem.

## Consumo de agentes

Cada run material classifica risco e complexidade, escolhe o modelo menos caro capaz e declara tetos de contexto, saída, fanout, ferramentas e duração. Ao atingir um teto, reduz escopo, interrompe ou pede nova autoridade; nunca troca silenciosamente custo por conclusão. O uso real vem do provedor. Em integrações OpenAI, Usage permite detalhamento e Costs é a referência para conciliação financeira.

## Evolução de protocolo sugerida

Esta versão mantém `APOS v0.1`: são schemas operacionais compatíveis, ainda sem interpretação nativa do runtime. Uma futura `APOS v0.2` deve tornar Quality, Environment e Exposure Profiles, Waivers, validade/invalidação de Evidence, gates e budgets de risco tipos nativos, além de expor estados `not_ready`, `ready`, `degraded` e `recovering`.

## Referências

- [Azure Well-Architected Framework](https://learn.microsoft.com/en-us/azure/well-architected/pillars): confiabilidade, segurança, custo, excelência operacional e desempenho.
- [Azure Operational Excellence](https://learn.microsoft.com/en-us/azure/well-architected/operational-excellence/principles): requisitos funcionais/não funcionais, artefatos imutáveis, gates, observabilidade, IaC e deploy seguro.
- [FinOps Foundation Framework 2025](https://www.finops.org/wp-content/uploads/2025/05/English-FinOps-Framework-2025.pdf): uso/custo, valor, otimização, budgets, forecast, anomalias e governança.
- [OpenAI API Usage and Costs](https://developers.openai.com/api/reference/resources/admin/subresources/organization/subresources/usage): medição por projeto e conciliação financeira.
