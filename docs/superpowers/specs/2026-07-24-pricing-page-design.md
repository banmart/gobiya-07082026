# /pricing Page — Design Spec

Date: 2026-07-24

## Purpose

A new `/pricing` page presenting Gobiya's service packages as three bundled monthly retainer tiers plus an à la carte add-on table, linked from the footer. Numbers are chosen to be consistent with the ranges already published in `lib/insights.js` (`/insights/how-much-does-seo-cost`) and the existing `$3,500` web-dev starting price used on the homepage offer card and `/lp` — no new figures that contradict existing site content.

## Non-goals

- No changes to primary header nav (`NAV_ITEMS` in `lib/nav.js`) — footer link only, per the request.
- No payment/checkout integration — CTAs route to `/onboarding` and phone, same as every other service page.
- No per-service standalone pricing pages — this is a single page.
- No new lib/data file — tier and add-on data is small, presentational, and used by exactly one page, so it's defined inline in `app/pricing/page.js` (consistent with how `app/services/page.js` defines its own `PILLARS` array inline rather than in `lib/`).

## Page structure (`app/pricing/page.js`)

Follows the same section conventions as `app/services/page.js` (`page-hero`, `.section`, `.container`, `.faq`, `.cta`):

1. **Hero** (`page-hero page-hero--left`) — eyebrow "Pricing", H1 "Pricing that scales with how seriously you're competing.", short lede noting packages bundle SEO, GEO, content, PPC, and more into one system rather than siloed line items.
2. **Tier grid** (3 columns, new `.pricing-grid`/`.pricing-card` styles):
   - **Findable** — $1,500–$3,500/mo — local/SMB. Includes: technical SEO audit & fixes (`/seo-services`), core site & service page copy (`/content-marketing-services`), schema markup & local citation cleanup, monthly Search Console reporting.
   - **Cited** *(featured — dark-filled card, "Most Popular" badge)* — $3,500–$8,500/mo — growth-stage. Everything in Findable, plus: GEO/AI answer-engine content (`/geo-services`), ongoing content marketing — pillar & cluster pages, digital PR & editorial link building (`/services/authority-link-building`), quarterly AI citation tracking (ChatGPT/Perplexity/AI Overviews).
   - **Chosen** — $8,500–$25,000+/mo — competitive B2B/enterprise. Everything in Cited, plus: PPC/Google Ads management (`/ppc-management-services`), CRO & UX testing program (`/services/cro-ux`), AI & LLM systems consulting (`/services/ai-llm-consulting`), dedicated strategist + priority turnaround.
   - Each card: name, price range, one-line "best for," feature list (each item links to its real service page), CTA button to `/onboarding`.
3. **Add-on table** — à la carte services addable to a lower tier without upgrading the whole retainer:
   - Web & App Development — starting at $3,500 one-time (`/services/web-app-development`) — same figure as the homepage offer card.
   - Digital PR & Link Building — from $750/mo (`/services/authority-link-building`) — add-on to Findable; included from Cited up.
   - CRO & UX Analysis — from $1,200/mo (`/services/cro-ux`) — add-on to Findable/Cited; included in Chosen.
   - AI & LLM Systems Consulting — starting at $2,500/project (`/services/ai-llm-consulting`) — add-on to Findable/Cited; included in Chosen.
   - PPC/Google Ads Management — from $1,000/mo + ad spend (`/ppc-management-services`) — add-on to Findable/Cited; included in Chosen.
4. **FAQ** (reuse `.faq` pattern from `app/services/page.js`): retainer vs. project pricing, what determines where a client lands in a range, contract terms/minimum commitment, "what if my needs don't match a package" — with a link out to `/insights/how-much-does-seo-cost` for the fuller published cost breakdown.
5. **CTA** (reuse `.cta section section--tint` pattern): "Not sure which package fits? Book a free strategy call." → `/onboarding` button + phone link, matching `app/services/page.js`.

Metadata via `buildMetadata()`: title "Pricing — SEO, GEO & Digital Marketing Packages | Gobiya", description summarizing the three tiers, `path: '/pricing'`, standard indexable robots (this is a page we want found).

## Styling

No existing pricing-table component to reuse. New CSS added to `app/globals.css`, matching the site's flat-bordered, no-shadow visual language (same approach as `.insights__grid`/`.insights__card`):

- `.pricing-grid` — 3-col grid, 1px gap on `var(--border)` background (same bordered-cells technique as `.insights__grid`), collapsing to 1 column under `48rem` per existing breakpoint conventions.
- `.pricing-card` — padding, flex column, price/name/features/CTA.
- `.pricing-card--featured` — dark background (`var(--darkest)`), inverted text color, same visual weight as `.insights__filter.is-active`'s dark-fill treatment.
- `.pricing-card__price` — large price range, `var(--font-heading)`.
- `.pricing-card__features` — simple `<ul>`, each `<li>` a link to the relevant service page.
- `.addon-table` — simple bordered row list (service name, price, link), lighter-weight than the tier cards, reusing existing typography scale rather than introducing a new one.

## Footer link

Add one entry to the `Firm` group in `lib/nav.js`'s `SECONDARY_NAV`:

```js
{ label: 'Pricing', href: '/pricing' },
```

Placed after `Work`, before `Insights`. Renders automatically via `Footer.js`'s existing `SECONDARY_NAV.map(...)` — no `Footer.js` changes needed.

## Files touched/added

- `app/pricing/page.js` — new
- `lib/nav.js` — edit (add one `SECONDARY_NAV` entry)
- `app/globals.css` — edit (new pricing/add-on styles, appended near the existing `.insights__*`/`.pillar` blocks)

## Testing / verification

No automated test suite covers page content/styling in this codebase (confirmed by the patterns in prior specs — manual QA is the established approach here). Verification is manual, in-browser:

- Load `/pricing` — confirm hero, three tier cards (Cited visually featured), add-on table, FAQ, and CTA all render.
- Confirm every service-page link in the feature lists and add-on table resolves (no typos in hrefs vs. actual routes in `lib/servicesFlat.js`/`lib/services.js`).
- Confirm the page is responsive at mobile width (tier grid collapses to 1 column).
- Confirm footer on any page shows "Pricing" under the "Firm" heading and links to `/pricing`.
- `npm run build` (or equivalent) to confirm no build/type errors from the new route and nav entry.
