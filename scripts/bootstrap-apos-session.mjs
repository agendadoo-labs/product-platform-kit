import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const args = process.argv.slice(2)
const argument = (name) => {
  const index = args.indexOf(name)
  return index >= 0 ? args[index + 1] : null
}
const readJson = (path) => JSON.parse(readFileSync(resolve(root, path), 'utf8'))
const readDirectory = (path) => existsSync(resolve(root, path))
  ? readdirSync(resolve(root, path)).filter((name) => name.endsWith('.json')).sort().map((name) => ({ path: `${path}/${name}`, value: readJson(`${path}/${name}`) }))
  : []

const active = readJson('.apos/active-model.json')
const state = readJson('.apos/state/product-state.json')
const intents = readDirectory('.apos/intents')
const decisions = readDirectory('.apos/decisions')
const runs = readDirectory('.apos/runs')
const evidence = readDirectory('.apos/evidence')
const coordinationPath = '.apos/coordination/workstreams.json'
const coordination = existsSync(resolve(root, coordinationPath)) ? readJson(coordinationPath) : { workstreams: [] }
const requestedIntentId = argument('--intent')
const openIntentIds = requestedIntentId ? [requestedIntentId] : [...new Set([...(state.candidate_intents ?? []), ...(coordination.workstreams ?? []).filter(({ status }) => ['active', 'blocked', 'ready'].includes(status)).map(({ intent_id }) => intent_id)])]
const byIntent = (entries, intentId) => entries.filter(({ value }) => value.intent_id === intentId || value.related_intent_ids?.includes(intentId))
const latest = (entries) => entries.sort((a, b) => String(b.value.updated_at ?? b.value.created_at ?? '').localeCompare(String(a.value.updated_at ?? a.value.created_at ?? '')))[0]
const missing = []

const openIntents = openIntentIds.map((id) => {
  const record = intents.find(({ value }) => value.id === id)
  if (!record) {
    missing.push(`Intent ausente: ${id}`)
    return { id, status: 'missing' }
  }
  const currentDecision = latest(byIntent(decisions, id))
  const currentRun = latest(byIntent(runs, id))
  const currentEvidence = latest(byIntent(evidence, id))
  const workstreams = (coordination.workstreams ?? []).filter(({ intent_id }) => id === intent_id)
  return {
    id,
    revision: record.value.revision ?? null,
    status: record.value.status ?? 'unknown',
    problem: record.value.problem ?? null,
    outcome: record.value.outcome ?? null,
    ceremony: record.value.ceremony_selection?.level ?? record.value.ceremony ?? null,
    decision: currentDecision ? { id: currentDecision.value.id, outcome: currentDecision.value.outcome ?? null, path: currentDecision.path } : null,
    last_run: currentRun ? { id: currentRun.value.id, status: currentRun.value.status ?? null, remaining_uncertainties: currentRun.value.remaining_uncertainties ?? [], path: currentRun.path } : null,
    last_evidence: currentEvidence ? { id: currentEvidence.value.id, passed: currentEvidence.value.passed ?? null, observed_at: currentEvidence.value.observed_at ?? currentEvidence.value.created_at ?? null, path: currentEvidence.path } : null,
    workstreams: workstreams.map(({ id: workstreamId, status, owner, collaborators, affected_domains, dependencies, branch, updated_at, next_checkpoint }) => ({ id: workstreamId, status, owner, collaborators: collaborators ?? [], affected_domains: affected_domains ?? [], dependencies: dependencies ?? [], branch: branch ?? null, updated_at, next_checkpoint: next_checkpoint ?? null })),
    path: record.path,
  }
})

for (const workstream of coordination.workstreams ?? []) {
  if (!intents.some(({ value }) => value.id === workstream.intent_id)) missing.push(`Workstream ${workstream.id} referencia Intent ausente: ${workstream.intent_id}`)
}

const packageValue = {
  protocol: 'APOS v0.2',
  purpose: 'deterministic_session_bootstrap',
  generated_at: new Date().toISOString(),
  active_model: { id: active.model_id, protocol: active.apos_protocol, path: active.path, decision_id: active.decision_id },
  product_state: { id: state.id, revision: state.revision, updated_at: state.updated_at, knowledge_keys: Object.keys(state.knowledge ?? {}).sort(), data_map: state.data_map ?? null },
  open_intents: openIntents,
  coordination: {
    active_workstreams: (coordination.workstreams ?? []).filter(({ status }) => ['active', 'blocked', 'ready'].includes(status)).length,
    source: existsSync(resolve(root, coordinationPath)) ? coordinationPath : null,
    rule: 'Ownership coordinates work; it does not grant authority or replace Contracts, Evidence or builder approval.',
  },
  next_step: requestedIntentId
    ? `Compile o contexto autoritativo de ${requestedIntentId} antes da execução material.`
    : 'Relacione o pedido atual a um Intent aberto ou registre um novo Intent; depois compile somente seu subgrafo autoritativo.',
  baseline_reading: ['.apos/active-model.json', '.apos/state/product-state.json'],
  focus_reading: openIntents.map(({ id, path, decision }) => ({ intent_id: id, paths: [path, decision?.path].filter(Boolean) })),
  diagnostics: missing,
}
const serialized = `${JSON.stringify(packageValue, null, 2)}\n`
const measurement = { utf8_bytes: Buffer.byteLength(serialized), estimated_tokens: Math.ceil(Buffer.byteLength(serialized) / 4), method: 'conservative_utf8_bytes_divided_by_4' }
packageValue.measurement = measurement
process.stdout.write(`${JSON.stringify(packageValue, null, 2)}\n`)
if (missing.length) process.exitCode = 2
