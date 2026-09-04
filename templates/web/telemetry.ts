import type { SupabaseClient, User } from '@supabase/supabase-js'

export async function recordProductEvent(
  supabase: SupabaseClient,
  user: User,
  analyticsOptOut: boolean,
  featureKey: string,
  eventName: string,
  numericValue?: number,
) {
  if (analyticsOptOut) return
  await supabase.rpc('record_product_event', {
    p_feature_key: featureKey,
    p_event_name: eventName,
    p_numeric_value: numericValue ?? null,
  })
}

export async function startActivitySession(
  supabase: SupabaseClient,
  _user: User,
  analyticsOptOut: boolean,
) {
  if (analyticsOptOut) return null
  const { data, error } = await supabase.rpc('start_activity_session')
  return error || typeof data !== 'string' ? null : data
}

export async function touchActivitySession(
  supabase: SupabaseClient,
  _user: User,
  sessionId: string | null,
  activeSeconds: number,
) {
  if (!sessionId) return
  await supabase.rpc('touch_activity_session', {
    p_session_id: sessionId,
    p_active_seconds: Math.max(0, Math.round(activeSeconds)),
  })
}
