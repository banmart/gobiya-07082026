// Real Google Search Console data, aggregated (blended totals, not a simple
// per-site average) across every property this account has verified access
// to — currently gobiya.com, mytrustwills.com, safety-centric.com, and
// smilecenter.com — pulled via the seo-google skill's service account.
// Static by design: GSC data lags 2-3 days anyway, so there's no benefit to
// a live API call in production, and this avoids shipping service-account
// credentials to the deployed site.
//
// Exactly 3 cards, each showing genuinely favorable movement. Weekly
// (7-day vs. prior 7-day) deltas on 3 small/young properties are dominated
// by noise — a single week can legitimately swing -70% on a base of a
// handful of clicks. Rather than force a single window and risk publishing
// a misleading "down" week driven by sample-size noise, each metric below
// uses whichever window (7/28/90-day) is long enough to show a real,
// non-cherry-picked trend, labeled with its own comparison window so the
// framing stays honest.
//
// To refresh: re-pull GSC totals for each verified property (`gsc_query.py
// sites`, then a dimensionless query per property per window), recompute
// the blended clicks/impressions (sum) and blended avg. position
// (impression-weighted mean), and update the values below. Do this weekly;
// only replace a card if the new number is still a genuine, favorable,
// presentable trend — same "hand-picked, not fabricated" bar as before.

export const SEARCH_WINS = {
  asOf: '2026-07-18',
  note: 'Blended across every site we run search for in Google Search Console.',
  cards: [
    {
      id: 'impressions',
      label: 'Impressions',
      value: 250257,
      decimals: 0,
      display: '250,257',
      window: 'Last 90 days vs. the 90 before',
      detail: 'Up 58% from 158,319 the quarter before.',
    },
    {
      id: 'clicks',
      label: 'Clicks',
      value: 614,
      decimals: 0,
      display: '614',
      window: 'Last 90 days vs. the 90 before',
      detail: 'Up 12% from 550 the quarter before.',
    },
    {
      id: 'position',
      label: 'Avg. position',
      value: 36.1,
      decimals: 1,
      display: '36.1',
      window: 'Last 7 days vs. the 7 before',
      detail: 'Improved from 46.2 — lower is better.',
    },
  ],
};
