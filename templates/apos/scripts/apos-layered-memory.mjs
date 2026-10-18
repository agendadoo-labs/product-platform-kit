import { createHash } from 'node:crypto'
import { readFileSync, realpathSync, lstatSync } from 'node:fs'
import { relative, resolve, isAbsolute } from 'node:path'

const digest = (value) => createHash('sha256').update(value).digest('hex')
const terms = (text) => [...new Set(String(text).normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().match(/[\p{L}\p{N}_-]+/gu) ?? [])]
const triggers = new Set(['audit', 'incident', 'regression', 'historical_question', 'insufficient_evidence'])

// Catalogs are trusted repository configuration, never permissions supplied by retrieved text.
export function localSource(root, path) {
  if (typeof path !== 'string' || isAbsolute(path)) throw new Error('Source must be repository-relative')
  let cursor = root
  for (const part of path.split('/')) {
    cursor = resolve(cursor, part)
    if (lstatSync(cursor).isSymbolicLink()) throw new Error('Source escapes trusted traversal through symlink')
  }
  const absolute = realpathSync(resolve(root, path))
  const rel = relative(realpathSync(root), absolute)
  if (rel === '..' || rel.startsWith('../') || isAbsolute(rel)) throw new Error('Source escapes repository')
  if (rel.split('/').some((part) => part === '.git' || part.startsWith('.env'))) throw new Error('Sensitive source path')
  return absolute
}

export function retrieveLayers({ root, catalog, query = '', domains = [], request = {}, asOf = new Date().toISOString().slice(0, 10) }) {
  if (catalog.version !== 1 || !Array.isArray(catalog.entries)) throw new Error('Unsupported memory catalog')
  const at = Date.parse(asOf)
  if (!Number.isFinite(at)) throw new Error('Invalid evaluation date')
  const ids = new Set()
  const words = terms(query)
  const requested = new Set(request.required_source_ids ?? [])
  const cold = triggers.has(request.trigger) && typeof request.reason === 'string' && request.reason.trim().length > 0
  const selected = [], deferred = [], issues = []
  const entries = [...catalog.entries].sort((a, b) => a.id.localeCompare(b.id))
  for (const entry of entries) {
    if (!entry.id || ids.has(entry.id)) throw new Error('Duplicate or missing memory ID')
    ids.add(entry.id)
    if (!['hot', 'warm', 'cold'].includes(entry.tier)) throw new Error('Invalid memory tier')
    if (!['current', 'historical'].includes(entry.authority)) throw new Error('Invalid source authority')
    if (entry.authority === 'current' && entry.status === 'superseded') throw new Error('Superseded source cannot govern current state')
    // Only intentionally published, internal-safe metadata may enter this catalog.
    if (entry.sensitivity !== 'internal') throw new Error('Catalog is not authorized for restricted data')
    const searchTerms = new Set(terms([entry.id, entry.title, entry.summary, ...(entry.keywords ?? [])].join(' ')))
    const matches = words.filter((word) => searchTerms.has(word))
    const inDomain = !domains.length || (entry.domains ?? []).some((domain) => domains.includes(domain))
    const relevant = requested.has(entry.id) || (inDomain && matches.length > 0)
    const include = (entry.tier === 'hot' && inDomain) || (relevant && (entry.tier !== 'cold' || cold))
    const reason = !inDomain && !requested.has(entry.id) ? 'other_domain' : entry.tier === 'cold' && !cold ? 'cold_requires_trigger' : 'no_lexical_match'
    if (!include) {
      deferred.push({ id: entry.id, path: entry.path, tier: entry.tier, reason })
      if (requested.has(entry.id)) issues.push(`Required source deferred: ${entry.id}`)
      continue
    }
    const from = entry.valid_from == null ? null : Date.parse(entry.valid_from)
    const until = entry.valid_until == null ? null : Date.parse(entry.valid_until)
    const invalid = (from !== null && !Number.isFinite(from)) || (until !== null && !Number.isFinite(until)) || (from !== null && until !== null && from > until)
    const outside = (from !== null && at < from) || (until !== null && at > until)
    if (invalid || (entry.authority === 'current' && outside)) {
      issues.push(`Invalid or out-of-date source: ${entry.id}`)
      deferred.push({ id: entry.id, path: entry.path, tier: entry.tier, reason: 'invalid_validity' })
      continue
    }
    const content = readFileSync(localSource(root, entry.path))
    const sha256 = digest(content)
    if (entry.source_sha256 && entry.source_sha256 !== sha256) {
      issues.push(`Stale index: ${entry.id}`)
      deferred.push({ id: entry.id, path: entry.path, tier: entry.tier, reason: 'stale_hash' })
      continue
    }
    selected.push({ id: entry.id, path: entry.path, tier: entry.tier, authority: entry.authority,
      sha256, bytes: content.byteLength, matched_terms: matches,
      reason: entry.tier === 'hot' ? 'hot_baseline' : requested.has(entry.id) ? 'explicit_dependency' : `${entry.tier}_lexical_match`,
      valid_from: entry.valid_from ?? null, valid_until: entry.valid_until ?? null,
      superseded_by: entry.superseded_by ?? null })
  }
  for (const id of requested) if (!ids.has(id)) issues.push(`Missing required source: ${id}`)
  if (words.length && !selected.some((item) => item.matched_terms.length)) issues.push('No lexical evidence for query; revise query or inspect source catalog')
  return { version: 'layered-memory-1', method: 'metadata_lexical_baseline', as_of: asOf, query, cold_trigger: cold ? request.trigger : null,
    trigger_reason: cold ? request.reason : null, selected, deferred, issues,
    assessment: issues.length ? 'needs_review' : 'retrieval_complete_not_semantic_sufficiency',
    fingerprint: digest(JSON.stringify({ catalog, asOf, query, domains: [...domains].sort(), request, selected })) }
}
