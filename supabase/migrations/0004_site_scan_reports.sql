-- ══ Free site scan reports ══
--
-- public.ai_audits landed in 0002 and was never used. The free-site-scan flow
-- now writes to it, which needs four things the original table did not carry:
-- a link back to the lead that produced it, the address to email the report to,
-- a lifecycle status (the row is created before the scan runs, so the report
-- page can be reached while it is still pending), and a record of which
-- collectors succeeded so the report can say "not measured" honestly.
--
-- No RLS change. 0002 already enables row level security with admin and client
-- policies; anonymous visitors have no policy and cannot read this table with
-- the anon key. Every access in this feature goes through the service-role
-- client on the server, and the report page is a server component.

alter table public.ai_audits
  add column if not exists submission_id uuid
    references public.form_submissions (id) on delete set null,
  add column if not exists email text,
  add column if not exists status text not null default 'pending'
    check (status in ('pending', 'complete', 'failed')),
  add column if not exists collector_status jsonb not null default '{}'::jsonb,
  add column if not exists completed_at timestamptz;

create index if not exists ai_audits_status_idx on public.ai_audits (status);
create index if not exists ai_audits_submission_id_idx on public.ai_audits (submission_id);
