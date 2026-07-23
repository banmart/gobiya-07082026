// Real, per-client Search Console & AI Visibility performance data for individual
// case study pages — scoped strictly to verified properties with real tracking data.
//
// Keyed by case-study slug (matches `slug` in lib/work.js). Handles both hyphenated
// and non-hyphenated slug variations so cards render reliably regardless of route alias.

const SAFETY_CENTRIC_DATA = {
  asOf: '2026-07-18',
  note: 'Search Console & AI Visibility performance for safety-centric.com only — not blended with any other site.',
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
  asOf: '2026-07-18',
  note: 'Search Console & AI Visibility performance for smilecenter.com only — not blended with any other site.',
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

const AMERICAN_LIVESCAN_DATA = {
  asOf: '2026-07-18',
  note: 'Search Console & AI Visibility performance for americanlivescan.com only — not blended with any other site.',
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
  asOf: '2026-07-18',
  note: 'Search Console & AI Visibility performance for dgplumbingandrooter.com only — not blended with any other site.',
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

const MTW_DATA = {
  asOf: '2026-07-18',
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
