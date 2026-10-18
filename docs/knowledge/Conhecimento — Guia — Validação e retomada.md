---
id: "KG-OPERATIONS-001"
type: "guide"
scope: "knowledge_governance"
document_role: "procedure"
purpose: "Executar controles portáteis e retomar sem duplicar fontes de estado."
read_when: ["Adotar ou manter gestão de conhecimento e especificações"]
status: "active"
authority: "repository_contract"
tier: "warm"
updated: "2026-10-18"
graph_scope: "vigente"
---

# Conhecimento — Guia — Validação e retomada

Executar controles portáteis e retomar sem duplicar fontes de estado.

Executar na raiz: `python3 packages/knowledge_governance/validate.py`. Regressões: `python3 -m unittest discover -s scripts/tests -p test_knowledge_governance.py`. O workflow Knowledge governance executa ambos em push e PR; required checks/branch protection são configuração independente e devem ser confirmados antes de alegar bloqueio de merge.

Catálogo explícito evita varredura de dados e segredos. O piloto inclui somente os contratos e o verificador. Consumers podem copiar o módulo preservando licença/origem e SHA256, ou executá-lo a partir de checkout do kit fixado em commit. Nunca depender de main flutuante. Validação não autoriza publicação.

`current_state` é a fonte única de checkpoint/status/next_action. `state_projections` devem ser geradas por render_state; edição manual causa falha. Linguagem livre fora dessas projeções não tem detecção semântica garantida.

Retomada: ler catálogo, Decision, último relatório de testes e estado remoto; executar controles; corrigir a fonte e regenerar a projeção; registrar riscos e próxima ação. Reversão por commit de compensação, preservando mudanças posteriores. Sem apagamento automático.

Integração Worker: receber catálogo permitido e identidade autorizada; validar antes de recuperar; rejeitar registros vencidos; retornar IDs/revisões/fontes; nunca promover respostas a conhecimento por sucesso aparente. Integração vault: projetar somente escopo autorizado, preservar histórico e não copiar ACLs como simples metadados.
