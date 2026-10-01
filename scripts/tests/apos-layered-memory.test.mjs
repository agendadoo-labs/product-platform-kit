import assert from 'node:assert/strict'
import { mkdtempSync, writeFileSync, rmSync, symlinkSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import test from 'node:test'
import { retrieveLayers, localSource } from '../apos-layered-memory.mjs'

function fixture(run) {
  const root = mkdtempSync(join(tmpdir(), 'apos-layers-'))
  const entries = ['hot', 'warm', 'cold'].map((tier) => {
    writeFileSync(join(root, tier + '.md'), `Entire ${tier} source: TOKEN-case-sensitive\n`)
    return { id: tier, tier, path: tier + '.md', title: 'Confirmação de privacidade', summary: 'token confirmação', domains: ['privacy'], sensitivity: 'internal', authority: tier === 'hot' ? 'current' : 'historical' }
  })
  const input = { root, catalog: { version: 1, entries }, query: 'confirmação', domains: ['privacy'] }
  try { run(input) } finally { rmSync(root, { recursive: true, force: true }) }
}

test('Hot always and matching Warm without loading Cold', () => fixture((input) => {
  const result = retrieveLayers(input)
  assert.deepEqual(result.selected.map((x) => x.id).sort(), ['hot', 'warm'])
  assert.equal(result.deferred[0].reason, 'cold_requires_trigger')
  assert.equal(result.selected.find((x) => x.id === 'warm').authority, 'historical')
}))
test('Cold opens with recorded trigger and rationale', () => fixture((input) => {
  const result = retrieveLayers({ ...input, request: { trigger: 'incident', reason: 'Diagnose confirmation failure' } })
  assert.equal(result.selected.length, 3)
  assert.equal(result.cold_trigger, 'incident')
}))
test('Cold cannot open without rationale or with arbitrary trigger', () => fixture((input) => {
  for (const request of [{ trigger: 'incident' }, { trigger: 'anything', reason: 'x' }]) {
    assert.ok(!retrieveLayers({ ...input, request }).selected.some((x) => x.id === 'cold'))
  }
}))
test('required missing or deferred references demand review', () => fixture((input) => {
  const result = retrieveLayers({ ...input, request: { required_source_ids: ['missing', 'cold'] } })
  assert.equal(result.issues.length, 2)
  assert.equal(result.assessment, 'needs_review')
}))
test('changed source hash requires reindexing', () => fixture((input) => {
  input.catalog.entries[0].source_sha256 = 'outdated'
  assert.ok(retrieveLayers(input).issues.some((x) => x.includes('Stale index')))
}))
test('unknown vocabulary demands review instead of claiming absence', () => fixture((input) => {
  assert.equal(retrieveLayers({ ...input, query: 'unfindable' }).assessment, 'needs_review')
}))
test('same inputs produce same fingerprint and changed bytes invalidate it', () => fixture((input) => {
  const first = retrieveLayers(input)
  assert.deepEqual(first, retrieveLayers(input))
  writeFileSync(join(input.root, 'warm.md'), 'changed')
  assert.notEqual(first.fingerprint, retrieveLayers(input).fingerprint)
}))
test('restricted metadata fails closed before selection', () => fixture((input) => {
  input.catalog.entries[0].sensitivity = 'restricted'
  assert.throws(() => retrieveLayers(input), /not authorized/)
}))
test('duplicate identity and superseded current authority are rejected', () => fixture((input) => {
  input.catalog.entries[1].id = 'hot'
  assert.throws(() => retrieveLayers(input), /Duplicate/)
  input.catalog.entries[1].id = 'warm'
  input.catalog.entries[0].status = 'superseded'
  assert.throws(() => retrieveLayers(input), /cannot govern/)
}))
test('traversal, secret paths and symlink escape are rejected', () => fixture((input) => {
  assert.throws(() => localSource(input.root, '../'), /escapes/)
  writeFileSync(join(input.root, '.env'), 'secret')
  assert.throws(() => localSource(input.root, '.env'), /Sensitive/)
  symlinkSync(tmpdir(), join(input.root, 'outside'))
  assert.throws(() => localSource(input.root, 'outside'), /escapes/)
}))
test('explicit IDs find evidence regardless of vocabulary or domain', () => fixture((input) => {
  const result = retrieveLayers({ ...input, query: '', domains: ['maps'], request: { required_source_ids: ['warm'] } })
  assert.deepEqual(result.selected.map((x) => x.id), ['warm'])
}))
