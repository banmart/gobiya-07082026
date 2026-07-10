/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: import.meta.dirname,
  },
  async redirects() {
    return [
      // Old city-specific pages (all 3 URL generations) -> dedicated city landing
      // page under /industries/local-service/<city>-seo
      { source: '/glendale-seo', destination: '/industries/local-service/glendale-seo', permanent: true },
      { source: '/local-seo-glendale', destination: '/industries/local-service/glendale-seo', permanent: true },
      { source: '/locations/glendale', destination: '/industries/local-service/glendale-seo', permanent: true },
      { source: '/locations/glendale-seo', destination: '/industries/local-service/glendale-seo', permanent: true },
      { source: '/seo-company-encino', destination: '/industries/local-service/encino-seo', permanent: true },
      { source: '/locations/encino', destination: '/industries/local-service/encino-seo', permanent: true },
      { source: '/locations/studio-city', destination: '/industries/local-service/studio-city-seo', permanent: true },
      { source: '/ai-seo-beverly-hills', destination: '/industries/local-service/beverly-hills-seo', permanent: true },
      { source: '/locations/beverly-hills', destination: '/industries/local-service/beverly-hills-seo', permanent: true },
      { source: '/locations/woodland-hills', destination: '/industries/local-service/woodland-hills-seo', permanent: true },
      { source: '/locations/northridge', destination: '/industries/local-service/northridge-seo', permanent: true },
      { source: '/locations/sherman-oaks', destination: '/industries/local-service/sherman-oaks-seo', permanent: true },
      { source: '/locations/santa-monica', destination: '/industries/local-service/santa-monica-seo', permanent: true },
      { source: '/locations/long-beach-seo', destination: '/industries/local-service/long-beach-seo', permanent: true },
      { source: '/locations/anaheim-seo', destination: '/industries/local-service/anaheim-seo', permanent: true },
      { source: '/local-seo-company-burbank', destination: '/industries/local-service/burbank-seo', permanent: true },
      { source: '/locations/burbank', destination: '/industries/local-service/burbank-seo', permanent: true },
      { source: '/locations/costa-mesa-seo', destination: '/industries/local-service/costa-mesa-seo', permanent: true },
      { source: '/locations/culver-city', destination: '/industries/local-service/culver-city-seo', permanent: true },
      { source: '/locations/north-hollywood', destination: '/industries/local-service/north-hollywood-seo', permanent: true },
      { source: '/locations/silverlake', destination: '/industries/local-service/silverlake-seo', permanent: true },
      { source: '/locations/van-nuys', destination: '/industries/local-service/van-nuys-seo', permanent: true },
      { source: '/locations/ventura', destination: '/industries/local-service/ventura-seo', permanent: true },
      { source: '/ai-search-marketing-santa-clarita', destination: '/industries/local-service/santa-clarita-seo', permanent: true },

      // Regional/multi-city pages with no single matching city -> Local Service hub
      { source: '/on-page-seo-los-angeles', destination: '/industries/local-service', permanent: true },
      { source: '/markets/southern-california', destination: '/industries/local-service', permanent: true },
      { source: '/markets', destination: '/industries/local-service', permanent: true },
      { source: '/services/google-business-profile-optimization', destination: '/industries/local-service', permanent: true },

      // Old brand/about duplicate -> single canonical About page
      { source: '/company/about', destination: '/about', permanent: true },

      // Old "capabilities" IA -> new "services" IA (same Performance/Creativity/Relations
      // groupings, flattened under /services/*)
      { source: '/capabilities/authority-building', destination: '/services/authority-link-building', permanent: true },
      { source: '/capabilities/conversion-architecture', destination: '/services/cro-ux', permanent: true },
      { source: '/capabilities/forensic-seo-penalty-recovery', destination: '/outcomes/recovery', permanent: true },
      { source: '/performance/technical-seo-audit-agency', destination: '/services/seo-discoverability', permanent: true },
      { source: '/relations/authority-building-agency', destination: '/services/authority-link-building', permanent: true },
      { source: '/relations/google-shopping-ads-agency', destination: '/services/google-ads-ppc', permanent: true },

      // Old "capabilities" and "creativity" hub pages have no direct new equivalent -> home
      // (/services now has its own built hub page, so no redirect needed there)
      { source: '/capabilities', destination: '/', permanent: true },
      { source: '/creativity', destination: '/', permanent: true },

      // Old misc pages, no direct new equivalent -> closest live page
      { source: '/tools', destination: '/ai-visibility', permanent: true },
      { source: '/mcp', destination: '/ai-visibility', permanent: true },
      { source: '/onboard', destination: '/contact', permanent: true },
      { source: '/resources', destination: '/insights', permanent: true },
      { source: '/reviews', destination: '/work', permanent: true },

      // Old guides/* -> topically matching new page
      { source: '/guides/google-penalty-recovery', destination: '/outcomes/recovery', permanent: true },
      { source: '/guides/helpful-content-update-recovery', destination: '/outcomes/recovery', permanent: true },
      { source: '/guides/topic-cluster-architecture', destination: '/services/content-strategy', permanent: true },

      // Old services/* pages with no direct new slug -> closest current service/outcome
      { source: '/services/on-page-seo', destination: '/services/seo-discoverability', permanent: true },
      { source: '/services/unnatural-links-penalty-recovery', destination: '/outcomes/recovery', permanent: true },

      // Old GEO-related pages -> new dedicated GEO pillar guide
      { source: '/capabilities/generative-engine-optimization', destination: '/insights/what-is-generative-engine-optimization', permanent: true },
      { source: '/geo-aio', destination: '/insights/what-is-generative-engine-optimization', permanent: true },
      { source: '/insights/what-is-generative-engine-optimization-and-how-does-it-work', destination: '/insights/what-is-generative-engine-optimization', permanent: true },
      { source: '/insights/what-is-the-difference-between-google-knowledge-graph-optimization-and-geo', destination: '/insights/what-is-generative-engine-optimization', permanent: true },

      // Old insights posts -> closest new post or topically relevant page
      { source: '/insights/are-ai-search-engines-scraping-hidden-api-data-or-public-html-text-blocks', destination: '/insights/get-cited-by-chatgpt-perplexity-ai-overviews', permanent: true },
      { source: '/insights/how-can-a-startup-figure-out-whether-its-content-is-being-picked-up-by-llms', destination: '/insights/get-cited-by-chatgpt-perplexity-ai-overviews', permanent: true },
      { source: '/insights/what-data-sources-do-llms-crawl-to-verify-b2b-company-information', destination: '/insights/get-cited-by-chatgpt-perplexity-ai-overviews', permanent: true },
      { source: '/insights/introducing-open-knowledge-format-why-it-matters-for-ai-ready-businesses', destination: '/insights/what-is-generative-engine-optimization', permanent: true },
      { source: '/insights/google-business-profile-optimization', destination: '/insights/google-business-profile-seo-checklist', permanent: true },
      { source: '/insights/seo-case-study-traffic-recovery', destination: '/outcomes/recovery', permanent: true },
      { source: '/insights/what-is-the-difference-between-a-manual-action-and-an-algorithmic-penalty', destination: '/outcomes/recovery', permanent: true },
      { source: '/insights/best-seo-agency-for-b2b-brands', destination: '/industries/enterprise-b2b', permanent: true },
      { source: '/insights/best-website-structure-multiple-locations-different-cities', destination: '/industries/local-service', permanent: true },
      { source: '/insights/local-seo-los-angeles', destination: '/industries/local-service', permanent: true },
      { source: '/insights/multi-location-websites-for-franchises', destination: '/industries/local-service', permanent: true },
      { source: '/insights/ai-paid-media/social-media-ai-transforming-content-creation', destination: '/services/ai-video-ads', permanent: true },
      { source: '/insights/ai-powered-seo/algorithmic-update-recovery-entity-seo', destination: '/outcomes/recovery', permanent: true },
      { source: '/insights/ai-powered-seo/map-pack-vs-ai-overview-la-remodeling', destination: '/industries/local-service', permanent: true },
      { source: '/insights/automated-lead-generation-seo', destination: '/outcomes/sales', permanent: true },
      { source: '/insights/how-do-b2b-companies-use-seo-to-generate-predictable-revenue', destination: '/industries/enterprise-b2b', permanent: true },
      { source: '/insights/outbound-seo-prospecting', destination: '/outcomes/sales', permanent: true },
    ];
  },
};

export default nextConfig;
