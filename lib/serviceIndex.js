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
  'seo': 'Local & Technical SEO',
  'geo': 'AI & GEO Search',
  'content-marketing': 'Content Strategy',
  'link-building': 'Digital PR & Link Building',
  'ppc': 'PPC & Lead Generation',
  'cro': 'CRO & Web UX',
  'web-dev': 'Web Design & Development',
  'ai-consulting': 'AI Systems & Consulting',
};

// Ordered by the clusters the mega-nav already groups them into: search first,
// then content and authority, then conversion and paid, then the build work.
export const SERVICE_SLUGS = [
  'seo',
  'geo',
  'content-marketing',
  'link-building',
  'ppc',
  'cro',
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
  'seo': {
    image: heroImage(1),
    excerpt: 'If Google cannot read your site, nothing else you spend money on matters. We fix that first, then build rankings and AI visibility on a foundation that holds.',
    cta: { text: 'Get Your Free SEO Check', href: '/free-site-scan?goal=rankings' },
    cta2: { text: 'See Client Results', href: '/work' },
  },
  'geo': {
    image: heroImage(2),
    excerpt: 'ChatGPT does not rank your marketing copy. It quotes whichever page answers the question best — so we write yours to be the one it names.',
    cta: { text: 'Get Your Free Content Check', href: '/free-site-scan?goal=ai-visibility' },
    cta2: { text: 'Read the AI Citation Study', href: '/insights/ai-citation-study' },
  },
  'content-marketing': {
    image: heroImage(3),
    excerpt: 'Most content fails because it was written to fill a calendar. Yours gets built from real search demand, and written to turn the reader into a customer.',
    cta: { text: 'Get Your Free Content Check', href: '/free-site-scan?goal=traffic' },
    cta2: { text: 'See Client Results', href: '/work' },
  },
  'link-building': {
    image: heroImage(4),
    excerpt: 'Cheap links do not just fail to help — they make Google and AI tools trust you less. We earn mentions the slow way: real stories, real editors, real publications.',
    cta: { text: 'Get a Free Link Check', href: '/free-site-scan?goal=traffic' },
    cta2: { text: 'See Client Results', href: '/work' },
  },
  'ppc': {
    image: heroImage(5),
    excerpt: 'Clicks are easy to buy. Customers are not. We rebuild your Google Ads around what a booked job actually costs — one client cut theirs by about 40%.',
    cta: { text: 'Get Your Free Ads Check', href: '/free-site-scan?goal=sales' },
    cta2: { text: 'See Client Results', href: '/work' },
  },
  'cro': {
    image: heroImage(6),
    excerpt: 'More traffic will not help if visitors land, hesitate and leave. We find the exact place you are losing them, then prove the fix with real numbers.',
    cta: { text: 'Get a Free Site Review', href: '/free-site-scan?goal=sales' },
    cta2: { text: 'See Our Pricing', href: '/pricing' },
  },
  'web-dev': {
    image: heroImage(7),
    excerpt: 'Most sites lose their search traffic long before marketing gets involved, in decisions made during the build. We make those decisions the right way round.',
    cta: { text: 'Talk About Your Project', href: '/contact' },
    cta2: { text: 'See Client Results', href: '/work' },
  },
  'ai-consulting': {
    image: heroImage(8),
    excerpt: 'Every vendor is selling you an AI feature right now. We will tell you which ones are worth the money, and build the handful that are.',
    cta: { text: 'Get Your Free AI Review', href: '/free-site-scan?goal=ai-visibility' },
    cta2: { text: 'See Our Pricing', href: '/pricing' },
  },
};

const RAW = { ...SERVICES_FLAT, ...SERVICES };

export function getService(slug) {
  const s = RAW[slug];
  if (!s) return null;
  return {
    ...s,
    navTitle: NAV_TITLES[slug] || slug,
    // servicesFlat.js authors `h1`; services.js authors `heroLines` as a pair
    // of clauses meant to sit on two lines. Both name the city, which is the
    // part that matters for a city-intent page.
    headline: s.h1 || (s.heroLines ? s.heroLines.join(' ') : NAV_TITLES[slug]),
    // `intro` is plain text, `lede` carries inline links. Both are authored
    // copy and both render as HTML — in the page body, below the hero.
    standfirst: s.intro || s.lede || '',
    metaTitle: s.metaTitle || s.title,
    hero: HERO[slug],
  };
}

// Every service lives under /services/<slug>. The slug is also the key the
// copy is filed under in servicesFlat.js and services.js, so there is one
// identifier per service rather than a URL and a separate content id. Build
// service URLs with this helper, never by hand — the old flat slugs
// (/seo-services and friends) are 301s in next.config.mjs now.
export const servicePath = (slug) => `/services/${slug}`;

// Sidebar and /services index both walk this.
export const SERVICE_LINKS = SERVICE_SLUGS.map((slug) => ({
  slug,
  href: servicePath(slug),
  title: NAV_TITLES[slug],
  desc: RAW[slug]?.metaDescription ?? '',
}));
