// Authored body copy for the nine service pages, keyed by service slug.
//
// Same block vocabulary and same voice as the city pages in lib/areas.js:
// headline, one bold line, a plain paragraph about who we do this for and who
// does it, the phone CTA, then "<X> We Provide" / "We can help you with:" /
// "Why Choose Gobiya SEO?". components/ContentBlocks.js renders both.
//
// Block types: h2, h3, h4, excerpt, p, list, button, cta.

export const SERVICE_BODIES = {
  seo: [
    { h2: 'Los Angeles SEO Services & On Page Optimization' },
    { excerpt: 'Turn Search Engine Rankings Into a Predictable Lead Engine for Your Business' },
    {
      p: 'Gobiya SEO provides premier Los Angeles SEO services for businesses across Southern California that want to dominate organic search results and convert traffic into sales. We operate as a specialized on page SEO agency, fixing crawl errors, internal links, and page architecture from the inside out. For small and medium business owners, our search strategies create a reliable lead pipeline that delivers peace of mind and sustainable ROI. For UI/UX designers, we build site structures that showcase visual excellence without technical bloat slowing down indexation. For in-house marketing managers, we deliver clear organic search metrics and ranking growth that make your monthly reports shine for leadership. We take pride in building long-term search dominance right here in Los Angeles.',
    },
    { cta: true },
    { button: { text: 'Get a FREE Site Audit' } },
    { h3: 'Los Angeles SEO Services We Provide' },
    {
      p: 'A high-performing website requires a seamlessly integrated technical and content foundation. At Gobiya SEO, our specialists handle every layer of your organic search presence—from deep code audits to AI search optimization.',
    },
    { h4: 'We can help you with:' },
    {
      list: [
        'Technical SEO audits and code cleanup',
        'On page SEO: title tags, headings, content, and internal links',
        'Site architecture and crawl path cleanup',
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
      p: 'Gobiya SEO has earned a reputation as a trusted search engine optimization partner for Los Angeles companies that demand real business results. Our on page SEO services cover every key landing page that brings in active buyers, not just the homepage.',
    },
    {
      p: 'What sets us apart is our commitment to transparent execution and measurable growth. Whether you need urgent penalty recovery, long-term technical maintenance, or a full site search audit, Gobiya SEO has you covered. Contact our expert team today and see how our search optimization strategies scale your revenue.',
    },
    { cta: true },
  ],

  geo: [
    { h2: 'AI & GEO Search Optimization in Los Angeles' },
    { excerpt: 'Make Your Brand the #1 Recommended Source in ChatGPT, Perplexity & Google AI' },
    {
      p: 'Gobiya SEO provides Generative Engine Optimization (GEO) for businesses ready to capture the next era of search visibility. AI assistants like ChatGPT and Perplexity pull direct answers from trusted sources rather than listing organic links. For business owners, GEO builds an automated recommendation engine that directs ready-to-buy customers straight to your business. For designers, GEO structures page layouts into scannable answer blocks that look stunning while providing structured entity signals. For in-house marketing managers, GEO establishes early dominance in AI search answers before competitors even realize the shift.',
    },
    { cta: true },
    { button: { text: 'Get a FREE Site Audit' } },
    { h3: 'GEO Services We Provide' },
    {
      p: 'AI search engine visibility depends on answer-first writing, structured schema data, and high brand entity trust. Our team structures your content to ensure AI models extract and credit your business by name.',
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
      p: 'Gobiya SEO leads the industry in AI search visibility, giving Los Angeles businesses a distinct competitive edge. We track actual model citations and prompt recommendations to prove your brand authority.',
    },
    {
      p: 'Whether you want your existing site restructured for machine readers or need high-converting AI content created from scratch, Gobiya SEO delivers. Reach out today to see how GEO positions your business as the default choice in AI search.',
    },
    { cta: true },
  ],

  'content-marketing': [
    { h2: 'Content Marketing & Strategy in Los Angeles' },
    { excerpt: 'Transform Search Demand Into a Compound Lead Engine That Ranks and Converts' },
    {
      p: 'Gobiya SEO delivers custom content marketing strategy and execution for businesses looking to scale organic authority. We map buyer intent and create search-driven topic clusters that answer user queries directly. For small business owners, our content strategy turns your blog into an active revenue driver. For designers, we format content assets into visually captivating layouts that keep readers engaged. For in-house marketing managers, our structured publishing schedule builds topical authority and delivers clear ROI metrics for executive leadership.',
    },
    { cta: true },
    { button: { text: 'Get a FREE Site Audit' } },
    { h3: 'Content Services We Provide' },
    {
      p: 'Content performs best when strategic intent, clean layout design, and technical schema align. At Gobiya SEO, we manage the entire publishing lifecycle from keyword research to performance tracking.',
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
      p: 'Gobiya SEO is a trusted content partner for Los Angeles brands that want high-value publishing tied directly to revenue. We eliminate fluff and produce authoritative copy engineered for search engine rankings and AI citations.',
    },
    {
      p: 'Whether you need a complete content strategy roadmap, regular publishing, or a overhaul of underperforming pages, Gobiya SEO provides expert execution. Contact our team today to build a content engine that drives long-term business growth.',
    },
    { cta: true },
  ],

  'link-building': [
    { h2: 'Digital PR & Link Building in Los Angeles' },
    { excerpt: 'Earn High-Authority Editorial Backlinks That Command Domain Respect' },
    {
      p: 'Gobiya SEO provides white-hat link building and digital PR services for brands seeking sustainable domain authority. We secure high-tier editorial placements in top publications through genuine press outreach. For small business owners, authoritative backlinks build a protective digital moat around your local search rankings. For creative design leaders, digital PR validates your brand reputation with press mentions. For in-house marketing managers, our white-hat outreach provides clean, high-DA backlinks that lift your entire site authority.',
    },
    { cta: true },
    { button: { text: 'Get a FREE Site Audit' } },
    { h3: 'Link Building Services We Provide' },
    {
      p: 'Sustainable domain authority requires a clean backlink profile earned from trustworthy media sources. We audit your inbound links, remove spam, and earn high-impact press mentions.',
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
      p: 'Gobiya SEO is the premier link building partner for Los Angeles businesses that value transparency and white-hat domain safety. We report on every earned placement so you see exact link equity gains.',
    },
    {
      p: 'Whether recovering from a search penalty, auditing an inherited profile, or launching a full digital PR campaign, Gobiya SEO delivers lasting domain authority. Contact us today to earn the backlinks your brand deserves.',
    },
    { cta: true },
  ],

  ppc: [
    { h2: 'PPC Management & Google Ads in Los Angeles' },
    { excerpt: 'Stop Ad Spend Leaks and Transform Google Ads Into a Profitable Lead Generator' },
    {
      p: 'Gobiya SEO offers hands-on PPC management for businesses that want maximum return on Google Ads spend. We eliminate wasted budget on broad-match terms and restructure campaigns around cost per booked client. For small business owners, our PPC strategies deliver a predictable, scalable stream of paid inquiries. For designers, we pair ad campaigns with high-converting custom landing pages. For in-house marketing managers, we provide precise conversion attribution metrics to prove marketing profitability to leadership.',
    },
    { cta: true },
    { button: { text: 'Get a FREE Site Audit' } },
    { h3: 'PPC Services We Provide' },
    {
      p: 'Paid search generates peak ROI when keywords, ad copy, and landing page UX work in harmony. Our team manages bidding, negative keyword pruning, and conversion tracking.',
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
      p: 'Gobiya SEO is a results-driven PPC agency trusted by Los Angeles business owners. We focus strictly on bottom-line numbers—qualified phone calls, lead forms, and customer acquisitions.',
    },
    {
      p: 'Whether rescuing a mismanaged ad account or scaling a new ad campaign, Gobiya SEO delivers month-to-month accountability without lock-in contracts. Contact us today for a free PPC account check.',
    },
    { cta: true },
  ],

  cro: [
    { h2: 'CRO & Web UX in Los Angeles' },
    { excerpt: 'Turn Existing Site Traffic Into Maximum Sales and Revenue' },
    {
      p: 'Gobiya SEO provides data-backed conversion rate optimization (CRO) for websites with visitors that fail to convert. We identify friction points using heatmaps and session recordings, then test targeted design fixes to lift conversion rates. For small business owners, CRO boosts sales revenue from existing traffic without spending more on ads. For designers, CRO validates layout decisions with real visitor data. For in-house marketing managers, CRO yields clear conversion lift numbers that demonstrate immediate campaign efficiency.',
    },
    { cta: true },
    { button: { text: 'Get a FREE Site Audit' } },
    { h3: 'CRO Services We Provide' },
    {
      p: 'Successful conversion rate optimization relies on behavioral data, continuous split-testing, and user experience design. We optimize every step of your lead funnel.',
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
      p: 'Gobiya SEO is a transparent CRO agency dedicated to boosting your site profitability. We base every recommendation on empirical user behavior data and statistical testing.',
    },
    {
      p: 'Whether fixing a leaky lead form or optimizing a complete ecommerce checkout flow, Gobiya SEO has you covered. Contact our conversion specialists today to unlock your website revenue potential.',
    },
    { cta: true },
  ],

  'web-ux': [
    { h2: 'Web UX & User Experience Design in Los Angeles' },
    { excerpt: 'Craft Intuitive, Mobile-First Interfaces That Guide Visitors Seamlessly to Conversion' },
    {
      p: 'Gobiya SEO provides specialized web UX design services for businesses looking to eliminate interface friction and improve user engagement. We combine behavioral psychology with modern visual UI design to create responsive, accessible web applications. For small business owners, intuitive UX increases customer retention and conversion rates. For UI/UX designers, our design systems establish a clean visual language with WCAG accessibility built-in. For in-house marketing managers, seamless UX reduces bounce rates and elevates digital brand metrics.',
    },
    { cta: true },
    { button: { text: 'Get a FREE Site Audit' } },
    { h3: 'Web UX Services We Provide' },
    {
      p: 'Great user experience bridges visual aesthetics and intuitive functionality. We conduct UX audits, map user flows, build wireframe prototypes, and refine touch interfaces.',
    },
    { h4: 'We can help you with:' },
    {
      list: [
        'Web UX audits and behavioral analysis',
        'Mobile-first UX and touch interface design',
        'Information architecture and wireframing',
        'WCAG accessibility and inclusion compliance',
        'Component design systems and visual UI',
        'User testing and friction removal',
        'Navigation and mega-menu structuring',
        'Analytics and usability reporting',
      ],
    },
    { h3: 'Why Choose Gobiya SEO?' },
    {
      p: 'Gobiya SEO is a premier user experience design agency in Los Angeles, committed to building visual digital products that users love. We focus on clarity, performance, and accessibility.',
    },
    {
      p: 'Whether redesigning an enterprise portal or refining a mobile web app, Gobiya SEO ensures every interaction feels natural and rewarding. Contact our UX team today for a free usability review.',
    },
    { cta: true },
  ],

  'web-dev': [
    { h2: 'Web Design & Development in Los Angeles' },
    { excerpt: 'Launch Blazingly Fast, Search-Ready Websites Engineered for Growth' },
    {
      p: 'Gobiya SEO provides Next.js and React web development for businesses that want a high-performance website built right from day one. We engineer site speed, mobile responsiveness, and technical SEO into the core build. For small business owners, this gives you a secure, search-ready site that generates leads without constant maintenance headaches. For designers, our component architecture brings custom visual designs to life without performance lag. For in-house marketing managers, clean dev handoffs and fast loading speeds ensure your marketing campaigns succeed immediately.',
    },
    { cta: true },
    { button: { text: 'Get a FREE Site Audit' } },
    { h3: 'Development Services We Provide' },
    {
      p: 'Modern web development connects clean code, server-side rendering, and technical search optimization. We build scalable digital experiences designed to rank and convert.',
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
      p: 'Gobiya SEO is a full-service web development partner that prioritizes search engine visibility and user experience in every line of code. We build custom websites designed to scale with your business.',
    },
    {
      p: 'Whether migrating platforms safely or building a custom web application, Gobiya SEO delivers engineering excellence. Contact our development team today to discuss your upcoming project.',
    },
    { cta: true },
  ],

  'ai-consulting': [
    { h2: 'AI Systems & Consulting in Los Angeles' },
    { excerpt: 'Practical AI Systems and Automations That Eliminate Friction and Boost Profit' },
    {
      p: 'Gobiya SEO provides AI consulting and systems integration for businesses looking to automate repetitive tasks and optimize workflows. We identify practical AI applications—such as automated intake, AI search setup, and reporting—that save real hours. For small business owners, AI automations streamline customer support and lead management so you can focus on core growth. For creative designers, AI tools speed up asset research without compromising artistic direction. For in-house marketing managers, tailored AI integrations eliminate operational bottlenecks and elevate team output.',
    },
    { cta: true },
    { button: { text: 'Get a FREE Site Audit' } },
    { h3: 'AI Services We Provide' },
    {
      p: 'AI generates maximum ROI when integrated into existing business systems. We review operational bottlenecks, scope custom automations, and build reliable AI workflows.',
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
      p: 'Gobiya SEO is a practical AI consulting partner focused on measurable efficiency gains and profit growth. We help you cut through vendor hype and implement AI tools that work.',
    },
    {
      p: 'Whether automating a single workflow or building custom AI search visibility infrastructure, Gobiya SEO delivers reliable systems. Contact us today for a free AI readiness consultation.',
    },
    { cta: true },
  ],
};
