# Gobiya Institutional Redesign — Design Spec

**Date:** 2026-07-17
**Status:** Approved in brainstorming; pending final spec review
**Reference:** boma.org ("Full Institution" approach — transplant BOMA's structure, reskin in Gobiya's type and a navy/carmine palette)

## Goals

1. Move the theme from fashion-editorial capital-firm to **institutional corporate** (BOMA-style: company-targeted, UX/wayfinding-first, authority through structure).
2. Replace borrowed React Bits components (SplitText, ScrollReveal, Ballpit) with a **bespoke GSAP motion system** — scroll-driven storytelling + micro-interaction polish.
3. **New logo**: hand-built vector wordmark + compact geometric mark. No generated imagery.
4. **Consolidate services 11 → 8** to focus keyword targeting; strengthen on-page SEO sitewide.
5. **Hold performance**: PSI mobile ≥ 95, LCP < 2.0s, CLS < 0.05, INP < 200ms. Net JS decreases (three.js removed).

## Non-goals

- No changes to Outcomes, Industries, or city pages beyond inherited re-theme.
- No page transitions, no WebGL hero (explicitly declined for performance).
- No CMS or content-platform changes; no new pages beyond merges.

## 1. Brand foundation

### Palette tokens (globals.css `:root` replacement)

| Token | Value | Role |
|---|---|---|
| `--navy-900` | `#0B1F3A` | Footer, dark sections, hero display text (replaces `#18181a` overlay) |
| `--navy-700` | `#143659` | Buttons, headings, link hover — workhorse brand color |
| `--navy-tint` | `#EDF1F6` | Tinted sections (replaces `#f7f7f7` warm gray) |
| `--accent` | `#C8102E` | Carmine accent (replaces `#e41613`). Small uses only: eyebrow dots, active states, mark node. Never large fills. |
| `--paper` | `#FFFFFF` | Base background |
| Borders | navy-alpha hairlines | Same hairline system, re-tinted cool (e.g. `rgba(11,31,58,0.16)` / `0.38` strong) |

Existing token names (`--main`, `--darkest`, `--overlay`, `--lightest`, `--border`…) are remapped to the new values rather than renamed everywhere, so the change propagates through globals.css with minimal churn. Square corners win: pill buttons and 8px input radii are flattened to match the hairline system.

### Typography

- **Unchanged faces:** Stack Sans Notch 400 (display), Inter (body).
- **Add Inter 600** for card titles, nav labels, wayfinding (BOMA's bold-sans labels). Exactly 3 font files total, `display: swap`.
- Display scale comes down on inner pages (institutional hierarchy); homepage keeps one oversized hero moment (max ~8rem, down from 11rem).

### Logo (hand-built SVG only)

- **Mark:** "signal beacon" — four hairline strokes converging to a point with a small carmine node at convergence. Navy strokes on light; reversed for dark. Pure geometry, legible at 16px favicon and 400px.
- **Wordmark:** GOBIYA custom-set from the display face with adjusted spacing/terminals (drawn logotype, not live text).
- **Lockups:** horizontal (nav), stacked (footer), mark-only (favicon/social/watermark).
- **Deliverables:** SVG source for all lockups; regenerated `icon-32.png`, `icon-192.png`, `apple-icon-180.png`, `og-default.jpg`.
- The current giant rotated body watermark (`body::before` + `.footer__mark`) is retired. One faint, straightened mark may appear in the footer only.
- User approves rendered artwork in the browser before it replaces existing assets.

## 2. Homepage structure (BOMA skeleton)

Two-tier header: utility bar (phone · email · "Get an AI visibility audit" CTA) above the main sticky nav (mark + wordmark left; Consulting, Outcomes, AI Visibility, Industries, Work, About, Insights; existing dropdown structure kept, labels in Inter 600).

Body blocks in order:

1. **Hero** — H1 display claim carrying "AI driven internet marketing consultants" naturally; exact-match phrase in subline and meta title; dual CTA (solid navy primary, ghost secondary); full-width imagery below.
2. **Stats band** — Est. 2010 · BBB A+ · Google Partner 2015–2019 · 5.7x ROAS · 213K impressions · 61% CPL reduction. Horizontal band directly under hero (BOMA member-numbers pattern).
3. **Services grid** — 8 consolidated services as scannable cards (tag + title + one-liner + arrow). Replaces the three full-viewport sticky stack cards.
4. **AI Visibility feature** — dark navy band; existing AI Overviews / ChatGPT / Perplexity rows; the page's single pinned scroll scene.
5. **Four pillars** — Findable · Credible · Cited · Chosen, with hand-drawn SVG line glyphs (no icon fonts).
6. **Insights cards** — 3 latest articles.
7. **Client logo strip** — real client logos (existing webp/png assets), slow marquee, pause on hover. Replaces the text-name marquee.
8. **CTA band + footer** — clean navy CTA (email/phone buttons); multi-column footer with stacked lockup; giant outline wordmark retired or reduced to a restrained version.

### Inner templates (Service / Industry / Outcome / Location / Article)

- Inherit the re-theme via globals.css.
- **Left-aligned page heroes** (replacing centered) with **breadcrumbs** + `BreadcrumbList` schema.
- Consistent section order: overview → capabilities → process → FAQ → related-services cross-links (new block).

## 3. Motion system & performance

### Removed

- React Bits components: `SplitText.js`, `ScrollReveal.js`, `Ballpit.js`, `BallpitLazy.js`.
- `three` dependency (~150 KB gzip) — Ballpit was its only consumer.
- `public/js/main.js` behaviors are folded into the new module where still needed (nav scroll state, counters, reveals).

### Added: `lib/motion.js` (GSAP core + ScrollTrigger only)

| Where | Behavior |
|---|---|
| Hero | Line-masked headline reveal (lines rise behind hairline rules; no per-char animation) |
| Stats band | Hairline rules draw across on arrival; numbers count up once (scrubbed) |
| AI Visibility band | Single pinned ScrollTrigger scene: platform rows illuminate in sequence, then release. Max one pinned scene per page |
| Cards (services/insights) | Staggered rise-and-settle; hover = border draw + arrow slide |
| Four pillars | SVG stroke self-draw (stroke-dashoffset) on scroll |
| Micro layer (sitewide) | Magnetic primary CTAs, nav underline draw, logo-strip pause on hover, image scale-settle. All ≤ 300ms on existing expo easings |

### Guardrails

- Reveals are progressive enhancement: content never hidden before JS runs (no-JS/first-paint safe).
- All motion honors `prefers-reduced-motion` (extend the existing pattern to every new animation).
- Net route JS smaller than today (three.js out; GSAP already shipped).
- Hard gates verified with Lighthouse before/after: **PSI mobile ≥ 95, LCP < 2.0s, CLS < 0.05, INP < 200ms**.

## 4. IA consolidation & keyword targeting

### Services 11 → 8

| Canonical page | Absorbs (301) | Primary keyword |
|---|---|---|
| `/services/seo-discoverability` | — | technical SEO consultant / SEO consulting Los Angeles |
| `/services/geo-ai-content-writing` | — | generative engine optimization (GEO) services |
| `/services/web-app-development` | — | SEO-first web development |
| `/services/ai-llm-consulting` | — | AI & LLM consulting |
| `/services/cro-ux` | — | conversion rate optimization services |
| `/services/seo-web-copywriting` | `/services/content-strategy` | SEO copywriting services (strategy folded in as a section) |
| `/services/authority-link-building` | `/services/digital-pr` | link building services + digital PR |
| `/services/google-ads-ppc` | `/services/ai-video-ads` | Google Ads management (AI creative folded in) |

GEO stays standalone deliberately: flagship differentiator, emerging low-competition query space, feeds `/ai-visibility`.

### Merge mechanics

- 301 redirects in `next.config.mjs`.
- Merged page copy is folded into the survivor (sections added), not discarded.
- `lib/services.js` entries merged; `lib/nav.js` and all internal links updated; sitemap regenerates from routes; `llms.txt` updated.
- Outcomes, Industries, and city pages untouched.

### On-page SEO

- Homepage: primary "AI driven internet marketing consultants" + "internet marketing consultants Los Angeles"; exact phrase in meta title and subline; H1 written as a claim carrying the terms.
- Every page: one primary + 2–3 supporting terms (documented in `lib/services.js` comments).
- Sitewide `BreadcrumbList` schema via new breadcrumbs; existing FAQ/Organization schema kept.
- New "Related consulting" cross-link block on service pages to reinforce topical clusters.

## Error handling & edge cases

- **Redirect safety:** old service URLs 301 (not 404); sitemap excludes retired slugs; internal grep for retired hrefs must return zero before ship.
- **No-JS / slow-JS:** all content readable with JS disabled; motion is additive.
- **Reduced motion:** every GSAP timeline checks the media query; pinned scene degrades to static stacked rows.
- **Logo rollout:** old assets stay in place until new SVG lockups are approved in-browser; favicon/OG regenerated in the same change to avoid mixed branding.

## Testing & verification

1. `next build` clean; no references to removed components/deps.
2. Lighthouse (mobile) on `/`, one service page, one article — all gates met, compared against pre-change baseline.
3. Redirect tests: each retired slug returns 301 to its survivor.
4. Schema validation (Rich Results test / validator) for BreadcrumbList + existing schema.
5. Visual pass across breakpoints (360px, 768px, 1280px, 1920px) on home + each template.
6. `prefers-reduced-motion` manual check: no hidden content, no pinning.

## Build order (for the implementation plan)

1. Palette + typography re-theme (tokens, globals.css, square corners).
2. Logo SVGs → user approval in browser → asset swap (favicons, OG, nav, footer).
3. Motion module + React Bits/three.js removal.
4. Homepage rebuild (8 blocks).
5. Template upgrades (breadcrumbs, left heroes, related-services block).
6. Services consolidation (data merge, redirects, nav, llms.txt).
7. Verification pass (gates above).
