export type MapAreaLevel = 'neighborhood' | 'block'

export type MapMarketArea = {
  id: string
  cityCode: string
  level: MapAreaLevel
  label: string
  latitude: number
  longitude: number
  medianTotal: number
  medianPricePerSqm: number
  sampleSize: number
  periodStart: string
  periodEnd: string
  geocodeSource: string
  geocodePrecision: string
}

export type MapViewport = { west: number; south: number; east: number; north: number; zoom: number }

export type MapProviderConfig = {
  styleUrl?: string
  rasterTileUrls?: string[]
  attribution: string
  minimumAreaZoom?: number
  blockZoom?: number
  maximumMarkers?: number
}

export const MAP_TELEMETRY_EVENTS = [
  'search_mode_viewed', 'search_mode_changed', 'map_city_changed',
  'map_zoom_threshold_reached', 'map_pin_selected', 'address_result_opened_on_map',
  'map_comparables_opened', 'map_load_failed',
  'map_coverage_notice_viewed',
] as const

export type MapTelemetryEvent = typeof MAP_TELEMETRY_EVENTS[number]

export function areaLevelForZoom(zoom: number, config: Pick<MapProviderConfig, 'minimumAreaZoom' | 'blockZoom'> = {}) {
  const minimum = config.minimumAreaZoom ?? 11
  const block = config.blockZoom ?? 14
  if (zoom < minimum) return null
  return zoom >= block ? 'block' : 'neighborhood'
}

export function viewportCacheKey(cityCode: string, viewport: MapViewport, precision = 2) {
  const round = (value: number) => value.toFixed(precision)
  return [cityCode, areaLevelForZoom(viewport.zoom), Math.floor(viewport.zoom), round(viewport.west), round(viewport.south), round(viewport.east), round(viewport.north)].join(':')
}

export function validateMapArea(area: MapMarketArea) {
  const errors: string[] = []
  if (!area.id || !area.cityCode || !area.label) errors.push('identity')
  if (!['neighborhood', 'block'].includes(area.level)) errors.push('level')
  if (!Number.isFinite(area.latitude) || Math.abs(area.latitude) > 90) errors.push('latitude')
  if (!Number.isFinite(area.longitude) || Math.abs(area.longitude) > 180) errors.push('longitude')
  if (area.sampleSize < 1 || area.medianTotal <= 0 || area.medianPricePerSqm <= 0) errors.push('market_metrics')
  if (!area.geocodeSource || !area.geocodePrecision) errors.push('lineage')
  return errors
}
