-- Add devise_limit to plans table
alter table plans add column if not exists device_limit integer default 1 not null;

-- Create devices table
create table if not exists devices (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  device_id text not null, -- Client generated unique ID (e.g., hardware ID hash)
  device_name text, -- e.g. "MacBook Pro"
  platform text, -- e.g. "darwin", "win32"
  last_seen timestamp with time zone default timezone('utc'::text, now()) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, device_id)
);

-- Enable RLS
alter table devices enable row level security;

-- Policies for devices
create policy "Users can view own devices"
  on devices for select
  using ( auth.uid() = user_id );

create policy "Users can insert own devices"
  on devices for insert
  with check ( auth.uid() = user_id );

create policy "Users can delete own devices"
  on devices for delete
  using ( auth.uid() = user_id );

create policy "Users can update own devices"
  on devices for update
  using ( auth.uid() = user_id );
