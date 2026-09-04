create table if not exists public.experiments (
  id bigint generated always as identity primary key,
  experiment_key text not null unique check (experiment_key ~ '^[a-z][a-z0-9_]{2,63}$'),
  name text not null,
  hypothesis text not null,
  status text not null default 'draft' check (status in ('draft', 'running', 'paused', 'completed')),
  control_variant text not null default 'control',
  treatment_variant text not null default 'treatment',
  treatment_percentage smallint not null default 50 check (treatment_percentage between 0 and 100),
  primary_event text not null check (primary_event ~ '^[a-z][a-z0-9_]{2,63}$'),
  starts_at timestamptz,
  ends_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (control_variant <> treatment_variant),
  check (ends_at is null or starts_at is null or ends_at > starts_at)
);

create table if not exists public.experiment_assignments (
  id bigint generated always as identity primary key,
  experiment_id bigint not null references public.experiments(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  variant text not null,
  assigned_at timestamptz not null default now(),
  unique (experiment_id, user_id)
);

create table if not exists public.experiment_events (
  id bigint generated always as identity primary key,
  assignment_id bigint not null references public.experiment_assignments(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  event_name text not null check (event_name ~ '^[a-z][a-z0-9_]{2,63}$'),
  created_at timestamptz not null default now()
);

create index if not exists experiment_events_assignment_created_idx
  on public.experiment_events (assignment_id, created_at desc);
create index if not exists experiment_events_user_created_idx
  on public.experiment_events (user_id, created_at desc);

alter table public.experiments enable row level security;
alter table public.experiment_assignments enable row level security;
alter table public.experiment_events enable row level security;

revoke all on public.experiments, public.experiment_assignments, public.experiment_events
  from public, anon, authenticated;
grant select on public.experiments, public.experiment_assignments, public.experiment_events to authenticated;

drop policy if exists experiments_admin_select on public.experiments;
create policy experiments_admin_select on public.experiments for select to authenticated
  using ((select platform_private.is_admin()));
drop policy if exists assignments_admin_select on public.experiment_assignments;
create policy assignments_admin_select on public.experiment_assignments for select to authenticated
  using ((select platform_private.is_admin()));
drop policy if exists experiment_events_admin_select on public.experiment_events;
create policy experiment_events_admin_select on public.experiment_events for select to authenticated
  using ((select platform_private.is_admin()));

create or replace function public.get_experiment_variant(p_experiment_key text)
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_experiment public.experiments%rowtype;
  v_user_id uuid := (select auth.uid());
  v_variant text;
  v_bucket integer;
begin
  if v_user_id is null then raise exception 'Authentication required'; end if;
  if coalesce((select analytics_opt_out from public.profiles where id = v_user_id), false) then
    return 'control';
  end if;

  select * into v_experiment
  from public.experiments
  where experiment_key = p_experiment_key
    and status = 'running'
    and (starts_at is null or starts_at <= now())
    and (ends_at is null or ends_at > now());

  if not found then return 'control'; end if;

  select variant into v_variant
  from public.experiment_assignments
  where experiment_id = v_experiment.id and user_id = v_user_id;
  if found then return v_variant; end if;

  v_bucket := abs(hashtextextended(v_user_id::text || ':' || p_experiment_key, 0) % 100)::integer;
  v_variant := case
    when v_bucket < v_experiment.treatment_percentage then v_experiment.treatment_variant
    else v_experiment.control_variant
  end;

  insert into public.experiment_assignments (experiment_id, user_id, variant)
  values (v_experiment.id, v_user_id, v_variant)
  on conflict (experiment_id, user_id) do update
    set assigned_at = public.experiment_assignments.assigned_at
  returning variant into v_variant;
  return v_variant;
end;
$$;

create or replace function public.record_experiment_event(p_experiment_key text, p_event_name text)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := (select auth.uid());
  v_assignment_id bigint;
  v_ignored_variant text;
begin
  if v_user_id is null then raise exception 'Authentication required'; end if;
  if p_event_name !~ '^[a-z][a-z0-9_]{2,63}$' then raise exception 'Invalid event'; end if;
  if coalesce((select analytics_opt_out from public.profiles where id = v_user_id), false) then return; end if;

  v_ignored_variant := public.get_experiment_variant(p_experiment_key);
  select ea.id into v_assignment_id
  from public.experiment_assignments ea
  join public.experiments e on e.id = ea.experiment_id
  where e.experiment_key = p_experiment_key and ea.user_id = v_user_id;

  if v_assignment_id is not null then
    insert into public.experiment_events (assignment_id, user_id, event_name)
    values (v_assignment_id, v_user_id, p_event_name);
  end if;
end;
$$;

create or replace function public.admin_experiment_results()
returns table (
  experiment_key text,
  experiment_name text,
  experiment_status text,
  primary_event text,
  variant text,
  assigned_users bigint,
  converted_users bigint,
  conversion_rate numeric
)
language plpgsql
stable
security definer
set search_path = ''
as $$
begin
  if not (select platform_private.is_admin()) then raise exception 'Admin access required'; end if;
  return query
  select e.experiment_key, e.name, e.status, e.primary_event, ea.variant,
    count(distinct ea.user_id),
    count(distinct ea.user_id) filter (where ev.event_name = e.primary_event),
    case when count(distinct ea.user_id) = 0 then 0 else
      round(count(distinct ea.user_id) filter (where ev.event_name = e.primary_event)::numeric * 100
        / count(distinct ea.user_id), 2)
    end
  from public.experiments e
  left join public.experiment_assignments ea on ea.experiment_id = e.id
  left join public.experiment_events ev on ev.assignment_id = ea.id
  group by e.id, ea.variant
  order by e.created_at desc, ea.variant;
end;
$$;

revoke all on function public.get_experiment_variant(text) from public, anon;
revoke all on function public.record_experiment_event(text, text) from public, anon;
revoke all on function public.admin_experiment_results() from public, anon;
grant execute on function public.get_experiment_variant(text) to authenticated;
grant execute on function public.record_experiment_event(text, text) to authenticated;
grant execute on function public.admin_experiment_results() to authenticated;

comment on table public.experiments is 'Definicao e governanca de testes A/B por conta autenticada.';
