# Gobiya — Site Structure & Architecture
*Prepared 2026-07-12. Current structure audited from `app/` routes and `lib/` data. Legend: ✅ live · ➕ planned · ⚠️ review*

## Current + target URL hierarchy

```
gobiya.com/
├── /                                    ✅ Home
├── /services                            ✅ Hub (11 children)
│   ├── /seo-discoverability             ✅ ── core pillar
│   ├── /geo-ai-content-writing          ✅ ── core pillar (GEO)
│   ├── /authority-link-building         ✅
│   ├── /seo-web-copywriting             ✅
│   ├── /content-strategy                ✅
│   ├── /digital-pr                      ✅
│   ├── /google-ads-ppc                  ✅
│   ├── /cro-ux                          ✅
│   ├── /web-app-development             ✅
│   ├── /ai-llm-consulting               ✅
│   └── /ai-video-ads                    ✅
├── /industries                          ✅ Hub (4 verticals)
│   ├── /enterprise-b2b                  ✅
│   ├── /healthcare                      ✅
│   ├── /professional-services           ✅
│   └── /local-service                   ✅
│       └── /[city]                      ✅ 18 city pages   ⚠️ see note 1
├── /outcomes                            ✅ Hub — differentiator (problem-first IA)
│   ├── /traffic  /rankings  /sales  /recovery   ✅
├── /work                                ✅ Listing only
│   └── /[slug]                          ➕ P1: 6–8 case study pages (Phase 1–3)
├── /insights                            ✅ Hub, 9 posts
│   └── /[slug]                          ✅ (+2/mo per calendar)
├── /ai-visibility                       ✅ Category landing page
├── /about                               ✅
│   ├── /approach                        ✅ methodology page
│   └── /steve-martin                    ✅ founder (E-E-A-T anchor)
├── /compare                             ➕ Phase 3: BOFU comparison hub
│   └── /[competitor-or-topic]           ➕ 2–3 pages
├── /contact  /onboarding  /onboarding/thank-you   ✅ conversion path
├── /privacy  /terms                     ✅
├── sitemap.xml  robots.txt  llms.txt    ✅
└── IndexNow key file                    ✅
```

## Note 1 — Location pages (⚠️ decision deferred to Phase 3)

City pages live at `/industries/local-service/[city]` (e.g. `glendale-seo`). Trade-off:

- **Keep (current)**: no URL churn, pages already indexed/linked. Cost: local-intent pages nested 3 deep and semantically scoped to one industry.
- **Migrate to `/locations/[city]`**: cleaner local-SEO signal, room for non-local-service city content. Cost: 18 x 301s + re-indexation dip.

**Rule:** decide once, from GSC data at week 13+; if migrating, do all 18 in one release with 301s and sitemap update. Never move piecemeal.

## Internal linking model (hub-and-spoke)

```
                    ┌─ Service page ◄──────────┐
  Home ─► Hubs ─►   ├─ Industry page ◄──┐      │
                    ├─ Outcome page ◄─┐ │      │
                    └─ City page      │ │      │
                                      │ │      │
  Case study ─────────────────────────┴─┴──────┘   (hrefs already in lib/work.js)
  Insight post ─► 1 service + 1 case study minimum + founder byline
```

- Case studies are the **connective tissue**: each links its service + industry + outcome (data model already has `industryHref`/`outcomeHref` — add `serviceHref` when building `/work/[slug]`).
- Every insights post carries author byline → `/about/steve-martin` (entity reinforcement).
- Sitewide internal-linking pass was already shipped (commit `6b38325`) — extend the same pattern to new page types rather than inventing a new one.

## Schema map (current vs. target)

| Page type | Live today | Add |
|---|---|---|
| Home / sitewide | ProfessionalService, WebSite, PostalAddress, Person | `sameAs` arrays, `hasOfferCatalog` listing 11 services |
| Service pages | FAQ (in template) | Service schema per page |
| Industry pages | FAQ | — |
| City pages | FAQ, Place/City | — |
| Insights | Article/BlogPosting | `author` → Person `@id` linkage |
| Founder | Person | ProfilePage wrapper, credentials, `sameAs` |
| Case studies ➕ | — | Article + about:Organization(client) + citable result stated in text |
| Comparison pages ➕ | — | Article; FAQ where genuine |

## Quality gates

1. **No new page without a target query** and a defined internal-link source + destination.
2. **City pages**: minimum one unique local proof element (client, review, or local data) — pages that can't meet this by month 6 get consolidated into the local-service hub.
3. **Case studies**: real metrics only; if a client won't approve a number, the study states the qualitative outcome — never invented precision.
4. **Sitemap**: keep the existing no-`lastModified` policy except insights (real dates) — already implemented correctly in `app/sitemap.js`.
5. **Orphan check** each quarter: every URL in sitemap must have ≥1 internal link (crawl with Screaming Frog free tier or `/seo-firecrawl` if installed).
