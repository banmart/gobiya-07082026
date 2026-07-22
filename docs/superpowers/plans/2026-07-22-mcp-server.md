# MCP Server + `/mcp` Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expose the site's 7 free lookup tools, 2 lead-gen forms, and 3 content types (insights, case studies, services) to AI agents via a real MCP (Model Context Protocol) server at `/api/mcp`, plus a human-facing `/mcp` documentation page.

**Architecture:** `mcp-handler` (Vercel's Next.js adapter) + `@modelcontextprotocol/sdk`, mounted as a Streamable-HTTP-only endpoint at `app/api/mcp/route.js`. Two shared helper libs (`lib/whoisxml.js`, `lib/leadForms.js`) extract the logic currently duplicated across the 7 tool routes and 2 form routes, so both the existing REST routes and the new MCP tools call the same code. Resources are served from existing `lib/` content data via a small Markdown serializer (`lib/mcpResources.js`). `app/mcp/page.js` is the separate human-facing page (Next.js forbids a `page.js` and `route.js` sharing one path, which is exactly the split we want).

**Tech Stack:** Next.js App Router (existing), `mcp-handler@1.1.0`, `@modelcontextprotocol/sdk@1.26.0` (pin — the README flags versions before 1.26.0 have a security vulnerability), `zod@^3`.

## Global Constraints

- Spec: `docs/superpowers/specs/2026-07-22-mcp-server-design.md`.
- Package versions: `mcp-handler`, `@modelcontextprotocol/sdk@1.26.0` (not lower), `zod@^3`.
- The 7 lookup tools keep the existing 2-calls/24h rate limit (via the existing `lib/rate-limit.js` `checkRateLimit`). The 2 form tools get a 5-calls/24h limit (looser — no honeypot equivalent exists for a programmatic caller).
- `app/api/tools/threat/route.js` is currently missing the rate-limit check the other 6 routes all have — add it during the refactor (rate-limit id: `threat-intel`).
- Resource URI scheme: `gobiya://insights/{slug}`, `gobiya://work/{slug}`, `gobiya://services/{slug}`. Resource content is Markdown (`mimeType: 'text/markdown'`).
- `/mcp` page reuses the site's existing institutional page template/CSS classes (`page-hero`, `section`, `svc-card`, `container`, `btn`, `eyebrow`) — no new visual system. Not every one of the 9 tools has a natural fit in the existing hand-drawn icon set (`components/icons/HandDrawn.js`); don't force an icon onto a tool that doesn't have one — plain `svc-card` list items are fine.
- No test framework in this repo — verification is manual dev-server/curl checks, consistent with every prior plan this session.
- The stale `/mcp -> /ai-visibility` redirect in `next.config.mjs` was already removed and committed in a prior session turn (commit `af47b3c`) — nothing to do here, just confirm in the final verification task that `/mcp` returns 200, not a redirect.

---

### Task 1: `lib/whoisxml.js` shared helper + refactor the 7 lookup-tool routes

**Files:**
- Create: `lib/whoisxml.js`
- Modify: `app/api/tools/dns/route.js`
- Modify: `app/api/tools/email-verify/route.js`
- Modify: `app/api/tools/ip-geo/route.js`
- Modify: `app/api/tools/reputation/route.js`
- Modify: `app/api/tools/ssl/route.js`
- Modify: `app/api/tools/threat/route.js`
- Modify: `app/api/tools/web-cat/route.js`

**Interfaces:**
- Produces: `queryWhoisXml(toolId, value)` — `toolId` is one of `'dns' | 'emailVerify' | 'ipGeo' | 'reputation' | 'ssl' | 'threat' | 'webCat'`. Returns `Promise<{ ok: true, status: 200, data } | { ok: false, status: number, error: string }>`. Task 3 (MCP lookup tools) also calls this function directly.

- [ ] **Step 1: Write `lib/whoisxml.js`**

```js
// Shared WhoisXML API client for the 7 free lookup tools under app/api/tools/*
// and their MCP tool equivalents in app/api/mcp/route.js. Each tool differed
// only in upstream host, query param name, and optional extra params — this
// collapses that into one config map plus one fetch/error-normalization
// function, so both callers share one code path instead of two copies of it.

const ENDPOINTS = {
  dns: {
    host: 'https://www.whoisxmlapi.com/whoisserver/DNSService',
    param: 'domainName',
    extra: { type: '_all' },
  },
  emailVerify: {
    host: 'https://emailverification.whoisxmlapi.com/api/v3',
    param: 'emailAddress',
  },
  ipGeo: {
    host: 'https://ip-geolocation.whoisxmlapi.com/api/v1',
    param: 'ipAddress',
  },
  reputation: {
    host: 'https://domain-reputation.whoisxmlapi.com/api/v2',
    param: 'domainName',
    extra: { mode: 'fast' },
  },
  ssl: {
    host: 'https://ssl-certificates.whoisxmlapi.com/api/v1',
    param: 'domainName',
  },
  threat: {
    host: 'https://threat-intelligence.whoisxmlapi.com/api/v1',
    param: 'domainName',
  },
  webCat: {
    host: 'https://website-categorization.whoisxmlapi.com/api/v3',
    param: 'domainName',
  },
};

// Returns { ok: true, status: 200, data } on success, or
// { ok: false, status, error } on missing key, upstream error, or network error.
export async function queryWhoisXml(toolId, value) {
  const cfg = ENDPOINTS[toolId];
  if (!cfg) {
    return { ok: false, status: 500, error: `Unknown WhoisXML tool: ${toolId}` };
  }

  const apiKey = process.env.WHOIS_XML_API_KEY;
  if (!apiKey) {
    return { ok: false, status: 500, error: 'API key is not configured' };
  }

  const params = new URLSearchParams({
    apiKey,
    [cfg.param]: value,
    outputFormat: 'JSON',
    ...(cfg.extra || {}),
  });

  try {
    const response = await fetch(`${cfg.host}?${params.toString()}`);
    const data = await response.json();

    if (!response.ok || data.ErrorMessage) {
      return {
        ok: false,
        status: response.ok ? 400 : response.status,
        error: data.ErrorMessage?.msg || `Failed to fetch ${toolId} data`,
      };
    }

    return { ok: true, status: 200, data };
  } catch (error) {
    return { ok: false, status: 500, error: error.message };
  }
}
```

- [ ] **Step 2: Rewrite `app/api/tools/dns/route.js`**

```js
import { NextResponse } from 'next/server';
import { checkRateLimit } from '../../../../lib/rate-limit';
import { queryWhoisXml } from '../../../../lib/whoisxml';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get('domain');

  if (!domain) {
    return NextResponse.json({ error: 'Domain parameter is required' }, { status: 400 });
  }

  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
  if (!checkRateLimit(ip, 'dns-lookup', 2, 24)) {
    return NextResponse.json({ error: 'Rate limit exceeded', details: 'You have reached your limit of 2 searches per 24 hours for this tool.' }, { status: 429 });
  }

  const result = await queryWhoisXml('dns', domain);
  if (!result.ok) {
    return NextResponse.json({ error: result.error, details: `Upstream API responded with status ${result.status}` }, { status: result.status });
  }
  return NextResponse.json(result.data);
}
```

- [ ] **Step 3: Rewrite `app/api/tools/email-verify/route.js`**

```js
import { NextResponse } from 'next/server';
import { checkRateLimit } from '../../../../lib/rate-limit';
import { queryWhoisXml } from '../../../../lib/whoisxml';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const emailSearch = searchParams.get('email');

  if (!emailSearch) {
    return NextResponse.json({ error: 'Email parameter is required' }, { status: 400 });
  }

  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
  if (!checkRateLimit(ip, 'email-verify', 2, 24)) {
    return NextResponse.json({ error: 'Rate limit exceeded', details: 'You have reached your limit of 2 searches per 24 hours for this tool.' }, { status: 429 });
  }

  const result = await queryWhoisXml('emailVerify', emailSearch);
  if (!result.ok) {
    return NextResponse.json({ error: result.error, details: `Upstream API responded with status ${result.status}` }, { status: result.status });
  }
  return NextResponse.json(result.data);
}
```

- [ ] **Step 4: Rewrite `app/api/tools/ip-geo/route.js`**

```js
import { NextResponse } from 'next/server';
import { checkRateLimit } from '../../../../lib/rate-limit';
import { queryWhoisXml } from '../../../../lib/whoisxml';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const ipSearch = searchParams.get('ip');

  if (!ipSearch) {
    return NextResponse.json({ error: 'IP parameter is required' }, { status: 400 });
  }

  const clientIp = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
  if (!checkRateLimit(clientIp, 'ip-geo', 2, 24)) {
    return NextResponse.json({ error: 'Rate limit exceeded', details: 'You have reached your limit of 2 searches per 24 hours for this tool.' }, { status: 429 });
  }

  const result = await queryWhoisXml('ipGeo', ipSearch);
  if (!result.ok) {
    return NextResponse.json({ error: result.error, details: `Upstream API responded with status ${result.status}` }, { status: result.status });
  }
  return NextResponse.json(result.data);
}
```

- [ ] **Step 5: Rewrite `app/api/tools/reputation/route.js`**

```js
import { NextResponse } from 'next/server';
import { checkRateLimit } from '../../../../lib/rate-limit';
import { queryWhoisXml } from '../../../../lib/whoisxml';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get('domain');

  if (!domain) {
    return NextResponse.json({ error: 'Domain parameter is required' }, { status: 400 });
  }

  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
  if (!checkRateLimit(ip, 'domain-rep', 2, 24)) {
    return NextResponse.json({ error: 'Rate limit exceeded', details: 'You have reached your limit of 2 searches per 24 hours for this tool.' }, { status: 429 });
  }

  const result = await queryWhoisXml('reputation', domain);
  if (!result.ok) {
    return NextResponse.json({ error: result.error, details: `Upstream API responded with status ${result.status}` }, { status: result.status });
  }
  return NextResponse.json(result.data);
}
```

- [ ] **Step 6: Rewrite `app/api/tools/ssl/route.js`**

```js
import { NextResponse } from 'next/server';
import { checkRateLimit } from '../../../../lib/rate-limit';
import { queryWhoisXml } from '../../../../lib/whoisxml';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get('domain');

  if (!domain) {
    return NextResponse.json({ error: 'Domain parameter is required' }, { status: 400 });
  }

  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
  if (!checkRateLimit(ip, 'ssl-certs', 2, 24)) {
    return NextResponse.json({ error: 'Rate limit exceeded', details: 'You have reached your limit of 2 searches per 24 hours for this tool.' }, { status: 429 });
  }

  const result = await queryWhoisXml('ssl', domain);
  if (!result.ok) {
    return NextResponse.json({ error: result.error, details: `Upstream API responded with status ${result.status}` }, { status: result.status });
  }
  return NextResponse.json(result.data);
}
```

- [ ] **Step 7: Rewrite `app/api/tools/threat/route.js`** (adds the missing rate-limit check)

```js
import { NextResponse } from 'next/server';
import { checkRateLimit } from '../../../../lib/rate-limit';
import { queryWhoisXml } from '../../../../lib/whoisxml';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get('domain');

  if (!domain) {
    return NextResponse.json({ error: 'Domain parameter is required' }, { status: 400 });
  }

  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
  if (!checkRateLimit(ip, 'threat-intel', 2, 24)) {
    return NextResponse.json({ error: 'Rate limit exceeded', details: 'You have reached your limit of 2 searches per 24 hours for this tool.' }, { status: 429 });
  }

  const result = await queryWhoisXml('threat', domain);
  if (!result.ok) {
    return NextResponse.json({ error: result.error, details: `Upstream API responded with status ${result.status}` }, { status: result.status });
  }
  return NextResponse.json(result.data);
}
```

- [ ] **Step 8: Rewrite `app/api/tools/web-cat/route.js`**

```js
import { NextResponse } from 'next/server';
import { checkRateLimit } from '../../../../lib/rate-limit';
import { queryWhoisXml } from '../../../../lib/whoisxml';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get('domain');

  if (!domain) {
    return NextResponse.json({ error: 'Domain parameter is required' }, { status: 400 });
  }

  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
  if (!checkRateLimit(ip, 'web-cat', 2, 24)) {
    return NextResponse.json({ error: 'Rate limit exceeded', details: 'You have reached your limit of 2 searches per 24 hours for this tool.' }, { status: 429 });
  }

  const result = await queryWhoisXml('webCat', domain);
  if (!result.ok) {
    return NextResponse.json({ error: result.error, details: `Upstream API responded with status ${result.status}` }, { status: result.status });
  }
  return NextResponse.json(result.data);
}
```

- [ ] **Step 9: Manual verification — confirm all 7 REST routes still behave identically**

Run the dev server (`npm run dev`), then:

```bash
curl -s "http://localhost:3000/api/tools/dns?domain=gobiya.com" | head -c 200
curl -s "http://localhost:3000/api/tools/email-verify?email=test@example.com" | head -c 200
curl -s "http://localhost:3000/api/tools/ip-geo?ip=8.8.8.8" | head -c 200
curl -s "http://localhost:3000/api/tools/reputation?domain=gobiya.com" | head -c 200
curl -s "http://localhost:3000/api/tools/ssl?domain=gobiya.com" | head -c 200
curl -s "http://localhost:3000/api/tools/threat?domain=gobiya.com" | head -c 200
curl -s "http://localhost:3000/api/tools/web-cat?domain=gobiya.com" | head -c 200
```

Expected: each returns the same JSON shape as before the refactor (real upstream data, or a `{"error": ...}` body — not a 500 from a broken import path). Also confirm a 6th call to the same tool/IP within the test window returns `429` (rate limit still enforced) — e.g. call `dns` 3 times in a row and confirm the 3rd is a 429 given the 2/24h limit.

- [ ] **Step 10: Commit**

```bash
git add lib/whoisxml.js app/api/tools/
git commit -m "refactor: extract shared WhoisXML client for the 7 lookup-tool routes

Collapses the near-identical fetch/error-handling logic in each of the 7
app/api/tools/* routes into one lib/whoisxml.js helper, both to remove
duplication and because the upcoming MCP lookup tools need this exact
logic too. Also adds the rate-limit check to threat/route.js, which was
missing it while the other 6 routes all had it."
```

---

### Task 2: `lib/leadForms.js` shared helper + refactor the 2 form routes

**Files:**
- Create: `lib/leadForms.js`
- Modify: `app/api/quick-contact/route.js`
- Modify: `app/api/onboarding/route.js`

**Interfaces:**
- Consumes: nothing from Task 1.
- Produces: `sendContactEmail({ name, email, phone, message, currentPage })` and `sendOnboardingEmail({ name, email, phone, company, website, industry, goal, challenges, budget, timeline, notes })`. Both return `Promise<{ ok: true } | { ok: false, status: number, error: string }>`. Task 3 (MCP form tools) also calls these directly.

- [ ] **Step 1: Write `lib/leadForms.js`**

```js
// Shared lead-form senders for the quick-contact and onboarding flows —
// used by their REST routes (app/api/quick-contact, app/api/onboarding)
// and by the MCP form tools (contact_gobiya, request_seo_audit) in
// app/api/mcp/route.js, so both callers share one Resend/validation path.

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const INDUSTRY_LABELS = {
  'local-service': 'Local service business',
  'enterprise-b2b': 'Enterprise & B2B',
  healthcare: 'Healthcare & Dental',
  professional: 'Professional services',
  ecommerce: 'E-commerce',
  other: 'Other',
};

const GOAL_LABELS = {
  traffic: 'More organic traffic',
  rankings: 'Higher rankings for target keywords',
  recovery: 'Recover from a Google penalty / traffic drop',
  sales: 'More sales & leads',
  'ai-visibility': 'Get cited in ChatGPT, Perplexity & AI Overviews',
  unsure: 'Not sure yet — need direction',
};

const CHALLENGE_LABELS = {
  'traffic-drop': 'Traffic dropped after an algorithm update',
  'no-rankings': "Not ranking for the keywords that matter",
  'no-ai-visibility': "Not showing up in ChatGPT / AI Overviews",
  conversion: 'Site gets visits but not conversions',
  'no-strategy': "No real SEO strategy in place yet",
  other: 'Something else',
};

const BUDGET_LABELS = {
  'under-2k': 'Under $2,000/mo',
  '2k-5k': '$2,000 – $5,000/mo',
  '5k-10k': '$5,000 – $10,000/mo',
  '10k-plus': '$10,000+/mo',
  unsure: 'Not sure yet',
};

const TIMELINE_LABELS = {
  asap: 'ASAP',
  'this-month': 'This month',
  'this-quarter': 'This quarter',
  exploring: 'Just exploring',
};

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function labelList(values, labels) {
  if (!Array.isArray(values) || values.length === 0) return '—';
  return values.map((v) => escapeHtml(labels[v] || v)).join(', ');
}

function row(label, value) {
  return `
    <tr>
      <td style="padding:10px 16px;border-bottom:1px solid #e5e5e5;color:#8a8a8a;font-size:12px;text-transform:uppercase;letter-spacing:0.06em;white-space:nowrap;vertical-align:top;">${label}</td>
      <td style="padding:10px 16px;border-bottom:1px solid #e5e5e5;color:#2b2b2b;font-size:14px;">${value}</td>
    </tr>`;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendContactEmail({ name, email, phone, message, currentPage }) {
  if (!name || !email) {
    return { ok: false, status: 400, error: 'Name and email are required.' };
  }
  if (!EMAIL_PATTERN.test(email)) {
    return { ok: false, status: 400, error: 'Please provide a valid email address.' };
  }

  const html = `
    <div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:640px;margin:0 auto;">
      <h1 style="font-size:18px;font-weight:600;color:#2b2b2b;margin-bottom:4px;">New quick contact submission</h1>
      <p style="font-size:13px;color:#8a8a8a;margin-bottom:20px;">Gobiya.com — Hero form (Submitted from: ${escapeHtml(currentPage || 'Unknown page')})</p>
      <table style="width:100%;border-collapse:collapse;">
        ${row('Name', escapeHtml(name))}
        ${row('Email', `<a href="mailto:${escapeHtml(email)}" style="color:#e41613;">${escapeHtml(email)}</a>`)}
        ${row('Phone', escapeHtml(phone) || '—')}
        ${row('Message', message ? escapeHtml(message).replace(/\n/g, '<br />') : '—')}
      </table>
    </div>`;

  try {
    const { error } = await resend.emails.send({
      from: process.env.ONBOARDING_FROM_EMAIL || 'Gobiya Contact <onboarding@gobiya.com>',
      to: 'banmart@gmail.com',
      replyTo: email,
      subject: `New contact request — ${name}`,
      html,
    });
    if (error) {
      console.error('Resend error:', error);
      return { ok: false, status: 502, error: 'Failed to send. Please try again.' };
    }
  } catch (err) {
    console.error('Submission failed:', err);
    return { ok: false, status: 500, error: 'Failed to send. Please try again.' };
  }

  return { ok: true };
}

export async function sendOnboardingEmail({ name, email, phone, company, website, industry, goal, challenges, budget, timeline, notes }) {
  if (!name || !email) {
    return { ok: false, status: 400, error: 'Name and email are required.' };
  }
  if (!EMAIL_PATTERN.test(email)) {
    return { ok: false, status: 400, error: 'Please provide a valid email address.' };
  }

  const html = `
    <div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:640px;margin:0 auto;">
      <h1 style="font-size:18px;font-weight:600;color:#2b2b2b;margin-bottom:4px;">New onboarding submission</h1>
      <p style="font-size:13px;color:#8a8a8a;margin-bottom:20px;">Gobiya.com — questionnaire stepper</p>
      <table style="width:100%;border-collapse:collapse;">
        ${row('Name', escapeHtml(name))}
        ${row('Email', `<a href="mailto:${escapeHtml(email)}" style="color:#e41613;">${escapeHtml(email)}</a>`)}
        ${row('Phone', escapeHtml(phone) || '—')}
        ${row('Company', escapeHtml(company) || '—')}
        ${row('Website', escapeHtml(website) || '—')}
        ${row('Industry', labelList([industry], INDUSTRY_LABELS))}
        ${row('Primary goal', labelList([goal], GOAL_LABELS))}
        ${row('Current challenges', labelList(challenges, CHALLENGE_LABELS))}
        ${row('Budget', labelList([budget], BUDGET_LABELS))}
        ${row('Timeline', labelList([timeline], TIMELINE_LABELS))}
        ${row('Notes', notes ? escapeHtml(notes).replace(/\n/g, '<br />') : '—')}
      </table>
    </div>`;

  try {
    const { error } = await resend.emails.send({
      from: process.env.ONBOARDING_FROM_EMAIL || 'Gobiya Onboarding <onboarding@gobiya.com>',
      to: process.env.ONBOARDING_NOTIFY_EMAIL || 'banmart@gmail.com',
      replyTo: email,
      subject: `New onboarding request — ${company || name}`,
      html,
    });
    if (error) {
      console.error('Resend error:', error);
      return { ok: false, status: 502, error: 'Failed to send. Please try again or email us directly.' };
    }
  } catch (err) {
    console.error('Onboarding submission failed:', err);
    return { ok: false, status: 500, error: 'Failed to send. Please try again or email us directly.' };
  }

  return { ok: true };
}
```

- [ ] **Step 2: Rewrite `app/api/quick-contact/route.js`**

```js
import { NextResponse } from 'next/server';
import { sendContactEmail } from '../../../lib/leadForms';

export async function POST(request) {
  let data;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  // Honeypot — bots fill hidden fields. Web-only concept, stays in the route.
  if (data.company_website) {
    return NextResponse.json({ ok: true });
  }

  const result = await sendContactEmail(data);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }
  return NextResponse.json({ ok: true });
}
```

- [ ] **Step 3: Rewrite `app/api/onboarding/route.js`**

```js
import { NextResponse } from 'next/server';
import { sendOnboardingEmail } from '../../../lib/leadForms';

export async function POST(request) {
  let data;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  // Honeypot — bots fill hidden fields. Web-only concept, stays in the route.
  if (data.company_website) {
    return NextResponse.json({ ok: true });
  }

  const result = await sendOnboardingEmail(data);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }
  return NextResponse.json({ ok: true });
}
```

- [ ] **Step 4: Manual verification**

```bash
curl -s -X POST http://localhost:3000/api/quick-contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"not-an-email"}'
```

Expected: `{"error":"Please provide a valid email address."}` with a 400 status (confirms validation still runs through the shared helper). Then submit a real-shaped payload from the actual `/contact` page in the browser and confirm the email still arrives via Resend as before (or check the Resend dashboard/logs if not checking a live inbox).

- [ ] **Step 5: Commit**

```bash
git add lib/leadForms.js app/api/quick-contact/route.js app/api/onboarding/route.js
git commit -m "refactor: extract shared lead-form senders for contact + onboarding

Same rationale as the whoisxml.js extraction — the upcoming MCP form
tools (contact_gobiya, request_seo_audit) need this exact
validation/Resend logic, so it's shared rather than duplicated."
```

---

### Task 3: Install MCP dependencies + scaffold `app/api/mcp/route.js` with all 9 tools

**Files:**
- Modify: `package.json` (new dependencies)
- Create: `app/api/mcp/route.js`

**Interfaces:**
- Consumes: `queryWhoisXml` from `lib/whoisxml.js` (Task 1), `sendContactEmail`/`sendOnboardingEmail` from `lib/leadForms.js` (Task 2), `checkRateLimit` from `lib/rate-limit.js` (existing).
- Produces: the `GET`/`POST` handlers for `/api/mcp`, and a local `getCallerIp(extra)` helper used again in Task 4.

- [ ] **Step 1: Install dependencies**

```bash
npm install mcp-handler @modelcontextprotocol/sdk@1.26.0 zod@^3
```

Expected: `package.json` `dependencies` gains `mcp-handler`, `@modelcontextprotocol/sdk`, and `zod`.

- [ ] **Step 2: Write `app/api/mcp/route.js`**

```js
import { createMcpHandler } from 'mcp-handler';
import { z } from 'zod';
import { checkRateLimit } from '../../../lib/rate-limit';
import { queryWhoisXml } from '../../../lib/whoisxml';
import { sendContactEmail, sendOnboardingEmail } from '../../../lib/leadForms';

// extra.requestInfo.headers values can be string | string[] | undefined
// (IsomorphicHeaders) — normalize to a single string the same way the REST
// routes read request.headers.get('x-forwarded-for').
function getCallerIp(extra) {
  const headers = extra?.requestInfo?.headers || {};
  const forwarded = headers['x-forwarded-for'];
  const value = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  return value || 'unknown';
}

function lookupResult(result) {
  if (!result.ok) {
    return { isError: true, content: [{ type: 'text', text: result.error }] };
  }
  return { content: [{ type: 'text', text: JSON.stringify(result.data, null, 2) }] };
}

function rateLimitedError(toolLabel) {
  return {
    isError: true,
    content: [{ type: 'text', text: `Rate limit exceeded for ${toolLabel} — try again later.` }],
  };
}

const handler = createMcpHandler(
  (server) => {
    server.registerTool(
      'dns_lookup',
      {
        title: 'DNS Lookup',
        description: 'Look up DNS records (A, MX, TXT, NS, and more) for a domain.',
        inputSchema: { domain: z.string().min(1) },
      },
      async ({ domain }, extra) => {
        if (!checkRateLimit(getCallerIp(extra), 'dns-lookup', 2, 24)) return rateLimitedError('dns_lookup');
        return lookupResult(await queryWhoisXml('dns', domain));
      }
    );

    server.registerTool(
      'email_verification',
      {
        title: 'Email Verification',
        description: 'Verify whether an email address is valid, deliverable, and not disposable.',
        inputSchema: { email: z.string().min(1) },
      },
      async ({ email }, extra) => {
        if (!checkRateLimit(getCallerIp(extra), 'email-verify', 2, 24)) return rateLimitedError('email_verification');
        return lookupResult(await queryWhoisXml('emailVerify', email));
      }
    );

    server.registerTool(
      'ip_geolocation',
      {
        title: 'IP Geolocation',
        description: 'Look up the geographic location and ISP for an IP address.',
        inputSchema: { ip: z.string().min(1) },
      },
      async ({ ip }, extra) => {
        if (!checkRateLimit(getCallerIp(extra), 'ip-geo', 2, 24)) return rateLimitedError('ip_geolocation');
        return lookupResult(await queryWhoisXml('ipGeo', ip));
      }
    );

    server.registerTool(
      'domain_reputation',
      {
        title: 'Domain Reputation',
        description: 'Check a domain\'s reputation score and any known risk signals.',
        inputSchema: { domain: z.string().min(1) },
      },
      async ({ domain }, extra) => {
        if (!checkRateLimit(getCallerIp(extra), 'domain-rep', 2, 24)) return rateLimitedError('domain_reputation');
        return lookupResult(await queryWhoisXml('reputation', domain));
      }
    );

    server.registerTool(
      'ssl_certificate_lookup',
      {
        title: 'SSL Certificate Lookup',
        description: "Look up a domain's current and historical SSL/TLS certificates.",
        inputSchema: { domain: z.string().min(1) },
      },
      async ({ domain }, extra) => {
        if (!checkRateLimit(getCallerIp(extra), 'ssl-certs', 2, 24)) return rateLimitedError('ssl_certificate_lookup');
        return lookupResult(await queryWhoisXml('ssl', domain));
      }
    );

    server.registerTool(
      'threat_intelligence',
      {
        title: 'Threat Intelligence',
        description: 'Check a domain against threat intelligence feeds for malware, phishing, or spam signals.',
        inputSchema: { domain: z.string().min(1) },
      },
      async ({ domain }, extra) => {
        if (!checkRateLimit(getCallerIp(extra), 'threat-intel', 2, 24)) return rateLimitedError('threat_intelligence');
        return lookupResult(await queryWhoisXml('threat', domain));
      }
    );

    server.registerTool(
      'website_categorization',
      {
        title: 'Website Categorization',
        description: "Get a website's industry/content category classification.",
        inputSchema: { url: z.string().min(1) },
      },
      async ({ url }, extra) => {
        if (!checkRateLimit(getCallerIp(extra), 'web-cat', 2, 24)) return rateLimitedError('website_categorization');
        return lookupResult(await queryWhoisXml('webCat', url));
      }
    );

    server.registerTool(
      'contact_gobiya',
      {
        title: 'Contact Gobiya',
        description: 'Send a message to Gobiya on behalf of someone who wants to reach a human at the agency.',
        inputSchema: {
          name: z.string().min(1),
          email: z.string().min(1),
          message: z.string().optional(),
          phone: z.string().optional(),
        },
      },
      async ({ name, email, message, phone }, extra) => {
        if (!checkRateLimit(getCallerIp(extra), 'mcp-contact', 5, 24)) return rateLimitedError('contact_gobiya');
        const result = await sendContactEmail({ name, email, message, phone, currentPage: 'MCP tool call' });
        if (!result.ok) return { isError: true, content: [{ type: 'text', text: result.error }] };
        return { content: [{ type: 'text', text: 'Message sent to Gobiya. Someone will follow up by email.' }] };
      }
    );

    server.registerTool(
      'request_seo_audit',
      {
        title: 'Request an SEO/AI-Visibility Audit',
        description: 'Submit a request for a free SEO and AI-visibility audit on behalf of a business owner.',
        inputSchema: {
          name: z.string().min(1),
          email: z.string().min(1),
          phone: z.string().optional(),
          company: z.string().optional(),
          website: z.string().optional(),
          industry: z.string().optional(),
          goal: z.string().optional(),
          challenges: z.array(z.string()).optional(),
          budget: z.string().optional(),
          timeline: z.string().optional(),
          notes: z.string().optional(),
        },
      },
      async (args, extra) => {
        if (!checkRateLimit(getCallerIp(extra), 'mcp-onboarding', 5, 24)) return rateLimitedError('request_seo_audit');
        const result = await sendOnboardingEmail(args);
        if (!result.ok) return { isError: true, content: [{ type: 'text', text: result.error }] };
        return { content: [{ type: 'text', text: 'Audit request sent to Gobiya. Someone will follow up by email.' }] };
      }
    );
  },
  { serverInfo: { name: 'gobiya-mcp', version: '1.0.0' } },
  { basePath: '/api', disableSse: true, maxDuration: 60 }
);

export const maxDuration = 60;
export { handler as GET, handler as POST };
```

- [ ] **Step 3: Manual verification — initialize handshake + tools/list**

```bash
curl -s -X POST http://localhost:3000/api/mcp \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"manual-test","version":"0.0.1"}}}'
```

Expected: a JSON-RPC result containing `serverInfo.name: "gobiya-mcp"` and a `capabilities` object (not an error). Note the `Mcp-Session-Id` response header if present — some clients require it on the next call.

```bash
curl -s -X POST http://localhost:3000/api/mcp \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":2,"method":"tools/list","params":{}}'
```

Expected: a JSON-RPC result listing all 9 tools by name (`dns_lookup`, `email_verification`, `ip_geolocation`, `domain_reputation`, `ssl_certificate_lookup`, `threat_intelligence`, `website_categorization`, `contact_gobiya`, `request_seo_audit`).

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json app/api/mcp/route.js
git commit -m "feat: MCP server exposing the 7 lookup tools + 2 form tools

app/api/mcp/route.js via mcp-handler + @modelcontextprotocol/sdk,
Streamable HTTP only (SSE disabled per the 2025-03-26 spec). Each tool
wraps the shared lib/whoisxml.js or lib/leadForms.js helper, with the
same rate limits as their REST equivalents (2/24h lookups, 5/24h forms)."
```

---

### Task 4: Content resources (`lib/mcpResources.js` + wiring into the MCP route)

**Files:**
- Create: `lib/mcpResources.js`
- Modify: `app/api/mcp/route.js`

**Interfaces:**
- Consumes: `INSIGHTS`, `getInsight` from `lib/insights.js`; `CASE_STUDIES` from `lib/work.js`; `CONSULTING_ITEMS` from `lib/consultingIndex.js`; `SERVICES` from `lib/services.js`; `SERVICES_FLAT` from `lib/servicesFlat.js` (all existing, unmodified).
- Produces: `listMcpResources()` → `Array<{ uri, name, description, mimeType }>`. `readMcpResource(uri)` → `string | null` (Markdown, or `null` if not found).

- [ ] **Step 1: Write `lib/mcpResources.js`**

```js
// Converts this site's existing structured content (lib/insights.js,
// lib/work.js, lib/services.js/servicesFlat.js) into Markdown for the MCP
// server's resources/read, and enumerates all of it for resources/list.
// No new content — every field here already exists and is rendered
// elsewhere on the site; this just serializes it differently.

import { INSIGHTS, getInsight } from './insights';
import { CASE_STUDIES } from './work';
import { CONSULTING_ITEMS } from './consultingIndex';
import { SERVICES } from './services';
import { SERVICES_FLAT } from './servicesFlat';

function stripTags(value) {
  return String(value).replace(/<[^>]+>/g, '');
}

function bodyToMarkdown(body) {
  if (!Array.isArray(body)) return '';
  return body
    .map((section) => {
      const heading = section.heading ? `## ${section.heading}\n\n` : '';
      const paragraphs = (section.paragraphs || [])
        .map((p) => {
          if (p && typeof p === 'object' && p.type === 'table') {
            const header = `| ${p.headers.join(' | ')} |`;
            const divider = `| ${p.headers.map(() => '---').join(' | ')} |`;
            const rows = p.rows.map((r) => `| ${r.map(stripTags).join(' | ')} |`).join('\n');
            return `${header}\n${divider}\n${rows}`;
          }
          return stripTags(p);
        })
        .join('\n\n');
      return `${heading}${paragraphs}`;
    })
    .join('\n\n');
}

function findService(slug) {
  return SERVICES.find((s) => s.slug === slug) || Object.values(SERVICES_FLAT).find((s) => s.slug === slug);
}

export function listMcpResources() {
  const insights = INSIGHTS.map((a) => ({
    uri: `gobiya://insights/${a.slug}`,
    name: a.title,
    description: a.dek,
    mimeType: 'text/markdown',
  }));

  const work = CASE_STUDIES.filter((c) => c.study).map((c) => ({
    uri: `gobiya://work/${c.slug}`,
    name: c.client,
    description: c.result,
    mimeType: 'text/markdown',
  }));

  const services = CONSULTING_ITEMS.map((s) => ({
    uri: `gobiya://services/${s.slug}`,
    name: s.title,
    description: s.desc,
    mimeType: 'text/markdown',
  }));

  return [...insights, ...work, ...services];
}

export function readMcpResource(uri) {
  const match = /^gobiya:\/\/(insights|work|services)\/(.+)$/.exec(uri);
  if (!match) return null;
  const [, kind, slug] = match;

  if (kind === 'insights') {
    const article = getInsight(slug);
    if (!article) return null;
    return `# ${article.title}\n\n${article.dek}\n\n${bodyToMarkdown(article.body)}`;
  }

  if (kind === 'work') {
    const study = CASE_STUDIES.find((c) => c.slug === slug && c.study);
    if (!study) return null;
    return `# ${study.client} — ${study.result}\n\n${study.study.dek}\n\n${bodyToMarkdown(study.study.body)}`;
  }

  if (kind === 'services') {
    const service = findService(slug);
    if (!service) return null;
    const desc = service.blurb || service.metaDescription || service.intro || '';
    const capabilities = (service.capabilities || []).map((c) => `- **${c.title}**: ${c.desc}`).join('\n');
    return `# ${service.title}\n\n${stripTags(desc)}\n\n## What's included\n\n${capabilities}`;
  }

  return null;
}
```

- [ ] **Step 2: Wire resources into `app/api/mcp/route.js`**

Add this import near the top, alongside the existing ones:

```js
import { ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';
import { listMcpResources, readMcpResource } from '../../../lib/mcpResources';
```

Add this inside the `createMcpHandler((server) => { ... })` initializer, after the last `server.registerTool(...)` call for `request_seo_audit`:

```js
    server.registerResource(
      'gobiya-content',
      new ResourceTemplate('gobiya://{kind}/{slug}', {
        list: () => ({ resources: listMcpResources() }),
      }),
      {
        title: 'Gobiya content',
        description: 'Insights articles, /work case studies, and consulting service pages.',
      },
      async (uri) => {
        const text = readMcpResource(uri.href);
        if (text == null) {
          throw new Error(`Resource not found: ${uri.href}`);
        }
        return { contents: [{ uri: uri.href, mimeType: 'text/markdown', text }] };
      }
    );
```

- [ ] **Step 3: Manual verification — resources/list + resources/read**

```bash
curl -s -X POST http://localhost:3000/api/mcp \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":3,"method":"resources/list","params":{}}'
```

Expected: a JSON-RPC result with a `resources` array containing roughly 50-70 entries, each with `uri` starting `gobiya://insights/`, `gobiya://work/`, or `gobiya://services/`.

Pick one real `uri` from that list (e.g. `gobiya://services/seo-services`) and read it:

```bash
curl -s -X POST http://localhost:3000/api/mcp \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":4,"method":"resources/read","params":{"uri":"gobiya://services/seo-services"}}'
```

Expected: a JSON-RPC result with `contents[0].text` containing readable Markdown (an `#` heading with the service title, no leftover HTML tags, no `undefined`).

- [ ] **Step 4: Commit**

```bash
git add lib/mcpResources.js app/api/mcp/route.js
git commit -m "feat: expose insights, case studies, and services as MCP resources

lib/mcpResources.js serializes the existing content data (lib/insights.js,
lib/work.js, lib/services.js/servicesFlat.js) into Markdown under the
gobiya://insights|work|services/{slug} URI scheme, wired into
resources/list and resources/read on the MCP server."
```

---

### Task 5: `/mcp` page

**Files:**
- Create: `app/mcp/page.js`

**Interfaces:**
- Consumes: `buildMetadata` from `lib/meta.js` (existing pattern used by every other page); no other new interfaces.

- [ ] **Step 1: Check `lib/meta.js`'s `buildMetadata` signature before writing the page**

```bash
grep -n "export function buildMetadata" -A 10 lib/meta.js
```

Confirm the exact param shape (`{ title, description, path }` per every other page in this codebase, e.g. `app/ai-visibility/page.js`) before writing Step 2 — if it differs, adjust the `metadata` export below to match.

- [ ] **Step 2: Write `app/mcp/page.js`**

```js
import { buildMetadata } from '../../lib/meta';

export const metadata = buildMetadata({
  title: 'MCP Server for AI Agents | Gobiya',
  description:
    "Gobiya's public MCP server — free SEO/domain lookup tools, lead-gen forms, and our full content library, callable by any Model Context Protocol client.",
  path: '/mcp',
});

const TOOLS = [
  { name: 'dns_lookup', tag: 'Lookup', desc: 'DNS records (A, MX, TXT, NS, and more) for a domain.' },
  { name: 'email_verification', tag: 'Lookup', desc: 'Whether an email address is valid, deliverable, and not disposable.' },
  { name: 'ip_geolocation', tag: 'Lookup', desc: 'Geographic location and ISP for an IP address.' },
  { name: 'domain_reputation', tag: 'Lookup', desc: "A domain's reputation score and known risk signals." },
  { name: 'ssl_certificate_lookup', tag: 'Lookup', desc: "A domain's current and historical SSL/TLS certificates." },
  { name: 'threat_intelligence', tag: 'Lookup', desc: 'Malware, phishing, and spam signals for a domain.' },
  { name: 'website_categorization', tag: 'Lookup', desc: "A website's industry/content category classification." },
  { name: 'contact_gobiya', tag: 'Action', desc: 'Send a message to a human at Gobiya.' },
  { name: 'request_seo_audit', tag: 'Action', desc: 'Request a free SEO / AI-visibility audit.' },
];

const CONFIG_SNIPPET = `{
  "mcpServers": {
    "gobiya": {
      "url": "https://www.gobiya.com/api/mcp"
    }
  }
}`;

const CURL_SNIPPET = `curl -X POST https://www.gobiya.com/api/mcp \\
  -H "Content-Type: application/json" \\
  -H "Accept: application/json, text/event-stream" \\
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}'`;

export default function McpPage() {
  return (
    <main id="top">

      <section className="page-hero page-hero--left section" style={{ paddingBottom: '3rem' }}>
        <div className="container">
          <p className="eyebrow" data-reveal><span className="eyebrow__dot"></span>For AI Agents &amp; Developers</p>
          <h1 className="statement" style={{ textAlign: 'left', marginInline: 0 }} data-split>A search agency your own AI agent can talk to.</h1>
          <p className="lede" style={{ marginInline: 0 }} data-reveal>Gobiya runs a public MCP (Model Context Protocol) server — free domain and security lookup tools, a way to reach us directly, and our full library of SEO/GEO content, all callable by any MCP client. Not a page about AI visibility. An actual endpoint an AI agent can use.</p>
        </div>
      </section>

      <section className="section section--tint" id="connect">
        <div className="container container--narrow">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>Connect</p>
          <h2 className="statement statement--small" data-split>One URL, no API key required.</h2>
          <p className="lede" data-reveal>Streamable HTTP transport, live at:</p>
          <pre style={{ background: 'var(--overlay)', color: '#f4f7fb', padding: '1.25rem 1.5rem', overflowX: 'auto', fontSize: '0.9rem' }}>https://www.gobiya.com/api/mcp</pre>
          <p className="lede" data-reveal>Claude Desktop, Cursor, and other MCP-client config:</p>
          <pre style={{ background: 'var(--overlay)', color: '#f4f7fb', padding: '1.25rem 1.5rem', overflowX: 'auto', fontSize: '0.85rem' }}>{CONFIG_SNIPPET}</pre>
          <p className="lede" data-reveal>Or call it directly:</p>
          <pre style={{ background: 'var(--overlay)', color: '#f4f7fb', padding: '1.25rem 1.5rem', overflowX: 'auto', fontSize: '0.85rem' }}>{CURL_SNIPPET}</pre>
        </div>
      </section>

      <section className="section" id="tools">
        <div className="container">
          <p className="eyebrow" data-reveal><span className="eyebrow__dot"></span>Tools</p>
          <h2 className="statement statement--small" data-split style={{ textAlign: 'left' }}>9 callable actions — 7 free lookups, 2 ways to reach us.</h2>
          <div className="svc-grid">
            {TOOLS.map((t) => (
              <div className="svc-card" key={t.name}>
                <span className="svc-card__tag">{t.tag}</span>
                <h3 className="svc-card__title">{t.name}</h3>
                <p className="svc-card__desc">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tint" id="resources">
        <div className="container container--narrow">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>Resources</p>
          <h2 className="statement statement--small" data-split>Browse our content directly, not just links to it.</h2>
          <p className="lede" data-reveal>Every <a href="/insights">insights article</a>, <a href="/work">client case study</a>, and <a href="/services">consulting service page</a> on this site is also exposed as a readable MCP resource — <code>gobiya://insights/{'{slug}'}</code>, <code>gobiya://work/{'{slug}'}</code>, and <code>gobiya://services/{'{slug}'}</code> — so an agent can read the actual content, not just crawl the HTML.</p>
        </div>
      </section>

      <section className="section" id="also">
        <div className="container container--narrow" style={{ textAlign: 'center' }}>
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>Not an MCP client?</p>
          <p className="lede" data-reveal>Plain-text crawlers and AI systems that don&apos;t speak MCP can still read <a href="/llms.txt">/llms.txt</a> for a lighter-weight summary of this site.</p>
        </div>
      </section>

    </main>
  );
}
```

- [ ] **Step 3: Manual verification**

```bash
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/mcp
```

Expected: `200` (not a 301/302 — confirms the earlier redirect removal actually took effect and this route resolves). Then load `http://localhost:3000/mcp` in a browser and confirm the hero, connect snippets, 9-tool grid, and resources section all render without layout breakage.

- [ ] **Step 4: Commit**

```bash
git add app/mcp/page.js
git commit -m "feat: add /mcp documentation page

Human-facing companion to the /api/mcp server added in prior commits —
connection instructions, the 9 available tools, and the 3 content
resource namespaces, in the site's existing page template."
```

---

### Task 6: Minimal MCP regression script

**Files:**
- Create: `scripts/test-mcp.mjs`

**Interfaces:**
- Consumes: the running dev server's `/api/mcp` endpoint (Tasks 3-4). No exports — this is a standalone script, run with `node`, not imported anywhere.

- [ ] **Step 1: Write `scripts/test-mcp.mjs`**

```js
#!/usr/bin/env node
// Minimal MCP regression check: connects to a running dev server's MCP
// endpoint, lists tools/resources, and calls one representative example of
// each. Not a full test suite — this repo has none — just enough to catch
// integration breakage in app/api/mcp/route.js before it ships.
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';

const BASE_URL = process.env.MCP_URL || 'http://localhost:3000/api/mcp';

async function main() {
  const client = new Client({ name: 'gobiya-mcp-smoke-test', version: '1.0.0' });
  const transport = new StreamableHTTPClientTransport(new URL(BASE_URL));
  await client.connect(transport);

  const { tools } = await client.listTools();
  console.log(`tools/list: ${tools.length} tools —`, tools.map((t) => t.name).join(', '));
  if (tools.length !== 9) throw new Error(`Expected 9 tools, got ${tools.length}`);

  const { resources } = await client.listResources();
  console.log(`resources/list: ${resources.length} resources`);
  if (resources.length === 0) throw new Error('Expected at least 1 resource, got 0');

  const dnsResult = await client.callTool({ name: 'dns_lookup', arguments: { domain: 'gobiya.com' } });
  console.log('dns_lookup ->', dnsResult.isError ? `isError: ${dnsResult.content[0].text}` : 'ok');

  const sampleUri = resources.find((r) => r.uri.startsWith('gobiya://services/'))?.uri;
  if (!sampleUri) throw new Error('Expected at least one gobiya://services/ resource');
  const readResult = await client.readResource({ uri: sampleUri });
  console.log(`readResource(${sampleUri}) -> ${readResult.contents[0].text.slice(0, 60)}...`);

  await client.close();
  console.log('All checks passed.');
}

main().catch((err) => {
  console.error('MCP smoke test failed:', err);
  process.exit(1);
});
```

- [ ] **Step 2: Run it against the dev server**

With `npm run dev` running in another terminal:

```bash
node scripts/test-mcp.mjs
```

Expected output ending in `All checks passed.` — if `tools/list` returns fewer than 9 or `resources/list` returns 0, that's a real regression in Task 3/4's wiring, not a flaky test; fix before proceeding.

- [ ] **Step 3: Commit**

```bash
git add scripts/test-mcp.mjs
git commit -m "test: add minimal MCP regression script

Connects a real MCP client to the running dev server, confirms all 9
tools and the content resources are listed, and exercises one tool call
and one resource read — catches integration breakage without a full
test framework, consistent with this repo having none."
```

---

### Task 7: Full end-to-end verification pass

**Files:** none (verification only).

- [ ] **Step 1: Confirm the MCP server end-to-end with a real tool call**

```bash
curl -s -X POST http://localhost:3000/api/mcp \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":5,"method":"tools/call","params":{"name":"dns_lookup","arguments":{"domain":"gobiya.com"}}}'
```

Expected: a JSON-RPC result with `content[0].text` containing real DNS record JSON (or a legible rate-limit message if this IP already hit its 2/24h cap from Task 1's verification — that's correct behavior, not a bug).

- [ ] **Step 2: Confirm the 2 form tools validate correctly without actually spamming email**

```bash
curl -s -X POST http://localhost:3000/api/mcp \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":6,"method":"tools/call","params":{"name":"contact_gobiya","arguments":{"name":"Test","email":"not-an-email"}}}'
```

Expected: a result with `isError: true` and a validation message — confirms the shared `sendContactEmail` validation runs through the MCP path too, without needing to send a real email to prove it.

- [ ] **Step 3: Confirm `/mcp` is reachable and the old redirect is gone**

```bash
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/mcp
grep -c "'/mcp'" next.config.mjs
```

Expected: `200` from the first command; `0` from the second (confirms no `/mcp` redirect entry remains in `next.config.mjs`).

- [ ] **Step 4: Confirm the 7 REST tool routes and 2 form routes are unaffected**

Re-run the Task 1 Step 9 and Task 2 Step 4 curl commands. Expected: identical behavior to before this entire plan started.

- [ ] **Step 5: Update `public/llms.txt` to mention the MCP server**

Add one line under the existing `## Company` section (or a new short section) pointing AI crawlers that do read `llms.txt` toward the richer MCP interface:

```
## MCP Server

- [MCP server for AI agents](https://www.gobiya.com/mcp): Callable tools (domain/security lookups, contact forms) and readable resources (insights, case studies, services) via the Model Context Protocol at https://www.gobiya.com/api/mcp
```

- [ ] **Step 6: Commit**

```bash
git add public/llms.txt
git commit -m "docs: point llms.txt at the new MCP server"
```
