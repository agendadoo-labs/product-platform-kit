---
id: "DOC-PPK-DISCOVERY-001"
type: "reference"
scope: "Product Platform Kit"
document_role: "procedure"
purpose: "Ligar necessidades, hipóteses e evidência de uso aos Intents do produto."
read_when: ["Projetar ou revisar jornadas e interfaces"]
status: "candidate"
authority: "derived_from_operational_sources"
tier: "warm"
updated: "2026-10-19"
graph_scope: "candidate"
---
# Produto — Guia — Descoberta e resultados verificáveis

Ligar necessidades, hipóteses e evidência de uso aos Intents do produto.

Fonte governante: `.apos/product/discovery-principles.json` (PD-PPK-001). Projeção gerada; candidato.

## Ciclo proporcional ao risco

- **Descobrir**: Situação observada, público, tarefa e obstáculos; classificar relato, observação e hipótese.
- **Definir**: Intent com resultado e critérios; definir o que sucesso significa para a pessoa, antes de medir cliques.
- **Desenvolver**: Alternativas proporcionais ao risco, protótipo e contrato de cada tela; registrar Decision e tradeoffs.
- **Verificar**: Evidence técnica e de uso separadas; medir conclusão, compreensão e erros com recorte e revisão.
- **Aprender**: Atualizar ProductState apenas no alcance da evidência, preservar hipótese refutada e próxima experiência.

## Medidas de resultado

- Conclusão da tarefa sem assistência
- Compreensão correta do resultado e dos seus limites
- Erros críticos e possibilidade de recuperação
- Tempo de tarefa como diagnóstico, nunca objetivo isolado

## Pesquisa e aceitação

- Recrutar pessoas do público e incluir necessidades de acessibilidade pertinentes.
- Definir tarefas realistas sem antecipar os cliques; preservar consentimento e minimizar dados pessoais.
- Definir antes do teste critérios, método, amostra e decisão; não impor um tamanho universal de amostra.
- Não generalizar um teste pequeno; feedback do solicitante e teste automatizado não são validação independente.

Intent → Contracts → Decisions → implementação → Evidence → ProductState → documentação derivada. Tokens, componentes e telas são meios; a evidência deve avaliar a tarefa. Fontes: [GOV.UK: necessidades](https://www.gov.uk/service-manual/user-research/start-by-learning-user-needs), [serviço simples](https://www.gov.uk/service-manual/service-standard/point-4-make-the-service-simple-to-use) e [Design Council](https://www.designcouncil.org.uk/resources/the-double-diamond/).
