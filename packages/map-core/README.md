# Map Core

Pacote neutro e sem dependência visual para produtos com busca geográfica. Ele padroniza contrato de áreas, configuração de provedor, nível de detalhe por zoom, chave de cache, validação de linhagem e eventos de telemetria.

## Limites

- Não inclui cores, fontes, marca ou componentes do Valora.
- Não escolhe MapLibre, Leaflet ou um provedor comercial; o produto injeta o adaptador.
- Não geocodifica endereços. Coordenadas e `block_id` precisam vir de fonte auditável.
- Não permite autocomplete ou carga em massa no Nominatim público.

## Adoção

1. Importe os tipos e funções de `src/index.ts` ou publique o pacote em um registry privado.
2. Implemente um repositório que aceite `cityCode + viewport + zoom` e devolva `MapMarketArea[]`.
3. Aplique o design system do produto no adaptador visual.
4. Use `areaLevelForZoom` no cliente e no servidor.
5. Registre os eventos do catálogo sem texto livre, endereço ou coordenadas pessoais.
6. Teste tiles, atribuição, colisão, touch, cache, cancelamento e limites de requisição em homologação.

A experiência consumidora deve informar que nem toda transação possui precisão suficiente para ser exibida como quarteirão. O registro continua válido fora do mapa; o pacote padroniza `map_coverage_notice_viewed` para medir se o aviso foi exposto.
