// The glossary taxonomy: which terms live on which hub page.
//
// Until 2026-09-01 every one of the 77 terms had its own URL carrying an
// average of 69 words of body copy. That is the shape the helpful-content
// system demotes, and no layout work fixes it. The terms themselves are well
// written — each shortDefinition is a self-contained, citable answer — so the
// fix is to gather them onto a handful of pages deep enough to rank and be
// cited, and to 301 every old term URL to its anchor on the new page.
//
// This file is the single source of truth for that mapping. The hub pages, the
// /glossary index, the sitemap, and the redirect map all derive from HUBS
// below, so a term can never point at a hub that does not exist and a new term
// cannot be added without landing somewhere.
//
// Hub sizes are deliberate. An earlier split had a 3-term hub and a 4-term hub,
// which would have recreated the thin-page problem on new URLs. Every hub here
// carries at least 7 terms.

export const HUBS = [
  {
    slug: 'ai-search-and-geo',
    title: 'AI Search & GEO',
    // The keyword leads the H1, the description, and the first 100 words, per
    // the four-position format the service pages use.
    h1: 'AI Search and GEO: The Complete Glossary',
    metaDescription:
      'AI search and GEO explained in plain language — 20 terms covering how ChatGPT, Perplexity, and Google AI Overviews find, quote, and cite a website.',
    intro:
      'AI search and GEO cover how AI assistants find a page, decide it is trustworthy, and quote it inside a written answer. That is a different job from ranking in a list of blue links, and it has its own vocabulary. The twenty terms below are the ones that come up most often when a business asks why ChatGPT names a competitor instead of them.',
    relatedHref: '/services/geo',
    relatedLabel: 'See our GEO & AI search services',
    // Rendered as a five-stage pipeline: the order below is the order a page
    // actually travels to become a citation.
    groups: [
      {
        label: 'What GEO is',
        note: 'The discipline itself, and the surface it competes for.',
        terms: ['generative-engine-optimization', 'answer-engine-optimization', 'ai-overview'],
      },
      {
        label: 'What winning looks like',
        note: 'The outcomes worth measuring once clicks stop telling the whole story.',
        terms: [
          'ai-citation',
          'citation-rate',
          'brand-mention',
          'share-of-voice',
          'zero-click-search',
          'conversational-search',
        ],
      },
      {
        label: 'How the machines work',
        note: 'The parts of an AI system that decide what it says about you.',
        terms: [
          'large-language-model',
          'retrieval-augmented-generation',
          'training-data',
          'ai-hallucination',
          'prompt',
        ],
      },
      {
        label: 'How they reach your site',
        note: 'Nothing below matters if these three go wrong.',
        terms: ['ai-crawler', 'llms-txt', 'passage-ranking'],
      },
      {
        label: 'How they understand meaning',
        note: 'Why being a recognised thing beats matching a keyword.',
        terms: ['semantic-search', 'search-entity', 'knowledge-graph'],
      },
    ],
    faqs: [
      {
        q: 'Is GEO different from SEO, or just a new name for it?',
        a: 'They share a foundation and diverge at the top. Both need a crawlable, fast, trustworthy site — a page that fails traditional SEO fails GEO too. What GEO adds is a layer aimed at extraction rather than ranking: direct answers in the opening sentence, original data, and clean structured markup that make a passage easy to lift and safe to attribute.',
      },
      {
        q: 'Do I need to do GEO separately for each AI platform?',
        a: 'Largely yes. In our analysis of 3,217 citations across ChatGPT, Gemini, Perplexity, Claude, and Copilot, only 2.7% of cited domains were cited by all five. Overlap between platforms is low enough that visibility on one should not be assumed to transfer to another.',
      },
      {
        q: 'What single change most improves the odds of being cited?',
        a: 'Publishing original data. In the same analysis, pages containing first-party statistics or original research were cited 4.5x more often than pages without — the strongest single signal we measured, and a far larger effect than domain authority, which showed only a 15% premium.',
      },
      {
        q: 'Does llms.txt actually do anything yet?',
        a: 'Adoption is not universal and it is not a requirement for being cited. It is cheap to add and does no harm, but it belongs well below crawlability, page speed, and answer-first writing on any realistic priority list.',
      },
    ],
    terms: [
      'generative-engine-optimization',
      'answer-engine-optimization',
      'ai-overview',
      'ai-citation',
      'citation-rate',
      'brand-mention',
      'share-of-voice',
      'zero-click-search',
      'conversational-search',
      'large-language-model',
      'retrieval-augmented-generation',
      'training-data',
      'ai-hallucination',
      'prompt',
      'ai-crawler',
      'llms-txt',
      'passage-ranking',
      'semantic-search',
      'search-entity',
      'knowledge-graph',
    ],
  },
  {
    slug: 'ppc-and-paid-media',
    title: 'PPC & Paid Media',
    h1: 'PPC and Paid Media: The Complete Glossary',
    metaDescription:
      'PPC and paid media explained in plain language — 16 terms covering Google Ads auctions, Quality Score, bidding, match types, and the metrics that decide profit.',
    intro:
      'PPC and paid media run on an auction most advertisers never see the inside of. What you pay per click, whether your ad shows at all, and how much of the available traffic you capture are all outputs of a handful of connected mechanics. The sixteen terms below are those mechanics, in the order they affect a campaign.',
    relatedHref: '/services/ppc',
    relatedLabel: 'See our PPC & lead generation services',
    // Rendered as a ledger: each group is a band of the account, read top to
    // bottom in the order money moves through it.
    groups: [
      {
        label: 'What you are buying',
        note: 'The unit of purchase and the platform that sells it.',
        terms: ['pay-per-click', 'google-ads', 'cost-per-click'],
      },
      {
        label: 'Winning the auction',
        note: 'Why two advertisers bidding the same amount get different results.',
        terms: ['ad-rank', 'quality-score', 'impression-share'],
      },
      {
        label: 'Controlling who sees you',
        note: 'The difference between spending a budget and wasting one.',
        terms: ['keyword-match-types', 'negative-keyword', 'smart-bidding'],
      },
      {
        label: 'Turning clicks into customers',
        note: 'Everything after the click, which is where most accounts leak.',
        terms: ['click-through-rate', 'ppc-landing-page', 'conversion-tracking'],
      },
      {
        label: 'Knowing whether it worked',
        note: 'The only two numbers that answer the question a business owner asks.',
        terms: ['cost-per-acquisition', 'return-on-ad-spend'],
      },
      {
        label: 'Reaching them again',
        note: 'Selling to people who already showed you they were interested.',
        terms: ['remarketing', 'google-display-network'],
      },
    ],
    faqs: [
      {
        q: 'Why is my cost per click higher than a competitor bidding less?',
        a: 'Because the auction ranks on Ad Rank, not bid. Ad Rank multiplies your bid by Quality Score, so an advertiser with more relevant ads and a better landing page can outrank you while paying less per click. Raising the bid treats the symptom; raising Quality Score treats the cause.',
      },
      {
        q: 'What is a good return on ad spend?',
        a: 'It depends entirely on your margin, which is why the number alone is meaningless. A 4:1 ROAS is excellent on a 70% margin product and loses money on a 20% margin one. Work out the ROAS at which you break even first, then judge performance against that rather than an industry benchmark.',
      },
      {
        q: 'Should I use broad match?',
        a: 'Only with an active negative keyword routine and enough budget to absorb the testing. Broad match finds queries you would never have thought to target, and it also spends on queries that will never convert. Without negatives it is the fastest way to burn a small budget.',
      },
      {
        q: 'Do I need conversion tracking before I launch?',
        a: 'Yes, and it is the one thing worth delaying a launch for. Smart Bidding optimises toward the conversions it can see; with tracking absent or broken it optimises toward clicks, and you pay for the education either way.',
      },
    ],
    terms: [
      'pay-per-click',
      'google-ads',
      'cost-per-click',
      'ad-rank',
      'quality-score',
      'impression-share',
      'keyword-match-types',
      'negative-keyword',
      'smart-bidding',
      'click-through-rate',
      'ppc-landing-page',
      'conversion-tracking',
      'cost-per-acquisition',
      'return-on-ad-spend',
      'remarketing',
      'google-display-network',
    ],
  },
  {
    slug: 'site-speed-ux-and-conversion',
    title: 'Site Speed, UX & Conversion',
    h1: 'Site Speed, UX and Conversion: The Complete Glossary',
    metaDescription:
      'Site speed, UX and conversion explained in plain language — 12 terms covering Core Web Vitals, LCP, CLS, INP, and how load time turns into lost revenue.',
    intro:
      'Site speed, UX and conversion are one chain, not three subjects. Google measures the first with Core Web Vitals, visitors experience it as the second, and the business feels it as the third. The twelve terms below run that chain from the metric a browser reports to the revenue a slow page costs.',
    relatedHref: '/services/cro',
    relatedLabel: 'See our CRO & optimization services',
    // Rendered as a load waterfall: groups run left to right in the order a
    // browser experiences them, ending in what the delay costs.
    groups: [
      {
        label: 'What Google measures',
        note: 'Three field metrics, reported from real visits rather than a lab.',
        terms: [
          'core-web-vitals',
          'largest-contentful-paint',
          'cumulative-layout-shift',
          'interaction-to-next-paint',
        ],
      },
      {
        label: 'What makes a page slow',
        note: 'Where the time actually goes before anyone sees anything.',
        terms: ['time-to-first-byte', 'page-speed', 'above-the-fold'],
      },
      {
        label: 'How you make it fast',
        note: 'The three levers that move the metrics above.',
        terms: ['server-side-rendering', 'content-delivery-network', 'responsive-design'],
      },
      {
        label: 'What speed is worth',
        note: 'Why any of this is a business problem and not a developer problem.',
        terms: ['user-experience', 'conversion-rate-optimization'],
      },
    ],
    faqs: [
      {
        q: 'Do Core Web Vitals actually affect rankings?',
        a: 'They are a real but small ranking factor, and they matter most as a tiebreaker between pages of comparable relevance. The larger effect is commercial rather than algorithmic: a page that loads slowly loses visitors before it gets the chance to rank badly.',
      },
      {
        q: 'My PageSpeed score is 95 but the site feels slow. Why?',
        a: 'Because that score is a lab simulation and Core Web Vitals are graded on field data — real visits, on real devices and connections. Search Console reports the field numbers. When the two disagree, the field data is the one Google uses.',
      },
      {
        q: 'Which metric should I fix first?',
        a: 'Largest Contentful Paint, in almost every case. It is the one visitors feel most directly, it is the most common failure of the three, and the work that fixes it — server response time, image weight, render-blocking resources — tends to improve the other two as a side effect.',
      },
      {
        q: 'Is a fast site enough to improve conversions?',
        a: 'It removes a reason to leave; it does not supply a reason to act. Speed is a floor rather than a strategy — worth fixing first because nothing else you do on the page gets a fair test until it is.',
      },
    ],
    terms: [
      'core-web-vitals',
      'largest-contentful-paint',
      'cumulative-layout-shift',
      'interaction-to-next-paint',
      'time-to-first-byte',
      'page-speed',
      'above-the-fold',
      'server-side-rendering',
      'content-delivery-network',
      'responsive-design',
      'user-experience',
      'conversion-rate-optimization',
    ],
  },
  {
    slug: 'technical-seo-and-indexing',
    title: 'Technical SEO & Indexing',
    h1: 'Technical SEO and Indexing: The Complete Glossary',
    metaDescription:
      'Technical SEO and indexing explained in plain language — 11 terms covering crawl budget, robots.txt, canonical URLs, sitemaps, and why a page never gets indexed.',
    intro:
      'Technical SEO and indexing decide whether a page is eligible to rank at all. A page that is never crawled is never indexed, and a page that is never indexed cannot rank for anything, however good the writing is. The eleven terms below are the checks that determine eligibility, roughly in the order a crawler encounters them.',
    relatedHref: '/services/technical-seo',
    relatedLabel: 'See our technical SEO services',
    // Rendered as a sequence of gates: each group is a checkpoint a page has to
    // clear before the next one is even relevant.
    groups: [
      {
        label: 'Gate one — can it be found',
        note: 'A page no crawler reaches cannot fail later checks. It never gets to them.',
        terms: ['crawl-budget', 'robots-txt', 'xml-sitemap'],
      },
      {
        label: 'Gate two — can it be indexed',
        note: 'Being crawled is not being stored. These decide whether it is kept.',
        terms: ['indexation', 'canonical-url', 'mobile-first-indexing'],
      },
      {
        label: 'Gate three — is it trustworthy',
        note: 'The basic hygiene checks that cost rankings quietly when they fail.',
        terms: ['broken-link', 'ssl-certificate'],
      },
      {
        label: 'The foundations underneath',
        note: 'Decisions made once that constrain everything after them.',
        terms: ['domain-name', 'content-management-system'],
      },
      {
        label: 'Checking your work',
        note: 'The one tool that reports what Google actually did, rather than what should have happened.',
        terms: ['google-search-console'],
      },
    ],
    faqs: [
      {
        q: 'My page is not indexed. Where do I start?',
        a: 'Use the URL Inspection tool in Search Console before changing anything — it reports the specific reason. The common causes are a noindex tag left in place, a canonical pointing elsewhere, a robots.txt rule blocking the path, or a page Google crawled and judged too thin to store. Each has a different fix and guessing wastes weeks.',
      },
      {
        q: 'Does crawl budget matter for a small site?',
        a: 'Rarely. Crawl budget becomes a real constraint in the tens of thousands of URLs, or where faceted navigation generates near-infinite combinations. A few hundred pages will be crawled comfortably, and time spent on crawl budget there is time not spent on something that matters.',
      },
      {
        q: 'Do I need an XML sitemap if my site is well linked internally?',
        a: 'It is not strictly required, but it is close to free and it gives Google a definitive list of the URLs you consider canonical. It matters most for new sites with few inbound links, and for large sites where internal linking alone leaves pages several clicks deep.',
      },
      {
        q: 'Is HTTPS still a ranking factor?',
        a: 'It is a lightweight one, and that undersells the point. Browsers now mark plain HTTP pages as insecure, so the cost of not having a certificate is paid in visitor trust long before it shows up in rankings.',
      },
    ],
    terms: [
      'crawl-budget',
      'indexation',
      'robots-txt',
      'xml-sitemap',
      'canonical-url',
      'mobile-first-indexing',
      'broken-link',
      'ssl-certificate',
      'domain-name',
      'content-management-system',
      'google-search-console',
    ],
  },
  {
    slug: 'on-page-and-content-seo',
    title: 'On-Page & Content SEO',
    h1: 'On-Page and Content SEO: The Complete Glossary',
    metaDescription:
      'On-page and content SEO explained in plain language — 11 terms covering title tags, meta descriptions, heading structure, schema markup, and keyword research.',
    intro:
      'On-page and content SEO are the parts of a page you write and control directly: what it is called, how it is structured, which question it answers, and how clearly it says so. The eleven terms below are what a search engine reads when it tries to work out what a page is for.',
    relatedHref: '/services/content-marketing',
    relatedLabel: 'See our content strategy services',
    // Rendered as a page anatomy: the groups map onto the parts of a document,
    // from the decision about what to write down to where it surfaces.
    groups: [
      {
        label: 'Deciding what to write',
        note: 'The work that happens before a word is written.',
        terms: ['search-engine-optimization', 'keyword-research', 'long-tail-keyword'],
      },
      {
        label: 'The parts of the page',
        note: 'What a search engine reads first, in the order it reads them.',
        terms: ['title-tag', 'meta-description', 'heading-hierarchy'],
      },
      {
        label: 'Helping machines read it',
        note: 'Structure that makes meaning explicit rather than implied.',
        terms: ['schema-markup', 'internal-linking'],
      },
      {
        label: 'Where it shows up',
        note: 'The surfaces the work above is competing for.',
        terms: ['featured-snippet', 'serp', 'organic-traffic'],
      },
    ],
    faqs: [
      {
        q: 'How long should a page be?',
        a: 'Long enough to answer the question completely and no longer. Length correlates with rankings mainly because thorough answers tend to be longer, not because word count is rewarded. Padding a 600-word answer to 2,000 words makes it worse on both counts.',
      },
      {
        q: 'Does Google use my meta description?',
        a: 'Often not — it rewrites the snippet when it thinks a different passage better matches the query, and that is common. Write one anyway: it is your best case for the click when it is used, and it costs a sentence.',
      },
      {
        q: 'How many H1s should a page have?',
        a: 'One, in practice. HTML5 technically permits more and Google tolerates them, but a single H1 forces you to decide what the page is actually about, and pages with a clear single subject are easier to rank than pages hedging across three.',
      },
      {
        q: 'Is keyword density still a thing?',
        a: 'No, and chasing a target percentage actively hurts. Modern ranking works on meaning rather than repetition. Cover the subject properly and the relevant terms appear without being counted.',
      },
    ],
    terms: [
      'search-engine-optimization',
      'keyword-research',
      'long-tail-keyword',
      'title-tag',
      'meta-description',
      'heading-hierarchy',
      'schema-markup',
      'internal-linking',
      'featured-snippet',
      'serp',
      'organic-traffic',
    ],
  },
  {
    slug: 'authority-links-and-local-seo',
    title: 'Authority, Links & Local SEO',
    h1: 'Authority, Links and Local SEO: The Complete Glossary',
    metaDescription:
      'Authority, links and local SEO explained in plain language — 7 terms covering backlinks, anchor text, E-E-A-T, Google Business Profile, and NAP consistency.',
    intro:
      'Authority, links and local SEO are how a search engine decides whether to trust a site rather than merely understand it. For a local business the two halves are connected: the same signals that establish credibility nationally are what qualify you for the map pack in your own city. The seven terms below cover both.',
    relatedHref: '/services/link-building',
    relatedLabel: 'See our digital PR & link building services',
    // Rendered as a two-column dossier: national credibility on one side, the
    // local version of the same argument on the other.
    groups: [
      {
        label: 'Earning trust at scale',
        note: 'How a search engine decides a site is worth believing.',
        terms: ['backlink', 'anchor-text', 'domain-authority', 'eeat'],
      },
      {
        label: 'Winning your own city',
        note: 'The same argument, made to a search engine that already knows where you are.',
        terms: ['local-seo', 'google-business-profile', 'nap-consistency'],
      },
    ],
    faqs: [
      {
        q: 'Is domain authority a Google metric?',
        a: 'No. It is a third-party score invented by SEO tool vendors to estimate strength, and Google has said repeatedly it uses nothing of the kind. It is useful for comparing two sites at a glance and misleading when treated as a target to raise.',
      },
      {
        q: 'How many backlinks do I need?',
        a: 'It is the wrong unit. One link from a publication your customers actually read outweighs a hundred from directories nobody visits. Relevance and genuine editorial intent decide the value; the count mostly measures effort.',
      },
      {
        q: 'What matters most for the local map pack?',
        a: 'A complete, actively maintained Google Business Profile in the correct primary category, consistent name, address, and phone details everywhere they appear, and a steady flow of recent reviews. Proximity to the searcher is weighted heavily and is the one input you cannot optimise.',
      },
      {
        q: 'How do I demonstrate E-E-A-T?',
        a: 'By making authorship and evidence visible. Name the person who wrote the page and say why they are qualified, publish first-hand specifics rather than a summary of what others have written, cite sources, and keep pages dated and current. Google is looking for signals a reader would also find reassuring.',
      },
    ],
    terms: [
      'backlink',
      'anchor-text',
      'domain-authority',
      'eeat',
      'local-seo',
      'google-business-profile',
      'nap-consistency',
    ],
  },
];

export const HUB_SLUGS = HUBS.map((h) => h.slug);

export function getHub(slug) {
  return HUBS.find((h) => h.slug === slug) || null;
}

/** The hub a given term slug belongs to, or null if it is unassigned. */
export function hubForTerm(termSlug) {
  return HUBS.find((h) => h.terms.includes(termSlug)) || null;
}

/** Where a retired term URL now points: the hub page, anchored at the term. */
export function termDestination(termSlug) {
  const hub = hubForTerm(termSlug);
  return hub ? `/glossary/${hub.slug}#${termSlug}` : null;
}

/**
 * The 301 map for the retired term URLs, enumerated one rule per term.
 *
 * Deliberately not a `/glossary/:slug*` wildcard. Next.js applies redirects
 * before routing, so a wildcard would shadow the hub pages themselves and take
 * the whole /glossary/[slug] route down with it.
 */
export function termRedirects(allTermSlugs) {
  return allTermSlugs
    .filter((slug) => !HUB_SLUGS.includes(slug))
    .map((slug) => ({
      source: `/glossary/${slug}`,
      destination: termDestination(slug),
      permanent: true,
    }))
    .filter((r) => r.destination);
}
