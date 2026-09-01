// First-hand experience blocks for the service pages, in Steve's voice.
//
// ─────────────────────────────────────────────────────────────────────────────
// FOR STEVE TO REVIEW BEFORE THIS SHIPS
//
// These are drafted from what is already committed to this repo — the
// testimonials and verified datapoints in servicesFlat.js, the case studies in
// work.js, and the 3,217-citation study in insights.js. Nothing below invents a
// client, a number, or a certification.
//
// They are still written *for* you rather than *by* you. Correct anything that
// misremembers the work: it is your name on the byline, and a first-hand claim
// that is not actually first-hand is worth less than no claim at all.
// ─────────────────────────────────────────────────────────────────────────────
//
// `claim` must stay free of numbers unless the figure is already verified
// elsewhere in the repo and cited with `source`.

export const SERVICE_EXPERIENCE = {
  'technical-seo': {
    heading: 'What I actually find when I open a site',
    body: [
      'The technical problem is almost never the one the owner calls about. They call because rankings dropped. What I find is usually a site that has been quietly uncrawlable in some specific way for months — a staging noindex that shipped to production, a canonical tag pointing every paginated page at page one, a JavaScript framework rendering the main content after the crawler has already given up.',
      'The SafetyCentric rebuild is the clearest example I can point at. The visible job was moving off WordPress. The job that moved the numbers was making the pages render server-side so Google saw content instead of an empty shell, and that showed up in Search Console impressions rather than in anything the owner could see on the page.',
    ],
    source: {
      text: '113% increase in organic search impressions in 90 days, verified in Search Console',
      href: '/work/safetycentric',
    },
  },

  'geo': {
    heading: 'What the citation data actually showed',
    body: [
      'We looked at 3,217 citations across ChatGPT, Gemini, Perplexity, Claude, and Copilot because clients kept asking a question none of us could answer properly: what makes an AI name you instead of a competitor. The honest answer before that study was guesswork.',
      'Two findings changed how I work. Pages with original data were cited 4.5 times more often than pages without — a far bigger effect than domain authority, which showed only a 15% premium. And only 2.7% of cited domains appeared across all five assistants, which means visibility on ChatGPT tells you almost nothing about visibility on Perplexity. Anyone selling you one number for "AI visibility" is flattening something that does not flatten.',
    ],
    source: {
      text: 'Our analysis of 3,217 AI citations across five assistants',
      href: '/insights',
    },
  },

  'content-marketing': {
    heading: 'Why most content programmes stall',
    body: [
      'The pattern I see repeatedly is a business publishing steadily and ranking for nothing, because every piece is written to a keyword rather than to a question a customer actually asked. The remedy is unglamorous: go through the sales inbox and the call notes, write down the questions in the words the customer used, and answer those.',
      'The other half is structural. A page that answers a real question but sits three clicks deep with nothing linking to it will not be found. On the RemodelMePros rebuild the copy mattered, but so did giving the content somewhere to sit and something to link it.',
    ],
    source: {
      text: '56% increase in organic impressions from a content-driven rebuild',
      href: '/work',
    },
  },

  'link-building': {
    heading: 'The part of link building nobody advertises',
    body: [
      'Most of what gets sold as link building is a spreadsheet of placements on sites nobody reads. It moves a third-party authority score and does nothing for the business. I have spent more time removing links for clients recovering from that than building them.',
      'What works is slower and harder to package: having something genuinely worth citing, then telling the small number of people in your industry who would want to cite it. One link from a publication your customers actually read is worth more than a hundred from directories, and it is the only kind that survives an algorithm update.',
    ],
  },

  'ppc': {
    heading: 'Where paid budgets actually leak',
    body: [
      'Almost every underperforming account I inherit has the same two problems, and neither is the bid. The first is conversion tracking that is broken or measuring the wrong thing, which means Smart Bidding has been optimising toward a goal nobody intended. The second is a negative keyword list that has not been touched since launch.',
      'With Trusted Home Contractors the work that mattered was tightening what the account was allowed to spend on before touching what it bid. Cost per click is the number people watch; cost per actual customer is the one that decides whether the account is worth running.',
    ],
    source: {
      text: '40% reduction in cost per real customer, client-reported',
      href: '/work',
    },
  },

  'cro': {
    heading: 'What testing teaches you about your own assumptions',
    body: [
      'The uncomfortable part of conversion work is how often the thing you were certain about turns out to be wrong. I have watched carefully argued redesigns lose to the page they replaced, and one-line changes to a form beat a quarter of design work.',
      'Which is why I will not run a test on a site that has not fixed its speed first. If the page takes four seconds to load, you are not testing your headline against another headline — you are testing it against the visitors who left before they saw either one.',
    ],
  },

  'web-ux': {
    heading: 'Designing for the person holding a phone',
    body: [
      'Most sites are designed on a large monitor and used on a phone in one hand, often outdoors, often in a hurry. The gap between those two contexts is where the majority of usability problems live, and it is invisible in the design review.',
      'On the SmileCenter work the biggest wins were not visual. They were making the phone number tappable without zooming, cutting the number of steps to book, and stopping the layout from shifting under a thumb that was already moving toward a button.',
    ],
    source: {
      text: '94% improvement in task completion speed after the mobile redesign',
      href: '/work/smile-center-dentistry',
    },
  },

  'web-dev': {
    heading: 'Why I stopped handing over sites I could not defend',
    body: [
      'A lot of my work now is replacing builds that were fine on launch day and impossible to maintain a year later — plugin stacks where an update breaks checkout, page builders that emit so much markup the page cannot pass Core Web Vitals whatever you do to it.',
      'I build on Next.js because the content arrives in the first response rather than after a script runs, which matters more now than it did five years ago: an AI crawler is far less patient than Googlebot, and a page that needs JavaScript to say what it is about often does not get read at all.',
    ],
  },

  'ai-consulting': {
    heading: 'What businesses actually ask about AI',
    body: [
      'The question is almost never "which model should we use". It is some version of "everyone says we should be doing something with this and I cannot tell what is real". Most of the value I add in the first conversation is subtraction — ruling out the things that will not pay for themselves at their size.',
      'The work that has held up is unglamorous: making a business findable and quotable by the assistants people are already asking, and automating the specific handoffs where things get dropped. On the SafetyCentric project the piece the owner valued most was not the AI work in the abstract — it was that leads stopped sitting in an inbox waiting for someone to remember them.',
    ],
    source: {
      text: 'SafetyCentric — CRM and follow-up automation',
      href: '/work/safetycentric',
    },
  },
};

export function experienceFor(slug) {
  return SERVICE_EXPERIENCE[slug] || null;
}
