# Resumo executivo

## Proposta para a liderança de produto e tecnologia

Recomendamos avaliar um modelo operacional em que equipes de produto e tecnologia governem mudanças por intenção, contratos e evidências, apoiadas por agentes com capacidades selecionadas conforme o problema. O APOS organiza essa interação: a pessoa responsável pelo produto expressa o resultado desejado e julga escolhas relevantes; o sistema recupera contexto, prepara candidatos, verifica restrições e preserva o conhecimento produzido.

A proposta não pressupõe que uma única pessoa possa substituir todas as competências ou responsabilidades da organização. A hipótese a testar é se uma pessoa responsável por uma frente de produto, apoiada por capacidades humanas e agênticas e por uma plataforma compartilhada, consegue produzir mudanças validadas com menos esforço de coordenação. Responsabilidade, segurança e decisões sobre compromissos de negócio continuam tendo responsáveis humanos identificáveis.

## O que muda no trabalho dos times

| Dimensão | Modelo proposto |
| --- | --- |
| Entrada de trabalho | Conversa sobre problema, público, resultado e limites; o sistema organiza esses elementos sem exigir formulários repetidos. |
| Coordenação | Composição de capacidades para cada mudança, com dependências e autoridade explícitas. Especialidades continuam essenciais, sem exigir um agente fixo por cargo. |
| Memória | Decisões, contratos, evidências e estado vinculados às versões relevantes. Documentos e painéis são visualizações dessa memória. |
| Progresso | Distinguir candidato verificado, entrega publicada e resultado observado. Nenhuma dessas etapas é substituída por contagem de tickets ou chamadas de agentes. |
| Governança | Autonomia dentro de limites aprovados; ações sensíveis exigem julgamento proporcional ao impacto e à reversibilidade. |
| Papel da liderança | Definir propósito, prioridades, recursos, contratos compartilhados e autoridade; resolver escolhas que o sistema não deve decidir sozinho. |

## O que temos hoje e o que ainda precisa ser provado

Há uma implementação local APOS v0.1 que demonstra um ciclo completo: intenção, decisão de governança, execução determinística, verificação de cinco contratos, evidências e atualização transacional do estado. Os registros da implementação relatam 12 testes aprovados. Esse experimento valida um protocolo técnico limitado; não comprova produtividade organizacional, segurança para agentes arbitrários, retorno financeiro ou impacto de produto.

O Product Platform Kit e o Valora também registram a migração de suas configurações operacionais para o APOS. Essa adoção documental e estrutural não amplia automaticamente o runtime. Interpretação de linguagem informal com autoridade autenticada, adaptadores isolados e verificação dos contratos de negócio ainda exigem evolução e validação próprias.

O compêndio reúne tanto propostas quanto registros de implementação. Trechos históricos que mencionam aprovações pendentes ou trabalho local foram preservados; os capítulos de migração mostram a evolução posterior. Uma aprovação desta proposta de trabalho não equivale a uma autorização genérica para agentes alterarem produção.

## Piloto recomendado

Selecionar uma jornada existente, com problema delimitado e alteração reversível — por exemplo, o avanço após selecionar comparáveis na experiência móvel do Valora. A recomendação é um piloto, não uma reorganização imediata de toda a empresa.

1. Definir um responsável humano, o resultado esperado, o ambiente permitido e os contratos aplicáveis.
2. Registrar o modo atual de trabalho como referência: atenção humana, tempo até uma mudança validada, retrabalho e falhas.
3. Usar mensagens naturais para propor alterações e gerar interpretações revisáveis, recuperando decisões existentes.
4. Permitir inicialmente apenas preparação e verificação local de candidatos. Separar a autorização de publicação.
5. Comparar o resultado com a referência e decidir se o escopo de autonomia pode crescer.

O piloto deve demonstrar redução de coordenação sem aumentar erros de interpretação, regressões ou ações fora da autoridade concedida. Metas numéricas, duração e orçamento devem ser definidos com o responsável pela jornada e os dados disponíveis; não são presumidos neste documento.

## Condições para escalar

- Autoridade vinculada à ação, ao ambiente e à revisão, com possibilidade de interromper a execução.
- Evidências ligadas ao candidato e produzidas por verificações que não dependam apenas da declaração do executor.
- Contratos compartilhados da organização, com regras específicas mantidas no produto correspondente.
- Isolamento de execução, credenciais restritas, limites de custo e tratamento dos efeitos externos antes de ampliar autonomia.
- Recuperação de contexto com proveniência e controle de versões; incertezas e conflitos não podem ser resolvidos silenciosamente.
- Documentação proporcional ao uso: se um artefato não orienta execução, impõe limites, explica decisões, sustenta evidências ou recupera estado, não deve se tornar obrigação permanente.

## Decisão solicitada ao CTO

Aprovar o desenho de um piloto delimitado e indicar seu responsável, os limites iniciais de autoridade e os critérios para avaliar continuidade. O primeiro investimento deve ser provar a qualidade da interação e da verificação, reaproveitando testes e infraestrutura existentes. A expansão para outras equipes deve depender de evidência do piloto, não da quantidade de agentes, documentos ou automações criados.
