// Per-topic story configuration for the flat service pages.
//
// The four service pages used to render as the same stack of sections in the
// same order, which made them read as one template repeated four times. This
// gives each page its own narrative spine and its own signature motif without
// forking the template or the palette.
//
// Deliberately NOT a colour system. The brand is navy + a single carmine
// accent (see lib/brand.js) and adding a per-topic hue would break that.
// Identity here comes from motif geometry, chapter language, and the stakes
// line — structure, not colour.

export const SERVICE_STORY = {
  'seo-services': {
    // the sentence that gives the page its tension, shown under the hero
    stakes: 'If Google cannot read the page, nothing else you do matters.',
    motif: 'grid',
    motifLabel: 'A crawler reading the page',
    chapters: [
      { id: 'problem', label: 'The problem' },
      { id: 'proof', label: 'The evidence' },
      { id: 'included', label: 'The work' },
      { id: 'process', label: 'How it runs' },
      { id: 'faq', label: 'Straight answers' },
    ],
  },
  'geo-services': {
    stakes: 'Ranking first is worth less every year if the answer never names you.',
    motif: 'nodes',
    motifLabel: 'Citations forming around a source',
    chapters: [
      { id: 'problem', label: 'What changed' },
      { id: 'proof', label: 'The evidence' },
      { id: 'included', label: 'The work' },
      { id: 'process', label: 'How it runs' },
      { id: 'faq', label: 'Straight answers' },
    ],
  },
  'ppc-management-services': {
    stakes: 'Every wasted click is money you already spent to lose.',
    motif: 'bars',
    motifLabel: 'Spend consolidating onto what converts',
    chapters: [
      { id: 'problem', label: 'Where budget leaks' },
      { id: 'proof', label: 'The evidence' },
      { id: 'included', label: 'The work' },
      { id: 'process', label: 'How it runs' },
      { id: 'faq', label: 'Straight answers' },
    ],
  },
  'content-marketing-services': {
    stakes: 'Publishing more is not a strategy. Answering better is.',
    motif: 'lines',
    motifLabel: 'Thin pages consolidating into one that answers',
    chapters: [
      { id: 'problem', label: 'The problem' },
      { id: 'proof', label: 'The evidence' },
      { id: 'included', label: 'The work' },
      { id: 'process', label: 'How it runs' },
      { id: 'faq', label: 'Straight answers' },
    ],
  },
};

// Fallback so a new service slug renders sensibly before it gets its own entry.
export const DEFAULT_STORY = {
  stakes: null,
  motif: 'grid',
  motifLabel: 'Structure forming',
  chapters: [
    { id: 'problem', label: 'The problem' },
    { id: 'proof', label: 'The evidence' },
    { id: 'included', label: 'The work' },
    { id: 'process', label: 'How it runs' },
    { id: 'faq', label: 'Straight answers' },
  ],
};

export function getStory(slug) {
  return SERVICE_STORY[slug] || DEFAULT_STORY;
}
