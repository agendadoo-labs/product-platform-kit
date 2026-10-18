---
id: "DOC-FB9E7BE5DE0947"
type: "guide"
scope: "Product Platform Kit"
document_role: "procedure"
purpose: "Orientar Operação agêntica por APOS."
read_when: ["Executar ou verificar o procedimento: Operação agêntica por APOS"]
status: "documented"
authority: "documented_source_not_runtime_verification"
tier: "warm"
updated: "2026-10-18"
---
# Operação agêntica por APOS

Orientar Operação agêntica por APOS.

O Product Platform Kit governa mudanças pelo ciclo:

`Intent → Explore → Candidate → Verify → Evidence → ProductState → Observe → Learn`

## O que persiste

- **Intent:** problema, população, outcome, restrições, incertezas e evidência necessária.
- **Contract:** fronteira de comportamento ou resultado, com verificador ou lacuna explícita.
- **Decision:** julgamento material de permitir, escalar, escolher ou substituir.
- **Evidence:** observação ligada à versão exata do candidato.
- **ProductState:** projeção derivada do que as evidências sustentam.

AgentRun persiste quando a execução é material. Tarefas, handoffs, planos temporários e atribuições de agente são efêmeros.

## Capacidades

O sistema compõe capacidades como recuperar contexto, pesquisar, desenhar contrato, alterar artefato, verificar, publicar e observar. Produto, design, engenharia, dados e operações continuam como famílias de contrato, não como sequência, organograma ou lista de documentos obrigatórios.

## Governança

Autonomia depende de impacto, incerteza, reversibilidade, ambiente, custo e sensibilidade dos dados. Trabalho local e reversível pode produzir candidatos. Main, releases, custos, permissões, credenciais e ações destrutivas exigem autorização vinculada à ação e revisão.

Conclusão exige Intent satisfeito, contratos aplicáveis atendidos e evidência suficiente. Código, commit, documento e publicação são outputs, não outcomes.

## Adoção

Use `templates/apos/`. O antigo `templates/agents/` está descontinuado e preservado na tag `operating-model-v1-agent-starter`.
