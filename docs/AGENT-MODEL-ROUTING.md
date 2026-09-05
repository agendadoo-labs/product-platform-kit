# Roteamento de modelos e orçamento de tokens

O orquestrador preserva contexto, decisões e integração em um modelo mais capaz. Especialistas recebem o menor modelo que atende com segurança à tarefa e sobem de nível quando risco, ambiguidade ou dificuldade exigirem.

## Perfis padrão

| Perfil | Modelo padrão | Esforço | Uso |
|---|---|---|---|
| Orquestração | `gpt-5.6-sol` | `high` | decomposição, decisões, integração e revisão final |
| Especialista | `gpt-5.6-terra` | `medium` | implementação, análise e design com julgamento moderado |
| Econômico | `gpt-5.6-luna` | `low` | inventário, busca local, mudanças mecânicas e checks |

Os identificadores são defaults substituíveis no `team.yaml`. Revise-os quando disponibilidade ou preços mudarem.

## Classificação de tarefas

### Econômica

Use Luna com esforço baixo para localizar arquivos, levantar referências, atualizar índices de documentação, executar checks conhecidos, formatar conteúdo e aplicar mudanças repetitivas bem especificadas.

### Padrão

Use Terra com esforço médio para implementar componentes definidos, escrever testes, analisar dados com critérios claros, produzir variações de layout e revisar contratos locais.

### Complexa

Use Sol com esforço alto para arquitetura, segurança, migrações de produção, investigação ambígua, reconciliação entre áreas e revisão final. O orquestrador permanece neste perfil por padrão.

## Regras de promoção

Promova uma tarefa um nível quando houver alteração destrutiva, dados pessoais, autenticação ou pagamento, migração irreversível, conflito entre fontes, falha repetida, requisito ambíguo que afete aceite ou decisão que atravesse duas especialidades.

Não promova por tamanho de arquivo ou quantidade de passos quando o trabalho continuar mecânico e verificável.

## Orçamento de contexto

1. Envie ao especialista somente objetivo, arquivos, contratos e critérios necessários.
2. Prefira caminhos e trechos precisos a históricos completos.
3. Defina saída curta: resultado, evidência, arquivos alterados e riscos.
4. Reuse artefatos versionados; não repita documentação extensa no prompt.
5. Delegue uma vez por fronteira clara e evite cadeias de agentes.
6. Não peça ao especialista para revalidar trabalho fora de seu contrato.
7. O orquestrador resume resultados antes de cruzá-los com outra área.

## Limites sugeridos

| Tarefa | Entrada alvo | Saída alvo | Tentativas antes de promoção |
|---|---:|---:|---:|
| Mecânica | 8 mil tokens | 2 mil tokens | 2 |
| Especializada | 24 mil tokens | 6 mil tokens | 2 |
| Complexa | 64 mil tokens | 12 mil tokens | revisão humana conforme risco |

São orçamentos operacionais, não limites da plataforma. Meça custo real por tipo de tarefa e ajuste trimestralmente.

## Plano de execução econômico

1. O orquestrador classifica risco e cria contratos curtos.
2. Luna faz descoberta e tarefas mecânicas em paralelo quando houver ganho real.
3. Terra implementa ou analisa os itens que exigem julgamento de área.
4. Sol recebe apenas conflitos, decisões críticas e integração final.
5. Checks determinísticos substituem revisões adicionais por modelo sempre que possível.
6. Registre modelo, esforço, tokens estimados, retrabalho e aceite para calibrar o roteador.

## Planos prontos

- `lean.yaml`: Luna por padrão nos especialistas e Terra apenas quando a tarefa deixar de ser mecânica.
- `balanced.yaml`: Terra nos especialistas, Luna em descoberta e Sol na orquestração; é o padrão recomendado.
- `critical.yaml`: Astra na orquestração de alto risco, Sol na revisão crítica e modelos menores na coleta de evidências.

Os três planos ficam em `templates/agents/.agents/execution-plans/`. A configuração correspondente de ambiente está em `templates/agents/.env.agents.example`.

## Critério de sucesso

Otimize custo por entrega aceita, não custo por chamada. Uma tarefa barata que gera retrabalho pode custar mais que uma execução correta em Terra ou Sol.
