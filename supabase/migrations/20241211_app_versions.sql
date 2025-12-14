-- Create app_versions table
create table if not exists app_versions (
  id uuid default gen_random_uuid() primary key,
  version text not null, -- e.g., '1.0.1'
  platform text not null, -- 'darwin', 'win32', 'linux'
  download_url text not null,
  release_notes text,
  pub_date timestamp with time zone default timezone('utc'::text, now()) not null,
  is_mandatory boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table app_versions enable row level security;

-- Policies
-- Everyone (even anon / unauthenticated apps) needs to check for updates
create policy "App versions are viewable by everyone"
  on app_versions for select
  using ( true );

-- Only admins/service role can insert/update (Implicitly covered by default secure policies if we don't add insert policy for anon)
