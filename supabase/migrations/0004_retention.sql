create or replace function platform_private.purge_expired_product_data(
  p_telemetry_months integer default 13
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_cutoff timestamptz;
  v_product_events integer := 0;
  v_experiment_events integer := 0;
  v_assignments integer := 0;
  v_sessions integer := 0;
begin
  if p_telemetry_months not between 1 and 120 then
    raise exception 'Retention must be between 1 and 120 months';
  end if;
  v_cutoff := now() - make_interval(months => p_telemetry_months);

  delete from public.product_events where created_at < v_cutoff;
  get diagnostics v_product_events = row_count;

  delete from public.experiment_events where created_at < v_cutoff;
  get diagnostics v_experiment_events = row_count;

  delete from public.experiment_assignments ea
  using public.experiments e
  where ea.experiment_id = e.id
    and e.status = 'completed'
    and ea.assigned_at < v_cutoff;
  get diagnostics v_assignments = row_count;

  delete from public.activity_sessions where started_at < v_cutoff;
  get diagnostics v_sessions = row_count;

  return jsonb_build_object(
    'cutoff', v_cutoff,
    'product_events_deleted', v_product_events,
    'experiment_events_deleted', v_experiment_events,
    'assignments_deleted', v_assignments,
    'sessions_deleted', v_sessions
  );
end;
$$;

revoke all on function platform_private.purge_expired_product_data(integer)
  from public, anon, authenticated;
grant execute on function platform_private.purge_expired_product_data(integer) to service_role;

comment on function platform_private.purge_expired_product_data(integer) is
  'Expurga telemetria e experimentos segundo a retencao configurada. Dados de negocio ficam fora do escopo.';
