// Curated, human-reviewed Google Search Console highlights. Refreshed
// periodically by comparing two 7-day GSC windows and hand-picking genuine,
// presentable movement on live pages (excludes noise on a near-zero base
// and legacy/redirected URLs that still show up in raw GSC rows). Static by
// design: GSC data lags 2-3 days anyway, so there's no benefit to a live API
// call in production, and this avoids shipping service-account credentials
// to the deployed site.

export const SEARCH_WINS = {
  weekOf: '2026-07-11',
  comparedTo: '2026-07-04',
  wins: [
    {
      label: 'Homepage climbed to position 3 in Google',
      detail: 'Average ranking position improved from 4.6 to 3.0 week over week.',
      href: '/',
    },
    {
      label: 'Glendale page picked up 87 new impressions',
      detail: 'Zero impressions the week before — now showing up for Glendale-area local SEO searches.',
      href: '/industries/local-service/glendale-seo',
    },
    {
      label: 'Northridge page picked up 31 new impressions',
      detail: 'New visibility this week for Northridge-area local SEO searches.',
      href: '/industries/local-service/northridge-seo',
    },
    {
      label: '"AEO vs. GEO" article gained 28 new impressions',
      detail: 'Fresh visibility for AI-search-terminology searches this week.',
      href: '/insights/aeo-vs-geo-vs-aio-vs-llmo',
    },
    {
      label: 'Ranking #1 for a B2B organic traffic query',
      detail: 'Our B2B traffic growth article is holding the top spot in Google.',
      href: '/insights/b2b-organic-traffic-growth',
    },
  ],
};
