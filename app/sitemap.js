import { INSIGHTS } from '../lib/insights';
import { SERVICES } from '../lib/services';
import { OUTCOMES } from '../lib/outcomes';
import { INDUSTRIES } from '../lib/industries';
import { LOCATIONS_LIST } from '../lib/locations';

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
    '/outcomes',
    '/industries',
    '/work',
    '/privacy',
    '/terms',
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
  }));

  const serviceRoutes = Object.keys(SERVICES).map((slug) => ({
    url: `${BASE_URL}/services/${slug}`,
  }));

  const outcomeRoutes = Object.keys(OUTCOMES).map((slug) => ({
    url: `${BASE_URL}/outcomes/${slug}`,
  }));

  const industryRoutes = Object.keys(INDUSTRIES).map((slug) => ({
    url: `${BASE_URL}/industries/${slug}`,
  }));

  const insightRoutes = INSIGHTS.map((insight) => ({
    url: `${BASE_URL}/insights/${insight.slug}`,
    lastModified: insight.date,
  }));

  const locationRoutes = LOCATIONS_LIST.map((l) => ({
    url: `${BASE_URL}/industries/local-service/${l.slug}`,
  }));

  return [...staticRoutes, ...serviceRoutes, ...outcomeRoutes, ...industryRoutes, ...insightRoutes, ...locationRoutes];
}
