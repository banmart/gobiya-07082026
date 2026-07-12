# Gobiya — Implementation Roadmap
*Prepared 2026-07-12. Phase 1 (foundation) is largely already built — this roadmap starts from measurement and proof, not infrastructure.*

## Phase 0 — Baseline (Week 1) ⚠️ do first, everything else depends on it

- [ ] Verify Google Search Console property + submit sitemap (IndexNow already live for Bing/Yandex)
- [ ] Confirm GA4 events: onboarding submissions, contact submissions, as conversions
- [ ] One backlink pull (SE Ranking / Moz free tier) → record referring domains + DA baseline
- [ ] Manual AI-citation sample: ask ChatGPT, Perplexity, Gemini, Google AI "best technical SEO agency Los Angeles" + "AI visibility agency" — screenshot and log results (baseline ≈ 0 expected)
- [ ] Record keyword baselines for 20 priority terms (see SEO-STRATEGY.md KPI table)

## Phase 1 — Foundation gaps (Weeks 1–4)

Most foundation work is **done** (SSR, canonicals, sitemap, robots, llms.txt, schema, perf, redirects). Remaining:

- [ ] Build `/work/[slug]` route + case study template (extend `lib/work.js` entries with `slug`, `body`, `metrics`, `testimonial` fields)
- [ ] Ship first 2 case study pages (Smile Center, American Livescan)
- [ ] Add `sameAs` arrays to Person + ProfessionalService schema in `components/SiteSchema.js`
- [ ] Create Google Business Profile (if none) + Clutch + GoodFirms + Semrush Agency profiles with identical NAP
- [ ] Per-page OG images for the 11 service pages (currently all share `og-default.jpg`)

**Exit criteria:** baselines logged; 2 case studies live; entity profiles consistent across 4 directories.

## Phase 2 — Proof & expansion (Weeks 5–12)

- [ ] Case studies 3–4 live (SafetyCentric, QuickPass AiD)
- [ ] Content calendar Q3 executed (6 insights posts — see CONTENT-CALENDAR.md)
- [ ] **Research asset #1** published + pitched to 10 outlets
- [ ] 3–5 client reviews seeded on Clutch/GoodFirms
- [ ] Founder page upgrade: algorithm-update timeline, credentials, publications
- [ ] Internal linking pass: every case study ↔ service ↔ industry ↔ outcome (hrefs already modeled in data)
- [ ] Monthly AI-citation tracking begins (SE Ranking AI SoV if key configured, else manual 5-platform sample)

**Exit criteria:** 4 case studies live; first external links from research asset; review profiles active.

## Phase 3 — Scale (Weeks 13–24)

- [ ] Case studies 5–6 live (Remodel Me Pros, Medicine Metta)
- [ ] Comparison/alternatives content live (2–3 BOFU pages)
- [ ] Research asset #2 published
- [ ] City-page enrichment sprint: unique local proof block per page, prioritized by GSC impressions; prune or consolidate any city page with zero impressions and no proof available
- [ ] Digital PR push: founder quotes/HARO-style placements, 2 podcast appearances
- [ ] Decide on `/locations/` URL migration based on city-page traction data (single planned migration with 301s, or defer)

**Exit criteria:** 40 keywords top-10; measurable AI citations for at least brand + 1 category term; 30+ new referring domains.

## Phase 4 — Authority (Months 7–12)

- [ ] Quarterly research cadence locked (assets #3, #4)
- [ ] "Gobiya vs. [competitor]" pages for terms GSC shows brand-adjacent impressions on
- [ ] Speaking/webinar footprint → founder page + Person schema updates
- [ ] Refresh pass on all 2026-dated content
- [ ] Publish own AI-visibility scorecard publicly ("we track our citations — here's ours") as category-differentiating proof
- [ ] 12-month KPI review vs. SEO-STRATEGY.md table; re-plan

## Dependencies & constraints

| Dependency | Blocks | Note |
|---|---|---|
| GSC/GA4 access verified | All measurement | Week 1, non-negotiable |
| Client permission for case study names | P1 case studies | Names already public on /work — confirm metrics can be published per client |
| Founder time (~2 days/mo content) | Calendar cadence | Drafts can be AI-assisted; voice/facts must be founder-edited |
| SE Ranking API key (optional) | Automated AI SoV tracking | Manual sampling works meanwhile; `/seo seranking ai-visibility gobiya` once installed |

## Risk mitigations

- **No early rankings movement (months 1–3 on a low-authority domain is normal):** hold the course; leading indicators are indexation, impressions, and first citations — not positions.
- **Research asset flops:** the audit data still feeds vertical landing pages and sales collateral; sunk cost is near zero.
- **Founder bandwidth crunch:** case study pages take priority over insights posts — proof beats publishing volume.
