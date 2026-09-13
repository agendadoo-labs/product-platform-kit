# Commercial Model como Economic Control Plane

## Decisão

O Product Platform Kit trata `Commercial Model` como uma camada transversal da Digital Product Capability Ontology. Ele não é sinônimo de preço, cobrança ou pagamento: traduz o modelo de negócio em eventos econômicos, incentivos, direitos, obrigações, objetivos e guardrails que influenciam vários domínios do produto.

```text
Business Model
  → Commercial Model / Economic Control Plane
    → objetivos e incentivos por ator
      → funções objetivo e contratos dos domínios
        → comportamento de produto, algoritmos e operação
          → resultado e novo equilíbrio de mercado
```

Esta síntese deriva do memorial `Commercial Model Architecture v2`, fornecido pelo builder em 2026-09-13. O memorial completo continua como fonte de elaboração; este documento é a projeção operacional e provider-neutral adotada pelo kit.

## Posição na arquitetura

O Commercial Model:

- fica acima de `pricing`, `billing`, `payments`, `ledger` e `settlement`;
- referencia capabilities existentes, sem duplicá-las;
- declara quem paga, quem recebe, por qual evento e sob quais condições;
- torna explícito como cada ator pode responder ao incentivo;
- propaga impactos de primeira e segunda ordem;
- exige guardrails contra fraude, concentração, perda de utilidade, discriminação e otimização de proxy;
- não autoriza automaticamente mudanças nos domínios influenciados.

## Contrato mínimo

Todo sistema comercial deve declarar, no mínimo:

| Elemento | Pergunta respondida |
|---|---|
| Atores | Quem usa, paga, recebe, intermedeia ou regula? |
| Streams | Quais fluxos econômicos coexistem? |
| Unidade econômica | Qual entidade e evento tornam algo faturável? |
| Função de preço | Como o valor é determinado? |
| Entitlement | Que direito nasce após o evento comercial? |
| Settlement | Como valores e obrigações são distribuídos? |
| Objetivos | O que cada ator tenta maximizar ou minimizar? |
| Tensões | Quais objetivos entram em conflito? |
| Abuse surfaces | Que fraude, gaming ou arbitragem o incentivo cria? |
| Guardrails | Que resultados não podem piorar para otimizar receita? |
| Evidência | Como saberemos se o equilíbrio melhorou? |

O exemplo machine-readable está em [`commercial-model/system.example.json`](../../commercial-model/system.example.json).

## Grafo de influência

As arestas registram mecanismo e sensibilidade. Elas não significam que todo projeto deve implementar todos os domínios.

| Domínio do catálogo | Influência típica | Sensibilidade inicial |
|---|---|---|
| Business & Growth | proposta de valor, segmentação, canais e metas econômicas | crítica |
| Customer & Identity | pagador, beneficiário, organização, compartilhamento e lifecycle | alta |
| Commerce & Offering | pacote, preço, configuração, assinatura e entitlement | crítica |
| Financial | cobrança, pagamento, conciliação, reconhecimento, fiscal e inadimplência | crítica |
| Marketplace | liquidez, matching, lead, exposição e reputação | crítica quando aplicável |
| Information Access & Discovery | objetivo de busca/ranking, relevância e exposição paga | alta |
| Content & Knowledge | direitos, licenças, profundidade e qualidade do conteúdo | média |
| Physical World & Operations | capacidade, fulfillment, SLA e custo marginal | média quando aplicável |
| Scheduling & Resource Allocation | capacidade, disponibilidade e alocação | média quando aplicável |
| Trust, Risk & Safety | fraude, gaming, circumvention, disputas e proteção | crítica |
| Enterprise Operations | backoffice, regras, suporte, contratos e auditoria | alta |
| Data & Intelligence | eventos econômicos, métricas, experimentos, modelos e otimização | crítica |
| Platform Engineering | confiabilidade, segurança, observabilidade e FinOps por unidade | alta |
| Governance & Cross-Cutting | privacidade, fairness, compliance, acesso e accountability | crítica |

## Regras de propagação

Uma mudança comercial deve produzir um `Commercial Model Change Impact Assessment`:

1. Definir o choque: estado anterior, estado proposto e hipótese econômica.
2. Mapear atores afetados e suas funções objetivo antes/depois.
3. Definir o evento econômico e o billable event sem ambiguidade.
4. Percorrer o grafo de influência e classificar impacto por domínio.
5. Identificar efeitos de segunda ordem, atrasos e feedback loops.
6. Localizar fraude, gaming, disputa, concentração e externalidades.
7. Definir métricas primárias, contramétricas e limites de segurança.
8. Verificar contratos, evidência, reversibilidade e plano de rollback.
9. Simular cenários antes de publicar quando houver múltiplos lados ou risco material.
10. Reavaliar o equilíbrio com dados reais após a mudança.

Mudanças em pagamentos, dados pessoais, fiscal, entitlement, crédito, ranking monetizado ou liquidação usam cerimônia APOS `Strict`. Alterações locais e reversíveis de apresentação podem usar nível menor, desde que o Change Envelope demonstre que contratos econômicos não mudaram.

## Princípios de produto e algoritmo

- Receita é objetivo; não é permissão para degradar utilidade, confiança ou segurança.
- Uma métrica monetizável tende a ser manipulada; sua validação e contestação tornam-se capacidades do sistema.
- Ranking pago nunca deve ser introduzido implicitamente. Sinal comercial, identificação ao usuário e impacto em relevância precisam ser explícitos.
- Entitlement é o contrato entre o evento econômico e o direito de uso; cobrança bem-sucedida sem entitlement consistente é falha financeira.
- Telemetria do evento monetizado precisa ser idempotente, auditável e reconciliável.
- O custo marginal de infraestrutura e agentes deve ser ligado à unidade econômica quando puder alterar margem ou disponibilidade.
- Nenhum domínio influenciado deve ser alterado fora do escopo sem decisão e evidência próprias.

## Aplicação inicial no Valora

O plano individual do Valora é modelado como assinatura recorrente de acesso:

- ator pagador e beneficiário inicial: pessoa física;
- proposta: consultas e relatórios comparativos;
- unidade de limite gratuito: busca mensal que retornou uma lista visualizada;
- allowance gratuito: três resultados de busca visualizados por mês;
- oferta paga: R$ 50/mês ou R$ 40/mês no compromisso trimestral;
- entitlement: acesso ao conjunto contratado de consultas e relatórios;
- domínios críticos: Identity, Subscription, Entitlements, Payments, Billing, Fiscal, CRM, Telemetry, Trust & Safety e FinOps;
- Search continua otimizado por relevância dos comparáveis, não por receita ou exposição paga;
- PJ, imobiliárias, matriz/filial e múltiplos assentos permanecem extensões planejadas, não requisitos da primeira entrega.

## Critério de conclusão

Uma implementação comercial só pode ser considerada pronta quando:

- evento econômico e entitlement possuem contrato e testes;
- pagamento, webhook e reconciliação são idempotentes;
- dados pessoais têm finalidade, base legal, retenção e acesso definidos;
- métricas de receita possuem guardrails de utilidade e confiança;
- falhas e disputas possuem estado recuperável;
- custo e consumo podem ser reconciliados com o resultado;
- o grafo de influência foi revisado e os impactos fora de escopo foram preservados.

