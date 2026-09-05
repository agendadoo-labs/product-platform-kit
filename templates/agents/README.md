# Starter de equipe agêntica

1. Copie `AGENTS.md` para a raiz do repositório consumidor.
2. Copie `.agents/` para a raiz.
3. Ajuste os campos `[ADAPTAR]` e os modelos disponíveis no ambiente.
4. Copie `.env.agents.example` para a configuração segura do seu orquestrador, sem inserir chaves no repositório.
5. Escolha um plano em `.agents/execution-plans/`: `lean`, `balanced` ou `critical`.
6. Faça uma tarefa piloto envolvendo duas especialidades.
7. Crie `docs/agent-runs/` e gere o relatório de tokens ao concluir cada operação.

`AGENTS.md` contém instruções consumidas pelo agente. `.agents/team.yaml` é o manifesto portátil de papéis, roteamento e orçamento.

```text
AGENTS.md
.agents/
├── team.yaml
├── HANDOFF.md
├── TOKEN-REPORT.md
├── execution-plans/
│   ├── lean.yaml
│   ├── balanced.yaml
│   └── critical.yaml
└── roles/
    ├── development.md
    ├── design.md
    └── data.md
```
