// Authored body copy for the eight service pages, keyed by service slug.
//
// Same block vocabulary and same voice as the city pages in lib/areas.js:
// headline, one bold line, a plain paragraph about who we do this for and who
// does it, the phone CTA, then "<X> We Provide" / "We can help you with:" /
// "Why Choose Gobiya SEO?". components/ContentBlocks.js renders both.
//
// Block types: h2, h3, h4, excerpt, p, list, button, cta.

export const SERVICE_BODIES = {
  seo: [
    { h2: 'Los Angeles SEO & Website Optimization' },
    { excerpt: 'Technical SEO, Local Search & Rankings in the Los Angeles Area' },
    {
      p: 'Gobiya SEO provides comprehensive search optimization for businesses across Los Angeles and Southern California. Our specialists are seasoned strategists and developers who go through your site the way Google does, fix what is stopping it from being read, and then build the rankings on top of a foundation that holds. Our team has spent years pulling sites out of ranking drops and putting them back at the top of the map pack. We are proud to do this work in our own city, for the businesses around us.',
    },
    { cta: true },
    { button: { text: 'Get a FREE Site Audit' } },
    { h3: 'SEO Services We Provide' },
    {
      p: 'A modern website is a network of connected systems that requires trained professionals to build, optimize, and repair. At Gobiya SEO, we are proud to field a team equipped to handle every part of your search presence, including the unglamorous technical work most agencies quietly skip.',
    },
    { h4: 'We can help you with:' },
    {
      list: [
        'Technical SEO audits and code cleanup',
        'On-page optimization and site architecture',
        'Local SEO and Google Business Profile management',
        'Google Maps and map pack placement',
        'Schema markup and indexation repair',
        'E-commerce and enterprise search optimization',
        'Ranking recovery after an algorithm update',
        'Analytics, tracking, and performance reporting',
      ],
    },
    { h3: 'Why Choose Gobiya SEO?' },
    {
      p: 'Gobiya SEO has built a reputation as a dependable, trusted search partner for Los Angeles businesses that need to be found. Backed by a team of highly trained and experienced specialists, we report the numbers that matter to an owner — calls, bookings, and revenue, not vanity rankings.',
    },
    {
      p: 'What separates us from the competition is our commitment to quality execution. Whether you need an urgent fix after a ranking drop, ongoing content and technical maintenance, or a full site rebuild and migration, Gobiya SEO has you covered. Contact our team today and see our client service and technical expertise for yourself.',
    },
    { cta: true },
  ],

  geo: [
    { h2: 'AI & GEO Search Optimization in Los Angeles' },
    { excerpt: 'Getting Your Business Named by ChatGPT, Perplexity & Google AI' },
    {
      p: 'Gobiya SEO provides complete generative engine optimization for businesses that are losing customers to AI answers they never appear in. Our specialists are strategists and writers who structure your pages so the assistants can actually read, quote, and credit them by name. Our team has spent years tracking which pages get cited and which get ignored, and building the difference into client sites. We are proud to work on the part of search that most agencies are still pretending is not happening.',
    },
    { cta: true },
    { button: { text: 'Get a FREE Site Audit' } },
    { h3: 'GEO Services We Provide' },
    {
      p: 'AI visibility depends on how your content is written, how it is structured, and how much the models trust the source. At Gobiya SEO, we are proud to field a team equipped to handle every part of that, from answer-first writing to the schema and entity work behind it.',
    },
    { h4: 'We can help you with:' },
    {
      list: [
        'AI-ready content built to be quoted',
        'Answer-first writing and question research',
        'FAQ, comparison, and prompt-mapped pages',
        'Schema markup and entity building',
        'Knowledge graph and brand mention signals',
        'AI crawler access and llms.txt setup',
        'Citation tracking across ChatGPT, Perplexity, and AI Overviews',
        'Analytics and performance reporting',
      ],
    },
    { h3: 'Why Choose Gobiya SEO?' },
    {
      p: 'Gobiya SEO has built a reputation as a trusted partner for businesses that want to be named when a customer asks an AI assistant instead of typing a search. Backed by a team of skilled, experienced specialists, we show you the citations, not a slide about the future of search.',
    },
    {
      p: 'What separates us from the competition is our commitment to quality execution. Whether you are invisible in AI answers today, need ongoing content built to be cited, or want your whole site restructured for machine readers, Gobiya SEO has you covered. Contact our team today and see our client service and technical depth for yourself.',
    },
    { cta: true },
  ],

  'content-marketing': [
    { h2: 'Content Marketing & Strategy in Los Angeles' },
    { excerpt: 'Content Built From Real Search Demand, Not a Calendar' },
    {
      p: 'Gobiya SEO provides full-service content strategy for businesses that are publishing steadily and still not getting found. Our specialists are writers and strategists who start with what people are actually searching for, then write pages meant to answer it and earn the click. Our team has spent years turning quiet blogs into a dependable source of leads. We are proud to write for real businesses with real customers, not for a word count.',
    },
    { cta: true },
    { button: { text: 'Get a FREE Site Audit' } },
    { h3: 'Content Services We Provide' },
    {
      p: 'Content only performs when the topic, the structure, and the technical setup all line up. At Gobiya SEO, we are proud to field a team of strategists, writers, and developers equipped to handle every part of the process from research to publication.',
    },
    { h4: 'We can help you with:' },
    {
      list: [
        'Search intent research and keyword mapping',
        'Content strategy and editorial planning',
        'Topic clusters and pillar pages',
        'AI-ready content and citation formatting',
        'Website copywriting and landing pages',
        'On-page structure and schema',
        'Content gap analysis against your competitors',
        'Analytics and performance reporting',
      ],
    },
    { h3: 'Why Choose Gobiya SEO?' },
    {
      p: 'Gobiya SEO has built a reputation as a dependable content partner for Los Angeles businesses that are tired of paying for posts nobody reads. Backed by a team of skilled, experienced specialists, we tie every piece we publish to a search someone is already making.',
    },
    {
      p: 'What separates us from the competition is our commitment to quality execution. Whether you need a strategy from scratch, steady monthly publishing, or a full rewrite of pages that never performed, Gobiya SEO has you covered. Contact our team today and see our client service and technical expertise for yourself.',
    },
    { cta: true },
  ],

  'link-building': [
    { h2: 'Digital PR & Link Building in Los Angeles' },
    { excerpt: 'Earned Mentions & White-Hat Authority for Your Domain' },
    {
      p: 'Gobiya SEO provides white-hat link building and digital PR for businesses that need authority they can keep. Our specialists are strategists and outreach writers who earn placements the slow way — real stories, real editors, real publications. Our team has spent years cleaning up after cheap link packages and rebuilding profiles that Google and AI tools will trust again. We are proud to do this the way that still works a year later.',
    },
    { cta: true },
    { button: { text: 'Get a FREE Site Audit' } },
    { h3: 'Link Building Services We Provide' },
    {
      p: 'Authority is earned across your whole profile, not bought one link at a time. At Gobiya SEO, we are proud to field a team equipped to audit what you have, remove what is hurting you, and earn the mentions that move the needle.',
    },
    { h4: 'We can help you with:' },
    {
      list: [
        'Editorial link building and outreach',
        'Digital PR and story placement',
        'Backlink profile audits',
        'Toxic link cleanup and disavow',
        'Penalty and manual action recovery',
        'Competitor link gap analysis',
        'Anchor text and authority strategy',
        'Analytics and performance reporting',
      ],
    },
    { h3: 'Why Choose Gobiya SEO?' },
    {
      p: 'Gobiya SEO has built a reputation as a trusted authority partner for businesses that have been burned by link sellers before. Backed by a team of skilled, experienced specialists, we show you every placement we earn and every link we remove.',
    },
    {
      p: 'What separates us from the competition is our commitment to quality execution. Whether you are recovering from a penalty, cleaning up a profile you inherited, or building authority in a competitive market from scratch, Gobiya SEO has you covered. Contact our team today and see our client service and technical depth for yourself.',
    },
    { cta: true },
  ],

  ppc: [
    { h2: 'PPC Management & Google Ads in Los Angeles' },
    { excerpt: 'Paid Search Rebuilt Around What a Booked Job Actually Costs' },
    {
      p: 'Gobiya SEO provides hands-on PPC management for businesses spending real money on Google Ads and not seeing it come back. Our specialists rebuild campaigns around cost per booked job instead of cost per click, then keep testing until the number comes down. Our team has spent years auditing accounts that were quietly burning budget on the wrong searches. We are proud to run ads we would be comfortable paying for ourselves.',
    },
    { cta: true },
    { button: { text: 'Get a FREE Site Audit' } },
    { h3: 'PPC Services We Provide' },
    {
      p: 'Paid search only works when the campaign, the keywords, and the page they land on all agree with each other. At Gobiya SEO, we are proud to field a team equipped to handle the whole chain rather than just the bidding.',
    },
    { h4: 'We can help you with:' },
    {
      list: [
        'Google Ads audits and campaign rebuilds',
        'Keyword and negative keyword management',
        'Landing page builds and testing',
        'Conversion tracking and call tracking setup',
        'Bid strategy and budget control',
        'Creative and ad copy testing',
        'Local service ads and lead generation',
        'Analytics and performance reporting',
      ],
    },
    { h3: 'Why Choose Gobiya SEO?' },
    {
      p: 'Gobiya SEO has built a reputation as a dependable paid search partner for Los Angeles businesses that want accountability for every dollar. Backed by a team of skilled, experienced specialists, we report on leads and revenue, not impressions.',
    },
    {
      p: 'What separates us from the competition is our commitment to quality execution. Whether you need an account rescued, a campaign built from scratch, or steady month-to-month management with no long-term contract, Gobiya SEO has you covered. Contact our team today and see our client service and technical expertise for yourself.',
    },
    { cta: true },
  ],

  cro: [
    { h2: 'CRO & Web UX in Los Angeles' },
    { excerpt: 'Turning the Traffic You Already Have Into Customers' },
    {
      p: 'Gobiya SEO provides conversion rate optimization for businesses that have visitors but not enough leads. Our specialists are analysts and designers who find the exact point where people hesitate and leave, fix it, and then prove the fix with real numbers. Our team has spent years finding the leaks that more traffic would never have solved. We are proud to be the ones who tell a client to spend less on ads and fix the page instead.',
    },
    { cta: true },
    { button: { text: 'Get a FREE Site Audit' } },
    { h3: 'CRO Services We Provide' },
    {
      p: 'Conversion work is measurement first and opinion never. At Gobiya SEO, we are proud to field a team equipped to instrument your site properly, form a real hypothesis, and test it rather than redesign on a hunch.',
    },
    { h4: 'We can help you with:' },
    {
      list: [
        'Conversion audits and funnel analysis',
        'A/B and multivariate testing',
        'Landing page and form optimization',
        'Checkout and lead flow repair',
        'Heatmaps, session recording, and analytics setup',
        'Mobile and page speed conversion fixes',
        'UX and interface design',
        'Analytics and performance reporting',
      ],
    },
    { h3: 'Why Choose Gobiya SEO?' },
    {
      p: 'Gobiya SEO has built a reputation as a conversion partner that reports honestly, including when a test does not win. Backed by a team of skilled, experienced specialists, we focus on the numbers an owner feels — calls, bookings, and sales.',
    },
    {
      p: 'What separates us from the competition is our commitment to quality execution. Whether you need a single page fixed, a full funnel rebuilt, or ongoing testing month to month, Gobiya SEO has you covered. Contact our team today and see our client service and technical depth for yourself.',
    },
    { cta: true },
  ],

  'web-dev': [
    { h2: 'Web Design & Development in Los Angeles' },
    { excerpt: 'Fast, Search-Ready Websites Built to Be Found' },
    {
      p: 'Gobiya SEO provides website design, development, and migration for businesses that need a site built right the first time. Our specialists are developers who have spent years fixing search problems created during a build, so we make those decisions the right way round from the start. Our team handles everything from a five-page local site to a thousand-URL migration without losing the rankings you already earned. We are proud to hand over sites that do not need rescuing six months later.',
    },
    { cta: true },
    { button: { text: 'Get a FREE Site Audit' } },
    { h3: 'Development Services We Provide' },
    {
      p: 'A modern website is a set of connected systems that requires trained professionals to build, optimize, and maintain. At Gobiya SEO, we are proud to field a team equipped to handle every part of your build, including the search and performance work that decides whether it ever ranks.',
    },
    { h4: 'We can help you with:' },
    {
      list: [
        'Website design and redesign',
        'Next.js and React builds',
        'Platform migrations without losing rankings',
        'Core Web Vitals and page speed work',
        'Component and design systems',
        'Hosting, infrastructure, and integrations',
        'Technical SEO review before launch',
        'Ongoing maintenance and monitoring',
      ],
    },
    { h3: 'Why Choose Gobiya SEO?' },
    {
      p: 'Gobiya SEO has built a reputation as a development partner that thinks about search from the first sketch rather than after launch. Backed by a team of skilled, experienced specialists, we build sites our own SEO team is willing to stand behind.',
    },
    {
      p: 'What separates us from the competition is our commitment to quality execution. Whether you need a new site, a rebuild that keeps your rankings intact, or an urgent fix on a build someone else left behind, Gobiya SEO has you covered. Contact our team today and see our client service and technical expertise for yourself.',
    },
    { cta: true },
  ],

  'ai-consulting': [
    { h2: 'AI Systems & Consulting in Los Angeles' },
    { excerpt: 'Practical AI for Your Business, Not a Pitch Deck' },
    {
      p: 'Gobiya SEO provides AI consulting for business owners being sold an AI feature by every vendor they talk to. Our specialists will tell you plainly which ones are worth the money, then build the handful that are. Our team has spent years wiring AI into real workflows — intake, follow-up, reporting — where it saves actual hours. We are proud to be the people who talk clients out of the tools they do not need.',
    },
    { cta: true },
    { button: { text: 'Get a FREE Site Audit' } },
    { h3: 'AI Services We Provide' },
    {
      p: 'AI only pays off when it is pointed at a real bottleneck and connected to the systems you already run. At Gobiya SEO, we are proud to field a team equipped to review what you have, scope what is worth doing, and build and maintain it.',
    },
    { h4: 'We can help you with:' },
    {
      list: [
        'AI readiness reviews and vendor assessment',
        'Workflow and process automation',
        'Chatbot and assistant setup',
        'AI search and visibility infrastructure',
        'MCP servers and API integrations',
        'Data preparation and knowledge bases',
        'Staff training and documentation',
        'Ongoing monitoring and support',
      ],
    },
    { h3: 'Why Choose Gobiya SEO?' },
    {
      p: 'Gobiya SEO has built a reputation as an AI partner that measures results instead of selling hype. Backed by a team of skilled, experienced specialists, we scope work against hours saved and revenue earned.',
    },
    {
      p: 'What separates us from the competition is our commitment to quality execution. Whether you need an honest review of the tools you are paying for, a single workflow automated, or a full AI setup built and maintained, Gobiya SEO has you covered. Contact our team today and see our client service and technical depth for yourself.',
    },
    { cta: true },
  ],
};
