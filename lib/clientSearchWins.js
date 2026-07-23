// Real, per-client Search Console performance data for individual case study
// pages — scoped strictly to verified properties with real tracking data.
//
// Keyed by case-study slug (matches `slug` in lib/work.js). Only include a
// client here once its domain is a verified property — no fabricated or estimated numbers.
//
// Verified case-study properties: safety-centric.com, smilecenter.com,
// americanlivescan.com, and dgplumbingandrooter.com.

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
    note: 'Search Console performance for americanlivescan.com only — not blended with any other site.',
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
    note: 'Search Console performance for dgplumbingandrooter.com only — not blended with any other site.',
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
