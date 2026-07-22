/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    return [
      // Flat, keyword-first service pages (2026-07) replacing the 4 old /services/[slug] pages
      { source: '/services/seo-discoverability', destination: '/seo-services', permanent: true },
      { source: '/services/geo-ai-content-writing', destination: '/geo-services', permanent: true },
      { source: '/services/google-ads-ppc', destination: '/ppc-management-services', permanent: true },
      { source: '/services/seo-web-copywriting', destination: '/content-marketing-services', permanent: true },

      // Outcomes and Industries hubs removed entirely (2026-07) -- no direct
      // single-page equivalent, consolidates onto homepage.
      { source: '/outcomes', destination: '/', permanent: true },
      { source: '/outcomes/traffic', destination: '/', permanent: true },
      { source: '/outcomes/rankings', destination: '/', permanent: true },
      { source: '/outcomes/sales', destination: '/', permanent: true },
      { source: '/outcomes/recovery', destination: '/', permanent: true },
      { source: '/industries', destination: '/', permanent: true },
      { source: '/industries/enterprise-b2b', destination: '/', permanent: true },
      { source: '/industries/local-service', destination: '/', permanent: true },
      { source: '/industries/healthcare', destination: '/', permanent: true },
      { source: '/industries/professional-services', destination: '/', permanent: true },

      // City-specific location pages (2026-07): the /industries/local-service/<city>-seo
      // pages were removed as a set (low traffic relative to maintenance cost of 18
      // near-duplicate city pages). Every old alias and every former city-page URL now
      // consolidates onto the single Local Service industry hub, which still covers the
      // same local-SEO service and area-served claims without the thin per-city split.
      { source: '/glendale-seo', destination: '/', permanent: true },
      { source: '/local-seo-glendale', destination: '/', permanent: true },
      { source: '/locations/glendale', destination: '/', permanent: true },
      { source: '/locations/glendale-seo', destination: '/', permanent: true },
      { source: '/industries/local-service/glendale-seo', destination: '/', permanent: true },
      { source: '/seo-company-encino', destination: '/', permanent: true },
      { source: '/locations/encino', destination: '/', permanent: true },
      { source: '/industries/local-service/encino-seo', destination: '/', permanent: true },
      { source: '/locations/studio-city', destination: '/', permanent: true },
      { source: '/industries/local-service/studio-city-seo', destination: '/', permanent: true },
      { source: '/ai-seo-beverly-hills', destination: '/', permanent: true },
      { source: '/locations/beverly-hills', destination: '/', permanent: true },
      { source: '/industries/local-service/beverly-hills-seo', destination: '/', permanent: true },
      { source: '/locations/woodland-hills', destination: '/', permanent: true },
      { source: '/industries/local-service/woodland-hills-seo', destination: '/', permanent: true },
      { source: '/locations/northridge', destination: '/', permanent: true },
      { source: '/industries/local-service/northridge-seo', destination: '/', permanent: true },
      { source: '/locations/sherman-oaks', destination: '/', permanent: true },
      { source: '/industries/local-service/sherman-oaks-seo', destination: '/', permanent: true },
      { source: '/locations/santa-monica', destination: '/', permanent: true },
      { source: '/industries/local-service/santa-monica-seo', destination: '/', permanent: true },
      { source: '/locations/long-beach-seo', destination: '/', permanent: true },
      { source: '/industries/local-service/long-beach-seo', destination: '/', permanent: true },
      { source: '/locations/anaheim-seo', destination: '/', permanent: true },
      { source: '/industries/local-service/anaheim-seo', destination: '/', permanent: true },
      { source: '/local-seo-company-burbank', destination: '/', permanent: true },
      { source: '/locations/burbank', destination: '/', permanent: true },
      { source: '/industries/local-service/burbank-seo', destination: '/', permanent: true },
      { source: '/locations/costa-mesa-seo', destination: '/', permanent: true },
      { source: '/industries/local-service/costa-mesa-seo', destination: '/', permanent: true },
      { source: '/locations/culver-city', destination: '/', permanent: true },
      { source: '/industries/local-service/culver-city-seo', destination: '/', permanent: true },
      { source: '/locations/north-hollywood', destination: '/', permanent: true },
      { source: '/industries/local-service/north-hollywood-seo', destination: '/', permanent: true },
      { source: '/locations/silverlake', destination: '/', permanent: true },
      { source: '/industries/local-service/silverlake-seo', destination: '/', permanent: true },
      { source: '/locations/van-nuys', destination: '/', permanent: true },
      { source: '/industries/local-service/van-nuys-seo', destination: '/', permanent: true },
      { source: '/locations/ventura', destination: '/', permanent: true },
      { source: '/industries/local-service/ventura-seo', destination: '/', permanent: true },
      { source: '/ai-search-marketing-santa-clarita', destination: '/', permanent: true },
      { source: '/industries/local-service/santa-clarita-seo', destination: '/', permanent: true },

      // Regional/multi-city pages with no single matching city -> Local Service hub
      { source: '/on-page-seo-los-angeles', destination: '/', permanent: true },
      { source: '/los-angeles-seo-services', destination: '/', permanent: true },
      { source: '/markets/southern-california', destination: '/', permanent: true },
      { source: '/markets', destination: '/', permanent: true },
      { source: '/services/google-business-profile-optimization', destination: '/', permanent: true },

      // Old brand/about duplicate -> single canonical About page
      { source: '/company/about', destination: '/about', permanent: true },

      // Old /case-studies/* portfolio IA -> /work/* case studies. Found via GSC:
      // /case-studies/smile-center-dentistry, /american-livescan, and /tidder are
      // still ranking (positions 5-14, real impressions in the last 90 days) with
      // no redirect in place, so that visibility was stranding on a dead path
      // instead of reaching the live page. Entries without a dedicated /work/[slug]
      // page (no `study` object in lib/work.js) fall back to the /work hub.
      { source: '/case-studies/smile-center-dentistry', destination: '/work/smile-center-dentistry', permanent: true },
      { source: '/case-studies/american-livescan', destination: '/work/american-livescan', permanent: true },
      { source: '/case-studies/safetycentric', destination: '/work/safetycentric', permanent: true },
      { source: '/case-studies/quickpass-aid', destination: '/work/quickpass-aid', permanent: true },
      { source: '/case-studies/remodel-me-pros', destination: '/work/remodel-me-pros', permanent: true },
      { source: '/case-studies/the-healing-metta', destination: '/work/the-healing-metta', permanent: true },
      { source: '/case-studies/total-capital', destination: '/work/total-capital', permanent: true },
      { source: '/case-studies/dg-plumbing', destination: '/work/dg-plumbing', permanent: true },
      { source: '/case-studies/mtw', destination: '/work/mtw', permanent: true },
      { source: '/case-studies/tidder', destination: '/work', permanent: true },
      { source: '/case-studies/sonrisa-dental', destination: '/work', permanent: true },
      { source: '/case-studies/trusted-home-contractors', destination: '/work', permanent: true },

      // Old "capabilities" IA -> new "services" IA (same Performance/Creativity/Relations
      // groupings, flattened under /services/*)
      { source: '/capabilities/authority-building', destination: '/services/authority-link-building', permanent: true },
      { source: '/capabilities/conversion-architecture', destination: '/services/cro-ux', permanent: true },
      { source: '/capabilities/forensic-seo-penalty-recovery', destination: '/', permanent: true },
      { source: '/performance/technical-seo-audit-agency', destination: '/seo-services', permanent: true },
      { source: '/relations/authority-building-agency', destination: '/services/authority-link-building', permanent: true },
      { source: '/relations/google-shopping-ads-agency', destination: '/ppc-management-services', permanent: true },

      // Old "capabilities" and "creativity" hub pages have no direct new equivalent -> home
      // (/services now has its own built hub page, so no redirect needed there)
      { source: '/capabilities', destination: '/', permanent: true },
      { source: '/creativity', destination: '/', permanent: true },

      // Old misc pages, no direct new equivalent -> closest live page
      { source: '/onboard', destination: '/contact', permanent: true },
      { source: '/resources', destination: '/insights', permanent: true },
      { source: '/contact-us', destination: '/contact', permanent: true },
      { source: '/solutions', destination: '/services', permanent: true },
      { source: '/reviews', destination: '/work', permanent: true },

      // Old guides/* -> topically matching new page
      { source: '/google-penalty-service', destination: '/', permanent: true },
      { source: '/guides/google-penalty-recovery', destination: '/', permanent: true },
      { source: '/guides/helpful-content-update-recovery', destination: '/', permanent: true },
      { source: '/guides/topic-cluster-architecture', destination: '/content-marketing-services', permanent: true },

      // Old services/* pages with no direct new slug -> closest current service/outcome
      { source: '/services/on-page-seo', destination: '/seo-services', permanent: true },
      { source: '/services/unnatural-links-penalty-recovery', destination: '/', permanent: true },

      // Services consolidation (2026-07): three overlapping pages merged into
      // the survivor that owns the stronger commercial query.
      { source: '/services/content-strategy', destination: '/content-marketing-services', permanent: true },
      { source: '/services/digital-pr', destination: '/services/authority-link-building', permanent: true },
      { source: '/services/ai-video-ads', destination: '/ppc-management-services', permanent: true },

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

      // Old nested-path insights posts -> flattened slug for the same rebuilt article
      // (single-segment /insights/[slug] routing can't preserve the old nested path)
      { source: '/insights/ai-paid-media/social-media-ai-transforming-content-creation', destination: '/insights/ai-transforming-social-media-content-creation', permanent: true },
      { source: '/insights/ai-powered-seo/algorithmic-update-recovery-entity-seo', destination: '/insights/algorithmic-update-recovery-entity-seo', permanent: true },
      { source: '/insights/ai-powered-seo/map-pack-vs-ai-overview-la-remodeling', destination: '/insights/map-pack-vs-ai-overview-la-remodeling', permanent: true },

      // Note: seo-case-study-traffic-recovery, what-is-the-difference-between-a-manual-action-
      // and-an-algorithmic-penalty, best-seo-agency-for-b2b-brands, best-website-structure-
      // multiple-locations-different-cities, local-seo-los-angeles, multi-location-websites-
      // for-franchises, automated-lead-generation-seo, how-do-b2b-companies-use-seo-to-generate-
      // predictable-revenue, and outbound-seo-prospecting were previously redirected away from
      // their original /insights/<slug> URL. They're now rebuilt as real articles at that exact
      // same slug in lib/insights.js, so the redirect entries are gone — the URL just serves the
      // real page again.
    ];
  },
};

export default nextConfig;
