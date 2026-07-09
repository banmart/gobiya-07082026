import { INSIGHTS } from '../lib/insights';
import { SERVICES } from '../lib/services';
import { OUTCOMES } from '../lib/outcomes';
import { INDUSTRIES } from '../lib/industries';
import { LOCATIONS_LIST } from '../lib/locations';

const BASE_URL = 'https://www.gobiya.com';

export default function sitemap() {
  const staticRoutes = [
    '',
    '/about',
    '/about/approach',
    '/about/steve-martin',
    '/ai-visibility',
    '/contact',
    '/insights',
    '/services',
    '/outcomes',
    '/industries',
    '/work',
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
  }));

  const serviceRoutes = Object.keys(SERVICES).map((slug) => ({
    url: `${BASE_URL}/services/${slug}`,
    lastModified: new Date(),
  }));

  const outcomeRoutes = Object.keys(OUTCOMES).map((slug) => ({
    url: `${BASE_URL}/outcomes/${slug}`,
    lastModified: new Date(),
  }));

  const industryRoutes = Object.keys(INDUSTRIES).map((slug) => ({
    url: `${BASE_URL}/industries/${slug}`,
    lastModified: new Date(),
  }));

  const insightRoutes = INSIGHTS.map((insight) => ({
    url: `${BASE_URL}/insights/${insight.slug}`,
    lastModified: new Date(),
  }));

  const locationRoutes = LOCATIONS_LIST.map((l) => ({
    url: `${BASE_URL}/industries/local-service/${l.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...serviceRoutes, ...outcomeRoutes, ...industryRoutes, ...insightRoutes, ...locationRoutes];
}
