// Content for the /seo-myths game. Kept in lib/ (not inside the client
// component) so the page can also render every claim and answer as static
// HTML — a page about search that hides all its content behind JS would be
// its own punchline, and the static list is what earns the FAQ rich result.
//
// Each claim carries a `topic`, and the focus round ranks topics by how many
// the player got wrong. TOPICS below has to cover every topic used here.

export const TOPICS = {
  content: {
    label: 'Content depth',
    focus: 'Write fewer, better pages that answer a real question start to finish.',
    href: '/services/content-marketing',
  },
  local: {
    label: 'Local listings',
    focus: 'Claim your Google Business Profile and get your name, address, and phone identical everywhere.',
    href: '/services/technical-seo',
  },
  ai: {
    label: 'AI visibility',
    focus: 'Structure pages so ChatGPT and AI Overviews can quote you, not just crawl you.',
    href: '/services/geo',
  },
  technical: {
    label: 'Technical health',
    focus: 'Fix speed, crawl errors, and mobile problems before spending on anything else.',
    href: '/services/technical-seo',
  },
  authority: {
    label: 'Authority & links',
    focus: 'Earn mentions from sites people actually read — a handful beats a thousand cheap ones.',
    href: '/services/link-building',
  },
  measurement: {
    label: 'Measurement',
    focus: 'Track calls, forms, and revenue. Rankings on their own do not pay anyone.',
    href: '/services/cro',
  },
};

// `answer: 'myth'` means the claim as written is false.
// `verdict` is the one-line ruling; `detail` is the plain-language why.
export const MYTHS = [
  {
    id: 'blog-daily',
    topic: 'content',
    claim: 'Posting a blog every day helps you rank.',
    answer: 'myth',
    verdict: 'Volume is not the signal.',
    detail:
      'Google rewards pages that answer a question well, not pages that exist. Forty thin posts lose to four that genuinely settle the thing someone searched for. Daily publishing usually just means daily thin.',
  },
  {
    id: 'gbp-free',
    topic: 'local',
    claim: 'A free Google Business Profile can outperform your website for local searches.',
    answer: 'fact',
    verdict: 'Often it does.',
    detail:
      'For "near me" and service searches, the map results sit above the normal links. A complete profile with real photos, hours, services, and reviews can bring in more calls than the website it points to — and it costs nothing.',
  },
  {
    id: 'meta-keywords',
    topic: 'technical',
    claim: 'You should fill in the meta keywords tag.',
    answer: 'myth',
    verdict: 'Dead since 2009.',
    detail:
      'Google publicly stopped using the meta keywords tag over fifteen years ago. It does nothing now except show your target keywords to any competitor who views your page source.',
  },
  {
    id: 'ai-citations',
    topic: 'ai',
    claim: 'If you rank #1 in Google, ChatGPT will recommend you too.',
    answer: 'myth',
    verdict: 'Different systems, different rules.',
    detail:
      'AI assistants pull from what they were trained on and what they can retrieve and quote right now. Plenty of #1-ranking pages never get named in an AI answer because nothing on them is written as a quotable, self-contained statement.',
  },
  {
    id: 'more-links',
    topic: 'authority',
    claim: 'More backlinks always means better rankings.',
    answer: 'myth',
    verdict: 'Quality, not count.',
    detail:
      'One link from a publication your customers read outweighs a thousand from directories nobody visits. Bulk cheap links are the single fastest way to make a site look manipulated.',
  },
  {
    id: 'speed-matters',
    topic: 'technical',
    claim: 'How fast your site loads affects both rankings and sales.',
    answer: 'fact',
    verdict: 'Both, measurably.',
    detail:
      'Speed is a confirmed ranking signal, but the bigger effect is people leaving. A site that takes nine seconds on a phone loses most of its visitors before it finishes loading, and none of those people were going to call you.',
  },
  {
    id: 'duplicate-penalty',
    topic: 'content',
    claim: 'Google issues a penalty for duplicate content.',
    answer: 'myth',
    verdict: 'No penalty — but you still lose.',
    detail:
      'There is no duplicate content penalty. Google just picks one version to show and ignores the rest. The damage is real but indirect: your pages compete with each other and the wrong one usually wins.',
  },
  {
    id: 'nap-consistency',
    topic: 'local',
    claim: 'A wrong phone number on an old directory listing can cost you local rankings.',
    answer: 'fact',
    verdict: 'Consistency is a trust signal.',
    detail:
      'Search engines cross-check your name, address, and phone number across the web. When versions disagree, confidence in all of them drops — and a competitor with tidy listings moves above you.',
  },
  {
    id: 'schema-required',
    topic: 'ai',
    claim: 'Structured data helps AI tools understand and quote your pages.',
    answer: 'fact',
    verdict: 'It removes the guesswork.',
    detail:
      'Schema markup states plainly what a page is, who wrote it, and what it costs. That is exactly the kind of unambiguous fact an AI system will repeat, because it does not have to infer anything.',
  },
  {
    id: 'rankings-goal',
    topic: 'measurement',
    claim: 'Ranking #1 is the goal of SEO.',
    answer: 'myth',
    verdict: 'Ranking is a means, not the point.',
    detail:
      'You can rank first for something nobody buys. The number that matters is booked work. If your reporting stops at rankings and traffic, it is not telling you whether any of it made money.',
  },
  {
    id: 'seo-once',
    topic: 'measurement',
    claim: 'SEO is a one-time project you can finish.',
    answer: 'myth',
    verdict: 'Your competitors did not stop.',
    detail:
      'Rankings are relative. Even if your site never changed, competitors publishing and earning links will pass you, and search engines change how they work several times a year. Stopping is a slow decline, not a hold.',
  },
  {
    id: 'mobile-first',
    topic: 'technical',
    claim: 'Google decides your rankings based on the mobile version of your site.',
    answer: 'fact',
    verdict: 'Mobile-first indexing.',
    detail:
      'Google indexes the mobile version of your pages, for every site. If your phone layout hides content the desktop version shows, the hidden part is effectively the version that counts.',
  },
];

// Wrong answers are what the focus round ranks — see MythGame.js.
export const TOTAL_QUESTIONS = MYTHS.length;
