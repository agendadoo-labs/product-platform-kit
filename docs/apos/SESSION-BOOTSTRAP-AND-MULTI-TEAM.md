# APOS Session Bootstrap e memória para múltiplos times

## Decisão

Uma nova sessão não deve começar relendo todo o Git nem confiando apenas na conversa anterior. Se a LLM não conhece o APOS, ela lê primeiro o `APOS-AGENT-BOOTSTRAP.md`, um primer curto e autossuficiente. Em seguida executa um bootstrap determinístico, pequeno e sem chamada de LLM; identifica o modelo ativo, o estado vigente, os Intents abertos, suas Decisions, últimas execuções, evidências e dependências de coordenação. Depois que o pedido atual é relacionado a um Intent, o Context Compiler carrega somente o subgrafo autoritativo exigido pelo domínio e pelo risco.

```text
primer APOS (somente no cold start de conhecimento)
  → início da sessão
  → índice determinístico (sem LLM)
  → Intent atual ou novo Intent
  → Context Compiler seletivo
  → cerimônia e orçamento proporcionais
  → execução + verificação
  → Evidence + ProductState + checkpoint
```

Esse desenho separa três coisas que não devem ser confundidas:

- **histórico:** Git preserva tudo e permite auditoria ou rollback;
- **memória operacional:** ProductState, Intents, Decisions, Evidence e workstreams descrevem o presente recuperável;
- **contexto de execução:** pacote temporário e mínimo compilado para uma tarefa concreta.

## Inicialização econômica

Execute:

```sh
npm run apos:bootstrap
```

O comando apenas lê JSON versionado e produz um índice. Seu custo é o pequeno resultado lido pelo agente; ele não faz embeddings, busca remota nem chamada de modelo. Para concentrar a retomada:

```sh
node scripts/bootstrap-apos-session.mjs --intent I-SEU-PRODUTO-001
```

Em seguida use o Context Compiler. O teto de contexto é calibrado com taxa de recuperação correta, retrabalho, regressões e uso medido pelo provedor. Não é um número escolhido para forçar perda de informação.

## Coordenação de múltiplos times

O registro `.apos/coordination/workstreams.json` contém apenas coordenação operacional:

- Intent correspondente;
- status, owner e colaboradores;
- domínios afetados e dependências;
- branch ou ambiente;
- último update e próximo checkpoint.

Ownership não concede autorização. Contratos, Decision do builder e gates de ambiente continuam governando efeitos. Dois times que tocam a mesma superfície ou invariante devem declarar a dependência e resolver a ordem antes de executar mudanças concorrentes.

Cada time mantém detalhes dentro do seu Intent e domínio epistemológico. O ProductState permanece uma projeção global enxuta; ele não vira um backlog textual nem duplica documentos dos times.

## Quando ampliar a arquitetura

Git e índices determinísticos são o padrão inicial. Busca textual ou semântica pode localizar candidatos quando o acervo crescer, mas a inclusão depende de autoridade, versão, proveniência e atualidade. Embeddings, banco vetorial ou grafo externo só entram após evidência de falhas de recuperação ou custo de compilação que justifique sua operação, segurança e sincronização.

## Checkpoint de encerramento

Uma execução material encerra atualizando somente o que mudou:

1. Decision, se houve julgamento novo;
2. Evidence observada, incluindo falhas;
3. AgentRun, custo e incertezas restantes;
4. ProductState, apenas quando sustentado pela evidência;
5. workstream, com status e próximo checkpoint;
6. projeções humanas, quando úteis.

O próximo agente recupera esse estado sem depender da memória efêmera do chat.
