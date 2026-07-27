# AI / Websites / SEO / PPC Glossary (Knowledgebase)

## Goal

Add a comprehensive terms glossary under the "Resources" nav column, covering AI/GEO, Websites, SEO, and PPC. Each term is both a plain-English answer for a visitor and a standalone, AI-citable definition (direct-answer format + `DefinedTerm` schema), consistent with the GEO framework the site already teaches in `/ai-visibility` and the "Art of AI Search" guide.

## Architecture

Mirrors the existing `/insights` hub + detail pattern (`lib/insights.js`, `app/insights/page.js`, `app/insights/[slug]/page.js`) for consistency with how content already works on this site.

### Data — `lib/glossary.js`

Array of term objects:

```js
{
  slug: 'core-web-vitals',
  term: 'Core Web Vitals',
  category: 'Websites', // one of: 'AI', 'Websites', 'SEO', 'PPC'
  shortDefinition: '1-2 sentence direct-answer definition — the citable part.',
  body: 'A fuller paragraph: how it works, why it matters, an example.',
  relatedSlugs: ['largest-contentful-paint', 'page-speed'], // 2-4 other glossary slugs
  relatedHref: '/seo-services',       // optional — link to the matching service page
  relatedLabel: 'See our SEO work',   // optional
}
```

Plus a `getGlossaryTerm(slug)` lookup helper, matching `getInsight(slug)` in `lib/insights.js`.

**Coverage:** ~77 terms — roughly 20 AI/GEO, 20 Websites, 21 SEO, 16 PPC — covering the terms a buyer would actually type into ChatGPT or Google alongside Gobiya's services (e.g. Core Web Vitals, GEO, Schema Markup, Quality Score, E-E-A-T, ROAS, RAG, llms.txt, NAP Consistency, Zero-Click Search). Definitions are written fresh, in the site's plain 9th-grade voice, not copied from the existing insights articles (though they may reference them via `relatedHref`).

### Hub — `app/glossary/page.js`

- Hero + `TopicMarquee` (matching other hub pages).
- A client component (`components/GlossaryIndex.js`) with category filter pills (`All` / `AI` / `Websites` / `SEO` / `PPC`) — same interaction pattern as `InsightsGrid`'s filters — rendering an A-Z grouped list of terms.
- Unlike `InsightsGrid`, **no pagination** — with ~77 short entries there's no need, and it avoids the crawlability bug the Insights hub had to patch around (paginated client grid hid most article links from the server-rendered HTML). Since the filter defaults to "All" and nothing is paginated away, every term link is present in the initial server-rendered HTML.
- `DefinedTermSet` JSON-LD listing all terms.

### Detail — `app/glossary/[slug]/page.js`

- `generateStaticParams`, `generateMetadata` (via `buildMetadata`), `notFound()` for unknown slugs — same shape as `app/insights/[slug]/page.js`.
- New `components/GlossaryTermTemplate.js`: breadcrumbs, category badge, term as H1, `shortDefinition` as the opening line (direct-answer first, per the site's own GEO framework), `body` below it, a "Related Terms" list (from `relatedSlugs`), and — where set — a CTA link to `relatedHref`.
- `DefinedTerm` JSON-LD (`name`, `description`, `inDefinedTermSet: '/glossary'`).

### Nav — `lib/nav.js`

Add a "Glossary" item to the `Resources` column's `KNOWLEDGE BASE` group, linking to `/glossary`.

## Out of scope

- Auto-linking glossary terms from within existing `/insights` articles or service pages (tooltip/inline-link automation) — a separate follow-up if wanted.
- A search box on the hub page — the A-Z index + category filter is enough at ~77 terms.
