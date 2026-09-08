# Modelo operacional APOS do Product Platform Kit

Esta estrutura governa o próprio kit e fornece um starter reutilizável sem transformar especialidades humanas em organograma de agentes.

`Conversa → Intent → Context + Profiles → Contracts → Capabilities → Decision → AgentRun → Evidence → ProductState`

O modelo operacional ativo adota APOS v0.2. O pacote `packages/apos` continua sendo a implementação transacional experimental do perfil v0.1; os novos perfis de arquitetura, contexto e execução de IA são configuração governada e verificada estruturalmente, não automação nativa do runtime.

Versões em `.apos/versions/` são imutáveis. O modelo anterior pode ser consultado pela tag `operating-model-v1-agent-starter`; um rollback cria nova revisão em vez de apagar esta migração.

O starter para repositórios consumidores está em `templates/apos/`. Contratos, dados, Intents e Evidence de cada produto devem permanecer no repositório consumidor.
