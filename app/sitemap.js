import { INSIGHTS } from '../lib/insights';
import { SERVICES } from '../lib/services';
import { CASE_STUDIES } from '../lib/work';

const BASE_URL = 'https://www.gobiya.com';

export default function sitemap() {
  const staticRoutes = [
    '',
    '/about',
    '/about/approach',
    '/about/steve-martin',
    '/ai-visibility',
    '/contact',
    '/free-site-scan',
    '/insights',
    '/services',
    '/seo-services-los-angeles',
    '/geo-services-los-angeles',
    '/ppc-management-services-los-angeles',
    '/content-marketing-services-los-angeles',
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
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
  }));

  const serviceRoutes = Object.keys(SERVICES).map((slug) => ({
    url: `${BASE_URL}/${slug}`,
  }));

  const insightRoutes = INSIGHTS.map((insight) => ({
    url: `${BASE_URL}/insights/${insight.slug}`,
    lastModified: insight.date,
  }));

  const caseStudyRoutes = CASE_STUDIES.filter((c) => c.study).map((c) => ({
    url: `${BASE_URL}/work/${c.slug}`,
  }));

  return [...staticRoutes, ...serviceRoutes, ...insightRoutes, ...caseStudyRoutes];
}
