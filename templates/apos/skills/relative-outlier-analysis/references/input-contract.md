# Input contract v1

Object with `schema_version: 1`, `parameters` and `rows`. Parameters require `min_peers` (integer >= 3), `iqr_multiplier` (nonnegative decimal), `median_ratio` (decimal > 1). These are product-selected, not calibrated defaults.

Each row requires strings: `id`, `entity_id`, `cohort`, `period`, `metric`, `unit`, `denominator_kind`, `stage`, `numerator_source`, `denominator_source`; booleans `comparable` and `period_aligned`; decimal numbers or canonical decimal strings `numerator` and `denominator`. Both numeric fields may be null (reported as insufficient data). Numerator >= 0 and denominator > 0; infinity/NaN and boolean numbers are invalid. `period_aligned` attests reviewed temporal compatibility, not just matching labels. `comparable` attests reviewed scope/unit/population compatibility; the helper cannot verify human assertions.

Use opaque aggregate entity IDs. Source values must be artifact/reference IDs, not document text. Only allowlisted fields enter output. Unknown input fields are rejected to reduce accidental disclosure. This structural contract cannot prove that a string contains no personal data; inspect/minimize input first.

Peer key is `(cohort, period, metric, unit, denominator_kind, stage)`. Peers exclude all records of the target entity. More than one eligible peer record for an entity in this key makes that entity ambiguous and excludes it entirely. Cohort membership and metrics are product responsibilities.

Quantiles use linear interpolation at index `(n-1)*p`. `above_reference_review_candidate` requires ratio > Q3 + multiplier*IQR AND ratio > median_ratio*median; neither condition alone suffices. The helper reports MAD but does not use it as an additional calibrated detector. `within_reference` means below these experimental thresholds, not proof of adequate consumption.

Output schema 1: input hash, method version, parameters, row results, excluded counts, explicit limitations. Stage is not inferred from numeric fields. If no reliable denominator or consumed/delivered quantity is available, retain `insufficient_data` and explain the missing source in the product report.
