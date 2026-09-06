# Starter APOS para repositórios consumidores

Este starter substitui o antigo modelo de equipe fixa. Ele fornece uma estrutura mínima para governar agentes por intenção, contratos, capacidades e evidência.

## Adoção

1. Copie `AGENTS.md` e a pasta `.apos/` para o repositório consumidor.
2. Substitua os campos `ADAPTAR` na Constitution e nos Contracts.
3. Registre o primeiro Intent do produto; não converta um backlog inteiro mecanicamente.
4. Selecione somente os Contracts e Capabilities aplicáveis à mudança.
5. Implemente verificadores progressivamente. Enquanto não existirem, marque-os `specified`.
6. Preserve o modelo anterior com commit, tag e hashes antes de trocar o ponteiro ativo.
7. Produza ProductState apenas a partir de Evidence; não marque “feito” manualmente.

Produto, design, engenharia, dados e operações podem continuar como famílias de contrato. Eles não representam agentes, etapas obrigatórias nem documentos independentes que toda mudança deve produzir.

O starter não contém modelos de IA fixos. O roteamento escolhe o menor modelo capaz depois de considerar risco e complexidade, sem converter essa escolha em autoridade ou evidência.
