---
name: pncp-procurement-data
description: Collect and interpret PNCP municipal procurement listings, items and results with documented API contracts, pagination and provenance. Use for PNCP purchases; not proof of payments, deliveries or consumption.
---
# Dados de compras PNCP

Use the common ingestion discipline from $public-data-ingestion. Confirm the official specifications at https://pncp.gov.br/api/consulta/v3/api-docs and https://pncp.gov.br/api/pncp/v3/api-docs before a new adapter/schema change. Preserve the schema version and observed URL.

Reuse the consuming product's registered PNCP adapter; do not fork business filters into this skill. Confirm its documented command, config and destination before running; never assume a module exists because a skill mentions a typical layout. Use its documented offline replay option. The folder must be explicit when changing the scope, so an earlier collection is not relabeled. Read stdout and the collection manifest: process exit zero does not establish complete pages.

Municipality in the PNCP listing is a location filter. For municipal-government analyses also verify the entity's sphere and municipality code. Capture all pages or mark partial. Preserve estimated, homologated, contracted, committed, liquidated, paid, delivered and consumed facts separately. Do not infer payment from homologation or a payment-per-item from aggregate amendment/contract values.

Identity is procurement control number + item + result/version. Handle cancelled or noncurrent results; inspect dates rather than assuming every result lies in the publication interval. Match explicit product and packaging attributes; unknown specifications remain unknown. Preserve cost components and delivery terms.

A publication-window/item-results adapter alone does not implement complete incremental update detection, contracts, fiscal documents, allocations or payments. A future monthly job must recheck changes and previously open procurements, not only query newly published dates. Document 204, request failure, repeated page, cap exhaustion and 429 separately.

Output source snapshots locally, coverage by query and selected-item provenance. Supplier names/individual identifiers do not belong in skill context or exported analysis. The skill itself installs no collector or recurring job.
