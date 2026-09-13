import { access, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = process.cwd();
const catalogPath = resolve(root, 'capabilities/catalog.json');
const catalog = JSON.parse(await readFile(catalogPath, 'utf8'));
const allowedLevels = new Set(Object.keys(catalog.coverage_levels ?? {}));
const capabilityIds = new Set();
const failures = [];

if (catalog.domains?.length !== 14) failures.push(`expected 14 macro domains, found ${catalog.domains?.length ?? 0}`);

for (const domain of catalog.domains ?? []) {
  if (!domain.id || !domain.label || !Array.isArray(domain.capabilities)) failures.push(`invalid domain: ${JSON.stringify(domain)}`);
  for (const capability of domain.capabilities ?? []) {
    const id = `${domain.id}.${capability}`;
    if (capabilityIds.has(id)) failures.push(`duplicate capability: ${id}`);
    capabilityIds.add(id);
  }
}

for (const claim of catalog.coverage_claims ?? []) {
  if (!capabilityIds.has(claim.id)) failures.push(`claim references unknown capability: ${claim.id}`);
  if (!allowedLevels.has(claim.level) || claim.level === 'not_covered') failures.push(`invalid claimed level for ${claim.id}: ${claim.level}`);
  if (!Array.isArray(claim.evidence) || claim.evidence.length === 0) failures.push(`claim has no evidence: ${claim.id}`);
  for (const evidence of claim.evidence ?? []) {
    try {
      await access(resolve(root, evidence));
    } catch {
      failures.push(`missing evidence for ${claim.id}: ${evidence}`);
    }
  }
}

if (failures.length) {
  console.error(`Capability catalog check failed:\n- ${failures.join('\n- ')}`);
  process.exitCode = 1;
} else {
  const claimed = catalog.coverage_claims.length;
  console.log(`Capability catalog ok: ${catalog.domains.length} domains, ${capabilityIds.size} capabilities, ${claimed} evidence-backed claims, ${capabilityIds.size - claimed} explicit gaps by default.`);
}
