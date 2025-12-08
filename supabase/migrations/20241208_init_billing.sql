-- Create plans table
create table if not exists plans (
  id uuid default gen_random_uuid() primary key,
  name text not null unique,
  description text,
  price_inr integer not null, -- Price in paise (e.g., 500 for ₹5)
  token_limit bigint not null,
  request_limit bigint not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create user_usage table
create table if not exists user_usage (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null unique,
  plan_id uuid references plans(id),
  tokens_used bigint default 0 not null,
  requests_count bigint default 0 not null,
  plan_start_date timestamp with time zone,
  plan_expiry_date timestamp with time zone,
  total_spent integer default 0 not null, -- Total money spent in paise
  balance integer default 0 not null, -- Remaining balance in paise (if using a wallet model)
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table plans enable row level security;
alter table user_usage enable row level security;

-- Policies for plans (Everyone can read)
create policy "Plans are viewable by everyone"
  on plans for select
  using ( true );

-- Policies for user_usage (Users can read their own usage)
create policy "Users can view own usage"
  on user_usage for select
  using ( auth.uid() = user_id );

-- Optional: Policy for service role to manage everything (implicitly true for service_role, but good for clarity if needed later)

-- Function to handle new user creation (optional, to initialize usage record)
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.user_usage (user_id, balance)
  values (new.id, 0);
  return new;
end;
$$;

-- Trigger to call the function on new user creation
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Insert some default plans
insert into plans (name, price_inr, token_limit, request_limit)
values
  ('Free', 0, 1000, 100),
  ('Pro', 50000, 100000, 10000) -- ₹500
on conflict (name) do nothing;
