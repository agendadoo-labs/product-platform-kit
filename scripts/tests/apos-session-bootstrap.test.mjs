import assert from 'node:assert/strict'
import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { execFileSync } from 'node:child_process'
import test from 'node:test'

const repositoryRoot = resolve(import.meta.dirname, '../..')
const writeJson = (path, value) => writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`)

test('primer do agente é curto e autossuficiente', () => {
  const primer = readFileSync(resolve(repositoryRoot, 'templates/apos/APOS-AGENT-BOOTSTRAP.md'), 'utf8')
  assert.ok(Buffer.byteLength(primer) <= 6000, 'primer deve permanecer abaixo do teto conservador de 1.500 tokens')
  for (const concept of ['Regra de autoridade', 'Comece assim', 'Intent', 'Evidence', 'Definição de concluído']) assert.match(primer, new RegExp(concept))
})

test('starter recupera estado e trabalho aberto sem chamada externa', () => {
  const root = mkdtempSync(join(tmpdir(), 'apos-bootstrap-'))
  try {
    mkdirSync(join(root, 'scripts'), { recursive: true })
    cpSync(resolve(repositoryRoot, 'templates/apos/scripts/bootstrap-apos-session.mjs'), join(root, 'scripts/bootstrap-apos-session.mjs'))
    for (const directory of ['versions/model', 'state', 'intents', 'decisions', 'runs', 'evidence', 'coordination']) mkdirSync(join(root, '.apos', directory), { recursive: true })
    writeJson(join(root, '.apos/active-model.json'), { model_id: 'model', apos_protocol: '0.2', path: '.apos/versions/model', decision_id: 'D-MODEL' })
    writeJson(join(root, '.apos/state/product-state.json'), { id: 'PS', revision: 2, updated_at: '2026-09-09', candidate_intents: ['I-OPEN'], knowledge: { release: 'test' } })
    writeJson(join(root, '.apos/intents/I-OPEN.json'), { id: 'I-OPEN', revision: 1, status: 'candidate', problem: 'memory', outcome: 'resume' })
    writeJson(join(root, '.apos/decisions/D-OPEN.json'), { id: 'D-OPEN', intent_id: 'I-OPEN', outcome: 'approved', created_at: '2026-09-09' })
    writeJson(join(root, '.apos/runs/AR-OPEN.json'), { id: 'AR-OPEN', intent_id: 'I-OPEN', status: 'partial', remaining_uncertainties: ['test'], updated_at: '2026-09-09' })
    writeJson(join(root, '.apos/evidence/E-OPEN.json'), { id: 'E-OPEN', intent_id: 'I-OPEN', passed: false, created_at: '2026-09-09' })
    writeJson(join(root, '.apos/coordination/workstreams.json'), { workstreams: [{ id: 'WS', intent_id: 'I-OPEN', status: 'active', owner: 'team-a', affected_domains: ['identity'], updated_at: '2026-09-09' }] })
    const output = execFileSync(process.execPath, ['scripts/bootstrap-apos-session.mjs'], { cwd: root, encoding: 'utf8' })
    const result = JSON.parse(output)
    assert.equal(result.active_model.id, 'model')
    assert.equal(result.open_intents[0].decision.id, 'D-OPEN')
    assert.equal(result.open_intents[0].last_run.remaining_uncertainties[0], 'test')
    assert.equal(result.coordination.active_workstreams, 1)
    assert.ok(result.measurement.estimated_tokens > 0)
    assert.equal(result.diagnostics.length, 0)
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})
