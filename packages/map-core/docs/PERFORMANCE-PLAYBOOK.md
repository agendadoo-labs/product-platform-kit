# Playbook de desempenho para busca por mapa

## Caminho crítico

Uma interação deve executar apenas uma das operações abaixo:

1. buscar áreas já agregadas dentro do viewport;
2. sugerir áreas por texto normalizado;
3. resolver comparáveis de uma área selecionada;
4. ler uma série histórica já agregada.

Nunca calcule percentis, geocodifique endereços ou agrupe milhões de transações durante uma requisição do frontend.

## Índices essenciais

O vínculo área → transação normalmente fornece `content_hash`, arquivo, aba e linha de origem. Crie um índice composto na mesma ordem seletiva usada pelo `JOIN`. Sem ele, o banco pode varrer toda a base canônica para cada clique.

Use o arquivo `../sql/postgres-serving-indexes.sql` como referência. Em produção volumosa, crie índices com `CONCURRENTLY`; em migrações aplicadas antes da carga, use a versão comum para manter execução transacional.

## Consulta por viewport

- receba cidade, limites oeste/sul/leste/norte, zoom e limite;
- escolha o nível no servidor, não confie apenas no cliente;
- aplique primeiro cidade, nível e bounding box;
- limite o retorno, por padrão, a 80 áreas;
- devolva medianas prontas e centros representativos;
- quantize o viewport com `viewportCacheKey` para ampliar acertos de cache.

## Comparáveis

- selecione primeiro os vínculos da área;
- limite o conjunto de quarteirão às últimas 10 transações quando essa for a regra do produto;
- filtre tipologia e faixa de área no banco;
- ordene por data e proximidade de área;
- imponha teto absoluto de resultados;
- selecione somente colunas apresentadas ao usuário.

## Cliente

- cancele a chamada anterior ao mover novamente o mapa;
- aplique debounce de 150–300 ms após o movimento;
- carregue o motor cartográfico com importação dinâmica;
- não monte pins fora do zoom mínimo;
- use pontos sem texto e mantenha valores no card de resumo;
- mantenha cache curto por cidade + viewport + zoom + versão do dataset.

## Metas iniciais

| Operação | Meta p95 | Limite sugerido |
|---|---:|---:|
| áreas do viewport | 500 ms | 80 áreas |
| autocomplete | 300 ms | 6 sugestões |
| comparáveis | 1 s | 50 transações |
| série histórica | 300 ms | 1 ponto por ano |

Revise metas com telemetria real. Registre `duration_ms`, nível, zoom, quantidade retornada, cache hit/miss e categoria do erro sem texto livre.

## Diagnóstico

1. execute `EXPLAIN (ANALYZE, BUFFERS)` com parâmetros representativos;
2. confirme `Index Scan`/`Bitmap Index Scan` no vínculo e filtros;
3. procure varreduras sequenciais da tabela canônica;
4. compare linhas estimadas e reais para detectar estatísticas defasadas;
5. rode `ANALYZE` após cargas grandes;
6. acompanhe p50/p95/p99, timeout, CPU, I/O, cache e conexões;
7. faça teste de carga no Preview com recorte real antes de ampliar produção.

## Sinais para evoluir

- p95 acima da meta após índices: particionar detalhe por cidade/data;
- viewport muito denso: tiles vetoriais ou agregação espacial por grade;
- histórico grande: tabela anual estreita e cache por chave de consulta;
- muitas leituras repetidas: cache distribuído com versão do dataset;
- importação afetando serving: réplica de leitura ou janela de atualização assíncrona.
