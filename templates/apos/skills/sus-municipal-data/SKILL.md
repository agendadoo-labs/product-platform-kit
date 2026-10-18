---
name: sus-municipal-data
description: Investigate and ingest public municipal SUS aggregates from SIA, SIH, SISAB, CNES and BNAFAR with source-specific concepts and competence handling. Excludes identifiable patients, clinical dosage recommendations and assumed universal patient counts.
---
# Atividade municipal SUS

Use $public-data-ingestion. Select the specific subsystem in [SUS contracts](references/subsystems.md); do not treat SUS as a single compatible table or read every subsystem by default.

Request only official public aggregates and the smallest territory/period needed. Public availability of a microdata file is not a reason to load individual health records. No CNS, CPF, names or reconstructed patient identity. When required unique-user/dispensing aggregates are unavailable, mark the denominator unavailable and propose an aggregate official request; do not substitute procedures and call them people.

Distinguish competence, attendance date, publication and extraction. Reprocess a documented late-reporting window (product proposal: six months), retain source revisions and never interpret absent submissions as no service. Compare residence and service location deliberately; municipal purchasers may supply regional services.

Export aggregate TabNet/SISAB reports with all filters saved; for official DBC downloads first validate the data dictionary and a trusted converter on a small sample. Do not invent a REST endpoint when the official interface is a report or file transfer. CNES structures, procedures and workforce have different grains. Avoid double counting SIA/SISAB/SIH overlaps.

For medicine, match ingredient, strength, pharmaceutical form and packaging to an explicit reviewed vocabulary. Establish stock/movement/dispensing coverage before a demand calculation. Purchased units, distributed units and final patient dispensing are different. A legal reporting obligation or dataset catalog does not prove complete municipal data.

Connector maturity is reported per subsystem. Current package contains a source-specific workflow, not a live SUS ingestion engine; no recurring job is installed.
