/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: import.meta.dirname,
  },
  async redirects() {
    return [
      // Old top-level city/local landing pages -> consolidated Local Service industry page
      { source: '/glendale-seo', destination: '/industries/local-service', permanent: true },
      { source: '/local-seo-glendale', destination: '/industries/local-service', permanent: true },
      { source: '/local-seo-company-burbank', destination: '/industries/local-service', permanent: true },
      { source: '/seo-company-encino', destination: '/industries/local-service', permanent: true },
      { source: '/ai-seo-beverly-hills', destination: '/industries/local-service', permanent: true },
      { source: '/ai-search-marketing-santa-clarita', destination: '/industries/local-service', permanent: true },
      { source: '/on-page-seo-los-angeles', destination: '/industries/local-service', permanent: true },
      { source: '/markets/southern-california', destination: '/industries/local-service', permanent: true },

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

      // Old insights posts -> closest new post or topically relevant page
      { source: '/insights/are-ai-search-engines-scraping-hidden-api-data-or-public-html-text-blocks', destination: '/insights/get-cited-by-chatgpt-perplexity-ai-overviews', permanent: true },
      { source: '/insights/how-can-a-startup-figure-out-whether-its-content-is-being-picked-up-by-llms', destination: '/insights/get-cited-by-chatgpt-perplexity-ai-overviews', permanent: true },
      { source: '/insights/what-data-sources-do-llms-crawl-to-verify-b2b-company-information', destination: '/insights/get-cited-by-chatgpt-perplexity-ai-overviews', permanent: true },
      { source: '/insights/introducing-open-knowledge-format-why-it-matters-for-ai-ready-businesses', destination: '/insights/seo-vs-geo', permanent: true },
      { source: '/insights/what-is-generative-engine-optimization-and-how-does-it-work', destination: '/insights/seo-vs-geo', permanent: true },
      { source: '/insights/what-is-the-difference-between-google-knowledge-graph-optimization-and-geo', destination: '/insights/seo-vs-geo', permanent: true },
      { source: '/insights/google-business-profile-optimization', destination: '/insights/google-business-profile-seo-checklist', permanent: true },
      { source: '/insights/seo-case-study-traffic-recovery', destination: '/outcomes/recovery', permanent: true },
      { source: '/insights/what-is-the-difference-between-a-manual-action-and-an-algorithmic-penalty', destination: '/outcomes/recovery', permanent: true },
      { source: '/insights/best-seo-agency-for-b2b-brands', destination: '/industries/enterprise-b2b', permanent: true },
      { source: '/insights/best-website-structure-multiple-locations-different-cities', destination: '/industries/local-service', permanent: true },
      { source: '/insights/local-seo-los-angeles', destination: '/industries/local-service', permanent: true },
      { source: '/insights/multi-location-websites-for-franchises', destination: '/industries/local-service', permanent: true },
    ];
  },
};

export default nextConfig;
