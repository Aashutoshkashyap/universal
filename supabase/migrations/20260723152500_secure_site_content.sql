begin;

create extension if not exists pgcrypto;

create table if not exists public.page_content (
  id uuid primary key default gen_random_uuid(),
  section_name text unique not null,
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users (id) on delete set null
);

alter table public.page_content
  add column if not exists updated_by uuid references auth.users (id) on delete set null;

alter table public.page_content
  alter column updated_at set default now();

alter table public.page_content enable row level security;
alter table public.page_content force row level security;

revoke all on table public.page_content from anon, authenticated;

do $$
declare
  existing_policy record;
begin
  for existing_policy in
    select policyname
    from pg_policies
    where schemaname = 'public'
      and tablename = 'page_content'
  loop
    execute format(
      'drop policy if exists %I on public.page_content',
      existing_policy.policyname
    );
  end loop;
end
$$;

commit;
