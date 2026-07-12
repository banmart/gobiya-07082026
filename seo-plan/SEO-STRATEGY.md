# Gobiya — SEO Strategy
*Prepared 2026-07-12 · gobiya.com · Founder-led technical SEO & AI-visibility agency, Los Angeles*

## 1. Where Gobiya stands today

The site is already ahead of most agency sites at this stage. What exists and works:

- **Architecture matches best practice for agencies**: 11 service pages, 4 industry verticals, 18 LA-area city pages, 4 outcome pages, 9 insights articles, founder page, approach/methodology page, onboarding funnel.
- **Technical foundation is done**: Next.js SSR, canonical + OG metadata on every route via `lib/meta.js`, XML sitemap, robots, IndexNow key, `llms.txt`, service worker, recent render-blocking/perf fixes, legacy-URL redirects.
- **Schema in place**: ProfessionalService, WebSite, Person (founder), Article/BlogPosting on insights, FAQ schema inside service/industry/location/outcome templates.
- **Differentiated IA**: the `/outcomes/*` pillar (traffic, rankings, sales, recovery) maps to *buyer problems* rather than agency services — few competitors do this.

## 2. Positioning

**The wedge:** almost every LA agency now bolts "AI" onto its pitch. Gobiya's credible claim is the intersection nobody in the local market owns: **a founder who personally does the technical work + AI-visibility (GEO) as a first-class discipline, not an add-on.**

- Local rivals (Coalition Technologies, Bliss Drive, ClapCreative) sell technical SEO at scale with account managers; Gobiya sells *the person who tracked every algorithm update since Panda*.
- National GEO specialists (Go Fish Digital, Directive, NoGood, Stratabeat) don't compete for LA local-intent or SMB/healthcare verticals.
- Market pricing context: GEO retainers are being sold at ~$750/mo (add-on) to $1,750+/mo (combined SEO+GEO) — Gobiya's outcome-framed packaging supports premium-of-local pricing.

**Positioning statement to enforce sitewide:** *"The LA technical SEO agency that gets you cited by AI, not just ranked by Google — run by the person who does the work."*

## 3. Strategic priorities (ranked by impact)

### P1 — Case study pages (the single biggest gap)
`lib/work.js` holds 6+ real results (5x patient inquiries, 3x bookings, 61% CPL reduction) but they render as **cards on /work with no dedicated pages**. This is the highest-leverage fix:
- Each becomes a 1,000+ word page at `/work/[slug]` with challenge → approach → measurable result → timeline → testimonial.
- Specific, citable metrics are exactly what AI engines quote (GEO) and what buyers of high-trust services need (E-E-A-T).
- Internal-link each case study to its service, industry, and outcome page (the hrefs already exist in the data).

### P2 — Original research / data asset
Nothing earns links and AI citations for an SEO agency like proprietary data. One asset per quarter, e.g. *"We audited 100 LA dental practice websites: 74% are invisible to AI search"* — cheap to produce with existing tooling, directly feeds the healthcare vertical, and gives digital PR something real to pitch.

### P3 — Insights cadence + AI-citation content
9 posts exist and several already target the right queries (GEO, SEO vs GEO, get-cited-by-ChatGPT). Sustain 2 posts/month targeting question-shaped, citable queries (see CONTENT-CALENDAR.md).

### P4 — Comparison & alternatives pages
Zero comparison content exists. "Gobiya vs. big-agency SEO", "Coalition Technologies alternatives", "SEO agency vs. freelancer vs. in-house" — these capture bottom-funnel searchers already comparing vendors.

### P5 — Location page strategy review
18 city pages live under `/industries/local-service/[city]` (e.g. `/industries/local-service/glendale-seo`). They're crawlable and in the sitemap, but the URL nesting buries local-intent pages three levels deep and semantically ties "Glendale SEO" to one industry. Recommendation: keep as-is short-term (don't churn URLs), but if any city page earns traction, consider promoting the pattern to `/locations/[city]` with 301s in a single planned migration — never piecemeal.

## 4. GEO (AI-visibility) plan — practice what you sell

Gobiya's own AI visibility is a sales asset: "ask ChatGPT who does technical SEO in LA."

- [x] `llms.txt` published
- [x] Person schema for founder
- [ ] Add `sameAs` links (LinkedIn, X, directories) to Person + ProfessionalService schema
- [ ] Publish case studies with citable metrics (P1 above)
- [ ] Original research asset (P2 above)
- [ ] Consistent NAP + entity info across Clutch, GoodFirms, Semrush Agency Partners, Google Business Profile
- [ ] Monthly AI-citation check: brand + "technical SEO Los Angeles" + "AI visibility agency" across ChatGPT, Perplexity, AI Overviews, Gemini (SE Ranking AI SoV or manual sampling)
- [ ] Every service page opens with a 2–3 sentence quotable definition block (extraction-friendly)

## 5. E-E-A-T plan

- Founder page exists — strengthen with: speaking/publication credits, dated "algorithm updates I've navigated" timeline (unique, unfakeable experience signal), headshot schema, `sameAs`.
- Byline + author schema on every insights post → link to `/about/steve-martin`.
- Client testimonials with names/roles on case study pages.
- Third-party validation: Clutch and GoodFirms profiles with 3–5 seeded reviews from the existing client roster.

## 6. KPI targets

| Metric | Baseline (Jul 2026) | 3 mo | 6 mo | 12 mo |
|---|---|---|---|---|
| Organic sessions/mo | establish in GSC/GA4 | +50% | 2–3x | 5x |
| Keywords in top 10 | audit needed | 15 | 40 | 100 |
| "technical seo los angeles" position | not ranking (assumed) | top 30 | top 10 | top 5 |
| AI citation rate (5-platform sample) | ~0% | measurable | 10% | 25% |
| Referring domains | audit needed | +10 | +30 | +75 |
| Organic-sourced onboarding submissions/mo | 0–1 | 2 | 5 | 12 |
| Case study pages live | 0 | 4 | 6 | 8+ |

Baselines must be captured in week 1 (GSC + GA4 + one backlink pull) — see IMPLEMENTATION-ROADMAP.md.

## 7. Risks

| Risk | Mitigation |
|---|---|
| New/low-authority domain vs. entrenched LA agencies | Win on long-tail + verticals (dental, local-service) first; head terms are a 12-month game |
| GEO category noise — everyone claims AI expertise | Prove it with own AI citations + research data, not adjectives |
| Founder-led = content bottleneck | Calendar sized at 2 posts/mo + 1 case study/mo; AI-assisted drafts, founder voice on edit |
| 18 city pages risk thin-content classification | Each needs 1+ unique local proof point (client, review, or local data); prune any that can't earn one by month 6 |
