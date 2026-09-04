create table if not exists public.activity_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  started_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  active_seconds integer not null default 0 check (active_seconds between 0 and 31536000)
);

create table if not exists public.product_events (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  session_id uuid references public.activity_sessions(id) on delete set null,
  feature_key text not null check (feature_key ~ '^[a-z][a-z0-9_]{2,63}$'),
  event_name text not null check (event_name ~ '^[a-z][a-z0-9_]{2,63}$'),
  numeric_value numeric check (numeric_value between -1000000000 and 1000000000),
  created_at timestamptz not null default now()
);

create index if not exists activity_sessions_user_seen_idx
  on public.activity_sessions (user_id, last_seen_at desc);
create index if not exists product_events_feature_created_idx
  on public.product_events (feature_key, event_name, created_at desc);
create index if not exists product_events_user_created_idx
  on public.product_events (user_id, created_at desc);

alter table public.activity_sessions enable row level security;
alter table public.product_events enable row level security;

revoke all on public.activity_sessions, public.product_events from public, anon, authenticated;
grant select on public.activity_sessions to authenticated;
grant select on public.product_events to authenticated;

drop policy if exists sessions_select on public.activity_sessions;
create policy sessions_select on public.activity_sessions for select to authenticated
  using ((select auth.uid()) = user_id or (select platform_private.is_admin()));
drop policy if exists product_events_admin_select on public.product_events;
create policy product_events_admin_select on public.product_events for select to authenticated
  using ((select platform_private.is_admin()));

create or replace function public.start_activity_session()
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := (select auth.uid());
  v_session_id uuid := gen_random_uuid();
begin
  if v_user_id is null then raise exception 'Authentication required'; end if;
  if coalesce((select analytics_opt_out from public.profiles where id = v_user_id), false) then return null; end if;
  insert into public.activity_sessions (id, user_id) values (v_session_id, v_user_id);
  return v_session_id;
end;
$$;

create or replace function public.touch_activity_session(p_session_id uuid, p_active_seconds integer)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := (select auth.uid());
begin
  if v_user_id is null then raise exception 'Authentication required'; end if;
  if p_active_seconds not between 0 and 31536000 then raise exception 'Invalid active time'; end if;
  if coalesce((select analytics_opt_out from public.profiles where id = v_user_id), false) then return; end if;
  update public.activity_sessions
  set last_seen_at = now(), active_seconds = greatest(active_seconds, p_active_seconds)
  where id = p_session_id and user_id = v_user_id;
end;
$$;

create or replace function public.record_product_event(
  p_feature_key text,
  p_event_name text,
  p_numeric_value numeric default null,
  p_session_id uuid default null
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := (select auth.uid());
begin
  if v_user_id is null then raise exception 'Authentication required'; end if;
  if p_feature_key !~ '^[a-z][a-z0-9_]{2,63}$'
     or p_event_name !~ '^[a-z][a-z0-9_]{2,63}$' then
    raise exception 'Invalid event';
  end if;
  if p_numeric_value is not null and p_numeric_value not between -1000000000 and 1000000000 then
    raise exception 'Invalid numeric value';
  end if;
  if coalesce((select analytics_opt_out from public.profiles where id = v_user_id), false) then
    return;
  end if;
  if p_session_id is not null and not exists (
    select 1 from public.activity_sessions where id = p_session_id and user_id = v_user_id
  ) then
    raise exception 'Invalid session';
  end if;

  insert into public.product_events (user_id, session_id, feature_key, event_name, numeric_value)
  values (v_user_id, p_session_id, p_feature_key, p_event_name, p_numeric_value);
end;
$$;

create or replace function public.admin_product_event_summary(p_days integer default 30)
returns table (
  feature_key text,
  event_name text,
  unique_users bigint,
  total_events bigint,
  average_numeric_value numeric,
  last_event_at timestamptz
)
language plpgsql
stable
security definer
set search_path = ''
as $$
begin
  if not (select platform_private.is_admin()) then raise exception 'Admin access required'; end if;
  return query
  select e.feature_key, e.event_name, count(distinct e.user_id), count(*),
    round(avg(e.numeric_value), 2), max(e.created_at)
  from public.product_events e
  where e.created_at >= now() - make_interval(days => least(greatest(p_days, 1), 365))
  group by e.feature_key, e.event_name
  order by max(e.created_at) desc;
end;
$$;

revoke all on function public.start_activity_session() from public, anon;
revoke all on function public.touch_activity_session(uuid, integer) from public, anon;
revoke all on function public.record_product_event(text, text, numeric, uuid) from public, anon;
revoke all on function public.admin_product_event_summary(integer) from public, anon;
grant execute on function public.start_activity_session() to authenticated;
grant execute on function public.touch_activity_session(uuid, integer) to authenticated;
grant execute on function public.record_product_event(text, text, numeric, uuid) to authenticated;
grant execute on function public.admin_product_event_summary(integer) to authenticated;

comment on table public.product_events is 'Eventos estruturados e minimos; nao aceita payload livre e respeita opt-out.';
