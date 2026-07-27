-- ═══════════════════════════════════════════════════════════════
-- GOBIYA COMPLETE SUPABASE DATABASE SETUP
-- Paste this whole file into Supabase SQL Editor and click Run.
-- ═══════════════════════════════════════════════════════════════

-- ── 1. Auth Foundation & Tenancy ──────────────────────────────
create table if not exists public.clients (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  website       text,
  contact_email text not null,
  status        text not null default 'active' check (status in ('active', 'paused')),
  created_at    timestamptz not null default now(),
  created_by    uuid
);

create table if not exists public.profiles (
  id         uuid primary key references auth.users (id) on delete cascade,
  client_id  uuid references public.clients (id) on delete set null,
  role       text not null default 'client' check (role in ('client', 'admin')),
  full_name  text,
  created_at timestamptz not null default now()
);

alter table public.clients
  drop constraint if exists clients_created_by_fkey;

alter table public.clients
  add constraint clients_created_by_fkey
  foreign key (created_by) references public.profiles (id) on delete set null;

create index if not exists profiles_client_id_idx on public.profiles (client_id);
create unique index if not exists clients_contact_email_idx on public.clients (lower(contact_email));

-- ── Helper functions ──────────────────────────────────────────
create or replace function public.my_client_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select client_id from public.profiles where id = auth.uid();
$$;

create or replace function public.my_role()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select role from public.profiles where id = auth.uid();
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(public.my_role() = 'admin', false);
$$;

-- ── New-user trigger ──────────────────────────────────────────
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, role, full_name)
  values (
    new.id,
    'client',
    nullif(new.raw_user_meta_data ->> 'full_name', '')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ── Auth RLS ──────────────────────────────────────────────────
alter table public.clients enable row level security;
alter table public.profiles enable row level security;

drop policy if exists clients_select_own on public.clients;
create policy clients_select_own on public.clients
  for select using (id = public.my_client_id());

drop policy if exists clients_admin_all on public.clients;
create policy clients_admin_all on public.clients
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists profiles_select_own on public.profiles;
create policy profiles_select_own on public.profiles
  for select using (id = auth.uid());

drop policy if exists profiles_update_own on public.profiles;
create policy profiles_update_own on public.profiles
  for update using (id = auth.uid())
  with check (
    id = auth.uid()
    and role = public.my_role()
    and client_id is not distinct from public.my_client_id()
  );

drop policy if exists profiles_admin_all on public.profiles;
create policy profiles_admin_all on public.profiles
  for all using (public.is_admin()) with check (public.is_admin());


-- ── 2. Dashboard Features ─────────────────────────────────────

create table if not exists public.form_submissions (
  id          uuid primary key default gen_random_uuid(),
  client_id   uuid references public.clients (id) on delete set null,
  type        text not null check (type in ('contact', 'onboarding', 'audit')),
  name        text not null,
  email       text not null,
  phone       text,
  company     text,
  website     text,
  payload     jsonb default '{}'::jsonb,
  status      text not null default 'new' check (status in ('new', 'contacted', 'closed')),
  created_at  timestamptz not null default now()
);

create index if not exists form_submissions_client_id_idx on public.form_submissions (client_id);
create index if not exists form_submissions_type_idx on public.form_submissions (type);
create index if not exists form_submissions_created_at_idx on public.form_submissions (created_at desc);

create table if not exists public.ai_audits (
  id          uuid primary key default gen_random_uuid(),
  client_id   uuid references public.clients (id) on delete cascade,
  url         text not null,
  score       integer check (score between 0 and 100),
  report_data jsonb not null default '{}'::jsonb,
  created_at  timestamptz not null default now()
);

create index if not exists ai_audits_client_id_idx on public.ai_audits (client_id);
create index if not exists ai_audits_created_at_idx on public.ai_audits (created_at desc);

create table if not exists public.google_reviews (
  id            uuid primary key default gen_random_uuid(),
  client_id     uuid not null references public.clients (id) on delete cascade,
  author_name   text not null,
  rating        integer not null check (rating between 1 and 5),
  review_text   text,
  response_text text,
  status        text not null default 'pending' check (status in ('pending', 'replied')),
  reviewed_at   timestamptz not null default now(),
  created_at    timestamptz not null default now()
);

create index if not exists google_reviews_client_id_idx on public.google_reviews (client_id);

alter table public.form_submissions enable row level security;
alter table public.ai_audits enable row level security;
alter table public.google_reviews enable row level security;

drop policy if exists form_submissions_admin_all on public.form_submissions;
create policy form_submissions_admin_all on public.form_submissions
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists form_submissions_client_select on public.form_submissions;
create policy form_submissions_client_select on public.form_submissions
  for select using (client_id = public.my_client_id());

drop policy if exists ai_audits_admin_all on public.ai_audits;
create policy ai_audits_admin_all on public.ai_audits
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists ai_audits_client_all on public.ai_audits;
create policy ai_audits_client_all on public.ai_audits
  for all using (client_id = public.my_client_id())
  with check (client_id = public.my_client_id());

drop policy if exists google_reviews_admin_all on public.google_reviews;
create policy google_reviews_admin_all on public.google_reviews
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists google_reviews_client_all on public.google_reviews;
create policy google_reviews_client_all on public.google_reviews
  for all using (client_id = public.my_client_id())
  with check (client_id = public.my_client_id());


-- ── 3. Prospector & Email Drip Campaign System ────────────────

create table if not exists public.prospects (
  id            uuid primary key default gen_random_uuid(),
  client_id     uuid references public.clients (id) on delete set null,
  company       text not null,
  contact_name  text,
  email         text not null,
  phone         text,
  website       text,
  industry      text,
  keywords      text,
  location      text,
  status        text not null default 'NEW' check (status in ('NEW', 'QUEUED', 'CONTACTED', 'CONVERTED', 'UNSUBSCRIBED')),
  source        text default 'perplexity_scout',
  notes         text,
  created_at    timestamptz not null default now()
);

create index if not exists prospects_client_id_idx on public.prospects (client_id);
create index if not exists prospects_email_idx on public.prospects (email);
create index if not exists prospects_status_idx on public.prospects (status);
create index if not exists prospects_created_at_idx on public.prospects (created_at desc);

create table if not exists public.drip_sequences (
  id          uuid primary key default gen_random_uuid(),
  client_id   uuid references public.clients (id) on delete set null,
  title       text not null,
  description text,
  status      text not null default 'paused' check (status in ('active', 'paused')),
  steps       jsonb not null default '[]'::jsonb,
  created_at  timestamptz not null default now()
);

create index if not exists drip_sequences_client_id_idx on public.drip_sequences (client_id);

create table if not exists public.drip_subscribers (
  id            uuid primary key default gen_random_uuid(),
  sequence_id   uuid not null references public.drip_sequences (id) on delete cascade,
  prospect_id   uuid not null references public.prospects (id) on delete cascade,
  current_step  integer not null default 0,
  status        text not null default 'active' check (status in ('active', 'paused', 'completed', 'unsubscribed')),
  last_sent_at  timestamptz,
  next_send_at  timestamptz not null default now(),
  created_at    timestamptz not null default now(),
  unique (sequence_id, prospect_id)
);

create index if not exists drip_subscribers_seq_idx on public.drip_subscribers (sequence_id);
create index if not exists drip_subscribers_prospect_idx on public.drip_subscribers (prospect_id);
create index if not exists drip_subscribers_status_next_idx on public.drip_subscribers (status, next_send_at);

create table if not exists public.drip_logs (
  id              uuid primary key default gen_random_uuid(),
  sequence_id     uuid references public.drip_sequences (id) on delete set null,
  prospect_id     uuid references public.prospects (id) on delete set null,
  step_index      integer not null,
  recipient_email text not null,
  status          text not null check (status in ('sent', 'failed')),
  error_message   text,
  sent_at         timestamptz not null default now()
);

create index if not exists drip_logs_seq_idx on public.drip_logs (sequence_id);

alter table public.prospects         enable row level security;
alter table public.drip_sequences    enable row level security;
alter table public.drip_subscribers  enable row level security;
alter table public.drip_logs         enable row level security;

drop policy if exists prospects_admin_all on public.prospects;
create policy prospects_admin_all on public.prospects
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists prospects_client_all on public.prospects;
create policy prospects_client_all on public.prospects
  for all using (client_id is null or client_id = public.my_client_id())
  with check (client_id is null or client_id = public.my_client_id());

drop policy if exists drip_sequences_admin_all on public.drip_sequences;
create policy drip_sequences_admin_all on public.drip_sequences
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists drip_sequences_client_all on public.drip_sequences;
create policy drip_sequences_client_all on public.drip_sequences
  for all using (client_id is null or client_id = public.my_client_id())
  with check (client_id is null or client_id = public.my_client_id());

drop policy if exists drip_subscribers_admin_all on public.drip_subscribers;
create policy drip_subscribers_admin_all on public.drip_subscribers
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists drip_subscribers_client_all on public.drip_subscribers;
create policy drip_subscribers_client_all on public.drip_subscribers
  for all using (true) with check (true);

drop policy if exists drip_logs_admin_all on public.drip_logs;
create policy drip_logs_admin_all on public.drip_logs
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists drip_logs_client_all on public.drip_logs;
create policy drip_logs_client_all on public.drip_logs
  for all using (true) with check (true);
