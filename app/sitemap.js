import { INSIGHTS } from '../lib/insights';
import { SERVICE_LINKS } from '../lib/serviceIndex';
import { CASE_STUDIES } from '../lib/work';
import { AREAS } from '../lib/areas';

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
    '/services',
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
    '/areas-we-serve',
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
  }));

  // The nine city pages plus the hub were live but absent from the sitemap,
  // which is how the hub above and this block both came to be missing. Driven
  // off lib/areas.js so adding a city cannot leave the sitemap behind again.
  const areaRoutes = AREAS.map((area) => ({
    url: `${BASE_URL}/areas-we-serve/${area.slug}`,
  }));

  // Driven off SERVICE_LINKS, not lib/services.js: that file holds only four
  // of the eight services (the rest live in servicesFlat.js), so keying the
  // sitemap off it silently omitted half of them while four were hardcoded
  // into the static list above — one of them twice.
  const serviceRoutes = SERVICE_LINKS.map((s) => ({
    url: `${BASE_URL}${s.href}`,
  }));

  const insightRoutes = INSIGHTS.map((insight) => ({
    url: `${BASE_URL}/insights/${insight.slug}`,
    lastModified: insight.date,
  }));

  const caseStudyRoutes = CASE_STUDIES.filter((c) => c.study).map((c) => ({
    url: `${BASE_URL}/work/${c.slug}`,
  }));

  return [...staticRoutes, ...areaRoutes, ...serviceRoutes, ...insightRoutes, ...caseStudyRoutes];
}
