# Memorial de evolução — APOS v0.2

Data: 2026-09-08
Origem: aprendizado acumulado durante a construção e operação inicial do Valora.

## Por que o v0.2 existe

O APOS v0.1 estabeleceu Intent, Contracts, Capabilities, Decision, Evidence e ProductState. Na prática, surgiram cinco custos que o modelo ainda não tratava de forma explícita:

1. o crescimento da memória tornou a recuperação de informação um problema central;
2. revisões amplas consumiram contexto mesmo quando poucas superfícies haviam mudado;
3. mudanças de interface mostraram o risco de apagar capacidades fora do pedido; em APIs, dados e ambientes esse risco é menos visível e mais grave;
4. requisitos não funcionais e exposição operacional precisavam evoluir com uso real;
5. a escolha de agentes e modelos precisava considerar qualidade, custo, privacidade e mensuração real, não apenas preferência.

## Estado da implementação

Os cinco componentes foram implementados tanto no próprio toolkit quanto no starter reutilizável. O `Context Compiler` produz um manifesto auditável; o verificador cobre os limites e pisos do Kernel, a equivalência dos domínios do Context Profile e Epistemic Registry, a escolha da cerimônia, os campos do Learning and Cost Loop e a preservação das versões anteriores. O starter exige que o projeto consumidor substitua seus campos `ADAPTAR` antes de compilar contexto.

O manifesto desta evolução ficou dentro do teto de 30 mil tokens estimados. Trata-se de uma aproximação conservadora por bytes; uso real ausente continua `unavailable`, nunca zero.

Os limites de 1.500 tokens para o Kernel e 30 mil para o contexto são baselines iniciais, não números universais. Após dez runs materiais, o consumidor deve confrontá-los com cobertura de contratos, falhas de recuperação, retrabalho, regressões, resultado validado e uso medido pelo provedor. Um estouro de orçamento interrompe ou escala a compilação; nunca justifica truncar silenciosamente informação necessária.

## Melhorias consolidadas

### Estrutura dos cinco componentes

- **APOS Kernel:** núcleo compacto, com teto declarado de 1.500 tokens e verificação conservadora por bytes no repositório; a contagem exata depende do tokenizer do modelo selecionado.
- **Context Compiler:** resolve o Intent e produz o menor subgrafo autoritativo mais um manifesto do contexto usado.
- **Epistemic Registry:** torna explícitos domínios, fontes, métodos, incertezas e relações.
- **Adaptive Ceremony:** aplica `Lite`, `Standard` ou `Strict` segundo a pior dimensão de risco, sem permitir downgrade pelo executor.
- **Learning and Cost Loop:** mede tokens/contexto, saída, chamadas externas, tempo, retrabalho, regressões e Evidence reutilizada por etapa.

### 1. Preservação por padrão

O `ChangeEnvelope` continua obrigatório para mudanças materiais. O v0.2 reafirma que silêncio não autoriza remoção, refatoração próxima ou alteração de contrato. Interface, API, backend, dados, identidade, ambientes, configurações, telemetria, experimentos, cobrança e artefatos gerados entram na análise de impacto.

### 2. Design System orgânico

Antes de implementar interface, o agente pesquisa componentes existentes e registra `reuse`, `extend`, `create`, `local` ou `not_applicable`. Componentes novos exigem contrato estável e reuso plausível. Isso reduz divergência visual e código repetido sem transformar toda regra local em abstração.

### 3. Requisitos não funcionais verificáveis

Qualidade deixa de ser adjetivo e vira cenário com estímulo, contexto, resposta, métrica, limite, verificador e validade da evidência. Evidência antiga ou invalidada por dependência não prova a revisão atual.

### 4. Ambientes e promoção

Local, test, preview e production mantêm dados, credenciais, exposição, custo e gates próprios. Produção não herda autorização de um teste anterior. Publicação exige evidência fresca e autoridade vinculada à revisão.

### 5. Exposição operacional progressiva

RTO/RPO e investimento de resiliência passam a considerar pessoas, operações, valor econômico e dados expostos durante a janela. A pior dimensão aciona evolução. Segurança, privacidade, autorização e integridade financeira não são relaxadas por baixo volume.

### 6. Preservação e recuperação

Réplica, backup e recuperação são conceitos distintos. Um backup sem restauração testada não é evidência suficiente. Versões operacionais anteriores permanecem imutáveis e um rollback produz nova revisão em vez de apagar o caminho histórico.

### 7. Memória epistemológica

O novo `ContextProfile` organiza fontes por domínio, autoridade, validade e relações. O agente compila somente o subgrafo ligado ao Intent e registra o que utilizou. Documentação e vaults são projeções; decisões, contratos, estado e evidência permanecem fontes operacionais versionadas.

### 8. Evolução arquitetural econômica

O `ArchitectureProfile` define maturidade por domínio, baseline, orçamento de complexidade, fitness functions e gatilhos. Microserviços, novas regiões, filas e abstrações genéricas deixam de ser sinais de maturidade e passam a exigir um problema observado e benefício mensurável.

### 9. IA multi-modelo governada

O `AIExecutionProfile` separa capability de fornecedor. Cada rota declara risco, dados permitidos, limite de tokens, ferramentas, latência, custo e evals. Um modelo barato só é econômico quando conclui a tarefa com qualidade suficiente; um modelo caro pode ser mais barato por resultado quando reduz tentativas e retrabalho.

### 10. Ledger e reconciliação de custos

Cada chamada por API registra, quando disponível, tokens de entrada, cache, saída, raciocínio, modelo, latência, request ID e estimativa. Custos estimados não substituem a cobrança: um processo separado reconcilia o ledger com o endpoint ou painel financeiro do fornecedor. Uso indisponível é `unknown`, nunca zero.

### 11. Autonomia progressiva

Codex permanece inicialmente como orquestrador humano-assistido. API própria começa com um piloto repetível, limitado e avaliável. Multiagentes, filas, retries e roteamento dinâmico só avançam por volume ou problema operacional observado.

### 12. Contexto e tokens como qualidade operacional

Cada run material declara teto de contexto, saída, ferramentas, fanout e custo. O objetivo não é minimizar tokens isoladamente, mas minimizar custo por resultado validado. Reuso de evidência e contexto depende de dependências declaradas e não modificadas.

## Decisões do v0.2

- adotar evolução arquitetural por estágio e domínio;
- manter monólito modular como padrão para produtos em validação;
- usar provider adapters para dependências de IA, sem construir um marketplace interno de modelos agora;
- manter Codex como orquestrador do desenvolvimento no estágio atual;
- pilotar chamadas via API apenas em tarefas repetíveis, de baixo risco e com evals;
- não enviar segredos, dados pessoais desnecessários ou bases completas a modelos;
- manter memória operacional em Git e dados volumosos em stores adequados, conectados por metadados e digests;
- atualizar o `leo-brain` como projeção humana, sem transformá-lo em fonte concorrente.

## O que deliberadamente não foi construído

- uma plataforma multiagente em produção;
- roteamento automático entre fornecedores;
- fine-tuning;
- banco vetorial como nova fonte da verdade;
- microserviços de agentes;
- cobrança automática baseada apenas em estimativas locais;
- autonomia para produção, credenciais, pagamentos ou dados pessoais.

Essas capacidades permanecem possíveis, mas dependem dos gatilhos registrados nos perfis.

## Critérios para revisar o v0.2

Revisar quando ocorrer ao menos um destes eventos:

- custo de contexto ou API exceder o budget aprovado;
- recuperação de contexto falhar em Intents reais;
- uma capability repetível atingir volume suficiente para automação;
- modelo aprovado deixar de cumprir qualidade, preço, retenção ou disponibilidade;
- arquitetura vigente exceder fitness function ou Exposure Budget;
- novo requisito regulatório alterar tratamento de dados ou evidência.
