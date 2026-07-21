# Flat, Keyword-First Service Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace 4 of 7 `/services/[slug]` pages with 4 flat, keyword-first top-level pages (`/seo-services`, `/geo-services`, `/ppc-management-services`, `/content-marketing-services`), each with a keyword-matched title/H1, humanized ~100-word intro, a real testimonial, and a real verified datapoint — then retire the 4 old pages with redirects and update every internal link that pointed at them (50 in `lib/insights.js` alone).

**Architecture:** New data file `lib/servicesFlat.js` + new shared component `components/FlatServiceTemplate.js` + 4 thin page wrappers, modeled on the existing `lib/services.js` / `components/ServiceTemplate.js` pattern already used by 3 of the 4 services being folded. Old pages removed, `next.config.mjs` gets 4 new redirects plus 6 repointed existing ones (to avoid redirect chains), and every internal link across the codebase is updated to the new URLs.

## Global Constraints

- Old → new URL mapping (used everywhere in this plan):
  - `/services/seo-discoverability` → `/seo-services`
  - `/services/geo-ai-content-writing` → `/geo-services`
  - `/services/google-ads-ppc` → `/ppc-management-services`
  - `/services/seo-web-copywriting` → `/content-marketing-services`
- Title = H1 exactly, keyword-first format: `"{Keyword} Services - Expert {Full Descriptive Phrase} Services"` (spec's literal example: `SEO Services - Expert Search Engine Optimization Services`).
- Every datapoint must be a real, already-verified number pulled from `lib/searchWins.js` / `lib/clientSearchWins.js` / `lib/work.js` — never fabricated or estimated. The GEO page's datapoint must be honestly framed as underlying search visibility, not overclaimed as an AI-citation-specific metric (no GSC metric for AI citations exists).
- The other 4 services (`authority-link-building`, `cro-ux`, `ai-llm-consulting`, `web-app-development`) in `lib/services.js` are out of scope — do not touch their entries or pages.
- No test framework exists in this repo — verification is manual dev-server/curl checks, consistent with every prior task this session.
- New pages must be indexable: normal `buildMetadata()` output, no `noindex`, included in `app/sitemap.js`.

---

### Task 1: `lib/servicesFlat.js` data file

**Files:**
- Create: `lib/servicesFlat.js`

**Interfaces:**
- Produces: `SERVICES_FLAT`, an object keyed by new slug (`seo-services`, `geo-services`, `ppc-management-services`, `content-marketing-services`). Each entry shape: `{ slug, title, metaDescription, intro, testimonial: { quote, name, company, role, photo, href }, datapoint: { value, decimals, suffix, label, sourceNote, href }, problem: { eyebrow, statement }, capabilities: [{ tag, title, desc }], process: [{ step, title, desc }], faqs: [{ q, a }], ctaTitle }`. Task 2 (`FlatServiceTemplate.js`) and Task 3 (page wrappers) consume this shape.

- [ ] **Step 1: Write `lib/servicesFlat.js`**

```js
// Flat, keyword-first service pages — "back to basics" title/H1/intro format,
// each backed by a real testimonial and a real, already-verified datapoint
// (never fabricated — same bar as lib/searchWins.js and lib/clientSearchWins.js).
// These 4 pages replace 4 of the 7 entries that used to live in lib/services.js
// under /services/[slug]; see next.config.mjs for the 301 redirects from the
// old URLs. The other 3 services (authority-link-building, cro-ux,
// ai-llm-consulting) plus web-app-development stay at their existing URLs,
// untouched by this restructuring.

export const SERVICES_FLAT = {
  'seo-services': {
    slug: 'seo-services',
    title: 'SEO Services - Expert Search Engine Optimization Services',
    metaDescription: 'Expert SEO services that fix crawlability, indexation, and Core Web Vitals — the technical foundation search and AI crawlers actually read. See real client results and get a free audit.',
    intro: 'SEO services should start with one blunt question: can a search engine actually read your page? If a crawler can’t fetch and render your site, no amount of content or backlinks will save it. Our SEO services fix that technical foundation first — crawlability, indexation, structured data, and Core Web Vitals — before building the content and authority layer on top. It’s the same system that took SafetyCentric’s organic search impressions up 113% in 90 days, verified directly in Google Search Console. Request a free SEO audit to see what’s actually capping your traffic.',
    testimonial: {
      quote: 'Moving off WordPress was the part I was most nervous about and it turned out to be the easy part. The bigger deal was the CRM and the drip campaigns — leads used to sit in an inbox until someone remembered them. Now they get followed up whether I’m paying attention or not.',
      name: 'Pete Urueta',
      company: 'Safety-Centric.com',
      role: 'Business Security Systems Services',
      photo: '/assets/img/pete-urueta-ceo.webp',
      href: '/work/safetycentric',
    },
    datapoint: {
      value: 113,
      decimals: 0,
      suffix: '%',
      label: 'Increase in organic search impressions for one client in 90 days',
      sourceNote: 'Verified in Google Search Console — see the live number on the SafetyCentric case study.',
      href: '/work/safetycentric',
    },
    problem: {
      eyebrow: 'The problem',
      statement: 'A site can look finished and still be functionally invisible — blocked crawl paths, blank-page JavaScript rendering, and missing schema quietly capping traffic no matter how much content gets published on top of it.',
    },
    capabilities: [
      { tag: 'Rendering', title: 'Server-side rendering', desc: 'We fix client-side-only React/JS sites that deliver a blank page to crawlers, replacing them with SSR or static generation that ships full HTML.' },
      { tag: 'Recovery', title: 'Algorithm & penalty recovery', desc: 'We diagnose whether a traffic drop is an algorithmic filter or a manual action, and build the specific recovery plan each requires.' },
      { tag: 'Schema', title: 'Structured data', desc: 'Clean JSON-LD for Organization, LocalBusiness, Service, and FAQ types — the same markup AI systems use to verify what your business actually is.' },
      { tag: 'Speed', title: 'Core Web Vitals', desc: 'LCP, CLS, and TTFB tuned to pass Google’s thresholds natively, without a plugin stack fighting itself.' },
    ],
    process: [
      { step: '01', title: 'Technical audit', desc: 'Full crawl and render test — what Googlebot and GPTBot actually see, not what the browser shows you.' },
      { step: '02', title: 'Fix the foundation', desc: 'Rendering, indexation, and crawl-budget issues resolved before anything else is touched.' },
      { step: '03', title: 'Structured data & IA', desc: 'Schema markup and information architecture built to map cleanly to how your industry is actually searched.' },
      { step: '04', title: 'Verify & monitor', desc: 'Search Console verification, ongoing crawl monitoring, and a clear record of what changed and when.' },
    ],
    faqs: [
      { q: 'How do we know if our traffic drop is an algorithm update or something we did?', a: 'We check the drop date against known Google update rollouts, look at which page types and query categories lost traffic, and check Search Console for manual action notices. Algorithmic drops tend to hit broad content categories at once; manual actions come with an explicit notice and usually follow a specific violation.' },
      { q: 'Our developer says the site is fast. Why isn’t it ranking?', a: '"Fast" in a browser and "readable" to a crawler are different things. A site can score well on PageSpeed and still deliver an empty div to a crawler if content loads entirely client-side. We test with the same rendering methods search and AI crawlers use, not just a Lighthouse score.' },
      { q: 'Do we need to rebuild our whole site to fix this?', a: 'Usually not. Most technical SEO problems are fixable without a rebuild — rendering configuration, schema injection, and crawl-path fixes can typically be layered onto an existing codebase. A <a href="/services/web-app-development">full rebuild</a> is only the right call when the underlying platform genuinely can’t support server-side rendering.' },
      { q: 'What is an organic search strategy?', a: 'An organic search strategy is the plan for earning search traffic without paying for clicks — covering technical SEO, keyword targeting, content structure, and authority building so pages rank for queries that match real buyer intent. Unlike paid search, organic rankings compound over time: a well-optimized page earns traffic long after the initial work is done. Our SEO services start with the technical foundation, then build the content and authority layer on top. See how this connects to <a href="/outcomes/traffic">long-term organic traffic growth</a>.' },
      { q: 'How have search engine algorithms evolved?', a: 'Search algorithms have shifted from keyword matching to intent understanding and expertise evaluation. Early updates like Panda and Penguin penalized thin content and manipulative links. Later updates — Hummingbird, RankBrain, and BERT — introduced semantic understanding of queries. The Helpful Content system and recent core updates reward demonstrated expertise and genuine usefulness. AI Overviews add a new layer: content now competes to be extracted and cited, not just ranked. Gobiya has tracked and responded to every major algorithm update since 2010. See our guide on <a href="/insights/why-did-my-website-traffic-drop">diagnosing traffic drops after algorithm updates</a>.' },
    ],
    ctaTitle: 'Find out what’s actually capping your traffic.',
  },

  'geo-services': {
    slug: 'geo-services',
    title: 'GEO Services - Expert Generative Engine Optimization Services',
    metaDescription: 'Expert GEO services engineered to get your content cited by ChatGPT, Perplexity, and Google AI Overviews — not just ranked. See our AI citation research and get a free audit.',
    intro: 'GEO services exist because AI answer engines don’t reward marketing copy — they pull direct, well-structured answers from pages that have already earned their trust. Our GEO services engineer content around the exact questions your buyers ask ChatGPT and Perplexity, so your page is the one that gets quoted, not just indexed. We back this with real research: our AI Citation Study asked five AI assistants the same 200 questions and tracked exactly who they cited and why. One client, The Healing Metta, now shows up when people ask ChatGPT about integrative care in their area — that wasn’t true a year ago. Request a free GEO content audit to see where you’re losing citations.',
    testimonial: {
      quote: 'Users were finding answers about our treatments everywhere except from us. The shift was writing for the questions people actually ask, and structuring it so the AI tools could read it properly. When someone asks ChatGPT about integrative care in our area now, we come up. That wasn’t true a year ago.',
      name: null,
      company: 'The Healing Metta',
      role: 'Secrets of Buddha',
      photo: null,
      href: '/work/the-healing-metta',
    },
    datapoint: {
      value: 34,
      decimals: 0,
      suffix: '%',
      label: 'Growth in blended organic search visibility across every account we run this quarter',
      sourceNote: 'The same underlying visibility AI answer engines pull from — see our AI Citation Study for how we track actual AI citations directly.',
      href: '/insights/ai-citation-study',
    },
    problem: {
      eyebrow: 'The problem',
      statement: 'Most web copy is written to persuade a human reader scrolling a page — not to be parsed and quoted by a language model looking for a direct, well-sourced answer to a specific question.',
    },
    capabilities: [
      { tag: 'Structure', title: 'Answer-first writing', desc: 'Direct, extractable answers placed where AI systems look for them, backed by the supporting detail that earns trust.' },
      { tag: 'Research', title: 'Prompt-mapped content', desc: 'Content built around the real prompts buyers run in ChatGPT and Perplexity, not just Google keyword volume.' },
      { tag: 'Format', title: 'FAQ & comparison pages', desc: 'The page formats AI systems cite most reliably — clear questions, direct answers, structured comparisons.' },
      { tag: 'Voice', title: 'SEO-mapped web copy', desc: 'Core site and service pages written to rank and convert, not just fill space around a keyword.' },
    ],
    process: [
      { step: '01', title: 'Prompt & query research', desc: 'What buyers actually ask AI platforms and Google about your category, mapped by intent.' },
      { step: '02', title: 'Content architecture', desc: 'A page structure that answers the core question fast, then earns the click with real depth.' },
      { step: '03', title: 'Write & structure', desc: 'Drafted, edited, and marked up so both readers and language models can parse it cleanly.' },
      { step: '04', title: 'Track citations', desc: 'We monitor whether the content is actually being cited in AI answers, not just indexed.' },
    ],
    faqs: [
      { q: 'Is this just SEO copywriting with a new name?', a: 'It shares the same foundation as our <a href="/content-marketing-services">content marketing</a> work — clear, well-structured, genuinely useful writing — but GEO adds a layer specific to how language models extract information: direct answers near the top, explicit structure, and framing that’s easy to quote verbatim without losing meaning.' },
      { q: 'Can you rewrite our existing content instead of starting from scratch?', a: 'In most cases, yes. A lot of underperforming content already has the right underlying information — it just needs restructuring around a direct answer and cleaner formatting. We audit existing pages first and only recommend a full rewrite when the content itself is thin.' },
      { q: 'How do you measure whether this is working?', a: 'We track two things: traditional rankings and impressions, and direct citation appearances — <a href="/insights/get-cited-by-chatgpt-perplexity-ai-overviews">running your target prompts against ChatGPT, Perplexity, and Google AI Overviews</a> on a regular cadence to see whether your pages are actually being cited.' },
      { q: 'What AI marketing tools does Gobiya use for content optimization?', a: 'We use AI tools for research — identifying the actual prompts buyers run in ChatGPT and Perplexity — content structuring, and citation tracking to monitor whether target prompts cite client pages. Writing and editorial judgment stay with the team: AI tools improve research speed and coverage, not quality control. For a broader look at AI tool selection and implementation across your marketing stack, see our <a href="/services/ai-llm-consulting">AI and LLM systems consulting</a> work.' },
      { q: 'How does AI change search engine results pages?', a: 'AI has introduced a new top-of-page layer — AI Overviews in Google, answer interfaces in ChatGPT and Perplexity — that summarizes and cites sources before a user clicks any link. Content now competes in two ways: traditional ranking for blue links, and citation selection for the AI answer above. Citation selection follows different rules from ranking, which is why <a href="/ai-visibility">AI visibility (GEO)</a> is now a distinct discipline alongside traditional SEO. Read more in our guide on <a href="/insights/zero-click-search-ai-overviews-small-business">what zero-click AI search means for businesses</a>.' },
    ],
    ctaTitle: 'Write content an AI actually wants to quote.',
  },

  'ppc-management-services': {
    slug: 'ppc-management-services',
    title: 'PPC Management Services - Expert Pay-Per-Click Campaign Management',
    metaDescription: 'Expert PPC management services built around cost per lead, not clicks — campaign structure, landing pages, and conversion tracking. Free ad account audit.',
    intro: 'PPC management services usually optimize for clicks, not booked business. Our PPC management rebuilds campaign structure, negative keyword lists, and landing pages around the one number that actually matters — cost per lead that converts into real customers. Every account we take on gets a full audit before a dollar of spend changes direction. One client, Trusted Home Contractors, cut their cost per real customer by roughly 40% once we rebuilt campaigns around what people were actually searching for and sent them to pages that matched. Request a free Google Ads audit to see where your budget is leaking.',
    testimonial: {
      quote: 'Our ads were working in the sense that the phone rang. They weren’t working in the sense that most of those calls were tire-kickers. Rebuilding the campaigns around what people were actually searching for, and sending them to pages that matched, cut what we pay per real customer by about 40%.',
      name: 'Mike P.',
      company: 'Trusted Home Contractors',
      role: 'General Contractor',
      photo: '/assets/img/testimonial-mike.png',
      href: '/work',
    },
    datapoint: {
      value: 40,
      decimals: 0,
      suffix: '%',
      label: 'Reduction in cost per real customer for one client',
      sourceNote: 'Client-reported result — PPC spend isn’t tracked in Google Search Console, so this is the account’s own reporting, not GSC-verified.',
      href: '/work',
    },
    problem: {
      eyebrow: 'The problem',
      statement: 'Broad match keywords, thin negative lists, and a landing page that doesn’t match search intent quietly burn budget on clicks that were never going to become customers.',
    },
    capabilities: [
      { tag: 'Structure', title: 'Campaign rebuilds', desc: 'Tight ad groups, precise match types, and a negative keyword list maintained weekly to cut waste at the source.' },
      { tag: 'Conversion', title: 'Landing page alignment', desc: 'Pages built or rebuilt to match search intent exactly, so the click and the page make the same promise.' },
      { tag: 'Tracking', title: 'Conversion & call tracking', desc: 'Full-funnel tracking wired to actual bookings and calls, not just form fills, so budget follows real revenue.' },
      { tag: 'Testing', title: 'Bid & creative testing', desc: 'Ongoing testing of bid strategy, ad copy, and extensions against cost-per-lead, not click-through rate alone.' },
      { tag: 'Production', title: 'AI-generated video assets', desc: 'Campaign video produced with AI generation and editing tools, turned around in days rather than a full shoot cycle.' },
      { tag: 'Variants', title: 'Creative variant testing', desc: 'Multiple hooks, formats, and edits produced quickly to test against real ad performance, not guesswork.' },
    ],
    process: [
      { step: '01', title: 'Account audit', desc: 'Full review of current spend, keyword quality, and where budget is leaking against low-intent traffic.' },
      { step: '02', title: 'Rebuild structure', desc: 'Campaigns and ad groups restructured around intent, with negative keywords applied immediately.' },
      { step: '03', title: 'Align landing pages', desc: 'Pages built or adjusted to match the exact promise of each ad, closing the gap between click and conversion.' },
      { step: '04', title: 'Optimize to cost per lead', desc: 'Ongoing bid, budget, and creative decisions made against cost per booked lead, reported monthly.' },
    ],
    faqs: [
      { q: 'Our click-through rate is good — why is cost per lead still high?', a: 'Click-through rate measures whether an ad is compelling, not whether the traffic converts. High CTR with high cost per lead usually points to broad match keywords pulling in low-intent clicks, or a landing page that doesn’t follow through on what the ad promised.' },
      { q: 'How much should we be spending on Google Ads?', a: 'It depends on your margin per customer and current cost per lead, not a rule of thumb. We typically start with a rebuild on existing budget to prove cost-per-lead improvement before recommending any increase in spend.' },
      { q: 'Do you handle both the ads and the landing pages?', a: 'Yes — that alignment is usually where the biggest gains come from, and it overlaps directly with our <a href="/services/cro-ux">CRO &amp; UX analysis</a> work. A well-run campaign sending traffic to a generic homepage still underperforms; matching the landing page to the ad’s specific promise is often the single highest-leverage fix.' },
      { q: 'Does AI-generated video actually perform as well as traditionally produced ads?', a: 'It depends on the format and platform — for short-form, hook-driven paid social ads, AI-produced creative tests competitively because viewers are optimizing for the message and pacing, not production polish. For brand-anchor video, a traditional shoot may still be the right call.' },
    ],
    ctaTitle: 'Rebuild your ad account around cost per lead, not clicks.',
  },

  'content-marketing-services': {
    slug: 'content-marketing-services',
    title: 'Content Marketing Services - Expert Content Marketing & Copywriting Services',
    metaDescription: 'Expert content marketing services that turn organic articles into real search growth, planned by an editorial strategy built on real demand. Free content audit.',
    intro: 'Content marketing services fail for one common reason: pages written to fill a content calendar instead of answering a real, searched question. Our content marketing is planned by an editorial strategy built on actual demand, then written to rank and convert — not just hit a word count. One client, RemodelMePros, put it simply: the SEO articles kept homeowners coming in without buying every lead. That same content-driven approach took SmileCenter’s organic search impressions up 56% in 90 days, verified in Google Search Console. Request a free content audit to see where your current pages are losing demand.',
    testimonial: {
      quote: 'Two-sided marketplaces are hard and I’d already had one developer tell me it couldn’t be done for what I wanted to spend. The bidding dashboard is what contractors actually log in for, and the SEO articles kept homeowners coming in without me buying every lead. It’s not finished — it probably never is — but it works.',
      name: 'Mike P.',
      company: 'RemodelMePros.com',
      role: 'Contractors Marketplace',
      photo: '/assets/img/testimonial-mike.png',
      href: '/work/remodel-me-pros',
    },
    datapoint: {
      value: 56,
      decimals: 0,
      suffix: '%',
      label: 'Increase in organic search impressions from a content-driven rebuild',
      sourceNote: 'A different client (SmileCenter.com) than the testimonial above, verified in Google Search Console — see the live number on their case study.',
      href: '/work/smile-center-dentistry',
    },
    problem: {
      eyebrow: 'The problem',
      statement: 'Keyword-stuffed copy ranks briefly and converts nobody; well-written copy that ignores intent and structure never gets found at all. Most sites end up with one or the other.',
    },
    capabilities: [
      { tag: 'Pages', title: 'Core site copy', desc: 'Homepage, service, and about pages written around real search intent and a clear conversion path, not just keyword density.' },
      { tag: 'Intent', title: 'Search intent mapping', desc: 'Every page built around what someone actually wants when they search that term, not just the term itself.' },
      { tag: 'Voice', title: 'Brand voice development', desc: 'A consistent voice defined once and applied across every page, so the site reads like one business, not a patchwork of vendors.' },
      { tag: 'Structure', title: 'On-page structure & schema', desc: 'Headings, metadata, and structured data built into every page from the draft stage, not bolted on after.' },
      { tag: 'Research', title: 'Topic & gap analysis', desc: 'Search demand and competitor content mapped to find topics worth owning, not just topics that are easy to cover.' },
      { tag: 'Architecture', title: 'Content hub planning', desc: 'Pillar and cluster structures built so individual pieces reinforce each other instead of competing for the same rankings.' },
    ],
    process: [
      { step: '01', title: 'Intent & keyword research', desc: 'What people actually search for and expect to find, mapped page by page before any writing starts.' },
      { step: '02', title: 'Structure & outline', desc: 'Page architecture and heading structure planned around both search intent and a clear conversion path.' },
      { step: '03', title: 'Write & optimize', desc: 'Copy drafted, edited, and structured with metadata and schema built in from the start.' },
      { step: '04', title: 'Review & publish', desc: 'Client review, technical implementation, and indexation monitoring after publish.' },
    ],
    faqs: [
      { q: 'Will this copy sound like it was written for search engines instead of people?', a: 'That’s exactly what we’re trying to avoid. Modern SEO copy succeeds by genuinely answering what someone’s looking for, in a clear voice — keyword stuffing has been a liability, not an asset, for years now.' },
      { q: 'Can you write copy for our existing pages, or only new ones?', a: 'Both. A lot of our copywriting work is rewriting existing pages that rank poorly or convert poorly, often because they were originally written for a different search intent than the one that actually brings traffic.' },
      { q: 'How do you make sure the copy still sounds like our brand?', a: 'We start with a voice and messaging review — existing materials, how your team actually talks to customers — before writing anything, so the copy reads as an extension of your brand rather than a generic template.' },
      { q: 'How much content do we actually need to publish?', a: 'Less than most agencies suggest. A smaller number of well-researched, well-structured pieces targeting real demand consistently outperforms a high-volume calendar of thin, low-intent posts.' },
      { q: 'How do you decide what topics are worth covering?', a: 'We weigh search volume against realistic ranking difficulty, competitive coverage gaps, and how directly the topic connects to a buying decision — a smaller but highly relevant topic often outperforms a bigger, more generic one.' },
      { q: 'What is the difference between SEO services and content marketing?', a: 'SEO services cover the full system: technical foundation, site authority, content strategy, and on-page optimization — everything that determines whether a page ranks. Content marketing is the editorial and production side: writing, publishing, and distributing content. In practice, content marketing without SEO produces pieces that are well-written but rarely found; SEO without content produces a technically clean site with nothing worth ranking. We run both as a single system — the editorial strategy is built from real search demand, and every piece is written to both rank and convert. See how <a href="/seo-services">technical SEO</a> and <a href="/geo-services">AI content writing</a> connect to the copywriting work.' },
      { q: 'What are the best practices for website content optimization?', a: 'The most consistent best practices: match every page to a specific search intent rather than just a keyword, place the direct answer near the top of the page, use structured headings that make the page scannable for both readers and crawlers, add FAQ schema to pages that answer specific questions, and maintain a strong internal linking structure between related pages. On the technical side, metadata, canonical tags, and structured data need to be implemented correctly from the draft stage — retrofitting them after publish is less reliable. See our guide on <a href="/insights/core-web-vitals-2026">Core Web Vitals and page performance</a>.' },
    ],
    ctaTitle: 'Get copy that ranks and actually converts.',
  },
};
```

- [ ] **Step 2: Verify syntax**

Run: `node --check lib/servicesFlat.js`
Expected: no output (clean exit)

- [ ] **Step 3: Commit**

```bash
git add lib/servicesFlat.js
git commit -m "feat: add lib/servicesFlat.js data for 4 new flat service pages"
```

---

### Task 2: `components/FlatServiceTemplate.js`

**Files:**
- Create: `components/FlatServiceTemplate.js`
- Reference (do not modify): `components/ServiceTemplate.js` (this task reuses its CSS classes/section patterns — capability-grid, process__list, faq__list — for visual consistency)

**Interfaces:**
- Consumes: a `service` prop shaped exactly like one `SERVICES_FLAT[slug]` entry from Task 1.
- Produces: default export `FlatServiceTemplate({ service })`, consumed by Task 3's 4 page files.

- [ ] **Step 1: Write `components/FlatServiceTemplate.js`**

```jsx
import Image from 'next/image';
import Breadcrumbs from './Breadcrumbs';
import HeroQuickForm from './HeroQuickForm';
import TopicMarquee from './TopicMarquee';

export default function FlatServiceTemplate({ service }) {
  return (
    <main id="top">

      <section className="page-hero page-hero--left section" style={{ paddingBottom: '3rem' }}>
        <div className="container seo-hero__grid">
          <div>
            <Breadcrumbs items={[
              { label: 'Home', href: '/' },
              { label: 'Consulting', href: '/services' },
              { label: service.title.split(' - ')[0] },
            ]} />
            <h1 className="statement" data-split style={{ textAlign: 'left', marginInline: 0 }}>{service.title}</h1>
            <p className="lede" data-reveal style={{ marginInline: 0 }}>{service.intro}</p>
            <div className="hero__ctas" data-reveal style={{ justifyContent: 'flex-start' }}>
              <a href="/onboarding" className="btn btn--solid">Get a free audit</a>
              <a href="#included" className="btn btn--ghost">What&apos;s included</a>
            </div>
          </div>
          <div>
            <HeroQuickForm />
          </div>
        </div>
      </section>
      <TopicMarquee topics={[service.title.split(' - ')[0], ...service.capabilities.slice(0, 3).map(c => c.title), 'Enterprise SEO']} />

      {/* ══════════ Real datapoint ══════════ */}
      <section className="seo-proof">
        <div className="container">
          <div className="seo-proof__grid" style={{ gridTemplateColumns: '1fr' }}>
            <a className="seo-proof__item" data-reveal href={service.datapoint.href} style={{ textDecoration: 'none', color: 'inherit' }}>
              <span className="seo-proof__value">
                <i data-count={service.datapoint.value} data-plain>{service.datapoint.value}</i>
                {service.datapoint.suffix && <em>{service.datapoint.suffix}</em>}
              </span>
              <span className="seo-proof__label">{service.datapoint.label}</span>
              <p style={{ fontSize: '0.8125rem', color: 'var(--hint)', marginTop: '0.5rem' }}>{service.datapoint.sourceNote}</p>
            </a>
          </div>
        </div>
      </section>

      {/* ══════════ Testimonial ══════════ */}
      <section className="testimonials section section--dark" id="testimonial" aria-label={`What ${service.testimonial.company} said`}>
        <div className="container container--narrow">
          <p className="eyebrow eyebrow--center eyebrow--light" data-reveal><span className="eyebrow__dot"></span>In their own words</p>
          <div className="testimonial-rotator" data-reveal>
            <blockquote className="testimonial-rotator__quote">
              <p>{service.testimonial.quote}</p>
            </blockquote>
            <div className="testimonial-rotator__byline">
              <div className="testimonial-rotator__who">
                {service.testimonial.photo && (
                  <Image
                    src={service.testimonial.photo}
                    alt={service.testimonial.name || service.testimonial.company}
                    width={56}
                    height={56}
                    className="testimonial-rotator__photo"
                  />
                )}
                <p className="testimonial-rotator__attrib">
                  {service.testimonial.name && (
                    <>
                      <span className="testimonial-rotator__name">{service.testimonial.name}</span>
                      <span className="testimonial-rotator__sep" aria-hidden="true">&middot;</span>
                    </>
                  )}
                  <a href={service.testimonial.href} className="testimonial-rotator__company" style={{ textDecoration: 'underline' }}>{service.testimonial.company}</a>
                  <span className="testimonial-rotator__sep" aria-hidden="true">&middot;</span>
                  <span className="testimonial-rotator__role">{service.testimonial.role}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ Problem ══════════ */}
      <section className="about section section--tint" id="problem">
        <div className="container container--narrow">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>{service.problem.eyebrow}</p>
          <h2 className="statement statement--small" data-split>{service.problem.statement}</h2>
        </div>
      </section>

      {/* ══════════ Capabilities ══════════ */}
      <section className="section" id="included">
        <div className="container container--narrow" style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>What&apos;s included</p>
        </div>
        <div className="container">
          <div className="capability-grid">
            {service.capabilities.map((c) => (
              <div className="capability-card" key={c.title} data-reveal>
                <span className="capability-card__tag">{c.tag}</span>
                <h3 className="capability-card__title">{c.title}</h3>
                <p className="capability-card__desc" dangerouslySetInnerHTML={{ __html: c.desc }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ Process ══════════ */}
      <section className="section section--tint" id="process">
        <div className="container container--narrow" style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>How it runs</p>
          <h2 className="statement statement--small" data-split>A defined process, not an open-ended retainer.</h2>
        </div>
        <div className="container container--narrow">
          <ul className="process__list">
            {service.process.map((p) => (
              <li className="process__item" key={p.step} data-reveal>
                <span className="process__step">{p.step}</span>
                <div>
                  <h3 className="process__title">{p.title}</h3>
                  <p className="process__desc">{p.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ══════════ FAQ ══════════ */}
      <section className="faq section" id="faq">
        <div className="container container--narrow">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>Common questions</p>
          <h2 className="statement statement--small" data-reveal style={{ marginBottom: '3rem' }}>{service.title.split(' - ')[0]}, plainly explained.</h2>
          <dl className="faq__list">
            {service.faqs.map((f) => (
              <div className="faq__item" key={f.q} data-reveal>
                <dt>{f.q}</dt>
                <dd dangerouslySetInnerHTML={{ __html: f.a }} />
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ══════════ Related ══════════ */}
      <section className="related section section--tint" id="related">
        <div className="container">
          <p className="eyebrow" data-reveal><span className="eyebrow__dot"></span>Related consulting</p>
          <div className="related__grid">
            {['seo-services', 'geo-services', 'ppc-management-services', 'content-marketing-services']
              .filter((slug) => slug !== service.slug)
              .slice(0, 3)
              .map((slug) => (
                <a className="svc-card" href={`/${slug}`} key={slug} data-reveal>
                  <span className="svc-card__tag">Consulting</span>
                  <h3 className="svc-card__title">{slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}</h3>
                </a>
              ))}
          </div>
        </div>
      </section>

      {/* ══════════ CTA ══════════ */}
      <section className="cta section" id="contact">
        <div className="container container--narrow">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>Start a conversation</p>
          <h2 className="cta__title" data-split>{service.ctaTitle}</h2>
          <div className="cta__actions" data-reveal>
            <a href="/onboarding" className="btn btn--solid btn--big">Book a strategy call</a>
            <a href="tel:+13237441338" className="btn btn--ghost btn--big">323-744-1338</a>
          </div>
        </div>
      </section>

    </main>
  );
}
```

Note: `service.title.split(' - ')[0]` extracts just the keyword portion (e.g. `"SEO Services"` from `"SEO Services - Expert Search Engine Optimization Services"`) for use in the breadcrumb, TopicMarquee, and FAQ heading, where the full title-tag-length string would be too long.

- [ ] **Step 2: Verify no import errors**

Run: `npx next build --dry-run 2>&1 | head -5` — if `--dry-run` isn't supported by this Next version, instead verify in Task 3's dev-server check (this component can't render standalone without a page using it).

- [ ] **Step 3: Commit**

```bash
git add components/FlatServiceTemplate.js
git commit -m "feat: add FlatServiceTemplate component for new service pages"
```

---

### Task 3: 4 new page routes

**Files:**
- Create: `app/seo-services/page.js`
- Create: `app/geo-services/page.js`
- Create: `app/ppc-management-services/page.js`
- Create: `app/content-marketing-services/page.js`

**Interfaces:**
- Consumes: `SERVICES_FLAT` from Task 1 (`lib/servicesFlat.js`), `FlatServiceTemplate` from Task 2, `buildMetadata` from `lib/meta.js`.
- Produces: 4 live, indexable routes.

- [ ] **Step 1: Write `app/seo-services/page.js`**

```jsx
import FlatServiceTemplate from '../../components/FlatServiceTemplate';
import { SERVICES_FLAT } from '../../lib/servicesFlat';
import { buildMetadata } from '../../lib/meta';

const service = SERVICES_FLAT['seo-services'];

export const metadata = buildMetadata({
  title: service.title,
  description: service.metaDescription,
  path: '/seo-services',
});

export default function Page() {
  return <FlatServiceTemplate service={service} />;
}
```

- [ ] **Step 2: Write `app/geo-services/page.js`**

```jsx
import FlatServiceTemplate from '../../components/FlatServiceTemplate';
import { SERVICES_FLAT } from '../../lib/servicesFlat';
import { buildMetadata } from '../../lib/meta';

const service = SERVICES_FLAT['geo-services'];

export const metadata = buildMetadata({
  title: service.title,
  description: service.metaDescription,
  path: '/geo-services',
});

export default function Page() {
  return <FlatServiceTemplate service={service} />;
}
```

- [ ] **Step 3: Write `app/ppc-management-services/page.js`**

```jsx
import FlatServiceTemplate from '../../components/FlatServiceTemplate';
import { SERVICES_FLAT } from '../../lib/servicesFlat';
import { buildMetadata } from '../../lib/meta';

const service = SERVICES_FLAT['ppc-management-services'];

export const metadata = buildMetadata({
  title: service.title,
  description: service.metaDescription,
  path: '/ppc-management-services',
});

export default function Page() {
  return <FlatServiceTemplate service={service} />;
}
```

- [ ] **Step 4: Write `app/content-marketing-services/page.js`**

```jsx
import FlatServiceTemplate from '../../components/FlatServiceTemplate';
import { SERVICES_FLAT } from '../../lib/servicesFlat';
import { buildMetadata } from '../../lib/meta';

const service = SERVICES_FLAT['content-marketing-services'];

export const metadata = buildMetadata({
  title: service.title,
  description: service.metaDescription,
  path: '/content-marketing-services',
});

export default function Page() {
  return <FlatServiceTemplate service={service} />;
}
```

- [ ] **Step 5: Verify all 4 pages render**

Run: `npm run dev`, note the port from the log (reuse an already-running server if present rather than starting a new one), then for each of the 4 paths:

```bash
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:PORT/seo-services
curl -s http://localhost:PORT/seo-services | grep -o "SEO Services - Expert Search Engine Optimization Services" | head -1
curl -s http://localhost:PORT/seo-services | grep -oE "113%|SafetyCentric" | sort -u
```

Repeat the pattern (status 200, title text present, datapoint/testimonial text present) for `/geo-services` (expect "34%" and "The Healing Metta"), `/ppc-management-services` (expect "40%" and "Trusted Home Contractors"), `/content-marketing-services` (expect "56%" and "RemodelMePros").

Also confirm canonical and no-noindex:
```bash
curl -s http://localhost:PORT/seo-services | grep -oE 'rel="canonical" href="[^"]*"|noindex'
```
Expected: canonical href ending in `/seo-services`, no `noindex` anywhere in output.

- [ ] **Step 6: Commit**

```bash
git add app/seo-services app/geo-services app/ppc-management-services app/content-marketing-services
git commit -m "feat: add 4 new flat, keyword-first service page routes"
```

---

### Task 4: Redirects in `next.config.mjs`

**Files:**
- Modify: `next.config.mjs`

**Interfaces:**
- Produces: 4 new redirects (old `/services/[slug]` → new flat URL) and 6 repointed existing redirects (previously pointing at the 4 old paths, now pointing directly at the new URLs, avoiding a redirect chain).

- [ ] **Step 1: Add 4 new redirects**

In `next.config.mjs`, inside the `redirects()` array, add (placing near the top of the array is fine — order doesn't affect behavior, Next.js checks all entries):

```js
      { source: '/services/seo-discoverability', destination: '/seo-services', permanent: true },
      { source: '/services/geo-ai-content-writing', destination: '/geo-services', permanent: true },
      { source: '/services/google-ads-ppc', destination: '/ppc-management-services', permanent: true },
      { source: '/services/seo-web-copywriting', destination: '/content-marketing-services', permanent: true },
```

- [ ] **Step 2: Repoint the 6 existing redirects whose destination is one of the 4 retiring paths**

Find and update each of these 6 existing entries (destination only — source stays the same):

```js
      { source: '/performance/technical-seo-audit-agency', destination: '/services/seo-discoverability', permanent: true },
```
→
```js
      { source: '/performance/technical-seo-audit-agency', destination: '/seo-services', permanent: true },
```

```js
      { source: '/relations/google-shopping-ads-agency', destination: '/services/google-ads-ppc', permanent: true },
```
→
```js
      { source: '/relations/google-shopping-ads-agency', destination: '/ppc-management-services', permanent: true },
```

```js
      { source: '/guides/topic-cluster-architecture', destination: '/services/seo-web-copywriting', permanent: true },
```
→
```js
      { source: '/guides/topic-cluster-architecture', destination: '/content-marketing-services', permanent: true },
```

```js
      { source: '/services/on-page-seo', destination: '/services/seo-discoverability', permanent: true },
```
→
```js
      { source: '/services/on-page-seo', destination: '/seo-services', permanent: true },
```

```js
      { source: '/services/content-strategy', destination: '/services/seo-web-copywriting', permanent: true },
```
→
```js
      { source: '/services/content-strategy', destination: '/content-marketing-services', permanent: true },
```

```js
      { source: '/services/ai-video-ads', destination: '/services/google-ads-ppc', permanent: true },
```
→
```js
      { source: '/services/ai-video-ads', destination: '/ppc-management-services', permanent: true },
```

- [ ] **Step 3: Verify syntax and no duplicate `source` entries**

Run: `node --check next.config.mjs`
Expected: no output.

Run: `grep -c "source: '/services/seo-discoverability'" next.config.mjs`
Expected: `1` (only the new redirect's source — Task 3's page and Task 5's page-folder deletion don't touch this file, so no risk of collision, but this confirms no accidental duplicate entry).

- [ ] **Step 4: Commit**

```bash
git add next.config.mjs
git commit -m "feat: add redirects for 4 flat service pages, repoint 6 existing redirects"
```

(Full end-to-end redirect verification — including the "not yet 200" state since the new pages already exist as of Task 3 — happens in Task 9.)

---

### Task 5: Retire old pages, remove from `lib/services.js`, fix the `/services` hub

**Files:**
- Modify: `lib/services.js`
- Modify: `app/services/page.js`
- Modify: `app/sitemap.js`
- Delete: `app/services/seo-discoverability/` (entire folder)
- Delete: `app/services/geo-ai-content-writing/` (entire folder)
- Delete: `app/services/google-ads-ppc/` (entire folder)
- Delete: `app/services/seo-web-copywriting/` (entire folder)

**Interfaces:**
- Consumes: `SERVICES_FLAT` from Task 1, for the hub page's new link section.
- Produces: `SERVICES` in `lib/services.js` now contains only `authority-link-building`, `cro-ux`, `ai-llm-consulting`, `web-app-development`. `app/sitemap.js`'s `serviceRoutes` (derived from `Object.keys(SERVICES)`) now excludes the 4 retired slugs automatically once this task's `lib/services.js` edit lands.

- [ ] **Step 1: Delete the 4 old page folders**

```bash
rm -rf "app/services/seo-discoverability" "app/services/geo-ai-content-writing" "app/services/google-ads-ppc" "app/services/seo-web-copywriting"
```

- [ ] **Step 2: Remove the 4 entries from `lib/services.js`**

Delete the entire `'seo-discoverability': { ... },` object (lines ~2-108 in the current file, from the `'seo-discoverability': {` line through its closing `},`), the entire `'geo-ai-content-writing': { ... },` object, the entire `'google-ads-ppc': { ... },` object, and the entire `'seo-web-copywriting': { ... },` object. Leave `'authority-link-building'`, `'cro-ux'`, `'ai-llm-consulting'`, and `'web-app-development'` untouched, in their existing order, inside the `SERVICES` object.

After this edit, `lib/services.js` should export a `SERVICES` object with exactly 4 keys: `authority-link-building`, `cro-ux`, `ai-llm-consulting`, `web-app-development`.

- [ ] **Step 3: Verify `lib/services.js` syntax and key count**

Run: `node --check lib/services.js`
Expected: no output.

Run: `node -e "const s = require('./lib/services.js'); console.log(Object.keys(s.SERVICES || {}))" 2>&1 || node --experimental-vm-modules -e "import('./lib/services.js').then(m => console.log(Object.keys(m.SERVICES)))"`
Expected: an array containing exactly `authority-link-building`, `cro-ux`, `ai-llm-consulting`, `web-app-development` (order doesn't matter). If the `require` form fails because the file uses ESM `export`, use the second (`import()`) form.

- [ ] **Step 4: Fix `app/services/page.js` hub — remove the now-empty Creativity pillar, add a link section to the 4 new flat pages**

Read the current file first (`app/services/page.js`) to get its exact current content, since this plan's Step 5 below shows the target shape, not a literal diff (the file's exact current whitespace must be matched by hand). The hub currently does:

```jsx
const PILLARS = ['Performance', 'Creativity', 'Relations'];
```

Change to:

```jsx
const PILLARS = ['Performance', 'Relations'];
```

Add a new import at the top of the file:

```js
import { SERVICES_FLAT } from '../../lib/servicesFlat';
```

Add a new section immediately before the `{byPillar.map(...)}` block (i.e., right after the closing `</section>` of the hero and `<TopicMarquee ... />` line, before the pillar loop), rendering all 4 flat services as cards:

```jsx
      <section className="section" id="flat-services">
        <div className="container">
          <p className="eyebrow" data-reveal><span className="eyebrow__dot"></span>Core Services</p>
          <div className="insights__grid">
            {Object.values(SERVICES_FLAT).map((s) => (
              <a className="insights__card" href={`/${s.slug}`} key={s.slug} data-reveal>
                <span className="insights__card-cat">Consulting</span>
                <h2 className="insights__card-title">{s.title.split(' - ')[0]}</h2>
                <p className="insights__card-dek">{s.metaDescription}</p>
                <span className="link-arrow">Learn more<svg viewBox="0 0 16 16" width="14" height="14"><path d="M2 8h11M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg></span>
              </a>
            ))}
          </div>
        </div>
      </section>
```

- [ ] **Step 5: Add the 4 new URLs to `app/sitemap.js`**

In `app/sitemap.js`, add the 4 new paths to the `staticRoutes` array (the array of path strings near the top of the function):

```js
    '/seo-services',
    '/geo-services',
    '/ppc-management-services',
    '/content-marketing-services',
```

(Placement within the array doesn't matter functionally — add them anywhere in the existing list.)

- [ ] **Step 6: Verify**

Run: `npm run dev` (reuse an existing server if one is already running), then:

```bash
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:PORT/services/seo-discoverability
```
Expected: this now hits the Task 4 redirect and returns `200` after following the redirect to `/seo-services` — confirm with `curl -s -o /dev/null -w "%{http_code}\n" -L http://localhost:PORT/services/seo-discoverability` (the `-L` flag follows redirects; without it you should see `308`, the status Next.js uses for `permanent: true` redirects).

```bash
curl -s http://localhost:PORT/services | grep -c "Creativity"
```
Expected: `0` in the pillar-eyebrow context (a literal string search here is a rough proxy — if this greps a false positive from unrelated text, instead visually confirm no empty pillar section by reading the rendered HTML).

```bash
curl -s http://localhost:PORT/sitemap.xml | grep -oE '/seo-services|/geo-services|/ppc-management-services|/content-marketing-services|/services/seo-discoverability|/services/geo-ai-content-writing|/services/google-ads-ppc|/services/seo-web-copywriting'
```
Expected: only the 4 new paths appear; none of the 4 old paths appear.

- [ ] **Step 7: Commit**

```bash
git add lib/services.js app/services/page.js app/sitemap.js
git rm -r app/services/seo-discoverability app/services/geo-ai-content-writing app/services/google-ads-ppc app/services/seo-web-copywriting
git commit -m "feat: retire 4 old service pages, update services hub and sitemap"
```

---

### Task 6: Update `lib/nav.js` and `components/Footer.js`

**Files:**
- Modify: `lib/nav.js`
- Modify: `components/Footer.js`

**Interfaces:**
- Produces: the header dropdown and footer now link to the 4 new URLs with updated labels.

- [ ] **Step 1: Update `lib/nav.js`**

In the `Consulting` group's `Performance` items array, change:

```js
          { label: 'SEO & Discoverability', href: '/services/seo-discoverability', built: true },
```
to
```js
          { label: 'SEO Services', href: '/seo-services', built: true },
```

and change:
```js
          { label: 'Google Ads, PPC & AI Creative', href: '/services/google-ads-ppc', built: true },
```
to
```js
          { label: 'PPC Management Services', href: '/ppc-management-services', built: true },
```

In the `Creativity` group's items array, change:
```js
          { label: 'SEO Copywriting & Content Strategy', href: '/services/seo-web-copywriting', built: true },
          { label: 'GEO & AI Content Writing', href: '/services/geo-ai-content-writing', built: true },
```
to
```js
          { label: 'Content Marketing Services', href: '/content-marketing-services', built: true },
          { label: 'GEO Services', href: '/geo-services', built: true },
```

- [ ] **Step 2: Update `components/Footer.js`**

Change:
```jsx
            <a href="/services/seo-discoverability">SEO &amp; Discoverability</a>
```
to
```jsx
            <a href="/seo-services">SEO Services</a>
```

Change:
```jsx
            <a href="/services/geo-ai-content-writing">GEO &amp; AI Content</a>
```
to
```jsx
            <a href="/geo-services">GEO Services</a>
```

- [ ] **Step 3: Verify**

Run: `npm run dev` (reuse existing server), then:
```bash
curl -s http://localhost:PORT/ | grep -oE 'href="/seo-services"|href="/geo-services"|href="/ppc-management-services"|href="/content-marketing-services"' | sort -u
```
Expected: all 4 hrefs present (footer contributes 2, header nav contributes all 4 — the homepage renders both).

```bash
curl -s http://localhost:PORT/ | grep -c 'href="/services/seo-discoverability"\|href="/services/geo-ai-content-writing"\|href="/services/google-ads-ppc"\|href="/services/seo-web-copywriting"'
```
Expected: `0`

- [ ] **Step 4: Commit**

```bash
git add lib/nav.js components/Footer.js
git commit -m "feat: point nav and footer links at the new flat service URLs"
```

---

### Task 7: Sweep `lib/insights.js` (50 links)

**Files:**
- Modify: `lib/insights.js`

**Interfaces:**
- Produces: every occurrence of the 4 old URLs in this file replaced with its corresponding new URL, no other content changed.

- [ ] **Step 1: Run the substitution**

This is a pure 1:1 string substitution across the whole file — use `sed` rather than manual edits, since there are 50 occurrences and the mapping is unambiguous:

```bash
sed -i \
  -e 's#/services/seo-discoverability#/seo-services#g' \
  -e 's#/services/geo-ai-content-writing#/geo-services#g' \
  -e 's#/services/google-ads-ppc#/ppc-management-services#g' \
  -e 's#/services/seo-web-copywriting#/content-marketing-services#g' \
  lib/insights.js
```

- [ ] **Step 2: Verify — zero old references remain, syntax still valid, occurrence count matches**

```bash
grep -c '/services/seo-discoverability\|/services/geo-ai-content-writing\|/services/google-ads-ppc\|/services/seo-web-copywriting' lib/insights.js
```
Expected: `0`

```bash
node --check lib/insights.js
```
Expected: no output.

```bash
grep -c '/seo-services\|/geo-services\|/ppc-management-services\|/content-marketing-services' lib/insights.js
```
Expected: `50` (or close to it — a couple of the replaced substrings may coincidentally overlap if e.g. `/seo-services` also matches inside a longer already-existing different path; if the count isn't close to 50, inspect with `grep -n` before proceeding).

- [ ] **Step 3: Spot-check rendering on 3 different articles**

Run: `npm run dev` (reuse existing server), then for 3 different insight slugs that had links (e.g. `seo-vs-digital-marketing-agency`, `ai-citation-study`, `outbound-seo-prospecting` — verify with `grep -l` if these specific ones actually had links, otherwise pick 3 that did):
```bash
curl -s http://localhost:PORT/insights/seo-vs-digital-marketing-agency | grep -oE 'href="/seo-services"|href="/geo-services"|href="/ppc-management-services"|href="/content-marketing-services"'
```
Expected: at least one match per article checked, and the linked page (e.g. `/seo-services`) returns 200 when curled directly.

- [ ] **Step 4: Commit**

```bash
git add lib/insights.js
git commit -m "feat: update 50 internal links in lib/insights.js to new flat service URLs"
```

---

### Task 8: Sweep remaining files

**Files:**
- Modify: `lib/work.js`
- Modify: `lib/outcomes.js`
- Modify: `lib/industries.js`
- Modify: `app/about/approach/page.js`
- Modify: `app/ai-visibility/page.js`
- Modify: `public/llms.txt`

**Interfaces:**
- Produces: same 1:1 substitution as Task 7, applied to these 6 smaller files.

- [ ] **Step 1: Run the substitution across all 6 files in one command**

```bash
sed -i \
  -e 's#/services/seo-discoverability#/seo-services#g' \
  -e 's#/services/geo-ai-content-writing#/geo-services#g' \
  -e 's#/services/google-ads-ppc#/ppc-management-services#g' \
  -e 's#/services/seo-web-copywriting#/content-marketing-services#g' \
  lib/work.js lib/outcomes.js lib/industries.js app/about/approach/page.js app/ai-visibility/page.js public/llms.txt
```

- [ ] **Step 2: Verify — zero old references remain in these 6 files, JS files still parse**

```bash
grep -rc '/services/seo-discoverability\|/services/geo-ai-content-writing\|/services/google-ads-ppc\|/services/seo-web-copywriting' lib/work.js lib/outcomes.js lib/industries.js app/about/approach/page.js app/ai-visibility/page.js public/llms.txt
```
Expected: every file reports `0` (or the file doesn't appear in output if your grep flavor suppresses zero-count lines — use `grep -l` instead to double check no file still matches: `grep -rl '/services/seo-discoverability\|/services/geo-ai-content-writing\|/services/google-ads-ppc\|/services/seo-web-copywriting' lib/work.js lib/outcomes.js lib/industries.js app/about/approach/page.js app/ai-visibility/page.js public/llms.txt` should print nothing).

```bash
node --check lib/work.js && node --check lib/outcomes.js && node --check lib/industries.js
```
Expected: no output from any.

- [ ] **Step 3: Verify rendering**

Run: `npm run dev` (reuse existing server), then:
```bash
curl -s http://localhost:PORT/about/approach | grep -oE 'href="/geo-services"'
curl -s http://localhost:PORT/ai-visibility | grep -oE 'href="/geo-services"'
```
Expected: matches found (these were the pages confirmed to have `geo-ai-content-writing` links).

- [ ] **Step 4: Commit**

```bash
git add lib/work.js lib/outcomes.js lib/industries.js app/about/approach/page.js app/ai-visibility/page.js public/llms.txt
git commit -m "feat: update remaining internal links to new flat service URLs"
```

---

### Task 9: Final verification sweep

**Files:**
- None (verification only — no code changes expected; if this task finds a leftover reference, fix it in the file it's found in and note that in the report).

**Interfaces:**
- Consumes: everything from Tasks 1–8.
- Produces: confidence that the whole migration is complete and consistent.

- [ ] **Step 1: Sitewide grep for any remaining old-path references outside docs/**

```bash
grep -rl '/services/seo-discoverability\|/services/geo-ai-content-writing\|/services/google-ads-ppc\|/services/seo-web-copywriting' --include='*.js' --include='*.jsx' --include='*.txt' --include='*.mjs' . 2>/dev/null | grep -v node_modules | grep -v '.next'
```
Expected: no output (every live-code reference has been migrated). If any file appears, open it and fix the remaining reference(s), matching the same URL mapping used throughout this plan.

- [ ] **Step 2: Confirm all 4 old URLs redirect in exactly one hop, to the correct destination**

Run: `npm run dev` (reuse existing server), then for each of the 4 old URLs:
```bash
curl -s -D - -o /dev/null http://localhost:PORT/services/seo-discoverability | grep -i '^location:'
```
Expected: `location: /seo-services` (not a further redirect — if the `Location` header points at another `/services/...` path instead of the final flat URL, that's a redirect chain and must be fixed in `next.config.mjs`). Repeat for the other 3 old URLs, expecting `/geo-services`, `/ppc-management-services`, `/content-marketing-services` respectively.

- [ ] **Step 3: Confirm the 6 previously-indirect redirects now land in one hop**

```bash
curl -s -D - -o /dev/null http://localhost:PORT/services/on-page-seo | grep -i '^location:'
```
Expected: `location: /seo-services` directly (not `/services/seo-discoverability`). Repeat for `/performance/technical-seo-audit-agency` (expect `/seo-services`), `/relations/google-shopping-ads-agency` and `/services/ai-video-ads` (expect `/ppc-management-services`), `/guides/topic-cluster-architecture` and `/services/content-strategy` (expect `/content-marketing-services`).

- [ ] **Step 4: Confirm all 4 new pages are indexable and in the sitemap**

```bash
for p in seo-services geo-services ppc-management-services content-marketing-services; do
  echo "=== $p ==="
  curl -s http://localhost:PORT/$p | grep -oE 'rel="canonical" href="[^"]*"|noindex'
done
curl -s http://localhost:PORT/sitemap.xml | grep -oE '/seo-services|/geo-services|/ppc-management-services|/content-marketing-services'
```
Expected: each page shows a canonical href ending in its own path, no `noindex` anywhere, and all 4 paths appear in the sitemap output.

- [ ] **Step 5: If any fixes were needed in Step 1, commit them**

```bash
git add -A
git commit -m "fix: clean up remaining internal links found in final verification sweep"
```
(Skip this step entirely if Step 1 found nothing to fix.)

## Post-implementation checklist (from spec's Testing / verification section)

- [ ] All 4 new pages: 200, correct title/meta/canonical/H1, no noindex, testimonial + datapoint render
- [ ] All 4 old URLs: single-hop 301/308 to the correct new URL
- [ ] All 6 previously-indirect redirects: single-hop to the final new URL, no chain
- [ ] `/services` hub: no empty Creativity section, links to all 4 new pages
- [ ] `lib/nav.js` header dropdown: updated labels/hrefs render correctly
- [ ] Zero remaining references to the 4 old URLs anywhere in live code (docs/*.md excluded)
- [ ] `app/sitemap.js` output includes the 4 new URLs, excludes the 4 old ones
