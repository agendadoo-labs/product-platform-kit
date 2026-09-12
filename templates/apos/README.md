# Starter APOS para repositórios consumidores

Este starter substitui o antigo modelo de equipe fixa. Ele fornece uma estrutura mínima para governar agentes por intenção, contratos, capacidades e evidência.

Se esta é sua primeira adoção, leia antes o [guia APOS em 30 minutos](../../docs/APOS-GETTING-STARTED.md). Ele contém um exemplo completo e explica a ordem de criação dos registros.

## Resultado esperado

Ao terminar a adoção, seu repositório terá um modelo ativo, um Intent ligado a uma Decision, um ContextManifest dentro do orçamento, um AgentRun, Evidence independente e um ProductState atualizado somente após a verificação.

## Adoção

1. Copie `AGENTS.md`, `APOS-AGENT-BOOTSTRAP.md`, as pastas `.apos/` e `docs/`, e os scripts do starter para o repositório consumidor.
2. Substitua os campos `ADAPTAR` na Constitution e nos Contracts.
3. Registre o primeiro Intent do produto; não converta um backlog inteiro mecanicamente.
4. Selecione somente os Contracts e Capabilities aplicáveis à mudança.
5. Preencha um `ChangeEnvelope`: declare o delta, superfícies afetadas, invariantes, fora de escopo, compatibilidade, regressão proporcional e rollback. O que não for mencionado permanece inalterado.
6. Antes de qualquer interface, pesquise o Design System e registre `component_reuse_assessment`: reutilizar, estender, criar, manter local ou não aplicável. Um novo componente exige contrato estável e reuso plausível; não crie abstrações especulativas.
7. Adapte `QualityProfile`, `EnvironmentProfile` e `ExposureBudget`; selecione somente dimensões aplicáveis, transforme qualidade em cenários mensuráveis e defina gatilhos progressivos de RTO/RPO.
8. Preencha o `ArchitectureProfile` por domínio. Mantenha a arquitetura mínima suficiente e aceite complexidade somente com problema observado, alternativa simples avaliada, fitness function, custo permanente, rollback e condição de remoção.
9. Preencha o `ContextProfile` com domínios, fontes autoritativas e dependências. Cada run material deve compilar e registrar somente o contexto relacionado ao Intent.
10. Preencha o `AIExecutionProfile` apenas se houver uso de modelos. Comece humano-assistido; uma rota por API exige provider aprovado, tratamento de dados, limite rígido, request trace, eval e fallback.
11. Implemente verificadores progressivamente. Enquanto não existirem, marque-os `specified`.
12. Preserve o modelo anterior com commit, tag e hashes antes de trocar o ponteiro ativo.
13. Produza ProductState apenas a partir de Evidence; não marque “feito” manualmente.
14. Catalogue entidades, relações, linhagem, classificação e retenção em `.apos/data/data-map.json`; o ProductState guarda apenas ID, revisão e caminhos da projeção.
15. Ao encerrar trabalho material, execute o gerador de memória e faça o CI verificar que `APOS-PROJECT-MEMORY.md` e `APOS-OPEN-INTENTS.md` correspondem ao ProductState.

## Comandos essenciais

Depois de substituir todos os campos `ADAPTAR` e criar o primeiro Intent e Decision:

```sh
node scripts/bootstrap-apos-session.mjs
```

Esse primeiro comando monta um índice pequeno do estado e do trabalho aberto sem chamar uma LLM. Depois de relacionar o pedido ao Intent correto, compile o contexto material:

```sh
node scripts/compile-apos-context.mjs \
  --intent .apos/intents/I-SEU-PRODUTO-001.json \
  --decision .apos/decisions/D-SEU-PRODUTO-001.json \
  --output .apos/context/manifests/CM-I-SEU-PRODUTO-001.json
```

O comando termina com código `2` quando o contexto excede o orçamento. Isso é um pedido de revisão ou escalonamento, não autorização para apagar fontes relevantes. Adapte ao projeto um verificador equivalente a `scripts/check-operating-model.mjs` deste kit.

No checkpoint, atualize as projeções humanas:

```sh
node scripts/sync-apos-project-memory.mjs
node scripts/sync-apos-project-memory.mjs --check
```

O relatório de Intents abertos mostra o estado operacional, o próximo checkpoint e a memória ligada a cada `intent_id`. O DataMap dedicado evita colocar o mapa inteiro da empresa dentro do ProductState.

Para produtos com múltiplos times, mantenha `coordination/workstreams.json` enxuto: Intent, owner, colaboradores, domínios, dependências, branch/ambiente e próximo checkpoint. Não replique detalhes do Intent nem trate ownership como permissão.

Produto, design, engenharia, dados e operações podem continuar como famílias de contrato. Eles não representam agentes, etapas obrigatórias nem documentos independentes que toda mudança deve produzir.

O starter não contém modelos de IA fixos. O roteamento escolhe a rota aprovada de menor custo que atenda qualidade, risco e política de dados. Preço por token não substitui custo por resultado validado. Uso por chamada é registrado quando disponível e reconciliado com a cobrança do fornecedor.

A análise inicial de impacto é responsabilidade do agente, não do builder. Ela cobre ao menos experiência, APIs, backend, dados, identidade, ambientes, integrações, telemetria, experimentos, monetização, privacidade, operação e artefatos gerados. Evidência ainda válida pode ser reutilizada quando suas dependências observadas não mudaram; regressão ampla fica para acoplamento sistêmico ou gate de promoção.

O starter separa medição, budget, alerta, quota e circuit breaker. Também separa alta disponibilidade, replicação, backup e restauração comprovada. Os valores de RTO, RPO, latência, gasto e tokens pertencem ao consumidor e devem ser aprovados no contexto do seu negócio.

O `ExposureBudget` evita antecipar infraestrutura cara: projeta pessoas, operações, valor econômico e dados no RTO/RPO vigente e exige evolução quando qualquer limite for superado. O template não oferece números padrão, pois exposição aceitável é uma decisão do consumidor.

O `ArchitectureProfile` impede que antecipação de escala vire infraestrutura permanente sem evidência. O `ContextProfile` evita que o crescimento do conhecimento obrigue todo agente a reler todo o projeto. O `AIExecutionProfile` permite incorporar novos fornecedores e modelos por adapter e eval, sem tornar o APOS dependente deles.
