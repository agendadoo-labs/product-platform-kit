# DataMap e projeções humanas no APOS

O crescimento de um produto cria dois problemas diferentes: governar dados e recuperar decisões. O APOS mantém ambos como registros pequenos e relacionáveis, sem transformar documentos narrativos em fontes paralelas.

## DataMap

O `DataMap` é o catálogo dedicado a entidades, relações, linhagem, classificação, retenção, sistemas e lacunas conhecidas. O `ProductState` guarda apenas um ponteiro tipado — ID, revisão, caminho e projeção humana — porque duplicar o mapa completo aumenta contexto e divergência.

Schema pretendido e schema observado são fatos diferentes. Migrações ou IaC descrevem a intenção; Evidence por ambiente confirma o que está realmente aplicado. Uma mudança de entidade, relação, classificação, retenção ou fluxo atualiza o DataMap no mesmo change package.

## Memória humana

`APOS-PROJECT-MEMORY.md` resume revisão, modelo ativo, trabalho aberto e decisões recentes. `APOS-OPEN-INTENTS.md` detalha estado, próximo checkpoint, execução, evidência e incertezas de cada Intent candidato. Ambos são gerados; não devem ser editados manualmente.

```text
Intent ─┬→ Decision
        ├→ AgentRun
        ├→ Evidence
        └→ Workstream
               ↓
          ProductState ← DataMap
               ↓
      projeções humanas geradas
```

Assim, existe memória específica por Intent como um subgrafo ligado por `intent_id`. Não é necessário manter um segundo diário manual por demanda.

## Checkpoint

O repositório consumidor deve executar:

```sh
node scripts/sync-apos-project-memory.mjs
node scripts/sync-apos-project-memory.mjs --check
```

O primeiro comando atualiza as projeções; o segundo falha quando estão defasadas ou quando o ponteiro do DataMap não corresponde ao `ProductState`. O check deve integrar CI e Definition of Done. Um vault pessoal ou wiki recebe apenas cópias derivadas e nunca se torna requisito do starter.
