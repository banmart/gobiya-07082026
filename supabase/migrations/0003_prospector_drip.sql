-- ═══════════════════════════════════════════════════════════════
-- Prospector & Email Drip Campaign System
-- ═══════════════════════════════════════════════════════════════

-- ── 1. Prospects Table ───────────────────────────────────────
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

-- ── 2. Drip Sequences Table ───────────────────────────────────
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

-- ── 3. Drip Subscribers Table ─────────────────────────────────
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

-- ── 4. Drip Logs Table ────────────────────────────────────────
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

-- ── Row-Level Security Policies ───────────────────────────────

alter table public.prospects         enable row level security;
alter table public.drip_sequences    enable row level security;
alter table public.drip_subscribers  enable row level security;
alter table public.drip_logs         enable row level security;

-- Prospects RLS
drop policy if exists prospects_admin_all on public.prospects;
create policy prospects_admin_all on public.prospects
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists prospects_client_all on public.prospects;
create policy prospects_client_all on public.prospects
  for all using (client_id is null or client_id = public.my_client_id())
  with check (client_id is null or client_id = public.my_client_id());

-- Drip Sequences RLS
drop policy if exists drip_sequences_admin_all on public.drip_sequences;
create policy drip_sequences_admin_all on public.drip_sequences
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists drip_sequences_client_all on public.drip_sequences;
create policy drip_sequences_client_all on public.drip_sequences
  for all using (client_id is null or client_id = public.my_client_id())
  with check (client_id is null or client_id = public.my_client_id());

-- Drip Subscribers RLS
drop policy if exists drip_subscribers_admin_all on public.drip_subscribers;
create policy drip_subscribers_admin_all on public.drip_subscribers
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists drip_subscribers_client_all on public.drip_subscribers;
create policy drip_subscribers_client_all on public.drip_subscribers
  for all using (true) with check (true);

-- Drip Logs RLS
drop policy if exists drip_logs_admin_all on public.drip_logs;
create policy drip_logs_admin_all on public.drip_logs
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists drip_logs_client_all on public.drip_logs;
create policy drip_logs_client_all on public.drip_logs
  for all using (true) with check (true);
