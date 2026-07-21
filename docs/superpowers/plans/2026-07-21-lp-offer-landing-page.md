# /lp Offer Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a conversion-first `/lp` landing page for paid traffic that promotes the existing "Q3 Growth Bundle" offer, strips normal site navigation, embeds a lead form directly in the offer hero, and captures the `ref` query param for attribution.

**Architecture:** A new `middleware.js` tags requests to `/lp*` with a header that `app/layout.js` reads to skip rendering the global `Header`/`Footer`/`AIChatBubble`. `/lp` is a server component that reads `ref` from `searchParams` and renders the reused `.offer-card` visual system (already in `app/globals.css`) with a new client-side lead form embedded where the homepage version has a video. The form posts to a new API route and redirects to `/lp/thank-you` on success.

**Tech Stack:** Next.js 16 (App Router), React server components, Resend (email), existing `app/globals.css` design tokens — no new dependencies.

## Global Constraints

- No per-`ref` copy variants — single generic page, `ref` captured only for attribution (spec: Non-goals).
- No changes to the existing homepage offer card (`app/page.js:174-212`) or `/onboarding` flow.
- No test framework exists in this repo (`package.json` has no test script, no jest/vitest/playwright) — verification is manual dev-server/browser checks, consistent with how `HeroQuickForm.js` and `/api/quick-contact` were built and verified.
- `/lp` and `/lp/thank-you` must render `robots: { index: false, follow: true }` via `buildMetadata()` (spec: Page content).
- Offer copy (title, price, description, expiration date `2026-09-30T23:59:59`) must match `app/page.js:186-197` exactly — this is the same offer, not a new one.
- Form must reuse the existing honeypot field name `company_website` and the same required-field/email-regex validation as `app/api/quick-contact/route.js`.

---

### Task 1: Middleware for minimal-chrome header

**Files:**
- Create: `middleware.js` (project root, alongside `next.config.js`)

**Interfaces:**
- Produces: a `x-minimal-chrome: 1` request header present (readable via `headers()` in Server Components) whenever the request path is `/lp` or starts with `/lp/`. Absent on every other path. Task 2 consumes this.

- [ ] **Step 1: Write `middleware.js`**

```js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const isLpRoute = pathname === '/lp' || pathname.startsWith('/lp/');

  if (!isLpRoute) {
    return NextResponse.next();
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-minimal-chrome', '1');

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: ['/lp', '/lp/:path*'],
};
```

- [ ] **Step 2: Verify middleware compiles and runs**

Run: `npm run dev` (or the project's existing dev script), then in another terminal:
`curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/lp`

Expected: dev server starts with no middleware errors in the terminal log (the route itself will still 404 until Task 5 — that's fine, this step only confirms middleware doesn't crash the server). Stop the dev server after confirming (`Ctrl+C`) — later tasks will restart it.

- [ ] **Step 3: Commit**

```bash
git add middleware.js
git commit -m "feat: add middleware to tag /lp routes for minimal chrome"
```

---

### Task 2: Conditional chrome in root layout

**Files:**
- Modify: `app/layout.js`

**Interfaces:**
- Consumes: `x-minimal-chrome` header from Task 1.
- Produces: `RootLayout` renders `<Header />`, `<Footer />`, and `<AIChatBubble />` only when the header is absent. `SiteSchema`, `BrandWatermark`, `Motion`, and `ConsentAnalytics` are unaffected (always render).

- [ ] **Step 1: Add the `headers()` import and make the layout async**

In `app/layout.js`, add the import alongside the existing ones (after the `Script` import at line 1):

```js
import { headers } from 'next/headers';
```

- [ ] **Step 2: Read the header and conditionally render chrome**

Replace the current `export default function RootLayout({ children }) {` block (`app/layout.js:52-72`) with:

```js
export default async function RootLayout({ children }) {
  const headerList = await headers();
  const minimalChrome = headerList.get('x-minimal-chrome') === '1';

  return (
    <html lang="en" className={`${inter.variable} ${stackSansNotch.variable}`}>
      <body>
        <SiteSchema />
        <BrandWatermark />
        {!minimalChrome && <Header />}
        {children}
        {!minimalChrome && <AIChatBubble />}
        {!minimalChrome && <Footer />}
        <Motion />
        <Script src="/js/main.js" strategy="afterInteractive" />

        {/* GA4 + Clarity only load after explicit consent — see
            components/ConsentAnalytics.js. Nothing analytics-related
            touches the network on a first visit. */}
        <ConsentAnalytics />
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Verify existing pages are unaffected**

Run: `npm run dev`, then open `http://localhost:3000/` in a browser.

Expected: homepage renders exactly as before — header nav, footer, and chat bubble all present. (There's no `/lp` page yet to test the opposite case — that's covered in Task 5's verification.)

- [ ] **Step 4: Commit**

```bash
git add app/layout.js
git commit -m "feat: skip global header/footer/chat bubble on minimal-chrome routes"
```

---

### Task 3: Lead form component

**Files:**
- Create: `components/LpOfferForm.js`
- Reference (do not modify): `components/HeroQuickForm.js` (this task copies its structure/styling)

**Interfaces:**
- Consumes: props `{ source }` — a string, the attribution source (e.g. `"Google"` or `"direct"`), passed in by Task 5's page.
- Produces: a client component that POSTs `{ name, email, phone, message, ref, offer, current_page, company_website }` as JSON to `/api/lp-offer` (built in Task 4), and on success calls `router.push('/lp/thank-you')` (built in Task 6).

- [ ] **Step 1: Write `components/LpOfferForm.js`**

```jsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LpOfferForm({ source }) {
  const router = useRouter();
  const [status, setStatus] = useState('idle'); // 'idle', 'submitting', 'error'
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    data.current_page = typeof window !== 'undefined' ? window.location.href : 'Unknown';

    try {
      const res = await fetch('/api/lp-offer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || 'Failed to send request.');
      }

      router.push('/lp/thank-you');
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMsg(err.message);
    }
  };

  return (
    <div className="hero-quick-form" style={{
      background: '#ffffff',
      border: '1px solid #e5e5e5',
      borderRadius: '8px',
      padding: '2rem',
      boxShadow: 'none',
      width: '100%',
      maxWidth: '420px',
      margin: '0 auto',
      textAlign: 'left'
    }}>
      <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#111827', fontFamily: 'var(--font-heading)' }}>Claim the Q3 Growth Bundle</h3>
      <p style={{ fontSize: '0.8125rem', color: '#4b5563', marginBottom: '1.5rem', lineHeight: '1.4' }}>
        Tell us where to send the details — Steve replies within one business day.
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <input type="text" name="company_website" style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />
        <input type="hidden" name="ref" value={source} />
        <input type="hidden" name="offer" value="Q3 Growth Bundle" />

        <div>
          <label htmlFor="lpf-name" style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#4b5563', marginBottom: '0.375rem' }}>Name <span style={{color: '#e41613'}}>*</span></label>
          <input type="text" id="lpf-name" name="name" required style={{ width: '100%', padding: '0.75rem', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '6px', color: '#111827', outline: 'none', fontSize: '0.9375rem', transition: 'border-color 0.2s' }} onFocus={(e) => e.target.style.borderColor = '#9ca3af'} onBlur={(e) => e.target.style.borderColor = '#e5e7eb'} />
        </div>

        <div>
          <label htmlFor="lpf-email" style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#4b5563', marginBottom: '0.375rem' }}>Email <span style={{color: '#e41613'}}>*</span></label>
          <input type="email" id="lpf-email" name="email" required style={{ width: '100%', padding: '0.75rem', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '6px', color: '#111827', outline: 'none', fontSize: '0.9375rem', transition: 'border-color 0.2s' }} onFocus={(e) => e.target.style.borderColor = '#9ca3af'} onBlur={(e) => e.target.style.borderColor = '#e5e7eb'} />
        </div>

        <div>
          <label htmlFor="lpf-phone" style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#4b5563', marginBottom: '0.375rem' }}>Phone</label>
          <input type="tel" id="lpf-phone" name="phone" style={{ width: '100%', padding: '0.75rem', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '6px', color: '#111827', outline: 'none', fontSize: '0.9375rem', transition: 'border-color 0.2s' }} onFocus={(e) => e.target.style.borderColor = '#9ca3af'} onBlur={(e) => e.target.style.borderColor = '#e5e7eb'} />
        </div>

        <div>
          <label htmlFor="lpf-message" style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#4b5563', marginBottom: '0.375rem' }}>Message</label>
          <textarea id="lpf-message" name="message" rows="2" style={{ width: '100%', padding: '0.75rem', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '6px', color: '#111827', outline: 'none', resize: 'vertical', fontSize: '0.9375rem', transition: 'border-color 0.2s' }} onFocus={(e) => e.target.style.borderColor = '#9ca3af'} onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}></textarea>
        </div>

        {status === 'error' && (
          <div style={{ color: '#ef4444', fontSize: '0.875rem' }}>{errorMsg}</div>
        )}

        <button type="submit" disabled={status === 'submitting'} style={{ marginTop: '0.5rem', background: '#e41613', color: '#fff', border: 'none', padding: '0.875rem', borderRadius: '6px', fontWeight: '600', cursor: status === 'submitting' ? 'not-allowed' : 'pointer', opacity: status === 'submitting' ? 0.7 : 1, transition: 'background 0.2s, opacity 0.2s', fontSize: '0.9375rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
          {status === 'submitting' ? 'Sending...' : 'Claim Offer'}
        </button>

        <p style={{ fontSize: '0.6875rem', color: '#6b7280', textAlign: 'center', marginTop: '-0.25rem', lineHeight: '1.4' }}>
          By submitting this form, you agree to our <a href="/privacy" style={{ color: '#4b5563', textDecoration: 'underline' }}>Privacy Policy</a> and <a href="/terms" style={{ color: '#4b5563', textDecoration: 'underline' }}>Terms of Service</a>. We will never share your information.
        </p>
      </form>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/LpOfferForm.js
git commit -m "feat: add LpOfferForm lead capture component"
```

(This component can't be exercised standalone yet — Task 5 renders it with a real `ref` prop, and Task 4 gives it a working endpoint. Verification happens end-to-end in Task 5.)

---

### Task 4: `/api/lp-offer` route

**Files:**
- Create: `app/api/lp-offer/route.js`
- Reference (do not modify): `app/api/quick-contact/route.js` (this task copies its validation/email structure)

**Interfaces:**
- Consumes: JSON body `{ name, email, phone, message, ref, offer, current_page, company_website }` (matches what `LpOfferForm.js` sends).
- Produces: `POST` handler returning `{ ok: true }` (200) on success/honeypot-trip, `{ error: string }` (400/500/502) on failure — same contract as `/api/quick-contact`.

- [ ] **Step 1: Write `app/api/lp-offer/route.js`**

```js
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function row(label, value) {
  return `
    <tr>
      <td style="padding:10px 16px;border-bottom:1px solid #e5e5e5;color:#8a8a8a;font-size:12px;text-transform:uppercase;letter-spacing:0.06em;white-space:nowrap;vertical-align:top;">${label}</td>
      <td style="padding:10px 16px;border-bottom:1px solid #e5e5e5;color:#2b2b2b;font-size:14px;">${value}</td>
    </tr>`;
}

export async function POST(request) {
  let data;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  // Honeypot — bots fill hidden fields
  if (data.company_website) {
    return NextResponse.json({ ok: true });
  }

  const { name, email, phone, message, current_page, ref, offer } = data;

  if (!name || !email) {
    return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
  }

  const html = `
    <div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:640px;margin:0 auto;">
      <h1 style="font-size:18px;font-weight:600;color:#2b2b2b;margin-bottom:4px;">New ${escapeHtml(offer || 'offer')} lead</h1>
      <p style="font-size:13px;color:#8a8a8a;margin-bottom:20px;">Gobiya.com — /lp landing page (Submitted from: ${escapeHtml(current_page || 'Unknown page')})</p>
      <table style="width:100%;border-collapse:collapse;">
        ${row('Name', escapeHtml(name))}
        ${row('Email', `<a href="mailto:${escapeHtml(email)}" style="color:#e41613;">${escapeHtml(email)}</a>`)}
        ${row('Phone', escapeHtml(phone) || '—')}
        ${row('Source (ref)', escapeHtml(ref) || 'direct')}
        ${row('Message', message ? escapeHtml(message).replace(/\n/g, '<br />') : '—')}
      </table>
    </div>`;

  try {
    const { error } = await resend.emails.send({
      from: process.env.ONBOARDING_FROM_EMAIL || 'Gobiya Contact <onboarding@gobiya.com>',
      to: 'banmart@gmail.com',
      replyTo: email,
      subject: `New Q3 Growth Bundle lead — ${name} (ref: ${ref || 'direct'})`,
      html,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Failed to send. Please try again.' }, { status: 502 });
    }
  } catch (err) {
    console.error('Submission failed:', err);
    return NextResponse.json({ error: 'Failed to send. Please try again.' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
```

- [ ] **Step 2: Verify validation logic without sending real email**

Run: `npm run dev`, then in another terminal, test the honeypot and validation paths (these don't reach the Resend call):

```bash
curl -s -X POST http://localhost:3000/api/lp-offer \
  -H "Content-Type: application/json" \
  -d '{"company_website":"http://spam.example","name":"Bot","email":"bot@example.com"}'
```
Expected: `{"ok":true}` (honeypot silently accepted, no email sent)

```bash
curl -s -X POST http://localhost:3000/api/lp-offer \
  -H "Content-Type: application/json" \
  -d '{"name":"Test"}'
```
Expected: `{"error":"Name and email are required."}`

```bash
curl -s -X POST http://localhost:3000/api/lp-offer \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"not-an-email"}'
```
Expected: `{"error":"Please provide a valid email address."}`

- [ ] **Step 3: Commit**

```bash
git add app/api/lp-offer/route.js
git commit -m "feat: add /api/lp-offer route for landing page lead submissions"
```

---

### Task 5: `/lp` page

**Files:**
- Create: `app/lp/page.js`

**Interfaces:**
- Consumes: `LpOfferForm` from Task 3 (`components/LpOfferForm.js`), `CountdownBadge` from `components/CountdownBadge.js`, `buildMetadata` from `lib/meta.js`, `CONTACT`/`LogoMark` for the minimal header/footer.
- Produces: the `/lp` route. This is the task where Task 1–4 get exercised end-to-end for the first time.

- [ ] **Step 1: Write `app/lp/page.js`**

```jsx
import Image from 'next/image';
import { LogoMark } from '../../components/Logo';
import { CONTACT } from '../../lib/nav';
import { buildMetadata } from '../../lib/meta';
import CountdownBadge from '../../components/CountdownBadge';
import LpOfferForm from '../../components/LpOfferForm';

export const metadata = buildMetadata({
  title: 'The Q3 Growth Bundle Offer',
  description: 'Custom Next.js/React web development starting at $3,500, with an integrated CRM and a YouTube AI video pre-roll ad campaign included. Limited time — ends September 30.',
  path: '/lp',
  robots: { index: false, follow: true },
});

export default async function LpPage({ searchParams }) {
  const params = await searchParams;
  const ref = params.ref || params.utm_source || 'direct';

  return (
    <main id="top">
      <header style={{ padding: '1.5rem clamp(1.5rem, 5vw, 3rem)' }}>
        <a href="/" aria-label="Gobiya — home" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: 'inherit' }}>
          <LogoMark size={30} />
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.125rem' }}>Gobiya</span>
        </a>
      </header>

      <section className="section offer-section" id="lp-offer">
        <div className="container">
          <div className="offer-card" data-reveal>
            <Image
              src="/assets/img/office-collage-montage.webp"
              alt="Office background collage"
              fill
              className="offer-card__bg"
              style={{ objectFit: 'cover' }}
              aria-hidden="true"
            />
            <div className="offer-card__content">
              <CountdownBadge targetDate="2026-09-30T23:59:59" />
              <h1 className="offer-card__title">
                The Q3 <span>Growth Bundle</span> Offer
              </h1>
              <div className="offer-card__price-pill">
                Custom Web Dev Starting at <strong>$3,500</strong>
              </div>
              <p className="offer-card__desc">
                Turn your new website into a complete lead generation machine. For a limited time (ends Sept 30th), every custom Next.js or React build includes a fully integrated CRM to manage your leads, plus a professional YouTube AI video pre-roll ad campaign to drive traffic from day one.
              </p>
              <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', maxWidth: '32rem', lineHeight: '1.5' }}>
                Starting price shown; final price depends on project scope. Includes one custom Next.js/React build, one integrated CRM setup, and one YouTube AI video pre-roll ad campaign. Offer valid through September 30, 2026 and cannot be combined with other offers.
              </p>
            </div>
            <div className="offer-card__visual">
              <LpOfferForm source={ref} />
            </div>
          </div>
        </div>
      </section>

      <footer style={{ padding: '2rem clamp(1.5rem, 5vw, 3rem)', textAlign: 'center', fontSize: '0.8125rem', color: '#6b7280' }}>
        <p>
          &copy; {new Date().getFullYear()} Gobiya &middot; <a href="/privacy" style={{ color: 'inherit' }}>Privacy</a> &middot; <a href="/terms" style={{ color: 'inherit' }}>Terms</a> &middot; <a href={CONTACT.phoneHref} style={{ color: 'inherit' }}>{CONTACT.phone}</a>
        </p>
      </footer>
    </main>
  );
}
```

- [ ] **Step 2: Verify end-to-end in the browser**

Run: `npm run dev`, then open `http://localhost:3000/lp?ref=Google`.

Expected, checked visually:
- No site header nav, no footer sitemap, no chat bubble present (Task 1+2 working)
- Logo-only header at top, links to `/`
- Offer hero shows the countdown badge, "The Q3 Growth Bundle Offer" title, price pill, description — matching `app/page.js`'s homepage offer card copy exactly
- The lead form (not a video) fills the visual slot
- Fine-print disclaimer visible below the description
- Minimal footer strip with Privacy/Terms/phone links only

Then open `http://localhost:3000/` in the same browser tab and confirm the homepage still has its normal header/footer/chat bubble (regression check for Task 2).

- [ ] **Step 3: Verify metadata**

Run: `curl -s http://localhost:3000/lp | grep -i 'noindex'`

Expected: a `<meta name="robots" content="noindex, follow">` tag is present in the output.

- [ ] **Step 4: Commit**

```bash
git add app/lp/page.js
git commit -m "feat: add /lp conversion-first offer landing page"
```

---

### Task 6: `/lp/thank-you` page

**Files:**
- Create: `app/lp/thank-you/page.js`
- Reference (do not modify): `app/onboarding/thank-you/page.js` (this task follows its structure)

**Interfaces:**
- Consumes: nothing dynamic — static confirmation page.
- Produces: the redirect target used by `LpOfferForm.js` (Task 3) on successful submit.

- [ ] **Step 1: Write `app/lp/thank-you/page.js`**

```jsx
import Link from 'next/link';
import { CONTACT } from '../../../lib/nav';
import { buildMetadata } from '../../../lib/meta';

export const metadata = buildMetadata({
  title: 'Thanks',
  description: 'Your Q3 Growth Bundle request was received.',
  robots: { index: false, follow: true },
  path: '/lp/thank-you',
});

export default function LpThankYouPage() {
  return (
    <main id="top">
      <section className="page-hero section">
        <div className="container container--narrow">
          <p className="eyebrow eyebrow--center"><span className="eyebrow__dot"></span>Thank you</p>
          <h1 className="statement">Got it — Steve will personally review this and reply within one business day.</h1>
          <p className="lede">
            We read every submission ourselves — no automated sequences, no generic templates. In the meantime,
            feel free to reach out directly at{' '}
            <a href={`mailto:${CONTACT.email}`} style={{ borderBottom: '1px solid currentColor' }}>{CONTACT.email}</a>{' '}
            or call <a href={CONTACT.phoneHref} style={{ borderBottom: '1px solid currentColor' }}>{CONTACT.phone}</a>.
          </p>
          <div className="hero__ctas">
            <Link href="/" className="btn btn--solid">Back to home</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
```

- [ ] **Step 2: Verify the full form-to-thank-you flow**

Run: `npm run dev`, open `http://localhost:3000/lp?ref=Google`, fill in the form with a real name/email, and submit.

Expected:
- Browser redirects to `http://localhost:3000/lp/thank-you`
- No header/footer/chat bubble on the thank-you page either (still matched by the `/lp/:path*` middleware pattern from Task 1)
- If `RESEND_API_KEY` is configured in the local environment, confirm the email arrives with subject `New Q3 Growth Bundle lead — <name> (ref: Google)` and a `Source (ref)` row showing `Google`

- [ ] **Step 3: Commit**

```bash
git add app/lp/thank-you/page.js
git commit -m "feat: add /lp/thank-you confirmation page"
```

---

## Post-implementation checklist (from spec's Testing / verification section)

- [ ] `/lp?ref=Google` — no header nav, no footer sitemap, no chat bubble; other pages unaffected
- [ ] Valid submit — redirects to `/lp/thank-you`, email contains `ref=Google` and offer tag
- [ ] Honeypot-populated submit — silently accepted, no email sent
- [ ] Invalid/missing email — inline error shown, no redirect
- [ ] `/lp` and `/lp/thank-you` both serve `noindex`
- [ ] Countdown badge and offer copy match the homepage card exactly
