---
id: "DOC-PPK-DESIGN-001"
type: "reference"
scope: "Product Platform Kit"
document_role: "procedure"
purpose: "Orientar interfaces em que cada tela permite uma tarefa clara e produz resultado verificável."
read_when: ["Projetar ou revisar jornadas e interfaces"]
status: "candidate"
authority: "derived_from_operational_sources"
tier: "warm"
updated: "2026-10-19"
graph_scope: "candidate"
---
# Design — Guia — Interfaces orientadas a tarefas

Orientar interfaces em que cada tela permite uma tarefa clara e produz resultado verificável.

Fonte governante: `.apos/design/experience-principles.json` (UX-PPK-001). Projeção gerada por `scripts/project-experience.py`. Candidato; adoção explícita pelo consumidor.

O starter existente já define tokens, componentes, foco, alvos de 44 px e redução de movimento. Este complemento define o trabalho que a interface deve permitir. Não substitui uma avaliação com pessoas.

## Princípios

- UX-01: Definir situação, pessoa, tarefa, resultado e ação principal antes de escolher componentes.
- UX-02: Exibir o objeto da tarefa primeiro; contexto secundário deve ser progressivo e recuperável.
- UX-03: Expor filtros aplicados, unidade, período, cobertura e origem junto do resultado.
- UX-04: Distinguir carregando, resultado, vazio, dado ausente, erro e insuficiência; cada estado indica próximo passo.
- UX-05: Preservar entrada e filtros no erro; permitir nova tentativa sem reiniciar a jornada.
- UX-06: Não cortar preços, quantidades e valores essenciais. Detalhes recuperam textos abreviados e evidências.
- UX-07: Tabelas pesquisáveis/paginadas têm escopo explícito; exportação declara página ou conjunto, sem truncamento silencioso.
- UX-08: Teclado, foco visível, nomes acessíveis e tabela alternativa a gráficos fazem parte da implementação.
- UX-09: Componentes usam tokens compartilhados de tipografia, altura, padding e raio. Ações do mesmo grupo alinham altura e estado; em pouco espaço, empilhar antes de comprimir ou quebrar rótulos de forma desigual.

## Contrato por tela

Preencher `templates/apos/product/screen-brief.template.json`: id, audience, situation, job, outcome, primary_action, input, applied_scope, states, evidence, acceptance, rollback. Usar estados distintos: loading, success, empty, missing, error, insufficient. A descrição de erro deve indicar recuperação; um dado ausente nunca vira zero.

## Verificação

- Verificar 320, 390, 768 e 1280 CSS px, valores longos e textos extensos; página sem overflow horizontal; tabela com região rolável nomeada e acesso por teclado.
- Exercitar busca, detalhe, paginação, troca de filtros, erro e recuperação; comparar resultado com fonte.
- Verificar foco na abertura e fechamento de modal, escape, contraste e alvos; inspeção parcial não certifica WCAG.
- Medir conclusão e compreensão da tarefa com pessoas do público; registrar amostra, ajuda recebida, erros, limitações e revisão testada.
- Comparar dimensões dos controles equivalentes em cada breakpoint e com zoom; justificar variantes semânticas em vez de ajustes por tela.

## Fontes e limites

- [nielsen](https://www.nngroup.com/articles/ten-usability-heuristics/): Estado visível, linguagem familiar, controle, consistência, prevenção e recuperação de erros; revisão heurística não substitui pesquisa.
- [gov-needs](https://www.gov.uk/service-manual/user-research/start-by-learning-user-needs): Necessidade deve partir de pesquisa; separar hipótese de necessidade observada.
- [gov-simple](https://www.gov.uk/service-manual/service-standard/point-4-make-the-service-simple-to-use): Concluir a tarefa com pouca ajuda e testar o serviço com pessoas.
- [wcag-reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html): Verificar reflow a 320 CSS px; tabelas bidimensionais podem ter rolagem própria sem transbordar a página.
- [wcag-target](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html): WCAG 2.2 AA define 24 CSS px com exceções; 44 px é o baseline de componentes do Kit, não o mínimo AA.
- [wcag-contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html): Verificar contraste 4,5:1 para texto comum e 3:1 para texto grande.
- [diamond](https://www.designcouncil.org.uk/resources/the-double-diamond/): Alternar descoberta/definição e desenvolvimento/entrega; voltar às hipóteses quando a evidência contrariar a solução.

- Não certifica conformidade WCAG por checklist.
- Não impõe marca, framework ou dados de um consumidor a outro.
- Nenhuma melhoria de usabilidade é comprovada apenas por aprovação de testes de código.
