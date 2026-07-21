# Remove Outcomes/Industries, Reorder Nav, Rewrite Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove `/outcomes` and `/industries` (10 pages total) with redirects and a full internal-link remap, reorder the Consulting nav dropdown into one flat 8-item list, and rewrite the homepage's title/description/H1/hero copy around "Expert SEO Services Company" positioning.

**Architecture:** Additive redirects in `next.config.mjs` (10 new + 44 existing repointed to avoid chains) make the URL removal safe; a data/template cleanup removes the now-dead pages, lib files, and template components; a mapping-table-driven sweep repoints every internal link that pointed at a removed page to the closest surviving equivalent (never left pointing at a dead-end redirect-to-homepage); `lib/nav.js` collapses Consulting's grouped structure to one flat list (no `Header.js` changes needed — it already supports headingless groups, the exact pattern the removed Outcomes/Industries entries used); the homepage gets a direct content rewrite.

## Global Constraints

- Old→new mapping for internal links (used in Tasks 6-7, NOT for redirects — see below):
  - `/outcomes/traffic`, `/outcomes/rankings`, `/outcomes/recovery` → `/seo-services`
  - `/outcomes/sales` → `/ppc-management-services`
  - `/industries/local-service`, `/industries/healthcare`, `/industries/enterprise-b2b`, `/industries/professional-services` → `/work`
  - Exception: the one `/outcomes/traffic` link inside `lib/servicesFlat.js`'s own `seo-services` FAQ maps to `/work` instead of `/seo-services` (that FAQ is already on the SEO services page — looping back to itself is useless; linking to case-study proof is more useful). Handled as a manual edit in Task 7, NOT part of the blanket sed.
- Redirects (Task 1) map every removed URL to `/` — this is a DIFFERENT mapping than internal links use, because redirects exist purely to avoid 404s for external/bookmarked links, while internal links should point somewhere topically relevant. Do not confuse the two mappings.
- No test framework exists in this repo — verification is manual dev-server/curl checks, consistent with every prior task this session.
- `lib/outcomes.js`, `lib/industries.js`, `components/OutcomeTemplate.js`, `components/IndustryTemplate.js` have no consumers outside the pages being deleted (confirmed via sitewide search) — safe to delete outright, not just stop importing.
- The new H1 is a literal match to the new title string: `Expert SEO Services Company | Gobiya Internet Marketing`.

---

### Task 1: Redirects in `next.config.mjs`

**Files:**
- Modify: `next.config.mjs`

**Interfaces:**
- Produces: 10 new redirects (all removed URLs → `/`) and 44 existing redirect entries repointed from `/industries/local-service` or `/outcomes/recovery` to `/`, eliminating redirect chains once Task 2 deletes those pages.

- [ ] **Step 1: Add 10 new redirects**

Add these entries to the `redirects()` array (placement anywhere in the array is fine):

```js
      { source: '/outcomes', destination: '/', permanent: true },
      { source: '/outcomes/traffic', destination: '/', permanent: true },
      { source: '/outcomes/rankings', destination: '/', permanent: true },
      { source: '/outcomes/sales', destination: '/', permanent: true },
      { source: '/outcomes/recovery', destination: '/', permanent: true },
      { source: '/industries', destination: '/', permanent: true },
      { source: '/industries/enterprise-b2b', destination: '/', permanent: true },
      { source: '/industries/local-service', destination: '/', permanent: true },
      { source: '/industries/healthcare', destination: '/', permanent: true },
      { source: '/industries/professional-services', destination: '/', permanent: true },
```

- [ ] **Step 2: Repoint all existing redirect destinations that point at the two removed paths**

Run this global substitution — it's safe because both search strings are the exact, complete `destination` value (not a prefix that could false-positive on something else):

```bash
sed -i \
  -e "s#destination: '/industries/local-service'#destination: '/'#g" \
  -e "s#destination: '/outcomes/recovery'#destination: '/'#g" \
  next.config.mjs
```

This repoints all 39 legacy city-page redirects and 5 recovery-related redirects that currently chain through `/industries/local-service` or `/outcomes/recovery`.

**Important:** this substitution will ALSO match the two brand-new `source: '/industries/local-service'` / `source: '/outcomes/recovery'` entries you just added in Step 1 if their `destination` field also happens to read `'/industries/local-service'` or `'/outcomes/recovery'` — it does not, both were written with `destination: '/'` already, so this is safe. Verify this after running the command (Step 3).

- [ ] **Step 3: Verify**

```bash
node --check next.config.mjs
```
Expected: no output.

```bash
grep -c "destination: '/industries/local-service'\|destination: '/outcomes/recovery'" next.config.mjs
```
Expected: `0` — confirms no destination still points at the two paths being removed.

```bash
grep -c "source: '/industries/local-service'" next.config.mjs
```
Expected: `1` (only the new Step 1 entry — if this is higher, a duplicate source was accidentally created).

- [ ] **Step 4: Commit**

```bash
git add next.config.mjs
git commit -m "feat: add redirects for removed outcomes/industries pages, repoint 44 existing redirects to avoid chains"
```

(The old pages this redirects FROM still exist until Task 2 — so right now these redirects make those old pages unreachable even though their files aren't deleted yet, same pattern as the flat-service-pages build. That's expected.)

---

### Task 2: Delete old pages, templates, and data files

**Files:**
- Delete: `app/outcomes/page.js`, `app/outcomes/traffic/page.js`, `app/outcomes/rankings/page.js`, `app/outcomes/sales/page.js`, `app/outcomes/recovery/page.js` (and their now-empty parent folders)
- Delete: `app/industries/page.js`, `app/industries/enterprise-b2b/page.js`, `app/industries/local-service/page.js`, `app/industries/healthcare/page.js`, `app/industries/professional-services/page.js` (and their now-empty parent folders)
- Delete: `components/OutcomeTemplate.js`, `components/IndustryTemplate.js`
- Delete: `lib/outcomes.js`, `lib/industries.js`

**Interfaces:**
- Produces: none of these files exist anymore. Task 4 (sitemap) depends on `lib/outcomes.js`/`lib/industries.js` being gone (or at least no longer imported) to avoid a dangling import.

- [ ] **Step 1: Confirm no other consumer exists before deleting (safety check)**

```bash
grep -rln "from '.*lib/outcomes'\|from '.*lib/industries'\|OutcomeTemplate\|IndustryTemplate" --include='*.js' . 2>/dev/null | grep -v node_modules | grep -v '\.next'
```
Expected output: exactly the files listed above under "Files" (the pages themselves, which import these) and nothing else. If anything else appears, STOP and report — do not delete, escalate as BLOCKED/NEEDS_CONTEXT since that would mean a consumer wasn't accounted for.

- [ ] **Step 2: Delete everything**

```bash
rm -rf app/outcomes app/industries
rm components/OutcomeTemplate.js components/IndustryTemplate.js
rm lib/outcomes.js lib/industries.js
```

- [ ] **Step 3: Verify**

```bash
ls app/outcomes app/industries 2>&1
```
Expected: `No such file or directory` for both (or equivalent — directories are gone).

```bash
npm run dev
```
Reuse an already-running server if one exists (check the port from its own log, don't kill a server you didn't start). Then:
```bash
curl -s -o /dev/null -w "%{http_code}\n" -L http://localhost:PORT/outcomes/traffic
```
Expected: `200` (redirects to `/`, which is a real page — `-L` follows the redirect).

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: delete outcomes/industries pages, templates, and data files"
```

---

### Task 3: Reorder and simplify `lib/nav.js`

**Files:**
- Modify: `lib/nav.js`

**Interfaces:**
- Produces: `NAV_ITEMS` with no `Outcomes`/`Industries` top-level entries, and `Consulting`'s `groups` collapsed to a single ungrouped array in the exact requested order.

- [ ] **Step 1: Replace the entire `NAV_ITEMS` export**

Replace the full `export const NAV_ITEMS = [...]` block (from `export const NAV_ITEMS = [` through its closing `];`) with:

```js
export const NAV_ITEMS = [
  {
    label: 'Consulting',
    href: '/services',
    built: true,
    groups: [
      {
        items: [
          { label: 'SEO Services', href: '/seo-services', built: true },
          { label: 'Web & App Development', href: '/services/web-app-development', built: true },
          { label: 'PPC Services', href: '/ppc-management-services', built: true },
          { label: 'Content Marketing', href: '/content-marketing-services', built: true },
          { label: 'GEO Services', href: '/geo-services', built: true },
          { label: 'CRO & UX Analysis', href: '/services/cro-ux', built: true },
          { label: 'AI & LLM Systems Consulting', href: '/services/ai-llm-consulting', built: true },
          { label: 'Digital PR & Link Building', href: '/services/authority-link-building', built: true },
        ],
      },
    ],
  },
  { label: 'AI Visibility', href: '/ai-visibility', built: true },
  { label: 'Tools', href: '/tools', built: true },
  {
    label: 'About',
    href: '/about',
    built: true,
    groups: [
      {
        items: [
          { label: 'Company', href: '/about', built: true },
          { label: 'Steve Martin', href: '/about/steve-martin', built: true },
          { label: 'Approach', href: '/about/approach', built: true },
          { label: 'Work', href: '/work', built: true },
        ],
      },
    ],
  },
  { label: 'Insights', href: '/insights', built: true },
];
```

Note: the `Outcomes` and `Industries` top-level entries are gone entirely (not just their sub-items) — `AI Visibility`, `Tools`, `About`, `Insights` shift up to fill their place, same relative order as before.

- [ ] **Step 2: Verify**

```bash
node --check lib/nav.js
```
Expected: no output.

Run: `npm run dev` (reuse existing server), then:
```bash
curl -s http://localhost:PORT/ | grep -oE 'href="/seo-services"|href="/services/web-app-development"|href="/ppc-management-services"|href="/content-marketing-services"|href="/geo-services"|href="/services/cro-ux"|href="/services/ai-llm-consulting"|href="/services/authority-link-building"' | sort -u
```
Expected: all 8 hrefs present (homepage renders the header nav).

```bash
curl -s http://localhost:PORT/ | grep -c 'href="/outcomes"\|href="/industries"'
```
Expected: `0`.

- [ ] **Step 3: Commit**

```bash
git add lib/nav.js
git commit -m "feat: collapse Consulting nav to one flat list, remove Outcomes/Industries nav entries"
```

---

### Task 4: Clean up `app/sitemap.js`

**Files:**
- Modify: `app/sitemap.js`

**Interfaces:**
- Produces: sitemap output with no `/outcomes/*` or `/industries/*` URLs, no dangling imports.

- [ ] **Step 1: Remove the two imports**

Delete these two lines:
```js
import { OUTCOMES } from '../lib/outcomes';
import { INDUSTRIES } from '../lib/industries';
```

- [ ] **Step 2: Remove the two route-building blocks**

Delete:
```js
  const outcomeRoutes = Object.keys(OUTCOMES).map((slug) => ({
    url: `${BASE_URL}/outcomes/${slug}`,
  }));

  const industryRoutes = Object.keys(INDUSTRIES).map((slug) => ({
    url: `${BASE_URL}/industries/${slug}`,
  }));
```
(Read the file first to get the exact surrounding blank-line/formatting context, since this plan shows the content but the exact current whitespace must be matched by hand.)

- [ ] **Step 3: Update the final return statement**

Change:
```js
  return [...staticRoutes, ...serviceRoutes, ...outcomeRoutes, ...industryRoutes, ...insightRoutes, ...caseStudyRoutes];
```
to:
```js
  return [...staticRoutes, ...serviceRoutes, ...insightRoutes, ...caseStudyRoutes];
```

- [ ] **Step 4: Verify**

```bash
node --check app/sitemap.js
```
Expected: no output.

Run: `npm run dev` (reuse existing server), then:
```bash
curl -s http://localhost:PORT/sitemap.xml | grep -c '/outcomes/\|/industries/'
```
Expected: `0`.

- [ ] **Step 5: Commit**

```bash
git add app/sitemap.js
git commit -m "feat: remove outcomes/industries routes from sitemap"
```

---

### Task 5: Remove industry/outcome buttons from case studies

**Files:**
- Modify: `components/CaseStudyTemplate.js`
- Modify: `lib/work.js`

**Interfaces:**
- Produces: case study pages' "Related pages" section shows only the `serviceHref` button (the industry/outcome buttons are gone, not pointing at dead content). `lib/work.js` entries no longer carry the now-unused `industryHref`/`outcomeHref` fields.

- [ ] **Step 1: Edit `components/CaseStudyTemplate.js`'s Related section**

Change:
```jsx
          <div className="hero__ctas" data-reveal>
            <a href={cs.serviceHref} className="btn btn--ghost">{cs.serviceLabel}</a>
            <a href={cs.industryHref} className="btn btn--ghost">{cs.tag}</a>
            <a href={cs.outcomeHref} className="btn btn--ghost">The outcome</a>
          </div>
```
to:
```jsx
          <div className="hero__ctas" data-reveal>
            <a href={cs.serviceHref} className="btn btn--ghost">{cs.serviceLabel}</a>
          </div>
```

- [ ] **Step 2: Remove the 22 now-unused field lines from `lib/work.js`**

Every occurrence is a standalone line of the exact form `    industryHref: '/industries/...',` or `    outcomeHref: '/outcomes/...',`. Delete them with sed:

```bash
sed -i -E "/^\s*industryHref: '\/industries\/[a-z-]+',$/d; /^\s*outcomeHref: '\/outcomes\/[a-z-]+',$/d" lib/work.js
```

- [ ] **Step 3: Verify**

```bash
node --check components/CaseStudyTemplate.js 2>&1 | head -5
```
(This will error on JSX — expected, not a real problem, same as prior sessions; JSX `.js` files can't be checked with plain `node --check`.)

```bash
node --check lib/work.js
```
Expected: no output (this file has no JSX, plain data — should check cleanly).

```bash
grep -c "industryHref\|outcomeHref" lib/work.js components/CaseStudyTemplate.js
```
Expected: `0` for both files.

Run: `npm run dev` (reuse existing server), then:
```bash
curl -s http://localhost:PORT/work/safetycentric | grep -oE 'class="hero__ctas"[^<]*<a[^>]*>[^<]*</a>' 
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:PORT/work/safetycentric
```
Expected: 200, and only one `<a>` inside the related CTAs block (manually inspect the surrounding HTML if the grep pattern doesn't cleanly isolate it — the key check is that exactly one button remains, not two extra ones pointing at `/industries/...` or `/outcomes/...`).

- [ ] **Step 4: Commit**

```bash
git add components/CaseStudyTemplate.js lib/work.js
git commit -m "feat: remove industry/outcome buttons and fields from case studies"
```

---

### Task 6: Remap internal links in `lib/insights.js`

**Files:**
- Modify: `lib/insights.js`

**Interfaces:**
- Produces: every `/outcomes/*` and `/industries/*` reference (both `relatedHref` fields and inline body links) repointed per the Global Constraints mapping table. `ArticleTemplate.js:167` always renders `relatedHref` as a required CTA button — every occurrence MUST be repointed, never left dangling or removed.

- [ ] **Step 1: Run the mapping substitution**

```bash
sed -i \
  -e "s#/outcomes/traffic#/seo-services#g" \
  -e "s#/outcomes/rankings#/seo-services#g" \
  -e "s#/outcomes/recovery#/seo-services#g" \
  -e "s#/outcomes/sales#/ppc-management-services#g" \
  -e "s#/industries/local-service#/work#g" \
  -e "s#/industries/healthcare#/work#g" \
  -e "s#/industries/enterprise-b2b#/work#g" \
  -e "s#/industries/professional-services#/work#g" \
  lib/insights.js
```

- [ ] **Step 2: Verify**

```bash
grep -c '/outcomes/\|/industries/' lib/insights.js
```
Expected: `0`.

```bash
node --check lib/insights.js
```
Expected: no output.

Run: `npm run dev` (reuse existing server), then spot-check 3 different articles that had `relatedHref` pointing at a removed page (pick 3 different old-target types — one that mapped from `/outcomes/*`, one from `/industries/*`):
```bash
curl -s http://localhost:PORT/insights/why-did-my-website-traffic-drop | grep -oE 'href="/seo-services"|href="/work"|href="/ppc-management-services"'
```
Expected: at least one match per article checked, and the linked destination returns 200.

- [ ] **Step 3: Commit**

```bash
git add lib/insights.js
git commit -m "feat: remap lib/insights.js internal links away from removed outcomes/industries pages"
```

---

### Task 7: Remap remaining scattered references

**Files:**
- Modify: `lib/services.js`
- Modify: `lib/servicesFlat.js`
- Modify: `app/ai-visibility/page.js`
- Modify: `public/llms.txt`

**Interfaces:**
- Produces: same mapping as Task 6, applied to these 4 smaller files, plus one manual exception in `lib/servicesFlat.js` and one manual line removal in `public/llms.txt`.

- [ ] **Step 1: Run the same blanket mapping substitution on `lib/services.js` and `app/ai-visibility/page.js`**

```bash
sed -i \
  -e "s#/outcomes/traffic#/seo-services#g" \
  -e "s#/outcomes/rankings#/seo-services#g" \
  -e "s#/outcomes/recovery#/seo-services#g" \
  -e "s#/outcomes/sales#/ppc-management-services#g" \
  -e "s#/industries/local-service#/work#g" \
  -e "s#/industries/healthcare#/work#g" \
  -e "s#/industries/enterprise-b2b#/work#g" \
  -e "s#/industries/professional-services#/work#g" \
  lib/services.js app/ai-visibility/page.js
```

- [ ] **Step 2: Manually fix `lib/servicesFlat.js`'s one exception**

Find and change (in the `seo-services` entry's FAQ, "What is an organic search strategy?"):
```
See how this connects to <a href="/outcomes/traffic">long-term organic traffic growth</a>.
```
to:
```
See real examples of this in our <a href="/work">client case studies</a>.
```

- [ ] **Step 3: Remove the stale line from `public/llms.txt`**

Find and delete this entire line:
```
- [Los Angeles local SEO city pages](https://www.gobiya.com/industries/local-service)
```

- [ ] **Step 4: Verify**

```bash
grep -c '/outcomes/\|/industries/' lib/services.js lib/servicesFlat.js app/ai-visibility/page.js public/llms.txt
```
Expected: `0` for all four files.

```bash
node --check lib/services.js && node --check lib/servicesFlat.js
```
Expected: no output from either.

Run: `npm run dev` (reuse existing server), then:
```bash
curl -s http://localhost:PORT/seo-services | grep -oE 'href="/work"'
curl -s http://localhost:PORT/ai-visibility | grep -oE 'href="/seo-services"'
```
Expected: matches found in both.

- [ ] **Step 5: Commit**

```bash
git add lib/services.js lib/servicesFlat.js app/ai-visibility/page.js public/llms.txt
git commit -m "feat: remap remaining internal links away from removed outcomes/industries pages"
```

---

### Task 8: Homepage rewrite

**Files:**
- Modify: `app/page.js`

**Interfaces:**
- Produces: new metadata title/description, new H1, new eyebrow, new hero sub-copy — all built around "Expert SEO Services Company" positioning instead of "website marketing company."

- [ ] **Step 1: Update the metadata block**

Change:
```js
export const metadata = buildMetadata({
  title: 'Website Marketing Company | Gobiya',
  description:
    'Gobiya is a website marketing company helping brands rank higher, get found in Google, and get cited by AI. Get a free audit.',
  path: '/',
});
```
to:
```js
export const metadata = buildMetadata({
  title: 'Expert SEO Services Company | Gobiya Internet Marketing',
  description:
    'Gobiya is an expert SEO services company helping brands rank higher, get found in Google, and get cited by AI. Real client results, free audit.',
  path: '/',
});
```

- [ ] **Step 2: Update the eyebrow, H1, and hero sub-copy**

Change:
```jsx
          <p className="eyebrow hero__eyebrow" data-reveal><span className="eyebrow__dot"></span>Website Marketing Company · LA · Glendale · Koreatown</p>
          <h1 className="hero__title" data-split>
            The website marketing company built for the{' '}
            <span className="hero__title-video">
              <video
                src="/assets/videos/gobiyaRace.webm"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="hero__title-video-el"
                aria-hidden="true"
              />
            </span>{' '}
            <em className="hero__title-accent">era of answers.</em>
          </h1>
          <div className="hero__row">
            <p className="hero__sub" data-reveal>If you are searching for a &quot;website marketing company near me,&quot; Gobiya is your local partner in Los Angeles. We make local and global brands findable in Google, cited by ChatGPT and AI Overviews, and profitable through technical SEO, content, and paid search — one accountable team, not a patchwork of vendors.</p>
```
to:
```jsx
          <p className="eyebrow hero__eyebrow" data-reveal><span className="eyebrow__dot"></span>Expert SEO Services Company · LA · Glendale · Koreatown</p>
          <h1 className="hero__title" data-split>
            Expert SEO Services Company | Gobiya Internet Marketing
          </h1>
          <div className="hero__row">
            <p className="hero__sub" data-reveal>If you are searching for an &quot;SEO services company near me,&quot; Gobiya is your local partner in Los Angeles. We make local and global brands findable in Google, cited by ChatGPT and AI Overviews, and profitable through technical SEO, content, and paid search — one accountable team, not a patchwork of vendors.</p>
```

Note: this drops the inline looping video from the H1 (per the plan's decision to use a literal title match). The `<video>` element and its `hero__title-video`/`hero__title-video-el`/`hero__title-accent` CSS classes become unused by this change — leave the CSS in `app/globals.css` alone (out of scope, no harm in unused CSS rules) and leave `/assets/videos/gobiyaRace.webm` in place (unused asset, not a broken reference, out of scope to clean up further).

- [ ] **Step 3: Verify**

```bash
node --check app/page.js 2>&1 | head -3
```
(Expected to error on JSX syntax — not a real problem, same as noted in Task 5.)

Run: `npm run dev` (reuse existing server), then:
```bash
curl -s http://localhost:PORT/ | grep -oE '<title>[^<]*</title>|Expert SEO Services Company'
```
Expected: `<title>Expert SEO Services Company | Gobiya Internet Marketing — Gobiya</title>` (or similar, per `buildMetadata`'s title template) and the H1/eyebrow/hero-sub text all present.

```bash
curl -s http://localhost:PORT/ | grep -oE 'rel="canonical" href="[^"]*"'
```
Expected: canonical href is `https://www.gobiya.com/` (unaffected by this content change).

- [ ] **Step 4: Commit**

```bash
git add app/page.js
git commit -m "feat: rewrite homepage title, H1, and hero copy around SEO services positioning"
```

---

### Task 9: Final verification sweep

**Files:**
- None expected (verification only — if a leftover reference is found, fix it in place and note it).

**Interfaces:**
- Consumes: everything from Tasks 1-8.
- Produces: confidence the whole removal + remap + rewrite is complete and consistent.

- [ ] **Step 1: Sitewide grep for any remaining `/outcomes/` or `/industries/` references outside `next.config.mjs` and docs/**

```bash
grep -rl '/outcomes/\|/industries/' --include='*.js' --include='*.jsx' --include='*.mjs' --include='*.txt' . 2>/dev/null | grep -v node_modules | grep -v '\.next' | grep -v 'next.config.mjs'
```
Expected: no output. `next.config.mjs` itself is expected to still contain these strings (as legitimate redirect `source` values) and is excluded from this check on purpose — verify separately in Step 2 that none of ITS `destination` fields still point at a removed path.

```bash
grep -c "destination: '/outcomes\|destination: '/industries" next.config.mjs
```
Expected: `0`.

If Step 1 finds any leftover reference in a file this check doesn't exclude, fix it using the same mapping table from the Global Constraints section, matching the topic of the specific link as best you can from context.

- [ ] **Step 2: Confirm all 10 removed URLs redirect to `/` in a single hop**

Run: `npm run dev` (reuse existing server), then for each of the 10 removed URLs:
```bash
curl -s -D - -o /dev/null http://localhost:PORT/outcomes | grep -i '^location:'
```
Expected: `location: /`. Repeat for `/outcomes/traffic`, `/outcomes/rankings`, `/outcomes/sales`, `/outcomes/recovery`, `/industries`, `/industries/enterprise-b2b`, `/industries/local-service`, `/industries/healthcare`, `/industries/professional-services` — all expecting `location: /`.

- [ ] **Step 3: Spot-check 3 of the 44 repointed legacy redirects**

```bash
curl -s -D - -o /dev/null http://localhost:PORT/glendale-seo | grep -i '^location:'
curl -s -D - -o /dev/null http://localhost:PORT/markets | grep -i '^location:'
curl -s -D - -o /dev/null http://localhost:PORT/guides/google-penalty-recovery | grep -i '^location:'
```
Expected: `location: /` for all three (not `/industries/local-service` or `/outcomes/recovery` — a value pointing at either of those would mean Task 1's repointing missed something).

- [ ] **Step 4: Confirm sitemap and nav are clean**

```bash
curl -s http://localhost:PORT/sitemap.xml | grep -c '/outcomes/\|/industries/'
curl -s http://localhost:PORT/ | grep -c 'href="/outcomes"\|href="/industries"'
```
Expected: `0` for both.

- [ ] **Step 5: If any fixes were needed in Step 1, commit them**

```bash
git add -A
git commit -m "fix: clean up remaining internal links found in final verification sweep"
```
(Skip this step entirely if Step 1 found nothing to fix.)

## Post-implementation checklist (from spec's Testing / verification section)

- [ ] All 10 removed URLs: single-hop redirect to `/`
- [ ] All 44 previously-chained redirects: single-hop to `/`, not through a dead intermediate path
- [ ] Sitewide grep clean outside `next.config.mjs` (source values) and docs/
- [ ] `CaseStudyTemplate.js` Related section shows only the service button
- [ ] `app/sitemap.js` has no outcome/industry URLs
- [ ] `lib/nav.js` dropdown renders the 8 Consulting items in the exact requested order, no Outcomes/Industries top-level items
- [ ] Homepage renders new title/description/H1/eyebrow/hero-sub, canonical unaffected
