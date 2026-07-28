# /seo-services-los-angeles — Competitive Rewrite Design

*Date: 2026-07-28. Scope: content, metadata, schema, and redirect targets for `/seo-services-los-angeles`. No visual redesign.*

## Research basis

Live competitor pulls (2026-07-28), live Google Search Console via the `seo-google` service account, and live redirect tracing against production.

### Competing pages

| | Words | FAQ | Proof shown | NAP | Local depth |
|---|---|---|---|---|---|
| Thrive Agency (top organic) | ~4,000 | none | +664% traffic, +800% leads, 1,000+ reviews, 95% retention, Inc 5000 ×7 | address + phone | thin — climate, Hollywood |
| Los Angeles SEO Inc | — | none | 500+ sites, 98% satisfaction, 13+ yrs | address + phone | "Los Angeles SEO®" trademark |
| Bliss Drive | — | none | #1 Yelp/Google, since 2007, 30-day guarantee | address + phone | 15+ named locations |
| **Gobiya today** | ~1,230 | **10 questions** | 113% GSC-verified + linked case study | **none** | **none** |

Coalition Technologies returns HTTP 403 to fetching; excluded rather than guessed at. Website Depot and Ignite Visibility returned a malformed image response and a 404 respectively.

Roughly half the head-term SERP is directories and listicles (Clutch, Built In LA, Semrush, LinkedIn) rather than agency service pages.

**Gobiya's existing edge:** it is the only one of the four with an FAQ block and `FAQPage` schema, and the only one citing a metric with a checkable source. Preserve both.

### Search Console reality (90-day, pulled 2026-07-28)

- `/seo-services-los-angeles` has **zero impressions in 90 days**. URL Inspection returns `Submitted and indexed`, last crawled 2026-07-28T05:25:19Z — it was indexed only just now, resolving the "URL is unknown to Google" state recorded on 2026-07-23.
- **No `seo services los angeles` or `seo company los angeles` query registers any impressions site-wide.** Real demand is suburb-level:

| Query | Impressions | Avg position |
|---|---|---|
| seo company glendale | 208 | 56.2 |
| glendale seo | 168 | 46.3 |
| seo glendale | 162 | 47.0 |
| glendale seo company | 126 | 50.9 |
| local seo glendale | 79 | 32.6 |
| seo company studio city | 63 | 6.3 |
| seo for service businesses | 48 | 80.8 |
| on page seo los angeles | 36 | 23.3 |

Head-term victory over a 19-year-old domain with 1,000+ reviews is a long fight. The page's near-term value is as the destination that consolidates suburb demand.

### Redirect chain defect

Production tracing confirms two hops:

```
/glendale-seo  →308→  /seo-services  →308→  /seo-services-los-angeles
```

**52 rules** in `next.config.mjs` target `/seo-services`, which is itself a redirect (line 38). Four more do the same for `/ppc-management-services` and `/content-marketing-services` (lines 40–41). Every legacy location page — the pages carrying essentially all of this site's search impressions — reaches its destination through two hops.

The 2026-07-23 indexation note observed that the predecessors "were never crawled, so no equity transferred through the 308s." This chain is the mechanism.

## Changes

### 1. Collapse the redirect chains

In `next.config.mjs`, retarget every rule whose destination is a redirect to the final URL:

- 52 rules `destination: '/seo-services'` → `'/seo-services-los-angeles'`
- 2 rules `destination: '/ppc-management-services'` → `'/ppc-management-services-los-angeles'`
- 2 rules `destination: '/content-marketing-services'` → `'/content-marketing-services-los-angeles'`

Keep lines 38–41 in place. They stop being part of any chain but remain a safety net for anyone hitting the short URL directly.

Highest-impact change in this spec and the cheapest: it is a find-and-replace on destination strings, with no content risk.

### 2. Metadata

`buildMetadata` appends `" — Gobiya"` (9 characters) unless the title already contains the brand. The current title is 57 characters, so it renders at **66** and truncates.

- **Title:** `Los Angeles SEO Services | Technical & Local SEO` — 48 chars, 57 with the suffix.
- **Description:** `Los Angeles SEO services that fix what's blocking Google, then build rankings and AI visibility. Founder-led, no long-term contracts. Free site scan.` — 148 chars.

Both live in `lib/servicesFlat.js` under `title` and `metaDescription`.

### 3. Fix the areaServed schema defect

`components/FlatServiceTemplate.js:25` hardcodes:

```js
areaServed: { '@type': 'Country', name: 'United States' }
```

Every one of the four flat service pages is a `-los-angeles` page, and `components/SiteSchema.js:35` already declares `City: Los Angeles` / `State: California` for the organization. The service schema contradicts it. Replace with an array of `City: Los Angeles` and `State: California` to match.

### 4. Capabilities: 4 → 9

Keep all four existing entries (server-side rendering, algorithm & penalty recovery, structured data, Core Web Vitals) — they are the differentiated technical angle and no competitor matches their specificity.

Add five covering what every competitor names and this page omits. Each keeps the existing `{ tag, title, href, desc }` shape. All five `href` targets were verified to exist:

| Capability | href | Serves |
|---|---|---|
| Keyword research & strategy | `/glossary/keyword-research` | intent over vanity volume |
| Link building & digital PR | `/glossary/backlink` | editorial links only; contrast with bulk-link vendors |
| On-page SEO | `/glossary/internal-linking` | the `on page seo los angeles` query (36 imp, pos 23) |
| Local SEO & Google Business Profile | `/glossary/google-business-profile` | suburb / map-pack demand |
| Content strategy | `/glossary/local-seo` | writing for questions people actually ask |

There is no `/glossary/on-page-seo` entry, which is why on-page SEO points at internal linking — the closest existing term. Do not invent a glossary URL.

Voice: plain 9th-grade language, brand-first, natural keywords, consistent with the existing four entries. No guarantees, no invented metrics.

### 5. Service-area section

Add a `serviceAreas` field naming the 18 suburbs the redirects already cover: Glendale, Studio City, Beverly Hills, Encino, Woodland Hills, Northridge, Sherman Oaks, Santa Monica, Long Beach, Anaheim, Burbank, Costa Mesa, Culver City, North Hollywood, Silverlake, Van Nuys, Ventura, Santa Clarita.

**Render as plain text, not links.** Every one of those URLs now 308s to this page; linking them would re-fragment exactly what the redirect consolidation just fixed.

### 6. Surface the NAP

The values live in `CONTACT` in `lib/nav.js` (already consumed by `components/SiteSchema.js`):

```js
phone: '323-744-1338',
phoneHref: 'tel:+13237441338',
address1: '3580 Wilshire Blvd, Ste 132',
address2: 'Los Angeles, CA 90010',
```

Surface address and phone visibly on the page by importing `CONTACT`, never by retyping the values, so there is one source of truth. The phone must use `phoneHref` so it is tappable on mobile. All three competitors show address and phone; this page shows neither.

### 7. Three added FAQs

Appended to the existing ten, same `{ q, a }` shape, each 40–70 words, targeting observed query patterns:

1. **What is on-page SEO, and do I need it?** — serves `on page seo los angeles` (36 imp, pos 23).
2. **Do you work with service businesses like contractors, clinics, and law firms?** — serves `seo for service businesses` (48 imp).
3. **Do you cover my area outside central Los Angeles?** — serves the suburb demand; name several suburbs in the answer.

Existing FAQ pricing answers quote $1,500–$5,000/mo and $2,000–$7,500/mo. Those are stated as *market* ranges, not Gobiya's, so they do not conflict with the published tiers on `/pricing` ($999–$2,500 / $2,500–$5,500 / $5,500–$10,000+). Leave them as they are; do not silently reconcile two different claims.

## Out of scope

- **No invented trust signals.** Gobiya has no third-party reviews or awards; that gap stays visible rather than papered over. Competitors' review counts are not matchable by writing copy.
- Visual/layout changes to `FlatServiceTemplate` beyond the schema fix and the two new render blocks.
- **Flagged, not fixed:** `/glendale-seo`, `/locations/glendale` and `/industries/local-service/glendale-seo` all resolve; `/about` and `/company/about` both rank separately. Both are duplication issues deserving their own ticket.
- The 18 legacy location pages are absent from `sitemap.xml` (76 URLs, none of them). Correct, given they are redirects — noted so it is not re-raised as a bug.

## Success criteria

1. No redirect rule in `next.config.mjs` has a destination that is itself a redirect source.
2. `curl` on `/glendale-seo` returns a single 308 straight to `/seo-services-los-angeles`.
3. Rendered `<title>` including the `— Gobiya` suffix is ≤ 60 characters.
4. Rendered `Service` schema `areaServed` names Los Angeles, not the United States.
5. The page renders 9 capabilities, 13 FAQs, the service-area list, and a visible phone number.
6. `FAQPage` JSON-LD still validates and contains 13 questions.
7. `npm run build` succeeds and `npm test` passes.
