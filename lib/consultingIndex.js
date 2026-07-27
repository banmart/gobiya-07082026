const CLEAN_TITLES = {
  'seo-services-los-angeles': 'Local & Technical SEO',
  'web-development-services-los-angeles': 'Web Design & Development',
  'ppc-management-services-los-angeles': 'PPC & Lead Generation',
  'content-marketing-services-los-angeles': 'Content Marketing Strategy',
  'geo-services-los-angeles': 'AI & GEO Search Optimization',
  'link-building-services-los-angeles': 'Digital PR & Link Building',
  'cro-ux-services-los-angeles': 'CRO & Web UX Optimization',
  'ai-consulting-services-los-angeles': 'AI Systems & LLM Consulting',
  'ai-visibility': 'AI Search & Visibility',
};

import { SERVICES_FLAT } from './servicesFlat';

export const CONSULTING_ITEMS = [
  ...Object.values(SERVICES_FLAT).map((s) => ({
    slug: s.slug,
    href: `/${s.slug}`,
    tag: 'Consulting',
    title: CLEAN_TITLES[s.slug] || s.eyebrow?.split('·')[0]?.trim() || s.slug,
    desc: s.metaDescription,
  })),
  {
    slug: 'ai-visibility',
    href: '/ai-visibility',
    tag: 'Consulting',
    title: 'AI Search & Visibility',
    desc: 'Los Angeles AI marketing tools and content optimization that get your brand cited in ChatGPT and Google AI Overviews.',
  },
];
