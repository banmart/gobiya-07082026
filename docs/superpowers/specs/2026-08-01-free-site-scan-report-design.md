# Free Site Scan — AI report, CRM lead, and delivery

**Date:** 2026-08-01
**Route:** `/free-site-scan`
**Status:** Design approved, ready for implementation plan

---

## 1. Problem

`/free-site-scan` is the site's primary conversion path and its headline offer is a free site
scan. Today that offer is not fulfilled.

The current flow:

1. `OnboardingStepper` collects name, email, phone, company, website, industry, goal,
   challenges, budget, timeline, notes.
2. `POST /api/onboarding` runs a honeypot check, then calls `sendOnboardingEmail()`.
3. That sends one Resend message **to Steve**.
4. The visitor is redirected to a static thank-you page.

The visitor receives nothing. No scan runs. No lead is recorded.

Two supporting facts found during exploration:

- `recordFormSubmission()` exists in `lib/submissions.js` and **is called by nothing**. The CRM
  write path was built and never connected, which is why submissions do not appear as leads.
- `public.ai_audits` (`url`, `score`, `report_data`) exists in migration `0002` and is
  **entirely unused**. `form_submissions.type` already permits `'audit'`.

The infrastructure was anticipated. This work connects it.

---

## 2. Goals

- Deliver a genuinely useful, factually grounded report on the URL the visitor submitted.
- Show that report on a results page immediately after submission.
- Email the same report to the visitor via Resend.
- Record every submission as a CRM lead in `form_submissions`.
- Give the visitor a way to request a call or reach Steve directly from the report.

## 3. Non-goals (v1)

Explicitly cut. Each is cheap to add later and none blocks the above.

- Background queue or worker process
- PDF export
- Authentication on the report link
- Third-party scheduling (Cal.com / Calendly)
- Re-scan, report history, or a comparison view
- Multi-page crawl — see §11

---

## 4. Decisions

| Decision | Choice | Why |
|---|---|---|
| Source of findings | Real measurements; AI interprets only | The model cannot see the site. Given only a URL it invents Core Web Vitals, meta findings and backlink counts. Gobiya sells SEO expertise to people who can verify, and `lib/testimonials.js` already commits to "Real, verifiable facts only (no follower counts / fabricated numbers)". A fabricated audit carrying a prospect's domain is not recoverable. |
| Where the scan runs | On the results page, after the form returns | Lead capture must not depend on the scan succeeding. Also keeps a 15–30s job off the form POST and away from the serverless timeout. |
| Scheduling | Request-a-time form through the existing Resend path | No account or new dependency. Swappable for a real calendar later without touching the rest of the flow. |
| Engine structure | Modular collectors + orchestrator | Five things can fail independently. None may take down the report. |
| Score | Computed in code, never by the model | A model-produced score drifts between the page and the email, and is unverifiable. |

---

## 5. Flow

```
OnboardingStepper ──POST──▶ /api/onboarding
                              ├─ honeypot (existing)
                              ├─ recordFormSubmission({ type: 'audit' })  → CRM lead, status 'new'
                              ├─ sendOnboardingEmail()                    → Steve (existing)
                              └─ insert ai_audits (status 'pending')      → returns id
                                        │
                          redirect /free-site-scan/report/<id>
                                        │
     report page (server component)
       ├─ status 'complete' → render stored report_data
       └─ status 'pending'  → client child POSTs /api/scan
                                        │
                              /api/scan/route.js
                               ├─ idempotency guard (already complete → return stored)
                               ├─ rate limit
                               ├─ lib/scan/index.js   → facts + collectorStatus
                               ├─ lib/scan/score.js   → score (deterministic)
                               ├─ lib/scan/report.js  → Gemini prose over facts only
                               ├─ update ai_audits    → score, report_data, 'complete'
                               └─ Resend: report to visitor + copy to Steve
                                        │
                          render report + request-a-time block
```

The CRM lead and Steve's notification are written **before** the scan exists. If every
collector fails, the prospect is still captured.

### No website submitted

`website` is not a required field on the stepper. When it is blank or fails validation,
`/api/onboarding` records the CRM lead and notifies Steve exactly as it does today, creates no
`ai_audits` row, and returns no id. `OnboardingStepper` then falls back to its current
`router.push('/free-site-scan/thank-you')`.

The existing thank-you page is therefore kept, not replaced. It remains the destination for
every submission that has nothing to scan.

### Stepper change

`OnboardingStepper` currently ignores the response body and always pushes to the thank-you
page. It now reads `{ ok, auditId }` and routes to `/free-site-scan/report/<auditId>` when an
id is present, thank-you otherwise. This is the only change to the component.

Reading from `ai_audits` when status is `complete` means the emailed link renders stored data
rather than re-scanning. This makes refresh idempotent and prevents duplicate emails.

---

## 6. Data model

New migration `supabase/migrations/0004_site_scan_reports.sql`:

```sql
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
```

`ai_audits.client_id` stays null for prospects — it is nullable and a prospect is not yet a
client.

**Access:** RLS is enabled on `ai_audits` with `ai_audits_admin_all` and `ai_audits_client_all`
policies only. Anonymous visitors have no policy and cannot read the table with the anon key.
All access in this feature therefore goes through `createAdminSupabase()` (service role) on the
server. The report page is a server component, so it reads directly; no new RLS policy is
added, and no Supabase credential reaches the browser.

The report id doubles as the URL token. It is a v4 UUID from `gen_random_uuid()` — unguessable,
and the report contains no credentials.

---

## 7. Components

### `lib/scan/url.js`
`normalizeUrl(input)` → `{ ok, url, reason }`. Adds a scheme when missing, lowercases the host,
strips fragments. Then validates — see §8.

### `lib/scan/html.js`
Fetches the page and parses, returning only what it actually observed:

`httpStatus`, `finalUrl`, `redirectCount`, `title` + length, `metaDescription` + length,
`canonical`, `robotsMeta`, `h1` (array), `h2Count`, `imageCount`, `imagesMissingAlt`,
`jsonLdTypes` (array), `hasViewport`, `htmlLang`, `wordCount`, `responseBytes`, `ttfbMs`.

### `lib/scan/psi.js`
PageSpeed Insights v5, mobile strategy: `lcpMs`, `inpMs`, `cls`, `ttfbMs`, and the performance,
SEO, accessibility, best-practices category scores. Requires `PAGESPEED_API_KEY` — the keyless
endpoint is rate limited hard enough to be unusable in production.

If the key is absent the collector reports `'skipped'` rather than failing: the report ships
without a performance section and says so. This keeps local development and preview
deployments working without the key.

### `lib/scan/dns.js` and `lib/scan/ssl.js`
A/AAAA/MX/TXT presence, nameservers, domain age where available; certificate issuer, validity
window, days to expiry.

### `lib/scan/discovery.js`
`robots.txt` present and whether it blocks crawlers; `sitemap.xml` present and its URL count.

### `lib/scan/index.js`
Runs every collector under `Promise.allSettled` with a per-collector timeout. Returns
`{ facts, collectorStatus }` where `collectorStatus[name]` is `'ok' | 'failed' | 'skipped'`
with a reason. **The orchestrator never throws.**

### `lib/scan/score.js`
`scoreFacts(facts)` → `{ score, breakdown[] }`, 0–100, weighted across performance, on-page,
technical and trust. Pure and deterministic. Any fact that was not measured is excluded from
both numerator and denominator so a failed collector lowers confidence, not the score.

### `lib/scan/report.js`
The only AI call. Receives `facts` and `collectorStatus` — nothing else, and no raw HTML.
Returns:

```js
{
  summary: string,              // 2-3 sentences, plain English
  findings: [{ title, severity: 'high'|'medium'|'low', why, fix }],
  nextSteps: string[]
}
```

Prompt contract, enforced in the builder and asserted in tests:

- Use only the supplied facts. Never estimate, infer or supply a missing measurement.
- Any field absent from `facts` is described as "not measured", never guessed.
- Do not produce a score; one is supplied.
- Plain language, second person, no jargon padding — match the voice in `lib/insights.js`.

### `lib/emails/siteScan.js`
Resend HTML template following the `lib/emails/invite.js` convention: score, summary, top
findings, and a link back to the report page.

### `app/api/scan/route.js`
Thin glue: rate limit → load row → idempotency guard → orchestrate → score → report → persist →
email → return JSON.

### `app/free-site-scan/report/[id]/page.js`
Server component. Loads the row via the admin client. `complete` renders stored `report_data`;
`pending` renders a client child that POSTs `/api/scan` and shows staged progress; `failed`
renders the honest fallback plus contact CTA.

### Request-a-time block
A free-text preferred time plus optional note. It **updates the existing `form_submissions` row**
(merging `requestedTime` into `payload`, setting `status` to `'contacted'` is left to Steve) and
sends Steve a Resend notification. It deliberately does **not** insert a second row — the
visitor is one lead who has now asked for a call, not two leads.

Name and email are already on the row, so the block only asks for what is new.

---

## 8. Security

`/api/scan` is unauthenticated and fetches an attacker-supplied URL from the server. Without a
guard this is a textbook SSRF: `http://169.254.169.254/` returns cloud metadata to the caller.

`lib/scan/url.js` must enforce all of:

- `http` and `https` schemes only
- Resolve DNS first, then reject private, loopback, link-local, multicast and metadata ranges
  (`10/8`, `172.16/12`, `192.168/16`, `127/8`, `169.254/16`, `::1`, `fc00::/7`)
- Re-validate after **every** redirect; cap redirects at 3
- Cap the response body (2 MB) and set a hard per-request timeout (8s)
- No credentials in the URL, no non-standard ports

`lib/rate-limit.js` already exists and applies to the route, keyed by IP.

---

## 9. Failure handling

| Failure | Behaviour |
|---|---|
| One collector fails | Report ships; that section reads "not measured"; excluded from scoring |
| Page fetch fails entirely | Report states the site could not be reached and why, pivots to a call CTA. Lead already captured |
| PageSpeed unavailable | Report ships without Core Web Vitals; on-page findings unaffected |
| Gemini fails | Template renders facts without prose. Less polished, still honest, still delivered |
| Supabase write fails | Report still renders in the response; error logged; Steve's notification already sent |
| Resend fails | Report still on screen; error logged; not retried in v1 |
| Page refreshed mid-scan | Idempotency guard returns the stored report; no re-scan, no second email |

The invariant: **the visitor always receives something honest, and the lead is never lost.**

---

## 10. Testing

Vitest is configured. Unit tests only, no network — all fetches mocked.

- `url.js` — SSRF rejection per range, redirect re-validation, scheme and port rules
- `html.js` — parsing against fixture HTML, including a page with no title, no meta and no h1
- `score.js` — boundaries, and that unmeasured facts leave the score unchanged
- `report.js` — prompt builder contains no field absent from `facts`; asserts the facts-only contract
- `index.js` — one failing collector still yields a complete `facts` object

---

## 11. Open item: "Full Site Scan" wording

The page is titled *"Free Full Site Scan & AI Visibility Audit"*. This design scans the
submitted URL plus domain-level checks; `discovery.js` reports how many URLs the sitemap
contains, but nothing crawls them.

**Decision for v1:** single URL plus sitemap count. A multi-page crawl multiplies PageSpeed
calls (~10s each) and pushes the results page past a tolerable wait.

**Recommended follow-up:** soften the heading to "Free Site Scan & AI Visibility Audit" so the
deliverable matches the promise, or add a top-N sitemap crawl in v2 behind the async email path
where latency does not matter. Raised for Steve; not blocking implementation.

---

## 12. Environment

| Var | Status |
|---|---|
| `GEMINI_API_KEY` | Existing, used by `/api/chat` |
| `RESEND_API_KEY` | Existing |
| `PAGESPEED_API_KEY` | **New** |
| `SITE_SCAN_FROM_EMAIL` | **New**, defaults to the `ONBOARDING_FROM_EMAIL` pattern |

---

## 13. Definition of done

- Submitting the form creates a `form_submissions` row with `type: 'audit'`, `status: 'new'`
- Steve receives the existing notification, unchanged
- The visitor lands on a report page that completes within ~30s
- The report contains only measured facts; unmeasured fields say so
- The same report arrives by email
- The report page offers a request-a-time block and direct contact
- Every collector can fail without failing the report
- SSRF tests pass
- `npx next build` succeeds
