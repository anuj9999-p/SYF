-- SYF — Ship Your Future
-- Contact inquiries table + Row Level Security policies.
-- Run this once against your Supabase project (SQL editor, or via the CLI:
-- supabase db execute -f supabase/schema.sql).

create extension if not exists "pgcrypto";

create table if not exists public.contact_inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 2 and 120),
  email text not null check (char_length(email) between 5 and 160),
  company text check (company is null or char_length(company) <= 160),
  project_type text not null check (
    project_type in (
      'Website',
      'Web Application',
      'AI-Powered Solution',
      'Digital Experience',
      'Other'
    )
  ),
  budget text check (budget is null or char_length(budget) <= 80),
  message text not null check (char_length(message) between 20 and 4000)
);

comment on table public.contact_inquiries is
  'Inbound project inquiries submitted through the SYF contact form.';

-- Row Level Security -------------------------------------------------------

alter table public.contact_inquiries enable row level security;

-- Anonymous visitors may only INSERT — never read, update, or delete.
drop policy if exists "Anon can submit inquiries" on public.contact_inquiries;
create policy "Anon can submit inquiries"
  on public.contact_inquiries
  for insert
  to anon
  with check (true);

-- Explicit grants ------------------------------------------------------------
-- No SELECT/UPDATE/DELETE grants are given to anon or authenticated: the
-- absence of a grant is what actually blocks those operations, RLS policies
-- alone are not enough without the matching table privilege.

revoke all on public.contact_inquiries from anon;
revoke all on public.contact_inquiries from authenticated;

grant insert on public.contact_inquiries to anon;
grant insert on public.contact_inquiries to authenticated;

-- service_role bypasses RLS by default in Supabase, but we grant explicitly
-- for clarity and so this script is self-documenting.
grant select, insert, update, delete on public.contact_inquiries to service_role;

-- No policies are created for select/update/delete for anon/authenticated,
-- so those operations remain denied even though the table has RLS enabled.
