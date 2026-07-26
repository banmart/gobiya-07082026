# Auth Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship invite-only authentication with client and admin roles, protected dashboard shells, and admin-driven client creation, so every later feature slice has accounts and tenancy to build on.

**Architecture:** Supabase Postgres holds `clients` and `profiles` with row-level security as the tenancy boundary. Sessions are httpOnly cookies managed by `@supabase/ssr`, refreshed in `middleware.js` and read server-side in layouts, so guards run before any protected content renders. The service-role key is confined to two server-only operations: creating a client and generating an invite link, which is emailed through the existing Resend setup.

**Tech Stack:** Next 16 (App Router, plain JavaScript), React 19, Supabase (`@supabase/ssr` 0.12.x, `@supabase/supabase-js` 2.x), Resend 6.x, Vitest 4.x.

## Global Constraints

- **Plain JavaScript only.** This repo has no TypeScript and no build step for it. Never add `.ts`/`.tsx` files.
- **ESM only.** `package.json` sets `"type": "module"`. Use `import`/`export`, never `require`.
- **No CSS framework.** Styling is hand-written global CSS with BEM-ish class names. Do not add Tailwind, CSS modules, or a component library.
- **Design tokens come from `app/globals.css` `:root`.** Use `var(--darkest)` (navy `#142f52`), `var(--main)` (carmine `#c8102e`), `var(--lightest)`, `var(--border)`, `var(--hint)`, `var(--font-heading)`, `var(--font-sans)`. Never hard-code hex values in new CSS.
- **Marketing routes must stay statically rendered.** The `middleware.js` matcher must never include `/`, `/services`, `/insights`, `/tools`, or any other marketing path. Do not call `headers()` or `cookies()` in `app/layout.js` — see the comment in `components/ChromeGate.js:5` explaining why that regressed 52 of 54 pages to dynamic rendering.
- **`SUPABASE_SERVICE_ROLE_KEY` is server-only.** It must never appear in a file that carries `'use client'`, nor be imported (even transitively) by one.
- **Invite-only.** Public signup is disabled in the Supabase dashboard. No route in this app may call `supabase.auth.signUp()`.
- **Auth pages and dashboards must not be indexed.** Every page under `/dashboard`, `/admin`, `/login`, and `/auth` exports `metadata` with `robots: { index: false, follow: false }`, and `app/robots.js` disallows those paths.
- **Commit after every task.** Small, frequent commits.

---

## File Structure

| File | Responsibility |
| --- | --- |
| `lib/supabase/env.js` | Reads and validates the three Supabase env vars; throws a named error when one is missing |
| `lib/supabase/server.js` | Per-request cookie-bound server client (Server Components, Route Handlers) |
| `lib/supabase/client.js` | Browser client for `'use client'` components |
| `lib/supabase/admin.js` | Service-role client, server-only, guarded against client-bundle import |
| `lib/auth.js` | `getSessionUser()`, `requireUser()`, `requireAdmin()` |
| `lib/clients.js` | The only module that knows the `clients` table shape |
| `lib/emails/invite.js` | Builds and sends the branded invite email through Resend |
| `middleware.js` | Session refresh + anonymous redirect for `/dashboard` and `/admin` |
| `supabase/migrations/0001_auth_foundation.sql` | Tables, helper functions, RLS policies, new-user trigger |
| `app/dashboard.css` | All app-shell styling, imported once by the dashboard layout |
| `components/dashboard/Sidebar.js` | Sidebar navigation, shared by client and admin layouts |
| `components/dashboard/TopBar.js` | Thin top bar with account menu and sign-out |
| `app/(auth)/*` | login, set-password, forgot |
| `app/auth/callback/route.js` | Exchanges an invite/recovery `token_hash` for a session |
| `app/auth/signout/route.js` | POST-only sign-out |
| `app/(dashboard)/*` | Client dashboard shell, overview, settings |
| `app/(admin)/*` | Admin shell, overview, clients list and create |
| `tests/*` | Vitest unit tests and RLS integration tests |

---

## Task 1: Dependencies, environment validation, and Supabase clients

**Files:**
- Modify: `package.json`
- Create: `vitest.config.js`
- Create: `tests/setup.js`
- Create: `lib/supabase/env.js`
- Create: `lib/supabase/server.js`
- Create: `lib/supabase/client.js`
- Create: `lib/supabase/admin.js`
- Create: `tests/unit/supabase-env.test.js`
- Modify: `.env.local`
- Modify: `.gitignore`

**Interfaces:**
- Produces: `supabaseEnv()` returning `{ url, anonKey }`; `supabaseServiceEnv()` returning `{ url, serviceRoleKey }`; `siteUrl()` returning a string with no trailing slash. `createServerSupabase()` (async) and `createAdminSupabase()` from their respective modules, `createBrowserSupabase()` from the client module.

- [ ] **Step 1: Install dependencies**

```bash
npm install @supabase/ssr@^0.12.3 @supabase/supabase-js@^2.110.8
npm install --save-dev vitest@^4.1.10 dotenv@^17.4.2
```

- [ ] **Step 2: Add test scripts to `package.json`**

Add to the `"scripts"` object, after `"lint"`:

```json
    "test": "vitest run",
    "test:watch": "vitest",
    "test:rls": "vitest run tests/rls",
```

- [ ] **Step 3: Create `vitest.config.js`**

```js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    setupFiles: ['./tests/setup.js'],
    // RLS tests talk to a real Supabase project over the network. The default
    // 5s timeout is not enough for user creation plus sign-in round trips.
    testTimeout: 30000,
    include: ['tests/**/*.test.js'],
  },
});
```

- [ ] **Step 4: Create `tests/setup.js`**

```js
// Vitest runs outside Next, so .env.local is not loaded automatically.
import { config } from 'dotenv';

config({ path: '.env.local' });
```

- [ ] **Step 5: Write the failing test — `tests/unit/supabase-env.test.js`**

```js
import { describe, it, expect, afterEach } from 'vitest';
import { supabaseEnv, supabaseServiceEnv, siteUrl } from '../../lib/supabase/env.js';

const ORIGINAL = { ...process.env };

afterEach(() => {
  process.env = { ...ORIGINAL };
});

describe('supabaseEnv', () => {
  it('returns url and anon key when both are set', () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co';
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'anon-key';
    expect(supabaseEnv()).toEqual({
      url: 'https://example.supabase.co',
      anonKey: 'anon-key',
    });
  });

  it('names the missing variable in the error', () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co';
    delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    expect(() => supabaseEnv()).toThrow(/NEXT_PUBLIC_SUPABASE_ANON_KEY/);
  });
});

describe('supabaseServiceEnv', () => {
  it('names the missing service role key in the error', () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co';
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;
    expect(() => supabaseServiceEnv()).toThrow(/SUPABASE_SERVICE_ROLE_KEY/);
  });
});

describe('siteUrl', () => {
  it('strips a trailing slash', () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://www.gobiya.com/';
    expect(siteUrl()).toBe('https://www.gobiya.com');
  });

  it('falls back to localhost when unset', () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    expect(siteUrl()).toBe('http://localhost:3000');
  });
});
```

- [ ] **Step 6: Run the test to verify it fails**

Run: `npm test -- tests/unit/supabase-env.test.js`
Expected: FAIL — cannot resolve `../../lib/supabase/env.js`.

- [ ] **Step 7: Create `lib/supabase/env.js`**

```js
// Env access for every Supabase client in the app. Reading through these
// helpers means a missing variable fails immediately with the variable's name,
// instead of surfacing later as "Cannot read properties of undefined".

function required(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing required environment variable ${name}. Add it to .env.local and to the Vercel project settings.`
    );
  }
  return value;
}

export function supabaseEnv() {
  return {
    url: required('NEXT_PUBLIC_SUPABASE_URL'),
    anonKey: required('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
  };
}

export function supabaseServiceEnv() {
  return {
    url: required('NEXT_PUBLIC_SUPABASE_URL'),
    serviceRoleKey: required('SUPABASE_SERVICE_ROLE_KEY'),
  };
}

// Absolute base for links we email out. Falls back to the dev server so a
// local invite link is clickable.
export function siteUrl() {
  const value = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  return value.replace(/\/+$/, '');
}
```

- [ ] **Step 8: Run the test to verify it passes**

Run: `npm test -- tests/unit/supabase-env.test.js`
Expected: PASS, 5 tests.

- [ ] **Step 9: Create `lib/supabase/server.js`**

```js
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { supabaseEnv } from './env.js';

// One client per request — it closes over that request's cookie jar, so it can
// never be hoisted into a module-level singleton.
export async function createServerSupabase() {
  const { url, anonKey } = supabaseEnv();
  const cookieStore = await cookies();

  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        } catch {
          // Server Components cannot set cookies. This is expected and safe:
          // middleware.js already refreshed the session for this request.
        }
      },
    },
  });
}
```

- [ ] **Step 10: Create `lib/supabase/client.js`**

```js
import { createBrowserClient } from '@supabase/ssr';
import { supabaseEnv } from './env.js';

export function createBrowserSupabase() {
  const { url, anonKey } = supabaseEnv();
  return createBrowserClient(url, anonKey);
}
```

- [ ] **Step 11: Create `lib/supabase/admin.js`**

```js
import { createClient } from '@supabase/supabase-js';
import { supabaseServiceEnv } from './env.js';

// Service-role client. It bypasses row-level security entirely, so it is only
// ever used for operations a client can never perform: creating a client
// record and generating an invite link.
//
// The guard below is deliberate. If this module is ever imported by a
// 'use client' file, the bundler would try to inline the service-role key into
// the browser bundle. Throwing at module scope turns that mistake into a build
// failure rather than a silent key leak.
if (typeof window !== 'undefined') {
  throw new Error('lib/supabase/admin.js is server-only and must not be imported by client code.');
}

export function createAdminSupabase() {
  const { url, serviceRoleKey } = supabaseServiceEnv();
  return createClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
```

- [ ] **Step 12: Add the new variables to `.env.local`**

Append these lines. Fill the values from the Supabase dashboard under
Project Settings → API. `NEXT_PUBLIC_SITE_URL` is `http://localhost:3000` for
local development and `https://www.gobiya.com` in Vercel.

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

- [ ] **Step 13: Confirm `.env.local` is git-ignored**

Run: `git check-ignore -v .env.local`
Expected: a line naming the ignoring rule. If the command exits non-zero,
add `.env.local` to `.gitignore` before continuing. **Do not commit secrets.**

- [ ] **Step 14: Run the full test suite**

Run: `npm test`
Expected: PASS, 5 tests.

- [ ] **Step 15: Commit**

```bash
git add package.json package-lock.json vitest.config.js tests/setup.js tests/unit/supabase-env.test.js lib/supabase/ .gitignore
git commit -m "feat: add Supabase clients, env validation, and Vitest"
```

---

## Task 2: Database schema, helper functions, and RLS policies

**Files:**
- Create: `supabase/migrations/0001_auth_foundation.sql`
- Create: `supabase/README.md`

**Interfaces:**
- Produces: tables `public.clients` and `public.profiles`; functions `public.my_client_id()`, `public.my_role()`, `public.is_admin()`; trigger `on_auth_user_created`.

- [ ] **Step 1: Disable public signups in the Supabase dashboard**

In the Supabase dashboard: Authentication → Sign In / Providers → Email, and
turn **off** "Allow new users to sign up". This is what makes the system
invite-only. Without it, anyone can create an account against your anon key.

Also confirm "Confirm email" is **on**.

- [ ] **Step 2: Create `supabase/migrations/0001_auth_foundation.sql`**

```sql
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
-- Reads client_id out of the invite's user_metadata. Note that role is NOT
-- read from metadata: user_metadata is writable by the user themselves via
-- auth.updateUser, so trusting it for role would be a privilege-escalation
-- path. Every new profile is a client; admins are promoted by SQL only.

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, client_id, role, full_name)
  values (
    new.id,
    nullif(new.raw_user_meta_data ->> 'client_id', '')::uuid,
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
```

- [ ] **Step 3: Apply the migration**

Paste the file's contents into the Supabase SQL editor and run it.
Expected: "Success. No rows returned."

- [ ] **Step 4: Verify the tables and RLS are live**

Run this in the SQL editor:

```sql
select relname, relrowsecurity
from pg_class
where relname in ('clients', 'profiles');
```

Expected: two rows, `relrowsecurity` = `true` for both.

- [ ] **Step 5: Create `supabase/README.md`**

```markdown
# Supabase

## Applying migrations

There is no Supabase CLI in this project. Migrations in `migrations/` are
applied by hand, in filename order, by pasting them into the SQL editor in the
Supabase dashboard.

Every migration must be idempotent (`create table if not exists`,
`create or replace function`, `drop policy if exists` before `create policy`)
so re-running it is safe.

## Bootstrapping an admin

Roles are never granted through the app. After the account exists, run:

```sql
update public.profiles
set role = 'admin', client_id = null
where id = (select id from auth.users where email = 'you@example.com');
```

## Invite-only

Public signup is disabled in Authentication → Sign In / Providers → Email.
If it is ever re-enabled, anyone can create an account with the anon key.
```

- [ ] **Step 6: Commit**

```bash
git add supabase/
git commit -m "feat: add clients and profiles schema with RLS policies"
```

---

## Task 3: RLS integration tests

These are the most important tests in the slice. RLS is the entire tenancy
boundary, so it gets tested against a real Postgres, not a mock.

**Files:**
- Create: `tests/rls/helpers.js`
- Create: `tests/rls/tenancy.test.js`

**Interfaces:**
- Consumes: `createAdminSupabase()` from `lib/supabase/admin.js`, `supabaseEnv()` from `lib/supabase/env.js`.
- Produces: `seedTenancy()` returning `{ admin, clientA, clientB, userA, userB, adminUser, cleanup }`, and `signInAs(email, password)` returning an anon-key Supabase client carrying that user's session.

- [ ] **Step 1: Create `tests/rls/helpers.js`**

```js
import { createClient } from '@supabase/supabase-js';
import { createAdminSupabase } from '../../lib/supabase/admin.js';
import { supabaseEnv } from '../../lib/supabase/env.js';

const PASSWORD = 'rls-test-password-9f3a';

// Signs in with the anon key, so the returned client is subject to RLS exactly
// like a real browser session. The admin client is NOT usable for these
// assertions — the service role bypasses every policy.
export async function signInAs(email) {
  const { url, anonKey } = supabaseEnv();
  const supabase = createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { error } = await supabase.auth.signInWithPassword({ email, password: PASSWORD });
  if (error) throw new Error(`Could not sign in as ${email}: ${error.message}`);
  return supabase;
}

async function createUser(admin, email, clientId) {
  const { data, error } = await admin.auth.admin.createUser({
    email,
    password: PASSWORD,
    email_confirm: true,
    user_metadata: clientId ? { client_id: clientId } : {},
  });
  if (error) throw new Error(`Could not create ${email}: ${error.message}`);
  return data.user;
}

export async function seedTenancy() {
  const admin = createAdminSupabase();
  const stamp = Date.now();

  const { data: clientA, error: errA } = await admin
    .from('clients')
    .insert({ name: `RLS Test A ${stamp}`, contact_email: `rls-a-${stamp}@example.test` })
    .select()
    .single();
  if (errA) throw new Error(`Seed client A failed: ${errA.message}`);

  const { data: clientB, error: errB } = await admin
    .from('clients')
    .insert({ name: `RLS Test B ${stamp}`, contact_email: `rls-b-${stamp}@example.test` })
    .select()
    .single();
  if (errB) throw new Error(`Seed client B failed: ${errB.message}`);

  const userA = await createUser(admin, `rls-a-${stamp}@example.test`, clientA.id);
  const userB = await createUser(admin, `rls-b-${stamp}@example.test`, clientB.id);
  const adminUser = await createUser(admin, `rls-admin-${stamp}@example.test`, null);

  // Promotion happens through the service role, mirroring the SQL bootstrap.
  const { error: promoteError } = await admin
    .from('profiles')
    .update({ role: 'admin', client_id: null })
    .eq('id', adminUser.id);
  if (promoteError) throw new Error(`Promote admin failed: ${promoteError.message}`);

  async function cleanup() {
    for (const user of [userA, userB, adminUser]) {
      await admin.auth.admin.deleteUser(user.id);
    }
    await admin.from('clients').delete().in('id', [clientA.id, clientB.id]);
  }

  return { admin, clientA, clientB, userA, userB, adminUser, cleanup };
}
```

- [ ] **Step 2: Write the failing test — `tests/rls/tenancy.test.js`**

```js
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { seedTenancy, signInAs } from './helpers.js';

let ctx;

beforeAll(async () => {
  ctx = await seedTenancy();
});

afterAll(async () => {
  if (ctx) await ctx.cleanup();
});

describe('clients table', () => {
  it('lets a client read its own row', async () => {
    const supabase = await signInAs(ctx.userA.email);
    const { data } = await supabase.from('clients').select('id, name').eq('id', ctx.clientA.id);
    expect(data).toHaveLength(1);
    expect(data[0].id).toBe(ctx.clientA.id);
  });

  it("hides another client's row", async () => {
    const supabase = await signInAs(ctx.userA.email);
    const { data } = await supabase.from('clients').select('id').eq('id', ctx.clientB.id);
    expect(data).toEqual([]);
  });

  it('lets an admin read both clients', async () => {
    const supabase = await signInAs(ctx.adminUser.email);
    const { data } = await supabase
      .from('clients')
      .select('id')
      .in('id', [ctx.clientA.id, ctx.clientB.id]);
    expect(data).toHaveLength(2);
  });
});

describe('profiles table', () => {
  it("hides another user's profile", async () => {
    const supabase = await signInAs(ctx.userA.email);
    const { data } = await supabase.from('profiles').select('id').eq('id', ctx.userB.id);
    expect(data).toEqual([]);
  });

  it('refuses self-promotion to admin', async () => {
    const supabase = await signInAs(ctx.userA.email);
    await supabase.from('profiles').update({ role: 'admin' }).eq('id', ctx.userA.id);

    // Read back through the service role: the update must not have landed,
    // whether it errored or silently matched zero rows.
    const { data } = await ctx.admin
      .from('profiles')
      .select('role')
      .eq('id', ctx.userA.id)
      .single();
    expect(data.role).toBe('client');
  });

  it('refuses reassigning your own client_id', async () => {
    const supabase = await signInAs(ctx.userA.email);
    await supabase.from('profiles').update({ client_id: ctx.clientB.id }).eq('id', ctx.userA.id);

    const { data } = await ctx.admin
      .from('profiles')
      .select('client_id')
      .eq('id', ctx.userA.id)
      .single();
    expect(data.client_id).toBe(ctx.clientA.id);
  });

  it('allows editing your own full_name', async () => {
    const supabase = await signInAs(ctx.userA.email);
    const { error } = await supabase
      .from('profiles')
      .update({ full_name: 'Renamed Person' })
      .eq('id', ctx.userA.id);
    expect(error).toBeNull();

    const { data } = await ctx.admin
      .from('profiles')
      .select('full_name')
      .eq('id', ctx.userA.id)
      .single();
    expect(data.full_name).toBe('Renamed Person');
  });
});

describe('anonymous access', () => {
  it('returns nothing without a session', async () => {
    const { createClient } = await import('@supabase/supabase-js');
    const { supabaseEnv } = await import('../../lib/supabase/env.js');
    const { url, anonKey } = supabaseEnv();
    const supabase = createClient(url, anonKey, { auth: { persistSession: false } });
    const { data } = await supabase.from('clients').select('id');
    expect(data).toEqual([]);
  });
});
```

- [ ] **Step 3: Run the tests**

Run: `npm run test:rls`
Expected: PASS, 8 tests.

If `refuses self-promotion` fails, the `with check` clause on
`profiles_update_own` is wrong — fix the policy in
`supabase/migrations/0001_auth_foundation.sql`, re-apply it, and re-run. Do
not proceed until it passes; every later task assumes this boundary holds.

- [ ] **Step 4: Verify the trigger populated `client_id`**

The seed relies on `handle_new_user` reading `client_id` from user metadata.
Confirm it worked:

Run: `npm run test:rls`
The `refuses reassigning your own client_id` test asserts
`client_id === clientA.id`, which is only true if the trigger fired. A `null`
here means the trigger is not installed.

- [ ] **Step 5: Commit**

```bash
git add tests/rls/
git commit -m "test: add RLS tenancy integration tests"
```

---

## Task 4: Auth guards

**Files:**
- Create: `lib/auth.js`
- Create: `tests/unit/auth-guards.test.js`

**Interfaces:**
- Consumes: `createServerSupabase()` from `lib/supabase/server.js`.
- Produces:
  - `getSessionUser()` → `null` or `{ id, email, role, clientId, fullName, client }` where `client` is the joined `clients` row or `null`
  - `requireUser()` → the same object, or redirects to `/login`
  - `requireAdmin()` → the same object, or `notFound()` for a signed-in non-admin, or redirects to `/login` when anonymous

- [ ] **Step 1: Write the failing test — `tests/unit/auth-guards.test.js`**

```js
import { describe, it, expect, vi, beforeEach } from 'vitest';

const getUser = vi.fn();
const maybeSingle = vi.fn();

vi.mock('../../lib/supabase/server.js', () => ({
  createServerSupabase: async () => ({
    auth: { getUser },
    from: () => ({
      select: () => ({ eq: () => ({ maybeSingle }) }),
    }),
  }),
}));

const redirect = vi.fn(() => {
  throw new Error('NEXT_REDIRECT');
});
const notFound = vi.fn(() => {
  throw new Error('NEXT_NOT_FOUND');
});

vi.mock('next/navigation', () => ({ redirect, notFound }));

const { getSessionUser, requireUser, requireAdmin } = await import('../../lib/auth.js');

beforeEach(() => {
  vi.clearAllMocks();
});

describe('getSessionUser', () => {
  it('returns null when there is no session', async () => {
    getUser.mockResolvedValue({ data: { user: null }, error: null });
    expect(await getSessionUser()).toBeNull();
  });

  it('merges the auth user with their profile', async () => {
    getUser.mockResolvedValue({
      data: { user: { id: 'user-1', email: 'a@example.com' } },
      error: null,
    });
    maybeSingle.mockResolvedValue({
      data: {
        role: 'client',
        client_id: 'client-1',
        full_name: 'Ada',
        clients: { id: 'client-1', name: 'Acme Dental' },
      },
      error: null,
    });

    expect(await getSessionUser()).toEqual({
      id: 'user-1',
      email: 'a@example.com',
      role: 'client',
      clientId: 'client-1',
      fullName: 'Ada',
      client: { id: 'client-1', name: 'Acme Dental' },
    });
  });

  it('returns null when the profile row is missing', async () => {
    getUser.mockResolvedValue({
      data: { user: { id: 'user-1', email: 'a@example.com' } },
      error: null,
    });
    maybeSingle.mockResolvedValue({ data: null, error: null });
    expect(await getSessionUser()).toBeNull();
  });
});

describe('requireUser', () => {
  it('redirects to /login when anonymous', async () => {
    getUser.mockResolvedValue({ data: { user: null }, error: null });
    await expect(requireUser()).rejects.toThrow('NEXT_REDIRECT');
    expect(redirect).toHaveBeenCalledWith('/login');
  });
});

describe('requireAdmin', () => {
  it('calls notFound for a signed-in client', async () => {
    getUser.mockResolvedValue({
      data: { user: { id: 'user-1', email: 'a@example.com' } },
      error: null,
    });
    maybeSingle.mockResolvedValue({
      data: { role: 'client', client_id: 'client-1', full_name: 'Ada', clients: null },
      error: null,
    });
    await expect(requireAdmin()).rejects.toThrow('NEXT_NOT_FOUND');
    expect(notFound).toHaveBeenCalled();
  });

  it('returns the user for an admin', async () => {
    getUser.mockResolvedValue({
      data: { user: { id: 'admin-1', email: 'boss@example.com' } },
      error: null,
    });
    maybeSingle.mockResolvedValue({
      data: { role: 'admin', client_id: null, full_name: 'Boss', clients: null },
      error: null,
    });
    const user = await requireAdmin();
    expect(user.role).toBe('admin');
    expect(notFound).not.toHaveBeenCalled();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- tests/unit/auth-guards.test.js`
Expected: FAIL — cannot resolve `../../lib/auth.js`.

- [ ] **Step 3: Create `lib/auth.js`**

```js
import { redirect, notFound } from 'next/navigation';
import { createServerSupabase } from './supabase/server.js';

// getUser() revalidates the token with Supabase on every call. getSession()
// only decodes the cookie, which a caller could have forged, so it must not be
// used for authorization decisions.
export async function getSessionUser() {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) return null;

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, client_id, full_name, clients (id, name, website, status)')
    .eq('id', data.user.id)
    .maybeSingle();

  // No profile means the new-user trigger did not fire. Treat it as
  // unauthenticated rather than guessing at a role.
  if (!profile) return null;

  return {
    id: data.user.id,
    email: data.user.email,
    role: profile.role,
    clientId: profile.client_id,
    fullName: profile.full_name,
    client: profile.clients ?? null,
  };
}

export async function requireUser() {
  const user = await getSessionUser();
  if (!user) redirect('/login');
  return user;
}

// A signed-in client hitting an admin route gets a 404, not a 403. A 403
// confirms the route exists; a 404 tells them nothing.
export async function requireAdmin() {
  const user = await getSessionUser();
  if (!user) redirect('/login');
  if (user.role !== 'admin') notFound();
  return user;
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test -- tests/unit/auth-guards.test.js`
Expected: PASS, 6 tests.

- [ ] **Step 5: Commit**

```bash
git add lib/auth.js tests/unit/auth-guards.test.js
git commit -m "feat: add server-side auth guards"
```

---

## Task 5: Middleware session refresh

**Files:**
- Create: `middleware.js`

**Interfaces:**
- Produces: a `middleware(request)` export and a `config.matcher` limited to `/dashboard`, `/admin`, and `/auth`.

- [ ] **Step 1: Create `middleware.js`**

```js
import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

// Refreshes the Supabase session cookie on every app request, and turns away
// anonymous visitors before a protected layout renders.
//
// The matcher deliberately excludes every marketing route. Matching them would
// opt them into dynamic rendering and undo the static-render work described in
// components/ChromeGate.js.
export async function middleware(request) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          for (const { name, value } of cookiesToSet) {
            request.cookies.set(name, value);
          }
          response = NextResponse.next({ request });
          for (const { name, value, options } of cookiesToSet) {
            response.cookies.set(name, value, options);
          }
        },
      },
    }
  );

  // Do not remove: this call is what refreshes an expiring token and writes
  // the rotated cookie onto the response.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const isProtected = pathname.startsWith('/dashboard') || pathname.startsWith('/admin');

  // /auth/* is intentionally NOT protected. A user clicking an invite or
  // password-reset link has no session yet; bouncing them to /login would make
  // it impossible to ever set a password.
  if (isProtected && !user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = '/login';
    loginUrl.search = `?next=${encodeURIComponent(pathname)}`;
    const redirectResponse = NextResponse.redirect(loginUrl);
    // Carry over any refreshed cookies, or the next request re-refreshes.
    for (const cookie of response.cookies.getAll()) {
      redirectResponse.cookies.set(cookie);
    }
    return redirectResponse;
  }

  return response;
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/auth/:path*'],
};
```

- [ ] **Step 2: Verify marketing routes are untouched**

Run: `npm run build`
Expected: the build output still lists `/`, `/services`, `/pricing`, and the
`/insights/[slug]` pages as static (`○` or `●`), not dynamic (`ƒ`). If any
marketing route flipped to dynamic, the matcher is wrong.

- [ ] **Step 3: Verify the redirect by hand**

Run `npm run dev`, then visit `http://localhost:3000/dashboard` in a private
window.
Expected: redirected to `/login?next=%2Fdashboard`. The page will 404 until
Task 6 — the redirect itself is what's being verified.

- [ ] **Step 4: Commit**

```bash
git add middleware.js
git commit -m "feat: refresh sessions and guard app routes in middleware"
```

---

## Task 6: Auth pages and routes

**Files:**
- Create: `app/auth.css`
- Create: `app/(auth)/layout.js`
- Create: `app/(auth)/login/page.js`
- Create: `app/(auth)/login/LoginForm.js`
- Create: `app/(auth)/set-password/page.js`
- Create: `app/(auth)/set-password/SetPasswordForm.js`
- Create: `app/(auth)/forgot/page.js`
- Create: `app/(auth)/forgot/ForgotForm.js`
- Create: `app/auth/callback/route.js`
- Create: `app/auth/signout/route.js`
- Modify: `components/ChromeGate.js`
- Modify: `app/robots.js`

**Interfaces:**
- Consumes: `createBrowserSupabase()`, `createServerSupabase()`.
- Produces: working `/login`, `/auth/callback?token_hash=…&type=…&next=…`, and a POST-only `/auth/signout`.

- [ ] **Step 1: Hide the marketing chrome on app routes**

Modify `components/ChromeGate.js`. Replace the `minimal` line with:

```js
  const minimal =
    pathname === '/lp' ||
    pathname.startsWith('/lp/') ||
    pathname === '/login' ||
    pathname.startsWith('/auth/') ||
    pathname.startsWith('/forgot') ||
    pathname.startsWith('/set-password') ||
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/admin');
```

And extend the file's opening comment:

```js
// Hides the site chrome on /lp and on every signed-in app route
// (/login, /auth/*, /dashboard/*, /admin/*), which have their own layouts.
```

This reuses the existing mechanism rather than adding a second root layout —
see the trade-off already documented in this file, which explains why route
groups with duplicate root layouts were rejected.

- [ ] **Step 2: Keep app routes out of the index — modify `app/robots.js`**

```js
export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard', '/admin', '/login', '/forgot', '/set-password', '/auth'],
    },
    sitemap: 'https://www.gobiya.com/sitemap.xml',
  };
}
```

- [ ] **Step 3: Create `app/auth.css`**

```css
/* Sign-in screens. Imported once by app/(auth)/layout.js. */

.auth {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 2rem 1.25rem;
  background: var(--lightest);
}

.auth__card {
  width: min(100%, 26rem);
  background: var(--bg);
  border: 1px solid var(--border);
  padding: 2.5rem;
}

.auth__mark { margin-bottom: 1.75rem; }

.auth__title {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  line-height: 1.2;
  color: var(--darkest);
  margin-bottom: 0.5rem;
}

.auth__intro {
  font-size: 0.9375rem;
  color: var(--hint);
  margin-bottom: 1.75rem;
}

.auth__field { margin-bottom: 1.25rem; }

.auth__label {
  display: block;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--hint);
  margin-bottom: 0.4rem;
}

.auth__input {
  width: 100%;
  padding: 0.75rem 0.875rem;
  font: inherit;
  color: var(--darkest);
  background: var(--bg);
  border: 1px solid var(--border-strong);
  border-radius: 0;
}

.auth__input:focus-visible {
  outline: 2px solid var(--main);
  outline-offset: 1px;
}

.auth__submit {
  width: 100%;
  padding: 0.8125rem 1rem;
  font: inherit;
  font-weight: 500;
  color: #fff;
  background: var(--darkest);
  border: 0;
  cursor: pointer;
  transition: background 0.2s var(--expo-out);
}

.auth__submit:hover:not(:disabled) { background: var(--main); }
.auth__submit:disabled { opacity: 0.6; cursor: default; }

.auth__error {
  padding: 0.75rem 0.875rem;
  margin-bottom: 1.25rem;
  font-size: 0.875rem;
  color: var(--main);
  border: 1px solid var(--main);
}

.auth__note {
  padding: 0.75rem 0.875rem;
  margin-bottom: 1.25rem;
  font-size: 0.875rem;
  color: var(--darkest);
  border: 1px solid var(--border);
  background: var(--lightest);
}

.auth__foot {
  margin-top: 1.5rem;
  font-size: 0.875rem;
  color: var(--hint);
}

.auth__foot a { color: var(--main); text-decoration: underline; }
```

- [ ] **Step 4: Create `app/(auth)/layout.js`**

```js
import '../auth.css';

export const metadata = {
  robots: { index: false, follow: false },
};

export default function AuthLayout({ children }) {
  return <div className="auth">{children}</div>;
}
```

- [ ] **Step 5: Create `app/(auth)/login/page.js`**

```js
import { LogoMark } from '../../../components/Logo';
import { getSessionUser } from '../../../lib/auth';
import { redirect } from 'next/navigation';
import LoginForm from './LoginForm';

export const metadata = {
  title: 'Sign in',
  robots: { index: false, follow: false },
};

// /auth/callback redirects here with ?error= when a link cannot be verified.
// Without these messages an expired invite would silently dump the user on a
// blank sign-in form with no idea what went wrong.
const ERRORS = {
  expired_link: 'That link has expired or was already used. Request a new one below.',
  invalid_link: "That link doesn't look right. Request a new one below.",
};

export default async function LoginPage({ searchParams }) {
  const user = await getSessionUser();
  if (user) redirect(user.role === 'admin' ? '/admin' : '/dashboard');

  const params = await searchParams;
  const next = typeof params?.next === 'string' ? params.next : '/dashboard';
  const errorMessage = ERRORS[params?.error];

  return (
    <div className="auth__card">
      <LogoMark className="auth__mark" size={34} />
      <h1 className="auth__title">Sign in</h1>
      <p className="auth__intro">Access your Gobiya dashboard.</p>

      {errorMessage ? (
        <p className="auth__note" role="alert">
          {errorMessage} <a href="/forgot">Send me a new link</a>.
        </p>
      ) : null}

      <LoginForm next={next} />
      <p className="auth__foot">
        <a href="/forgot">Forgot your password?</a>
      </p>
    </div>
  );
}
```

- [ ] **Step 6: Create `app/(auth)/login/LoginForm.js`**

```js
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserSupabase } from '../../../lib/supabase/client';

export default function LoginForm({ next }) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setBusy(true);
    setError('');

    const supabase = createBrowserSupabase();
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    if (signInError) {
      // Deliberately generic: distinguishing "no such account" from "wrong
      // password" tells an attacker which emails are registered.
      setError('That email and password combination did not work.');
      setBusy(false);
      return;
    }

    // refresh() so the server layouts re-run and pick up the new session cookie.
    router.replace(next.startsWith('/') ? next : '/dashboard');
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      {error ? (
        <p className="auth__error" role="alert">
          {error}
        </p>
      ) : null}

      <div className="auth__field">
        <label className="auth__label" htmlFor="email">
          Email
        </label>
        <input
          className="auth__input"
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="auth__field">
        <label className="auth__label" htmlFor="password">
          Password
        </label>
        <input
          className="auth__input"
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button className="auth__submit" type="submit" disabled={busy}>
        {busy ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  );
}
```

- [ ] **Step 7: Create `app/auth/callback/route.js`**

```js
import { NextResponse } from 'next/server';
import { createServerSupabase } from '../../../lib/supabase/server';

// Invite and password-reset links land here. We email links built around a
// token_hash rather than using Supabase's own delivery, so this route verifies
// the OTP server-side and sets the session cookie. That avoids the URL-fragment
// handling an implicit-flow callback would need.
export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const tokenHash = searchParams.get('token_hash');
  const type = searchParams.get('type');
  const next = searchParams.get('next') || '/dashboard';

  if (!tokenHash || !type) {
    return NextResponse.redirect(`${origin}/login?error=invalid_link`);
  }

  const supabase = await createServerSupabase();
  const { error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash });

  if (error) {
    return NextResponse.redirect(`${origin}/login?error=expired_link`);
  }

  return NextResponse.redirect(`${origin}${next.startsWith('/') ? next : '/dashboard'}`);
}
```

- [ ] **Step 8: Create `app/auth/signout/route.js`**

```js
import { NextResponse } from 'next/server';
import { createServerSupabase } from '../../../lib/supabase/server';

// POST only. A GET sign-out can be triggered by any image tag or link
// prefetch on another site.
export async function POST(request) {
  const supabase = await createServerSupabase();
  await supabase.auth.signOut();
  return NextResponse.redirect(new URL('/login', request.url), { status: 303 });
}
```

- [ ] **Step 9: Create `app/(auth)/set-password/page.js`**

```js
import { LogoMark } from '../../../components/Logo';
import { getSessionUser } from '../../../lib/auth';
import { redirect } from 'next/navigation';
import SetPasswordForm from './SetPasswordForm';

export const metadata = {
  title: 'Set your password',
  robots: { index: false, follow: false },
};

// Reached only with a session already established by /auth/callback. Anyone
// arriving without one gets sent to /login, because there is nothing to update.
export default async function SetPasswordPage() {
  const user = await getSessionUser();
  if (!user) redirect('/login?error=expired_link');

  return (
    <div className="auth__card">
      <LogoMark className="auth__mark" size={34} />
      <h1 className="auth__title">Set your password</h1>
      <p className="auth__intro">
        Choose a password for {user.email}. You&rsquo;ll use it to sign in from now on.
      </p>
      <SetPasswordForm role={user.role} />
    </div>
  );
}
```

- [ ] **Step 10: Create `app/(auth)/set-password/SetPasswordForm.js`**

```js
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserSupabase } from '../../../lib/supabase/client';

const MIN_LENGTH = 10;

export default function SetPasswordForm({ role }) {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setError('');

    if (password.length < MIN_LENGTH) {
      setError(`Use at least ${MIN_LENGTH} characters.`);
      return;
    }
    if (password !== confirm) {
      setError('The two passwords do not match.');
      return;
    }

    setBusy(true);
    const supabase = createBrowserSupabase();
    const { error: updateError } = await supabase.auth.updateUser({ password });

    if (updateError) {
      setError(updateError.message);
      setBusy(false);
      return;
    }

    router.replace(role === 'admin' ? '/admin' : '/dashboard');
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      {error ? (
        <p className="auth__error" role="alert">
          {error}
        </p>
      ) : null}

      <div className="auth__field">
        <label className="auth__label" htmlFor="password">
          New password
        </label>
        <input
          className="auth__input"
          id="password"
          type="password"
          autoComplete="new-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="auth__field">
        <label className="auth__label" htmlFor="confirm">
          Confirm password
        </label>
        <input
          className="auth__input"
          id="confirm"
          type="password"
          autoComplete="new-password"
          required
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
      </div>

      <button className="auth__submit" type="submit" disabled={busy}>
        {busy ? 'Saving…' : 'Save password'}
      </button>
    </form>
  );
}
```

- [ ] **Step 11: Create `app/(auth)/forgot/page.js`**

```js
import { LogoMark } from '../../../components/Logo';
import ForgotForm from './ForgotForm';

export const metadata = {
  title: 'Reset your password',
  robots: { index: false, follow: false },
};

export default function ForgotPage() {
  return (
    <div className="auth__card">
      <LogoMark className="auth__mark" size={34} />
      <h1 className="auth__title">Reset your password</h1>
      <p className="auth__intro">
        Enter your email and we&rsquo;ll send you a link to choose a new password.
      </p>
      <ForgotForm />
      <p className="auth__foot">
        <a href="/login">Back to sign in</a>
      </p>
    </div>
  );
}
```

- [ ] **Step 12: Create `app/(auth)/forgot/ForgotForm.js`**

The POST target `/api/auth/forgot` is built in Task 9, alongside the other
Resend email path. Until then this form renders and validates but the request
404s — that is expected and is called out in Task 9's verification.

```js
'use client';

import { useState } from 'react';

export default function ForgotForm() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setBusy(true);

    await fetch('/api/auth/forgot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    // Always report success, whatever the response. Reporting "no such
    // account" would turn this form into an account-enumeration oracle.
    setSent(true);
    setBusy(false);
  }

  if (sent) {
    return (
      <p className="auth__note" role="status">
        If an account exists for {email}, a reset link is on its way. The link
        expires in one hour.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="auth__field">
        <label className="auth__label" htmlFor="email">
          Email
        </label>
        <input
          className="auth__input"
          id="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button className="auth__submit" type="submit" disabled={busy}>
        {busy ? 'Sending…' : 'Send reset link'}
      </button>
    </form>
  );
}
```

- [ ] **Step 13: Verify the login screen renders**

Run `npm run dev` and visit `http://localhost:3000/login`.
Expected: the card renders with the Gobiya mark, no marketing header or footer,
and no chat bubble. Submitting bad credentials shows the generic error.

- [ ] **Step 14: Run the build**

Run: `npm run build`
Expected: succeeds, and marketing routes are still static.

- [ ] **Step 15: Commit**

```bash
git add app/auth.css app/\(auth\)/ app/auth/ components/ChromeGate.js app/robots.js
git commit -m "feat: add sign-in, set-password, forgot, and callback routes"
```

---

## Task 7: Client dashboard shell

**Files:**
- Create: `app/dashboard.css`
- Create: `components/dashboard/Sidebar.js`
- Create: `components/dashboard/TopBar.js`
- Create: `components/dashboard/StubCard.js`
- Create: `app/(dashboard)/layout.js`
- Create: `app/(dashboard)/dashboard/page.js`

**Interfaces:**
- Consumes: `requireUser()` from `lib/auth.js`.
- Produces: `<Sidebar items={[{ label, href, children? }]} heading />`, `<TopBar title user />`, `<StubCard title body badge />`.

- [ ] **Step 1: Create `app/dashboard.css`**

```css
/* App shell for /dashboard and /admin. Imported by both layouts. */

.app {
  display: grid;
  grid-template-columns: 15rem 1fr;
  min-height: 100vh;
  background: var(--lightest);
}

.app__sidebar {
  background: var(--darkest);
  color: var(--bg);
  padding: 1.5rem 0;
  display: flex;
  flex-direction: column;
}

.app__brand {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0 1.5rem 1.5rem;
  border-bottom: 1px solid var(--border-light);
}

.app__brand-word {
  font-family: var(--font-heading);
  font-size: 1.0625rem;
  letter-spacing: 0.02em;
}

.app__nav { padding: 1.25rem 0.75rem; flex: 1; }

.app__nav-heading {
  padding: 0 0.75rem 0.5rem;
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--medium);
}

.app__link {
  display: block;
  padding: 0.5rem 0.75rem;
  font-size: 0.9375rem;
  color: var(--light);
  border-left: 2px solid transparent;
  transition: color 0.15s var(--expo-out), border-color 0.15s var(--expo-out);
}

.app__link:hover { color: var(--bg); }

.app__link--active {
  color: var(--bg);
  border-left-color: var(--main);
}

.app__sublink {
  display: block;
  padding: 0.3125rem 0.75rem 0.3125rem 1.5rem;
  font-size: 0.875rem;
  color: var(--dark);
}

.app__sublink:hover { color: var(--light); }

.app__sidebar-foot {
  padding: 1.25rem 1.5rem 0;
  border-top: 1px solid var(--border-light);
}

.app__signout {
  font: inherit;
  font-size: 0.875rem;
  color: var(--light);
  background: none;
  border: 0;
  padding: 0;
  cursor: pointer;
}

.app__signout:hover { color: var(--main); }

.app__main { display: flex; flex-direction: column; min-width: 0; }

.app__topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 2rem;
  background: var(--bg);
  border-bottom: 1px solid var(--border);
}

.app__topbar-title {
  font-family: var(--font-heading);
  font-size: 1.0625rem;
  color: var(--darkest);
}

.app__topbar-user { font-size: 0.875rem; color: var(--hint); }

.app__content { padding: 2rem; flex: 1; }

.app__welcome {
  font-family: var(--font-heading);
  font-size: clamp(1.5rem, 3vw, 2rem);
  line-height: 1.15;
  color: var(--darkest);
  margin-bottom: 0.375rem;
}

.app__welcome-sub { color: var(--hint); margin-bottom: 2rem; }

.app__cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
  gap: 1rem;
}

.card {
  background: var(--bg);
  border: 1px solid var(--border);
  padding: 1.5rem;
}

.card__badge {
  display: inline-block;
  margin-bottom: 0.75rem;
  padding: 0.1875rem 0.5rem;
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--hint);
  border: 1px solid var(--border);
}

.card__title {
  font-family: var(--font-heading);
  font-size: 1.0625rem;
  color: var(--darkest);
  margin-bottom: 0.375rem;
}

.card__body { font-size: 0.9375rem; color: var(--hint); }

@media (max-width: 60rem) {
  .app { grid-template-columns: 1fr; }
  .app__sidebar { position: static; }
  .app__content { padding: 1.25rem; }
  .app__topbar { padding: 0.875rem 1.25rem; }
}
```

- [ ] **Step 2: Create `components/dashboard/Sidebar.js`**

```js
'use client';

import { usePathname } from 'next/navigation';
import { LogoMark } from '../Logo';

// items: [{ label, href, children?: [{ label, href }] }]
export default function Sidebar({ items, heading }) {
  const pathname = usePathname();

  return (
    <aside className="app__sidebar">
      <a className="app__brand" href="/">
        <LogoMark size={26} stroke="#ffffff" />
        <span className="app__brand-word">Gobiya</span>
      </a>

      <nav className="app__nav" aria-label={heading}>
        <p className="app__nav-heading">{heading}</p>
        {items.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <div key={item.href}>
              <a
                className={`app__link${active ? ' app__link--active' : ''}`}
                href={item.href}
                aria-current={active ? 'page' : undefined}
              >
                {item.label}
              </a>
              {active && item.children
                ? item.children.map((child) => (
                    <a className="app__sublink" key={child.href} href={child.href}>
                      {child.label}
                    </a>
                  ))
                : null}
            </div>
          );
        })}
      </nav>

      <div className="app__sidebar-foot">
        <form action="/auth/signout" method="post">
          <button className="app__signout" type="submit">
            Sign out
          </button>
        </form>
      </div>
    </aside>
  );
}
```

- [ ] **Step 3: Confirm `LogoMark` accepts a `stroke` prop**

Run: `grep -n "export function LogoMark" -A 12 components/Logo.js`
Expected: the signature accepts `stroke` (and `size`). If it does not, pass
only `size` in `Sidebar.js` and add `.app__brand svg { color: currentColor }`
to `app/dashboard.css` instead. Do not change `Logo.js` — it is used across
the marketing site.

- [ ] **Step 4: Create `components/dashboard/TopBar.js`**

```js
export default function TopBar({ title, user }) {
  return (
    <header className="app__topbar">
      <h1 className="app__topbar-title">{title}</h1>
      <span className="app__topbar-user">{user.fullName || user.email}</span>
    </header>
  );
}
```

- [ ] **Step 5: Create `components/dashboard/StubCard.js`**

```js
// Placeholder for a feature slice that has not shipped yet. Every card says
// plainly that it is not ready, so nothing in the shell looks broken.
export default function StubCard({ title, body, badge = 'Coming soon' }) {
  return (
    <article className="card">
      <span className="card__badge">{badge}</span>
      <h2 className="card__title">{title}</h2>
      <p className="card__body">{body}</p>
    </article>
  );
}
```

- [ ] **Step 6: Create `app/(dashboard)/layout.js`**

```js
import '../dashboard.css';
import Sidebar from '../../components/dashboard/Sidebar';
import { requireUser } from '../../lib/auth';

export const metadata = {
  robots: { index: false, follow: false },
};

const NAV = [
  { label: 'Overview', href: '/dashboard' },
  { label: 'Settings', href: '/dashboard/settings' },
];

export default async function DashboardLayout({ children }) {
  // Middleware already turned away anonymous requests; this is the check that
  // guarantees a profile exists before any child renders.
  await requireUser();

  return (
    <div className="app">
      <Sidebar items={NAV} heading="Dashboard" />
      <div className="app__main">{children}</div>
    </div>
  );
}
```

- [ ] **Step 7: Create `app/(dashboard)/dashboard/page.js`**

```js
import TopBar from '../../../components/dashboard/TopBar';
import StubCard from '../../../components/dashboard/StubCard';
import { requireUser } from '../../../lib/auth';

export const metadata = {
  title: 'Dashboard',
  robots: { index: false, follow: false },
};

export default async function DashboardPage() {
  const user = await requireUser();
  const businessName = user.client?.name;

  return (
    <>
      <TopBar title="Dashboard" user={user} />
      <div className="app__content">
        <h2 className="app__welcome">
          Welcome back{businessName ? `, ${businessName}` : ''}
        </h2>
        <p className="app__welcome-sub">
          Your tools will appear here as they come online.
        </p>

        <div className="app__cards">
          <StubCard
            title="Google Reviews"
            body="Read, reply to, and request reviews from your Google Business Profile."
          />
          <StubCard
            title="AI Website Audit"
            body="See how your site reads to search engines and AI assistants."
          />
          <StubCard
            title="Research tools"
            body="DNS, WHOIS, SSL, reputation, and the rest of the toolkit, with your own usage limits."
          />
        </div>
      </div>
    </>
  );
}
```

- [ ] **Step 8: Verify the shell end to end**

Create a test client account through the Supabase dashboard
(Authentication → Users → Add user, with "Auto confirm" on), then sign in at
`/login`.
Expected: `/dashboard` renders with the navy sidebar, "Welcome back", and three
"Coming soon" cards. The marketing header and footer are absent. "Sign out"
returns you to `/login`, and revisiting `/dashboard` redirects to `/login`.

- [ ] **Step 9: Commit**

```bash
git add app/dashboard.css app/\(dashboard\)/ components/dashboard/
git commit -m "feat: add client dashboard shell"
```

---

## Task 8: Admin shell and client list

**Files:**
- Create: `lib/clients.js`
- Create: `app/(admin)/layout.js`
- Create: `app/(admin)/admin/page.js`
- Create: `app/(admin)/admin/clients/page.js`
- Create: `tests/unit/client-validation.test.js`
- Modify: `app/dashboard.css`

**Interfaces:**
- Consumes: `requireAdmin()`, `createServerSupabase()`, `createAdminSupabase()`.
- Produces:
  - `validateClientInput({ name, contactEmail, website })` → `{ ok: true, value: { name, contactEmail, website } }` or `{ ok: false, errors: { field: message } }`
  - `listClients()` → array of `{ id, name, website, contact_email, status, created_at }`
  - `createClientRecord({ name, contactEmail, website, createdBy })` → `{ ok, client }` or `{ ok: false, error }`
  - `deleteClientRecord(id)` → `{ ok }` (used as the compensating action in Task 9)

- [ ] **Step 1: Write the failing test — `tests/unit/client-validation.test.js`**

```js
import { describe, it, expect } from 'vitest';
import { validateClientInput } from '../../lib/clients.js';

describe('validateClientInput', () => {
  it('accepts a well-formed client', () => {
    const result = validateClientInput({
      name: '  Acme Dental  ',
      contactEmail: 'Owner@Acme.com',
      website: 'acme.com',
    });
    expect(result).toEqual({
      ok: true,
      value: {
        name: 'Acme Dental',
        contactEmail: 'owner@acme.com',
        website: 'https://acme.com',
      },
    });
  });

  it('requires a business name', () => {
    const result = validateClientInput({ name: '   ', contactEmail: 'a@b.com' });
    expect(result.ok).toBe(false);
    expect(result.errors.name).toMatch(/business name/i);
  });

  it('rejects a malformed email', () => {
    const result = validateClientInput({ name: 'Acme', contactEmail: 'not-an-email' });
    expect(result.ok).toBe(false);
    expect(result.errors.contactEmail).toMatch(/valid email/i);
  });

  it('leaves an empty website as null', () => {
    const result = validateClientInput({ name: 'Acme', contactEmail: 'a@b.com', website: '' });
    expect(result.ok).toBe(true);
    expect(result.value.website).toBeNull();
  });

  it('keeps an explicit https scheme', () => {
    const result = validateClientInput({
      name: 'Acme',
      contactEmail: 'a@b.com',
      website: 'https://acme.com/path',
    });
    expect(result.value.website).toBe('https://acme.com/path');
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- tests/unit/client-validation.test.js`
Expected: FAIL — cannot resolve `../../lib/clients.js`.

- [ ] **Step 3: Create `lib/clients.js`**

```js
import { createServerSupabase } from './supabase/server.js';
import { createAdminSupabase } from './supabase/admin.js';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Pure — no I/O — so it is cheap to test and safe to call from a form action
// before touching the database.
export function validateClientInput({ name, contactEmail, website }) {
  const errors = {};

  const trimmedName = String(name ?? '').trim();
  if (!trimmedName) errors.name = 'Enter the business name.';

  const trimmedEmail = String(contactEmail ?? '').trim().toLowerCase();
  if (!trimmedEmail) {
    errors.contactEmail = 'Enter a contact email.';
  } else if (!EMAIL_PATTERN.test(trimmedEmail)) {
    errors.contactEmail = 'Enter a valid email address.';
  }

  let normalizedWebsite = String(website ?? '').trim();
  if (!normalizedWebsite) {
    normalizedWebsite = null;
  } else if (!/^https?:\/\//i.test(normalizedWebsite)) {
    normalizedWebsite = `https://${normalizedWebsite}`;
  }

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    value: { name: trimmedName, contactEmail: trimmedEmail, website: normalizedWebsite },
  };
}

// Reads through the caller's own session, so the admin RLS policy is what
// grants visibility — not the service role.
export async function listClients() {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from('clients')
    .select('id, name, website, contact_email, status, created_at')
    .order('created_at', { ascending: false });

  if (error) throw new Error(`Could not load clients: ${error.message}`);
  return data ?? [];
}

// Uses the service role: this runs in the same operation as creating an auth
// user, which only the service role can do.
export async function createClientRecord({ name, contactEmail, website, createdBy }) {
  const admin = createAdminSupabase();
  const { data, error } = await admin
    .from('clients')
    .insert({ name, contact_email: contactEmail, website, created_by: createdBy })
    .select('id, name, website, contact_email, status, created_at')
    .single();

  if (error) {
    if (error.code === '23505') {
      return { ok: false, error: 'A client with that contact email already exists.' };
    }
    return { ok: false, error: `Could not create the client: ${error.message}` };
  }
  return { ok: true, client: data };
}

// Compensating action for a failed invite — see lib/emails/invite.js callers.
export async function deleteClientRecord(id) {
  const admin = createAdminSupabase();
  const { error } = await admin.from('clients').delete().eq('id', id);
  return { ok: !error };
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test -- tests/unit/client-validation.test.js`
Expected: PASS, 5 tests.

- [ ] **Step 5: Append table styles to `app/dashboard.css`**

```css
/* ── Admin tables ── */

.table {
  width: 100%;
  border-collapse: collapse;
  background: var(--bg);
  border: 1px solid var(--border);
}

.table th {
  padding: 0.75rem 1rem;
  text-align: left;
  font-size: 0.6875rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--hint);
  border-bottom: 1px solid var(--border);
}

.table td {
  padding: 0.875rem 1rem;
  font-size: 0.9375rem;
  color: var(--darkest);
  border-bottom: 1px solid var(--border);
}

.table tr:last-child td { border-bottom: 0; }

.table__empty {
  padding: 2.5rem 1rem;
  text-align: center;
  color: var(--hint);
}

.status {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.status--active { color: var(--darkest); }
.status--paused { color: var(--main); }

.app__actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.btn-app {
  display: inline-block;
  padding: 0.625rem 1.125rem;
  font: inherit;
  font-size: 0.9375rem;
  color: #fff;
  background: var(--darkest);
  border: 0;
  cursor: pointer;
  transition: background 0.2s var(--expo-out);
}

.btn-app:hover:not(:disabled) { background: var(--main); }
.btn-app:disabled { opacity: 0.6; cursor: default; }

.btn-app--quiet {
  color: var(--darkest);
  background: transparent;
  border: 1px solid var(--border-strong);
}

.btn-app--quiet:hover:not(:disabled) { background: var(--lightest); color: var(--darkest); }
```

- [ ] **Step 6: Create `app/(admin)/layout.js`**

```js
import '../dashboard.css';
import Sidebar from '../../components/dashboard/Sidebar';
import { requireAdmin } from '../../lib/auth';

export const metadata = {
  robots: { index: false, follow: false },
};

const NAV = [
  { label: 'Overview', href: '/admin' },
  { label: 'Clients', href: '/admin/clients' },
];

export default async function AdminLayout({ children }) {
  await requireAdmin();

  return (
    <div className="app">
      <Sidebar items={NAV} heading="Admin" />
      <div className="app__main">{children}</div>
    </div>
  );
}
```

- [ ] **Step 7: Create `app/(admin)/admin/page.js`**

```js
import TopBar from '../../../components/dashboard/TopBar';
import StubCard from '../../../components/dashboard/StubCard';
import { requireAdmin } from '../../../lib/auth';
import { listClients } from '../../../lib/clients';

export const metadata = {
  title: 'Admin',
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const user = await requireAdmin();
  const clients = await listClients();

  return (
    <>
      <TopBar title="Admin" user={user} />
      <div className="app__content">
        <h2 className="app__welcome">Overview</h2>
        <p className="app__welcome-sub">Gobiya internal console.</p>

        <div className="app__cards">
          <article className="card">
            <span className="card__badge">Live</span>
            <h2 className="card__title">{clients.length}</h2>
            <p className="card__body">
              {clients.length === 1 ? 'client account' : 'client accounts'}
            </p>
          </article>
          <StubCard
            title="Form submissions"
            body="Contact, onboarding, and landing-page submissions, stored and searchable."
          />
          <StubCard
            title="Review activity"
            body="Google review volume and response rate across every client."
          />
        </div>
      </div>
    </>
  );
}
```

- [ ] **Step 8: Create `app/(admin)/admin/clients/page.js`**

The "New client" button targets `/admin/clients/new`, which Task 9 creates.

```js
import TopBar from '../../../../components/dashboard/TopBar';
import { requireAdmin } from '../../../../lib/auth';
import { listClients } from '../../../../lib/clients';

export const metadata = {
  title: 'Clients',
  robots: { index: false, follow: false },
};

function formatDate(value) {
  return new Date(value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default async function ClientsPage() {
  const user = await requireAdmin();
  const clients = await listClients();

  return (
    <>
      <TopBar title="Clients" user={user} />
      <div className="app__content">
        <div className="app__actions">
          <p className="app__welcome-sub" style={{ marginBottom: 0 }}>
            {clients.length} {clients.length === 1 ? 'account' : 'accounts'}
          </p>
          <a className="btn-app" href="/admin/clients/new">
            New client
          </a>
        </div>

        {clients.length === 0 ? (
          <div className="table__empty">No clients yet. Create the first one.</div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Business</th>
                <th scope="col">Contact</th>
                <th scope="col">Website</th>
                <th scope="col">Status</th>
                <th scope="col">Added</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id}>
                  <td>{client.name}</td>
                  <td>{client.contact_email}</td>
                  <td>
                    {client.website ? (
                      <a href={client.website} target="_blank" rel="noreferrer">
                        {client.website.replace(/^https?:\/\//, '')}
                      </a>
                    ) : (
                      '—'
                    )}
                  </td>
                  <td>
                    <span className={`status status--${client.status}`}>{client.status}</span>
                  </td>
                  <td>{formatDate(client.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
```

- [ ] **Step 9: Verify admin access control by hand**

Promote your own account with the SQL in `supabase/README.md`, sign out, sign
back in, and visit `/admin`.
Expected: the admin console renders. Then sign in as the Task 7 test client and
visit `/admin`.
Expected: a 404 page, not a 403 and not the console.

- [ ] **Step 10: Commit**

```bash
git add lib/clients.js app/\(admin\)/ app/dashboard.css tests/unit/client-validation.test.js
git commit -m "feat: add admin shell and client list"
```

---

## Task 9: Create client, send invite, and password reset

**Files:**
- Create: `lib/emails/invite.js`
- Create: `app/(admin)/admin/clients/new/page.js`
- Create: `app/(admin)/admin/clients/new/NewClientForm.js`
- Create: `app/(admin)/admin/clients/actions.js`
- Create: `app/(admin)/admin/clients/ResendInviteButton.js`
- Create: `app/api/auth/forgot/route.js`
- Create: `tests/unit/invite-email.test.js`
- Modify: `app/(admin)/admin/clients/page.js` (add the resend-invite column)
- Reuse: `components/CopyButton.js` (already exists — do not write another)

**Interfaces:**
- Consumes: `validateClientInput`, `createClientRecord`, `deleteClientRecord` from `lib/clients.js`; `createAdminSupabase()`; `siteUrl()`; `<CopyButton text label />` from `components/CopyButton.js`.
- Produces:
  - `buildInviteEmail({ businessName, actionLink })` → `{ subject, html }`
  - `sendInviteEmail({ to, businessName, actionLink })` → `{ ok }` or `{ ok: false, error }`
  - `buildRecoveryEmail({ actionLink })` → `{ subject, html }`
  - `sendRecoveryEmail({ to, actionLink })` → `{ ok }` or `{ ok: false, error }`
  - `createClientAction(prevState, formData)` — a Server Action returning `{ errors }`, `{ error }`, or `{ ok: true, inviteLink, emailSent }`
  - `resendInviteAction(prevState, formData)` — a Server Action reading `clientId` from the form data, returning `{ ok: true, emailSent }` or `{ error }`

- [ ] **Step 1: Write the failing test — `tests/unit/invite-email.test.js`**

```js
import { describe, it, expect } from 'vitest';
import { buildInviteEmail, buildRecoveryEmail } from '../../lib/emails/invite.js';

describe('buildInviteEmail', () => {
  it('names the business in the subject', () => {
    const { subject } = buildInviteEmail({
      businessName: 'Acme Dental',
      actionLink: 'https://example.com/auth/callback?token_hash=abc&type=invite',
    });
    expect(subject).toContain('Acme Dental');
  });

  it('embeds the action link', () => {
    const link = 'https://example.com/auth/callback?token_hash=abc&type=invite';
    const { html } = buildInviteEmail({ businessName: 'Acme Dental', actionLink: link });
    expect(html).toContain(link);
  });

  it('escapes HTML in the business name', () => {
    const { html } = buildInviteEmail({
      businessName: '<script>alert(1)</script>',
      actionLink: 'https://example.com/x',
    });
    expect(html).not.toContain('<script>');
    expect(html).toContain('&lt;script&gt;');
  });
});

describe('buildRecoveryEmail', () => {
  it('embeds the action link and mentions expiry', () => {
    const link = 'https://example.com/auth/callback?token_hash=xyz&type=recovery';
    const { html, subject } = buildRecoveryEmail({ actionLink: link });
    expect(html).toContain(link);
    expect(html).toMatch(/hour/i);
    expect(subject).toMatch(/password/i);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- tests/unit/invite-email.test.js`
Expected: FAIL — cannot resolve `../../lib/emails/invite.js`.

- [ ] **Step 3: Create `lib/emails/invite.js`**

```js
// Invite and password-reset emails. Supabase's own delivery is bypassed so
// these go out through the Resend account the rest of the site already uses,
// in Gobiya's own template. See lib/leadForms.js for the existing pattern.

import { Resend } from 'resend';
import { BRAND_NAVY, BRAND_CARMINE } from '../brand.js';

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function shell({ heading, body, actionLink, actionLabel, footnote }) {
  return `
    <div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;">
      <p style="font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:${BRAND_NAVY};margin-bottom:24px;">Gobiya</p>
      <h1 style="font-size:22px;font-weight:600;color:${BRAND_NAVY};margin-bottom:12px;">${heading}</h1>
      <p style="font-size:15px;line-height:1.6;color:#3d4a5c;margin-bottom:28px;">${body}</p>
      <a href="${actionLink}" style="display:inline-block;padding:13px 22px;background:${BRAND_NAVY};color:#ffffff;font-size:15px;text-decoration:none;">${actionLabel}</a>
      <p style="font-size:13px;line-height:1.6;color:#7e93ab;margin-top:28px;">${footnote}</p>
      <p style="font-size:12px;line-height:1.6;color:#7e93ab;margin-top:24px;word-break:break-all;">
        If the button doesn't work, paste this into your browser:<br />
        <span style="color:${BRAND_CARMINE};">${actionLink}</span>
      </p>
    </div>`;
}

export function buildInviteEmail({ businessName, actionLink }) {
  const safeName = escapeHtml(businessName);
  return {
    subject: `Your Gobiya dashboard is ready — ${businessName}`,
    html: shell({
      heading: 'Set up your dashboard',
      body: `We've created a Gobiya dashboard for <strong>${safeName}</strong>. Choose a password to get in.`,
      actionLink,
      actionLabel: 'Set your password',
      footnote: 'This link can only be used once. If it has expired, ask us for a new one.',
    }),
  };
}

export function buildRecoveryEmail({ actionLink }) {
  return {
    subject: 'Reset your Gobiya password',
    html: shell({
      heading: 'Reset your password',
      body: 'Someone asked to reset the password on your Gobiya dashboard. If that was you, choose a new one below.',
      actionLink,
      actionLabel: 'Choose a new password',
      footnote:
        "This link expires in one hour and can only be used once. If you didn't request it, you can ignore this email.",
    }),
  };
}

async function send({ to, subject, html }) {
  try {
    const { error } = await resend.emails.send({
      from: process.env.ONBOARDING_FROM_EMAIL || 'Gobiya <onboarding@gobiya.com>',
      to,
      subject,
      html,
    });
    if (error) {
      console.error('Resend error:', error);
      return { ok: false, error: 'The email could not be sent.' };
    }
    return { ok: true };
  } catch (err) {
    console.error('Email send failed:', err);
    return { ok: false, error: 'The email could not be sent.' };
  }
}

export function sendInviteEmail({ to, businessName, actionLink }) {
  return send({ to, ...buildInviteEmail({ businessName, actionLink }) });
}

export function sendRecoveryEmail({ to, actionLink }) {
  return send({ to, ...buildRecoveryEmail({ actionLink }) });
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test -- tests/unit/invite-email.test.js`
Expected: PASS, 4 tests.

- [ ] **Step 5: Create `app/(admin)/admin/clients/actions.js`**

```js
'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '../../../../lib/auth';
import {
  validateClientInput,
  createClientRecord,
  deleteClientRecord,
} from '../../../../lib/clients';
import { createAdminSupabase } from '../../../../lib/supabase/admin';
import { siteUrl } from '../../../../lib/supabase/env';
import { sendInviteEmail } from '../../../../lib/emails/invite';

export async function createClientAction(prevState, formData) {
  const admin = await requireAdmin();

  const validation = validateClientInput({
    name: formData.get('name'),
    contactEmail: formData.get('contactEmail'),
    website: formData.get('website'),
  });
  if (!validation.ok) return { errors: validation.errors };

  const { name, contactEmail, website } = validation.value;

  const created = await createClientRecord({
    name,
    contactEmail,
    website,
    createdBy: admin.id,
  });
  if (!created.ok) return { error: created.error };

  // generateLink creates the auth user and returns a one-time token without
  // sending anything, so the email goes out through Resend instead of
  // Supabase's SMTP.
  const supabase = createAdminSupabase();
  const { data, error } = await supabase.auth.admin.generateLink({
    type: 'invite',
    email: contactEmail,
    options: { data: { client_id: created.client.id } },
  });

  if (error) {
    // Compensating delete: without this a failed invite leaves an orphan
    // client row that blocks retrying the same email (unique index).
    await deleteClientRecord(created.client.id);
    const duplicate = /already been registered|already exists/i.test(error.message);
    return {
      error: duplicate
        ? 'An account already exists for that email address.'
        : `Could not create the login: ${error.message}`,
    };
  }

  const inviteLink =
    `${siteUrl()}/auth/callback` +
    `?token_hash=${encodeURIComponent(data.properties.hashed_token)}` +
    `&type=invite&next=${encodeURIComponent('/set-password')}`;

  const sent = await sendInviteEmail({
    to: contactEmail,
    businessName: name,
    actionLink: inviteLink,
  });

  revalidatePath('/admin/clients');

  // The client and login exist either way, so the link is always returned for
  // the admin to copy if the email did not go out.
  return { ok: true, inviteLink, emailSent: sent.ok };
}

// Re-sends an invite for a client that already exists — the recovery path when
// the first email bounced, went to spam, or expired before it was opened.
export async function resendInviteAction(prevState, formData) {
  await requireAdmin();

  const clientId = formData.get('clientId');
  if (!clientId) return { error: 'Missing client.' };

  const supabase = createAdminSupabase();
  const { data: client, error: lookupError } = await supabase
    .from('clients')
    .select('id, name, contact_email')
    .eq('id', clientId)
    .single();

  if (lookupError || !client) return { error: 'That client no longer exists.' };

  // 'invite' only works while the user has never signed in. Once they have,
  // Supabase rejects it as already registered, so fall back to 'recovery',
  // which reaches the same /set-password screen.
  let type = 'invite';
  let { data, error } = await supabase.auth.admin.generateLink({
    type,
    email: client.contact_email,
    options: { data: { client_id: client.id } },
  });

  if (error) {
    type = 'recovery';
    ({ data, error } = await supabase.auth.admin.generateLink({
      type,
      email: client.contact_email,
    }));
  }

  if (error || !data?.properties?.hashed_token) {
    return { error: `Could not generate a link: ${error?.message ?? 'unknown error'}` };
  }

  const actionLink =
    `${siteUrl()}/auth/callback` +
    `?token_hash=${encodeURIComponent(data.properties.hashed_token)}` +
    `&type=${type}&next=${encodeURIComponent('/set-password')}`;

  const sent =
    type === 'invite'
      ? await sendInviteEmail({
          to: client.contact_email,
          businessName: client.name,
          actionLink,
        })
      : await sendRecoveryEmail({ to: client.contact_email, actionLink });

  if (!sent.ok) return { error: sent.error };

  return { ok: true, emailSent: true };
}
```

Update the import at the top of this file to pull in both senders:

```js
import { sendInviteEmail, sendRecoveryEmail } from '../../../../lib/emails/invite';
```

- [ ] **Step 6: Create `app/(admin)/admin/clients/new/NewClientForm.js`**

```js
'use client';

import { useActionState } from 'react';
import CopyButton from '../../../../../components/CopyButton';
import { createClientAction } from '../actions';

const INITIAL = {};

export default function NewClientForm() {
  const [state, formAction, pending] = useActionState(createClientAction, INITIAL);

  if (state?.ok) {
    return (
      <div className="card">
        <h2 className="card__title">Client created</h2>
        <p className="card__body" style={{ marginBottom: '1rem' }}>
          {state.emailSent
            ? 'The invite email is on its way.'
            : 'The invite email could not be sent. Copy the link below and send it yourself.'}
        </p>
        <p
          className="card__body"
          style={{ wordBreak: 'break-all', marginBottom: '0.75rem' }}
        >
          <code>{state.inviteLink}</code>
        </p>
        <p style={{ marginBottom: '1.25rem' }}>
          <CopyButton text={state.inviteLink} label="Copy invite link" />
        </p>
        <a className="btn-app" href="/admin/clients">
          Back to clients
        </a>
      </div>
    );
  }

  return (
    <form action={formAction} className="card" noValidate>
      {state?.error ? (
        <p className="auth__error" role="alert">
          {state.error}
        </p>
      ) : null}

      <div className="auth__field">
        <label className="auth__label" htmlFor="name">
          Business name
        </label>
        <input className="auth__input" id="name" name="name" type="text" required />
        {state?.errors?.name ? (
          <p className="auth__error" role="alert">
            {state.errors.name}
          </p>
        ) : null}
      </div>

      <div className="auth__field">
        <label className="auth__label" htmlFor="contactEmail">
          Contact email
        </label>
        <input
          className="auth__input"
          id="contactEmail"
          name="contactEmail"
          type="email"
          required
        />
        {state?.errors?.contactEmail ? (
          <p className="auth__error" role="alert">
            {state.errors.contactEmail}
          </p>
        ) : null}
      </div>

      <div className="auth__field">
        <label className="auth__label" htmlFor="website">
          Website <span style={{ textTransform: 'none' }}>(optional)</span>
        </label>
        <input className="auth__input" id="website" name="website" type="text" />
      </div>

      <button className="btn-app" type="submit" disabled={pending}>
        {pending ? 'Creating…' : 'Create client and send invite'}
      </button>
    </form>
  );
}
```

- [ ] **Step 7: Create `app/(admin)/admin/clients/new/page.js`**

```js
import TopBar from '../../../../../components/dashboard/TopBar';
import { requireAdmin } from '../../../../../lib/auth';
import NewClientForm from './NewClientForm';

export const metadata = {
  title: 'New client',
  robots: { index: false, follow: false },
};

export default async function NewClientPage() {
  const user = await requireAdmin();

  return (
    <>
      <TopBar title="New client" user={user} />
      <div className="app__content">
        <h2 className="app__welcome">Create a client</h2>
        <p className="app__welcome-sub">
          They&rsquo;ll get an email inviting them to set a password.
        </p>
        <div style={{ maxWidth: '32rem' }}>
          <NewClientForm />
        </div>
      </div>
    </>
  );
}
```

- [ ] **Step 8: Create `app/(admin)/admin/clients/ResendInviteButton.js`**

```js
'use client';

import { useActionState } from 'react';
import { resendInviteAction } from './actions';

const INITIAL = {};

export default function ResendInviteButton({ clientId }) {
  const [state, formAction, pending] = useActionState(resendInviteAction, INITIAL);

  if (state?.ok) return <span className="status">Sent</span>;

  return (
    <form action={formAction}>
      <input type="hidden" name="clientId" value={clientId} />
      <button className="btn-app btn-app--quiet" type="submit" disabled={pending}>
        {pending ? 'Sending…' : 'Resend invite'}
      </button>
      {state?.error ? (
        <span className="status status--paused" role="alert">
          {state.error}
        </span>
      ) : null}
    </form>
  );
}
```

- [ ] **Step 9: Add the resend column to `app/(admin)/admin/clients/page.js`**

Add the import below the existing ones:

```js
import ResendInviteButton from './ResendInviteButton';
```

Add a header cell after the `Added` column header:

```js
                <th scope="col">Invite</th>
```

And a matching body cell after the `formatDate(client.created_at)` cell:

```js
                  <td>
                    <ResendInviteButton clientId={client.id} />
                  </td>
```

- [ ] **Step 10: Create `app/api/auth/forgot/route.js`**

```js
import { NextResponse } from 'next/server';
import { createAdminSupabase } from '../../../../lib/supabase/admin';
import { siteUrl } from '../../../../lib/supabase/env';
import { sendRecoveryEmail } from '../../../../lib/emails/invite';

// Always returns 200 with the same body, whether or not the account exists.
// Any difference in status, timing detail, or wording would let someone probe
// which email addresses are registered.
export async function POST(request) {
  let email;
  try {
    ({ email } = await request.json());
  } catch {
    return NextResponse.json({ ok: true });
  }

  if (!email || typeof email !== 'string') {
    return NextResponse.json({ ok: true });
  }

  try {
    const supabase = createAdminSupabase();
    const { data, error } = await supabase.auth.admin.generateLink({
      type: 'recovery',
      email: email.trim().toLowerCase(),
    });

    if (!error && data?.properties?.hashed_token) {
      const actionLink =
        `${siteUrl()}/auth/callback` +
        `?token_hash=${encodeURIComponent(data.properties.hashed_token)}` +
        `&type=recovery&next=${encodeURIComponent('/set-password')}`;
      await sendRecoveryEmail({ to: email, actionLink });
    }
  } catch (err) {
    console.error('Password reset failed:', err);
  }

  return NextResponse.json({ ok: true });
}
```

- [ ] **Step 11: Run the full test suite**

Run: `npm test`
Expected: PASS — 5 env + 6 guard + 5 validation + 4 email + 8 RLS = 28 tests.

- [ ] **Step 12: Verify the invite flow end to end**

Sign in as an admin, go to `/admin/clients/new`, and create a client using an
email inbox you control.
Expected: the success card shows the invite link, the email arrives from
Resend in the Gobiya template, clicking "Set your password" lands on
`/set-password`, saving a password lands on `/dashboard`, and the new client
appears in `/admin/clients`.

Then sign out and use `/forgot` with that same address.
Expected: the reset email arrives, its link lands on `/set-password`, and the
new password works at `/login`. Submitting `/forgot` with an address that has
no account shows the identical confirmation message.

Finally, click "Resend invite" on that client's row in `/admin/clients`.
Expected: the button reads "Sent" and a second working link arrives by email.

- [ ] **Step 13: Commit**

```bash
git add lib/emails/ app/\(admin\)/admin/clients/ app/api/auth/ tests/unit/invite-email.test.js
git commit -m "feat: create clients and send branded invite and reset emails"
```

---

## Task 10: Client settings page

**Files:**
- Create: `app/(dashboard)/dashboard/settings/page.js`
- Create: `app/(dashboard)/dashboard/settings/SettingsForms.js`

**Interfaces:**
- Consumes: `requireUser()`, `createBrowserSupabase()`.

- [ ] **Step 1: Create `app/(dashboard)/dashboard/settings/SettingsForms.js`**

```js
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserSupabase } from '../../../../lib/supabase/client';

const MIN_LENGTH = 10;

export function NameForm({ userId, initialName }) {
  const router = useRouter();
  const [fullName, setFullName] = useState(initialName || '');
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setBusy(true);
    setStatus('');

    const supabase = createBrowserSupabase();
    // RLS allows this row and this column only; role and client_id are pinned
    // by the update policy's with check clause.
    const { error } = await supabase
      .from('profiles')
      .update({ full_name: fullName.trim() || null })
      .eq('id', userId);

    setStatus(error ? 'That could not be saved.' : 'Saved.');
    setBusy(false);
    if (!error) router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="card" noValidate>
      <h2 className="card__title">Your name</h2>
      <div className="auth__field" style={{ marginTop: '1rem' }}>
        <label className="auth__label" htmlFor="fullName">
          Full name
        </label>
        <input
          className="auth__input"
          id="fullName"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </div>
      {status ? <p className="card__body">{status}</p> : null}
      <button className="btn-app" type="submit" disabled={busy}>
        {busy ? 'Saving…' : 'Save'}
      </button>
    </form>
  );
}

export function PasswordForm() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setStatus('');

    if (password.length < MIN_LENGTH) {
      setStatus(`Use at least ${MIN_LENGTH} characters.`);
      return;
    }
    if (password !== confirm) {
      setStatus('The two passwords do not match.');
      return;
    }

    setBusy(true);
    const supabase = createBrowserSupabase();
    const { error } = await supabase.auth.updateUser({ password });
    setStatus(error ? error.message : 'Password updated.');
    setBusy(false);
    if (!error) {
      setPassword('');
      setConfirm('');
    }
  }

  return (
    <form onSubmit={onSubmit} className="card" noValidate>
      <h2 className="card__title">Password</h2>
      <div className="auth__field" style={{ marginTop: '1rem' }}>
        <label className="auth__label" htmlFor="newPassword">
          New password
        </label>
        <input
          className="auth__input"
          id="newPassword"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="auth__field">
        <label className="auth__label" htmlFor="confirmPassword">
          Confirm password
        </label>
        <input
          className="auth__input"
          id="confirmPassword"
          type="password"
          autoComplete="new-password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
      </div>
      {status ? <p className="card__body">{status}</p> : null}
      <button className="btn-app" type="submit" disabled={busy}>
        {busy ? 'Saving…' : 'Update password'}
      </button>
    </form>
  );
}
```

- [ ] **Step 2: Create `app/(dashboard)/dashboard/settings/page.js`**

```js
import TopBar from '../../../../components/dashboard/TopBar';
import { requireUser } from '../../../../lib/auth';
import { NameForm, PasswordForm } from './SettingsForms';

export const metadata = {
  title: 'Settings',
  robots: { index: false, follow: false },
};

export default async function SettingsPage() {
  const user = await requireUser();

  return (
    <>
      <TopBar title="Settings" user={user} />
      <div className="app__content">
        <h2 className="app__welcome">Settings</h2>
        <p className="app__welcome-sub">
          Signed in as {user.email}
          {user.client?.name ? ` · ${user.client.name}` : ''}
        </p>

        <div className="app__cards">
          <NameForm userId={user.id} initialName={user.fullName} />
          <PasswordForm />
        </div>
      </div>
    </>
  );
}
```

- [ ] **Step 3: Verify by hand**

Sign in as the test client and visit `/dashboard/settings`.
Expected: changing the name saves and the top bar updates after refresh;
changing the password succeeds, and signing out then back in with the new
password works.

- [ ] **Step 4: Run the full suite and build**

Run: `npm test && npm run build`
Expected: 28 tests pass, build succeeds, marketing routes still static.

- [ ] **Step 5: Add the environment variables to Vercel**

In the Vercel project settings, add `NEXT_PUBLIC_SUPABASE_URL`,
`NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, and
`NEXT_PUBLIC_SITE_URL=https://www.gobiya.com` for Production and Preview.

Then add `https://www.gobiya.com/auth/callback` to the Supabase dashboard under
Authentication → URL Configuration → Redirect URLs, and set Site URL to
`https://www.gobiya.com`.

- [ ] **Step 6: Commit**

```bash
git add app/\(dashboard\)/dashboard/settings/
git commit -m "feat: add client settings page"
```

---

## Final verification checklist

Run through this before opening a pull request.

- [ ] `npm test` — 28 tests pass, including all 8 RLS tests
- [ ] `npm run build` — succeeds; `/`, `/services`, `/pricing`, `/insights/[slug]` still render statically
- [ ] Anonymous visit to `/dashboard` redirects to `/login?next=%2Fdashboard`
- [ ] Anonymous visit to `/admin` redirects to `/login`
- [ ] A signed-in client visiting `/admin` gets a 404
- [ ] Admin creates a client, the Resend invite arrives, and the client sets a password and reaches `/dashboard`
- [ ] "Resend invite" on a client row sends a second working link
- [ ] An expired link lands on `/login` showing "That link has expired", not a blank form
- [ ] `/forgot` sends a working reset link and shows an identical message for an unknown address
- [ ] Sign-out works from both shells and cannot be triggered by a GET
- [ ] `curl -s localhost:3000/robots.txt` disallows `/dashboard`, `/admin`, `/login`, `/auth`
- [ ] `grep -rn "SUPABASE_SERVICE_ROLE_KEY" app components lib | grep -v "lib/supabase/env.js"` returns nothing
- [ ] `grep -rln "'use client'" $(grep -rl "supabase/admin" app components lib)` returns nothing
- [ ] No secrets committed: `git log -p | grep -i "service_role"` returns nothing
