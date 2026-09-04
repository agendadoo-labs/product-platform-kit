import type { SupabaseClient } from '@supabase/supabase-js'

const variantCache = new Map<string, string>()

export async function getExperimentVariant(
  supabase: SupabaseClient,
  userId: string,
  experimentKey: string,
  analyticsOptOut: boolean,
) {
  if (analyticsOptOut) return 'control'
  const cacheKey = `${userId}:${experimentKey}`
  const cached = variantCache.get(cacheKey)
  if (cached) return cached

  const { data, error } = await supabase.rpc('get_experiment_variant', { p_experiment_key: experimentKey })
  const variant = error || typeof data !== 'string' ? 'control' : data
  variantCache.set(cacheKey, variant)
  return variant
}

export async function recordExperimentEvent(
  supabase: SupabaseClient,
  experimentKey: string,
  eventName: string,
  analyticsOptOut: boolean,
) {
  if (analyticsOptOut) return
  await supabase.rpc('record_experiment_event', {
    p_experiment_key: experimentKey,
    p_event_name: eventName,
  })
}
