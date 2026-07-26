-- ═══════════════════════════════════════════════════════════════
-- Auth foundation: clients, profiles, RLS, new-user trigger.
-- Apply by pasting into the Supabase SQL editor and running it.
-- ═══════════════════════════════════════════════════════════════

-- ── Tables ────────────────────────────────────────────────────
-- clients.created_by references profiles, and profiles.client_id references
-- clients, so the FK on created_by is added after both tables exist. Both
-- columns are nullable, so there is no chicken-and-egg problem on insert.

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
-- SECURITY DEFINER is required, not stylistic: a policy on profiles that
-- queries profiles recurses infinitely. A definer function runs as the owner
-- and bypasses RLS, breaking the cycle.

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
-- This function reads NOTHING that a user can write. raw_user_meta_data is
-- writable by the user themselves via auth.updateUser, so neither role nor
-- client_id is sourced from it:
--
--   role      — always 'client'. Admins are promoted by SQL only.
--   client_id — left null. The admin server action assigns tenancy through
--               the service role immediately after creating the user. If it
--               were read from metadata here, anyone who could reach signUp
--               could plant a victim's client_id and land inside their
--               tenancy, since every RLS policy keys off that column.
--   full_name — user-writable, and deliberately so. It is a display string
--               that no policy consults.
--
-- Leaving client_id out also removes an unguarded ::uuid cast from GoTrue's
-- insert transaction, where a malformed value would abort account creation
-- with an opaque "Database error saving new user".

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
  for each row execute function public.handle_new_user();

-- ── Row-level security ────────────────────────────────────────

alter table public.clients  enable row level security;
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

-- A client may edit their own full_name, and nothing else that matters.
-- The with check clause pins role and client_id to their current values, so
-- a client cannot promote themselves or move to another client's tenancy.
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

-- ── Bootstrapping the first admin ─────────────────────────────
-- Not executed automatically. After creating your own account, run this once
-- in the SQL editor with your email substituted in:
--
--   update public.profiles
--   set role = 'admin', client_id = null
--   where id = (select id from auth.users where email = 'you@example.com');
