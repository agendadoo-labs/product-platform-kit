import { readdir, readFile } from 'node:fs/promises'
import { extname, join, relative } from 'node:path'

const root = new URL('..', import.meta.url).pathname
const ignored = new Set(['.git', 'node_modules', '.supabase'])
const textExtensions = new Set(['.md', '.sql', '.ts', '.js', '.mjs', '.json', '.toml', '.css', '.html', '.example', '.py', ''])
const secretPatterns = [
  /\bsb_secret_[A-Za-z0-9_-]{12,}\b/,
  /\bre_[A-Za-z0-9_-]{20,}\b/,
  /\bgh[pousr]_[A-Za-z0-9_]{20,}\b/,
  /\beyJhbGciOi[A-Za-z0-9_.-]{30,}\b/,
]

const files = []
async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (ignored.has(entry.name)) continue
    const path = join(directory, entry.name)
    if (entry.isDirectory()) await walk(path)
    else files.push(path)
  }
}

await walk(root)
const errors = []
const repositoryFiles = new Set(files.map((path) => relative(root, path)))
const requiredAposFiles = [
  'templates/apos/AGENTS.md',
  'templates/apos/README.md',
  'templates/apos/.apos/active-model.json',
  'templates/apos/.apos/contracts/contracts.json',
  'templates/apos/.apos/data/data-map.json',
  'templates/apos/.apos/state/product-state.json',
  'templates/apos/scripts/sync-apos-project-memory.mjs',
  'templates/apos/docs/DATA-MAP.md',
  'templates/operations/reconstruction-manifest.example.json',
  'templates/operations/database-release-contract.example.json',
  'templates/apos/.apos/versions/consumer-apos-1.0.0/constitution.json',
  'templates/apos/.apos/versions/consumer-apos-1.0.0/capabilities.json',
  'templates/apos/.apos/versions/consumer-apos-1.0.0/policy.json',
  'templates/apos/.apos/versions/consumer-apos-1.0.0/memory.json',
]
for (const name of requiredAposFiles) if (!repositoryFiles.has(name)) errors.push(`${name}: arquivo obrigatório do starter APOS ausente`)
for (const path of files) {
  const name = relative(root, path)
  if (/^\.env(\.|$)/.test(name) && !name.endsWith('.example')) errors.push(`${name}: arquivo de ambiente real não pode ser versionado`)
  if (!textExtensions.has(extname(path))) continue
  const content = await readFile(path, 'utf8')
  for (const pattern of secretPatterns) if (pattern.test(content)) errors.push(`${name}: possível segredo encontrado`)
  if (name.endsWith('.sql') && /security definer/i.test(content) && !/set search_path\s*=\s*''/i.test(content)) {
    errors.push(`${name}: SECURITY DEFINER sem search_path vazio`)
  }
}

const migrations = files.filter((path) => path.includes('/supabase/migrations/') && path.endsWith('.sql')).map((path) => relative(root, path)).sort()
if (!migrations.length) errors.push('nenhuma migração encontrada')
if (new Set(migrations.map((name) => name.match(/(\d{4})_/u)?.[1])).size !== migrations.length) errors.push('prefixos de migração duplicados ou inválidos')

if (errors.length) {
  console.error(errors.join('\n'))
  process.exit(1)
}
console.log(`OK: ${files.length} arquivos e ${migrations.length} migrações verificados.`)
await import('./check-operating-model.mjs')
