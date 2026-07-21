# Flat, Keyword-First Service Pages — Design Spec

Date: 2026-07-21

## Purpose

Replace 4 of the site's 7 `/services/[slug]` pages with flat, keyword-first top-level URLs — `/seo-services`, `/geo-services`, `/ppc-management-services`, `/content-marketing-services` — following a "back to basics" title/meta/H1/intro formula (example: `SEO Services - Expert Search Engine Optimization Services`), each carrying a humanized ~100-word intro, a real testimonial, and a real, verified datapoint. The other 3 services (`authority-link-building`, `cro-ux`, `ai-llm-consulting`) and `web-app-development` are out of scope and stay exactly as they are.

## Decisions already made (via user Q&A)

- `/ppc-services` and `/ppc-management-services` were both named; resolved to **one page**, `/ppc-management-services`.
- Old `/services/[slug]` pages for the 4 folded services **301 redirect and are removed**, not kept alongside with a canonical pointer.
- The other 4 existing services stay untouched at their current URLs.
- Site nav labels (`lib/nav.js`) **update to match** the new simplified names (e.g. "SEO & Discoverability" → "SEO Services").
- Testimonial/datapoint pairing per page (below) is approved as-is.

## Content plan (all 4 pages)

Each page: `metaTitle` = H1 (exact match, keyword-first), `metaDescription` ~155 chars, intro paragraph ~100 words citing one real, already-verified datapoint (no fabricated numbers — same bar as today's search-wins work), one real testimonial from `lib/testimonials.js`.

### 1. `/seo-services`
- **Title/H1:** SEO Services - Expert Search Engine Optimization Services
- **Meta description:** Expert SEO services that fix crawlability, indexation, and Core Web Vitals — the technical foundation search and AI crawlers actually read. See real client results and get a free audit.
- **Intro:** SEO services should start with one blunt question: can a search engine actually read your page? If a crawler can't fetch and render your site, no amount of content or backlinks will save it. Our SEO services fix that technical foundation first — crawlability, indexation, structured data, and Core Web Vitals — before building the content and authority layer on top. It's the same system that took SafetyCentric's organic search impressions up 113% in 90 days, verified directly in Google Search Console. Request a free SEO audit to see what's actually capping your traffic.
- **Testimonial:** SafetyCentric — Pete Urueta
- **Datapoint:** SafetyCentric impressions +113% (1,527 → 3,245, 90-day, `lib/clientSearchWins.js`)
- **Folds in:** `services/seo-discoverability` (capabilities, process, FAQs, proof stats — reused/adapted, not discarded)

### 2. `/geo-services`
- **Title/H1:** GEO Services - Expert Generative Engine Optimization Services
- **Meta description:** Expert GEO services engineered to get your content cited by ChatGPT, Perplexity, and Google AI Overviews — not just ranked. See our AI citation research and get a free audit.
- **Intro:** GEO services exist because AI answer engines don't reward marketing copy — they pull direct, well-structured answers from pages that have already earned their trust. Our GEO services engineer content around the exact questions your buyers ask ChatGPT and Perplexity, so your page is the one that gets quoted, not just indexed. We back this with real research: our AI Citation Study asked five AI assistants the same 200 questions and tracked exactly who they cited and why. One client, The Healing Metta, now shows up when people ask ChatGPT about integrative care in their area — that wasn't true a year ago. Request a free GEO content audit to see where you're losing citations.
- **Testimonial:** The Healing Metta
- **Datapoint:** No GSC metric exists for AI citations specifically — cite blended organic impressions growth honestly as underlying search visibility (do not overclaim it as an AI-citation number) and link to `/insights/ai-citation-study` as the AI-specific evidence.
- **Folds in:** `services/geo-ai-content-writing`

### 3. `/ppc-management-services`
- **Title/H1:** PPC Management Services - Expert Pay-Per-Click Campaign Management
- **Meta description:** Expert PPC management services built around cost per lead, not clicks — campaign structure, landing pages, and conversion tracking. Free ad account audit.
- **Intro:** PPC management services usually optimize for clicks, not booked business. Our PPC management rebuilds campaign structure, negative keyword lists, and landing pages around the one number that actually matters — cost per lead that converts into real customers. Every account we take on gets a full audit before a dollar of spend changes direction. One client, Trusted Home Contractors, cut their cost per real customer by roughly 40% once we rebuilt campaigns around what people were actually searching for and sent them to pages that matched. Request a free Google Ads audit to see where your budget is leaking.
- **Testimonial:** Trusted Home Contractors — Mike P.
- **Datapoint:** 40% reduction in cost per lead (self-reported client result, same number already published on `/work` — label explicitly as client-reported, not GSC-verified, since PPC spend isn't in Search Console)
- **Folds in:** `services/google-ads-ppc`

### 4. `/content-marketing-services`
- **Title/H1:** Content Marketing Services - Expert Content Marketing & Copywriting Services
- **Meta description:** Expert content marketing services that turn organic articles into real search growth, planned by an editorial strategy built on real demand. Free content audit.
- **Intro:** Content marketing services fail for one common reason: pages written to fill a content calendar instead of answering a real, searched question. Our content marketing is planned by an editorial strategy built on actual demand, then written to rank and convert — not just hit a word count. One client, RemodelMePros, put it simply: the SEO articles kept homeowners coming in without buying every lead. That same content-driven approach took SmileCenter's organic search impressions up 56% in 90 days, verified in Google Search Console. Request a free content audit to see where your current pages are losing demand.
- **Testimonial:** RemodelMePros — Mike P. ("the SEO articles kept homeowners coming in without me buying every lead")
- **Datapoint:** SmileCenter impressions +56% (154,526 → 241,581, 90-day) — different real client than the testimonial, clearly attributed separately (same pattern the homepage already uses)
- **Folds in:** `services/seo-web-copywriting`

## Architecture

- **New data file** `lib/servicesFlat.js` — 4 entries keyed by new slug, shaped for this content type (title, metaDescription, h1, intro, testimonial ref, datapoint, plus capabilities/process/faqs/ctaTitle reused/adapted from the corresponding old `SERVICES` entry so none of that existing content work is thrown away).
- **New routes:** `app/seo-services/page.js`, `app/geo-services/page.js`, `app/ppc-management-services/page.js`, `app/content-marketing-services/page.js`. Each a thin wrapper (matching the existing `ServiceTemplate` pattern) around a new template component that adds the H1/humanized-intro/testimonial/datapoint sections `ServiceTemplate` doesn't currently have.
- **`lib/services.js`:** remove the 4 folded entries (`seo-discoverability`, `geo-ai-content-writing`, `google-ads-ppc`, `seo-web-copywriting`). The remaining 4 (`authority-link-building`, `cro-ux`, `ai-llm-consulting`, `web-app-development`) stay as-is.
- **Old route folders deleted:** `app/services/seo-discoverability/`, `app/services/geo-ai-content-writing/`, `app/services/google-ads-ppc/`, `app/services/seo-web-copywriting/`.
- **`app/services/page.js` (hub):** the "Creativity" pillar grouping becomes empty once its only 2 members (`geo-ai-content-writing`, `seo-web-copywriting`) are removed — drop that grouping and add a plain link section pointing to the 4 new flat pages so the hub still represents the full catalog.
- **`lib/nav.js`:** update the 4 `NAV_ITEMS` hrefs to the new URLs and simplify their labels to match (e.g. "SEO & Discoverability" → "SEO Services", "GEO & AI Content Writing" → "GEO Services", "Google Ads, PPC & AI Creative" → "PPC Management Services", "SEO Copywriting & Content Strategy" → "Content Marketing Services").
- **`components/Footer.js`:** update its 2 direct links (`seo-discoverability`, `geo-ai-content-writing`) to the new URLs.
- **`app/sitemap.js`:** add the 4 new URLs to `staticRoutes`; the 4 old ones disappear automatically once removed from `SERVICES` (sitemap derives `serviceRoutes` from `Object.keys(SERVICES)`).
- **Indexability:** new pages get normal indexable `buildMetadata()` output (no `noindex`); `robots.js` has no per-path blocks today, so no changes needed there.

## Redirects (`next.config.mjs`)

New direct redirects (old → new final destination):
```
/services/seo-discoverability      -> /seo-services
/services/geo-ai-content-writing   -> /geo-services
/services/google-ads-ppc           -> /ppc-management-services
/services/seo-web-copywriting      -> /content-marketing-services
```

**Existing redirect entries whose destinations point at these 4 paths must be repointed directly to the new URLs**, to avoid a redirect chain (old→old→new):
```
/performance/technical-seo-audit-agency  -> /services/seo-discoverability  =>  /seo-services
/services/on-page-seo                    -> /services/seo-discoverability  =>  /seo-services
/relations/google-shopping-ads-agency    -> /services/google-ads-ppc       =>  /ppc-management-services
/services/ai-video-ads                   -> /services/google-ads-ppc       =>  /ppc-management-services
/guides/topic-cluster-architecture       -> /services/seo-web-copywriting  =>  /content-marketing-services
/services/content-strategy               -> /services/seo-web-copywriting =>  /content-marketing-services
```

## Internal link migration (the big surface)

A sitewide grep found live internal references to the 4 old paths in 9 non-page files (excluding the 4 retiring page files and docs/plan markdown, which are historical records and don't need updating):

| File | Occurrences | Notes |
|---|---|---|
| `lib/insights.js` | 50 | Across most of the 34 articles — inline `<a href="/services/...">` links inside body paragraphs and 6 `relatedHref` fields |
| `lib/work.js` | 5 | `serviceHref` fields on case study entries |
| `lib/outcomes.js` | 4 | Inline links inside outcome page copy |
| `lib/industries.js` | 2 | Inline link inside industry page copy |
| `app/about/approach/page.js` | 2 | Inline links |
| `app/ai-visibility/page.js` | 3 | Inline links + one FAQ answer |
| `public/llms.txt` | 2 | AI-crawler discovery file — these must resolve correctly since this file exists specifically for AI crawlers |
| `components/Footer.js` | 2 | Sitewide footer links (also listed separately under Architecture above since it's structural, not just prose) |
| `app/globals.css` | 1 | A code comment referencing the old path as a note about bespoke layout — cosmetic only, low priority |

Every occurrence is a straight 1:1 URL substitution using the mapping above — no content rewriting needed, just updating the `href`/field value. `relatedHref` fields in `lib/insights.js` and `serviceHref` in `lib/work.js` follow the same substitution.

## Testing / verification

No test framework in this repo (established pattern all session) — manual verification:
- Each new page: curl for 200, correct title/meta/canonical/H1, no `noindex`, testimonial and datapoint render correctly, capabilities/process/FAQ sections render.
- Each of the 4 old URLs: curl confirms a 301 to the correct new URL (not a chain — verify no intermediate hop).
- The 6 pre-existing indirect redirect sources (e.g. `/services/on-page-seo`): curl confirms they now land directly on the new URL in one hop, not two.
- `app/services/page.js` hub: confirm it renders with no empty "Creativity" section and links to all 4 new pages.
- `lib/nav.js`: confirm updated labels/hrefs render correctly in the header dropdown.
- Spot-check a sample of the 50 `lib/insights.js` link updates (a handful of different articles) rather than manually checking all 50, plus a full `grep` sweep afterward confirming zero remaining references to the 4 old paths anywhere in the live (non-docs) codebase.
- `app/sitemap.js`: confirm output includes the 4 new URLs and excludes the 4 old ones.
