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
    '/seo-myths',
    '/work',
    '/privacy',
    '/terms',
    // Free tools + MCP server. These are indexable (200, index/follow) and
    // linked from the footer, but were never listed here — the array is
    // hand-maintained, so anything added outside it stays invisible to the
    // sitemap. /lp and the thank-you pages stay out on purpose: they're
    // noindex.
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
