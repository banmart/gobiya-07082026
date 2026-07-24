import { INSIGHTS } from '../lib/insights';
import { SERVICES } from '../lib/services';
import { CASE_STUDIES } from '../lib/work';

const BASE_URL = 'https://www.gobiya.com';

export default function sitemap() {
  // No lastModified: stamping every URL with the build date is noise, not a
  // freshness signal. Insight articles carry their real publish date.
  const staticRoutes = [
    '',
    '/about',
    '/about/approach',
    '/about/steve-martin',
    '/ai-visibility',
    '/contact',
    '/onboarding',
    '/insights',
    '/services',
    '/seo-services',
    '/geo-services',
    '/ppc-management-services',
    '/content-marketing-services',
    '/pricing',
    '/work',
    '/privacy',
    '/terms',
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
  }));

  const serviceRoutes = Object.keys(SERVICES).map((slug) => ({
    url: `${BASE_URL}/services/${slug}`,
  }));

  const insightRoutes = INSIGHTS.map((insight) => ({
    url: `${BASE_URL}/insights/${insight.slug}`,
    lastModified: insight.date,
  }));

  // Only case studies with full study content have pages; cards-only entries stay out.
  const caseStudyRoutes = CASE_STUDIES.filter((c) => c.study).map((c) => ({
    url: `${BASE_URL}/work/${c.slug}`,
  }));

  return [...staticRoutes, ...serviceRoutes, ...insightRoutes, ...caseStudyRoutes];
}
