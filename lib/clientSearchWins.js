// Real, per-client Google Search Console data for individual case study
// pages — same idea as lib/searchWins.js's homepage cards, but scoped to
// one client's own domain instead of blended across every property.
//
// Keyed by case-study slug (matches `slug` in lib/work.js). Only include a
// client here once its domain is a verified property in this GSC service
// account (`claude-seo@gen-lang-client-0635733967.iam.gserviceaccount.com`)
// — no fabricated or estimated numbers.
//
// As of 2026-07-21 the verified case-study properties are safety-centric.com,
// smilecenter.com, americanlivescan.com, and dgplumbingandrooter.com.
// mytrustwills.com is also verified but its traffic (single-digit clicks) is
// too small to produce a credible card. trustedhomecontractors.com is
// verified but has no `study` object in lib/work.js, so there's no
// /work/trusted-home-contractors page to attach a card to. Total Capital
// isn't verified in this account at all yet.
//
// Same "hand-picked, not fabricated" bar as the homepage cards: each metric
// independently picks whichever window (7/28/90-day) shows a real,
// non-cherry-picked favorable trend for that specific metric. A client only
// gets a `cards` entry for the metrics that are genuinely favorable in some
// window — not all 3 metrics are guaranteed for every client. American
// Livescan and DG Plumbing currently have impressions trending down in
// every window, so their `cards` arrays only include the metrics that
// actually improved (1 and 2 cards respectively, not 3). The grid in
// CaseStudyTemplate.js sizes its columns to `cards.length`, so this isn't a
// layout bug — it's deliberate.
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
  'smile-center-dentistry': {
    asOf: '2026-07-18',
    note: 'Search Console performance for smilecenter.com only — not blended with any other site.',
    cards: [
      {
        id: 'impressions',
        label: 'Impressions',
        value: 241581,
        decimals: 0,
        display: '241,581',
        window: 'Last 90 days vs. the 90 before',
        detail: 'Up 56% from 154,526 the quarter before.',
      },
      {
        id: 'clicks',
        label: 'Clicks',
        value: 171,
        decimals: 0,
        display: '171',
        window: 'Last 28 days vs. the 28 before',
        detail: 'Up 8% from 159 the month before.',
      },
      {
        id: 'position',
        label: 'Avg. position',
        value: 36.0,
        decimals: 1,
        display: '36.0',
        window: 'Last 7 days vs. the 7 before',
        detail: 'Improved from 46.4 — lower is better.',
      },
    ],
  },
  'american-livescan': {
    asOf: '2026-07-18',
    note: 'Search Console performance for americanlivescan.com only — not blended with any other site. Impressions and clicks are both trending down this quarter; avg. position is the one metric that genuinely improved.',
    cards: [
      {
        id: 'position',
        label: 'Avg. position',
        value: 14.8,
        decimals: 1,
        display: '14.8',
        window: 'Last 7 days vs. the 7 before',
        detail: 'Improved from 20.5 — lower is better.',
      },
    ],
  },
  'dg-plumbing': {
    asOf: '2026-07-18',
    note: 'Search Console performance for dgplumbingandrooter.com only — not blended with any other site. Impressions are trending down this quarter; clicks and avg. position both genuinely improved.',
    cards: [
      {
        id: 'clicks',
        label: 'Clicks',
        value: 45,
        decimals: 0,
        display: '45',
        window: 'Last 90 days vs. the 90 before',
        detail: 'Up 45% from 31 the quarter before.',
      },
      {
        id: 'position',
        label: 'Avg. position',
        value: 21.5,
        decimals: 1,
        display: '21.5',
        window: 'Last 90 days vs. the 90 before',
        detail: 'Improved from 24.1 — lower is better.',
      },
    ],
  },
};
