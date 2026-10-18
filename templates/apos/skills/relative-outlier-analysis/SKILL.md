---
name: relative-outlier-analysis
description: Analyze normalized aggregate data in Python using exposure ratios and robust peer outliers, with explicit periods, units, provenance and insufficiency gates. Use for quantities or expenditure relative to population, service activity or workforce; not for clinical advice or automatic fraud conclusions.
---
# Relative outlier analysis

Turn aggregate records into reproducible descriptive ratios and review candidates. Keep source adapters, domain assumptions and thresholds in the consuming product; this skill does not authorize data collection, recurring jobs, external publication or MCP execution.

Before calculating, identify the grain, numerator, denominator, period, population served, unit and stage. Treat residents, registered users, visits, procedures, patients, employee links, unique people and FTE as different denominators. Separate ordered, contracted, delivered, dispensed/consumed and paid quantities. An annual population estimate can be an explicit temporal approximation; never silently relabel it as monthly service demand.

Use [input contract](references/input-contract.md) for the deterministic helper. Only feed normalized aggregate JSON: no names, personal identifiers, patient records or free-text documents. Preserve raw evidence in the consuming project. Decimal inputs must already have canonical decimal points; ambiguous locale and packaging conversions require explicit mapping. Missing values stay missing, not zero. Duplicate observation IDs stop the run; multiple observations of a peer entity must be aggregated to the intended grain before scoring.

Run `python3 scripts/analyze.py INPUT.json --output OUTPUT.json` from this skill directory. The helper has no network, subprocesses, model calls or third-party dependencies. It creates a new output file and refuses overwriting an existing one. Its SHA256 binds output to input bytes. It reports ratios, exclusions, reference counts and medians/IQR/MAD; it never deletes outliers or imputes values.

Only compare records in the same cohort, period, measurement, denominator concept, unit and stage. Cohorts must be justified by the product (service responsibilities, distribution model, regional referrals, tourism, size, etc.), not selected after seeing an alarming score. Exclude the target entity from its references; do not treat repeated months/branches of the same entity as independent municipalities. This helper excludes ambiguous peer duplicates entirely and reports them.

Start with ratios and robust descriptive thresholds, then review evidence. Parameters are explicit experimental engineering choices, not legal or clinical limits. Zero IQR is reported as a degenerate reference and cannot trigger a robust outlier. Small samples produce insufficient_reference; four pilot municipalities cannot support an intermunicipal outlier claim with ten independent peers required. A ratio can still be displayed descriptively.

For medicine, a demand model needs product/strength/form, treatment population and duration, stocks, deliveries and losses. Service activity alone is a proxy, not a dosage model. Durable equipment requires installed stock, shared use, replacement and expansion; 20 staplers per employee is a descriptive ratio, not a conclusion.

When richer analysis is justified, consult [method and evaluation](references/method.md). Fit preprocessing only on training data, separate time/entity holdouts, and retain flagged rows. Never choose a fixed contamination rate to force some municipalities to be suspicious. Model output is a review priority, not probability of crime.

Deliver the input hash, configuration, source IDs, period/unit definitions, quality and coverage gaps, excluded counts, numerical results and next review action. Test behavior and deterministic reproduction. Installation in Codex does not create a callable Personal Worker workflow or synchronize a cloud ChatGPT project automatically.
