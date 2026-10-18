---
name: ibge-municipal-data
description: Retrieve IBGE municipal identifiers and edition-based population estimates using official aggregate metadata and explicit reference years. Use for resident-population denominators; not monthly service users.
---
# População e municípios IBGE

Use $public-data-ingestion for provenance and release handling. Official API documentation: https://servicodados.ibge.gov.br/api/docs/agregados?versao=3 . Localities: https://servicodados.ibge.gov.br/api/v1/localidades/municipios/3303807 .

Population estimates were verified in aggregate 6579, variable 9324 (Pessoas), level N6. Discover and validate `/api/v3/agregados/6579/metadados` and `/periodos` before selecting an edition; do not assume the current calendar year is available or that a missing year is zero. Retrieve an explicit period and requested code list through `/api/v3/agregados/6579/periodos/YEAR/variaveis/9324?localidades=N6[CODE,...]` using the official host `servicodados.ibge.gov.br`. Check all requested municipalities returned once, year, units and missing markers; retain original response and exact query.

Keep municipality IDs as seven-character strings and retain name/territorial version. DATASUS codes require a documented crosswalk, never an unverified truncation. Paraty's verified code is 3303807; product scope and the other cities live in the product catalog.

Ingest by annual publication and corrections; quarterly metadata checks can detect revised past editions without full monthly re-downloads. Store reference year, edition/revision, modification date when provided and retrieval time. Distinguish census from estimate and never interpolate silently.

Population is an exposure proxy for broad services, not the number of SUS patients or the number served by a regional facility. Any use of an annual estimate with monthly flows needs an explicit temporal policy; do not divide by twelve to pretend it is monthly population.

For municipal workforce, MUNIC can provide an edition-based control/reference if the relevant human-resources module is present. It cannot silently replace current monthly staff counts or secretariat allocation. This skill supplies the procedure; the product must own a tested adapter and snapshots before claiming recurring ingestion.
