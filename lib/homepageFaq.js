// Homepage FAQ. This single array feeds both the visible dl/dt/dd markup and
// the FAQPage JSON-LD in app/page.js, so the answer a person reads and the
// answer an AI tool ingests can never drift apart. Same pattern as
// lib/seoMyths.js.
//
// Answers are deliberately 40-70 words: long enough to stand alone as a cited
// passage, short enough that a model quotes it whole. Pricing figures must
// stay in sync with app/pricing/page.js — do not round or estimate them.

export const HOMEPAGE_FAQ = [
  {
    q: 'What does SEO cost in Los Angeles?',
    a: 'Most Los Angeles agencies charge somewhere between $1,000 and $10,000 a month, and the range is that wide because the work is. Our plans run $999 to $2,500 for Findable, $2,500 to $5,500 for Cited, and $5,500 to $10,000 and up for Chosen. What moves you up the range is the size of your site and how competitive your market already is.',
  },
  {
    q: 'What is generative engine optimization (GEO)?',
    a: 'GEO is the work of getting your business named in answers from AI tools like ChatGPT, Perplexity, Gemini and Google AI Overviews. Those tools do not hand back ten blue links for someone to pick through. They write one answer and cite a few sources. GEO is the work of becoming one of the sources they trust enough to name.',
  },
  {
    q: 'How is GEO different from SEO?',
    a: 'SEO earns you a spot on a page of results that a person then chooses from. GEO earns you a mention inside an answer the AI has already written for them. The two share a foundation: clean code, clear content, and real authority. But what ranks on Google and what AI tools actually cite have been drifting apart, so you need both.',
  },
  {
    q: 'How do I get my business cited by ChatGPT?',
    a: 'Answer the questions people actually ask, in plain language, on pages a crawler can read. Label your facts with schema so a model is not left guessing what they mean. Then earn mentions on sites that already carry authority, because AI tools lean on those to decide who is credible. There is no way to pay for a citation.',
  },
  {
    q: 'How long before I see results?',
    a: 'Technical fixes can show up within weeks. Rankings and AI citations for anything competitive usually take three to six months, and longer in a crowded market like Los Angeles. Anyone promising you the top of the results in thirty days is either chasing terms nobody searches for, or doing something that will cost you later.',
  },
  {
    q: 'Do you require a long-term contract?',
    a: 'No. There is no minimum term and no cancellation penalty, and you can stop at the end of any month. We would rather re-earn the work every month than hold you to a year you regret by month three. That arrangement only works if the results are visible to you, which is why you keep direct access to your own data.',
  },
  {
    q: 'Who actually does the work?',
    a: 'Steve Martin, who founded Gobiya in 2010. He runs the analysis, writes the strategy, and answers your email himself. There is no account manager in between and no handoff to a junior team once the pitch is over. That is also the honest limit on how many clients we take on at any one time.',
  },
  {
    q: 'Do you work with businesses outside Los Angeles?',
    a: 'Yes. Los Angeles is home and where most of our clients are, but search and AI visibility work is not tied to a map. We work with businesses across Southern California and remotely beyond it. If your situation genuinely needs someone on site on a regular basis, we will tell you that up front rather than after you sign.',
  },
];
