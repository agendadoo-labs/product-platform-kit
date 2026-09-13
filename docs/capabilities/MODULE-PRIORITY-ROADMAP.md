# Roadmap priorizado de módulos

**Data:** 2026-09-12  
**Base:** missão do Product Platform Kit + auditoria `I-PPK-CAPABILITY-001`

## Como a ordem foi definida

A ordem não nasce de uma soma arbitrária. Cada candidato passa por cinco perguntas, nesta sequência:

1. **É um piso obrigatório?** Segurança, privacidade e capacidade de operar vêm antes de conveniência.
2. **Quantos tipos de produto destrava?** Capacidades universais vencem capacidades de nicho.
3. **Quantas outras capacidades dependem dela?** Fundamentos com alto poder de desbloqueio vêm antes.
4. **Qual lacuna real existe hoje?** Módulos já úteis entram como evolução, não como reconstrução.
5. **Qual o menor incremento adotável?** A primeira versão deve reduzir tempo até produção sem impor arquitetura prematura.

Quando a evidência de adoção crescer, a ordem deve ser revista. “Top 10” é um portfólio de próximas apostas, não autorização para implementar tudo de uma vez.

## Ordem recomendada

| Ordem | Módulo | Por que agora | Primeiro incremento útil | Dependências |
|---:|---|---|---|---|
| 1 | Golden Path / Product Bootstrap | materializa a missão em minutos, integra o que já existe e reduz erro de adoção | CLI com `plan`, `dry-run`, scaffold mínimo e checklist | APOS, templates |
| 2 | Identity & Access | todo produto precisa autenticar e autorizar sem expor dados | contrato Auth, RBAC simples, MFA-ready e adaptador Supabase | segurança, privacidade |
| 3 | Customer, Account & Organization | separa pessoa, conta e organização e prepara B2C/B2B | entidades neutras, memberships e lifecycle | Identity |
| 4 | Telemetry & Observability | prova uso, diagnóstico e custo desde a primeira feature | contrato de eventos + adaptadores analytics e OpenTelemetry | identidade pseudônima, privacidade |
| 5 | Privacy, Consent & Data Rights | coleta de dados sem governança cria dívida legal e de confiança | registro de finalidade/consentimento, preferências e solicitações | Customer, Audit |
| 6 | Admin / Backoffice | permite operar usuários, falhas e privacidade sem query direta | shell admin, RBAC, auditoria e adapters de dados | Identity, Customer, Telemetry, Privacy |
| 7 | Integrations & Webhooks | pagamentos, mensagens e parceiros dependem de entrada segura de eventos | envelope, assinatura, idempotência, replay e dead-letter | Observability, Security |
| 8 | Communication & Notifications | onboarding, recuperação e operações precisam de comunicação confiável | comando de mensagem, templates por job e eventos de entrega | Customer, Privacy, Webhooks |
| 9 | Payments & Billing | destrava monetização de produtos em validação | contratos Customer/Payment/Invoice + adapter sandbox | Customer, Webhooks, Audit |
| 10 | Subscription & Entitlements | transforma pagamento em acesso recorrente sem espalhar regras no app | planos, assinatura, feature grants e reconciliação | Payments, Identity, Customer |

## Sequenciamento em ondas

### Onda 1 — começar certo

1. Golden Path
2. Identity & Access
3. Customer, Account & Organization

Resultado: um projeto nasce com estrutura operacional, acesso e modelo de cliente consistentes.

### Onda 2 — aprender e operar com confiança

4. Telemetry & Observability
5. Privacy, Consent & Data Rights
6. Admin / Backoffice

Resultado: o produto mede valor, protege dados e pode ser operado sem consultas manuais perigosas.

### Onda 3 — conectar e monetizar

7. Integrations & Webhooks
8. Communication & Notifications
9. Payments & Billing
10. Subscription & Entitlements

Resultado: o produto integra serviços externos, comunica e cobra sem acoplar o domínio a um fornecedor.

## Próximos candidatos, não esquecidos

11. Search & Discovery  
12. CRM & Lifecycle  
13. Support / CX  
14. Content & Knowledge  
15. Pricing, Catalog & Offers  
16. Rules Engine  
17. Fiscal  
18. Fraud & Transaction Safety  
19. Marketplace primitives  
20. Scheduling primitives

Search aparece em 11 porque é muito valioso, mas não universal; produtos como SaaS simples ou ferramentas internas podem chegar à produção sem busca. CRM vem depois de Customer, Telemetry, Privacy e Communication, que são seus pré-requisitos.

## Regra de execução

Cada módulo terá um Intent APOS próprio. A implementação começa somente após validar um piloto real em um produto consumidor. O Valora pode ser o piloto de Payments, Billing, Subscription e Entitlements; a generalização para o kit ocorre apenas depois que os contratos sobreviverem ao uso e forem despojados de regras específicas do Valora.

