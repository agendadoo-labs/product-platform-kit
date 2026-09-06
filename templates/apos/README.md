# Starter APOS para repositórios consumidores

Este starter substitui o antigo modelo de equipe fixa. Ele fornece uma estrutura mínima para governar agentes por intenção, contratos, capacidades e evidência.

## Adoção

1. Copie `AGENTS.md` e a pasta `.apos/` para o repositório consumidor.
2. Substitua os campos `ADAPTAR` na Constitution e nos Contracts.
3. Registre o primeiro Intent do produto; não converta um backlog inteiro mecanicamente.
4. Selecione somente os Contracts e Capabilities aplicáveis à mudança.
5. Adapte `QualityProfile`, `EnvironmentProfile` e `ExposureBudget`; selecione somente dimensões aplicáveis, transforme qualidade em cenários mensuráveis e defina gatilhos progressivos de RTO/RPO.
6. Implemente verificadores progressivamente. Enquanto não existirem, marque-os `specified`.
7. Preserve o modelo anterior com commit, tag e hashes antes de trocar o ponteiro ativo.
8. Produza ProductState apenas a partir de Evidence; não marque “feito” manualmente.

Produto, design, engenharia, dados e operações podem continuar como famílias de contrato. Eles não representam agentes, etapas obrigatórias nem documentos independentes que toda mudança deve produzir.

O starter não contém modelos de IA fixos. O roteamento escolhe o menor modelo capaz depois de considerar risco e complexidade, declara tetos de consumo antes do run e não converte a escolha em autoridade ou evidência.

O starter separa medição, budget, alerta, quota e circuit breaker. Também separa alta disponibilidade, replicação, backup e restauração comprovada. Os valores de RTO, RPO, latência, gasto e tokens pertencem ao consumidor e devem ser aprovados no contexto do seu negócio.

O `ExposureBudget` evita antecipar infraestrutura cara: projeta pessoas, operações, valor econômico e dados no RTO/RPO vigente e exige evolução quando qualquer limite for superado. O template não oferece números padrão, pois exposição aceitável é uma decisão do consumidor.
