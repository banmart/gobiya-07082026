-- ═══════════════════════════════════════════════════════════════
-- Dashboard Features: form submissions, AI audits, Google reviews
-- ═══════════════════════════════════════════════════════════════

-- ── 1. Form Submissions Table ─────────────────────────────────
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

-- ── 2. AI Website Audits Table ────────────────────────────────
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

-- ── 3. Google Reviews Table ───────────────────────────────────
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

-- ── Row-Level Security Policies ───────────────────────────────

alter table public.form_submissions enable row level security;
alter table public.ai_audits enable row level security;
alter table public.google_reviews enable row level security;

-- Form Submissions Policies
drop policy if exists form_submissions_admin_all on public.form_submissions;
create policy form_submissions_admin_all on public.form_submissions
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists form_submissions_client_select on public.form_submissions;
create policy form_submissions_client_select on public.form_submissions
  for select using (client_id = public.my_client_id());

-- AI Audits Policies
drop policy if exists ai_audits_admin_all on public.ai_audits;
create policy ai_audits_admin_all on public.ai_audits
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists ai_audits_client_all on public.ai_audits;
create policy ai_audits_client_all on public.ai_audits
  for all using (client_id = public.my_client_id())
  with check (client_id = public.my_client_id());

-- Google Reviews Policies
drop policy if exists google_reviews_admin_all on public.google_reviews;
create policy google_reviews_admin_all on public.google_reviews
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists google_reviews_client_all on public.google_reviews;
create policy google_reviews_client_all on public.google_reviews
  for all using (client_id = public.my_client_id())
  with check (client_id = public.my_client_id());
