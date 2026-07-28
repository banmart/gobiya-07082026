# /seo-services-los-angeles Competitive Rewrite Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make `/seo-services-los-angeles` competitive with the pages that rank for Los Angeles SEO terms, by collapsing the redirect chains that feed it, rendering the authored proof content that currently never reaches the page, fixing its metadata and schema, and filling the coverage gaps.

**Architecture:** Four files change. `next.config.mjs` gets destination-string retargeting only. `lib/servicesFlat.js` holds all copy (title, description, capabilities, service areas, FAQs) as data. `components/FlatServiceTemplate.js` gains render blocks for fields that already exist in the data plus a schema fix, benefiting all four service pages. `app/globals.css` gets the small rules the new blocks need.

**Tech Stack:** Next.js App Router (React Server Components, JSX), vitest (node environment, no JSX transform), plain CSS with `mw-*` classes.

## Global Constraints

- **Spec:** `docs/superpowers/specs/2026-07-28-seo-services-la-competitive-design.md`. Read it before starting.
- **Branch:** create `seo-services-la-rewrite` off `main` before Task 1.
- **No invented numbers.** Every figure must trace to `lib/servicesFlat.js`, `lib/searchWins.js`, or `app/pricing/page.js`. Do not add review counts, awards, client counts, or satisfaction percentages — Gobiya has none, and the spec deliberately leaves that gap visible.
- **No guarantees** in any copy. No "page one", no "#1 ranking", no timeframe promises.
- **Voice:** plain 9th-grade language, brand-first, natural keywords, short sentences. Match the existing entries in `lib/servicesFlat.js`.
- **Do not rename the pricing tiers** and do not reconcile the FAQ market-rate ranges with `/pricing`; the spec explicitly leaves both alone.
- **`lib/servicesFlat.js` is plain JS**, so apostrophes are written literally there. `components/FlatServiceTemplate.js` is JSX — escape apostrophes as `&apos;` in JSX text.
- **Tests run in the node environment with no JSX transform.** Never `import` a `.js` file containing JSX in a test; read it as text with `fs.readFileSync`.
- Run `npm test` after each task. Run `npm run build` in the final task.

---

### Task 1: Collapse the redirect chains

Highest-impact change and fully independent of the content work. Every legacy location URL currently takes two 308 hops to reach the page.

**Files:**
- Modify: `next.config.mjs`
- Test: `tests/unit/redirect-chains.test.js` (create)

**Interfaces:**
- Consumes: nothing.
- Produces: nothing consumed by later tasks.

- [ ] **Step 1: Create the branch**

```bash
git checkout main && git checkout -b seo-services-la-rewrite
```

- [ ] **Step 2: Write the failing test**

Create `tests/unit/redirect-chains.test.js`:

```js
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import path from 'node:path';

// next.config.mjs exports an async function in some Next versions, so parse the
// redirect rules out of the source text instead of importing and invoking it.
const source = readFileSync(path.resolve(process.cwd(), 'next.config.mjs'), 'utf8');

const rules = [...source.matchAll(/source:\s*'([^']+)',\s*destination:\s*'([^']+)'/g)].map(
  (m) => ({ source: m[1], destination: m[2] })
);

describe('redirect rules', () => {
  it('finds the redirect table', () => {
    expect(rules.length).toBeGreaterThan(100);
  });

  it('never points a redirect at a URL that is itself redirected', () => {
    const sources = new Set(rules.map((r) => r.source));
    const chained = rules.filter((r) => sources.has(r.destination));
    expect(chained.map((r) => `${r.source} -> ${r.destination}`)).toEqual([]);
  });
});
```

- [ ] **Step 3: Run the test to verify it fails**

Run: `npm test -- tests/unit/redirect-chains.test.js`
Expected: FAIL — the second test lists 56 chained rules, e.g. `/glendale-seo -> /seo-services`.

- [ ] **Step 4: Retarget the chained destinations**

Apply exactly these three replacements across `next.config.mjs`. Only replace where the string appears as a `destination`, never as a `source` — lines 38–41 define `source: '/seo-services'` and friends and must stay untouched.

```bash
python - <<'PY'
import re
p = 'next.config.mjs'
s = open(p, encoding='utf-8').read()
pairs = [
    ("destination: '/seo-services'", "destination: '/seo-services-los-angeles'"),
    ("destination: '/ppc-management-services'", "destination: '/ppc-management-services-los-angeles'"),
    ("destination: '/content-marketing-services'", "destination: '/content-marketing-services-los-angeles'"),
]
for old, new in pairs:
    print(old, '->', s.count(old), 'occurrences')
    s = s.replace(old, new)
open(p, 'w', encoding='utf-8', newline='\n').write(s)
PY
```

Expected counts: 52, 2, 2.

- [ ] **Step 5: Run the test to verify it passes**

Run: `npm test -- tests/unit/redirect-chains.test.js`
Expected: PASS, 2 tests.

- [ ] **Step 6: Confirm lines 38-41 survived**

Run: `grep -n "source: '/seo-services'," next.config.mjs`
Expected: one line, `{ source: '/seo-services', destination: '/seo-services-los-angeles', permanent: true },`. If this returns nothing, the replacement was too broad — revert and redo.

- [ ] **Step 7: Commit**

```bash
git add next.config.mjs tests/unit/redirect-chains.test.js
git commit -m "fix: collapse two-hop redirect chains into the service pages"
```

---

### Task 2: Metadata and areaServed schema

**Files:**
- Modify: `lib/servicesFlat.js` (the `seo-services-los-angeles` `title` and `metaDescription`)
- Modify: `components/FlatServiceTemplate.js:25-28`
- Test: `tests/unit/service-page-meta.test.js` (create)

**Interfaces:**
- Consumes: `SERVICES_FLAT` from `lib/servicesFlat.js`.
- Produces: nothing consumed by later tasks.

- [ ] **Step 1: Write the failing test**

Create `tests/unit/service-page-meta.test.js`:

```js
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { SERVICES_FLAT } from '../../lib/servicesFlat.js';

// buildMetadata in lib/meta.js appends ' — Gobiya' (9 chars) unless the title
// already contains the brand. Titles must fit Google's ~60 char display budget
// including that suffix.
const SUFFIX = ' — Gobiya';
const rendered = (t) => (t.toLowerCase().includes('gobiya') ? t : t + SUFFIX);

describe('flat service page metadata', () => {
  it('keeps every rendered title within 60 characters', () => {
    for (const [slug, s] of Object.entries(SERVICES_FLAT)) {
      expect(rendered(s.title).length, `${slug}: ${rendered(s.title)}`).toBeLessThanOrEqual(60);
    }
  });

  it('keeps every meta description within 155 characters', () => {
    for (const [slug, s] of Object.entries(SERVICES_FLAT)) {
      expect(s.metaDescription.length, slug).toBeLessThanOrEqual(155);
    }
  });

  it('names Los Angeles in the SEO page description', () => {
    expect(SERVICES_FLAT['seo-services-los-angeles'].metaDescription).toMatch(/Los Angeles/);
  });
});

describe('service schema', () => {
  const tpl = readFileSync(path.resolve(process.cwd(), 'components/FlatServiceTemplate.js'), 'utf8');

  it('does not claim the whole United States as the service area', () => {
    expect(tpl).not.toContain("name: 'United States'");
  });

  it('names Los Angeles and California as the service area', () => {
    expect(tpl).toContain("name: 'Los Angeles'");
    expect(tpl).toContain("name: 'California'");
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- tests/unit/service-page-meta.test.js`
Expected: FAIL — the title test reports 66 chars for `seo-services-los-angeles`, and both schema tests fail.

- [ ] **Step 3: Update the title and description**

In `lib/servicesFlat.js`, inside the `'seo-services-los-angeles'` entry, replace the `title` and `metaDescription` lines with:

```js
    title: 'Los Angeles SEO Services | Technical & Local SEO',
    metaDescription: 'Los Angeles SEO services that fix what is blocking Google, then build rankings and AI visibility. Founder-led, no long-term contracts. Free site scan.',
```

- [ ] **Step 4: Fix the areaServed schema**

In `components/FlatServiceTemplate.js`, replace the `areaServed` block:

```js
    // Every flat service page is a Los Angeles page, and SiteSchema already
    // declares City: Los Angeles for the organization. Claiming the whole
    // country here contradicted it.
    areaServed: [
      { '@type': 'City', name: 'Los Angeles' },
      { '@type': 'State', name: 'California' },
    ],
```

- [ ] **Step 5: Run the tests**

Run: `npm test -- tests/unit/service-page-meta.test.js`
Expected: PASS, 5 tests.

If another service page's title now fails the 60-char check, shorten that title too rather than relaxing the test — the constraint is real for all of them.

- [ ] **Step 6: Commit**

```bash
git add lib/servicesFlat.js components/FlatServiceTemplate.js tests/unit/service-page-meta.test.js
git commit -m "fix: shorten the SEO page title and scope service schema to Los Angeles"
```

---

### Task 3: Render the authored proof content

The single highest-value content change and it requires no new writing. `datapoint`, `testimonial`, `problem`, `process` and `ctaTitle` exist in the data for all four service pages and never render.

**Files:**
- Modify: `components/FlatServiceTemplate.js`
- Modify: `app/globals.css` (append)
- Test: `tests/unit/service-page-meta.test.js` (extend)

**Interfaces:**
- Consumes: `service.datapoint` `{ value, decimals, suffix, label, sourceNote, href }`, `service.testimonial` `{ quote, name, company, role, photo, href }`, `service.problem` `{ eyebrow, statement }`, `service.process` `[{ step, title, desc }]`, `service.ctaTitle` (string) — all already present in `lib/servicesFlat.js`.
- Produces: nothing consumed by later tasks.

- [ ] **Step 1: Extend the test**

Append to `tests/unit/service-page-meta.test.js`:

```js
describe('flat service template renders its authored content', () => {
  const tpl = readFileSync(path.resolve(process.cwd(), 'components/FlatServiceTemplate.js'), 'utf8');

  it('renders the datapoint with its source note', () => {
    expect(tpl).toContain('service.datapoint');
    expect(tpl).toContain('sourceNote');
  });

  it('renders the testimonial', () => {
    expect(tpl).toContain('service.testimonial');
  });

  it('renders the problem statement', () => {
    expect(tpl).toContain('service.problem');
  });

  it('renders the process steps', () => {
    expect(tpl).toContain('service.process');
  });

  it('prefers the authored CTA title when present', () => {
    expect(tpl).toContain('service.ctaTitle');
  });
});

describe('service data still carries the fields the template needs', () => {
  it('gives every flat service page a datapoint, testimonial, problem and process', () => {
    for (const [slug, s] of Object.entries(SERVICES_FLAT)) {
      expect(s.datapoint, slug).toBeTruthy();
      expect(s.testimonial, slug).toBeTruthy();
      expect(s.problem, slug).toBeTruthy();
      expect(Array.isArray(s.process), slug).toBe(true);
    }
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- tests/unit/service-page-meta.test.js`
Expected: FAIL on the five render assertions.

- [ ] **Step 3: Add the Image import**

At the top of `components/FlatServiceTemplate.js`, add alongside the existing imports:

```js
import Image from 'next/image';
```

- [ ] **Step 4: Add the problem + datapoint block**

Insert immediately after the closing `</section>` of the `mw-subhero` block (currently line 70) and before the `{/* ══ 3. Pillar Hierarchical Grid ... */}` comment:

```jsx
      {/* ══ Problem statement + headline metric ══
          Both come straight from lib/servicesFlat.js. Each is guarded so a page
          without the field renders nothing rather than an empty shell. */}
      {(service.problem || service.datapoint) && (
        <section className="mw-svc-proof">
          <div className="container">
            <div className="mw-svc-proof__grid">
              {service.problem && (
                <div>
                  <p className="mw-svc-proof__eyebrow">{service.problem.eyebrow}</p>
                  <p className="mw-svc-proof__statement">{service.problem.statement}</p>
                </div>
              )}
              {service.datapoint && (
                <div className="mw-svc-proof__stat">
                  <div className="mw-svc-proof__num">
                    {service.datapoint.value.toFixed(service.datapoint.decimals ?? 0)}
                    {service.datapoint.suffix || ''}
                  </div>
                  <div className="mw-svc-proof__label">{service.datapoint.label}</div>
                  {service.datapoint.sourceNote && (
                    <p className="mw-svc-proof__source">
                      {service.datapoint.href ? (
                        <a href={service.datapoint.href}>{service.datapoint.sourceNote}</a>
                      ) : (
                        service.datapoint.sourceNote
                      )}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      )}
```

- [ ] **Step 5: Add the process and testimonial blocks**

Insert immediately after the closing `</div>` of the pillar grid container (currently line 122) and before the `{/* ══ 4. Bottom Navy CTA Banner ══ */}` comment:

```jsx
      {/* ══ How the work runs ══ */}
      {service.process?.length > 0 && (
        <section className="mw-svc-process">
          <div className="container">
            <h2 className="mw-svc-process__heading">How the work runs</h2>
            <div className="mw-svc-process__grid">
              {service.process.map((p) => (
                <div key={p.step} className="mw-svc-process__step">
                  <div className="mw-svc-process__num">{p.step}</div>
                  <h3 className="mw-svc-process__title">{p.title}</h3>
                  <p className="mw-svc-process__desc">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══ Client proof ══ */}
      {service.testimonial && (
        <section className="mw-svc-quote">
          <div className="container">
            <blockquote className="mw-svc-quote__text">
              &ldquo;{service.testimonial.quote}&rdquo;
            </blockquote>
            <div className="mw-svc-quote__who">
              {service.testimonial.photo && (
                <Image
                  src={service.testimonial.photo}
                  alt={service.testimonial.name || service.testimonial.company}
                  width={48}
                  height={48}
                  className="mw-svc-quote__avatar"
                />
              )}
              <div>
                <strong>
                  {service.testimonial.name ? `${service.testimonial.name}, ` : ''}
                  {service.testimonial.company}
                </strong>
                {service.testimonial.role && <div>{service.testimonial.role}</div>}
              </div>
            </div>
            {service.testimonial.href && (
              <a href={service.testimonial.href} className="mw-svc-quote__link">
                Read the case study
              </a>
            )}
          </div>
        </section>
      )}
```

- [ ] **Step 6: Use the authored CTA title**

Replace the `<h2 className="mw-navy-banner__title">` contents in the bottom CTA banner:

```jsx
          <h2 className="mw-navy-banner__title">
            {service.ctaTitle || `Ready to scale your business with ${displayTitle}?`}
          </h2>
```

- [ ] **Step 7: Append the CSS**

```bash
cat >> app/globals.css <<'EOF'

/* ═══════════ Flat service page: proof, process, testimonial ═══════════ */
.mw-svc-proof { padding-block: clamp(2.5rem, 5vw, 4rem); background: #FAFAFA; }
.mw-svc-proof__grid { display: grid; gap: 2rem; grid-template-columns: 1fr; align-items: center; }
@media (min-width: 900px) { .mw-svc-proof__grid { grid-template-columns: 1.6fr 1fr; } }
.mw-svc-proof__eyebrow { text-transform: uppercase; letter-spacing: 0.08em; font-size: 0.75rem; color: #8C1D2F; font-weight: 700; margin-bottom: 0.5rem; }
.mw-svc-proof__statement { font-family: 'PT Serif', Georgia, serif; font-size: clamp(1.125rem, 2vw, 1.4rem); line-height: 1.5; color: #0B1E36; }
.mw-svc-proof__stat { text-align: center; }
.mw-svc-proof__num { font-family: 'PT Serif', Georgia, serif; font-size: clamp(2.5rem, 6vw, 3.75rem); color: #0B1E36; line-height: 1; }
.mw-svc-proof__label { margin-top: 0.5rem; font-size: 0.875rem; color: #475569; }
.mw-svc-proof__source { margin-top: 0.75rem; font-size: 0.75rem; color: #64748B; }

.mw-svc-process { padding-block: clamp(3rem, 6vw, 4.5rem); }
.mw-svc-process__heading { font-family: 'PT Serif', Georgia, serif; font-size: clamp(1.5rem, 3vw, 2rem); color: #0B1E36; text-align: center; margin-bottom: 2rem; }
.mw-svc-process__grid { display: grid; gap: 1.5rem; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); }
.mw-svc-process__num { font-family: 'PT Serif', Georgia, serif; font-size: 1.5rem; color: #8C1D2F; }
.mw-svc-process__title { font-size: 1rem; font-weight: 700; color: #0B1E36; margin-block: 0.35rem 0.5rem; }
.mw-svc-process__desc { font-size: 0.9375rem; line-height: 1.6; color: #475569; }

.mw-svc-quote { padding-block: clamp(3rem, 6vw, 4.5rem); background: #FAFAFA; }
.mw-svc-quote__text { max-width: 46rem; margin-inline: auto; font-family: 'PT Serif', Georgia, serif; font-size: clamp(1.0625rem, 2vw, 1.3rem); line-height: 1.6; color: #0B1E36; }
.mw-svc-quote__who { display: flex; gap: 0.75rem; align-items: center; justify-content: center; margin-top: 1.5rem; font-size: 0.875rem; color: #475569; }
.mw-svc-quote__avatar { border-radius: 50%; object-fit: cover; }
.mw-svc-quote__link { display: block; text-align: center; margin-top: 1.25rem; font-weight: 700; color: #8C1D2F; }
EOF
```

- [ ] **Step 8: Run the tests**

Run: `npm test -- tests/unit/service-page-meta.test.js`
Expected: PASS, 11 tests.

- [ ] **Step 9: Commit**

```bash
git add components/FlatServiceTemplate.js app/globals.css tests/unit/service-page-meta.test.js
git commit -m "feat: render the proof, process and testimonial already authored for service pages"
```

---

### Task 4: Capabilities, service areas, NAP and FAQs

All remaining content lives in `lib/servicesFlat.js`, plus one render block for the service-area list and NAP.

**Files:**
- Modify: `lib/servicesFlat.js` (the `seo-services-los-angeles` entry)
- Modify: `components/FlatServiceTemplate.js`
- Test: `tests/unit/service-page-content.test.js` (create)

**Interfaces:**
- Consumes: `CONTACT` from `lib/nav.js` — `{ phone: '323-744-1338', phoneHref: 'tel:+13237441338', address1: '3580 Wilshire Blvd, Ste 132', address2: 'Los Angeles, CA 90010' }`.
- Produces: `service.serviceAreas` — an array of plain strings, consumed only by this task's render block.

- [ ] **Step 1: Write the failing test**

Create `tests/unit/service-page-content.test.js`:

```js
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { SERVICES_FLAT } from '../../lib/servicesFlat.js';

const seo = SERVICES_FLAT['seo-services-los-angeles'];

describe('seo-services-los-angeles content', () => {
  it('covers nine capabilities', () => {
    expect(seo.capabilities).toHaveLength(9);
  });

  it('points every capability at a real internal path', () => {
    for (const c of seo.capabilities) {
      expect(c.href, c.title).toMatch(/^\/(glossary|insights|work|services)\//);
    }
  });

  it('carries thirteen FAQs', () => {
    expect(seo.faqs).toHaveLength(13);
  });

  it('answers the on-page, service-business and coverage questions', () => {
    const qs = seo.faqs.map((f) => f.q.toLowerCase()).join(' | ');
    expect(qs).toMatch(/on-page seo/);
    expect(qs).toMatch(/service businesses/);
    expect(qs).toMatch(/area/);
  });

  it('lists the suburbs the redirects consolidate', () => {
    expect(seo.serviceAreas).toContain('Glendale');
    expect(seo.serviceAreas).toContain('Studio City');
    expect(seo.serviceAreas.length).toBeGreaterThanOrEqual(15);
  });

  it('makes no guarantees anywhere in the copy', () => {
    const blob = JSON.stringify(seo).toLowerCase();
    expect(blob).not.toMatch(/we guarantee|guaranteed ranking|page one in/);
  });
});

describe('service template surfaces contact details', () => {
  const tpl = readFileSync(path.resolve(process.cwd(), 'components/FlatServiceTemplate.js'), 'utf8');

  it('imports CONTACT rather than hardcoding the phone number', () => {
    expect(tpl).toContain("from '../lib/nav'");
    expect(tpl).toContain('CONTACT.phoneHref');
    expect(tpl).not.toContain('323-744-1338');
  });

  it('renders the service area list', () => {
    expect(tpl).toContain('service.serviceAreas');
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- tests/unit/service-page-content.test.js`
Expected: FAIL — 4 capabilities not 9, 10 FAQs not 13, `serviceAreas` undefined.

- [ ] **Step 3: Add the five capabilities**

In `lib/servicesFlat.js`, append these to the existing `capabilities` array of `'seo-services-los-angeles'` (keep all four existing entries first):

```js
      { tag: 'Keywords', title: 'Keyword research & strategy', href: '/glossary/keyword-research', desc: 'We find the searches your actual buyers type, not the ones with the biggest numbers next to them. A smaller phrase that ends in a phone call beats a popular one that never does.' },
      { tag: 'Authority', title: 'Link building & digital PR', href: '/glossary/backlink', desc: 'We earn mentions on real sites people read, through work worth writing about. We do not buy bulk links, because those are the ones that cost you later.' },
      { tag: 'On-page', title: 'On-page SEO', href: '/glossary/internal-linking', desc: 'We write titles and headings that match what people search for, and link your pages together so both readers and search engines can tell which page answers what.' },
      { tag: 'Local', title: 'Local SEO & Google Business Profile', href: '/glossary/google-business-profile', desc: 'We set up and clean your Google Business Profile, make your name, address and phone match everywhere they appear, and work on showing up in the local map results.' },
      { tag: 'Content', title: 'Content strategy', href: '/glossary/local-seo', desc: 'We write for the questions your customers actually ask, in plain language, and structure it so Google and AI tools can quote it directly in an answer.' },
```

- [ ] **Step 4: Add the service areas**

Add this field to the same entry, directly after `metaDescription`:

```js
    // Named as plain text, never links: all 18 of these URLs now 308 to this
    // page, so linking them would re-fragment what the redirects consolidated.
    serviceAreas: [
      'Glendale', 'Studio City', 'Beverly Hills', 'Encino', 'Woodland Hills',
      'Northridge', 'Sherman Oaks', 'Santa Monica', 'Long Beach', 'Anaheim',
      'Burbank', 'Costa Mesa', 'Culver City', 'North Hollywood', 'Silverlake',
      'Van Nuys', 'Ventura', 'Santa Clarita',
    ],
```

- [ ] **Step 5: Add the three FAQs**

Append to the existing `faqs` array of the same entry:

```js
      { q: 'What is on-page SEO, and do I need it?', a: 'On-page SEO is the work done on the page itself: the title, the headings, how the text is written, and how pages link to each other. It is usually the cheapest place to find wins, because you control all of it. Most sites we look at have pages competing against each other for the same phrase without anyone noticing.' },
      { q: 'Do you work with service businesses like contractors, clinics, and law firms?', a: 'Yes, and that is most of our work. Service businesses live or die on the phone ringing, so we care more about calls booked than about a ranking screenshot. Our case studies include a dental group, a security integrator, a plumbing company, and a fingerprinting service, all in Southern California.' },
      { q: 'Do you cover my area outside central Los Angeles?', a: 'Yes. We work across Los Angeles County and into Orange and Ventura counties, including Glendale, Burbank, Studio City, Sherman Oaks, Encino, Woodland Hills, Northridge, Van Nuys, North Hollywood, Culver City, Santa Monica, Beverly Hills, Long Beach, Anaheim, Costa Mesa, Santa Clarita and Ventura. The work is the same wherever you are.' },
```

- [ ] **Step 6: Render the service areas and NAP**

In `components/FlatServiceTemplate.js`, add the import:

```js
import { CONTACT } from '../lib/nav';
```

Then insert this immediately before the `{/* ══ 4. Bottom Navy CTA Banner ══ */}` comment:

```jsx
      {/* ══ Where we work + how to reach us ══ */}
      {service.serviceAreas?.length > 0 && (
        <section className="mw-svc-areas">
          <div className="container">
            <h2 className="mw-svc-areas__heading">Where we work</h2>
            <p className="mw-svc-areas__list">{service.serviceAreas.join(' · ')}</p>
            <p className="mw-svc-areas__nap">
              {CONTACT.address1}, {CONTACT.address2} ·{' '}
              <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
            </p>
          </div>
        </section>
      )}
```

- [ ] **Step 7: Append the CSS**

```bash
cat >> app/globals.css <<'EOF'
.mw-svc-areas { padding-block: clamp(2.5rem, 5vw, 3.5rem); text-align: center; }
.mw-svc-areas__heading { font-family: 'PT Serif', Georgia, serif; font-size: clamp(1.25rem, 2.5vw, 1.6rem); color: #0B1E36; margin-bottom: 1rem; }
.mw-svc-areas__list { max-width: 52rem; margin-inline: auto; font-size: 0.9375rem; line-height: 1.9; color: #475569; }
.mw-svc-areas__nap { margin-top: 1.25rem; font-size: 0.875rem; color: #64748B; }
EOF
```

- [ ] **Step 8: Run the tests**

Run: `npm test -- tests/unit/service-page-content.test.js`
Expected: PASS, 8 tests.

- [ ] **Step 9: Commit**

```bash
git add lib/servicesFlat.js components/FlatServiceTemplate.js app/globals.css tests/unit/service-page-content.test.js
git commit -m "feat: expand SEO service coverage, name service areas, surface contact details"
```

---

### Task 5: Full verification

**Files:**
- No source changes expected. Fix and re-commit only if a check fails.

**Interfaces:**
- Consumes: everything from Tasks 1-4. Produces: nothing.

- [ ] **Step 1: Run the full test suite**

Run: `npm test`
Expected: all suites pass. The homepage suites from the previous branch (`homepage-faq`, `homepage-claims`) may not exist on this branch — that is expected, not a failure.

- [ ] **Step 2: Run the production build**

Run: `npm run build`
Expected: completes with no errors.

- [ ] **Step 3: Verify the rendered page**

```bash
npm start > /tmp/next-verify.log 2>&1 &
sleep 12
node -e "
const fs=require('fs');
const html=fs.readFileSync('.next/server/app/seo-services-los-angeles.html','utf8');
const text=html.replace(/<script[^>]*>.*?<\/script>/gs,'');
const c=(l,v)=>console.log((v?'PASS':'FAIL')+'  '+l);
c('title within 60 chars', (html.match(/<title>([^<]*)<\/title>/)||[])[1].length<=60);
c('renders the 113% datapoint', text.includes('113'));
c('renders the Search Console source note', /Search Console/i.test(text));
c('renders the testimonial', text.includes('Pete Urueta'));
c('links the case study', text.includes('/work/safetycentric'));
c('renders the process steps', text.includes('Technical audit'));
c('renders the service areas', text.includes('Glendale') && text.includes('Studio City'));
c('renders the phone number', text.includes('323-744-1338'));
const blocks=[...html.matchAll(/<script type=\"application\/ld\+json\">(.*?)<\/script>/gs)].map(m=>{try{return JSON.parse(m[1])}catch{return null}});
const svc=blocks.find(b=>b&&b['@type']==='Service');
const faq=blocks.find(b=>b&&b['@type']==='FAQPage');
c('service schema names Los Angeles', JSON.stringify(svc.areaServed).includes('Los Angeles'));
c('service schema drops United States', !JSON.stringify(svc.areaServed).includes('United States'));
c('FAQPage has 13 questions', faq && faq.mainEntity.length===13);
"
pkill -f next-server
```

Expected: every line PASS.

- [ ] **Step 4: Verify the redirect chain in the built app**

```bash
npm start > /tmp/next-verify2.log 2>&1 &
sleep 12
for u in /glendale-seo /locations/glendale /on-page-seo-los-angeles; do
  curl -s -o /dev/null -w "$u -> %{redirect_url} (%{http_code})\n" "http://localhost:3000$u"
done
pkill -f next-server
```

Expected: each returns a single 308 straight to `http://localhost:3000/seo-services-los-angeles`, with no intermediate `/seo-services`.

- [ ] **Step 5: Check the other three service pages did not break**

```bash
npm start > /tmp/next-verify3.log 2>&1 &
sleep 12
for p in geo-services-los-angeles ppc-management-services-los-angeles content-marketing-services-los-angeles; do
  curl -s -o /dev/null -w "$p %{http_code}\n" "http://localhost:3000/$p"
done
pkill -f next-server
```

Expected: three 200s. These pages share the template and now render their own testimonial, datapoint, problem and process.

- [ ] **Step 6: Commit any fixes**

If Steps 1-5 required changes:

```bash
git add -A
git commit -m "fix: address verification findings on the service page rewrite"
```

---

## Self-review notes

- **Spec coverage:** §1 redirects → Task 1; §2 metadata → Task 2; §3 areaServed → Task 2; §4 render authored content → Task 3; §5 capabilities → Task 4; §6 service areas → Task 4; §7 NAP → Task 4; §8 FAQs → Task 4. All nine success criteria are checked in Task 5.
- **Naming consistency:** `serviceAreas` is defined in Task 4 Step 4 and consumed in Task 4 Step 6. `CONTACT.phoneHref` and `CONTACT.phone` match `lib/nav.js:186-190` exactly. The CSS class prefixes `mw-svc-proof`, `mw-svc-process`, `mw-svc-quote` and `mw-svc-areas` are each defined once and used once.
- **Deliberately excluded:** review counts, awards, client totals and satisfaction percentages. Gobiya has none; the spec leaves the gap visible rather than inventing signals.
- **Known interaction:** Task 3 changes a template shared by four pages. Task 5 Step 5 exists specifically to catch breakage on the other three.
