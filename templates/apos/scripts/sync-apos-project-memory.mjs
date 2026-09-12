import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const checkOnly = process.argv.includes('--check')
const readJson = (path) => JSON.parse(readFileSync(resolve(root, path), 'utf8'))
const records = (directory) => existsSync(resolve(root, directory)) ? readdirSync(resolve(root, directory)).filter((name) => name.endsWith('.json')).sort().map((name) => ({ value: readJson(`${directory}/${name}`) })) : []
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
if (entityIds.length !== entitySet.size || state.data_map?.id !== dataMap.id || state.data_map?.revision !== dataMap.revision) throw new Error('invalid_data_map_projection')
for (const relation of dataMap.relationships) if (!entitySet.has(relation.from) || !entitySet.has(relation.to)) throw new Error(`unresolved_data_relation: ${relation.from} -> ${relation.to}`)
const rows = (state.candidate_intents ?? []).map((id) => { const intent = byId.get(id); const stream = workstreams.find((item) => item.intent_id === id); return `| \`${id}\` | ${stream?.status ?? intent?.status ?? 'candidate'} | ${intent?.ceremony_selection?.level ?? 'não definida'} | ${(stream?.next_checkpoint ?? 'Não definido.').replaceAll('|', '\\|')} |` })
const details = (state.candidate_intents ?? []).map((id) => { const intent = byId.get(id); const stream = workstreams.find((item) => item.intent_id === id); const ds = linked(decisions, id); const run = latest(linked(runs, id), 'completed_at'); const ev = latest(linked(evidence, id), 'created_at'); return `## ${id}\n\n- **Estado:** ${stream?.status ?? intent?.status ?? 'candidate'}.\n- **Problema:** ${intent?.problem ?? 'Registro ausente.'}\n- **Resultado:** ${intent?.outcome ?? 'Não informado.'}\n- **Próximo checkpoint:** ${stream?.next_checkpoint ?? 'Não definido.'}\n- **Decisões:** ${ds.length ? ds.map(({ value }) => `\`${value.id}\``).join(', ') : 'nenhuma'}.\n- **Última execução:** ${run ? `\`${run.id}\` — ${run.status}` : 'nenhuma'}.\n- **Última evidência:** ${ev ? `\`${ev.id}\` — ${ev.passed ? 'passou' : 'não passou'}` : 'nenhuma'}.\n- **Incertezas:** ${run?.remaining_uncertainties?.length ? run.remaining_uncertainties.join('; ') : 'nenhuma registrada'}.\n` })
const recent = decisions.filter(({ value }) => value.created_at).sort((a, b) => String(b.value.created_at).localeCompare(String(a.value.created_at))).slice(0, 10)
const header = `| Intent | Estado | Cerimônia | Próximo checkpoint |\n|---|---|---|---|\n${rows.join('\n') || '| — | nenhum | — | — |'}`
const memory = `---\ntitle: APOS — memória atual do projeto\nupdated: ${date}\n---\n\n# Memória atual do projeto\n\n> Projeção determinística de \`.apos/\`. Não editar manualmente.\n\n- ProductState: \`${state.id}\`, revisão ${state.revision}.\n- Modelo: \`${active.model_id}\`.\n- Intents satisfeitos: ${state.satisfied_intents?.length ?? 0}.\n- Intents abertos: ${state.candidate_intents?.length ?? 0}.\n- DataMap: \`${dataMap.id}\`, revisão ${dataMap.revision}.\n\n## Trabalho aberto\n\n${header}\n\n## Decisões recentes\n\n${recent.map(({ value }) => `- **${value.created_at} · ${value.id}:** ${value.decision}`).join('\n') || '- Nenhuma.'}\n`
const report = `---\ntitle: APOS — Intents abertos\nupdated: ${date}\n---\n\n# Intents abertos\n\n> Projeção da revisão ${state.revision}. Não editar manualmente.\n\n${header}\n\n${details.join('\n') || 'Nenhum Intent aberto.'}\n## Memória por Intent\n\nO \`intent_id\` liga Intent, Decisions, AgentRuns e Evidence; ProductState e workstreams projetam situação e próximo checkpoint.\n`
for (const [path, content] of [['docs/APOS-PROJECT-MEMORY.md', memory], ['docs/APOS-OPEN-INTENTS.md', report]]) { const absolute = resolve(root, path); if (checkOnly) { if (!existsSync(absolute) || readFileSync(absolute, 'utf8') !== content) throw new Error(`stale_projection: ${path}`) } else { mkdirSync(resolve(absolute, '..'), { recursive: true }); writeFileSync(absolute, content) } }
console.log(`${checkOnly ? 'Checked' : 'Updated'} APOS projections for revision ${state.revision}.`)
