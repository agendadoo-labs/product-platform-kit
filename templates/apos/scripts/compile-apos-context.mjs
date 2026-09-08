import { createHash } from 'node:crypto'
import { existsSync, lstatSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { dirname, relative, resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const args = process.argv.slice(2)
const argument = (name) => { const index = args.indexOf(name); return index >= 0 ? args[index + 1] : null }
const readJson = (path) => JSON.parse(readFileSync(resolve(root, path), 'utf8'))
const active = readJson('.apos/active-model.json')
const decision = readJson(`.apos/decisions/${active.decision_id}.json`)
const intentPath = argument('--intent') ?? `.apos/intents/${decision.intent_id}.json`
const intent = readJson(intentPath)
const profile = readJson('.apos/context/context-profile.json')
const registry = readJson('.apos/epistemic/registry.json')
const byId = new Map(profile.domains.map((domain) => [domain.id, domain]))
const declared = intent.change_envelope?.affected_domains
const selected = new Set(Array.isArray(declared) && declared.length ? declared : ['operating_model'])
const visit = (id) => {
  const domain = byId.get(id)
  if (!domain) throw new Error(`Unknown context domain: ${id}`)
  for (const dependency of domain.dependencies ?? []) if (!selected.has(dependency)) { selected.add(dependency); visit(dependency) }
}
for (const id of [...selected]) visit(id)
const registryIds = new Set(registry.domains.map(({ domain }) => domain))
for (const id of selected) if (!registryIds.has(id)) throw new Error(`Domain missing from Epistemic Registry: ${id}`)

const files = new Set()
const collect = (candidate) => {
  const absolute = resolve(root, candidate)
  if (!existsSync(absolute)) throw new Error(`Authoritative source does not exist: ${candidate}`)
  if (lstatSync(absolute).isDirectory()) {
    for (const name of readdirSync(absolute).sort()) {
      const child = relative(root, resolve(absolute, name))
      if (!child.includes('.apos/context/manifests')) collect(child)
    }
  } else files.add(relative(root, absolute))
}
for (const id of selected) for (const source of byId.get(id).sources ?? []) collect(source)
for (const source of ['.apos/kernel/kernel.json', '.apos/active-model.json', intentPath, `.apos/decisions/${active.decision_id}.json`]) collect(source)
const sources = [...files].sort().map((path) => {
  const content = readFileSync(resolve(root, path))
  return { path, sha256: createHash('sha256').update(content).digest('hex'), bytes: content.byteLength }
})
const totalBytes = sources.reduce((sum, source) => sum + source.bytes, 0)
const estimatedTokens = Math.ceil(totalBytes / 4)
const configuredLimit = Number(argument('--max-estimated-tokens') ?? profile.max_estimated_input_tokens)
if (!Number.isFinite(configuredLimit) || configuredLimit <= 0) throw new Error('Set .apos/context/context-profile.json max_estimated_input_tokens to a positive number before compiling context.')
const manifest = {
  id: `CM-${intent.id}`,
  protocol: 'APOS v0.2',
  intent_id: intent.id,
  domains: [...selected].sort(),
  sources,
  measurement: { method: 'conservative_utf8_bytes_divided_by_4', total_bytes: totalBytes, estimated_input_tokens: estimatedTokens, exact_provider_tokens: 'unavailable_without_model_request' },
  budget: { max_estimated_input_tokens: configuredLimit },
  status: estimatedTokens <= configuredLimit ? 'within_budget' : 'budget_exceeded',
  created_at: new Date().toISOString().slice(0, 10)
}
const serialized = `${JSON.stringify(manifest, null, 2)}\n`
const output = argument('--output')
if (output) { const target = resolve(root, output); mkdirSync(dirname(target), { recursive: true }); writeFileSync(target, serialized) }
else process.stdout.write(serialized)
if (manifest.status !== 'within_budget') process.exitCode = 2
