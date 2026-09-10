# Product Platform Kit

Um caminho reutilizável para levar produtos digitais **do protótipo à produção com agentes**, de forma rápida, segura e verificável.

O kit combina método operacional, componentes técnicos e exemplos práticos para que uma pessoa de produto ou uma equipe pequena consiga transformar uma intenção em software funcionando sem precisar desenhar toda a operação do zero.

## O que você consegue fazer

- transformar um problema em uma intenção clara e verificável;
- criar e validar o protótipo antes de investir na implementação completa;
- reutilizar fundações de interface, dados, autenticação, telemetria, experimentos e mapas;
- trabalhar com agentes especializados sem perder decisões, contexto ou limites de segurança;
- testar com dados reais minimizados em ambiente isolado;
- publicar com evidências e aprender com o uso do produto;
- evoluir a arquitetura conforme o risco e a maturidade aumentam, evitando complexidade prematura.

## Do protótipo à produção

O fluxo recomendado cabe em sete passos:

1. **Defina a intenção** — descreva problema, público, resultado esperado, restrições e dúvidas.
2. **Prototipe** — tangibilize a experiência e valide o que precisa ser resolvido.
3. **Escolha o que reutilizar** — verifique os componentes, contratos e módulos já existentes antes de criar algo novo.
4. **Implemente o menor incremento útil** — preserve o que não está em questão e inclua telemetria desde o início.
5. **Teste em ambiente isolado** — use dados minimizados, valide comportamento, segurança e requisitos não funcionais.
6. **Reúna evidências** — confirme que a intenção foi atendida e que os contratos continuam válidos.
7. **Publique e aprenda** — promova a mudança de forma controlada, acompanhe uso, custo e regressões e alimente a próxima decisão.

Comece pelo [guia APOS em 30 minutos](docs/APOS-GETTING-STARTED.md) e depois siga o [manual de adoção](docs/ADOPTION.md).

## O que vem no kit

### Operação com agentes

- starter APOS com Intents, Contracts, Capabilities, Evidence e roteamento econômico por risco;
- Context Compiler para recuperar somente o contexto necessário;
- Session Bootstrap determinístico para retomar estado, decisões e trabalho aberto antes de gastar contexto com inferência;
- cerimônias `Lite`, `Standard` e `Strict`, proporcionais ao risco;
- registro de aprendizado, custo, retrabalho e evidências;
- princípios de preservação de escopo para interfaces, APIs, dados, ambientes e configurações.

### Fundação de produto

- starter design system neutro, acessível e independente de marca;
- clientes TypeScript para telemetria e experimentos;
- pipeline de testes A/B com variante estável por usuário;
- pacote `@product-platform-kit/map-core` para contratos e operação de mapas sem marca;
- padrões de onboarding, privacidade e medição de sucesso das features.

### Fundação de engenharia e dados

- exemplos de perfis, papéis administrativos e políticas de acesso;
- sessões, telemetria estruturada e opt-out;
- painéis agregados, retenção e expurgo de dados;
- padrão de Preview/Homologação com dados reais minimizados e banco isolado;
- exemplos seguros de configuração de ambientes;
- verificações automáticas contra segredos e migrações fora de ordem.

## Tecnologias são substituíveis

O kit inclui receitas já testadas com **Supabase, Resend, Vercel e GoDaddy** para acelerar a primeira implementação. Essas ferramentas são uma stack de referência, não a proposta de valor nem uma dependência obrigatória do método.

Outro serviço pode ser adotado quando cumprir os mesmos contratos de segurança, privacidade, observabilidade, recuperação e custo. Regras de negócio e dados específicos continuam no repositório de cada produto.

## Princípios

1. Começar pelo resultado que o usuário precisa alcançar, não pela tecnologia.
2. Reutilizar antes de criar e transformar padrões recorrentes em componentes do kit.
3. Não alterar elementos que não fazem parte da intenção em execução.
4. Tratar telemetria e evidência como parte da definição de pronto.
5. Aplicar menor privilégio e nunca enviar segredos ao navegador.
6. Usar políticas de acesso em toda tabela ou recurso exposto.
7. Validar privacidade e opt-out em mais de uma camada.
8. Evoluir arquitetura e cerimônia na proporção do risco, exposição e maturidade do produto.
9. Manter dados e regras de negócio no produto; manter padrões reutilizáveis no kit.

## Início rápido

1. Leia [APOS em 30 minutos](docs/APOS-GETTING-STARTED.md).
2. Use `templates/apos/` para registrar a primeira intenção e escolher a cerimônia adequada.
3. Consulte [Adoção](docs/ADOPTION.md) para selecionar somente os módulos necessários ao seu produto.
4. Use `templates/design-system/` como ponto de partida visual e personalize os tokens semânticos.
5. Configure Preview/Homologação seguindo [Ambientes](docs/ENVIRONMENTS.md).
6. Adapte as receitas técnicas da stack escolhida; para a stack de referência, siga o [playbook de configuração](docs/SETUP-PLAYBOOK.md).
7. Execute `npm run check` antes de promover qualquer mudança.

## Documentação por necessidade

### Quero entender o método

- [APOS em 30 minutos](docs/APOS-GETTING-STARTED.md)
- [Manifesto de produto agêntico](docs/AGENTIC-PRODUCT-MANIFESTO.md)
- [Especificação APOS v0.2](docs/APOS-v0.2.md)
- [Retomada de sessão e múltiplos times](docs/apos/SESSION-BOOTSTRAP-AND-MULTI-TEAM.md)
- [Fluxo de trabalho com agentes](docs/AGENTIC-WORKFLOW.md)
- [Roteamento de modelos e tokens](docs/AGENT-MODEL-ROUTING.md)
- [Starter APOS](templates/apos/README.md)

### Quero estruturar e publicar um produto

- [Manual de adoção](docs/ADOPTION.md)
- [Arquitetura](docs/ARCHITECTURE.md)
- [Configuração de ambientes](docs/ENVIRONMENTS.md)
- [Padrão de ambiente de teste](docs/TEST-ENVIRONMENT-STANDARD.md)
- [Playbook da stack de referência](docs/SETUP-PLAYBOOK.md)
- [Segurança e privacidade](docs/SECURITY-PRIVACY.md)

### Quero adicionar capacidades

- [Telemetria](docs/TELEMETRY.md)
- [Testes A/B](docs/EXPERIMENTS.md)
- [Map Core](packages/map-core/README.md)
- [Starter Design System](templates/design-system/README.md)

### Quero aprofundar ou consultar exemplos

- [Memorial da evolução APOS v0.2](docs/apos/APOS-v0.2-MEMORIAL.md)
- [APOS aplicado ao Valora](docs/apos/VALORA-OPERATING-MODE.md)
- [Mapeamento do Valora RJ](docs/VALORA-RJ-MAPPING.md)
- [Starter operacional anterior, somente para consulta](templates/agents/README.md)

## Estado do APOS

O modelo operacional vigente é o [APOS v0.2](docs/APOS-v0.2.md). Ele governa o trabalho por intenção, contratos e evidências por meio de cinco componentes: Kernel, Context Compiler, Epistemic Registry, Adaptive Ceremony e Learning and Cost Loop.

O v0.2 amplia a governança verificável, mas nem todas as políticas estão automatizadas no runtime experimental. Consulte a [implementação do pacote APOS](packages/apos/README.md) para conhecer a cobertura atual.

Este kit é um ponto de partida versionado. Adote somente o necessário, preserve a proveniência das decisões e devolva ao kit apenas o que for realmente reutilizável.
