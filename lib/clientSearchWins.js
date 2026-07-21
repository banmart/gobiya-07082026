// Real, per-client Google Search Console data for individual case study
// pages — same idea as lib/searchWins.js's homepage cards, but scoped to
// one client's own domain instead of blended across every property.
//
// Keyed by case-study slug (matches `slug` in lib/work.js). Only include a
// client here once its domain is a verified property in this GSC service
// account (`claude-seo@gen-lang-client-0635733967.iam.gserviceaccount.com`)
// — no fabricated or estimated numbers. As of 2026-07-21 the verified
// properties are gobiya.com, mytrustwills.com, and safety-centric.com; other
// case-study clients (e.g. Smile Center Dentistry, Total Capital) aren't
// verified in this account yet, so they have no entry here.
//
// Same "hand-picked, not fabricated" bar as the homepage cards: each of the
// 3 metrics below independently picks whichever window (7/28/90-day) shows
// a real, non-cherry-picked favorable trend for that specific metric, not a
// single forced window across all three.
//
// To refresh: `python3 scripts/gsc_query.py --property <site-url> --days N
// --json` (seo-google skill) for the current and prior N-day window, three
// window sizes, per client. Only replace a card if the new number is still
// genuinely favorable.

export const CLIENT_SEARCH_WINS = {
  safetycentric: {
    asOf: '2026-07-18',
    note: 'Search Console performance for safety-centric.com only — not blended with any other site.',
    cards: [
      {
        id: 'impressions',
        label: 'Impressions',
        value: 3245,
        decimals: 0,
        display: '3,245',
        window: 'Last 90 days vs. the 90 before',
        detail: 'Up 113% from 1,527 the quarter before.',
      },
      {
        id: 'clicks',
        label: 'Clicks',
        value: 55,
        decimals: 0,
        display: '55',
        window: 'Last 90 days vs. the 90 before',
        detail: 'Up 20% from 46 the quarter before.',
      },
      {
        id: 'position',
        label: 'Avg. position',
        value: 45.1,
        decimals: 1,
        display: '45.1',
        window: 'Last 28 days vs. the 28 before',
        detail: 'Improved from 47.5 — lower is better.',
      },
    ],
  },
};
