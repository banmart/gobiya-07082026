# Homepage Competitive Rewrite Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite `app/page.js` copy and section order so the homepage leads with Gobiya's founder-operated + AI-visibility differentiator and backs every claim with real data from `lib/searchWins.js`.

**Architecture:** All changes are confined to `app/page.js`, one new data module `lib/homepageFaq.js`, one new test file, and a handful of minimal CSS rules appended to `app/globals.css`. FAQ content lives in a data module (following the `lib/seoMyths.js` pattern) so the same array feeds both the visible `dl/dt/dd` markup and the `FAQPage` JSON-LD without duplication.

**Tech Stack:** Next.js App Router (React Server Components, JSX), vitest (node environment), plain CSS with `mw-*` BEM-ish classes.

## Global Constraints

- **Spec:** `docs/superpowers/specs/2026-07-28-homepage-competitive-rewrite-design.md`. Read it before starting.
- **Branch:** `homepage-competitive-rewrite` (already checked out).
- **No invented numbers.** Every performance figure must trace to `lib/searchWins.js` or `app/pricing/page.js`. Do not add a statistic from any other source, including competitor research.
- **Voice:** plain 9th-grade language, brand-first, keywords natural not stuffed. Short sentences. No hype adjectives, no guarantees.
- **Do not use the phrase "found / cited / chosen" as a hero or heading triad** — Go Fish Digital's H1 owns it. The pricing page's tier names are out of scope and must not be renamed.
- **No visual redesign.** Reuse existing `mw-*` and `faq__*` classes. New CSS is limited to the three small rules specified in Task 3 and Task 6.
- **JSX escaping:** this codebase escapes apostrophes as `&apos;` and quotes as `&ldquo;`/`&rdquo;` inside JSX text. Match that. Em dashes are written literally (`—`).
- **Tests run in the node environment with no JSX transform.** Never `import` `app/page.js` in a test; read it as text with `fs.readFileSync`.
- Run `npm test` after each task. Run `npm run build` in the final task.

---

### Task 1: FAQ content module

Creates the data that Task 6 renders. Follows the `lib/seoMyths.js` convention of a plain exported array consumed by both markup and JSON-LD.

**Files:**
- Create: `lib/homepageFaq.js`
- Create: `tests/unit/homepage-faq.test.js`

**Interfaces:**
- Consumes: nothing.
- Produces: `export const HOMEPAGE_FAQ` — an array of `{ q: string, a: string }` objects. Task 6 imports this by that exact name and maps over `.q` / `.a`.

- [ ] **Step 1: Write the failing test**

Create `tests/unit/homepage-faq.test.js`:

```js
import { describe, it, expect } from 'vitest';
import { HOMEPAGE_FAQ } from '../../lib/homepageFaq.js';

describe('HOMEPAGE_FAQ', () => {
  it('has eight entries', () => {
    expect(HOMEPAGE_FAQ).toHaveLength(8);
  });

  it('gives every entry a question and an answer', () => {
    for (const item of HOMEPAGE_FAQ) {
      expect(item.q.length).toBeGreaterThan(0);
      expect(item.q.endsWith('?')).toBe(true);
      expect(item.a.length).toBeGreaterThan(0);
    }
  });

  it('keeps answers in the 40-70 word range so they stay citable', () => {
    for (const item of HOMEPAGE_FAQ) {
      const words = item.a.trim().split(/\s+/).length;
      expect(words).toBeGreaterThanOrEqual(40);
      expect(words).toBeLessThanOrEqual(70);
    }
  });

  it('quotes only the real published pricing tiers', () => {
    const pricing = HOMEPAGE_FAQ.find((i) => i.q.toLowerCase().includes('cost'));
    expect(pricing.a).toContain('$999');
    expect(pricing.a).toContain('$2,500');
    expect(pricing.a).toContain('$5,500');
  });

  it('makes no guarantees', () => {
    const banned = /guarantee|guaranteed|page one in|#1 ranking/i;
    for (const item of HOMEPAGE_FAQ) {
      expect(banned.test(item.a)).toBe(false);
    }
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- tests/unit/homepage-faq.test.js`
Expected: FAIL — cannot resolve `../../lib/homepageFaq.js`.

- [ ] **Step 3: Create the data module**

Create `lib/homepageFaq.js`. Note this file is plain JS (not JSX), so apostrophes are written literally here — the `&apos;` rule applies only to JSX text:

```js
// Homepage FAQ. This single array feeds both the visible dl/dt/dd markup and
// the FAQPage JSON-LD in app/page.js, so the answer a person reads and the
// answer an AI tool ingests can never drift apart. Same pattern as
// lib/seoMyths.js.
//
// Answers are deliberately 40-70 words: long enough to stand alone as a cited
// passage, short enough that a model quotes it whole. Pricing figures must
// stay in sync with app/pricing/page.js — do not round or estimate them.

export const HOMEPAGE_FAQ = [
  {
    q: 'What does SEO cost in Los Angeles?',
    a: 'Most Los Angeles agencies charge somewhere between $1,000 and $10,000 a month, and the range is that wide because the work is. Our plans run $999 to $2,500 for Findable, $2,500 to $5,500 for Cited, and $5,500 to $10,000 and up for Chosen. What moves you up the range is the size of your site and how competitive your market already is.',
  },
  {
    q: 'What is generative engine optimization (GEO)?',
    a: 'GEO is the work of getting your business named in answers from AI tools like ChatGPT, Perplexity, Gemini and Google AI Overviews. Those tools do not hand back ten blue links for someone to pick through. They write one answer and cite a few sources. GEO is the work of becoming one of the sources they trust enough to name.',
  },
  {
    q: 'How is GEO different from SEO?',
    a: 'SEO earns you a spot on a page of results that a person then chooses from. GEO earns you a mention inside an answer the AI has already written for them. The two share a foundation: clean code, clear content, and real authority. But what ranks on Google and what AI tools actually cite have been drifting apart, so you need both.',
  },
  {
    q: 'How do I get my business cited by ChatGPT?',
    a: 'Answer the questions people actually ask, in plain language, on pages a crawler can read. Label your facts with schema so a model is not left guessing what they mean. Then earn mentions on sites that already carry authority, because AI tools lean on those to decide who is credible. There is no way to pay for a citation.',
  },
  {
    q: 'How long before I see results?',
    a: 'Technical fixes can show up within weeks. Rankings and AI citations for anything competitive usually take three to six months, and longer in a crowded market like Los Angeles. Anyone promising you the top of the results in thirty days is either chasing terms nobody searches for, or doing something that will cost you later.',
  },
  {
    q: 'Do you require a long-term contract?',
    a: 'No. There is no minimum term and no cancellation penalty, and you can stop at the end of any month. We would rather re-earn the work every month than hold you to a year you regret by month three. That arrangement only works if the results are visible to you, which is why you keep direct access to your own data.',
  },
  {
    q: 'Who actually does the work?',
    a: 'Steve Martin, who founded Gobiya in 2010. He runs the analysis, writes the strategy, and answers your email himself. There is no account manager in between and no handoff to a junior team once the pitch is over. That is also the honest limit on how many clients we take on at any one time.',
  },
  {
    q: 'Do you work with businesses outside Los Angeles?',
    a: 'Yes. Los Angeles is home and where most of our clients are, but search and AI visibility work is not tied to a map. We work with businesses across Southern California and remotely beyond it. If your situation genuinely needs someone on site on a regular basis, we will tell you that up front rather than after you sign.',
  },
];
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test -- tests/unit/homepage-faq.test.js`
Expected: PASS, 5 tests.

If the word-count test fails on an entry, adjust that answer's wording to land inside 40–70 words. Do not change the test bounds.

- [ ] **Step 5: Commit**

```bash
git add lib/homepageFaq.js tests/unit/homepage-faq.test.js
git commit -m "feat: add homepage FAQ content module"
```

---

### Task 2: Hero copy and CTA

**Files:**
- Modify: `app/page.js:36-53` (the `mw-hero` section)

**Interfaces:**
- Consumes: nothing.
- Produces: nothing consumed by later tasks.

- [ ] **Step 1: Replace the hero card contents**

In `app/page.js`, replace the contents of `<div className="mw-hero__card">` with:

```jsx
<h1 className="mw-hero__title">
  Search and AI visibility, run by the person you actually hired.
</h1>
<p className="mw-hero__excerpt">
  Gobiya is an independent Los Angeles consultancy. Steve Martin has optimized small and mid-sized businesses for Google, ChatGPT and Perplexity since 2010 — and leads every account himself. No account managers. No long-term contracts.
</p>
<div className="mw-hero__actions">
  <a href="/free-site-scan" className="mw-book__btn-solid">
    Get Your Free Site Scan
  </a>
  <a href="#process" className="mw-hero__btn">
    View Our Process
  </a>
</div>
```

`mw-book__btn-solid` is the existing solid-button style (defined at `app/globals.css:4439`); reusing it avoids new button CSS. `mw-hero__btn` stays as the outline secondary.

- [ ] **Step 2: Add the actions wrapper rule**

Append to `app/globals.css`:

```css
.mw-hero__actions { display: flex; flex-wrap: wrap; gap: 0.75rem; align-items: center; }
```

- [ ] **Step 3: Verify it renders**

Run: `npm run dev`, open `http://localhost:3000/`, confirm the new H1 and two buttons appear and that "Get Your Free Site Scan" navigates to `/free-site-scan`. Stop the dev server.

- [ ] **Step 4: Commit**

```bash
git add app/page.js app/globals.css
git commit -m "feat: lead the hero with the founder-operated differentiator"
```

---

### Task 3: Stats bar driven by real Search Console data

Replaces the two unbacked cards (`Top 1%`, `1 / Goal`) and the unsourced `500+` with figures read from `lib/searchWins.js`.

**Files:**
- Modify: `app/page.js` (imports, and the `mw-stats` section at lines 113-135)
- Modify: `app/globals.css` (append two rules)

**Interfaces:**
- Consumes: `SEARCH_WINS` from `lib/searchWins.js`. Shape: `{ asOf: string, note: string, cards: Array<{ id, label, value, decimals, display, suffix?, window, detail }> }`. Card ids present today: `impressions`, `ctr`, `position`, `ai-citations`.
- Produces: nothing consumed by later tasks.

- [ ] **Step 1: Add the import**

At the top of `app/page.js`, alongside the existing imports:

```js
import { SEARCH_WINS } from '../lib/searchWins';
```

- [ ] **Step 2: Add the card lookup helper**

Below the `STORY_IMAGES` constant in `app/page.js`:

```js
// The stats bar shows real Google Search Console and AI-grounding numbers from
// lib/searchWins.js rather than hardcoded claims. Look cards up by id, never by
// index — the weekly refresh job swaps which metrics are presentable (CTR
// replaces clicks when clicks have no honest window, and so on), so positions
// are not stable. A missing id renders nothing rather than crashing the page.
const winById = (id) => SEARCH_WINS.cards.find((c) => c.id === id);
const STAT_IDS = ['ai-citations', 'impressions', 'position'];
```

- [ ] **Step 3: Replace the stats grid**

Replace the entire contents of `<div className="container">` inside `<section className="mw-stats">` with:

```jsx
<div className="mw-stats__grid">
  <div>
    <div className="mw-stats__num">15+</div>
    <div className="mw-stats__label">Years Experience</div>
    <div className="mw-stats__detail">Optimizing search for small and mid-sized businesses since 2010.</div>
  </div>
  {STAT_IDS.map((id) => {
    const card = winById(id);
    if (!card) return null;
    return (
      <div key={id}>
        <div className="mw-stats__num">
          {card.display}
          {card.suffix || ''}
        </div>
        <div className="mw-stats__label">{card.label}</div>
        <div className="mw-stats__detail">
          {card.detail} <span className="mw-stats__window">{card.window}.</span>
        </div>
      </div>
    );
  })}
</div>
<p className="mw-stats__note">
  Live numbers across every site we run search for, from Google Search Console and AI assistant grounding data. Last updated {SEARCH_WINS.asOf}.
</p>
```

- [ ] **Step 4: Add the two CSS rules**

Append to `app/globals.css`:

```css
.mw-stats__detail { margin-top: 0.4rem; font-size: 0.8125rem; line-height: 1.5; color: #CBD5E1; }
.mw-stats__window { display: block; opacity: 0.75; }
.mw-stats__note { margin-top: 2rem; text-align: center; font-size: 0.75rem; color: #94A3B8; }
```

- [ ] **Step 5: Write the guard test**

Create `tests/unit/homepage-claims.test.js`:

```js
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import path from 'node:path';

// app/page.js is JSX and the vitest environment has no JSX transform, so this
// suite reads it as text. That is enough to lock in the claims policy: the
// homepage must not carry a performance number that has no source.
const source = readFileSync(path.resolve(process.cwd(), 'app/page.js'), 'utf8');

describe('homepage claims', () => {
  it('drops the unbacked Top 1% claim', () => {
    expect(source).not.toContain('Top 1%');
  });

  it('drops the filler goal stat', () => {
    expect(source).not.toContain('Goal: Scale Your Business');
  });

  it('drops the unsourced scan count', () => {
    expect(source).not.toContain('SEO &amp; AI Scans');
  });

  it('reads its statistics from lib/searchWins', () => {
    expect(source).toContain("from '../lib/searchWins'");
    expect(source).toContain('SEARCH_WINS.asOf');
  });

  it('sends the hero call to action to the site scan form', () => {
    expect(source).toContain('href="/free-site-scan"');
  });
});
```

- [ ] **Step 6: Run the tests**

Run: `npm test -- tests/unit/homepage-claims.test.js`
Expected: PASS, 5 tests.

- [ ] **Step 7: Commit**

```bash
git add app/page.js app/globals.css tests/unit/homepage-claims.test.js
git commit -m "feat: back the homepage stats bar with real Search Console data"
```

---

### Task 4: Trust bar heading and section reorder

**Files:**
- Modify: `app/page.js` (the `mw-trust` heading, and the position of the `mw-person` section)

**Interfaces:**
- Consumes: nothing. Produces: nothing.

- [ ] **Step 1: Retitle the trust bar**

Replace the `mw-trust__heading` text with:

```jsx
<h2 className="mw-trust__heading">
  Southern California businesses we&apos;ve run search for since 2010
</h2>
```

Rationale: six logos do not support "Trusted by Hundreds of Entrepreneurs".

- [ ] **Step 2: Move the founder section up**

Cut the entire `{/* ══ 5. Meet Your Point Person ══ */}` section (`<section className="mw-person">` through its closing `</section>`) and paste it immediately after the `<div className="mw-navy-divider" />` that follows the trust bar — so it sits before `<section className="mw-simple">`.

Renumber the `══ N.` comment markers on every section so they read 1..N in their new order. The differentiator now appears before the methodology.

- [ ] **Step 3: Verify DOM order**

Run: `npm run dev`, load `/`, and confirm the order is: hero → trust logos → Meet Your Point Person → the objection section → stats → 4-step method. Stop the dev server.

- [ ] **Step 4: Commit**

```bash
git add app/page.js
git commit -m "feat: move the founder section above the methodology"
```

---

### Task 5: Reframe the objection section

**Files:**
- Modify: `app/page.js` (the `mw-simple` section)

**Interfaces:**
- Consumes: nothing. Produces: nothing.

- [ ] **Step 1: Replace the heading and intro**

```jsx
<h2 className="mw-simple__heading">
  You&apos;ve probably been burned by an SEO agency before
</h2>
<p className="mw-simple__intro">
  Most owners we talk to have already paid someone for a year of reports they couldn&apos;t read and rankings that never turned into phone calls. Here&apos;s how we&apos;re set up differently.
</p>
```

- [ ] **Step 2: Replace the three columns**

```jsx
<div className="mw-simple__grid">
  <div>
    <h3 className="mw-simple__col-title">You work with the person doing the work</h3>
    <p className="mw-simple__col-desc">
      There are no account managers here. Steve runs your account, does the analysis, and answers your email himself. That&apos;s also the honest limit on how many clients we take at once.
    </p>
  </div>
  <div>
    <h3 className="mw-simple__col-title">Leave whenever you want</h3>
    <p className="mw-simple__col-desc">
      No long-term contracts and no cancellation penalty. We re-earn the work every month, which is the only real guarantee anyone in this business can honestly offer you.
    </p>
  </div>
  <div>
    <h3 className="mw-simple__col-title">Numbers you can check yourself</h3>
    <p className="mw-simple__col-desc">
      You keep direct access to your own Search Console and analytics — not a slide deck we assembled for you. If a month was flat, you&apos;ll see it before we tell you.
    </p>
  </div>
</div>
```

Note: this removes the "Gobiya 4-Step Method" mention from the intro paragraph. That is intentional — the method still has its own dedicated section further down the page.

- [ ] **Step 3: Commit**

```bash
git add app/page.js
git commit -m "feat: lead the differentiator section with the burned-buyer objection"
```

---

### Task 6: FAQ section and FAQPage schema

**Files:**
- Modify: `app/page.js` (import, schema constant, new section)
- Modify: `app/globals.css` (append one rule)

**Interfaces:**
- Consumes: `HOMEPAGE_FAQ` from `lib/homepageFaq.js` (Task 1) — array of `{ q, a }`.
- Produces: nothing consumed by later tasks.

- [ ] **Step 1: Add the import and schema constant**

Add to the imports in `app/page.js`:

```js
import { HOMEPAGE_FAQ } from '../lib/homepageFaq';
```

And below the other module constants:

```js
// Same array drives the visible markup and this schema, so the answer a person
// reads is byte-for-byte the answer an AI tool ingests. Matches the pattern in
// app/seo-myths/page.js.
const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: HOMEPAGE_FAQ.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
};
```

- [ ] **Step 2: Render the schema tag**

As the first child of `<main id="top">`:

```jsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
/>
```

- [ ] **Step 3: Add the FAQ section**

Insert immediately before `<section className="mw-consultation">`. This reuses the existing `faq__list` / `faq__item` styles (`app/globals.css:154-170`) — static `dl` markup with no accordion JavaScript, so every answer is in the HTML for crawlers and for anyone without JS:

```jsx
{/* ══ FAQ ══ */}
<section className="mw-faq">
  <div className="container">
    <h2 className="mw-steps__heading">Questions we get asked</h2>
    <dl className="faq__list">
      {HOMEPAGE_FAQ.map((item) => (
        <div className="faq__item" key={item.q}>
          <dt>{item.q}</dt>
          <dd>{item.a}</dd>
        </div>
      ))}
    </dl>
  </div>
</section>
```

- [ ] **Step 4: Add the section spacing rule**

Append to `app/globals.css`:

```css
.mw-faq { padding: 4rem 0; }
.mw-faq .faq__list { max-width: 48rem; margin-inline: auto; }
```

- [ ] **Step 5: Extend the guard test**

Add to `tests/unit/homepage-claims.test.js`:

```js
describe('homepage FAQ', () => {
  it('renders FAQPage schema', () => {
    expect(source).toContain("'@type': 'FAQPage'");
  });

  it('renders answers as static markup, not an accordion', () => {
    expect(source).toContain('HOMEPAGE_FAQ.map');
    expect(source).not.toContain('useState');
  });
});
```

- [ ] **Step 6: Run the tests**

Run: `npm test -- tests/unit/homepage-claims.test.js`
Expected: PASS, 7 tests.

- [ ] **Step 7: Validate the rendered schema**

Run `npm run dev`, load `/`, view source, and copy the `application/ld+json` block into https://validator.schema.org/. Expected: valid `FAQPage` with 8 `Question` entries and no errors. Stop the dev server.

- [ ] **Step 8: Commit**

```bash
git add app/page.js app/globals.css tests/unit/homepage-claims.test.js
git commit -m "feat: add homepage FAQ section with FAQPage schema"
```

---

### Task 7: Tool proof line and full verification

**Files:**
- Modify: `app/page.js` (the `mw-book` section)

**Interfaces:**
- Consumes: nothing. Produces: nothing.

- [ ] **Step 1: Add the tool proof sentence**

In the `mw-book` section, immediately after the `mw-book__desc` paragraph, add:

```jsx
<p className="mw-book__desc">
  We run the same tools on ourselves. Gobiya publishes a{' '}
  <a href="/mcp">public MCP server</a> that lets ChatGPT and Claude query us
  directly, plus <a href="/tools">free tools</a> you can point at your own site
  before you ever talk to us.
</p>
```

- [ ] **Step 2: Confirm both routes exist**

Run: `ls app/mcp app/tools`
Expected: both directories exist. If either is missing, remove that link rather than leaving a dead one.

- [ ] **Step 3: Run the full test suite**

Run: `npm test`
Expected: all suites pass, including the pre-existing `tests/unit` and `tests/rls` files. If an unrelated suite was already failing before this branch, note it rather than fixing it here.

- [ ] **Step 4: Run the production build**

Run: `npm run build`
Expected: build completes with no errors and `/` is emitted.

- [ ] **Step 5: Final read-through against the spec**

Open the page at `npm run dev` and check each success criterion from the spec:
1. No performance claim without a source in `lib/searchWins.js` or `app/pricing/page.js`.
2. `Top 1%` and `1 / Goal: Scale Your Business` are gone.
3. Hero primary CTA resolves to `/free-site-scan`.
4. `Meet Your Point Person` precedes the objection section in DOM order.
5. FAQ answers visible with JavaScript disabled; `FAQPage` JSON-LD validates.
6. `npm run build` succeeds and tests pass.

- [ ] **Step 6: Commit**

```bash
git add app/page.js
git commit -m "feat: point the homepage at the MCP server and free tools"
```

---

## Self-review notes

- **Spec coverage:** hero → Task 2; stats bar → Task 3; trust bar → Task 4; reorder → Task 4; objection reframe → Task 5; FAQ + schema → Tasks 1 and 6; tool proof → Task 7. All six spec changes are covered.
- **Out of scope, deliberately untouched:** pricing tier names, the calendar mockup in the consultation section (flagged in the spec as its own ticket), testimonials, the hero image, and all existing `mw-*` visual styling beyond the four appended layout rules.
- **Naming consistency:** `HOMEPAGE_FAQ` (Task 1) is the exact name imported in Task 6. `SEARCH_WINS`, `winById`, and `STAT_IDS` are defined and used only within Task 3.
