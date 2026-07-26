# Auth Foundation — Design

**Date:** 2026-07-26
**Status:** Approved, ready for planning
**Slice:** 1 of 5

## Context

Gobiya.com is a Next 16 App Router site in plain JavaScript, deployed on Vercel. It
has no authentication, no database, and no Supabase dependency today. Form
submissions are sent as email through Resend (`lib/leadForms.js`) and are never
persisted. The eight public tools under `app/tools/` are thin WhoisXML wrappers
guarded by an in-memory rate limiter (`lib/rate-limit.js`) that resets on every
cold boot.

The goal is a client portal and an admin console. That is five independent
subsystems, too large for one spec:

1. **Auth foundation** — accounts, roles, protected shells (this document)
2. Admin submissions inbox — persist form submissions, notify via Resend
3. Public tools ported into the dashboard with per-account quotas
4. AI Website Audit
5. Google Reviews Manager (GMB)

Each gets its own spec, plan, and implementation cycle. This document covers
slice 1 only.

### Known external blocker

The Google Business Profile API is access-gated. Google requires an approved
access request plus OAuth verification for those scopes, and approval commonly
takes days to weeks. The request should be submitted early, independently of
build order, so slice 5 is not waiting on paperwork.

## Decisions

| Decision | Choice | Why |
| --- | --- | --- |
| Signup | Invite-only | Agency client portal; every account maps to a real client. No spam signups, no email-verification funnel, no free tier to design. |
| Tenant shape | `clients` table, single login per client for now | Reviews, audits, and GMB locations hang off the business, not the person. Retrofitting this later means migrating every downstream table. |
| Sign-in | Email + password | Familiar to non-technical business owners; survives being handed to a staffer; no third-party identity dependency. |
| Admin role | `profiles.role` column, seeded by SQL | Role lives with the data, so RLS policies and app code read one source of truth. |
| Dashboard chrome | Own layout, left sidebar | Marketing header is built for conversion, not for navigating a dozen tools. Sidebar scales as tools land. |
| Sessions | Cookie-based via `@supabase/ssr` + middleware | Guards run on the server, so protected content never renders before the check. Route handlers can read the session. |
| Authorization | RLS-first | Postgres enforces tenancy. A forgotten check in a route handler cannot leak another client's data. |

## Scope

**In scope:** login, invite-driven password setup, password reset, sign-out,
`clients` and `profiles` schema with RLS, server-side route guards, client
dashboard shell with stub cards, admin shell, and admin client
create/list/invite.

**Out of scope:** GMB and any OAuth, the AI audit, porting the public tools,
persisting form submissions, teammate invites, billing, client-facing
self-registration.

## Architecture

### Routes

```
middleware.js              matcher: /dashboard/:path*, /admin/:path*, /auth/:path*
                           Refreshes the Supabase session cookie on every matched
                           request. It redirects anonymous users to /login on
                           /dashboard and /admin ONLY — /auth/* must stay reachable
                           while signed out, since a user clicking an invite or reset
                           link has no session yet. Marketing routes are not matched,
                           so their static rendering and LCP are untouched.

app/(auth)/login           email + password
app/(auth)/set-password    invite and reset landing (one form, copy varies by context)
app/(auth)/forgot          request a reset email
app/auth/callback          exchanges an invite/reset code for a session
app/auth/signout           POST only, clears cookies

app/(dashboard)/layout.js            sidebar chrome, calls requireUser()
app/(dashboard)/dashboard            overview: welcome + stub cards
app/(dashboard)/dashboard/settings   name, email, change password

app/(admin)/layout.js                same chrome, admin nav, calls requireAdmin()
app/(admin)/admin                    overview with stub cards
app/(admin)/admin/clients            list, create, invite
```

Middleware handles session refresh and the anonymous redirect only. The role
check lives in the layouts, where a database read is already happening, rather
than adding a query to every matched request in the edge middleware.

### Modules

Each has one job and a stated dependency surface.

| Module | Purpose | Depends on |
| --- | --- | --- |
| `lib/supabase/server.js` | Per-request cookie-bound server client | `@supabase/ssr`, `next/headers` |
| `lib/supabase/client.js` | Browser client | `@supabase/ssr` |
| `lib/supabase/admin.js` | Service-role client, server-only, throws if imported into a client bundle | `@supabase/supabase-js` |
| `lib/auth.js` | `getSessionUser()`, `requireUser()`, `requireAdmin()` | `lib/supabase/server.js` |
| `lib/clients.js` | Client CRUD; the only module that knows the `clients` table shape | `lib/supabase/server.js`, `lib/supabase/admin.js` |
| `lib/emails/invite.js` | Builds and sends the branded invite email | `resend`, `lib/brand.js` |

Supabase clients are created per request, never as module singletons, because
each carries request-scoped cookies.

### Data model

```sql
clients
  id            uuid primary key default gen_random_uuid()
  name          text not null
  website       text
  contact_email text not null
  status        text not null default 'active' check (status in ('active','paused'))
  created_at    timestamptz not null default now()
  created_by    uuid references public.profiles(id)   -- added by ALTER TABLE, see below

profiles
  id          uuid primary key references auth.users(id) on delete cascade
  client_id   uuid references public.clients(id)      -- null for admins
  role        text not null default 'client' check (role in ('client','admin'))
  full_name   text
  created_at  timestamptz not null default now()
```

The two tables reference each other, so the migration creates `clients` without
`created_by`, creates `profiles`, then adds `clients.created_by` with an
`ALTER TABLE`. Both columns are nullable, so no chicken-and-egg problem at
insert time.

`profiles.client_id` is a plain foreign key, so several logins per client are
already representable. No teammate UI is built in this slice. No memberships
join table until one is actually needed.

A trigger on `auth.users` insert creates the matching `profiles` row, reading
`client_id` and `role` from the invite's `user_metadata`.

The first admin is seeded with a one-off SQL statement run in the Supabase SQL
editor after signing up that account, and this statement is recorded in the
migration directory as a comment rather than executed automatically.

### Row-level security

RLS is enabled on both tables. Nothing is readable without a matching policy.

- `clients` — a user reads and updates the row where `id = my_client_id()`;
  admins have full access.
- `profiles` — a user reads and updates only their own row; admins have full
  access. Clients cannot update their own `role` or `client_id`: the update
  policy's `with check` clause requires both to equal their current values.

`my_client_id()` and `is_admin()` are `SECURITY DEFINER` functions. This is
required, not stylistic: a policy on `profiles` that queries `profiles` recurses
infinitely, and a definer function is the standard way out.

Migration SQL lives in `supabase/migrations/` as numbered `.sql` files, applied
through the Supabase SQL editor. The Supabase CLI is not added in this slice.

### Invite flow

Supabase's `inviteUserByEmail` sends through Supabase's SMTP using their
template. Gobiya already runs Resend and has its own brand, so the invite is
sent manually instead:

1. Admin submits the create-client form; a `clients` row is inserted.
2. `supabase.auth.admin.generateLink({ type: 'invite' })` creates the auth user
   and returns an action link without sending anything.
3. The app sends that link through Resend using the Gobiya template
   (navy `#142f52`, carmine `#c8102e`, per `lib/brand.js`).
4. The client clicks through to `/auth/callback`, which exchanges the code, then
   `/auth/set-password`, then lands on `/dashboard`.

The client and auth user exist independently of whether the email sends, so the
admin UI always shows the raw invite link with a copy button plus a "resend
invite" action.

## Error handling

| Case | Behavior |
| --- | --- |
| Expired or already-used invite link | "This invite has expired" with a path to request a new one. No stack trace. |
| Duplicate email on create | Reported on the form field. No orphaned `clients` row: if `generateLink` fails, the just-inserted `clients` row is deleted as a compensating action before the error is returned. |
| Client requests another client's record | RLS returns no rows, and the route renders a **404, not a 403** — a 403 would confirm the record exists. |
| Resend outage | Client creation still succeeds. The invite is retryable from the admin UI. |
| Missing Supabase env vars | Fail loudly at startup with a named error, rather than a null-client crash deep in a request. |

## Testing

The repository has no test framework today, so this slice adds **Vitest**.

**RLS integration tests are the priority**, because RLS is the entire security
model. A seeded script creates two clients and one admin, then asserts:

- Client A's anon-key session cannot read client B's `clients` row
- Client A cannot read client B's `profiles` row
- Client A cannot update its own `role` to `admin`
- Client A cannot reassign its own `client_id`
- The admin can read both clients

These run against a Supabase project, not a mock, since the behavior under test
is Postgres policy evaluation.

**Unit tests:** `lib/auth.js` guard behavior, invite email construction, and
client-form validation.

**Manual checklist** for browser flows: create client in admin → invite email
arrives → set password → sign in → sidebar renders → sign out → forgot password →
reset → sign in again. Plus: a client account visiting `/admin` gets a 404, and
an anonymous visitor to `/dashboard` is redirected to `/login`.

## Environment variables

New, added to `.env.local` and to Vercel:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server-only, never referenced in client code)

`RESEND_API_KEY` and `ONBOARDING_FROM_EMAIL` already exist and are reused.

## Success criteria

1. An admin signs in at `/login` and reaches `/admin`.
2. The admin creates a client and the invite email arrives via Resend.
3. The invited client sets a password and lands on `/dashboard` with the sidebar
   chrome and stub cards.
4. The client visiting `/admin` gets a 404.
5. An anonymous visitor to `/dashboard` is redirected to `/login`.
6. The RLS integration tests pass.
7. Marketing pages still render statically, unchanged by middleware.
