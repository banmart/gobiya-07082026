import FeatureRows from './FeatureRows';

/* The homepage's alternating feature band. Four rows, each one claim with the
   evidence for it beside it — the art is never decoration, it's the number or
   the list the sentence just made.

   The layout itself lives in FeatureRows, which the technical SEO page uses
   for its body copy too. This file is only the homepage's four rows. */

const ROWS = [
  {
    title: 'Fixes that ship in days, not quarters',
    dek: 'We work on the code ourselves. No ticket queue, no hand-off to a third party, no waiting on a monthly release window.',
    stats: [
      { num: '16', label: 'Years doing this' },
      { num: '2010', label: 'Serving Los Angeles since' },
      { num: '60s', label: 'To your first scan' },
      { num: '0', label: 'Long-term contracts' },
    ],
    link: { text: 'Request a Quote', href: '?onboarding=true' },
    image: {
      src: '/assets/img/developer-dashboard-review.webp',
      alt: 'Gobiya engineers reviewing a client site audit',
    },
  },
  {
    title: 'Stay because it works, not because you signed',
    dek: 'Month to month, start to finish. You can leave any month and take every file, login and report with you.',
    range: { from: 'Month one', to: 'As long as it keeps working' },
    link: { text: 'See pricing', href: '/pricing' },
    image: {
      src: '/assets/img/office-lounge-meeting.webp',
      alt: 'A month-to-month client review meeting',
    },
  },
  {
    title: 'Built to be quoted by AI assistants',
    dek: 'Ranking is only half of it now. We structure your pages so ChatGPT, Gemini and Perplexity can lift an answer straight out of them — with your name on it.',
    list: [
      'Answer-first pages assistants can quote cleanly',
      'Schema and entity markup that ties every page to your brand',
      'llms.txt and crawler access checked, not assumed',
      'Citations tracked across ChatGPT, Gemini and Perplexity',
    ],
    link: { text: 'More on AI search', href: '/services/geo' },
    image: {
      src: '/assets/img/tech-lab-standup.webp',
      alt: 'Team reviewing AI search citation data',
    },
  },
  {
    title: 'Every build ships complete',
    dek: 'A site is not done when it looks right. It is done when it captures a lead, reports on it, and loads fast enough to keep it.',
    list: [
      'A free CRM wired in from day one',
      'Lead capture, follow-up and reporting connected',
      'Speed and Core Web Vitals budgeted before launch',
      'Clean, handoff-ready code you own outright',
    ],
    link: { text: 'More on web builds', href: '/services/web-dev' },
    image: {
      src: '/assets/img/hallway-code-review.webp',
      alt: 'Code review before a site launch',
    },
  },
];

export default function HomeFeatureRows() {
  return <FeatureRows rows={ROWS} />;
}
