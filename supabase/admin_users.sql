-- Run this in Supabase SQL Editor (Dashboard → SQL Editor) to create the admin users table.

create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  password_hash text not null,
  role text not null check (role in ('admin', 'company')),
  approved boolean not null default false,
  display_name text,
  created_at timestamptz not null default now()
);

-- If table already exists without display_name, run: alter table public.admin_users add column if not exists display_name text;

-- Optional: enable RLS and allow service role full access (your app uses service role key).
alter table public.admin_users enable row level security;

create policy "Service role full access"
  on public.admin_users
  for all
  to service_role
  using (true)
  with check (true);
