import assert from 'node:assert/strict'
import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { execFileSync } from 'node:child_process'
import test from 'node:test'

const repositoryRoot = resolve(import.meta.dirname, '../..')
const writeJson = (path, value) => writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`)

function createConsumer() {
  const root = mkdtempSync(join(tmpdir(), 'apos-consumer-'))
  cpSync(resolve(repositoryRoot, 'templates/apos/.apos'), join(root, '.apos'), { recursive: true })
  mkdirSync(join(root, 'scripts'), { recursive: true })
  cpSync(resolve(repositoryRoot, 'templates/apos/scripts/compile-apos-context.mjs'), join(root, 'scripts/compile-apos-context.mjs'))
  cpSync(resolve(repositoryRoot, 'templates/apos/scripts/apos-layered-memory.mjs'), join(root, 'scripts/apos-layered-memory.mjs'))
  for (const directory of ['intents', 'decisions', 'context/manifests']) mkdirSync(join(root, '.apos', directory), { recursive: true })
  writeJson(join(root, '.apos/context/context-profile.json'), {
    id: 'CTX-EXAMPLE-001', protocol: 'APOS v0.2', max_estimated_input_tokens: 5000,
    domains: [{ id: 'operating_model', match_terms: ['apos'], sources: ['.apos/kernel/kernel.json'], dependencies: [] }]
  })
  writeJson(join(root, '.apos/epistemic/registry.json'), {
    id: 'EPI-EXAMPLE-001', protocol: 'APOS v0.2',
    domains: [{ domain: 'operating_model' }]
  })
  writeJson(join(root, '.apos/intents/I-EXAMPLE-001.json'), {
    id: 'I-EXAMPLE-001', change_envelope: { affected_domains: ['operating_model'] }
  })
  writeJson(join(root, '.apos/decisions/D-EXAMPLE-001.json'), {
    id: 'D-EXAMPLE-001', intent_id: 'I-EXAMPLE-001'
  })
  return root
}

test('starter compiles a first explicit Intent and Decision', () => {
  const root = createConsumer()
  try {
    execFileSync(process.execPath, [
      'scripts/compile-apos-context.mjs',
      '--intent', '.apos/intents/I-EXAMPLE-001.json',
      '--decision', '.apos/decisions/D-EXAMPLE-001.json',
      '--output', '.apos/context/manifests/CM-I-EXAMPLE-001.json'
    ], { cwd: root })
    const manifest = JSON.parse(readFileSync(join(root, '.apos/context/manifests/CM-I-EXAMPLE-001.json')))
    assert.equal(manifest.intent_id, 'I-EXAMPLE-001')
    assert.equal(manifest.status, 'within_budget')
    assert.deepEqual(manifest.domains, ['operating_model'])
    assert.ok(manifest.sources.some(({ path }) => path === '.apos/decisions/D-EXAMPLE-001.json'))
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test('starter rejects a Decision bound to another Intent', () => {
  const root = createConsumer()
  try {
    writeJson(join(root, '.apos/decisions/D-EXAMPLE-001.json'), { id: 'D-EXAMPLE-001', intent_id: 'I-OTHER-001' })
    assert.throws(() => execFileSync(process.execPath, [
      'scripts/compile-apos-context.mjs',
      '--intent', '.apos/intents/I-EXAMPLE-001.json',
      '--decision', '.apos/decisions/D-EXAMPLE-001.json'
    ], { cwd: root, stdio: 'pipe' }), /Command failed/u)
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test('legacy baseline excludes historical documents unless the Intent explicitly requests them', () => {
  const root = createConsumer()
  try {
    mkdirSync(join(root, 'docs/history'), { recursive: true })
    writeFileSync(join(root, 'docs/CURRENT.md'), 'current truth\n')
    writeFileSync(join(root, 'docs/history/OLD.md'), 'superseded history\n')
    writeJson(join(root, '.apos/context/context-profile.json'), {
      id: 'CTX-EXAMPLE-001', protocol: 'APOS v0.2', max_estimated_input_tokens: 5000,
      document_lifecycle: { historical_path_markers: ['/history/'] },
      domains: [{ id: 'operating_model', match_terms: ['apos'], sources: ['docs'], dependencies: [] }]
    })
    const compile = () => execFileSync(process.execPath, [
      'scripts/compile-apos-context.mjs',
      '--intent', '.apos/intents/I-EXAMPLE-001.json',
      '--decision', '.apos/decisions/D-EXAMPLE-001.json',
      '--output', '.apos/context/manifests/CM-I-EXAMPLE-001.json'
    ], { cwd: root })

    compile()
    let manifest = JSON.parse(readFileSync(join(root, '.apos/context/manifests/CM-I-EXAMPLE-001.json')))
    assert.ok(manifest.sources.some(({ path }) => path === 'docs/CURRENT.md'))
    assert.ok(!manifest.sources.some(({ path }) => path === 'docs/history/OLD.md'))
    assert.equal(manifest.retrieval.historical_context, 'excluded_from_baseline')

    writeJson(join(root, '.apos/intents/I-EXAMPLE-001.json'), {
      id: 'I-EXAMPLE-001',
      context_request: { include_historical: true, reason: 'incident analysis' },
      change_envelope: { affected_domains: ['operating_model'] }
    })
    compile()
    manifest = JSON.parse(readFileSync(join(root, '.apos/context/manifests/CM-I-EXAMPLE-001.json')))
    assert.ok(manifest.sources.some(({ path }) => path === 'docs/history/OLD.md'))
    assert.equal(manifest.retrieval.historical_context, 'included_by_explicit_intent')
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test('layered compiler retrieves Warm and Cold with provenance and never clips for budget', () => {
  const root = createConsumer()
  try {
    mkdirSync(join(root, 'docs/history'), { recursive: true })
    writeFileSync(join(root, 'docs/history/incident.md'), 'Historical token failure\n'.repeat(100))
    const profile = JSON.parse(readFileSync(join(root, '.apos/context/context-profile.json')))
    profile.layered_memory = { catalog: '.apos/context/memory-catalog.json' }
    writeJson(join(root, '.apos/context/context-profile.json'), profile)
    const catalog = { version: 1, entries: [{ id: 'incident', tier: 'warm', path: 'docs/history/incident.md', title: 'token failure', summary: 'token', domains: ['operating_model'], authority: 'historical', sensitivity: 'internal' }] }
    writeJson(join(root, '.apos/context/memory-catalog.json'), catalog)
    const args = ['scripts/compile-apos-context.mjs', '--intent', '.apos/intents/I-EXAMPLE-001.json', '--decision', '.apos/decisions/D-EXAMPLE-001.json', '--query', 'token', '--output', 'manifest.json']
    execFileSync(process.execPath, args, { cwd: root })
    let manifest = JSON.parse(readFileSync(join(root, 'manifest.json')))
    assert.ok(manifest.sources.some((x) => x.path === 'docs/history/incident.md'))
    assert.equal(manifest.retrieval.layered.selected[0].authority, 'historical')
    assert.throws(() => execFileSync(process.execPath, [...args, '--max-estimated-tokens', '1'], { cwd: root, stdio: 'pipe' }))
    manifest = JSON.parse(readFileSync(join(root, 'manifest.json')))
    assert.equal(manifest.status, 'budget_exceeded')
    assert.ok(manifest.sources.some((x) => x.path === 'docs/history/incident.md'))
    catalog.entries[0].tier = 'cold'
    writeJson(join(root, '.apos/context/memory-catalog.json'), catalog)
    writeJson(join(root, '.apos/intents/I-EXAMPLE-001.json'), { id: 'I-EXAMPLE-001', change_envelope: { affected_domains: ['operating_model'] }, context_request: { required_source_ids: ['incident'] } })
    assert.throws(() => execFileSync(process.execPath, args, { cwd: root, stdio: 'pipe' }))
    manifest = JSON.parse(readFileSync(join(root, 'manifest.json')))
    assert.equal(manifest.status, 'retrieval_incomplete')
    writeJson(join(root, '.apos/intents/I-EXAMPLE-001.json'), { id: 'I-EXAMPLE-001', change_envelope: { affected_domains: ['operating_model'] }, context_request: { required_source_ids: ['incident'], trigger: 'incident', reason: 'Diagnose token failure' } })
    execFileSync(process.execPath, args, { cwd: root })
    manifest = JSON.parse(readFileSync(join(root, 'manifest.json')))
    assert.equal(manifest.status, 'within_budget')
    assert.equal(manifest.retrieval.layered.cold_trigger, 'incident')
  } finally { rmSync(root, { recursive: true, force: true }) }
})
