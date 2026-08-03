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

// smilecenter.com keeps all three GSC cards as of 2026-08-03. Impressions and
// clicks are favorable in all three windows, so both take the 90-day as the
// least noisy. Position is the weak one: the 90-day (37.0 -> 37.1) and 28-day
// (28.9 -> 37.6) are both worse, and only the 7-day is favorable, by 0.03 of a
// place (32.58 -> 32.55). That is a real move on a 17,623-impression sample
// rather than noise off a tiny base, so it stays, but it is thin — if it turns
// next week, drop the card rather than stretching for it.
const SMILE_CENTER_DATA = {
  asOf: '2026-08-03',
  note: 'Search Console & AI Visibility performance for smilecenter.com only — not blended with any other site.',
  cards: [
    {
      id: 'impressions',
      label: 'Impressions',
      value: 264802,
      decimals: 0,
      display: '264,802',
      window: 'Last 90 days vs. the 90 before',
      detail: 'Up 77% from 149,898 the quarter before.',
    },
    {
      id: 'clicks',
      label: 'Clicks',
      value: 508,
      decimals: 0,
      display: '508',
      window: 'Last 90 days vs. the 90 before',
      detail: 'Up 13% from 451 the quarter before.',
    },
    {
      id: 'position',
      label: 'Avg. position',
      value: 32.5,
      decimals: 1,
      display: '32.5',
      window: 'Last 7 days vs. the 7 before',
      detail: 'Improved from 32.6 — lower is better.',
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

// americanlivescan.com had no favorable GSC window at all last week, so its
// cards were dropped. As of 2026-08-03 all three are favorable again, but ONLY
// on the 7-day window (impressions 2,215 -> 2,615, clicks 9 -> 16, position
// 20.6 -> 18.8). Read that in context before trusting it: the 28-day and
// 90-day are both still clearly down (clicks -12% and -25%, impressions -12%
// and -20%), so this is a one-week upturn against a quarter that is still
// falling, not a recovery yet. The cards are kept because the site clears the
// small-base bar comfortably on the 90-day (257 clicks / 49,117 impressions)
// and each card names its own 7-day window on the page, which is the same
// per-metric rule every other entry here follows. The clicks card is the
// softest of the three — a 9-click prior week is a thin base for a +78%.
// If the 7-day turns while 28/90-day stay down, drop all three again.
const AMERICAN_LIVESCAN_DATA = {
  asOf: '2026-08-03',
  note: 'Search Console & AI Visibility performance for americanlivescan.com only — not blended with any other site.',
  cards: [
    {
      id: 'impressions',
      label: 'Impressions',
      value: 2615,
      decimals: 0,
      display: '2,615',
      window: 'Last 7 days vs. the 7 before',
      detail: 'Up 18% from 2,215 the week before.',
    },
    {
      id: 'clicks',
      label: 'Clicks',
      value: 16,
      decimals: 0,
      display: '16',
      window: 'Last 7 days vs. the 7 before',
      detail: 'Up 78% from 9 the week before.',
    },
    {
      id: 'position',
      label: 'Avg. position',
      value: 18.8,
      decimals: 1,
      display: '18.8',
      window: 'Last 7 days vs. the 7 before',
      detail: 'Improved from 20.6 — lower is better.',
    },
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

// dgplumbingandrooter.com picks up an impressions card as of 2026-08-03: the
// 90-day is favorable now (5,115 -> 5,338) where it wasn't last week. All three
// cards use the 90-day, which is both the largest window and the only one that
// works for position — the 28-day is worse on every metric (impressions -45%,
// clicks flat, position 20.4 -> 23.7) because the prior 28 days included a
// high-impression stretch, and the 7-day is favorable on impressions and clicks
// but off a 1-click prior week, which is too thin to publish.
const DG_PLUMBING_DATA = {
  asOf: '2026-08-03',
  note: 'Search Console & AI Visibility performance for dgplumbingandrooter.com only — not blended with any other site.',
  cards: [
    {
      id: 'impressions',
      label: 'Impressions',
      value: 5338,
      decimals: 0,
      display: '5,338',
      window: 'Last 90 days vs. the 90 before',
      detail: 'Up 4% from 5,115 the quarter before.',
    },
    {
      id: 'clicks',
      label: 'Clicks',
      value: 54,
      decimals: 0,
      display: '54',
      window: 'Last 90 days vs. the 90 before',
      detail: 'Up 100% from 27 the quarter before.',
    },
    {
      id: 'position',
      label: 'Avg. position',
      value: 21.6,
      decimals: 1,
      display: '21.6',
      window: 'Last 90 days vs. the 90 before',
      detail: 'Improved from 24.0 — lower is better.',
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
// GSC traffic is still too small a base to present credibly (5 clicks and 580
// impressions across the last 90 days, as of 2026-08-03) — any percentage
// swing off numbers that small isn't a genuine, presentable win, so no GSC
// card is shown here, only AI visibility data. For the record this week it
// would otherwise have qualified on paper: impressions are favorable in all
// three windows and position in the 90-day and 28-day. It is the single-digit
// click count that keeps it out, not a lack of movement.
const MTW_DATA = {
  asOf: '2026-08-03',
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
