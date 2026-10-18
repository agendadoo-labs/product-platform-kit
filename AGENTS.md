# Product Platform Kit — operação APOS

**Início de agentes/LLMs:** leia o [guia de manutenção de implementação e documentação](templates/apos/APOS-MAINTENANCE.md) antes de alterar o projeto e ao retomar checkpoints.

O modelo operacional ativo está em [`.apos/active-model.json`](.apos/active-model.json). Se o agente não conhece APOS, leia primeiro `templates/apos/APOS-AGENT-BOOTSTRAP.md`. Ao iniciar ou retomar uma sessão, execute `npm run apos:bootstrap`, relacione o pedido atual a um Intent aberto ou novo e só então compile o contexto daquele Intent. Este repositório desenvolve infraestrutura reutilizável; não imponha organogramas, papéis profissionais ou regras de um produto consumidor.

## Protocolo

O APOS v0.2 é composto por Kernel, Context Compiler, Epistemic Registry, Adaptive Ceremony e Learning and Cost Loop. A cerimônia `Lite`, `Standard` ou `Strict` segue a pior dimensão de risco e não pode ser reduzida pelo executor.

1. Interpretar a conversa como Intent: problema, população, outcome, restrições, incertezas e evidência necessária.
2. Recuperar Constitution, ProductState, Intents, Decisions, Contracts e Evidence relacionados.
3. Compor a menor combinação suficiente de Capabilities. Produto, design, engenharia, dados e operações são famílias de contratos ou conhecimentos, não agentes obrigatórios.
4. Classificar cada ação por impacto, incerteza, reversibilidade, ambiente, custo, consumo de agentes, criticidade de qualidade, exposição durante RTO/RPO, validade da evidência e sensibilidade.
5. Produzir candidato somente dentro da autoridade disponível. Publicação, custos, permissões, credenciais, dados pessoais e efeitos destrutivos exigem autorização específica.
6. Separar execução de verificação. Resultado do executor não é Evidence.
7. Atualizar ProductState apenas quando `Intent satisfeito ∧ Contracts atendidos ∧ Evidence suficiente e vigente`.
8. Persistir conhecimento; tarefas, handoffs e status intermediários são efêmeros.
9. Tratar limites de tokens como baselines calibráveis por resultados. Nunca omitir silenciosamente contratos, riscos, incertezas ou fontes necessárias para caber em um teto; interromper ou escalar e registrar a decisão.
10. Em trabalho com múltiplos times, atualizar `.apos/coordination/workstreams.json` com ownership, dependências e próximo checkpoint. Ownership coordena; não concede autoridade.
11. No checkpoint, atualizar as projeções humanas e o relatório de Intents com `npm run apos:checkpoint`. Se entidades, relações, classificação, retenção ou linhagem mudaram, atualizar o DataMap antes do checkpoint.

## Reutilização

- Artefatos gerais vivem no kit; dados, contratos de negócio e evidências de consumidores ficam nos repositórios consumidores.
- O starter ativo está em `templates/apos/`. `templates/agents/` é legado consultável e não deve iniciar novos projetos.
- Documentos são projeções humanas úteis, não fontes de verdade paralelas obrigatórias.
- Requisitos não funcionais vivem em Contracts e cenários mensuráveis do `QualityProfile`; o starter não fixa metas de consumidores.
- O `ExposureBudget` usa a pior dimensão entre pessoas, operações, valor econômico e dados para evoluir RTO ou reduzir impacto; baixo volume não relaxa segurança, privacidade, autorização ou integridade financeira.
- Budget, alerta, quota e circuit breaker são controles diferentes. Replicação, backup e restauração testada também são controles diferentes.
- Nunca incluir credenciais, dados de negócio, caminhos pessoais ou decisões específicas de um consumidor em templates reutilizáveis.

## Proveniência e versões

Preserve a origem de cada afirmação e diferencie definido, relatado, sugerido e desconhecido. Mudanças do modelo operacional criam nova versão e Decision; não reescreva versões publicadas.

O modelo anterior está congelado na tag `operating-model-v1-agent-starter` e inventariado em `.apos/archive/operating-model-v1/manifest.json`.

A projeção para um vault pessoal é um efeito externo configurável do repositório, não requisito do template público. Quando previamente autorizada e acessível, copie somente documentação material, sem segredos ou caminhos internos.
