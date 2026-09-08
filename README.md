# Product Platform Kit

Fundação privada e reutilizável para produtos digitais com Supabase. O kit separa infraestrutura transversal das regras de negócio de cada aplicação.

Inclui:

- perfis, papéis administrativos e RLS;
- sessões e telemetria estruturada com opt-out;
- pipeline de testes A/B com variante estável por usuário;
- painéis agregados por RPC;
- retenção e expurgo de dados de produto;
- exemplos seguros de configuração de ambientes;
- clientes TypeScript para telemetria e experimentos;
- starter design system neutro, acessível e independente de marca;
- starter APOS com Intents, Contracts, Capabilities, Evidence e roteamento econômico por risco;
- pacote `@product-platform-kit/map-core` para contratos e operação de mapas sem marca;
- padrão de Preview/Homologação com dados reais minimizados e banco isolado;
- verificação automática contra segredos e migrações fora de ordem.

## Princípios

1. Nenhum segredo é enviado ao navegador.
2. Toda tabela exposta usa RLS e menor privilégio.
3. Telemetria é parte da definição de pronto de cada feature.
4. Opt-out é validado no cliente e novamente no banco.
5. Experimentos começam como `draft` e usam atribuição por conta.
6. Dados de negócio permanecem no repositório do produto.

## Início rápido

1. Leia o [manual completo de configuração](docs/SETUP-PLAYBOOK.md), [Adoção](docs/ADOPTION.md) e [Ambientes](docs/ENVIRONMENTS.md).
2. Copie `supabase/` para um projeto Supabase novo ou adapte as migrações ao schema existente.
3. Configure apenas os valores públicos de `.env.example` no frontend.
4. Copie os clientes de `templates/web/` para o aplicativo.
5. Se precisar de uma base visual, copie `templates/design-system/` e personalize apenas os tokens semânticos.
6. Execute `npm run check` antes de publicar.
7. Para operar com agentes, comece pelo [APOS em 30 minutos](docs/APOS-GETTING-STARTED.md), adote `templates/apos/` e registre seu primeiro Intent.

## Documentação

- [Arquitetura](docs/ARCHITECTURE.md)
- [Passo a passo: GoDaddy, Supabase, Resend e Vercel](docs/SETUP-PLAYBOOK.md)
- [Configuração de ambientes](docs/ENVIRONMENTS.md)
- [Padrão de ambiente de teste](docs/TEST-ENVIRONMENT-STANDARD.md)
- [Map Core](packages/map-core/README.md)
- [Segurança e privacidade](docs/SECURITY-PRIVACY.md)
- [Telemetria](docs/TELEMETRY.md)
- [Testes A/B](docs/EXPERIMENTS.md)
- [Mapeamento do Valora RJ](docs/VALORA-RJ-MAPPING.md)
- [Starter Design System](templates/design-system/README.md)
- [Operação agêntica de Produto](docs/AGENTIC-WORKFLOW.md)
- [Roteamento de modelos e tokens](docs/AGENT-MODEL-ROUTING.md)
- [Starter APOS](templates/apos/README.md)
- [APOS em 30 minutos](docs/APOS-GETTING-STARTED.md)
- [Especificação APOS v0.2](docs/APOS-v0.2.md)
- [Starter anterior, somente para consulta](templates/agents/README.md)

Este kit é um ponto de partida versionado. Alterações específicas de um produto devem ficar no repositório desse produto.

## APOS — execução orientada a intenção

O modelo operacional vigente é o [APOS v0.2](docs/APOS-v0.2.md). Ele governa trabalho por Intent, contratos, evidência e cinco componentes operacionais: Kernel, Context Compiler, Epistemic Registry, Adaptive Ceremony e Learning and Cost Loop.

Se você está começando agora, siga o [guia prático de 30 minutos](docs/APOS-GETTING-STARTED.md). Depois consulte o [manifesto](docs/AGENTIC-PRODUCT-MANIFESTO.md) para os princípios, o [starter](templates/apos/README.md) para adoção e o [runtime experimental](packages/apos/README.md) para entender a implementação transacional ainda baseada no perfil v0.1.

O v0.2 amplia a governança verificável; não significa que todas as políticas já sejam executadas automaticamente pelo runtime Python.

- [APOS aplicado ao Valora e interpretação de builders](docs/apos/VALORA-OPERATING-MODE.md)
- [Contexto e decisões do APOS](docs/apos/CONTEXT.md)
- [Migração operacional do próprio toolkit](docs/apos/OPERATING-MODEL-MIGRATION.md)
- [Memorial da evolução v0.2](docs/apos/APOS-v0.2-MEMORIAL.md)
