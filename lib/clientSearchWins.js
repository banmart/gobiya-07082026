// Real, per-client Search Console & AI Visibility performance data for individual
// case study pages.
//
// Keyed by case-study slug (matches `slug` in lib/work.js). Handles both hyphenated
// and non-hyphenated slug variations so cards render reliably regardless of route alias.
//
// Two independent data sources feed the `cards` array on each entry:
//
// 1. GSC cards (id: impressions/clicks/position) — real Google Search Console
//    data, refreshed weekly by the same job that refreshes lib/searchWins.js.
//    These are added ONLY for clients that (a) have a `study` object in
//    lib/work.js (i.e. a real case-study page exists) AND (b) whose domain is
//    a verified GSC property. As of 2026-08-03 that's still exactly 5
//    clients: safety-centric.com, smilecenter.com, americanlivescan.com,
//    dgplumbingandrooter.com, and mytrustwills.com. Note that
//    trustedhomecontractors.com and lapurenutritionist.com are verified GSC
//    properties but get no entry here — the first has no `study` object in
//    lib/work.js (so /work/trusted-home-contractors doesn't exist) and the
//    second isn't a case study at all. A metric is only shown if it has a
//    genuinely favorable window (7/28/90-day) AND isn't riding on an
//    extremely small base (roughly: single-digit clicks or well under 100
//    impressions in the 90-day window) — mytrustwills.com is verified but
//    still fails that bar. Where several windows qualify for a metric, the
//    largest (least noisy) one wins. See the per-entry comments below for
//    the current rationale on each.
//
// 2. AI cards (id: ai-grounding/ai-traffic) — AI visibility data (citations
//    and referral traffic from ChatGPT/Perplexity/Gemini/Claude) from a
//    separate, non-GSC source. This is NOT refreshed by the weekly GSC job
//    and can appear even for clients whose domain isn't a verified GSC
//    property at all (quickpass-aid, remodel-me-pros, the-healing-metta,
//    total-capital) — don't remove those entries during a GSC refresh just
//    because they lack GSC cards; that's expected, not a bug.
//
// To refresh the GSC half: re-pull GSC totals for each of the 5 verified+study
// domains above (6 windows each — 7/28/90-day and their prior periods),
// recompute impressions/clicks/avg. position per window, and update only the
// GSC-id cards using the same favorable-window and small-base rules as above.
// Leave every ai-grounding/ai-traffic card untouched — this job has no source
// for that data.

// safety-centric.com keeps all three GSC cards as of 2026-08-03. Impressions
// and clicks are favorable on the 90-day window (the most robust of the ones
// that qualify — the 28-day impressions comparison is down 67% because the
// prior 28 days included an unusually high-impression stretch). Position is
// favorable on the 28-day (37.5 vs. 53.6) and marginally on the 7-day (50.0
// vs. 50.3); the 28-day is both larger and the clearer move, so it wins.
const SAFETY_CENTRIC_DATA = {
  asOf: '2026-08-03',
  note: 'Search Console & AI Visibility performance for safety-centric.com only — not blended with any other site.',
  cards: [
    {
      id: 'impressions',
      label: 'Impressions',
      value: 3032,
      decimals: 0,
      display: '3,032',
      window: 'Last 90 days vs. the 90 before',
      detail: 'Up 72% from 1,762 the quarter before.',
    },
    {
      id: 'clicks',
      label: 'Clicks',
      value: 53,
      decimals: 0,
      display: '53',
      window: 'Last 90 days vs. the 90 before',
      detail: 'Up 6% from 50 the quarter before.',
    },
    {
      id: 'position',
      label: 'Avg. position',
      value: 37.5,
      decimals: 1,
      display: '37.5',
      window: 'Last 28 days vs. the 28 before',
      detail: 'Improved from 53.6 — lower is better.',
    },
    {
      id: 'ai-grounding',
      label: 'AI Grounding & Citations',
      value: 384,
      decimals: 0,
      display: '384',
      window: 'Last 90 days across ChatGPT & Perplexity',
      detail: 'Up 185% in AI assistant answer grounding & citations.',
    },
    {
      id: 'ai-traffic',
      label: 'AI Pages Traffic',
      value: 1420,
      decimals: 0,
      display: '1,420',
      suffix: ' visits',
      window: 'Last 90 days from AI engines',
      detail: 'Direct referral traffic from cited pages & AI grounding.',
    },
  ],
};

const SMILE_CENTER_DATA = {
  asOf: '2026-07-27',
  note: 'Search Console & AI Visibility performance for smilecenter.com only — not blended with any other site.',
  cards: [
    {
      id: 'impressions',
      label: 'Impressions',
      value: 252334,
      decimals: 0,
      display: '252,334',
      window: 'Last 90 days vs. the 90 before',
      detail: 'Up 65% from 152,969 the quarter before.',
    },
    {
      id: 'clicks',
      label: 'Clicks',
      value: 500,
      decimals: 0,
      display: '500',
      window: 'Last 90 days vs. the 90 before',
      detail: 'Up 8% from 463 the quarter before.',
    },
    {
      id: 'position',
      label: 'Avg. position',
      value: 30.7,
      decimals: 1,
      display: '30.7',
      window: 'Last 7 days vs. the 7 before',
      detail: 'Improved from 37.5 — lower is better.',
    },
    {
      id: 'ai-grounding',
      label: 'AI Grounding & Citations',
      value: 1240,
      decimals: 0,
      display: '1,240',
      window: 'Last 90 days across ChatGPT, Gemini & Perplexity',
      detail: 'Top-cited dental practice in local AI health recommendations.',
    },
    {
      id: 'ai-traffic',
      label: 'AI Pages Traffic',
      value: 3850,
      decimals: 0,
      display: '3,850',
      suffix: ' visits',
      window: 'Last 90 days from AI search',
      detail: 'Organic referral traffic from AI dental & procedure queries.',
    },
  ],
};

// As of 2026-07-27, americanlivescan.com has no favorable GSC window on any
// of impressions/clicks/position (all three are down across 7/28/90-day —
// clicks -5 to -27%, impressions -8 to -28%, position worse by 1-31%), so
// the GSC position card that used to run here was dropped rather than
// publish a stale or misleading number. Only the AI visibility cards remain
// until a real GSC win reappears.
const AMERICAN_LIVESCAN_DATA = {
  asOf: '2026-07-27',
  note: 'Search Console & AI Visibility performance for americanlivescan.com only — not blended with any other site.',
  cards: [
    {
      id: 'ai-grounding',
      label: 'AI Grounding & Citations',
      value: 512,
      decimals: 0,
      display: '512',
      window: 'Last 90 days across ChatGPT & Perplexity',
      detail: 'Up 160% in local AI assistant answer grounding.',
    },
    {
      id: 'ai-traffic',
      label: 'AI Pages Traffic',
      value: 1890,
      decimals: 0,
      display: '1,890',
      suffix: ' visits',
      window: 'Last 90 days from AI engines',
      detail: 'Direct booking referrals from AI local service answers.',
    },
  ],
};

const DG_PLUMBING_DATA = {
  asOf: '2026-07-27',
  note: 'Search Console & AI Visibility performance for dgplumbingandrooter.com only — not blended with any other site.',
  cards: [
    {
      id: 'clicks',
      label: 'Clicks',
      value: 48,
      decimals: 0,
      display: '48',
      window: 'Last 90 days vs. the 90 before',
      detail: 'Up 78% from 27 the quarter before.',
    },
    {
      id: 'position',
      label: 'Avg. position',
      value: 21.4,
      decimals: 1,
      display: '21.4',
      window: 'Last 90 days vs. the 90 before',
      detail: 'Improved from 24.3 — lower is better.',
    },
    {
      id: 'ai-grounding',
      label: 'AI Grounding & Citations',
      value: 430,
      decimals: 0,
      display: '430',
      window: 'Last 90 days across ChatGPT & Perplexity',
      detail: 'Cited authority for emergency plumbing & rooter solutions.',
    },
    {
      id: 'ai-traffic',
      label: 'AI Pages Traffic',
      value: 1540,
      decimals: 0,
      display: '1,540',
      suffix: ' visits',
      window: 'Last 90 days from AI engines',
      detail: 'Direct dispatch calls from AI search assistant recommendations.',
    },
  ],
};

const QUICKPASS_AID_DATA = {
  asOf: '2026-07-18',
  note: 'AI Visibility & Search performance for quickpassaid.com only.',
  cards: [
    {
      id: 'ai-grounding',
      label: 'AI Grounding & Citations',
      value: 640,
      decimals: 0,
      display: '640',
      window: 'Last 90 days across ChatGPT & Perplexity',
      detail: 'Cited in top AI passport photo & identity verification guides.',
    },
    {
      id: 'ai-traffic',
      label: 'AI Pages Traffic',
      value: 2310,
      decimals: 0,
      display: '2,310',
      suffix: ' visits',
      window: 'Last 90 days from AI engines',
      detail: 'Direct traffic from AI photo tool recommendations.',
    },
  ],
};

const REMODEL_ME_PROS_DATA = {
  asOf: '2026-07-18',
  note: 'AI Visibility & Search performance for remodelmepros.com only.',
  cards: [
    {
      id: 'ai-grounding',
      label: 'AI Grounding & Citations',
      value: 875,
      decimals: 0,
      display: '875',
      window: 'Last 90 days across ChatGPT, Gemini & Perplexity',
      detail: 'Grounding citations for local contractor & remodeling queries.',
    },
    {
      id: 'ai-traffic',
      label: 'AI Pages Traffic',
      value: 2940,
      decimals: 0,
      display: '2,940',
      suffix: ' visits',
      window: 'Last 90 days from AI engines',
      detail: 'Homeowner referrals from AI search answer cards.',
    },
  ],
};

const HEALING_METTA_DATA = {
  asOf: '2026-07-18',
  note: 'AI Visibility & Search performance for thehealingmetta.com only.',
  cards: [
    {
      id: 'ai-grounding',
      label: 'AI Grounding & Citations',
      value: 720,
      decimals: 0,
      display: '720',
      window: 'Last 90 days across ChatGPT & Gemini',
      detail: 'Cited source for integrative wellness & holistic care answers.',
    },
    {
      id: 'ai-traffic',
      label: 'AI Pages Traffic',
      value: 2150,
      decimals: 0,
      display: '2,150',
      suffix: ' visits',
      window: 'Last 90 days from AI engines',
      detail: 'Patient traffic driven directly by AI answer citations.',
    },
  ],
};

const TOTAL_CAPITAL_DATA = {
  asOf: '2026-07-18',
  note: 'AI Visibility & Search performance for totalcapital.com only.',
  cards: [
    {
      id: 'ai-grounding',
      label: 'AI Grounding & Citations',
      value: 490,
      decimals: 0,
      display: '490',
      window: 'Last 90 days across ChatGPT & Perplexity',
      detail: 'AI grounding for commercial & residential property availability.',
    },
    {
      id: 'ai-traffic',
      label: 'AI Pages Traffic',
      value: 1680,
      decimals: 0,
      display: '1,680',
      suffix: ' visits',
      window: 'Last 90 days from AI engines',
      detail: 'Tenant lead referrals from AI real estate searches.',
    },
  ],
};

// mytrustwills.com is a verified GSC property with a real case study, but its
// GSC traffic is still too small a base to present credibly (5 clicks and a
// peak of 723 impressions across the last 90 days, as of 2026-07-27) — any
// percentage swing off numbers that small isn't a genuine, presentable win,
// so no GSC card is shown here, only AI visibility data.
const MTW_DATA = {
  asOf: '2026-07-27',
  note: 'AI Visibility & Search performance for mytrustwills.com only.',
  cards: [
    {
      id: 'ai-grounding',
      label: 'AI Grounding & Citations',
      value: 560,
      decimals: 0,
      display: '560',
      window: 'Last 90 days across ChatGPT, Perplexity & Claude',
      detail: 'Cited source for AI estate planning & legal document guidance.',
    },
    {
      id: 'ai-traffic',
      label: 'AI Pages Traffic',
      value: 1920,
      decimals: 0,
      display: '1,920',
      suffix: ' visits',
      window: 'Last 90 days from AI engines',
      detail: 'Qualified traffic from AI trust & will answer citations.',
    },
  ],
};

export const CLIENT_SEARCH_WINS = {
  safetycentric: SAFETY_CENTRIC_DATA,
  'safety-centric': SAFETY_CENTRIC_DATA,
  'smile-center-dentistry': SMILE_CENTER_DATA,
  'american-livescan': AMERICAN_LIVESCAN_DATA,
  'dg-plumbing': DG_PLUMBING_DATA,
  'quickpass-aid': QUICKPASS_AID_DATA,
  'remodel-me-pros': REMODEL_ME_PROS_DATA,
  'the-healing-metta': HEALING_METTA_DATA,
  'total-capital': TOTAL_CAPITAL_DATA,
  mtw: MTW_DATA,
};
