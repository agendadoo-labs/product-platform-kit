-- Referência: adapte schemas e nomes antes de usar.
-- Em uma base já volumosa, execute CREATE INDEX CONCURRENTLY fora de transação.

create index if not exists transactions_map_membership_idx
  on core.transactions_recent (
    content_hash,
    source_file,
    (coalesce(source_sheet, '')),
    source_row_number,
    city_code
  );

create index if not exists market_areas_viewport_idx
  on serving.market_areas (city_code, area_level, longitude, latitude);

create index if not exists market_areas_search_idx
  on serving.market_areas using gin (search_text extensions.gin_trgm_ops);

create index if not exists market_yearly_lookup_idx
  on analytics.market_yearly (
    city_code,
    geographic_level,
    location_key,
    property_typology,
    area_band,
    reference_year
  );

analyze core.transactions_recent;
analyze serving.market_areas;
analyze analytics.market_yearly;
