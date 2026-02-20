-- Form submissions from public (Apply, Contact, Hero, Get info). Admin views in dashboard.
create table if not exists public.submissions (
  id uuid primary key default gen_random_uuid(),
  form_type text not null check (form_type in ('apply', 'contact', 'hero', 'get_info')),
  data jsonb not null default '{}',
  created_at timestamptz not null default now()
);

create index if not exists idx_submissions_created_at on public.submissions (created_at desc);
create index if not exists idx_submissions_form_type on public.submissions (form_type);

alter table public.submissions enable row level security;

create policy "Service role full access"
  on public.submissions for all using (true) with check (true);
