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
const decision = readJson(`.apos/decisions/${active.decision_id}.json`)
const intent = readJson(`.apos/intents/${decision.intent_id}.json`)
const state = readJson('.apos/state/product-state.json')
const archive = readJson('.apos/archive/operating-model-v1/manifest.json')
const quality = readJson('.apos/quality/quality-profile.json')
const environmentSchema = readJson('.apos/environments/environment-profiles.json')
const exposureSchema = readJson('.apos/exposure/exposure-budget.schema.json')
const architecture = readJson('.apos/architecture/architecture-profile.json')
const contextProfile = readJson('.apos/context/context-profile.json')
const aiExecution = readJson('.apos/ai/ai-execution-profile.json')
const kernelPath = '.apos/kernel/kernel.json'
const kernel = readJson(kernelPath)
const registry = readJson('.apos/epistemic/registry.json')
const ceremony = readJson('.apos/ceremony/adaptive-ceremony.json')
const learning = readJson('.apos/learning/learning-cost-loop.json')
const run = readJson(`.apos/runs/${decision.run_id}.json`)
const contextManifest = readJson(`.apos/context/manifests/CM-${intent.id}.json`)
const starterActive = readJson('templates/apos/.apos/active-model.json')
const starterQuality = readJson('templates/apos/.apos/quality/quality-profile.json')
const starterEnvironments = readJson('templates/apos/.apos/environments/environment-profiles.json')
const starterExposure = readJson('templates/apos/.apos/exposure/exposure-budget.json')
const starterEnvelope = readJson('templates/apos/.apos/change-envelopes/change-envelope.example.json')
const starterArchitecture = readJson('templates/apos/.apos/architecture/architecture-profile.json')
const starterContext = readJson('templates/apos/.apos/context/context-profile.json')
const starterAIExecution = readJson('templates/apos/.apos/ai/ai-execution-profile.json')
const starterKernel = readJson('templates/apos/.apos/kernel/kernel.json')
const starterRegistry = readJson('templates/apos/.apos/epistemic/registry.json')
const starterCeremony = readJson('templates/apos/.apos/ceremony/adaptive-ceremony.json')
const starterLearning = readJson('templates/apos/.apos/learning/learning-cost-loop.json')

check(active.model_id === constitution.id, 'active pointer resolves to the declared constitution')
check(active.apos_protocol === '0.2' && constitution.protocol === 'APOS v0.2', 'APOS protocol version is explicit and consistent')
check(active.decision_id === decision.id && decision.intent_id === intent.id, 'active model is linked to its Decision and Intent')
check(state.active_operating_model === active.model_id, 'ProductState projects the active operating model')
check(memory.persistent.includes('Intent') && memory.persistent.includes('Evidence') && memory.ephemeral.includes('task'), 'memory preserves knowledge and treats tasks as ephemeral')
check(policy.dimensions.includes('impact') && policy.dimensions.includes('uncertainty') && policy.dimensions.includes('reversibility'), 'policy classifies impact, uncertainty and reversibility')
check(policy.dimensions.includes('agent_compute') && policy.dimensions.includes('quality_criticality') && policy.dimensions.includes('evidence_freshness'), 'policy classifies agent compute, quality criticality and evidence freshness')
check(policy.dimensions.includes('exposure_budget'), 'policy classifies progressive operational exposure')
check(policy.dimensions.includes('change_scope') && typeof policy.scope_gate === 'string', 'policy requires an explicit change scope envelope')
check(['architecture_maturity', 'complexity_budget', 'context_scope', 'provider_risk'].every((dimension) => policy.dimensions.includes(dimension)), 'policy classifies architecture, context and model-provider risk')
check(constitution.principles.some((principle) => principle.includes('explicit delta')), 'constitution preserves unmentioned behavior, contracts, data and configuration')

const uniqueIds = (items) => new Set(items.map(({ id }) => id)).size === items.length
check(uniqueIds(capabilitiesDocument.capabilities), 'capability IDs are unique')
check(uniqueIds(contractsDocument.contracts), 'contract IDs are unique')

const capabilityIds = new Set(capabilitiesDocument.capabilities.map(({ id }) => id))
for (const id of intent.capabilities) check(capabilityIds.has(id), `Intent capability resolves: ${id}`)
const contractIds = new Set(contractsDocument.contracts.map(({ id }) => id))
check(contractIds.has('C-PPK-PRES-001'), 'scope preservation contract is active')
check(['C-PPK-KERNEL-001', 'C-PPK-CONTEXT-001', 'C-PPK-EPI-001', 'C-PPK-CEREMONY-001', 'C-PPK-LEARN-001', 'C-PPK-ARCH-001', 'C-PPK-AI-ROUTE-001'].every((id) => contractIds.has(id)), 'all APOS v0.2 component contracts are active')
const changeEnvelopeFields = ['delta', 'affected_surfaces', 'invariants', 'out_of_scope', 'compatibility', 'regression_surface', 'rollback']
check(changeEnvelopeFields.every((field) => Object.hasOwn(intent.change_envelope ?? {}, field)), 'active Intent declares a complete Change Envelope')
check(Array.isArray(intent.change_envelope?.affected_domains) && intent.change_envelope.affected_domains.length > 0, 'active Intent declares affected epistemic domains')
const reuseAssessment = intent.change_envelope?.component_reuse_assessment
check(reuseAssessment && ['reuse', 'extend', 'create', 'local', 'not_applicable'].includes(reuseAssessment.decision) && Array.isArray(reuseAssessment.components_reviewed) && typeof reuseAssessment.rationale === 'string' && Array.isArray(reuseAssessment.reuse_surfaces), 'active Intent records a Design System reuse assessment')
check(typeof policy.design_system_gate === 'string' && capabilitiesDocument.capabilities.some(({ id }) => id === 'assess-component-reuse'), 'active model gates interface implementation on component reuse assessment')
for (const id of intent.required_contract_ids) check(contractIds.has(id), `Intent contract resolves: ${id}`)

const reusableText = [
  readFileSync(resolve(root, 'templates/apos/AGENTS.md'), 'utf8'),
  readFileSync(resolve(root, 'templates/apos/README.md'), 'utf8'),
  JSON.stringify(readJson('templates/apos/.apos/contracts/contracts.json')),
  JSON.stringify(starterQuality),
  JSON.stringify(starterEnvironments),
  JSON.stringify(starterExposure),
].join('\n')
check(!/Valora|ITBI|São Paulo|Rio de Janeiro|leo-brain/u.test(reusableText), 'reusable starter contains no consumer-specific product or personal context')
check(!/\.agents\/team\.yaml|papéis fixos|specialists/u.test(readFileSync(resolve(root, 'templates/apos/AGENTS.md'), 'utf8')), 'active starter does not require a fixed agent organization')

const requiredScenarioFields = ['stimulus', 'context', 'response', 'metric', 'threshold', 'verifier', 'evidence_ttl_days']
check(requiredScenarioFields.every((field) => quality.scenario_schema.includes(field)), 'kit quality scenario schema is measurable and time-bounded')
check(quality.mandatory_scenarios.every((scenario) => requiredScenarioFields.every((field) => Object.hasOwn(scenario, field))), 'kit mandatory scenarios implement the complete schema')
check(quality.mandatory_scenarios.every(({ contract_id }) => contractIds.has(contract_id)), 'kit quality scenarios resolve to active contracts')
check(['local', 'test', 'preview', 'production'].every((id) => environmentSchema.required_environment_ids.includes(id)), 'kit requires the four baseline environments')
check(starterActive.apos_protocol === '0.2' && starterActive.path.endsWith('consumer-apos-1.3.0'), 'starter active pointer selects the APOS v0.2 version')
check(['delta', 'affected_surfaces', 'invariants', 'out_of_scope', 'compatibility', 'regression_surface', 'rollback', 'component_reuse_assessment'].every((field) => Object.hasOwn(starterEnvelope, field)), 'starter exposes a complete Change Envelope and component reuse assessment')
check(requiredScenarioFields.every((field) => starterQuality.scenario_schema.includes(field)), 'starter exposes the complete quality scenario schema')
check(['local', 'test', 'preview', 'production'].every((id) => starterEnvironments.environments.some((environment) => environment.id === id)), 'starter defines local, test, preview and production profiles')
check(starterEnvironments.environments.every((environment) => environment.credential_boundary && environment.cost_controls && environment.promotion_gate), 'starter environments separate credentials, cost controls and promotion gates')
check(['people', 'operations', 'economic_value', 'data'].every((dimension) => exposureSchema.required_dimensions.includes(dimension)), 'kit exposure schema covers people, operations, economic value and data')
check(exposureSchema.aggregation_rule.includes('maximum') && exposureSchema.minimum_floors.length >= 4, 'kit exposure schema uses the worst dimension and preserves safety floors')
check(['people', 'operations', 'economic_value', 'data'].every((dimension) => starterExposure.limits.some((item) => item.dimension === dimension)), 'starter exposure budget includes every required dimension')
check(starterExposure.non_relaxable_floors.includes('security') && starterExposure.non_relaxable_floors.includes('financial_integrity'), 'starter exposure budget keeps security and financial integrity independent of volume')
check(architecture.protocol === 'APOS v0.2' && architecture.default_style === 'modular_monolith_and_managed_services', 'kit architecture profile defaults to economical evolutionary architecture')
check(['observed_problem', 'fitness_function', 'rollback', 'removal_condition'].every((field) => architecture.admission_requirements.includes(field)), 'kit complexity admission requires evidence, fitness, rollback and removal')
check(contextProfile.protocol === 'APOS v0.2' && contextProfile.compile_steps.includes('record_context_manifest'), 'kit context profile compiles and records selective context')
check(contextProfile.source_priority[0] === 'active_machine_readable_state' && contextProfile.retrieval_rule.includes('provenance'), 'kit context retrieval preserves authority and provenance')
check(aiExecution.protocol === 'APOS v0.2' && aiExecution.current_mode === 'human_assisted_codex_orchestration', 'kit AI profile starts with human-assisted Codex orchestration')
check(['eval_baseline', 'hard_limits', 'request_traceability'].every((field) => aiExecution.provider_admission.includes(field)), 'kit AI provider admission requires evals, limits and traceability')
check(aiExecution.run_usage_fields.includes('input_tokens') && aiExecution.run_usage_fields.includes('estimated_cost') && aiExecution.cost_rule.includes('reconciled'), 'kit AI accounting records usage and reconciles billing')
check(starterArchitecture.protocol === 'APOS v0.2' && starterArchitecture.domain_profiles.length > 0, 'starter exposes adaptable architecture maturity by domain')
check(starterContext.compile_steps.includes('record_context_manifest'), 'starter exposes selective context compilation')
check(starterAIExecution.current_mode === 'human_assisted' && starterAIExecution.approved_routes.length === 0, 'starter begins provider-neutral and human-assisted')

const kernelBytes = readFileSync(resolve(root, kernelPath)).byteLength
check(kernel.protocol === 'APOS v0.2' && kernel.target_max_tokens <= 1500 && kernelBytes <= 6000, 'Kernel is versioned and remains within its conservative 1,500-token byte ceiling')
check(['security', 'privacy', 'authorization', 'financial_integrity'].every((floor) => kernel.safety_floors.includes(floor)), 'Kernel preserves all non-relaxable safety floors')
check(['authority', 'scope', 'completion', 'evidence', 'economics', 'unknown_rule'].every((field) => typeof kernel[field] === 'string' && kernel[field].length > 0), 'Kernel defines authority, scope, completion, evidence, economics and unknown handling')
check(kernel.budget_rule.includes('never permission') && contextProfile.information_preservation_rule.includes('never silently'), 'token budgets cannot silently remove governing information')
check(contextProfile.budget_calibration.review_after_material_runs > 0 && ['contract_coverage', 'retrieval_misses', 'validated_outcome', 'provider_input_tokens'].every((metric) => contextProfile.budget_calibration.metrics.includes(metric)), 'context ceiling is explicitly evidence-calibrated')

const contextDomainIds = contextProfile.domains.map(({ id }) => id).sort()
const registryDomainIds = registry.domains.map(({ domain }) => domain).sort()
check(JSON.stringify(contextDomainIds) === JSON.stringify(registryDomainIds), 'Context Profile and Epistemic Registry use the same canonical domains')
check(registry.domains.every((entry) => registry.entry_schema.every((field) => Object.hasOwn(entry, field))), 'every Epistemic Registry entry implements the declared schema')
check(registry.domains.every((entry) => entry.authoritative_sources.length && entry.methods.length && entry.owner && entry.refresh_triggers.length), 'every epistemic domain has sources, methods, ownership and refresh triggers')

const riskRequiresStrict = intent.classification?.impact === 'high' || ['production', 'security', 'personal_data', 'payment', 'irreversible'].some((trigger) => intent.ceremony_selection?.triggers?.includes(trigger))
check(ceremony.levels.map(({ id }) => id).join(',') === 'lite,standard,strict', 'Adaptive Ceremony defines Lite, Standard and Strict levels')
check(!riskRequiresStrict || intent.ceremony_selection?.level === 'strict', 'Intent selects Strict ceremony for the worst applicable risk')
check(run.intent_id === intent.id && run.ceremony?.selected === intent.ceremony_selection?.level && run.ceremony?.required === 'strict' && intent.ceremony_selection?.downgrade_allowed === false, 'AgentRun is bound to the required ceremony without downgrade')

check(contextManifest.intent_id === intent.id && contextManifest.id === run.context_manifest_id, 'AgentRun resolves to the Intent ContextManifest')
check(contextManifest.status === 'within_budget' && contextManifest.measurement.estimated_input_tokens <= contextManifest.budget.max_estimated_input_tokens, 'compiled context remains within its declared budget')
check(contextManifest.domains.every((id) => contextDomainIds.includes(id)), 'ContextManifest contains only registered context domains')
check(contextManifest.sources.every(({ path, sha256, bytes }) => existsSync(resolve(root, path)) && /^[a-f0-9]{64}$/.test(sha256) && Number.isInteger(bytes) && bytes >= 0), 'ContextManifest records existing sources with hashes and sizes')

check(run.learning_cost.steps.every((step) => learning.per_step_fields.every((field) => Object.hasOwn(step, field))), 'every learning/cost step implements the APOS v0.2 schema')
check(learning.per_run_fields.every((field) => field === 'intent_id' ? run.intent_id === intent.id : Object.hasOwn(run.learning_cost.run, field)), 'run-level learning and cost fields are complete and bound to the Intent')
const compileStep = run.learning_cost.steps.find(({ step }) => step === 'context_compile')
check(compileStep?.context_tokens === contextManifest.measurement.estimated_input_tokens, 'context compilation estimate is projected into AgentRun accounting')
check(run.consumption.input_tokens !== 0 && run.consumption.output_tokens !== 0, 'unavailable desktop token usage is never represented as zero')
const intentEvidence = state.evidence_ids.map((id) => `.apos/evidence/${id}.json`).filter((path) => existsSync(resolve(root, path))).map(readJson).filter((item) => item.intent_id === intent.id && item.passed)
const evidencedContracts = new Set(intentEvidence.flatMap(({ contract_ids }) => contract_ids))
check(intent.status !== 'satisfied' || intent.required_contract_ids.every((id) => evidencedContracts.has(id)), 'a satisfied Intent has passing Evidence for every required contract')
const finalEvidence = intentEvidence.find(({ id }) => id === 'E-PPK-APOS-011')
const memorialDigest = createHash('sha256').update(readFileSync(resolve(root, 'docs/apos/APOS-v0.2-MEMORIAL.md'))).digest('hex')
check(finalEvidence?.artifact_digest === memorialDigest && run.artifact_digest === memorialDigest, 'final Evidence and AgentRun resolve to the current memorial artifact')

check(starterKernel.protocol === 'APOS v0.2' && starterKernel.target_max_tokens <= 1500, 'starter includes a bounded APOS Kernel')
check(starterRegistry.domains.length > 0 && starterRegistry.entry_schema.length > 0, 'starter includes an adaptable Epistemic Registry')
check(starterCeremony.levels.map(({ id }) => id).join(',') === 'lite,standard,strict', 'starter includes all Adaptive Ceremony levels')
check(starterLearning.per_step_fields.includes('context_tokens') && starterLearning.per_run_fields.includes('validated_outcome'), 'starter includes the Learning and Cost Loop')
check(starterKernel.budget_rule.includes('never permission') && starterContext.information_preservation_rule.includes('never silently'), 'starter prevents budget-driven information loss')
check(existsSync(resolve(root, 'templates/apos/scripts/compile-apos-context.mjs')), 'starter includes a reusable Context Compiler')

const archivedCommit = execFileSync('git', ['rev-list', '-n', '1', `${archive.git_tag}^{}`], { cwd: root, encoding: 'utf8' }).trim()
check(archivedCommit === archive.git_commit, 'legacy tag resolves to the archived commit')
for (const [path, expectedDigest] of Object.entries(archive.files)) {
  const content = execFileSync('git', ['show', `${archive.git_tag}:${path}`], { cwd: root })
  const digest = createHash('sha256').update(content).digest('hex')
  check(digest === expectedDigest, `legacy snapshot digest matches: ${path}`)
}

console.log(JSON.stringify({ verifier: 'scripts/check-operating-model.mjs', model_id: active.model_id, intent_id: intent.id, passed: failures.length === 0, observations, failures }, null, 2))
if (failures.length) process.exitCode = 1
