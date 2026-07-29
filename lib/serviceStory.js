// Visual motifs + story scaffolding per service page.

export const SERVICE_STORY = {
  'seo-services': {
    stakes: 'Google cannot rank what it cannot read.',
    motif: 'lines',
    motifLabel: 'Technical errors resolving into clear indexable structure',
    chapters: [
      { id: 'problem', label: 'The problem' },
      { id: 'proof', label: 'The evidence' },
      { id: 'included', label: 'The work' },
      { id: 'process', label: 'How it runs' },
      { id: 'faq', label: 'Straight answers' },
    ],
  },
  'geo-services-los-angeles': {
    stakes: 'AI search engine answers summarize first and quote second. Generic marketing text gets skipped.',
    motif: 'nodes',
    motifLabel: 'Structured content being extracted directly into AI answers',
    chapters: [
      { id: 'problem', label: 'The problem' },
      { id: 'proof', label: 'The evidence' },
      { id: 'included', label: 'The work' },
      { id: 'process', label: 'How it runs' },
      { id: 'faq', label: 'Straight answers' },
    ],
  },
  'ppc-management-services': {
    stakes: 'Paying for clicks that never turn into booked customers is a budget leak, not a campaign strategy.',
    motif: 'bars',
    motifLabel: 'Wasted spend stopped; cost per qualified lead dropping',
    chapters: [
      { id: 'problem', label: 'The problem' },
      { id: 'proof', label: 'The evidence' },
      { id: 'included', label: 'The work' },
      { id: 'process', label: 'How it runs' },
      { id: 'faq', label: 'Straight answers' },
    ],
  },
  'content-marketing-strategies': {
    stakes: 'Articles written for a calendar instead of search demand produce words nobody ever reads.',
    motif: 'grid',
    motifLabel: 'Topic clusters mapped cleanly to real search questions',
    chapters: [
      { id: 'problem', label: 'The problem' },
      { id: 'proof', label: 'The evidence' },
      { id: 'included', label: 'The work' },
      { id: 'process', label: 'How it runs' },
      { id: 'faq', label: 'Straight answers' },
    ],
  },
  'link-building-services': {
    stakes: 'A link from a site nobody reads is not authority. It is noise.',
    motif: 'nodes',
    motifLabel: 'Earned mentions converging on one source',
    chapters: [
      { id: 'problem', label: 'The problem' },
      { id: 'proof', label: 'The evidence' },
      { id: 'included', label: 'The work' },
      { id: 'process', label: 'How it runs' },
      { id: 'faq', label: 'Straight answers' },
    ],
  },
  'web-development-services-los-angeles': {
    stakes: 'A site that looks finished and loads in nine seconds is not finished.',
    motif: 'grid',
    motifLabel: 'Structure resolving into a page',
    chapters: [
      { id: 'problem', label: 'The problem' },
      { id: 'proof', label: 'The evidence' },
      { id: 'included', label: 'The work' },
      { id: 'process', label: 'How it runs' },
      { id: 'faq', label: 'Straight answers' },
    ],
  },
  'conversion-rate-optimization-cro': {
    stakes: 'Traffic you already paid for is leaving without telling you why.',
    motif: 'bars',
    motifLabel: 'Where visitors drop, and where they convert',
    chapters: [
      { id: 'problem', label: 'Where it leaks' },
      { id: 'proof', label: 'The evidence' },
      { id: 'included', label: 'The work' },
      { id: 'process', label: 'How it runs' },
      { id: 'faq', label: 'Straight answers' },
    ],
  },
  'ai-consulting-services-los-angeles': {
    stakes: 'Most AI spend buys a demo. Very little of it buys an outcome.',
    motif: 'lines',
    motifLabel: 'Scattered tooling consolidating into one system',
    chapters: [
      { id: 'problem', label: 'The problem' },
      { id: 'proof', label: 'The evidence' },
      { id: 'included', label: 'The work' },
      { id: 'process', label: 'How it runs' },
      { id: 'faq', label: 'Straight answers' },
    ],
  },
};

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
