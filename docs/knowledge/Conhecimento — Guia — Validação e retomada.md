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

Executar na raiz: `python3 packages/knowledge_governance/validate.py`. Regressões: `python3 -m unittest discover -s scripts/tests -p 'test_knowledge*.py'`. O workflow Knowledge governance executa o gate proporcional em push e PR; required checks/branch protection são configuração independente e devem ser confirmados antes de alegar bloqueio de merge.

Catálogo explícito evita varredura de dados e segredos. O piloto inclui somente os contratos e o verificador. Consumers podem copiar validate.py e controls.py juntos, preservando licença/origem e SHA256 de ambos, ou executá-lo a partir de checkout do kit fixado em commit. Nunca depender de main flutuante. Validação não autoriza publicação.

No catálogo legado v1, `current_state` é a fonte e `render_state` gera a projeção completa. No v2 adotado neste kit, `current_state_ref` aponta para ProductState e o comando `project` gera blocos delimitados; edição manual do bloco causa falha. Linguagem livre fora dessas projeções não tem detecção semântica garantida.

Retomada: ler catálogo, Decision, último relatório de testes e estado remoto; executar controles; corrigir a fonte e regenerar a projeção; registrar riscos e próxima ação. Reversão por commit de compensação, preservando mudanças posteriores. Sem apagamento automático.

Integração Worker: receber catálogo permitido e identidade autorizada; validar antes de recuperar; rejeitar registros vencidos; retornar IDs/revisões/fontes; nunca promover respostas a conhecimento por sucesso aparente. Integração vault: projetar somente escopo autorizado, preservar histórico e não copiar ACLs como simples metadados.

## Estado atual do domínio de conhecimento

<!-- knowledge-state:start -->

Checkpoint: CP-KG-TECH-001

Status: technical_controls_implemented_independent_acceptance_pending

Next: Complete CP-020 independent transfer; apply v2 in a consumer with recorded before/after measurements.

<!-- knowledge-state:end -->

## Operação dos três controles técnicos

1. Edite o estado governante em `.apos/state/product-state.json`, campo `knowledge_checkpoint`. No catálogo v2, `current_state_ref` é um ponteiro; não mantenha cópia `current_state`.
2. Execute `python3 scripts/knowledge-controls.py project`. O comando atualiza somente os blocos delimitados das quatro projeções cadastradas, preservando texto manual. Não adicione marcadores repetidos. Depois revise as diferenças e atualize os hashes/revisões do inventário documental alterado.
3. Execute `python3 scripts/knowledge-controls.py check` e `python3 scripts/knowledge-controls.py impact`. Para uma evidência invalidada, execute novamente sua verificação antes de registrar a nova impressão; não copie uma impressão para simular validação.
4. Execute `python3 scripts/knowledge-controls.py gate --base COMMIT_BASE_COMPLETO --intent I-PPK-KNOWLEDGE-001` em checkout Git. Use o commit-base do evento de CI/revisão. O gate considera todos os caminhos alterados, incluindo remoções e nomes antigos de arquivos movidos.

O piso de integridade documental vale em todos os níveis. Lite valida metadados e catálogo; Standard acrescenta a suíte de conhecimento; Strict acrescenta verificações e testes APOS. O nível é o maior entre arquivos alterados e cerimônias do Intent nas revisões base e candidata. Política, contratos, scripts e caminhos desconhecidos exigem Strict. O Intent de conhecimento atual permanece Strict; não se reduz esse nível para economizar testes. Outros workflows existentes continuam ativos.

O gate é uma verificação técnica, não um sistema de autorização. Proteção da branch, revisão independente e autorização para efeitos externos continuam controles separados. Alteração maliciosa do próprio workflow exige revisão e proteção no servidor; este código não promete impedir isso sozinho.

Checkpoint CP-KG-TECH-001: extensão optativa do catálogo para v2; modelo operacional APOS publicado permanece imutável. Reversão: reverter o commit desta entrega e executar os verificadores da revisão restaurada. Catálogos v1 de consumidores não são migrados automaticamente. A aceitação independente e as métricas de transferência do CP-020 continuam pendentes.
