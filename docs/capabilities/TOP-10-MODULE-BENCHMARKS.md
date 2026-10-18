---
id: "DOC-B26ACB75B61850"
type: "evidence"
scope: "Product Platform Kit"
document_role: "evidence"
purpose: "Registrar evidências de Benchmarks e implementação dos dez módulos prioritários."
read_when: ["Conferir resultados e seus limites: Benchmarks e implementação dos dez módulos prioritários"]
status: "documented"
authority: "documented_source_not_runtime_verification"
tier: "warm"
updated: "2026-10-18"
---
# Benchmarks e implementação dos dez módulos prioritários

Registrar evidências de Benchmarks e implementação dos dez módulos prioritários.

**Data de pesquisa:** 2026-09-12  
**Princípio:** referências externas orientam contratos e testes; não tornam nenhum fornecedor obrigatório.

## 1. Golden Path / Product Bootstrap

**Job:** transformar um Intent e propriedades do negócio em um projeto executável, sem exigir que o builder conheça toda a plataforma.

**Benchmarks**

- [Backstage Software Templates](https://backstage.io/docs/features/software-templates/) combina formulário de entrada, skeleton, ações, revisão e publicação; o `dry-run` é uma boa referência de segurança.
- [GitHub reusable workflows](https://docs.github.com/en/actions/how-tos/reuse-automations/reuse-workflows) centraliza pipelines e permite pin por SHA; permissões só podem ser mantidas ou reduzidas na cadeia.
- [GitHub workflow templates](https://docs.github.com/en/actions/how-tos/write-workflows/use-workflow-templates) mostra como oferecer automações descobríveis sem copiá-las manualmente.

**Sugestão para o kit**

Criar `packages/create-product` com manifesto declarativo: tipo de negócio, identidade, pagamentos, dados pessoais, conteúdo, geografia e ambientes. O compilador propõe módulos; o builder confirma o plano antes de qualquer escrita.

**Passo a passo**

1. Definir `product.manifest.schema.json` e cinco exemplos mínimos.
2. Implementar `plan` somente leitura, exibindo arquivos, módulos, custos e permissões.
3. Implementar `init --dry-run` e diff antes de escrever.
4. Compor templates existentes sem copiá-los quando referência por pacote for possível.
5. Gerar Intent, contratos iniciais, ambiente local e workflow de qualidade.
6. Testar criação, reexecução idempotente, atualização e remoção.

**Pronto quando:** um repositório vazio chega ao primeiro build validado seguindo um único guia, sem segredo e sem acoplamento obrigatório a Supabase/Vercel.

## 2. Identity & Access

**Job:** autenticar pessoas e serviços e decidir o que cada principal pode fazer.

**Benchmarks**

- [Supabase Auth](https://supabase.com/docs/guides/auth) integra JWT e Row Level Security e suporta senha, magic link, OTP, social e SSO.
- [Supabase MFA](https://supabase.com/docs/guides/auth/auth-mfa) separa os níveis AAL1/AAL2 e recomenda enforcement também no banco/API.
- [OpenFGA Modeling](https://openfga.dev/docs/modeling) oferece padrões de relações, papéis, hierarquias e contexto organizacional. A própria documentação recomenda modelar o domínio, e não um meta-modelo excessivamente genérico.
- [OpenFGA Authorization for Agents](https://openfga.dev/docs/modeling/agents) trata agentes como principals e descreve grants por tarefa, temporários e limitados.

**Sugestão para o kit**

Definir interfaces `IdentityProvider`, `SessionVerifier` e `AuthorizationProvider`. Começar com RBAC explícito (`member`, `manager`, `admin`) e recursos de domínio; adotar ReBAC apenas quando organizações e compartilhamento exigirem.

**Passo a passo**

1. Modelar `principal`, `identity`, `credential`, `session`, `role`, `permission` e `grant`.
2. Separar autenticação de autorização.
3. Criar adaptador Supabase sem vazar tipos do provedor para o domínio.
4. Implementar verificação server-side, menor privilégio e MFA-ready.
5. Criar contract tests: expiração, revogação, tenant isolation e elevação de privilégio.
6. Expor eventos sem e-mail, telefone ou token em payloads analíticos.

**Pronto quando:** trocar o provedor de autenticação não altera regras de negócio, e os checks negativos são testados.

## 3. Customer, Account & Organization

**Job:** representar corretamente pessoa, conta de acesso, cliente pagador e organização.

**Benchmarks**

- [WorkOS Organizations](https://workos.com/docs/reference/organization) usa organização como recurso de primeiro nível, com IDs externos e domínios verificados.
- [WorkOS CLI](https://workos.com/docs/cli) permite semear papéis, organizações e configurações de forma reprodutível.
- [OpenFGA roles and permissions](https://openfga.dev/docs/modeling/roles-and-permissions) separa papéis de permissões e suporta atribuições por objeto.

**Sugestão para o kit**

Criar `packages/customer-core` com `person`, `account`, `customer`, `organization`, `membership`, `contact_point` e `lifecycle_state`. Uma pessoa pode ter várias contas/organizações; o pagador não precisa ser o usuário final.

**Passo a passo**

1. Publicar ADR com as distinções de entidade e ownership.
2. Definir schema, eventos e transições válidas.
3. Criar adapters SQL e in-memory para testes.
4. Adicionar memberships e isolamento por tenant.
5. Modelar merge, desativação e deleção sem perder trilha de auditoria.
6. Disponibilizar seeds reproduzíveis de B2C, profissional individual e organização.

**Pronto quando:** B2C e B2B usam o mesmo núcleo sem colapsar pessoa, login e pagador numa única tabela.

## 4. Telemetry & Observability

**Job:** medir valor do produto e diagnosticar falhas técnicas com correlação e privacidade.

**Benchmarks**

- [OpenTelemetry Logs](https://opentelemetry.io/docs/concepts/signals/logs/) padroniza logs estruturados e correlação com traces e métricas.
- [OpenTelemetry Logs specification](https://opentelemetry.io/docs/specs/otel/logs/) fornece o contrato interoperável para instrumentação e coleta.

**Sugestão para o kit**

Evoluir o cliente existente para dois contratos coordenados: `ProductEvent` para comportamento e `OperationalSignal` para logs/traces/métricas. Ambos usam correlation ID, mas políticas de identidade e retenção diferentes.

**Passo a passo**

1. Versionar um envelope de evento com `event_id`, `occurred_at`, `actor_ref` pseudônimo, `purpose`, `schema_version` e `correlation_id`.
2. Criar adapters in-memory, console, Supabase e OpenTelemetry.
3. Fornecer taxonomia mínima: exposição, ação, resultado, falha e custo.
4. Bloquear PII por padrão e validar propriedades permitidas.
5. Adicionar dashboards de saúde e funil como projeções, não fontes canônicas.
6. Testar deduplicação, opt-out, falha do coletor e correlação ponta a ponta.

**Pronto quando:** uma feature nova mede sucesso e falha sem depender do vendor e sem enviar identificadores diretos por padrão.

## 5. Privacy, Consent & Data Rights

**Job:** vincular cada tratamento a finalidade, base legal, preferência, retenção e direito do titular.

**Benchmarks**

- [ANPD — Titular de Dados](https://www.gov.br/anpd/pt-br/assuntos/titular-de-dados) explicita controlador, operador, encarregado, exemplos de dados pessoais e direitos do titular.
- [ANPD — materiais educativos e publicações](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes) reúne guias oficiais de segurança e tratamento.

**Sugestão para o kit**

Criar `packages/privacy-core` com registro de tratamento, finalidades, bases legais, consent receipts quando aplicáveis, preferências por canal, retenção e solicitações do titular. Consentimento não deve ser usado como base universal.

**Passo a passo**

1. Modelar `processing_activity`, `purpose`, `legal_basis`, `data_category`, `retention_rule`, `preference` e `data_subject_request`.
2. Criar matriz finalidade × dado × base × retenção × compartilhamento.
3. Implementar API de preferências e recibos versionados.
4. Implementar workflow de acesso, correção, portabilidade/bloqueio/exclusão conforme aplicabilidade e revisão jurídica.
5. Integrar com telemetria, comunicação e admin sob menor privilégio.
6. Testar revogação, retenção, exportação e trilha de auditoria.

**Pronto quando:** é possível responder por que um dado existe, onde está, por quanto tempo e como atender o titular.

## 6. Admin / Backoffice

**Job:** operar clientes, eventos, privacidade e suporte sem consultas manuais no banco.

**Benchmarks**

- [React-admin](https://marmelab.com/react-admin/documentation.html) organiza recursos e desacopla interface dos backends por `dataProvider`.
- [React-admin Data Fetching](https://marmelab.com/react-admin/DataFetchingGuide.html) formaliza o adaptador de acesso a dados.
- [React-admin Auth Provider](https://marmelab.com/react-admin/doc/5.6/AuthProviderWriting.html) separa autenticação/autorização da interface administrativa.

**Sugestão para o kit**

Criar um shell admin baseado em recursos, com adapters, RBAC, redaction, purpose binding e audit log. PII permanece oculta; acesso excepcional exige justificativa e expira.

**Passo a passo**

1. Definir `AdminResource`, `AdminAction`, `RedactionPolicy` e `AuditEntry`.
2. Criar shell com navegação, filtros, estados vazios e exportações controladas.
3. Conectar Identity, Customer, Telemetry e Privacy por adapters.
4. Implementar visualizações agregadas como padrão.
5. Exigir reautenticação/MFA para ações sensíveis.
6. Testar autorização por ação, mascaramento, auditoria e ausência de PII em URL/log.

**Pronto quando:** a operação diária não exige acesso direto à infraestrutura e todo acesso sensível é justificável e auditável.

## 7. Integrations & Webhooks

**Job:** receber e entregar eventos externos com autenticidade, idempotência, ordenação tolerante e recuperação.

**Benchmarks**

- [Standard Webhooks](https://www.standardwebhooks.com/) consolida padrões de assinatura, proteção contra replay e interoperabilidade.
- [Svix — Receiving Webhooks](https://docs.svix.com/receiving/introduction) recomenda verificação de assinatura e timestamp e resposta rápida antes do processamento assíncrono.
- [Asaas — Webhooks](https://docs.asaas.com/docs/about-webhooks) documenta entrega ao menos uma vez, IDs estáveis e necessidade de idempotência.

**Sugestão para o kit**

Criar `packages/webhook-core` com verificador plugável, inbox/outbox, dedupe store, retry policy, dead-letter e replay auditado.

**Passo a passo**

1. Definir envelope interno e adapters de assinatura por fornecedor.
2. Persistir o evento bruto minimizado antes de reconhecer quando a política exigir.
3. Deduplicar por `provider + event_id`.
4. Responder rapidamente e processar fora do request.
5. Implementar backoff, dead-letter e replay com autorização.
6. Criar contract tests para assinatura inválida, duplicata, atraso, desordem e indisponibilidade.

**Pronto quando:** a mesma entrega pode ocorrer várias vezes sem duplicar efeitos e falhas são recuperáveis sem ação no banco.

## 8. Communication & Notifications

**Job:** entregar mensagens transacionais e de engajamento pelo canal adequado, respeitando finalidade e preferências.

**Benchmarks**

- [Resend](https://resend.com/docs/introduction) oferece envio transacional com domínio verificado e API.
- [Resend Webhooks](https://www.resend.com/docs/api-reference/webhooks/create-webhook) registra endpoints HTTPS e eventos de entrega.
- [Resend event types](https://resend.com/docs/webhooks/event-types) distingue envio, entrega, bounce, falha, abertura e supressão.

**Sugestão para o kit**

Criar `packages/communications-core` orientado a `message_job`, não a fornecedor: template por objetivo, canal, locale, finalidade, prioridade, idempotency key e status de entrega.

**Passo a passo**

1. Definir jobs como `confirm_identity`, `recover_account`, `onboarding_tip` e `payment_reminder`.
2. Separar conteúdo, decisão de envio e entrega.
3. Integrar preferências e bases legais antes do dispatch.
4. Criar adapter Resend e adapter fake local; WhatsApp entra depois de validação própria.
5. Consumir webhooks de status via `webhook-core`.
6. Testar supressão, opt-out, retry, template ausente e duplicação.

**Pronto quando:** trocar canal/provedor não muda o job e mensagens não são enviadas sem finalidade e permissão aplicáveis.

## 9. Payments & Billing

**Job:** cobrar, confirmar e reconciliar pagamentos sem tratar o status do checkout como verdade financeira.

**Benchmarks**

- [Asaas — Assinaturas](https://docs.asaas.com/docs/assinaturas) suporta recorrência com boleto, Pix ou cartão e deixa claro que criar assinatura não confirma recebimento; cada cobrança deve ser acompanhada.
- [Asaas — Webhooks](https://docs.asaas.com/docs/about-webhooks) fornece o padrão operacional para acompanhar mudanças de cobrança.
- [Mercado Pago — Subscriptions API](https://www.mercadopago.com.br/developers/pt/reference/online-payments/subscriptions/overview) separa planos, assinaturas, faturas e pagamentos.

**Sugestão para o kit**

Validar primeiro o piloto Asaas no Valora. Depois extrair `payments-core` com `billing_customer`, `payment`, `invoice`, `refund`, `provider_reference` e máquina de estados interna. O provedor sinaliza fatos; o domínio decide efeitos.

**Passo a passo**

1. Concluir sandbox real no Valora, incluindo webhook, duplicata e falha.
2. Registrar o contrato sobrevivente e remover nomes/regra do Valora.
3. Criar adapter Asaas e fake determinístico.
4. Nunca armazenar cartão; usar checkout/tokenização hospedada quando possível.
5. Reconciliar por webhook e consulta periódica de segurança.
6. Testar pagamento aprovado, pendente, vencido, estornado, chargeback e evento fora de ordem.

**Pronto quando:** cobranças e reconciliação funcionam no sandbox, repetição não duplica efeitos e nenhum segredo chega ao cliente.

## 10. Subscription & Entitlements

**Job:** traduzir plano e estado financeiro em acesso a features, limites e períodos, com revogação segura.

**Benchmarks**

- [Stripe Entitlements](https://docs.stripe.com/billing/entitlements) mapeia features internas a produtos e usa webhook + consulta de entitlements ativos para provisionar e desprovisionar.
- [Mercado Pago — gerenciamento de assinaturas](https://www.mercadopago.com.br/developers/pt/docs/subscriptions/subscription-management) documenta pausa, cancelamento e reativação como lifecycle próprio.
- [Asaas — Assinaturas](https://docs.asaas.com/docs/assinaturas) diferencia recorrência de parcelamento e gera cobranças ao longo do ciclo.

**Sugestão para o kit**

Separar `subscription` de `entitlement`. Pagamento não deve espalhar condicionais na UI; um serviço interno responde quais features e limites estão ativos e até quando.

**Passo a passo**

1. Modelar `offer`, `plan`, `subscription`, `feature`, `entitlement`, `usage_meter` e `grant`.
2. Definir estados e tolerâncias: trial, active, grace, past_due, paused, canceled e expired.
3. Mapear eventos de billing para comandos idempotentes de provisionamento.
4. Criar consulta de autorização com cache curto e fallback seguro.
5. Implementar override manual com motivo, expiração e auditoria.
6. Testar upgrade, downgrade, renovação, inadimplência, cancelamento e reconciliação.

**Pronto quando:** planos mudam sem alterar dezenas de componentes e o acesso converge ao estado correto após duplicatas ou atraso do provedor.

## Padrão comum aos dez módulos

Cada módulo deve conter:

- contrato e modelo de domínio;
- adapter in-memory para testes e ao menos um adapter real;
- exemplos provider-neutral;
- segurança, privacidade, telemetria e NFRs explícitos;
- testes de contrato, falha e recuperação;
- guia de adoção, migração e remoção;
- Evidence APOS e claim atualizado no catálogo.

O benchmark serve para aprender com interfaces maduras. Copiar a arquitetura inteira de um fornecedor antes da necessidade comprovada seria overengineering e contrariaria a missão do kit.
