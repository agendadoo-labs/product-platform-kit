---
id: "DOC-CBDF5889FE61C1"
type: "evidence"
scope: "Product Platform Kit"
document_role: "evidence"
purpose: "Registrar evidências de Auditoria de cobertura de capacidades."
read_when: ["Conferir resultados e seus limites: Auditoria de cobertura de capacidades"]
status: "documented"
authority: "documented_source_not_runtime_verification"
tier: "warm"
updated: "2026-10-18"
---
# Auditoria de cobertura de capacidades

Registrar evidências de Auditoria de cobertura de capacidades.

**Data:** 2026-09-13  
**Intent:** `I-PPK-CAPABILITY-001`  
**Fonte canônica da classificação:** [`capabilities/catalog.json`](../../capabilities/catalog.json)

## Conclusão executiva

O kit tem uma fundação operacional forte, especialmente em APOS, ambientes, segurança básica, telemetria, experimentos, design system e mapas. Ainda não é, porém, uma plataforma completa para iniciar qualquer produto: a maior parte das capacidades de negócio permanece ausente e algumas capacidades descritas como “disponíveis” são apenas documentação ou referências acopladas à stack Supabase.

Dos 130 elementos do mapa:

- 2 possuem módulo reutilizável validado: governança de IA/APOS e DevEx operacional;
- 7 possuem implementação de referência;
- 11 possuem template ou contrato;
- 8 possuem apenas orientação;
- 102 não têm cobertura comprovada.

Isso não é uma falha do kit: é o baseline honesto para orientar a evolução. A regra daqui em diante é **não confundir menção, documento, template e software validado**.

## Escala de evidência

| Nível | O que significa | Pode ser anunciado como pronto? |
|---|---|---|
| `validated_module` | código reutilizável, contrato, teste e evidência | sim, com limites declarados |
| `reference_implementation` | funciona em uma stack ou exemplo, mas ainda não é neutro/completo | somente como referência |
| `template_or_contract` | estrutura adotável sem operação completa | somente como starter |
| `guidance_only` | documentação de decisão ou prática | não |
| `not_covered` | não há evidência suficiente | não |

Ausência de claim no catálogo resulta automaticamente em `not_covered`. Uma capacidade só sobe de nível com evidência versionada.

## Cobertura por macrodomínio

| Macrodomínio | Elementos | Validado | Referência | Template/contrato | Guia | Ausente | Leitura |
|---|---:|---:|---:|---:|---:|---:|---|
| Business & Growth | 8 | 0 | 0 | 1 | 1 | 6 | Commercial Model tem contrato e influência documentada; software de simulação ainda é lacuna |
| Customer & Identity | 6 | 0 | 2 | 0 | 0 | 4 | identidade e perfil presos ao Supabase |
| Commerce & Offering | 8 | 0 | 0 | 0 | 0 | 8 | lacuna completa |
| Financial | 8 | 0 | 0 | 0 | 0 | 8 | lacuna completa; piloto Asaas vive no Valora |
| Marketplace | 7 | 0 | 0 | 0 | 0 | 7 | fora do caminho comum inicial |
| Information Access & Discovery | 17 | 0 | 0 | 1 | 0 | 16 | geo tem contrato; busca geral está ausente |
| Content & Knowledge | 6 | 0 | 0 | 0 | 0 | 6 | lacuna completa |
| Physical World & Operations | 12 | 0 | 0 | 1 | 0 | 11 | geoespacial parcial |
| Scheduling & Resource Allocation | 6 | 0 | 0 | 0 | 0 | 6 | lacuna completa |
| Trust, Risk & Safety | 13 | 0 | 0 | 0 | 0 | 13 | segurança técnica não equivale a trust/safety de produto |
| Enterprise Operations | 9 | 0 | 0 | 0 | 0 | 9 | admin/backoffice é lacuna crítica |
| Data & Intelligence | 10 | 0 | 3 | 0 | 1 | 6 | telemetria e experimentos são referências funcionais |
| Platform Engineering | 12 | 1 | 2 | 5 | 4 | 0 | maior cobertura, mas majoritariamente estrutural |
| Governance & Cross-Cutting | 8 | 1 | 0 | 3 | 2 | 2 | APOS é forte; privacidade operacional ainda não |

## O que já pode ser reutilizado

### Módulos e contratos mais maduros

- APOS: runtime, schemas, bootstrap, memória, evidência e testes.
- Map Core: tipos e padrões de dados geográficos, ainda sem suíte própria suficiente para claim validado.
- Design system: tokens e componentes neutros como starter, não uma biblioteca publicada.
- Telemetria e experimentos: clientes TypeScript e migrations Supabase de referência.
- Ambientes e recuperação: contratos, checklists e manifests provider-neutral.

### O que parecia mais completo do que é

- Identidade: há autenticação, perfis, papéis e RLS em Supabase; faltam interfaces neutras, lifecycle, MFA e testes de conformidade.
- Privacidade: há princípios e retenção, mas não um módulo de consentimentos, finalidades, solicitações do titular e auditoria.
- Observabilidade: telemetria de produto não substitui logs, traces, métricas técnicas e correlação.
- CI/CD: o workflow protege o kit, mas não é ainda uma automação reutilizável por novos produtos.
- Admin: existem orientações e exemplos em produtos consumidores, não um módulo no kit.

## Lacunas por domínio e decisão de ativação

O catálogo conserva todos os elementos do mapa v2, inclusive os não prioritários. Eles não devem ser implementados antecipadamente. A ativação deve ocorrer pelas propriedades do produto:

- `moves_money` ativa Payments, Billing, Fraud, Transaction Safety, Fiscal e Audit;
- `is_multisided_market` ativa Supply, Demand, Matching, Liquidity, Reputation e Marketplace Governance;
- `has_physical_goods` ativa Inventory, Fulfillment, Logistics e Returns;
- `has_user_generated_content` ativa Content Safety, Policy, Enforcement, Appeals e Moderation;
- `regulated_sector` adiciona o overlay regulatório correspondente;
- todo produto ativa Identity, Customer, Telemetry, Privacy, Security, Admin mínimo, Observability e Delivery.

Os 130 elementos, a camada transversal do Commercial Model e seus identificadores estão no catálogo legível por agentes. Isso evita duplicar uma tabela extensa nesta projeção humana e permite validação automática dos claims.

## Critérios de promoção de cobertura

Uma capacidade só pode ser promovida quando possuir:

1. job e limites do domínio;
2. entidades, comandos, eventos e interfaces;
3. contrato provider-neutral;
4. ao menos um adaptador de referência;
5. threat model e controles de privacidade quando aplicável;
6. telemetria e observabilidade;
7. testes de contrato, falha e recuperação;
8. guia de adoção e remoção;
9. evidência APOS fresca;
10. exemplo sem dados ou segredos de produtos consumidores.

## Limitações desta auditoria

- É uma inspeção do repositório em 2026-09-12, não uma certificação externa.
- Produtos consumidores podem ter implementações que ainda não foram generalizadas para o kit.
- A classificação mede evidência disponível, não a qualidade abstrata da ideia.
- O mapa é uma ontologia de composição de produto; o Epistemic Registry continua sendo a autoridade para recuperação de conhecimento.
