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
- starter de equipe agêntica com roteamento econômico entre Desenvolvimento, Design e Dados;
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
7. Para operar com agentes, copie `templates/agents/AGENTS.md` e `templates/agents/.agents/` para o projeto consumidor.

## Documentação

- [Arquitetura](docs/ARCHITECTURE.md)
- [Passo a passo: GoDaddy, Supabase, Resend e Vercel](docs/SETUP-PLAYBOOK.md)
- [Configuração de ambientes](docs/ENVIRONMENTS.md)
- [Segurança e privacidade](docs/SECURITY-PRIVACY.md)
- [Telemetria](docs/TELEMETRY.md)
- [Testes A/B](docs/EXPERIMENTS.md)
- [Mapeamento do Valora RJ](docs/VALORA-RJ-MAPPING.md)
- [Starter Design System](templates/design-system/README.md)
- [Operação agêntica de Produto](docs/AGENTIC-WORKFLOW.md)
- [Roteamento de modelos e tokens](docs/AGENT-MODEL-ROUTING.md)
- [Starter de equipe agêntica](templates/agents/README.md)

Este kit é um ponto de partida versionado. Alterações específicas de um produto devem ficar no repositório desse produto.
