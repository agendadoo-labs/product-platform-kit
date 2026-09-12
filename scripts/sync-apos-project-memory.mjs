import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const checkOnly = process.argv.includes('--check')
const readJson = (path) => JSON.parse(readFileSync(resolve(root, path), 'utf8'))
const records = (directory) => existsSync(resolve(root, directory))
  ? readdirSync(resolve(root, directory)).filter((name) => name.endsWith('.json')).sort().map((name) => ({ path: `${directory}/${name}`, value: readJson(`${directory}/${name}`) }))
  : []
const writeOrCheck = (path, content) => {
  const absolute = resolve(root, path)
  if (checkOnly) {
    if (!existsSync(absolute) || readFileSync(absolute, 'utf8') !== content) throw new Error(`stale_projection: ${path}`)
  } else {
    mkdirSync(resolve(absolute, '..'), { recursive: true })
    writeFileSync(absolute, content)
  }
}

const state = readJson('.apos/state/product-state.json')
const active = readJson('.apos/active-model.json')
const dataMap = readJson('.apos/data/data-map.json')
const intents = records('.apos/intents')
const decisions = records('.apos/decisions')
const runs = records('.apos/runs')
const evidence = records('.apos/evidence')
const workstreams = existsSync(resolve(root, '.apos/coordination/workstreams.json')) ? readJson('.apos/coordination/workstreams.json').workstreams ?? [] : []
const date = String(state.updated_at).slice(0, 10)
const byId = new Map(intents.map(({ value }) => [value.id, value]))
const linked = (items, id) => items.filter(({ value }) => value.intent_id === id || value.related_intent_ids?.includes(id))
const latest = (items, field) => [...items].sort((a, b) => String(b.value[field] ?? '').localeCompare(String(a.value[field] ?? '')))[0]?.value

const entityIds = dataMap.entities.map(({ id }) => id)
const entitySet = new Set(entityIds)
if (entityIds.length !== entitySet.size) throw new Error('duplicate_data_entity')
if (state.data_map?.id !== dataMap.id || state.data_map?.revision !== dataMap.revision) throw new Error('product_state_data_map_pointer_mismatch')
for (const relation of dataMap.relationships) if (!entitySet.has(relation.from) || !entitySet.has(relation.to)) throw new Error(`unresolved_data_relation: ${relation.from} -> ${relation.to}`)

const openRows = (state.candidate_intents ?? []).map((id) => {
  const intent = byId.get(id)
  const stream = workstreams.find((item) => item.intent_id === id)
  return `| \`${id}\` | ${stream?.status ?? intent?.status ?? 'candidate'} | ${intent?.ceremony_selection?.level ?? 'não definida'} | ${(stream?.next_checkpoint ?? 'Não definido.').replaceAll('|', '\\|')} |`
})

const openDetails = (state.candidate_intents ?? []).map((id) => {
  const intent = byId.get(id)
  const stream = workstreams.find((item) => item.intent_id === id)
  const intentDecisions = linked(decisions, id)
  const lastRun = latest(linked(runs, id), 'completed_at')
  const lastEvidence = latest(linked(evidence, id), 'created_at')
  return `## ${id}

- **Estado do Intent:** ${intent?.status ?? 'ausente'}.
- **Estado operacional:** ${stream?.status ?? 'sem workstream'}.
- **Problema:** ${intent?.problem ?? 'Registro não encontrado.'}
- **Resultado esperado:** ${intent?.outcome ?? 'Não informado.'}
- **Próximo checkpoint:** ${stream?.next_checkpoint ?? 'Não definido.'}
- **Decisões:** ${intentDecisions.length ? intentDecisions.map(({ value }) => `\`${value.id}\``).join(', ') : 'nenhuma'}.
- **Última execução:** ${lastRun ? `\`${lastRun.id}\` — ${lastRun.status}` : 'nenhuma'}.
- **Última evidência:** ${lastEvidence ? `\`${lastEvidence.id}\` — ${lastEvidence.passed ? 'passou' : 'não passou'}` : 'nenhuma'}.
- **Incertezas:** ${lastRun?.remaining_uncertainties?.length ? lastRun.remaining_uncertainties.join('; ') : 'nenhuma registrada'}.
`
})

const recentDecisions = decisions.filter(({ value }) => value.created_at).sort((a, b) => String(b.value.created_at).localeCompare(String(a.value.created_at))).slice(0, 10)
const memory = `---
title: APOS — memória atual do projeto
updated: ${date}
---

# Memória atual do projeto

> Projeção determinística. Fontes operacionais: \`.apos/\`. Não editar manualmente.

- ProductState: \`${state.id}\`, revisão ${state.revision}.
- Modelo ativo: \`${active.model_id}\`.
- Intents satisfeitos: ${state.satisfied_intents?.length ?? 0}.
- Intents abertos: ${state.candidate_intents?.length ?? 0}.
- Mapa de dados: \`${dataMap.id}\`, revisão ${dataMap.revision}.

## Trabalho aberto

| Intent | Estado | Cerimônia | Próximo checkpoint |
|---|---|---|---|
${openRows.join('\n') || '| — | nenhum | — | — |'}

## Decisões recentes

${recentDecisions.map(({ value }) => `- **${value.created_at} · ${value.id}:** ${value.decision}`).join('\n') || '- Nenhuma.'}

## Fontes para aprofundar

- \`.apos/intents/\`: problema e resultado esperado.
- \`.apos/decisions/\`: escolhas e autoridade.
- \`.apos/runs/\`: execução e incertezas.
- \`.apos/evidence/\`: verificação independente.
- \`.apos/data/data-map.json\`: entidades, relações e linhagem.
`
const openReport = `---
title: APOS — Intents abertos
updated: ${date}
---

# Intents abertos

> Projeção da revisão ${state.revision} do ProductState. Não editar manualmente.

| Intent | Estado | Cerimônia | Próximo checkpoint |
|---|---|---|---|
${openRows.join('\n') || '| — | nenhum | — | — |'}

${openDetails.join('\n') || 'Nenhum Intent aberto.'}
## Memória por Intent

O \`intent_id\` liga Intent, Decisions, AgentRuns e Evidence. ProductState resume a situação; workstreams registram dependências e próximo checkpoint. A memória do Intent é esse subgrafo rastreável, não uma narrativa paralela.
`

writeOrCheck('docs/APOS-PROJECT-MEMORY.md', memory)
writeOrCheck('docs/APOS-OPEN-INTENTS.md', openReport)
console.log(`${checkOnly ? 'Checked' : 'Updated'} APOS projections for ProductState revision ${state.revision}.`)
