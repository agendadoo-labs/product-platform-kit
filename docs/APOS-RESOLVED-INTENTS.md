---
title: APOS — Intents resolvidos
updated: 2026-10-18
---

# Intents resolvidos

> Projeção determinística da revisão 18. “Resolvido” exige consistência entre ProductState e o registro do Intent; validade para reuso ainda depende da revisão, do ambiente e da Evidence.

## I-PPK-APOS-001

- **Problema resolvido:** O toolkit publica o APOS, mas seu starter e sua documentação operacional ainda orientam uma equipe fixa e entregáveis departamentais.
- **Resultado registrado:** O toolkit passa a operar e oferecer um starter por Intent, Contracts, Capabilities, Decision, AgentRun, Evidence e ProductState, preservando o starter anterior para consulta e rollback.
- **Decisões:** `D-PPK-APOS-001`.
- **Última execução:** `AR-PPK-APOS-001` — succeeded.
- **Última evidência:** `E-PPK-APOS-001` — passou.
- **Ambiente:** não informado.
- **Incertezas remanescentes:** Generic runtime verifiers beyond bootstrap; Removal date for the physical legacy starter.

## I-PPK-APOS-002

- **Problema resolvido:** O starter APOS não possui um mecanismo reutilizável para requisitos não funcionais, segurança de ambientes, contenção de custos, consumo de agentes e recuperação.
- **Resultado registrado:** O kit oferece Quality Profiles, Environment Profiles, Exposure Budget, gates, Evidence com validade e templates de exceção/DR sem acoplamento a fornecedor ou produto.
- **Decisões:** `D-PPK-APOS-002`.
- **Última execução:** `AR-PPK-APOS-002` — succeeded.
- **Última evidência:** `E-PPK-APOS-005` — passou.
- **Ambiente:** repository.
- **Incertezas remanescentes:** Native runtime support for Profiles, Waivers and evidence expiry; Consumer adoption evidence.

## I-PPK-APOS-003

- **Problema resolvido:** Agents can accidentally alter unrequested behavior in non-visual surfaces and compensate with broad, repetitive review.
- **Resultado registrado:** The kit makes preservation-by-default operational through a reusable Change Envelope, contract, policy gate and verifier checks.
- **Decisões:** `D-PPK-APOS-003`.
- **Última execução:** `AR-PPK-APOS-003` — succeeded.
- **Última evidência:** `E-PPK-APOS-009` — passou.
- **Ambiente:** repository_candidate.
- **Incertezas remanescentes:** main publication requires separate authorization; consumer adoption evidence.

## I-PPK-APOS-004

- **Problema resolvido:** APOS v0.1 does not explicitly govern architecture maturity, selective context retrieval or measurable multi-provider AI execution, allowing complexity and token cost to grow without an evidence-based evolution rule.
- **Resultado registrado:** APOS v0.2 adds reusable Architecture, Context and AI Execution profiles, a progressive adoption policy and a complete evolution memorial.
- **Decisões:** `D-PPK-APOS-004`.
- **Última execução:** `AR-PPK-APOS-004` — succeeded.
- **Última evidência:** `E-PPK-APOS-011` — passou.
- **Ambiente:** repository_candidate.
- **Incertezas remanescentes:** main publication requires separate authorization; native v0.2 runtime support; provider selection awaits a bounded pilot and evals.

## I-PPK-APOS-005

- **Problema resolvido:** Um desenvolvedor sem contexto prévio não consegue entender e executar o APOS v0.2 apenas pelos READMEs atuais, que misturam referências v0.1 e v0.2 e não oferecem um primeiro fluxo completo.
- **Resultado registrado:** Um novo desenvolvedor entende o modelo, distingue governança v0.2 do runtime v0.1 e consegue registrar e compilar seu primeiro Intent seguindo um percurso único e verificável.
- **Decisões:** `D-PPK-APOS-005`.
- **Última execução:** `AR-PPK-APOS-005` — succeeded.
- **Última evidência:** `E-PPK-APOS-012` — passou.
- **Ambiente:** repository_main.
- **Incertezas remanescentes:** time-to-first-valid-Intent requires observation with a new developer.

## I-PPK-APOS-006

- **Problema resolvido:** À medida que um produto e seus times crescem, uma nova sessão de agente pode perder decisões, trabalho aberto e dependências ou gastar contexto relendo todo o histórico.
- **Resultado registrado:** Toda sessão começa com um pacote pequeno, determinístico e verificável do estado vigente, relaciona o pedido a um Intent e só então expande o contexto necessário ao domínio e ao risco.
- **Decisões:** `D-PPK-APOS-006`.
- **Última execução:** `AR-PPK-APOS-006` — succeeded.
- **Última evidência:** `E-PPK-APOS-013` — passou.
- **Ambiente:** candidate_branch.
- **Incertezas remanescentes:** retrieval miss rate and optimal package size require observation in larger multi-team repositories.

## I-PPK-APOS-007

- **Problema resolvido:** Produtos crescentes precisam manter mapa de dados, memória humana e trabalho aberto sincronizados com registros operacionais sem reler todo o histórico ou duplicar fontes de verdade.
- **Resultado registrado:** O starter fornece DataMap dedicado, ponteiro compacto no ProductState, projeção de memória e relatório de Intents abertos gerados e verificáveis em cada checkpoint.
- **Decisões:** `D-PPK-APOS-007`.
- **Última execução:** `AR-PPK-APOS-007` — succeeded.
- **Última evidência:** `E-PPK-APOS-014` — passou.
- **Ambiente:** candidate_branch.
- **Incertezas remanescentes:** adoption and retrieval misses require evidence from more consumer projects.

## I-PPK-APOS-008

- **Problema resolvido:** O kit não consolidava Intents resolvidos nem fornecia um modelo que distinguisse Git, infraestrutura, dados, segredos, memória agêntica e Evidence de reconstrução.
- **Resultado registrado:** O starter gera memória de Intents resolvidos e oferece princípios, matriz e Recovery Manifest neutros para reconstrução comprovável e recuperação do contexto agêntico.
- **Decisões:** `D-PPK-APOS-008`.
- **Última execução:** `AR-PPK-APOS-008` — succeeded.
- **Última evidência:** `E-PPK-APOS-015` — passou.
- **Ambiente:** candidate_branch.
- **Incertezas remanescentes:** adoption and restore-drill evidence must be supplied by each consumer; semantic memory remains intentionally deferred until retrieval misses justify it.

## I-PPK-CAPABILITY-001

- **Problema resolvido:** A proposta de valor do Product Platform Kit e seu inventário reutilizável ainda não estão organizados contra uma ontologia ampla de capacidades de produtos digitais, dificultando enxergar cobertura, lacunas e a melhor ordem de evolução.
- **Resultado registrado:** O kit declara sua missão, incorpora um mapa de capacidades legível por humanos e agentes, mede cobertura com evidência, prioriza módulos reutilizáveis, fornece benchmark e caminho de implementação para os dez primeiros e modela o Commercial Model como camada econômica transversal com influências explícitas.
- **Decisões:** `D-PPK-CAPABILITY-001`, `D-PPK-CAPABILITY-002`.
- **Última execução:** `AR-PPK-CAPABILITY-002` — succeeded.
- **Última evidência:** `E-PPK-CAPABILITY-002` — passou.
- **Ambiente:** main.
- **Incertezas remanescentes:** consumer adoption is not yet measured; domain-specific commercial changes still require their own Intent and Evidence; exact desktop token usage is unavailable.

## I-PPK-LLM-001

- **Problema resolvido:** Harness e otimizações sem domínio explícito para governar métricas, fronteiras e promoção.
- **Resultado registrado:** Domínio registrado no compilador de contexto e no registro epistêmico, com política, template e documentação verificáveis.
- **Decisões:** `D-PPK-LLM-001`.
- **Última execução:** nenhuma.
- **Última evidência:** `E-PPK-LLM-001` — passou.
- **Ambiente:** isolated_repository_snapshot.
- **Incertezas remanescentes:** nenhuma registrada.

