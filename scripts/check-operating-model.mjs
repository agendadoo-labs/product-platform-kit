import { createHash } from 'node:crypto'
import { readFileSync, existsSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const readJson = (path) => JSON.parse(readFileSync(resolve(root, path), 'utf8'))
const observations = []
const failures = []
const check = (condition, message) => {
  observations.push({ passed: Boolean(condition), message })
  if (!condition) failures.push(message)
}

const active = readJson('.apos/active-model.json')
check(existsSync(resolve(root, active.path)), `active model path exists: ${active.path}`)

const constitution = readJson(`${active.path}/constitution.json`)
const capabilitiesDocument = readJson(`${active.path}/capabilities.json`)
const policy = readJson(`${active.path}/policy.json`)
const memory = readJson(`${active.path}/memory.json`)
const contractsDocument = readJson('.apos/contracts/kit-contracts.json')
const intent = readJson('.apos/intents/I-PPK-APOS-001.json')
const decision = readJson('.apos/decisions/D-PPK-APOS-001.json')
const state = readJson('.apos/state/product-state.json')
const archive = readJson('.apos/archive/operating-model-v1/manifest.json')

check(active.model_id === constitution.id, 'active pointer resolves to the declared constitution')
check(active.apos_protocol === '0.1' && constitution.protocol === 'APOS v0.1', 'APOS protocol version is explicit and consistent')
check(active.decision_id === decision.id && decision.intent_id === intent.id, 'active model is linked to its Decision and Intent')
check(state.active_operating_model === active.model_id, 'ProductState projects the active operating model')
check(memory.persistent.includes('Intent') && memory.persistent.includes('Evidence') && memory.ephemeral.includes('task'), 'memory preserves knowledge and treats tasks as ephemeral')
check(policy.dimensions.includes('impact') && policy.dimensions.includes('uncertainty') && policy.dimensions.includes('reversibility'), 'policy classifies impact, uncertainty and reversibility')

const uniqueIds = (items) => new Set(items.map(({ id }) => id)).size === items.length
check(uniqueIds(capabilitiesDocument.capabilities), 'capability IDs are unique')
check(uniqueIds(contractsDocument.contracts), 'contract IDs are unique')

const capabilityIds = new Set(capabilitiesDocument.capabilities.map(({ id }) => id))
for (const id of intent.capabilities) check(capabilityIds.has(id), `Intent capability resolves: ${id}`)
const contractIds = new Set(contractsDocument.contracts.map(({ id }) => id))
for (const id of intent.required_contract_ids) check(contractIds.has(id), `Intent contract resolves: ${id}`)

const reusableText = [
  readFileSync(resolve(root, 'templates/apos/AGENTS.md'), 'utf8'),
  readFileSync(resolve(root, 'templates/apos/README.md'), 'utf8'),
  JSON.stringify(readJson('templates/apos/.apos/contracts/contracts.json')),
].join('\n')
check(!/Valora|ITBI|São Paulo|Rio de Janeiro|leo-brain/u.test(reusableText), 'reusable starter contains no consumer-specific product or personal context')
check(!/\.agents\/team\.yaml|papéis fixos|specialists/u.test(readFileSync(resolve(root, 'templates/apos/AGENTS.md'), 'utf8')), 'active starter does not require a fixed agent organization')

const archivedCommit = execFileSync('git', ['rev-list', '-n', '1', `${archive.git_tag}^{}`], { cwd: root, encoding: 'utf8' }).trim()
check(archivedCommit === archive.git_commit, 'legacy tag resolves to the archived commit')
for (const [path, expectedDigest] of Object.entries(archive.files)) {
  const content = execFileSync('git', ['show', `${archive.git_tag}:${path}`], { cwd: root })
  const digest = createHash('sha256').update(content).digest('hex')
  check(digest === expectedDigest, `legacy snapshot digest matches: ${path}`)
}

console.log(JSON.stringify({ verifier: 'scripts/check-operating-model.mjs', model_id: active.model_id, intent_id: intent.id, passed: failures.length === 0, observations, failures }, null, 2))
if (failures.length) process.exitCode = 1
