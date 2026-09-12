import assert from 'node:assert/strict'
import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { execFileSync } from 'node:child_process'
import test from 'node:test'

const repositoryRoot = resolve(import.meta.dirname, '../..')
const writeJson = (path, value) => writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`)

test('starter gera e verifica memória, Intents abertos e DataMap', () => {
  const root = mkdtempSync(join(tmpdir(), 'apos-memory-'))
  try {
    for (const directory of ['scripts', 'docs', '.apos/state', '.apos/data', '.apos/intents', '.apos/decisions', '.apos/runs', '.apos/evidence', '.apos/coordination']) mkdirSync(join(root, directory), { recursive: true })
    cpSync(resolve(repositoryRoot, 'templates/apos/scripts/sync-apos-project-memory.mjs'), join(root, 'scripts/sync-apos-project-memory.mjs'))
    writeJson(join(root, '.apos/active-model.json'), { model_id: 'model' })
    writeJson(join(root, '.apos/state/product-state.json'), { id: 'PS', revision: 3, updated_at: '2026-09-12', satisfied_intents: [], candidate_intents: ['I-1'], data_map: { id: 'DM-1', revision: 1 } })
    writeJson(join(root, '.apos/data/data-map.json'), { id: 'DM-1', revision: 1, entities: [{ id: 'source' }, { id: 'serving' }], relationships: [{ from: 'source', to: 'serving' }] })
    writeJson(join(root, '.apos/intents/I-1.json'), { id: 'I-1', status: 'candidate', problem: 'problem', outcome: 'outcome', ceremony_selection: { level: 'standard' } })
    writeJson(join(root, '.apos/decisions/D-1.json'), { id: 'D-1', intent_id: 'I-1', decision: 'decide', created_at: '2026-09-12' })
    writeJson(join(root, '.apos/runs/AR-1.json'), { id: 'AR-1', intent_id: 'I-1', status: 'partial', remaining_uncertainties: ['unknown'], completed_at: '2026-09-12' })
    writeJson(join(root, '.apos/evidence/E-1.json'), { id: 'E-1', intent_id: 'I-1', passed: false, created_at: '2026-09-12' })
    writeJson(join(root, '.apos/coordination/workstreams.json'), { workstreams: [{ intent_id: 'I-1', status: 'active', next_checkpoint: 'verify' }] })
    execFileSync(process.execPath, ['scripts/sync-apos-project-memory.mjs'], { cwd: root })
    execFileSync(process.execPath, ['scripts/sync-apos-project-memory.mjs', '--check'], { cwd: root })
    assert.match(readFileSync(join(root, 'docs/APOS-PROJECT-MEMORY.md'), 'utf8'), /revisão 3/)
    assert.match(readFileSync(join(root, 'docs/APOS-OPEN-INTENTS.md'), 'utf8'), /I-1/)
    assert.match(readFileSync(join(root, 'docs/APOS-OPEN-INTENTS.md'), 'utf8'), /D-1/)
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})
