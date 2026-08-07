import { INSIGHTS } from '../lib/insights';
import { SERVICE_LINKS } from '../lib/serviceIndex';
import { CASE_STUDIES } from '../lib/work';
import { GLOSSARY } from '../lib/glossary';

const BASE_URL = 'https://www.gobiya.com';

export default function sitemap() {
  const staticRoutes = [
    '',
    '/about',
    '/about/approach',
    '/about/steve-martin',
    '/contact',
    '/free-site-scan',
    '/insights',
    '/glossary',
    '/seo-services',
    '/pricing',
    '/seo-myths',
    '/work',
    '/privacy',
    '/terms',
    '/tools',
    '/tools/dns-lookup',
    '/tools/domain-lookup',
    '/tools/domain-reputation',
    '/tools/email-verification',
    '/tools/ip-geolocation',
    '/tools/ssl-certificates',
    '/tools/threat-intelligence',
    '/tools/website-categorization',
    '/mcp',
    '/process',
    '/areas-we-serve',
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
  }));

  const serviceRoutes = SERVICE_LINKS.map((s) => ({
    url: `${BASE_URL}${s.href}`,
  }));

  const insightRoutes = INSIGHTS.map((insight) => ({
    url: `${BASE_URL}/insights/${insight.slug}`,
    lastModified: insight.date,
  }));

  const glossaryRoutes = GLOSSARY.map((term) => ({
    url: `${BASE_URL}/glossary/${term.slug}`,
  }));

  const caseStudyRoutes = CASE_STUDIES.filter((c) => c.study).map((c) => ({
    url: `${BASE_URL}/work/${c.slug}`,
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...insightRoutes,
    ...glossaryRoutes,
    ...caseStudyRoutes,
  ];
}
