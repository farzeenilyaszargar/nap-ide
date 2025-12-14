-- Create usage_logs table
create table if not exists usage_logs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete set null,
  endpoint text, -- e.g., '/api/generate', 'desktop-app-feature'
  tokens_used integer default 0,
  metadata jsonb, -- Extra details
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table usage_logs enable row level security;

-- Policies
create policy "Users can insert own logs"
  on usage_logs for insert
  with check ( auth.uid() = user_id );

-- Only admins/service role should typically view raw logs, or maybe users can view their own history?
create policy "Users can view own logs"
  on usage_logs for select
  using ( auth.uid() = user_id );
