# Reconstrução e memória para organizações agênticas

## Princípio

Um produto não é reconstruível apenas porque seu código está no Git. Reconstrução exige uma cadeia verificável para seis classes de estado:

1. código, dependências e artefatos;
2. infraestrutura e configuração;
3. dados, identidades e objetos;
4. segredos e contas-raiz;
5. conhecimento, decisões e evidências;
6. operação, integrações e propriedade de domínios.

O Git deve manter estado declarativo, histórico revisado e referências. Dados pessoais, valores de segredos e sessões locais não pertencem ao repositório.

## Resultado da auditoria do próprio Product Platform Kit

O kit é mais reconstruível que um produto em operação porque sua entrega principal é código, documentação, templates e testes. Em um clone limpo do Git, o conteúdo funcional pode ser recomposto em grande parte. Ainda assim, a resposta para “recuperar tudo” é **não** enquanto organização, permissões, branch protections, secrets de CI, releases/pacotes publicados e configuração do provedor Git não tiverem manifesto e backup externos.

| Dimensão | Situação | Nota de 0 a 5 |
|---|---|---:|
| Conteúdo do kit e histórico | versionados, com tags e testes | 5 |
| APOS e memória do projeto | versionados e projetados deterministicamente | 5 |
| Build/teste limpo | coberto por testes locais e CI | 4 |
| Configuração GitHub/CI | workflow versionado; painel, permissões e secrets externos | 2 |
| Releases e distribuição | estado externo sem manifesto completo localizado | 2 |
| Restore drill a partir de backup independente | não localizado | 0 |

Na data da auditoria, há ainda um commit local não exportado ao GitHub; portanto, o remoto não representa a revisão mais recente. O primeiro controle operacional é remover essa janela de perda com uma publicação autorizada ou um backup independente do branch.

## Pergunta de auditoria

> Partindo de um dispositivo vazio e de contas recuperáveis, conseguimos recriar infraestrutura, restaurar dados e objetos, reconfigurar integrações, validar jornadas críticas e explicar o estado do produto dentro dos RTO/RPO aprovados?

“Sim” só é permitido com Evidence de um exercício recente. Uma réplica não é backup; um backup não restaurado não é recuperação.

## Modelo de memória

```text
conversa e execução bruta (temporárias)
                ↓ promoção revisada
Intent → Decision → AgentRun → Evidence
   ↘ Workstream      ↘ DataMap / Contracts
                ↓ projeção
 ProductState + relatórios abertos/resolvidos
                ↓ recuperação seletiva
       bootstrap → contexto do Intent
```

Esse desenho combina três práticas observadas no mercado:

- instruções versionadas e hierárquicas no repositório, como `AGENTS.md` no Codex;
- checkpoints por thread e memória persistente entre threads, como a separação de checkpointer/store no LangGraph;
- memória gerenciada com permissões explícitas, como o Memory Bank do Vertex AI.

O APOS adiciona o que esses mecanismos não garantem sozinhos: autoridade, proveniência, ambiente, validade da evidência, preservação de escopo e relação explícita com o estado do produto.

Referências primárias: [Codex e AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md), [configuração local do Codex](https://learn.chatgpt.com/docs/config-file/config-basic), [ambientes Codex em nuvem](https://learn.chatgpt.com/docs/environments/cloud-environment), [LangGraph Persistence](https://docs.langchain.com/oss/python/langgraph/persistence), [Vertex AI Memory Bank](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/memory-bank/set-up), [backup no GitHub](https://docs.github.com/en/repositories/archiving-a-github-repository/backing-up-a-repository), [Supabase Backups](https://supabase.com/docs/guides/platform/backups), [Azure Bicep](https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/overview) e [Vercel Project Settings](https://vercel.com/docs/project-configuration/project-settings).

## Matriz mínima de reconstrução

| Classe | Fonte desejada | Backup independente | Verificação |
|---|---|---|---|
| Código | Git | mirror fora do provedor | clone e build limpos |
| Infraestrutura | IaC | cópia versionada | plan/what-if e deploy vazio |
| Banco | migrations + backup | dump/PITR fora da conta primária | restore e checks de integridade |
| Objetos | manifesto + object storage | cópia versionada | checksum e leitura amostral |
| Identidade | configuração + backup suportado | conta/tenant alternativo | login, recuperação e autorização |
| Segredos | referências no Git | cofre com recuperação | acesso mínimo e rotação simulada |
| Serviços externos | Recovery Manifest | export de configuração | smoke test por integração |
| Conhecimento | `.apos/` | mirror Git + arquivo derivado | bootstrap de sessão em clone vazio |

## Contexto local do Codex

O Codex lê instruções versionáveis em `AGENTS.md` e aceita configuração por projeto em `.codex/config.toml`; preferências pessoais vivem em `~/.codex/config.toml`. Ambientes em nuvem recriam um container a partir do repositório e de setup/configuração próprios. Portanto:

- **versione:** instruções do projeto, configuração não secreta, scripts de setup, APOS, schemas e skills próprias revisadas;
- **arquive de forma criptografada:** projeções humanas, anexos e exportações sanitizadas que tenham valor histórico;
- **mantenha no cofre:** credenciais, tokens, recovery codes e valores de variáveis;
- **não replique cegamente:** `auth.json`, caches, sessões de navegador, bancos locais, logs e conversas brutas;
- **promova conhecimento:** o que precisa sobreviver vira registro APOS com fonte, revisão e classificação.

## Cerimônia de recuperação

Toda adoção deve criar um Recovery Manifest a partir do template em `templates/operations/`, classificar serviços por criticidade e executar um teste em ambiente vazio. O exercício registra revisão, cenário, responsáveis, dependências, RTO/RPO medidos, integridade, falhas, custo e validade da Evidence.

## Evolução econômica

1. Primeiro: manifestos, dumps agendados, mirror Git, checksums e restore manual documentado.
2. Depois: IaC, reconciliação de drift, cópia entre contas/regiões e exercícios automatizados.
3. Só com escala comprovada: busca semântica sobre conhecimento aprovado, memória gerenciada e automação multiagente persistente.

Adicionar vetor ou um “banco de memória” antes de medir falhas de recuperação aumenta custo e superfície de vazamento sem necessariamente melhorar consistência.
