// One canonical, ordered list of every service page.
//
// The sidebar on each service page, the /services index, and the breadcrumb
// label all read from here, so adding a service means editing one array. The
// underlying copy still lives in servicesFlat.js and services.js — those two
// files grew separately and name the same things differently, which is what
// getService() below normalises away.

import { SERVICES_FLAT } from './servicesFlat';
import { SERVICES } from './services';
import { heroImage } from './heroImages';

// Short labels for navigation and breadcrumbs. The authored `h1` carries the
// city and is what the page headline uses; these are the compact versions that
// have to fit a 16.5rem sidebar column.
const NAV_TITLES = {
  'technical-seo': 'Local & Technical SEO',
  'geo': 'AI & GEO Search',
  'content-marketing': 'Content Strategy',
  'link-building': 'Digital PR & Link Building',
  'ppc': 'PPC & Lead Generation',
  'cro': 'CRO & Optimization',
  'web-ux': 'Web UX & Interface Design',
  'web-dev': 'Web Design & Development',
  'ai-consulting': 'AI Systems & Consulting',
};

// Ordered by the clusters the mega-nav already groups them into: search first,
// then content and authority, then conversion and paid, then the build work.
export const SERVICE_SLUGS = [
  'technical-seo',
  'geo',
  'content-marketing',
  'link-building',
  'ppc',
  'cro',
  'web-ux',
  'web-dev',
  'ai-consulting',
];

// Hero content, in the homepage pattern: a short excerpt (the full `intro` /
// `lede` is far too long for the card and stays in the page body) plus a
// primary and secondary call to action. Goal params match GOAL_LABELS in
// lib/leadForms.js — an unknown value would render blank in the lead email.
//
// `image` is a position on the site-wide hero rotation in lib/heroImages.js,
// not a file. The homepage holds 0 and these run 1–8 in SERVICE_SLUGS order, so
// no two services next to each other in the sidebar show the same room. Insert
// a service in the middle of the list and renumber from there rather than
// reusing a position twice.
const HERO = {
  'technical-seo': {
    image: heroImage(1),
    excerpt: 'Top Organic Search Rankings & Flawless Code Architecture',
    cta: { text: 'Get Your Free Technical SEO Check', href: '/free-site-scan?goal=rankings' },
    cta2: { text: 'See Client Results', href: '/work' },
  },
  'geo': {
    image: heroImage(2),
    excerpt: 'Get Cited #1 by ChatGPT, Perplexity & Google AI Overviews',
    cta: { text: 'Get Your Free Content Check', href: '/free-site-scan?goal=ai-visibility' },
    cta2: { text: 'Read the AI Citation Study', href: '/insights/ai-citation-study' },
  },
  'content-marketing': {
    image: heroImage(3),
    excerpt: 'Search-Ready Content That Ranks Top of Page & Sells Itself',
    cta: { text: 'Get Your Free Content Check', href: '/free-site-scan?goal=traffic' },
    cta2: { text: 'See Client Results', href: '/work' },
  },
  'link-building': {
    image: heroImage(4),
    excerpt: 'High-Authority Editorial Backlinks That Command Domain Respect',
    cta: { text: 'Get a Free Link Check', href: '/free-site-scan?goal=traffic' },
    cta2: { text: 'See Client Results', href: '/work' },
  },
  'ppc': {
    image: heroImage(5),
    excerpt: 'Profitable Google Ads Campaigns That Stop Ad Spend Leaks',
    cta: { text: 'Get Your Free Ads Check', href: '/free-site-scan?goal=sales' },
    cta2: { text: 'See Client Results', href: '/work' },
  },
  'cro': {
    image: heroImage(6),
    excerpt: 'Turn Existing Site Traffic Into Immediate Revenue & Sales',
    cta: { text: 'Get a Free Site Review', href: '/free-site-scan?goal=sales' },
    cta2: { text: 'See Our Pricing', href: '/pricing' },
  },
  'web-ux': {
    image: heroImage(9),
    excerpt: 'Intuitive Mobile-First UX Built for Seamless Conversions',
    cta: { text: 'Get Your Free UX Review', href: '/free-site-scan?goal=ux' },
    cta2: { text: 'See Client Results', href: '/work' },
  },
  'web-dev': {
    image: heroImage(7),
    excerpt: 'A Fast, Search-Ready Next.js Build Engineered for Growth',
    cta: { text: 'Talk About Your Project', href: '/contact' },
    cta2: { text: 'See Client Results', href: '/work' },
  },
  'ai-consulting': {
    image: heroImage(8),
    excerpt: 'Automated AI Systems That Save Hours & Boost Profit',
    cta: { text: 'Get Your Free AI Review', href: '/free-site-scan?goal=ai-visibility' },
    cta2: { text: 'See Our Pricing', href: '/pricing' },
  },
};

const EYEBROWS = {
  'technical-seo': 'Technical SEO Services & Search Engine Optimization Agency · Built for Ranking & AI Citations',
  'geo': 'Los Angeles GEO Services · AI Search Optimization',
  'content-marketing': 'Content Marketing Strategy & Execution · Built for Ranking & AI Citations',
  'link-building': 'Digital PR & Link Building Services · Authority & Mentions',
  'ppc': 'Los Angeles PPC Management Services · Cost Per Lead',
  'cro': 'Los Angeles Conversion Rate Optimization Services · UX & CRO',
  'web-ux': 'Los Angeles Web UX Services · Interface Design & Usability',
  'web-dev': 'Los Angeles Web Development Services · Search-Ready Build',
  'ai-consulting': 'Los Angeles AI Systems & Consulting Services · Search & Automation',
};

const RAW = { ...SERVICES_FLAT, ...SERVICES };

/* ═══════════ page metadata ═══════════
   Title and description are GENERATED, not hand-authored nine times. The slug
   supplies the keyword — /services/technical-seo is the technical SEO page —
   and OUTCOMES below supplies the one thing a slug cannot: what the buyer
   actually gets. Every string is keyword-first, outcome-second.

   Writing all of it by hand is what produced the state this replaced: five
   services on one pattern, four on another, four titles over 85 characters
   with no city in them, and one description at 167. Generated, they cannot
   drift, and a new service still gets correct metadata by existing — it just
   falls back to the generic outcome until someone writes it one.

   Homepage, for reference:
     Gobiya -  Digital marketing for every touchpoint.                    (48)
     Digital marketing that meets your buyers at every touchpoint —
     Google, AI answers, maps, and ads. Free Los Angeles site audit.
     Call now!                                                           (134) */

// Slug words that are initialisms or abbreviations rather than words. Anything
// not listed here is simply capitalised, so `content-marketing` needs no entry.
const KEYWORD_WORDS = {
  seo: 'SEO',
  geo: 'GEO',
  ppc: 'PPC',
  cro: 'CRO',
  ux: 'UX',
  ai: 'AI',
  dev: 'Development',
};

// technical-seo → 'Technical SEO', web-dev → 'Web Development', geo → 'GEO'.
export function keywordFromSlug(slug) {
  return slug
    .split('-')
    .map((w) => KEYWORD_WORDS[w] || w[0].toUpperCase() + w.slice(1))
    .join(' ');
}

// The outcome each service sells, in the buyer's terms rather than ours.
// `short` is the title clause and has a hard budget — see TITLE_MAX below.
// `long` is the description clause and runs to a sentence.
const OUTCOMES = {
  'technical-seo': {
    short: 'Rank Where Buyers Look',
    long: 'a clean technical foundation that puts you top of Google and keeps AI crawlers reading',
  },
  geo: {
    short: 'Be the Answer AI Gives',
    long: 'content structured so ChatGPT, Perplexity, and Google AI Overviews name your brand first',
  },
  'content-marketing': {
    short: 'Rank on Autopilot',
    long: 'topic clusters that rank on Google, get cited by AI, and sell for you around the clock',
  },
  'link-building': {
    short: "Authority You Can't Buy",
    long: "editorial backlinks from publications your competitors can't buy their way into",
  },
  ppc: {
    short: 'Ad Spend That Pays Back',
    long: 'Google Ads campaigns that stop the waste and turn clicks into booked clients',
  },
  cro: {
    short: 'Turn Traffic Into Revenue',
    long: 'conversion paths that turn traffic you already pay for into predictable revenue',
  },
  'web-ux': {
    short: 'Design Visitors Never Fight',
    long: 'an effortless, accessible interface that carries visitors from click to booking',
  },
  'web-dev': {
    short: 'Ranks From Day One',
    long: 'a fast Next.js build with SEO, speed, and AI visibility engineered in from day one',
  },
  'ai-consulting': {
    short: 'Busywork on Autopilot',
    long: 'practical AI workflows that hand your team back dozens of hours every week',
  },
};

const FALLBACK_OUTCOME = {
  short: 'Built to Get You Found',
  long: 'search work engineered to get your business found and chosen',
};

const outcome = (slug) => OUTCOMES[slug] || FALLBACK_OUTCOME;

// Google truncates around 60 characters, and the title already carries the
// brand so lib/meta.js appends no ' — Gobiya' suffix on top of it.
const TITLE_MAX = 60;

export function serviceMetaTitle(slug) {
  const lead = `${keywordFromSlug(slug)} Los Angeles`;
  const full = `${lead} | ${outcome(slug).short} | Gobiya`;
  // If an outcome clause ever pushes a title past the budget, the keyword and
  // the brand are what survive — the outcome is the part Google would cut.
  return full.length <= TITLE_MAX ? full : `${lead} | Gobiya`;
}

// Google truncates the snippet around 155 characters. The keyword and the city
// lead, the outcome carries the middle, and the call to action closes.
export function serviceMetaDescription(slug) {
  return `${keywordFromSlug(slug)} in Los Angeles: ${outcome(slug).long}. Free audit — call now!`;
}

export function getService(slug) {
  const s = RAW[slug];
  if (!s) return null;
  return {
    ...s,
    navTitle: NAV_TITLES[slug] || slug,
    eyebrow: s.eyebrow || EYEBROWS[slug] || 'OUR CAPABILITIES',
    // servicesFlat.js authors `h1`; services.js authors `heroLines` as a pair
    // of clauses meant to sit on two lines. The city is carried by the hero's
    // secondary heading and eyebrow, which the template renders for every
    // service, rather than by nine separately-written h1 strings.
    headline: s.h1 || (s.heroLines ? s.heroLines.join(' ') : NAV_TITLES[slug]),
    // `intro` is plain text, `lede` carries inline links. Both are authored
    // copy and both render as HTML — in the page body, below the hero.
    standfirst: s.intro || s.lede || '',
    // Generated, not authored. The hand-written values stay in servicesFlat.js
    // and services.js and still feed the /services index cards through
    // SERVICE_LINKS below, which wants a description, not a call to action.
    metaTitle: serviceMetaTitle(slug),
    metaDescription: serviceMetaDescription(slug),
    hero: HERO[slug],
  };
}

// Every service lives under /services/<slug>. The slug is also the key the
// copy is filed under in servicesFlat.js and services.js, so there is one
// identifier per service rather than a URL and a separate content id. Build
// service URLs with this helper, never by hand — the old flat slugs
// (/services and friends) are 301s in next.config.mjs now.
export const servicePath = (slug) => `/services/${slug}`;

// Sidebar and /services index both walk this.
export const SERVICE_LINKS = SERVICE_SLUGS.map((slug) => ({
  slug,
  href: servicePath(slug),
  title: NAV_TITLES[slug],
  desc: RAW[slug]?.metaDescription ?? '',
}));

/**
 * The hero eyebrow, guaranteed to name the city.
 *
 * The retired ServiceTemplate printed a literal "· Los Angeles" in every hero,
 * so the city could not be missing from one service page and present on
 * another. Only three of the nine services carry it in their authored
 * `eyebrow`, and the four defined in services.js fall back to `pillar`
 * ("Relations", "Performance") — which names no city and means little to a
 * visitor.
 *
 * Appending here restores that guarantee without rewriting authored copy.
 * Lives in lib/ rather than in the layouts because it is a data helper, and
 * because the layout module contains JSX the test runner will not parse.
 */
export function serviceEyebrow(service) {
  const authored = service.eyebrow || service.pillar || '';
  if (/Los Angeles/i.test(authored)) return authored;
  const label = service.navTitle || service.title;
  return authored ? `${authored} · ${label} · Los Angeles` : `${label} · Los Angeles`;
}
