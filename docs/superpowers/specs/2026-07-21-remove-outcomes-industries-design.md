# Remove Outcomes/Industries, Reorder Nav, Rewrite Homepage — Design Spec

Date: 2026-07-21

## Purpose

Three changes bundled in one request:
1. Reorder the Consulting nav dropdown to lead with SEO Services, Web & App Development, PPC Services, Content Marketing, GEO Services (keeping CRO & UX Analysis, AI & LLM Systems Consulting, and Digital PR & Link Building appended after).
2. Remove `/outcomes` and `/industries` entirely (hub pages + all 9 sub-pages), with 301 redirects preserving any existing link equity.
3. Rewrite the homepage's meta title/description/H1/hero copy around "Expert SEO Services Company | Gobiya Internet Marketing" positioning, replacing the current "website marketing company" framing.

## Decisions already made (via user Q&A)

- Nav: keep all 8 existing Consulting items; reorder to SEO Services, Web & App Development, PPC Services, Content Marketing, GEO Services, then CRO & UX Analysis, AI & LLM Systems Consulting, Digital PR & Link Building (labels for the first two renamed services shortened per the user's exact wording: "PPC Services" not "PPC Management Services", "Content Marketing" not "Content Marketing Services" — URLs unchanged, `/ppc-management-services` and `/content-marketing-services`).
- Outcomes/Industries removal: 301 redirect every removed URL, not a bare 404.
- Homepage H1: literal match to the new title (`Expert SEO Services Company | Gobiya Internet Marketing`), matching the flat-service-pages convention — dropping the current animated video-in-headline treatment.

## Scope discovery (why this is bigger than a simple removal)

A sitewide search for `/outcomes/` and `/industries/` found references in 22 files. Categorized:

**Deleted outright** (10 page routes + 2 template components):
- `app/outcomes/page.js`, `app/outcomes/traffic/page.js`, `app/outcomes/rankings/page.js`, `app/outcomes/sales/page.js`, `app/outcomes/recovery/page.js`
- `app/industries/page.js`, `app/industries/enterprise-b2b/page.js`, `app/industries/local-service/page.js`, `app/industries/healthcare/page.js`, `app/industries/professional-services/page.js`
- `components/OutcomeTemplate.js`, `components/IndustryTemplate.js` (only consumers were the pages above)
- `lib/outcomes.js`, `lib/industries.js` (only consumers were the pages above — confirmed no other file imports `OUTCOMES` or `INDUSTRIES`)

**`next.config.mjs` — 44 existing redirect entries need their `destination` repointed**, not just the 10 new ones added. A large block of legacy city-page redirects (39 entries) already points to `/industries/local-service`, and 5 more point to `/outcomes/recovery`. Leaving these as-is would create redirect chains (old-url → /industries/local-service → 404, since that page is gone and getting its own new redirect to `/`). Every one of these 44 destinations must become `/` directly, same discipline as the flat-service-pages redirect work.

**10 new redirects** (all removed URLs → `/`, matching this codebase's existing convention of redirecting removed hub-page trees with no direct single-page equivalent to home — see `next.config.mjs`'s existing `/capabilities -> /` and `/creativity -> /` entries):
```
/outcomes                  -> /
/outcomes/traffic          -> /
/outcomes/rankings         -> /
/outcomes/sales            -> /
/outcomes/recovery         -> /
/industries                -> /
/industries/enterprise-b2b -> /
/industries/local-service  -> /
/industries/healthcare     -> /
/industries/professional-services -> /
```

**Internal link remapping** (redirects prevent 404s, but a "Related" button/link that resolves to the homepage under a mismatched label like "Local Service Business" or "Sales" is a real content-quality problem, not just a technical one — every one of these gets repointed to a topically sensible surviving page, not left pointing at a dead URL):

| Old target | New target | Rationale |
|---|---|---|
| `/outcomes/traffic`, `/outcomes/rankings`, `/outcomes/recovery` | `/seo-services` | All three are organic-search outcomes; SEO Services is the direct surviving equivalent |
| `/outcomes/sales` | `/ppc-management-services` | Sales/lead-gen outcome most directly tied to paid acquisition |
| `/industries/local-service`, `/industries/healthcare`, `/industries/enterprise-b2b`, `/industries/professional-services` | `/work` | No surviving page replaces industry-specific hubs; `/work` (real case studies, several already tagged by these exact industries via their `tag` field) is the closest analog to "proof for your industry" |

Files needing this remapping (1:1 URL substitution per the table above, applied per-link based on which old URL each link used):
- `lib/insights.js` — ~30 references: most are each article's single required `relatedHref`/`relatedLabel` CTA (`ArticleTemplate.js:167` always renders this, it's not optional — cannot be removed, must be repointed), plus several inline body links
- `lib/work.js` — 11 case studies × `industryHref` + `outcomeHref` fields (22 lines). Unlike `relatedHref`, these ARE optional/removable in the template — see below
- `lib/services.js` — 2 ledes: `authority-link-building` (`/industries/local-service` → `/work`), `cro-ux` (`/outcomes/rankings` and `/outcomes/traffic`, both → `/seo-services`)
- `lib/servicesFlat.js` — 1 FAQ link: `seo-services`'s "long-term organic traffic growth" link (`/outcomes/traffic` → `/work`, since it's already ON the SEO services page, so the more useful destination is proof, not a same-topic loop)
- `app/ai-visibility/page.js` — 1 FAQ link: `/outcomes/rankings` → `/seo-services`
- `public/llms.txt` — 1 line listing `/industries/local-service` as "Los Angeles local SEO city pages" — this is an AI-crawler-facing manifest describing real site sections; since there's no surviving page it accurately describes, **remove the line entirely** rather than point it at a redirect (a stale/misleading entry in an AI discovery file is worse than no entry)

**`lib/work.js`'s `industryHref`/`outcomeHref` — different treatment than the table above.** `CaseStudyTemplate.js`'s "Related pages" section renders three buttons per case study: `serviceHref` (a service), `industryHref` (an industry), `outcomeHref` (an outcome). Once industries/outcomes no longer exist as distinct content, remapping 22 individual href values to generic fallbacks (`/work`, `/seo-services`) would produce buttons whose *label* (`cs.tag`, e.g. "Healthcare & Dental") no longer matches a real destination page — same mismatch problem, just harder to fix by URL substitution alone since the label text itself would need auditing too. Cleaner fix: **remove the `industryHref` and `outcomeHref` buttons from `CaseStudyTemplate.js`'s Related section entirely**, keeping only the `serviceHref` button (which still points to a real, specific, still-existing service page). Correspondingly, remove the now-unused `industryHref`/`outcomeHref` fields from all 11 case study entries in `lib/work.js` rather than leave dead data.

**`app/sitemap.js`**: remove the `OUTCOMES`/`INDUSTRIES` imports and the `outcomeRoutes`/`industryRoutes` array-building + spread.

**`lib/nav.js`**: remove the `Outcomes` and `Industries` top-level `NAV_ITEMS` entries; reorder the `Consulting` group's `Performance`/`Creativity` items per the decisions above (flatten into presentation order — the underlying `groups`/`pillar` structure can stay, since `Header.js` already renders items in array order within each group; only the item order within each group array needs to change, positioning the 5 named items first across both groups in the stated sequence, with the remaining 3 following. Concretely: `Performance` group becomes `[SEO Services, Web & App Development, PPC Services(label)]`, `Creativity` group becomes `[Content Marketing(label), GEO Services]`, and CRO & UX Analysis / AI & LLM Systems Consulting move into `Performance` after PPC, Digital PR & Link Building stays alone in `Relations` — net result when the dropdown renders group-by-group is SEO Services, Web & App Development, PPC Services, CRO & UX Analysis, AI & LLM Systems Consulting, then Content Marketing, GEO Services, then Digital PR & Link Building. This does NOT produce a single flat 8-item list in the exact literal order "SEO, Web&App, PPC, ContentMarketing, GEO, then the 3 others" if the dropdown is genuinely rendered as 3 separate visual groups — flag this in plan review before implementing, see Open Question below).

## Resolved: nav structure

`Header.js:44` only renders a group heading when `g.group` is truthy (`{g.group && <span className="nav__dropdown-heading">{g.group}</span>}`) — a `groups: [{ items: [...] }]` entry with no `group` key already renders as one flat, unheaded list. This is the exact pattern the (now-removed) `Outcomes` and `Industries` nav entries already used. So: **collapse Consulting's `groups` to a single ungrouped `items` array**, in the literal requested order — `SEO Services, Web & App Development, PPC Services, Content Marketing, GEO Services, CRO & UX Analysis, AI & LLM Systems Consulting, Digital PR & Link Building` — no code changes needed to `Header.js` itself, this is purely a `lib/nav.js` data restructure.

## Homepage rewrite

- **Metadata title**: `Website Marketing Company | Gobiya` → `Expert SEO Services Company | Gobiya Internet Marketing`
- **Metadata description**: rewritten around SEO-services positioning (current: "Gobiya is a website marketing company helping brands rank higher, get found in Google, and get cited by AI. Get a free audit.") → new: "Gobiya is an expert SEO services company helping brands rank higher, get found in Google, and get cited by AI. Real client results, free audit."
- **H1**: literal match to title per the decision above — `app/page.js:72-87`'s current animated multi-part H1 (`The website marketing company built for the [video] era of answers.`) is replaced with a plain `Expert SEO Services Company | Gobiya Internet Marketing` H1. This drops the inline video treatment; the video asset itself can stay unused in `public/assets/videos/` (not deleted, out of scope) or the hero section can keep a different visual treatment — plan should specify exact markup.
- **Eyebrow** (`app/page.js:71`, "Website Marketing Company · LA · Glendale · Koreatown") — should also update to match new positioning, e.g. "Expert SEO Services Company · LA · Glendale · Koreatown", for consistency between eyebrow/H1/title.
- **Hero sub / first-100-words** (`app/page.js:89`): current — `If you are searching for a "website marketing company near me," Gobiya is your local partner in Los Angeles. We make local and global brands findable in Google, cited by ChatGPT and AI Overviews, and profitable through technical SEO, content, and paid search — one accountable team, not a patchwork of vendors.` → rewritten: `If you are searching for an "SEO services company near me," Gobiya is your local partner in Los Angeles. We make local and global brands findable in Google, cited by ChatGPT and AI Overviews, and profitable through technical SEO, content, and paid search — one accountable team, not a patchwork of vendors.` (minimal, targeted edit: swap "website marketing company" for "SEO services company" and "a" for "an" to match the vowel sound, keep everything else — the rest of the sentence is already accurate and doesn't need a full rewrite).

## Testing / verification

No test framework in this repo — manual verification, same pattern as every prior task this session:
- All 10 removed URLs 301-redirect to `/` in a single hop (check `Location` header directly, not just final status)
- All 44 previously-indirect redirects now land on `/` in a single hop, not through a dead intermediate path
- `/outcomes/*` and `/industries/*` return 404 only via the redirect (i.e., there's no page left to 404 — confirm the redirect fires before any page-not-found)
- Sitewide grep for `/outcomes/` and `/industries/` returns zero results outside `next.config.mjs` (where they're legitimate redirect `source` values) and docs/
- `CaseStudyTemplate.js`: confirm only the `serviceHref` button renders in the Related section on a sample case study page, no broken buttons
- `app/sitemap.js`: confirm no `/outcomes/*` or `/industries/*` URLs appear
- `lib/nav.js`: confirm dropdown renders in the intended order, no broken items
- Homepage: confirm new title/description/H1/hero-sub render correctly, canonical still correct
