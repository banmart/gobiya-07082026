// Single canonical list of every Consulting offering (the 4 flat pages, AI
// Visibility, and the 4 remaining /services/[slug] pages), normalized to one
// shape. Every "services" card grid or related-links section on the site
// should render from this list, not from lib/services.js or
// lib/servicesFlat.js directly -- when the flat service pages moved out of
// lib/services.js, several card listings (homepage, ServiceTemplate's
// "Related consulting", SiteSchema) kept reading only lib/services.js and
// silently lost those 4 pages. A single shared list makes that class of bug
// structurally harder to reintroduce.

import { SERVICES } from './services';
import { SERVICES_FLAT } from './servicesFlat';

export const CONSULTING_ITEMS = [
  ...Object.values(SERVICES_FLAT).map((s) => ({
    slug: s.slug,
    href: `/${s.slug}`,
    tag: 'Consulting',
    title: s.title.split(' - ')[0],
    desc: s.metaDescription,
  })),
  {
    slug: 'ai-visibility',
    href: '/ai-visibility',
    tag: 'Consulting',
    title: 'AI Visibility',
    desc: 'AI marketing tools, content optimization, and authority engineering that get your brand cited in AI-generated search engine results — not just ranked in blue links.',
  },
  ...Object.values(SERVICES).map((s) => ({
    slug: s.slug,
    href: `/services/${s.slug}`,
    tag: s.pillar,
    title: s.title,
    desc: s.blurb,
  })),
];
