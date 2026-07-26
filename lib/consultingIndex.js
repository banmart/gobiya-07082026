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
    desc: 'Los Angeles AI marketing tools and content optimization that get your brand cited in ChatGPT and Google AI Overviews.',
  },
  ...Object.values(SERVICES).map((s) => ({
    slug: s.slug,
    href: `/${s.slug}`,
    tag: s.pillar,
    title: s.title,
    desc: s.blurb,
  })),
];
