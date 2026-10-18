---
id: "DOC-EAD8A7BA7034A9"
type: "guide"
scope: "Product Platform Kit"
document_role: "procedure"
purpose: "Orientar Percursos de leitura por domínio."
read_when: ["Executar ou verificar o procedimento: Percursos de leitura por domínio"]
status: "documented"
authority: "documented_source_not_runtime_verification"
tier: "warm"
updated: "2026-10-18"
---
# Percursos de leitura por domínio

Orientar Percursos de leitura por domínio.

Escolha uma tarefa antes de expandir o contexto. Este guia organiza fontes existentes; não altera o modelo APOS ativo, as permissões ou o Context Compiler. A seleção por rota é documental e ainda não está integrada à recuperação do Worker.

## Entrada comum

Leia AGENTS, o guia de manutenção, o ponteiro do modelo ativo e ProductState. Execute o bootstrap do projeto e recupere o Intent e os contratos pertinentes. As rotas complementam esse conjunto; não podem remover contratos para reduzir contexto.

## Rotas

| Tarefa | Domínios | Limite da leitura |
|---|---|---|
| iniciar-produto | operating_model, templates | Intent, contratos aplicáveis, modelo ativo e limites do consumidor identificados. |
| retomar-sessao | session_memory | Fontes e revisões do Intent conferidas e próxima ação verificável definida. |
| compor-capacidades | capability_ontology, commercial_model | Capacidades necessárias e lacunas classificadas como referência, template ou implementação verificada. |
| otimizar-llm | llm_engineering | Hipótese, baseline, verificador, isolamento do holdout e limites de custo definidos. |
| publicar-com-evidencia | quality, security, environments | Contratos pertinentes e evidências vigentes estão identificados; publicação tem autorização específica. |
| manter-conhecimento | session_memory, operating_model | Fonte governante, inventário, dependências, links, evidência e retomada reconciliados. |

As listas ordenadas estão em [reading-routes.json](reading-routes.json). `python3 scripts/verify_reading_routes.py --route retomar-sessao` mostra a entrada comum e as fontes selecionadas. O comando é somente leitura; não executa instruções dos documentos.

## O que a revisão encontrou

- O índice plano misturava documentação vigente, planejamento, templates e histórico. As rotas agora declaram papel e limite de cada fonte.
- Alguns documentos têm caminhos consumidos por scripts e registros. Eles mantêm o nome técnico; o inventário fornece finalidade e apresentação legível.
- O memorial APOS v0.2 tem hash fixado por Evidence e AgentRun. Seu conteúdo deve permanecer idêntico; metadados ficam no inventário.
- A taxonomia não substitui a maturidade do catálogo de capacidades. Documentação e template não equivalem a módulo validado.
- Domínios são responsabilidades e fontes, não agentes obrigatórios. Um percurso pode atravessar vários domínios existentes sem criar outro domínio operacional.

## Manutenção e critérios

Quando um caminho mudar, revise o inventário e as rotas. O verificador exige caminhos locais existentes, domínios registrados, IDs únicos e preservação da entrada comum. Mudanças de autoridade ou do modelo normativo exigem o processo APOS de versionamento; este guia não faz essas mudanças.

Próxima evolução: avaliar seleção em perguntas reais, medir documentos e tokens efetivamente consumidos, então decidir integração ao Worker. Ainda não há ganho de qualidade, custo ou latência medido.

