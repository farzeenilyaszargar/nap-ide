-- Desktop auth one-time codes (short-lived, single use)
create table if not exists desktop_auth_codes (
  id uuid primary key default gen_random_uuid(),
  code_hash text not null unique,
  state text not null,
  nonce text,
  user_id uuid not null references auth.users(id) on delete cascade,
  expires_at timestamp with time zone not null,
  used_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create index if not exists desktop_auth_codes_state_idx
  on desktop_auth_codes(state);

create index if not exists desktop_auth_codes_expires_idx
  on desktop_auth_codes(expires_at);

alter table desktop_auth_codes enable row level security;

-- Desktop sessions for refresh token rotation/revocation.
create table if not exists desktop_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  refresh_token_hash text not null unique,
  device_info text,
  device_fingerprint text,
  app_version text,
  platform text,
  arch text,
  ip_address text,
  user_agent text,
  expires_at timestamp with time zone not null,
  revoked_at timestamp with time zone,
  last_seen_at timestamp with time zone default timezone('utc'::text, now()) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create index if not exists desktop_sessions_user_idx
  on desktop_sessions(user_id);

create index if not exists desktop_sessions_expires_idx
  on desktop_sessions(expires_at);

create index if not exists desktop_sessions_active_idx
  on desktop_sessions(user_id, revoked_at, expires_at);

alter table desktop_sessions enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'desktop_sessions'
      and policyname = 'Users can view own desktop sessions'
  ) then
    create policy "Users can view own desktop sessions"
      on desktop_sessions for select
      using (auth.uid() = user_id);
  end if;
end $$;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'desktop_sessions'
      and policyname = 'Users can update own desktop sessions'
  ) then
    create policy "Users can update own desktop sessions"
      on desktop_sessions for update
      using (auth.uid() = user_id);
  end if;
end $$;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'desktop_sessions'
      and policyname = 'Users can delete own desktop sessions'
  ) then
    create policy "Users can delete own desktop sessions"
      on desktop_sessions for delete
      using (auth.uid() = user_id);
  end if;
end $$;

-- Raw usage events from desktop app (idempotent by key).
create table if not exists usage_events (
  id uuid primary key default gen_random_uuid(),
  idempotency_key text not null unique,
  user_id uuid not null references auth.users(id) on delete cascade,
  desktop_session_id uuid references desktop_sessions(id) on delete set null,
  event_type text not null,
  payload jsonb not null default '{}'::jsonb,
  input_tokens bigint not null default 0,
  output_tokens bigint not null default 0,
  reasoning_tokens bigint not null default 0,
  total_tokens bigint not null default 0,
  total_cost_usd numeric(14, 6) not null default 0,
  endpoint text,
  status_code integer,
  duration_ms integer,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  received_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create index if not exists usage_events_user_created_idx
  on usage_events(user_id, created_at desc);

create index if not exists usage_events_type_idx
  on usage_events(event_type);

alter table usage_events enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'usage_events'
      and policyname = 'Users can view own usage events'
  ) then
    create policy "Users can view own usage events"
      on usage_events for select
      using (auth.uid() = user_id);
  end if;
end $$;

-- Monthly rollups for billing and quota checks.
create table if not exists usage_period_rollups (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  period_start date not null,
  period_end date not null,
  usage_cost_usd numeric(14, 6) not null default 0,
  included_quota_usd numeric(14, 6) not null default 0,
  overage_cost_usd numeric(14, 6) not null default 0,
  assistant_total_tokens bigint not null default 0,
  api_call_count bigint not null default 0,
  voice_call_count bigint not null default 0,
  event_count bigint not null default 0,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, period_start, period_end)
);

create index if not exists usage_period_rollups_user_idx
  on usage_period_rollups(user_id, period_start desc);

alter table usage_period_rollups enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'usage_period_rollups'
      and policyname = 'Users can view own usage rollups'
  ) then
    create policy "Users can view own usage rollups"
      on usage_period_rollups for select
      using (auth.uid() = user_id);
  end if;
end $$;

-- Plan-to-quota mapping for desktop billing behavior.
create table if not exists plan_limits (
  id uuid primary key default gen_random_uuid(),
  plan_code text not null unique,
  plan_name text not null,
  included_quota_usd numeric(14, 6) not null default 0,
  warning_threshold_ratio numeric(6, 4) not null default 0.8,
  overage_unit_price_usd numeric(14, 6) not null default 0,
  overage_enabled boolean not null default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table plan_limits enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'plan_limits'
      and policyname = 'Plan limits are viewable by everyone'
  ) then
    create policy "Plan limits are viewable by everyone"
      on plan_limits for select
      using (true);
  end if;
end $$;

insert into plan_limits (plan_code, plan_name, included_quota_usd, warning_threshold_ratio, overage_unit_price_usd, overage_enabled)
values
  ('free', 'Free', 0, 0.8, 0, true),
  ('pro', 'Pro', 25, 0.8, 0.02, true),
  ('max', 'Max', 100, 0.85, 0.01, true)
on conflict (plan_code) do update
set
  plan_name = excluded.plan_name,
  included_quota_usd = excluded.included_quota_usd,
  warning_threshold_ratio = excluded.warning_threshold_ratio,
  overage_unit_price_usd = excluded.overage_unit_price_usd,
  overage_enabled = excluded.overage_enabled,
  updated_at = timezone('utc'::text, now());
