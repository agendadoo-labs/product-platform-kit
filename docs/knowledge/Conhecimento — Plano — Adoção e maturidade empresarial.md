---
id: "KG-ADOPTION-001"
type: "guide"
scope: "knowledge_governance"
document_role: "plan"
purpose: "Definir etapas e evidência para adoção empresarial sem confundir piloto com certificação."
read_when: ["Adotar ou manter gestão de conhecimento e especificações"]
status: "active"
authority: "repository_contract"
tier: "warm"
updated: "2026-10-18"
graph_scope: "vigente"
---

# Conhecimento — Plano — Adoção e maturidade empresarial

Definir etapas e evidência para adoção empresarial sem confundir piloto com certificação.

Escala de diagnóstico própria, não certificação: 1 ad hoc; 2 repetível; 3 definido; 4 medido e controlado; 5 melhoria sustentada. Avaliar dimensões separadamente: origem, governança, rastreabilidade, atualidade, recuperação e resultado.

1. CP-018 — consolidar contratos, domínio, validador, testes negativos e CI; critério: inconsistência deliberada falha. Piloto técnico no próprio kit.
2. CP-019 — aplicar a uma mudança real de produto; critério: requisitos, aceite, implementação e testes vinculados, evidência de resultado e rollback. Não encerrar somente por templates preenchidos.
3. CP-020 — transferência para outra pessoa/equipe; critério: retomar e entregar sem contexto oral do autor; registrar dúvidas e tempo. Exige participante independente, não simular sua aprovação.
4. CP-021 — expansão para outro domínio; critério: permissões efetivas, responsáveis definidos, exceções controladas e custo de manutenção medido.

Métricas: cobertura dos requisitos do piloto; documentos com origem verificável; tempo para localizar fonte correta; retrabalho por ambiguidade; incidências de contexto desatualizado; custo por entrega aceita. Definir baseline antes de alegar ganho. Não usar contagem de documentos ou testes como proxy de maturidade.

Papéis são responsabilidades atribuídas pelo consumidor: owner da especificação, revisor de aceite, executor e mantenedor da plataforma. Não impor organograma. Empresa deve escolher nível de separação conforme risco.

Projeto separado somente se houver serviço com API, implantação, identidade e operação próprias. Contratos permanecem versionados no kit.

## Estado atual do domínio de conhecimento

<!-- knowledge-state:start -->

Checkpoint: CP-KG-TECH-001

Status: technical_controls_implemented_independent_acceptance_pending

Next: Complete CP-020 independent transfer; apply v2 in a consumer with recorded before/after measurements.

<!-- knowledge-state:end -->
