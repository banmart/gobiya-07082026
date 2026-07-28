# Homepage Competitive Rewrite — Design

*Date: 2026-07-28. Scope: copy + light restructure of `app/page.js`. No visual redesign; reuse existing `mw-*` classes.*

## Problem

Live research (2026-07-28) across both arenas Gobiya competes in shows the homepage losing on five specific, fixable points. Refreshes `seo-plan/COMPETITOR-ANALYSIS.md` (2026-07-12).

| Competitor | Hero | Proof shown |
|---|---|---|
| Go Fish Digital | "Get cited in AI. Get found in Google. Get chosen by buyers." | Awards row, Barracuda tool, +74.8% clicks |
| Stratabeat | "The GEO Agency that Fuels Your Visibility in the AI Answer Engines" | +218.2% AI-engine traffic, +222% MQLs |
| Bliss Drive | "We Drive Growth and Revenue with Proven Performance Strategies" | 547%, 2,282%, 1,328%; "You've Probably Been Burned by SEO Agencies Before" |
| NoGood | "The growth squad behind category-defining brands" | Nike/TikTok/Amazon logos, Goodie tool |
| Brenton Way | "AI-native growth agency built for brands shaping the future" | 85% 1-year retention |
| ClapCreative | "Leading Web Design Company In Los Angeles." | 200+ projects, 12+ years; no AI mention at all |
| **Gobiya (today)** | **"Web AI & SEO Experts"** | **15+ years, 500+ scans, "Top 1%", "1 Goal"** |

Coalition Technologies returns HTTP 403 to fetching; its profile is from search results only.

**Gaps:**
1. Gobiya's hero names a category; every rival names an outcome.
2. The stats bar is unfalsifiable where rivals are specific.
3. No FAQ block — four of six rivals have one, and it is the highest-value block for AI citation.
4. The burned-buyer objection is buried in column 2 of 3, mid-page.
5. The proprietary-tool story is absent, though Gobiya has a real MCP server.

**Two constraints discovered:**

- **Name collision.** Go Fish Digital's H1 is *"Get cited in AI. Get found in Google. Get chosen by buyers."* Gobiya's pricing tiers are Findable / Cited / Chosen. The category's most visible GEO agency owns that triad in its H1, so it must not be promoted to Gobiya's hero. The pricing page is a separate follow-up, out of scope here.
- **Unused real data.** `lib/searchWins.js` exports `SEARCH_WINS`: real, dated, blended Google Search Console + AI-grounding figures with documented honesty rules (favorable-window selection, small-base exclusion, labeled comparison windows). It is currently rendered nowhere on the homepage. This is the asset that closes gap 2.

## Positioning

Lead on **founder-operated + AI visibility** — the one claim no rival can copy. Coalition, NoGood and ClapCreative present anonymous teams; the GEO specialists sell tooling and methodology, not a named practitioner. Voice follows the existing house style: plain 9th-grade language, brand-first, keywords natural rather than stuffed.

## Changes

### 1. Hero (`section.mw-hero`)

Replace the H1, excerpt, and CTA.

- **H1:** `Search and AI visibility, run by the person you actually hired.`
- **Excerpt:** `Gobiya is an independent Los Angeles consultancy. Steve Martin has optimized small and mid-sized businesses for Google, ChatGPT and Perplexity since 2010 — and leads every account himself. No account managers. No long-term contracts.`
- **Primary CTA:** `Get Your Free Site Scan` → `/free-site-scan`
- **Secondary CTA:** `View Our Process` → `#process` (retains current behavior)

Rationale: the sole hero CTA today is an anchor jump. Go Fish ("Get a Free GEO Audit") and Stratabeat ("Book a Strategy Call") both route to a lead form. `/free-site-scan` already exists.

Requires a secondary button variant. Reuse an existing `mw-*` button class rather than introducing new styling.

### 2. Stats bar (`section.mw-stats`)

Import `SEARCH_WINS` from `lib/searchWins` and drive the four cards from it instead of hardcoded strings.

| Out | In |
|---|---|
| `Top 1%` / AI Search Visibility | `4,850` / AI Citations & Grounding — *up 142%, last 90 days* |
| `1` / Goal: Scale Your Business | `320,791` / Impressions — *up 39% vs. prior quarter* |
| `500+` / SEO & AI Scans | `28.7` / Avg. Google position — *improved from 34.5* |
| `15+` / Years Experience | unchanged |

Render `SEARCH_WINS.asOf` and each card's `window` label so the numbers are attributable. Drop `Top 1%` — it is unbacked, and unbacked superlatives are the specific claim this market has learned to distrust. Do not fabricate replacements: every figure comes from `SEARCH_WINS`.

Note for implementation: `SEARCH_WINS.cards` has ids `impressions`, `ctr`, `position`, `ai-citations`. Select by id rather than array index, and let the "15+ years" card stay a literal since it is not in that dataset.

### 3. Trust bar (`section.mw-trust`)

`The SEO Firm Trusted by Hundreds of Entrepreneurs` over six logos is a claim outrunning its evidence.

- **New heading:** `Southern California businesses we've run search for since 2010`

### 4. Reorder and reframe the objection

Move `Meet Your Point Person` (currently section 5) to sit directly after the trust bar, ahead of `Digital Growth is Complicated`. The differentiator should appear before the methodology.

Reframe the three columns in `mw-simple` so the burned-buyer objection leads. Bliss Drive names it outright; no LA rival does.

- **Section heading:** `You've probably been burned by an SEO agency before`
- **Intro:** `Most owners we talk to have already paid someone for a year of reports they couldn't read, and rankings that never turned into calls. Here's how we're set up differently.`
- **Column 1 — `You work with the person doing the work`:** `There are no account managers here. Steve runs your account, answers your email, and does the analysis himself. That is also the honest limit on how many clients we take.`
- **Column 2 — `Leave whenever you want`:** `No long-term contracts and no cancellation penalty. We re-earn the work every month, which is the only real guarantee anyone in this business can offer.`
- **Column 3 — `Numbers you can check yourself`:** `You get direct access to your own Search Console and analytics — not a slide deck we assembled. If a month was flat, you'll see it before we tell you.`

### 5. New FAQ section

Insert before the consultation section. Static Q&A markup — no accordion JavaScript, so the answer text is in the DOM for AI crawlers. Add `FAQPage` JSON-LD alongside it.

Eight questions, each answered in 40–70 words, phrased as a searcher would ask:

1. **What does SEO cost in Los Angeles?** — Ranges tied to the real published tiers: Findable $999–$2,500/mo, Cited $2,500–$5,500/mo, Chosen $5,500–$10,000+/mo. Link `/pricing`.
2. **What is generative engine optimization (GEO)?**
3. **How is GEO different from SEO?**
4. **How do I get my business cited by ChatGPT?**
5. **How long before I see results?** — honest ranges, no guarantees.
6. **Do you require a long-term contract?** — no.
7. **Who actually does the work?** — Steve, directly.
8. **Do you work with businesses outside Los Angeles?**

Answers must not invent metrics or guarantees. Where a claim needs a number, use `SEARCH_WINS` or the published pricing.

### 6. Tool proof line

Add one sentence with links in the existing book/resource section: Gobiya runs a public MCP server at `/mcp` that lets AI assistants query it directly, plus free tools at `/tools`. Go Fish sells Barracuda and NoGood sells Goodie; this is the equivalent proof, and it demonstrates the service rather than describing it.

## Out of scope

- All `mw-*` visual styling, the hero image, testimonials, and the book section's layout.
- The pricing page's Findable/Cited/Chosen naming, despite the Go Fish collision — separate decision.
- **Flagged, not fixed:** section 11's calendar is a hardcoded mockup rendering fixed dates 26–22 with `07` permanently selected. It is decorative and non-functional next to a "Schedule a Free Consultation" heading. Worth its own ticket.

## Success criteria

1. `app/page.js` renders with no hardcoded performance claim that isn't traceable to `lib/searchWins.js` or `app/pricing/page.js`.
2. `Top 1%` and `1 / Goal: Scale Your Business` no longer appear.
3. Hero primary CTA resolves to `/free-site-scan`.
4. `Meet Your Point Person` precedes `Digital Growth is Complicated` in DOM order.
5. FAQ answers are present as static text (visible with JavaScript disabled) and the `FAQPage` JSON-LD validates.
6. `npm run build` succeeds; existing tests pass.
