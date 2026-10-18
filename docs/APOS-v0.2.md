---
id: "DOC-B1DD0C427132F9"
type: "reference"
scope: "Product Platform Kit"
document_role: "reference"
purpose: "Contextualizar APOS v0.2 — evolução econômica, contexto seletivo e execução de IA governada."
read_when: ["Consultar contexto complementar: APOS v0.2 — evolução econômica, contexto seletivo e execução de IA governada"]
status: "documented"
authority: "documented_source_not_runtime_verification"
tier: "warm"
updated: "2026-10-18"
---
# APOS v0.2 — evolução econômica, contexto seletivo e execução de IA governada

Contextualizar APOS v0.2 — evolução econômica, contexto seletivo e execução de IA governada.

Status: modelo operacional vigente na `main` desde 2026-09-08. O runtime transacional de `packages/apos` permanece no perfil executável v0.1; o v0.2 amplia a governança e os perfis verificáveis sem alegar que todas as políticas já são automaticamente executadas.

## Resultado esperado

O APOS v0.2 permite que um produto evolua sua arquitetura e o uso de agentes conforme evidência, exposição e maturidade. A complexidade deixa de ser um efeito colateral invisível e passa a ter orçamento, justificativa, métricas e gatilhos de remoção ou evolução.

O protocolo é organizado nos cinco componentes propostos:

1. **APOS Kernel:** autoridade, segurança, preservação de escopo, economia e conclusão em um núcleo com meta inferior a 1.500 tokens;
2. **Context Compiler:** produz o menor pacote de contexto necessário e um `ContextManifest`;
3. **Epistemic Registry:** cataloga domínios, fontes, métodos, incertezas, relações, owner e gatilhos de atualização;
4. **Adaptive Ceremony:** seleciona `Lite`, `Standard` ou `Strict` pela pior dimensão de risco aplicável;
5. **Learning and Cost Loop:** mede contexto, saída, chamadas, tempo, retrabalho, regressões, evidência reutilizada e custo por resultado validado.

`ArchitectureProfile` e `AIExecutionProfile` complementam esses cinco componentes: o primeiro governa a evolução técnica; o segundo governa fornecedores, modelos, limites, evals e reconciliação financeira.

## Princípios novos

1. **Arquitetura mínima suficiente.** Adicionar complexidade somente quando risco ou custo observados superarem o custo total da nova arquitetura.
2. **Maturidade por domínio.** Um produto não recebe um único rótulo. Autenticação, pagamentos, busca e conteúdo podem exigir níveis diferentes.
3. **Complexidade tem custo permanente.** Cada serviço, dependência externa, datastore, fila, região ou contrato adiciona implementação, operação, segurança, testes, recuperação e contexto para agentes.
4. **Evolução por fitness function.** Latência, falhas, custo unitário, exposição, colisões de mudança e tempo de recuperação determinam evolução; previsão abstrata de escala não basta.
5. **Contexto é compilado, não acumulado.** O agente recebe o menor subgrafo de Intent, contratos, decisões, superfícies, evidências e fontes que sustenta a execução.
6. **Modelo é uma dependência substituível.** Capabilities selecionam modelos aprovados por evidência; fornecedor, marca ou preço isolado não definem autoridade nem sucesso.
7. **Custo por run é evidência operacional.** Uso exato, quando fornecido, é registrado por chamada; custo financeiro é reconciliado com a fonte de cobrança do provedor.
8. **Automação cresce depois da avaliação.** Tarefas novas permanecem humano-assistidas. Chamadas autônomas são liberadas somente para tarefas repetíveis, limitadas e cobertas por evals.

## Estágios arquiteturais

| Estágio | Objetivo | Baseline econômico | Gatilho típico de evolução |
| --- | --- | --- | --- |
| descoberta | validar problema | protótipo isolado e descartável | evidência de uso real |
| validação | aprender em produção | monólito modular, serviços gerenciados, test/preview/prod | gargalo ou risco medido |
| crescimento | aumentar capacidade | cache, filas e read models somente quando observados | limite de fitness excedido |
| escala | isolar falha, carga ou ownership | extração seletiva de bounded contexts | necessidade comprovada de escala ou isolamento independente |
| missão crítica | continuidade e conformidade | redundância, DR e segregação proporcionais | exposure budget e obrigações formais |

O estágio é atribuído por domínio e revisado quando um `EvolutionTrigger` dispara. Segurança, privacidade, autorização e integridade financeira mantêm pisos independentes do estágio.

## Orçamento de complexidade

Um `ComplexityBudget` inventaria ao menos:

- unidades implantáveis;
- datastores e mecanismos de consistência;
- dependências externas pagas;
- filas e processos assíncronos;
- regiões e réplicas;
- contratos de integração;
- caminhos de fallback e runbooks adicionais.

Adicionar um item exige problema observado, alternativa simples avaliada, owner, fitness function, custo recorrente, rollback e condição de remoção. O orçamento não é uma pontuação universal: ele torna explícito o custo carregado pelo produto.

## Compilação de contexto

O `ContextProfile` mantém um mapa de domínios e fontes. Para cada Intent, o compilador:

1. resolve o delta e as superfícies afetadas;
2. carrega Constitution, Policy e contratos aplicáveis;
3. carrega estado e decisões do domínio afetado;
4. inclui evidência fresca e dependências transitivas declaradas;
5. exclui histórico superseded e conteúdo sem relação;
6. registra o manifesto do contexto efetivamente utilizado.

Busca semântica pode localizar candidatos, mas não substitui fonte autoritativa, proveniência, versão ou validação de atualidade.

## Plano de controle de IA

O APOS separa:

- **orquestração:** classifica risco, seleciona capabilities, compila contexto, aplica limites e solicita autorização;
- **execução:** chama um modelo ou ferramenta dentro de um contrato;
- **verificação:** observa a saída sem aceitar a afirmação do executor como evidência;
- **contabilidade:** registra tokens, chamadas, latência e estimativa; depois reconcilia o valor com a cobrança oficial.

Fluxo de referência:

```text
Builder/Codex
    -> APOS control plane
       -> context compiler
       -> policy + budget gate
       -> capability router
       -> provider adapter
       -> model/tool
       -> verifier/evals
       -> evidence + usage ledger
```

O roteador é provider-neutral, mas isso não implica rotear livremente para qualquer modelo. Cada combinação `capability + provider + model + parâmetros` precisa de registro aprovado, política de dados, limites e evals.

## Adoção progressiva

- **Fase A — agora:** Codex continua como orquestrador humano-assistido; sem plataforma multiagente própria. Perfis, budgets e ledger são definidos.
- **Fase B — piloto:** uma API gateway fina executa uma tarefa repetível e de baixo risco, registra uso por chamada e possui limite rígido.
- **Fase C — roteamento:** dois modelos aprovados são comparados por qualidade, custo total por tarefa e latência; roteamento só muda após eval.
- **Fase D — autonomia:** filas, retries, paralelismo e mais agentes entram apenas quando volume, confiabilidade ou throughput exigirem.

## Regra de decisão

Uma nova camada arquitetural é elegível quando:

```text
risco_atual + custo_atual + atraso_atual
  > implementação + operação + segurança + recuperação + contexto_agentico
```

A fórmula é uma estrutura de julgamento, não uma falsa precisão financeira. Os termos devem ser sustentados por evidência proporcional.

## Compatibilidade e rollback

O v0.2 preserva Intent, Contract, Decision, Evidence, AgentRun e ProductState do v0.1. Os novos perfis são aditivos. Consumidores podem restaurar o ponteiro ativo para a última versão v0.1 sem apagar o histórico v0.2.
