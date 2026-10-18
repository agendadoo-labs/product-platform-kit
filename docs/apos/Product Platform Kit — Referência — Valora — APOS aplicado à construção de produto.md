---
title: "Valora — APOS aplicado e interpretação de intenção do builder"
aliases: ""
tags: "[valora, apos, produto, agentes, governanca, product-platform-kit]"
created: "2026-09-05"
status: "Proposta para revisão; políticas novas não aprovadas"
related: "APOS — Product Platform Kit"
id: "DOC-747E5A73DD12A3"
type: "reference"
scope: "Product Platform Kit"
document_role: "reference"
purpose: "Contextualizar Valora — APOS aplicado à construção de produto."
read_when: ["Consultar contexto complementar: Valora — APOS aplicado à construção de produto"]
authority: "documented_source_not_runtime_verification"
tier: "warm"
updated: "2026-10-18"
---
# Valora — APOS aplicado à construção de produto

Contextualizar Valora — APOS aplicado à construção de produto.

## 1. A experiência que queremos criar

**O builder expressa o que quer mudar; o sistema organiza o contexto, executa dentro da autoridade concedida e apresenta o que aprendeu.** A estrutura APOS existe para sustentar essa interação, sem transformar o builder em mantenedor de schemas, tickets ou relatórios.

No Valora, isso significa poder escrever “no celular está difícil continuar depois de escolher os imóveis” e o sistema reconhecer a jornada, recuperar os contratos existentes, propor ou executar uma correção conforme a autoridade disponível, verificar o resultado e registrar a evidência. O humano não precisa preencher um Intent, abrir cinco tarefas ou repetir informações que o sistema já conhece.

Esta proposta aplica os seis objetos do APOS v0.1 ao Valora e especifica uma extensão para interpretar conversas. **É documentação de desenho, não implementação dessa extensão nem autorização para executar as sugestões.**

### Como ler as afirmações

- **Definido no registro:** consta do histórico ou dos documentos do produto. Não pressupõe acesso à mensagem original que autorizou a decisão.
- **Evidência relatada:** um registro descreve uma validação anterior. Não foi refeita nesta tarefa.
- **Sugestão S-n:** proposta nova, aguardando julgamento do builder.
- **Desconhecido:** as fontes consultadas não permitem concluir.

A ferramenta de leitura de “Criar consultor de preço imobiliário” retornou seu pedido inicial e turnos recentes sem mensagens. A reconstrução usa os documentos produzidos naquele workspace. As referências [F1]–[F8], ao final, e o inventário de hashes anexo tornam essa base rastreável. O estado abaixo é uma fotografia documental, não uma auditoria atual de produção.

## 2. Constituição do produto: propósito, limites e autoridade

| Dimensão | Aplicação concreta ao Valora | Situação |
| --- | --- | --- |
| Propósito | Ajudar profissionais imobiliários a definir e defender um preço de venda fundamentado em transações oficiais e comparáveis escolhidos. | Definido [F1, F3] |
| Jornada de valor | Buscar → selecionar comparáveis → entender faixa/evolução → ajustar recomendação → gerar e guardar parecer com assinatura opcional. | Definido [F1] |
| Papel humano no produto | O usuário escolhe comparáveis e pode ajustar o preço sugerido. | Definido [F1] |
| Ativação | Primeiro relatório gerado. | Definido [F1, F3] |
| Verdade dos dados | Não inventar campos; distinguir transações diferentes de repetição técnica; preservar dados originais. | Definido [F1, F2] |
| Privacidade | Respeitar opt-out analítico e não registrar senha, assinatura, PDF ou texto livre desnecessário na telemetria. | Definido [F3] |
| Monetização | Assinatura mensal recorrente por provedor externo, sem armazenar cartão no Valora. | Intenção inicial e plano registrado; implementação não comprovada [F1] |
| Autonomia operacional | Trabalho local permitido; produção e ações destrutivas requerem confirmação no momento da execução. | Definido no modelo operacional [F7] |
| Métrica de valor maior | Ajudar o corretor a produzir um parecer utilizável, com evidência compreensível e esforço menor. | Sugestão S-1; ainda sem medida acordada |

**Sugestão S-1 — primeiro relatório como proxy, sem confundi-lo com valor final.** Manter a ativação já definida e medir também se o parecer foi útil para a recomendação do corretor. A forma de coleta dessa utilidade, sua população e frequência precisam ser escolhidas; não criar automaticamente um novo formulário no produto.

## 3. Intents: organizar mudanças desejadas

As intenções abaixo agrupam decisões existentes. Seus IDs são propostos para referência; não representam novos projetos autorizados ou tickets a criar.

| Intent proposto | Mudança desejada | O que sustenta o resultado | Estado documental |
| --- | --- | --- | --- |
| I-VAL-01 — fundamentar o parecer | Encontrar comparáveis pertinentes e gerar um parecer que preserve a amostra e permita ajuste humano. | Busca autenticada, seleção, PDF e reabertura com os mesmos comparáveis. | Implementação e validações relatadas [F1, F2]; impacto de uso não demonstrado aqui. |
| I-VAL-02 — reduzir esforço no celular | Permitir continuar a jornada sem percorrer novamente uma lista longa. | Barra de continuar, mínimo de dois comparáveis, último item acessível e medição de exposição/clique. | Definido e registrado como implementado [F2, F3]. |
| I-VAL-03 — descobrir comparáveis espacialmente | Encontrar áreas sem conhecer previamente a grafia do endereço. | Mapa por cidade, resumo da amostra, acesso aos imóveis, navegação touch e aviso de cobertura. | Critérios definidos [F4]; publicação e testes relatados em registro posterior [F6]. |
| I-VAL-04 — ampliar cobertura por cidade | Usar Rio e São Paulo sem misturar fontes ou expor campos inexistentes. | Isolamento por cidade, séries temporais explícitas, campos condicionais e proveniência. | Escopo definido [F5]; carga de São Paulo relatada [F6]. |
| I-VAL-05 — preservar acesso e confiança | Manter sessões, isolamento de contas, autenticação e privacidade ao evoluir o produto. | Controles de acesso, testes de sessão, MFA administrativo e opt-out. | Decisões registradas [F1, F2]; configuração atual exige evidência própria. |
| I-VAL-06 — viabilizar receita recorrente | Cobrar assinatura por um provedor especializado. | Fluxo comercial, preço, cobrança, cancelamento e verificação de integração. | Planejado; provedor e regras comerciais pendentes nas fontes [F1]. |

### Exemplo de Intent materializado

**I-VAL-02:** “Reduzir o esforço para avançar após selecionar comparáveis no celular, preservando a regra de seleção e a visibilidade da lista.”

- População: usuários do fluxo de comparáveis em telas móveis.
- Contexto existente: a lista longa dificultava o avanço [F1].
- Solução registrada: barra fixa com ação Continuar [F2].
- Contratos: não avançar com menos de dois comparáveis; não cobrir o último item; respeitar opt-out nos eventos [F3].
- Evidência técnica necessária: reprodução em viewport móvel, estados com zero/um/dois comparáveis, interação touch e último item visível.
- Evidência de produto proposta: comparar a progressão para recomendação e o tempo entre seleção e avanço antes/depois, numa população comparável.
- Meta numérica: **não definida**. Não converter “melhorar” em “aumentar 10%” por inferência.

**Sugestão S-2 — encerramento por tipo de resultado.** Uma correção pode ser tecnicamente verificada enquanto seu efeito no comportamento permanece em observação. Mostrar ambos, sem declarar “resultado de produto atingido” porque os testes passaram. Sem meta, janela e denominador aprovados, o sistema pode relatar observações, mas não declarar sucesso de uma hipótese de melhoria.

## 4. Contracts: transformar princípios em verificações

Os IDs e a tradução para verificadores são propostas de modelagem. As regras identificadas como existentes vêm das fontes; os testes abaixo descrevem como demonstrá-las, não novas execuções realizadas.

| Contrato | Regra concreta | Verificação proposta e evidência | Origem |
| --- | --- | --- | --- |
| C-PROD-01 | Relatório preserva os comparáveis escolhidos e distingue total de preço/m². | Criar/reabrir relatório de teste; comparar IDs, valores e rótulos no parecer. | [F1, F2] |
| C-DES-01 | Continuar móvel fica acessível, desabilitado com menos de dois comparáveis e não cobre o fim da lista. | Testes de interação e captura do layout em estados representativos. | [F3] |
| C-DES-02 | No mapa, zoom 11–13 mostra bairros; 14+ mostra quarteirões; valores ficam no resumo; gesto dispensa resumo. | Testar transições de zoom, gesto, teclado e fechamento explícito. Teclado é extensão proposta a validar. | [F4] |
| C-DATA-01 | Ausência de campo não vira zero nem atributo inventado. | Fixtures com campos ausentes; interface e exportação preservam ausência. | [F1, F5] |
| C-DATA-02 | Sugestões, pins, comparáveis e agregados não misturam cidades. | Selecionar cidade, trocar cidade e provar isolamento em consulta e renderização. | [F4, F5] |
| C-DATA-03 | Normalização e agregação preservam origem e capacidade de reconstrução. | Comparar contagens/digests da fonte, regra de transformação e ensaio de reconstrução em ambiente isolado. | [F1, F2] |
| C-DATA-04 | Pin de quarteirão exige correspondência verificável; falta de pin não exclui ITBI da busca textual. | Amostra de vínculos, anti-join de registros sem mapa, aviso visível e consulta textual funcional. | [F4, F8] |
| C-ENG-01 | Conta comum não acessa dados de outra conta nem administração. | Testes com identidades distintas e negativas de acesso, usando ambiente autorizado. | [F1, F2] |
| C-OBS-01 | Funcionalidade possui eventos de descoberta, uso e resultado, com finalidade e proteção. | Validar contrato dos eventos e recebimento; testar também ausência de envio após opt-out no cliente e servidor. | [F3] |
| C-OPS-01 | Deploy preserva projeto de autenticação, chave publicável e domínio canônico para manter sessões. | Comparação de configuração pública e teste de sessão antes/depois; mudança intencional exige plano próprio. | [F2] |
| C-GOV-01 | Produção e ação destrutiva não decorrem de uma aprovação genérica de layout ou texto. | Conferir autoridade específica antes de executar a ação. | [F5, F7] |

**Sugestão S-3 — contratos executáveis progressivos.** Começar com C-DES-01, C-DATA-02 e C-OBS-01 para um caso de baixo alcance. Reutilizar testes existentes antes de criar novos. Um contrato ainda sem verificador aparece como “não verificado”, nunca como “passou”. Casos que exigem julgamento visual recebem evidência de revisão humana ligada à versão do candidato.

Não há SLO numérico novo aprovado nesta proposta. Os **817 ms** relatados para uma consulta de Vila Madalena [F6] são uma observação pontual, não p95, SLA ou limite aceitável para todos os usuários.

## 5. Decisions: preservar julgamento e evolução

Decisões devem reter o motivo e o que substituem, sem gerar atas para cada gesto do agente.

| Decisão recuperada | Consequência APOS |
| --- | --- |
| E-mail/senha é o acesso principal; SMS foi adiado; Google/Apple estavam preparados. | Não interpretar o pedido inicial de social login como prova de que ambos estão configurados. [F1, F2] |
| A política de senha foi alterada para 10–72 caracteres, sem composição obrigatória, com proteção contra senhas vazadas. | A regra anterior de maiúscula/minúscula/número/símbolo fica como decisão substituída no registro, não como contrato vigente concorrente. [F2] |
| São Paulo usa janela publicada de 2016 em diante, detalhe recente e agregados históricos, preservando canônicos. | Distinguir política de serving de exclusão física da fonte. [F2, F6] |
| Preview usa recorte real minimizado. | Não insistir em carga integral em homologação como requisito implícito. [F2, F6] |
| Mapa começa com protótipo antes de produção. | O relatório posterior de publicação atualiza o estado documental de entrega; não remove a regra de aprovação para próximas mudanças. [F4, F6] |

**Sugestão S-4 — mudanças com vínculo, não reescrita silenciosa.** Registrar `substitui`, motivo, fonte e versão efetiva. Se duas afirmações conflitam sem vínculo claro, marcar conflito e perguntar apenas sobre o ponto necessário. “Mais recente” ajuda a recuperar contexto, mas não basta para dar autoridade a um comentário ou superseder uma decisão aprovada.

## 6. Evidence e ProductState: o que sabemos de fato

### Evidências anteriores aproveitáveis

[F6] relata validação de mapa em Preview e produção, 145.819 vínculos íntegros, consulta com 23 comparáveis e publicação em `www.valorarj.com.br`. [F8] registra 149.030 transações associadas a quarteirão em uma etapa de geração de cobertura.

**Não tratar 149.030 e 145.819 como a mesma medição.** Referem-se a registros e etapas distintos; reconciliar filtros, datasets e execução antes de afirmar perda ou ganho. Os 64,77% de cobertura de endereços em [F8] também não são cobertura de todas as transações, de todos os anos ou do território.

Ao importar esses relatos, preservar:

- referência ao documento e sua versão/hash;
- tipo “validação relatada”, sem inventar ID de pipeline ou medição original;
- ambiente, amostra e período quando informados;
- desconhecidos explícitos, incluindo validade atual;
- possibilidade de substituir a confiança do relato por artefato original verificável depois.

### ProductState inicial proposto

| Dimensão | Estado que pode ser registrado agora |
| --- | --- |
| Busca, comparáveis e parecer | Implementação e validações anteriores relatadas; resultado de negócio não medido nesta tarefa. |
| Mapa e São Paulo | Publicação relatada em [F6], com pendências operacionais; não revalidado ao vivo. |
| Ativação | Definida como primeiro relatório; taxa atual desconhecida. |
| Cobrança | Planejada nas fontes consultadas; implantação desconhecida. |
| Privacidade | Controles descritos; histórico cita identidade/canal do controlador pendentes, sem confirmação recente de resolução. |
| Custos de agentes | Tokens/custos marcados como indisponíveis em [F6, F7]. Não estimar como se fossem medidos. |
| Riscos abertos | Remoção histórica exige confirmação; tamanho do pacote de mapa e cobertura CodeQL aparecem pendentes em [F6]. |

**Sugestão S-5 — estado como projeção do conhecimento.** Manter o estado por intenção/capacidade com evidências e incertezas, em vez de um único “feito”. O estado é calculado a partir dos registros; humanos não mantêm um painel paralelo.

## 7. AgentRun: uma unidade de execução, não um funcionário virtual

Um AgentRun deve responder: qual mudança tentou produzir, com quais entradas/autoridade, o que executou, o que foi observado e por que parou.

Para o Valora, as capacidades são pesquisar contexto, desenhar interação, alterar código, verificar dados, validar comportamento e observar uso. Os planos Lean/Balanced/Critical existentes [F7] podem orientar custo e profundidade; **não concedem autorização por si mesmos**. Escolher Critical não autoriza uma migração de produção.

**Sugestão S-6 — registro automático e proporcional.** Uma execução composta mantém checkpoints e chamadas filhas no mesmo registro lógico. Só uma decisão material vira Decision durável; não produzir um documento por chamada de modelo. Usar verificadores determinísticos quando suficientes e registrar custo real apenas quando disponível.

## 8. Da conversa informal aos artefatos APOS

### 8.1 A interface do builder

**Sugestão S-7 — uma interpretação curta por mudança material.** Em vez de mostrar schemas, devolver algo como:

> Entendi que você quer facilitar o avanço depois da seleção de comparáveis no celular. Vou preservar a seleção mínima e o acesso ao último item. A barra fixa é uma solução já registrada; vou verificar se o problema é sua visibilidade ou outro comportamento. Publicar exige o aceite previsto para produção.

É uma interpretação ilustrativa, não um relato de ação executada. Se houver informação suficiente e autoridade local, o agente segue. Se faltar um julgamento indispensável, pergunta sobre esse julgamento e continua apenas o trabalho independente.

A interação deve permitir corrigir “não era isso”, restringir “só no celular” e adiar “deixa para depois” sem criar novos artefatos redundantes.

### 8.2 Pipeline proposto de interpretação

| Etapa automática | O que faz | Controle de qualidade |
| --- | --- | --- |
| 1. Capturar contexto mínimo | Mensagem, autor, horário, produto, conversa e trecho relevante. | Minimizar/redigir segredos; política de retenção própria para a memória do builder. |
| 2. Identificar atos de fala | Diferenciar pedido, hipótese, preferência, pergunta, correção, restrição e aprovação. | Uma pergunta sobre custo não cancela o trabalho; “talvez” não vira autorização. |
| 3. Recuperar estado e decisões | Buscar intenções relacionadas, contratos e decisões efetivas. | Considerar versão, origem e autoridade, não apenas similaridade textual. |
| 4. Extrair mudança proposta | Separar outcome, solução sugerida, população, restrições e incertezas. | Cada campo tem origem; valores ausentes permanecem ausentes. |
| 5. Reconciliar | Reutilizar intenção existente, propor revisão ou detectar conflito. | Não criar nova intenção para cada mensagem nem fundir intenções de produtos diferentes. |
| 6. Validar semântica e estrutura | Checar referências, tipos, compatibilidade de contratos e capacidade disponível. | Um JSON válido pode representar entendimento errado; não basta validar schema. |
| 7. Avaliar autoridade | Classificar ações concretas por impacto, incerteza, reversibilidade, ambiente e custo. | Política externa ao texto do modelo; risco cresce durante a execução e exige reavaliação. |
| 8. Apresentar apenas o delta necessário | Mostrar entendimento ou pedir julgamento sobre o ponto material. | Confirmações limitadas ao escopo; não pedir aceite para informação já decidida. |
| 9. Materializar e executar | Persistir revisão aceita e iniciar capacidades autorizadas. | Idempotência e revisão esperada evitam execução duplicada ou sobre estado antigo. |
| 10. Verificar, observar e aprender | Anexar evidências e atualizar projeções. | Executor não transforma sua própria afirmação em prova; ausência de dado não vira sucesso. |

O modelo de linguagem propõe interpretações; o validador e a política controlam a transição para execução. Conteúdo recuperado de arquivos, páginas ou conversas é contexto, não uma nova instrução autorizadora.

### 8.3 Proveniência por campo, sem novos formulários

Envelope ilustrativo para uma mensagem hipotética — **extensão proposta, não JSON aceito pelo runtime atual**:

```yaml
interpretacao:
  fonte: mensagem-exemplo-01
  revisao_base: estado-do-produto-lido
  ato: pedido_de_melhoria
  intent_relacionado: I-VAL-02
  campos:
    problema:
      valor: dificuldade_para_avancar_no_celular
      origem: explicito_na_mensagem
    solucao:
      valor: barra_fixa
      origem: decisao_existente_F2
    meta_numerica:
      valor: null
      origem: nao_definida
  alteracao_proposta: investigar_regressao_na_jornada_existente
  autoridade:
    trabalho_local: conforme_politica_vigente
    publicar: nao_concedida_por_esta_interpretacao
```

A fonte do campo pode ser explícita, herdada de decisão vigente ou sugerida pelo sistema. “Alta confiança” do modelo não converte sugestão em aprovação nem substitui evidência.

### 8.4 Exemplos que evitam burocracia e erros de autoridade

| Builder escreve — exemplos ilustrativos | Interpretação adequada | Resposta/efeito |
| --- | --- | --- |
| “No celular está ruim continuar.” | Sintoma, população e possível regressão; causa ainda desconhecida. | Recuperar I-VAL-02, reproduzir e corrigir dentro da autoridade local. Não abrir um novo projeto de redesign. |
| “Talvez o mapa ajude quem não sabe o nome da rua.” | Hipótese vinculável a I-VAL-03. | Recuperar mapa já registrado; investigar qual lacuna persiste. Não desenvolver novamente uma feature existente. |
| “Quanto isso vai custar?” | Pergunta sobre execução em curso. | Responder com medição ou indisponibilidade; não mudar automaticamente de escopo ou assumir gasto. |
| “Pode seguir.” | Possível aprovação contextual. | Vincular à proposta imediatamente identificável. Se havia layout e exclusão de dados em discussão, perguntar qual ação foi aprovada. |
| “Limpa esses dados antigos para baratear.” | Resultado econômico com possível ação destrutiva. | Analisar alternativas e restauração; preparar plano e pedir autorização específica antes de exclusão. |
| “Agora usa a mesma senha que o Google gera.” | Preferência de compatibilidade, não nova política completa. | Recuperar decisão de 10–72 caracteres; testar compatibilidade; não reintroduzir composição obrigatória. |
| “Esquece o mapa, quero melhorar o relatório.” | Mudança de prioridade ou cancelamento, conforme contexto. | Parar novas ações do trabalho substituído; preservar evidências; esclarecer apenas compromissos irreversíveis já iniciados. |

### 8.5 Aprovação compreensível e delimitada

**Sugestão S-8:** associar aprovação a proposta identificada, revisão, ações, ambiente e limites. Uma mudança material na proposta invalida sua aplicação automática ao novo plano. Um aceite não expira arbitrariamente a cada turno nem autoriza todas as ações futuras.

O builder pode dizer “aprovo S-7 e S-8, mas só para ações locais”. O sistema registra exatamente esse escopo. Comentários citados ou copiados de documentos não contam como aprovação atual. A identidade autenticada e o armazenamento verificável dessa autoridade são requisitos de uma implementação real; ainda não existem no runtime v0.1.

## 9. Uma fatia completa para validar a interação

**Sugestão S-9 — piloto em correção móvel, sem lançamento automático.** Usar um caso de regressão ou melhoria local na jornada de comparáveis; se não houver defeito reproduzível, o resultado é “problema não reproduzido”, com observações, sem inventar código para justificar atividade.

1. Builder descreve informalmente a dificuldade.
2. Sistema recupera I-VAL-02 e C-DES-01, registra o delta e verifica autoridade.
3. Agente reproduz o comportamento no ambiente isolado e registra baseline.
4. Se há problema, altera o candidato e executa as verificações contratadas.
5. Verificador produz evidência ligada à versão do código, ambiente e resultado.
6. ProductState passa a “candidato tecnicamente verificado”; a hipótese de redução de esforço permanece sem resultado observado.
7. Builder recebe uma comparação curta, evidência visual e decisão concreta de publicação, se essa etapa for solicitada.
8. Após publicação autorizada, observações de uso podem avaliar o outcome conforme janela e critério previamente acordados.

Assim o ciclo **Intent → execução → verificação → evidência → estado** existe antes de medir o resultado final. A progressão técnica e a aprendizagem de produto são explícitas, sem fingir equivalência.

## 10. Escala organizacional sem recriar o Jira

**Sugestão S-10 — memória e autoridade em três âmbitos:** organização, produto e execução. Contratos compartilhados do kit só são herdados quando aplicáveis; podem ser mais restritivos no produto. Exceções precisam de autoridade explícita, escopo e justificativa. Evidências de um produto não demonstram cumprimento em outro.

A unidade de coordenação entre agentes é uma alteração proposta sobre uma revisão conhecida. Agentes que trabalham em áreas independentes podem executar em paralelo; alterações concorrentes no mesmo contrato ou estado precisam ser reconciliadas. Nenhum agente prevalece simplesmente por ter escrito por último.

A interface humana deve mostrar:

- mudanças relevantes e evidências novas;
- decisões realmente pendentes, agrupadas pelo mesmo trade-off;
- falhas ou desvios que exigem ação;
- aprendizado que muda prioridades ou crenças.

Sem relatório automático quando nada relevante mudou. Sem documento obrigatório por agente. Sem contabilizar artefatos produzidos como valor.

### Orçamento de burocracia proposto

Todo artefato persistente precisa servir a pelo menos um uso: orientar execução, impor limite, explicar decisão, sustentar evidência ou recuperar estado. Se apenas repete outro registro, vira uma visualização derivada ou é eliminado da rotina.

**Sugestão S-11 — quatro perspectivas, uma fonte.** Preservar os conteúdos de Produto, Design, Dados e Engenharia já exigidos no Valora, mas gerar suas visualizações a partir de registros comuns. No piloto, não abolir nem duplicar os documentos existentes; demonstrar primeiro que a informação pode ser mantida sem divergência. Sua substituição é uma mudança do modo de trabalho que depende de aprovação.

## 11. Como saber se interpretar conversas realmente ajuda

**Sugestão S-12 — avaliar a interação antes de automatizar ações externas.** Criar um conjunto de mensagens com interpretações revisadas pelo builder, incluindo negativas e mudanças de opinião. Os exemplos da seção 8 são casos sintéticos de partida, não falas atribuídas a Leo.

| Medida | Definição proposta | Cuidado |
| --- | --- | --- |
| Fidelidade | Campos materiais corretamente interpretados / campos materiais revisados. | Avaliar origem e escopo, não só correspondência textual. |
| Ampliação indevida de autoridade | Casos em que o sistema executaria além do autorizado. | Qualquer caso observado bloqueia expansão de autonomia até análise; zero casos em teste não prova segurança universal. |
| Perguntas evitáveis | Perguntas cuja resposta já estava nas decisões recuperáveis / perguntas feitas. | Diminuir sem esconder incerteza necessária. |
| Retrabalho de interpretação | Revisões exigidas por entendimento incorreto. | Distinguir de mudança legítima de ideia do builder. |
| Atenção humana | Tempo ativo de leitura, correção e decisão por mudança validada. | Não confundir tempo decorrido com atenção; registrar indisponível se não medido. |
| Duplicação de memória | Intenções/registros redundantes gerados para o mesmo objetivo. | Detectar com amostra revisada; similaridade por si só não prova duplicação. |
| Valor validado | Mudanças que atendem ao critério acordado, com evidência suficiente. | Artefatos, chamadas e commits não são numerador de valor. |

Antes de usar um limite numérico de aprovação, medir baseline. Proposta de teste inicial: casos explícitos, ambíguos, contraditórios, fora do escopo, aprovação parcial, repetição de mensagem, interrupção, fonte com instrução maliciosa e contexto de outro produto. Construir um comparativo com o modo atual para verificar se poupamos atenção sem aumentar erros.

## 12. Relação exata com o APOS v0.1 existente

| Já implementado no pacote local | Extensão necessária para esta proposta |
| --- | --- |
| Seis schemas fechados de domínio. | Proveniência por campo, revisões de intenção e relação entre decisões. |
| Capacidade determinística de gerar catálogo. | Adaptadores de pesquisa, alteração de código, teste e observação do Valora. |
| Cinco checks específicos do catálogo. | Registro revisado dos contratos do produto e verificadores correspondentes. |
| Decisão allow/escalate para ação local limitada. | Autoridade autenticada por ambiente/ação; aprovação vinculada à revisão. |
| SQLite com idempotência e publicação atômica de estado. | Checkpoints longos, cancelamento, concorrência entre agentes e efeitos externos com reconciliação. |
| Estado com intenções satisfeitas e evidências. | Distinção entre verificação técnica, outcome observado e conhecimento herdado. |
| CLI com entrada JSON. | Interpretador conversacional, recuperação de contexto e avaliação de fidelidade. |

**Não inserir os exemplos desta nota nos schemas atuais esperando que executem.** São uma proposta de evolução compatível com os princípios, mas que exige mudanças versionadas. A implementação do interpretador deve começar produzindo diffs revisáveis; liberar execução é uma etapa distinta.

## 13. Decisões para sua aprovação

As sugestões foram agrupadas para você poder aprovar o desenho sem decidir detalhes de implementação agora. Nenhuma aprovação desta documentação é uma autorização de publicação, gasto ou alteração de produção.

| Grupo | Proposta concreta | Sugestões abrangidas |
| --- | --- | --- |
| A — Interação | Conversa livre como entrada; sistema recupera contexto, materializa deltas e pergunta somente sobre ambiguidades materiais. Aprovação sempre ligada ao escopo. | S-7, S-8 |
| B — Memória e progresso | Proveniência, decisões substituídas, estado derivado e separação entre evidência técnica e outcome. | S-2, S-4, S-5 |
| C — Piloto | Começar por uma mudança local da jornada móvel, contratos reaproveitados, registros automáticos e avaliação do interpretador; sem lançamento automático. | S-3, S-6, S-9, S-12 |
| D — Organização | Contratos por âmbito e perspectivas documentais derivadas de uma fonte, substituindo documentos manuais apenas depois de validar equivalência. | S-10, S-11 |
| E — Valor | Manter primeiro relatório como ativação e definir uma medida complementar de utilidade do parecer antes de instrumentar algo novo. | S-1 |

Você pode responder, por exemplo: “Aprovo A, B e C; vamos discutir D e E”. O próximo trabalho dependente deve respeitar esses limites. Preço de assinatura, provedor de pagamento, novas metas de negócio, política de retenção da memória e SLOs continuam indefinidos; não são preenchidos automaticamente por essa aprovação.

## 14. Fontes e rastreabilidade

Base local consultada no workspace de “Criar consultor de preço imobiliário”, repositório `price-wizard`:

- **[F1]** `docs/HISTORICO-PRODUTO-E-CONVERSAS.md`: síntese de pedidos, decisões e entregas; declara não ser transcrição literal.
- **[F2]** `docs/DECISION-LOG.md`: decisões com datas, motivos e caminhos de reversão; contém mudanças posteriores ao histórico inicial.
- **[F3]** `docs/PRODUCT.md`: valor, telemetria, primeiro relatório e proteção da jornada móvel.
- **[F4]** `docs/features/map-search/PRODUCT.md`: comportamento, cobertura e critérios do mapa.
- **[F5]** `docs/features/sao-paulo-multicity/PRODUCT.md`: isolamento por cidade, campos e limites de escopo.
- **[F6]** `docs/agent-runs/2026-09-05-homologacao-busca-mapa.md`: evidências relatadas de carga, publicação e pendências.
- **[F7]** `docs/AGENTIC-OPERATING-MODE.md`: planos, governança e medição de consumo.
- **[F8]** `docs/features/map-search/STAGING-DATA-COVERAGE.md`: cobertura e método de correspondência geográfica.

Veja [fontes consultadas](VALORA-SOURCES.md) para o inventário de fontes com hashes e os caminhos consultados. Não foram copiados dados de transações, credenciais ou dados pessoais de clientes.

Relacionados: [contexto APOS](CONTEXT.md), [APOS v0.1](../APOS-v0.1.md).
