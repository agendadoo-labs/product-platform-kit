# Modelo operacional APOS do Product Platform Kit

Esta estrutura governa o próprio kit e fornece um starter reutilizável sem transformar especialidades humanas em organograma de agentes.

`Conversa → Intent → Contracts → Capabilities → Decision → AgentRun → Evidence → ProductState`

O pacote `packages/apos` continua sendo a implementação executável experimental do protocolo v0.1. A configuração desta pasta não amplia suas capacidades: contratos sem verificador permanecem `specified`.

Versões em `.apos/versions/` são imutáveis. O modelo anterior pode ser consultado pela tag `operating-model-v1-agent-starter`; um rollback cria nova revisão em vez de apagar esta migração.

O starter para repositórios consumidores está em `templates/apos/`. Contratos, dados, Intents e Evidence de cada produto devem permanecer no repositório consumidor.
