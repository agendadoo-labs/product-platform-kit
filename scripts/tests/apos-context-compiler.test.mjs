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
