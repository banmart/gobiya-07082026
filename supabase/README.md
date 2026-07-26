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
