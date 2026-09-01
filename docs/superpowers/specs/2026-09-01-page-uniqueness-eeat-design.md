# Page Uniqueness, Expertise & Indexation

**Date:** 2026-09-01
**Status:** Approved, not yet implemented

## Problem

The site publishes ~167 indexable URLs. Layout is concentrated in five shared
template components, and content depth is badly uneven:

| Group | Pages | Shared layout | Notes |
|---|---|---|---|
| Glossary terms | 77 | `GlossaryTermTemplate` | **avg 69 words of body copy each** |
| Insights articles | 36 | `ArticleTemplate` | substantial copy |
| Case studies | 9 | `CaseStudyTemplate` | |
| Tool pages | 8 | 13-line wrappers | wrap real interactive tools |
| Service pages | 5 | `ServiceTemplate` | |
| Location pages | 4 | `LocationTemplate`, `ServiceAreaTemplate` | 15-line page files |
| Solutions | 3 | own layouts | |
| Hand-built statics | ~25 | individual | already unique |

Three defects drive this work:

1. **The glossary is 5,300 words spread across 77 URLs.** Average body copy is
   69 words (min 52, max 104). This is the site's largest exposure to the
   helpful-content system and recent core updates. No layout work fixes it.
2. **`/stuff` is an indexable empty page.** It is `force-dynamic`, reads the
   filesystem per request via `fs.readdirSync(process.cwd()/public/...)`, is
   absent from the sitemap, opens on an `<h2>` with no `<h1>`, and its meta
   description promises "AI Video Marketing" while the body renders a `.webm`
   file listing with byte sizes. On Vercel the filesystem read is unlikely to
   resolve, so the served page is the empty state.
3. **The author-credibility page contradicts itself.** `app/about/steve-martin/page.js`
   states "Thirty years" in the meta description and "Fifteen Years of Hands-On
   Search Work" in the on-page excerpt.

Crawl and index infrastructure is otherwise healthy and is **not** part of this
work: `app/robots.js` allows AI crawlers explicitly, `app/sitemap.js` generates
from the same lists the routes read, `middleware.js` deliberately excludes
marketing routes to preserve static rendering, and noindex is correctly applied
to admin, dashboard, auth, thank-you and `/lp`.

## Established facts

Supplied by Steve, 2026-09-01. These are the only biographical claims this work
may make:

- Steve Martin, Founder — **30 years of experience**
- **Gobiya created 2009**
- **Registered as an LLC 2012**

No credential, client name, or result figure may be introduced that is not
already committed to the repository or supplied above.

## Decisions

- **De-templating scope:** bespoke layouts for the 21 commercial pages; a
  variant system for glossary hubs and insights. Not 167 one-off layouts.
- **Glossary:** consolidate 77 terms into 8 topic hubs, 301 every term URL to
  its anchor.
- **Removals:** `/stuff` only. `/mcp`, `/seo-myths`, `/lp` and the 8 tool pages
  are retained — `/mcp` and `/seo-myths` were inspected and are substantive and
  already individually built.
- **Expertise evidence:** repo content + first-hand experience blocks (drafted
  for Steve's correction) + author/credential infrastructure.

## Design

### Wave 1 — Removals & redirects

Delete `app/stuff/`. Add to the `redirects()` array in `next.config.mjs`:

```js
{ source: '/stuff', destination: '/work', permanent: true }
```

`/stuff` is absent from `app/sitemap.js`, so no sitemap change is needed.
`components/BentoVideoCard.js` becomes unreferenced — verify before deleting it.

### Wave 2 — Glossary consolidation

Eight hubs, covering all 77 terms with no leftovers:

| Hub slug | Terms |
|---|---|
| `ai-search-and-geo` | 20 |
| `ppc-and-paid-media` | 16 |
| `core-web-vitals-and-performance` | 10 |
| `technical-seo-and-crawling` | 10 |
| `on-page-and-content-seo` | 10 |
| `authority-and-links` | 4 |
| `ux-conversion-and-measurement` | 4 |
| `local-seo` | 3 |

Each hub is a substantial page (~2,000 words) carrying every one of its terms as
an anchored section, so a term keeps a precise destination rather than landing
on a hub header.

**Data model.** `lib/glossary.js` keeps every existing term entry and gains a
`hub` field per term. The hub list and the redirect map both generate from that
field, so a term can never reference a hub that does not exist, and adding a
term cannot leave it stranded.

**Redirects.** All 77 term URLs 301 to `/glossary/<hub>#<term-slug>`.

> **Constraint:** these must be enumerated explicitly, never expressed as a
> `/glossary/:slug*` wildcard. Next.js applies redirects before routing, so a
> wildcard would shadow the hub pages themselves and kill the route. Hub slugs
> are additionally checked against the 77 term slugs for collisions — the eight
> chosen above collide with none.

`app/glossary/[slug]/page.js` serves the 8 hub slugs; `generateStaticParams`
returns hubs, not terms. `app/sitemap.js` drops 77 URLs and gains 8.
`app/glossary/page.js` (the index) is rebuilt around the 8 hubs, keeping every
term visible and linked so no term becomes unreachable by a crawler.

### Wave 3 — Expertise layer

**`lib/authority.js`** — new single source of truth exporting the established
facts above plus the credential and topic lists. Every mention of experience
length, founding date, or LLC registration across the site reads from it. This
resolves the 30-vs-15 contradiction structurally rather than by patching one
string, and prevents the two numbers drifting apart again.

**`AuthorCard` component** — byline, portrait, credential line, and a real
"Last reviewed" date. Placed on content pages.

**`dateModified`** — `ArticleTemplate` currently sets `dateModified: article.date`,
aliasing the publish date. It gains a real `updated` field on the article
record, falling back to `date` when absent.

**Schema enrichment** — `Person` in `components/SiteSchema.js` gains `knowsAbout`
and `hasCredential`; `Organization` gains `foundingDate: '2009'`.

**First-hand experience blocks** — passages in Steve's voice on service and
location pages, drawn from what is already committed (the 3,217-citation study
in `lib/insights.js`, `lib/work.js` case studies, testimonials, real NAP data).

> Every block ships marked for Steve's correction before going live. Nothing
> fabricated: no invented client, figure, or certification.

### Wave 4 — De-templating

**21 bespoke pages,** each a genuinely distinct layout:

- 5 service pages (`technical-seo`, `geo`, `ppc`, `content-marketing`, `web-ux`)
- 4 location pages (`van-nuys-seo`, `los-angeles-seo`, `glendale-seo`, `studio-city-seo`)
- 3 solution pages
- 9 case studies

`ServiceTemplate`, `LocationTemplate`, `ServiceAreaTemplate` and
`CaseStudyTemplate` are retired **as page shells**. The reusable primitives
beneath them — `PageHero`, `ClientLogos`, `ClosingCta`, `Breadcrumbs`,
`ContentBlocks` — are components rather than layouts and are retained.

**Variant system** for the 8 glossary hubs and 36 insights: a set of distinct
layouts assigned by content shape, with an adjacency rule ensuring no two linked
or sequential pages resolve to the same variant.

All work uses the existing design tokens in `app/globals.css` (13,363 lines):
navy `#0C1050`, carmine-orange `#E1420F`. No new design language is introduced.

## Non-goals

- Rebuilding robots, sitemap generation, or middleware — all currently correct.
- Touching admin, dashboard, auth, or `/free-site-scan/report/[id]` — correctly
  noindexed application surfaces, not marketing pages.
- Removing any page other than `/stuff`.
- Introducing biographical or performance claims beyond the established facts.

## Verification

- `npm run build` succeeds after each wave.
- `npm test` (vitest) passes after each wave.
- Every one of the 77 term URLs resolves to a hub anchor in exactly one hop —
  asserted by a test that walks the generated redirect map, so a future term
  addition cannot silently create a chain or a 404.
- No redirect `source` in `next.config.mjs` matches a live route path.
- `/stuff` returns 301 to `/work`.
- Hub pages render and are present in `sitemap.xml`; the 77 term URLs are absent.
- No page states an experience length, founding date, or LLC year that
  disagrees with `lib/authority.js`.

## Sequencing

Waves ship in order, each independently reviewable. Wave 1 is small and lands
first. Waves 2 and 3 are content-heavy. Wave 4 is the largest and is itself
delivered in batches by page group.
