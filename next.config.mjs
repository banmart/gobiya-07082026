/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: import.meta.dirname,
  },
  async redirects() {

    return [
      // ── /stuff retired (2026-09-01) ──
      // A force-dynamic video gallery that read public/ off the filesystem per
      // request. It was never in the sitemap and nothing linked to it, but it
      // was still indexable: no <h1>, a meta description promising "AI Video
      // Marketing", and a body that rendered a .webm file listing with byte
      // sizes — and on Vercel the filesystem read does not resolve, so what
      // actually served was the empty state. /work is the real portfolio page.
      { source: '/stuff', destination: '/work', permanent: true },

      // ── Services hub canonical path is /services ──
      { source: '/seo-services', destination: '/services', permanent: true },
      { source: '/services/seo', destination: '/services/technical-seo', permanent: true },

      // ── Service pages moved under /services/* (2026-07-31) ──
      // The eight flat slugs below were the live, indexed service URLs, so
      // each gets its own 301 to the page that replaced it. Every other
      // redirect in this file that used to point at one of them has had its
      // destination rewritten to the new URL as well — a legacy URL should
      // reach the live page in one hop, not land on another redirect.
      { source: '/geo-services-los-angeles', destination: '/services/geo', permanent: true },
      { source: '/content-marketing-strategies', destination: '/services/content-marketing', permanent: true },
      { source: '/link-building-services', destination: '/services/link-building', permanent: true },
      { source: '/ppc-management-services', destination: '/services/ppc', permanent: true },
      { source: '/conversion-rate-optimization-cro', destination: '/services/cro', permanent: true },
      { source: '/web-development-services-los-angeles', destination: '/services/web-dev', permanent: true },
      { source: '/ai-consulting-services-los-angeles', destination: '/services/ai-consulting', permanent: true },

      // ── Areas We Serve retired entirely (2026-08-30) ──
      // /areas-we-serve was a bare city list with no page-level topic of its
      // own. /los-angeles-seo now owns the same coverage claim on a page that
      // actually targets a keyword, so the index, the [city] sub-pages, and
      // every legacy city slug elsewhere in this file all 301 straight there —
      // one hop, no chains. The silver-lake → silverlake hop is absorbed into
      // the wildcard, since both now land on the same destination.
      // Studio City and Glendale are listed ahead of the wildcard because
      // Next.js takes the first matching rule, and these two now have pages of
      // their own. They were the only city URLs in the retired set still
      // earning anything — between them 196 impressions and both of the site's
      // attributable clicks in the 28 days to 2026-08-27 — so sending them to
      // a generic Los Angeles page discarded the city relevance that earned
      // those positions. The other eight cities have no measured demand and
      // still fold into /los-angeles-seo via the wildcard.
      { source: '/areas-we-serve/studio-city', destination: '/studio-city-seo', permanent: true },
      { source: '/areas-we-serve/glendale', destination: '/glendale-seo', permanent: true },
      { source: '/areas-we-serve', destination: '/los-angeles-seo', permanent: true },
      { source: '/areas-we-serve/:city', destination: '/los-angeles-seo', permanent: true },

      // ── Legacy URLs still in Google's index that were returning 404 ──
      // Found 2026-07-25 by checking what actually surfaces for gobiya.com in
      // Google: the index is still largely the pre-migration site, and several
      // of those URLs had no redirect at all. A 404 on an indexed URL throws
      // away whatever signal it had accumulated, so each one goes to its
      // closest live equivalent.
      //
      // /california/:city/:service was a programmatic city-x-service set. Both
      // known survivors (compton/seo, compton/webdesign) were 404ing, and the
      // pattern implies more cities than we can enumerate, so these are
      // matched by shape rather than listed one by one.
      // Onboarding -> Free Site Scan 301 Redirects
      { source: '/onboarding', destination: '/free-site-scan', permanent: true },
      { source: '/onboarding/:path*', destination: '/free-site-scan/:path*', permanent: true },

      { source: '/california/:city/seo', destination: '/services/technical-seo', permanent: true },
      { source: '/california/:city/webdesign', destination: '/services/web-dev', permanent: true },
      { source: '/california/:path*', destination: '/services', permanent: true },

      // Old services slug -> the page that replaced it
      { source: '/services/web-design-development', destination: '/services/web-dev', permanent: true },

      // /resources itself already redirected, but nested article URLs under it
      // did not — e.g. the algorithm-update recovery guide, which is indexed.
      { source: '/resources/:path*', destination: '/insights', permanent: true },

      // Stray app route from the previous build.
      { source: '/user', destination: '/', permanent: true },

      // 301 redirects for previous service URLs to new Los Angeles targeted URLs
      { source: '/seo-services-los-angeles', destination: '/services/technical-seo', permanent: true },
      { source: '/ai-visibility', destination: '/services/geo', permanent: true },
      { source: '/geo-services', destination: '/services/geo', permanent: true },
      { source: '/ppc-management-services-los-angeles', destination: '/services/ppc', permanent: true },
      { source: '/content-marketing-services', destination: '/services/content-marketing', permanent: true },
      { source: '/content-marketing-services-los-angeles', destination: '/services/content-marketing', permanent: true },
      { source: '/services/web-app-development', destination: '/services/web-dev', permanent: true },
      { source: '/services/authority-link-building', destination: '/services/link-building', permanent: true },
      { source: '/link-building-services-los-angeles', destination: '/services/link-building', permanent: true },
      { source: '/services/cro-ux', destination: '/services/cro', permanent: true },
      { source: '/cro-ux-services-los-angeles', destination: '/services/cro', permanent: true },
      { source: '/services/ai-llm-consulting', destination: '/services/ai-consulting', permanent: true },

      // Flat service page legacy redirects
      { source: '/services/seo-discoverability', destination: '/services/technical-seo', permanent: true },
      { source: '/services/geo-ai-content-writing', destination: '/services/geo', permanent: true },
      { source: '/services/google-ads-ppc', destination: '/services/ppc', permanent: true },
      { source: '/services/seo-web-copywriting', destination: '/services/content-marketing', permanent: true },

      // Outcomes and Industries hubs removed entirely (2026-07). These used to
      // point at '/'. Retargeted 2026-07-25: Google generally treats a mass
      // redirect of topically distinct pages onto the homepage as a soft 404
      // and drops the signal instead of consolidating it, so each one now goes
      // to the page that actually covers the same subject.
      { source: '/outcomes', destination: '/services', permanent: true },
      { source: '/outcomes/traffic', destination: '/services/technical-seo', permanent: true },
      { source: '/outcomes/rankings', destination: '/services/technical-seo', permanent: true },
      { source: '/outcomes/sales', destination: '/services/cro', permanent: true },
      { source: '/outcomes/recovery', destination: '/insights/why-did-my-website-traffic-drop', permanent: true },
      { source: '/industries', destination: '/services', permanent: true },
      { source: '/industries/enterprise-b2b', destination: '/services/technical-seo', permanent: true },
      { source: '/industries/local-service', destination: '/services/technical-seo', permanent: true },
      { source: '/industries/healthcare', destination: '/services/technical-seo', permanent: true },
      { source: '/industries/professional-services', destination: '/services/technical-seo', permanent: true },

      // City-specific location pages (2026-07): the /industries/local-service/<city>-seo
      // pages were removed as a set (low traffic relative to maintenance cost of 18
      // near-duplicate city pages). Every old alias and every former city-page URL now
      // consolidates onto the single Local Service industry hub, which still covers the
      // same local-SEO service and area-served claims without the thin per-city split.
      // All of these used to land on '/'. Retargeted 2026-07-25 to the page
      // that owns the same intent: local/city SEO pages -> /seo-services, and
      // the two AI-framed ones -> /ai-visibility. A city page redirecting to
      // the homepage passes essentially nothing; redirecting it to the service
      // it was actually about at least keeps the topic aligned.
      // '/glendale-seo' was in this list. It is now a real page — Search
      // Console shows 81 impressions on "glendale seo" and its variants at
      // position 56-61 with nothing rendering for them — so the redirect is
      // gone and the three aliases below point at the page itself rather than
      // at /los-angeles-seo. A redirect whose source is a live route wins over
      // the route: leaving it here would have made the new page unreachable.
      { source: '/local-seo-glendale', destination: '/glendale-seo', permanent: true },
      { source: '/locations/glendale-seo', destination: '/glendale-seo', permanent: true },
      { source: '/industries/local-service/glendale-seo', destination: '/glendale-seo', permanent: true },
      { source: '/seo-company-encino', destination: '/services/technical-seo', permanent: true },
      { source: '/locations/encino', destination: '/services/technical-seo', permanent: true },
      { source: '/industries/local-service/encino-seo', destination: '/services/technical-seo', permanent: true },
      { source: '/ai-seo-beverly-hills', destination: '/services/geo', permanent: true },
      { source: '/locations/beverly-hills', destination: '/services/technical-seo', permanent: true },
      { source: '/industries/local-service/beverly-hills-seo', destination: '/services/technical-seo', permanent: true },
      { source: '/locations/woodland-hills', destination: '/services/technical-seo', permanent: true },
      { source: '/industries/local-service/woodland-hills-seo', destination: '/services/technical-seo', permanent: true },
      { source: '/locations/northridge', destination: '/services/technical-seo', permanent: true },
      { source: '/industries/local-service/northridge-seo', destination: '/services/technical-seo', permanent: true },
      { source: '/locations/santa-monica', destination: '/services/technical-seo', permanent: true },
      { source: '/industries/local-service/santa-monica-seo', destination: '/services/technical-seo', permanent: true },
      { source: '/locations/long-beach-seo', destination: '/services/technical-seo', permanent: true },
      { source: '/industries/local-service/long-beach-seo', destination: '/services/technical-seo', permanent: true },
      { source: '/locations/anaheim-seo', destination: '/services/technical-seo', permanent: true },
      { source: '/industries/local-service/anaheim-seo', destination: '/services/technical-seo', permanent: true },
      { source: '/locations/costa-mesa-seo', destination: '/services/technical-seo', permanent: true },
      { source: '/industries/local-service/costa-mesa-seo', destination: '/services/technical-seo', permanent: true },
      { source: '/locations/culver-city', destination: '/services/technical-seo', permanent: true },
      { source: '/industries/local-service/culver-city-seo', destination: '/services/technical-seo', permanent: true },
      { source: '/locations/north-hollywood', destination: '/services/technical-seo', permanent: true },
      { source: '/industries/local-service/north-hollywood-seo', destination: '/services/technical-seo', permanent: true },
      { source: '/locations/van-nuys', destination: '/services/technical-seo', permanent: true },
      { source: '/industries/local-service/van-nuys-seo', destination: '/services/technical-seo', permanent: true },
      { source: '/locations/ventura', destination: '/services/technical-seo', permanent: true },
      { source: '/industries/local-service/ventura-seo', destination: '/services/technical-seo', permanent: true },
      { source: '/ai-search-marketing-santa-clarita', destination: '/services/geo', permanent: true },
      { source: '/industries/local-service/santa-clarita-seo', destination: '/services/technical-seo', permanent: true },

      // Regional/multi-city pages, also retargeted off '/'.
      { source: '/on-page-seo-los-angeles', destination: '/services/technical-seo', permanent: true },
      { source: '/los-angeles-seo-services', destination: '/services/technical-seo', permanent: true },
      { source: '/markets/southern-california', destination: '/services/technical-seo', permanent: true },
      { source: '/markets', destination: '/services/technical-seo', permanent: true },
      { source: '/services/google-business-profile-optimization', destination: '/insights/google-business-profile-seo-checklist', permanent: true },

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
      { source: '/case-studies/safety-centric', destination: '/work/safetycentric', permanent: true },
      { source: '/work/safety-centric', destination: '/work/safetycentric', permanent: true },
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
      { source: '/capabilities/authority-building', destination: '/services/link-building', permanent: true },
      { source: '/capabilities/conversion-architecture', destination: '/services/cro', permanent: true },
      { source: '/capabilities/forensic-seo-penalty-recovery', destination: '/insights/algorithmic-update-recovery-entity-seo', permanent: true },
      { source: '/performance/technical-seo-audit-agency', destination: '/services/technical-seo', permanent: true },
      { source: '/relations/authority-building-agency', destination: '/services/link-building', permanent: true },
      { source: '/relations/google-shopping-ads-agency', destination: '/services/ppc', permanent: true },

      // Old "capabilities" and "creativity" hub pages have no direct new equivalent -> home
      // (/services now has its own built hub page, so no redirect needed there)
      { source: '/capabilities', destination: '/services', permanent: true },
      { source: '/creativity', destination: '/services', permanent: true },

      // Old misc pages, no direct new equivalent -> closest live page
      { source: '/onboard', destination: '/contact', permanent: true },
      { source: '/resources', destination: '/insights', permanent: true },
      { source: '/contact-us', destination: '/contact', permanent: true },
      { source: '/reviews', destination: '/work', permanent: true },

      // Old guides/* -> topically matching new page
      { source: '/google-penalty-service', destination: '/insights/algorithmic-update-recovery-entity-seo', permanent: true },
      { source: '/guides/google-penalty-recovery', destination: '/insights/algorithmic-update-recovery-entity-seo', permanent: true },
      { source: '/guides/helpful-content-update-recovery', destination: '/insights/why-did-my-website-traffic-drop', permanent: true },
      { source: '/guides/topic-cluster-architecture', destination: '/services/content-marketing', permanent: true },

      // Old services/* pages with no direct new slug -> closest current service/outcome
      { source: '/services/on-page-seo', destination: '/services/technical-seo', permanent: true },
      { source: '/services/unnatural-links-penalty-recovery', destination: '/insights/toxic-backlinks-disavow-guide', permanent: true },

      // Services consolidation (2026-07): three overlapping pages merged into
      // the survivor that owns the stronger commercial query.
      { source: '/services/content-strategy', destination: '/services/content-marketing', permanent: true },
      { source: '/services/digital-pr', destination: '/services/link-building', permanent: true },
      { source: '/services/ai-video-ads', destination: '/services/ppc', permanent: true },

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
      // ── Old /locations/* city slugs and bare city SEO slugs ──
      // These used to land on /areas-we-serve. That page is gone (2026-08-30),
      // so they go direct to /los-angeles-seo rather than through it.
      { source: '/locations/burbank', destination: '/los-angeles-seo', permanent: true },
      { source: '/local-seo-company-burbank', destination: '/los-angeles-seo', permanent: true },
      { source: '/industries/local-service/burbank-seo', destination: '/los-angeles-seo', permanent: true },
      { source: '/locations/silverlake', destination: '/los-angeles-seo', permanent: true },
      { source: '/industries/local-service/silverlake-seo', destination: '/los-angeles-seo', permanent: true },
      { source: '/locations/studio-city', destination: '/studio-city-seo', permanent: true },
      { source: '/industries/local-service/studio-city-seo', destination: '/studio-city-seo', permanent: true },
      { source: '/locations/sherman-oaks', destination: '/los-angeles-seo', permanent: true },
      { source: '/industries/local-service/sherman-oaks-seo', destination: '/los-angeles-seo', permanent: true },
      { source: '/seo-silverlake', destination: '/los-angeles-seo', permanent: true },
      { source: '/seo-burbank', destination: '/los-angeles-seo', permanent: true },
      { source: '/seo-hollywood', destination: '/los-angeles-seo', permanent: true },
      { source: '/seo-studio-city', destination: '/studio-city-seo', permanent: true },
      { source: '/seo-koreatown', destination: '/los-angeles-seo', permanent: true },
      { source: '/seo-downtown-la', destination: '/los-angeles-seo', permanent: true },
      { source: '/seo-echo-park', destination: '/los-angeles-seo', permanent: true },
      { source: '/seo-los-feliz', destination: '/los-angeles-seo', permanent: true },
      { source: '/seo-sherman-oaks', destination: '/los-angeles-seo', permanent: true },
      { source: '/seo-glendale', destination: '/glendale-seo', permanent: true },
      { source: '/locations/glendale', destination: '/glendale-seo', permanent: true },
      { source: '/areas-served', destination: '/los-angeles-seo', permanent: true },
      { source: '/locations', destination: '/los-angeles-seo', permanent: true },

      // ── Generic /seo-services/:slug fallback -> /services/:slug ── MUST stay last.
      { source: '/seo-services/:slug', destination: '/services/:slug', permanent: true },
    ];
  },
};

export default nextConfig;
