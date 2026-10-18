---
name: municipal-transparency-data
description: Inspect and ingest public municipal workforce, expenditure and material-allocation data through official portal exports or documented APIs, keeping purchaser, payer and consuming secretariat distinct.
---
# Transparência municipal

Use $public-data-ingestion. Follow the official municipality link to its provider; a vendor name alone does not establish authorization or field semantics. Read [portal adapters](references/portal-adapters.md) only for the relevant municipality. Keep adapters in the product/runtime code and do not copy entire portal implementations into each skill.

Collect workforce counts by competence, employer/agency, secretariat/lotation and employment status. Distinguish people, employment links, occupied positions and FTE; exclude pensioners/inactive workers from an active-consumption denominator unless the scope requires them. Shared/outsourced staff need explicit source coverage. Never count salary components or duplicate payroll runs as extra employees. Prefer official aggregates; if nominal rows must be processed, minimize immediately and retain no CPF/name/salary in the analytical layer or model context. Deduplication across employers is unknown without an authorized reliable key.

Keep purchasing body, requester, budget unit, payer, delivery destination and consuming unit separate. Use purchase requisitions, item schedules, allocation annexes and stock issue records to establish recipient/consumer. An agency or budget function in an expenditure record is not proof of final consumption. Store unknown/unallocated portions. For split deliveries use quantity-backed many-to-many allocations and check that sums cannot inflate delivered quantity or value.

Payments need links between year/entity/commitment/liquidation/payment, reversals and fiscal documents/items. Aggregate payment divided by tender quantity is not unit price paid. Report attribution level (buyer-only, budget-unit, recipient, consumption-confirmed) and evidence per link.

For each portal validate actual export shape, encoding, decimal convention, month values, completeness and caps. No endpoint guessing, credential use, CAPTCHA evasion or undocumented pagination claims. Read-only browser/export fallback is acceptable when an API is unavailable, with provenance and separate verification. New provider contracts become separate adapters; split into a new skill only when permissions, workflow or maintenance become materially different.

Default proposal: monthly facts, three-month revision window and quarterly annual reconciliation. Organization dictionaries update on restructuring with valid-from/to. Skills and catalogs do not prove that the municipalities have published usable consumption data.
