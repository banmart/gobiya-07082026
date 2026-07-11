export const SERVICES = {
  'seo-discoverability': {
    slug: 'seo-discoverability',
    pillar: 'Performance',
    title: 'SEO & Discoverability',
    metaDescription:
      'Technical SEO and algorithm-recovery services from Gobiya: fix crawlability, structured data, and Core Web Vitals so search engines and AI crawlers can actually read your site.',
    heroLines: ['Technical SEO:', 'Eligible by design.'],
    lede: 'If a crawler can’t fetch and render your page, no amount of <a href="/services/seo-web-copywriting">content</a> or <a href="/services/authority-link-building">link building</a> will save it. We fix the technical foundation first, then build the indexation and structured-data layer that makes the rest of your search strategy actually work.',
    problem: {
      eyebrow: 'The problem',
      statement: 'A site can look finished and still be functionally invisible — blocked crawl paths, blank-page JavaScript rendering, and missing schema quietly capping traffic no matter how much content gets published on top of it.',
    },
    capabilities: [
      { tag: 'Rendering', title: 'Server-side rendering', desc: 'We fix client-side-only React/JS sites that deliver a blank page to crawlers, replacing them with SSR or static generation that ships full HTML.' },
      { tag: 'Recovery', title: 'Algorithm & penalty recovery', desc: 'We diagnose whether a traffic drop is an algorithmic filter or a manual action, and build the specific recovery plan each requires.' },
      { tag: 'Schema', title: 'Structured data', desc: 'Clean JSON-LD for Organization, LocalBusiness, Service, and FAQ types — the same markup AI systems use to verify what your business actually is.' },
      { tag: 'Speed', title: 'Core Web Vitals', desc: 'LCP, CLS, and TTFB tuned to pass Google’s thresholds natively, without a plugin stack fighting itself.' },
    ],
    process: [
      { step: '01', title: 'Technical audit', desc: 'Full crawl and render test — what Googlebot and GPTBot actually see, not what the browser shows you.' },
      { step: '02', title: 'Fix the foundation', desc: 'Rendering, indexation, and crawl-budget issues resolved before anything else is touched.' },
      { step: '03', title: 'Structured data & IA', desc: 'Schema markup and information architecture built to map cleanly to how your industry is actually searched.' },
      { step: '04', title: 'Verify & monitor', desc: 'Search Console verification, ongoing crawl monitoring, and a clear record of what changed and when.' },
    ],
    faqs: [
      { q: 'How do we know if our traffic drop is an algorithm update or something we did?', a: 'We check the drop date against known Google update rollouts, look at which page types and query categories lost traffic, and check Search Console for manual action notices. Algorithmic drops tend to hit broad content categories at once; manual actions come with an explicit notice and usually follow a specific violation.' },
      { q: 'Our developer says the site is fast. Why isn’t it ranking?', a: '"Fast" in a browser and "readable" to a crawler are different things. A site can score well on PageSpeed and still deliver an empty div to a crawler if content loads entirely client-side. We test with the same rendering methods search and AI crawlers use, not just a Lighthouse score.' },
      { q: 'Do we need to rebuild our whole site to fix this?', a: 'Usually not. Most technical SEO problems are fixable without a rebuild — rendering configuration, schema injection, and crawl-path fixes can typically be layered onto an existing codebase. A <a href="/services/web-app-development">full rebuild</a> is only the right call when the underlying platform genuinely can’t support server-side rendering.' },
    ],
    ctaTitle: 'Find out what’s actually capping your traffic.',
  },

  'geo-ai-content-writing': {
    slug: 'geo-ai-content-writing',
    pillar: 'Creativity',
    title: 'GEO & AI Content Writing',
    metaDescription:
      'GEO and AI content writing from Gobiya: content engineered to be cited by ChatGPT, Perplexity, and Google AI Overviews, not just ranked in blue links.',
    heroLines: ['GEO content:', 'Written to be quoted.'],
    lede: '<a href="/ai-visibility">AI answer engines</a> don’t reward marketing copy — they extract and quote direct, well-structured answers. We write content around the exact questions your buyers ask an AI assistant, so your page is the one it pulls from.',
    problem: {
      eyebrow: 'The problem',
      statement: 'Most web copy is written to persuade a human reader scrolling a page — not to be parsed and quoted by a language model looking for a direct, well-sourced answer to a specific question.',
    },
    capabilities: [
      { tag: 'Structure', title: 'Answer-first writing', desc: 'Direct, extractable answers placed where AI systems look for them, backed by the supporting detail that earns trust.' },
      { tag: 'Research', title: 'Prompt-mapped content', desc: 'Content built around the real prompts buyers run in ChatGPT and Perplexity, not just Google keyword volume.' },
      { tag: 'Format', title: 'FAQ & comparison pages', desc: 'The page formats AI systems cite most reliably — clear questions, direct answers, structured comparisons.' },
      { tag: 'Voice', title: 'SEO-mapped web copy', desc: 'Core site and service pages written to rank and convert, not just fill space around a keyword.' },
    ],
    process: [
      { step: '01', title: 'Prompt & query research', desc: 'What buyers actually ask AI platforms and Google about your category, mapped by intent.' },
      { step: '02', title: 'Content architecture', desc: 'A page structure that answers the core question fast, then earns the click with real depth.' },
      { step: '03', title: 'Write & structure', desc: 'Drafted, edited, and marked up so both readers and language models can parse it cleanly.' },
      { step: '04', title: 'Track citations', desc: 'We monitor whether the content is actually being cited in AI answers, not just indexed.' },
    ],
    faqs: [
      { q: 'Is this just SEO copywriting with a new name?', a: 'It shares the same foundation as our <a href="/services/seo-web-copywriting">SEO &amp; web copywriting</a> work — clear, well-structured, genuinely useful writing — but GEO adds a layer specific to how language models extract information: direct answers near the top, explicit structure, and framing that’s easy to quote verbatim without losing meaning.' },
      { q: 'Can you rewrite our existing content instead of starting from scratch?', a: 'In most cases, yes. A lot of underperforming content already has the right underlying information — it just needs restructuring around a direct answer and cleaner formatting. We audit existing pages first and only recommend a full rewrite when the content itself is thin.' },
      { q: 'How do you measure whether this is working?', a: 'We track two things: traditional rankings and impressions, and direct citation appearances — <a href="/insights/get-cited-by-chatgpt-perplexity-ai-overviews">running your target prompts against ChatGPT, Perplexity, and Google AI Overviews</a> on a regular cadence to see whether your pages are actually being cited.' },
    ],
    ctaTitle: 'Write content an AI actually wants to quote.',
  },

  'authority-link-building': {
    slug: 'authority-link-building',
    pillar: 'Relations',
    title: 'Authority & Link Building',
    metaDescription:
      'Authority and link building from Gobiya: white-hat editorial outreach and citation cleanup that build the domain trust search engines and AI systems use to decide who to cite.',
    heroLines: ['Authority:', 'Earned, not bought.'],
    lede: 'Search engines and AI knowledge graphs use backlinks and citations as votes of confidence. We run manual, editorial outreach to real publications — not automated link packages — and clean up the <a href="/industries/local-service">citation inconsistencies</a> that quietly undermine local trust.',
    problem: {
      eyebrow: 'The problem',
      statement: 'Cheap, bulk-purchased backlinks and inconsistent business listings don’t just fail to help — they actively signal untrustworthiness to the same systems now deciding who gets cited by AI.',
    },
    capabilities: [
      { tag: 'Outreach', title: 'Editorial link acquisition', desc: 'Manual outreach to real, relevant publications — links an editor chose to place because the content was worth linking to.' },
      { tag: 'Citations', title: 'NAP consistency', desc: 'Name, address, and phone number synced across every directory and platform search engines cross-reference for local trust.' },
      { tag: 'Cleanup', title: 'Toxic link audits', desc: 'Historical backlink profiles audited and disavowed where past campaigns left spam or PBN links behind.' },
      { tag: 'Entities', title: 'Knowledge graph mapping', desc: 'Aligning your brand with the verified entities Google and AI systems already trust, so citations reinforce rather than fragment your authority.' },
    ],
    process: [
      { step: '01', title: 'Backlink & citation audit', desc: 'Full profile review to flag spam risk and inconsistent local citations.' },
      { step: '02', title: 'Outreach strategy', desc: 'Target publications and editorial angles researched and pitched for natural, contextual placements.' },
      { step: '03', title: 'NAP cleanup', desc: 'Directory listings claimed, corrected, and locked to a single source of truth.' },
      { step: '04', title: 'Monitor & protect', desc: 'Ongoing tracking of new links and citations, with disavow action if negative SEO risk appears.' },
    ],
    faqs: [
      { q: 'We were told we need more backlinks, but also that the wrong kind can hurt us. How do we tell the difference?', a: 'The test is editorial context: would a real reader find this link useful, on a page that exists for reasons other than selling links? A placement from a genuine industry publication passes. A link from a site that exists purely as a link marketplace, or from a network of sites cross-linking each other, is the kind that risks a penalty.' },
      { q: 'Does link building actually affect AI citations, not just Google rankings?', a: 'Yes — AI systems weight source trust heavily, and backlink and citation profiles are one of the clearest trust signals available on the open web. A site with a clean, editorially-earned link profile is more likely to be treated as a credible source by both Google and AI answer engines.' },
      { q: 'We think a past agency built bad links for us. Can that be fixed?', a: 'Usually, yes. We audit the existing profile, identify likely offenders, and <a href="/insights/toxic-backlinks-disavow-guide">build a disavow file</a> for submission to Google Search Console. If a manual action is attached, we document the cleanup and file a reconsideration request. Recovery timelines typically run six to twelve weeks from audit to visible movement.' },
    ],
    ctaTitle: 'Build authority that holds up to scrutiny.',
  },

  'web-app-development': {
    slug: 'web-app-development',
    pillar: 'Performance',
    title: 'Web & App Development',
    metaDescription:
      'Custom React and Next.js development from Gobiya: sites and apps built server-rendered and SEO-native from the first commit, not retrofitted after launch.',
    heroLines: ['Built to rank', 'from the first commit.'],
    lede: 'Most sites lose their SEO fight before marketing ever gets involved — the framework choice, the rendering strategy, the URL structure. We build custom React and Next.js sites and apps with search and <a href="/ai-visibility">AI visibility</a> engineered in from the architecture up.',
    problem: {
      eyebrow: 'The problem',
      statement: 'Agencies hand off a beautiful site that a crawler can barely read, then blame SEO for the traffic that never arrives — the damage was done in the tech stack decision, months before launch.',
    },
    capabilities: [
      { tag: 'Framework', title: 'Next.js & React builds', desc: 'Server-rendered or statically generated by default, so every page ships real HTML a crawler can index on the first pass.' },
      { tag: 'Migration', title: 'Platform migrations', desc: 'Moving off WordPress, Wix, or a legacy CMS without losing rankings — redirect maps, URL parity, and crawl monitoring built into the plan.' },
      { tag: 'Systems', title: 'Component & design systems', desc: 'Reusable, accessible components that keep new pages consistent and fast to ship without a developer for every edit.' },
      { tag: 'Performance', title: 'Infrastructure & hosting', desc: 'Deployment, caching, and CDN configuration tuned for Core Web Vitals, not just uptime.' },
    ],
    process: [
      { step: '01', title: 'Technical & SEO discovery', desc: 'Current stack, rankings, and traffic audited before a line of code changes, so nothing is lost in the rebuild.' },
      { step: '02', title: 'Architecture & IA', desc: 'URL structure, rendering strategy, and information architecture mapped to how the business is actually searched.' },
      { step: '03', title: 'Build', desc: 'Custom Next.js development, component by component, with structured data and metadata handled at the template level.' },
      { step: '04', title: 'Launch & monitor', desc: 'Redirect verification, crawl monitoring, and a 30-day watch on rankings and indexation after go-live.' },
    ],
    faqs: [
      { q: 'Will rebuilding our site hurt our current rankings?', a: 'Only if it’s handled carelessly. The risk isn’t the rebuild itself — it’s losing URL parity, redirects, or content in the process. We map every existing URL to its new destination and verify indexation post-launch specifically to prevent that.' },
      { q: 'Why Next.js instead of WordPress or a page builder?', a: 'Page builders trade long-term performance and control for short-term speed of setup. Next.js gives us server-side rendering, precise control over <a href="/insights/core-web-vitals-2026">Core Web Vitals</a>, and a codebase that scales cleanly as the site grows — without a plugin stack working against itself.' },
      { q: 'Do you handle ongoing development after launch, or just the initial build?', a: 'Both. Most clients move to a lighter ongoing arrangement after launch — new pages, features, and fixes — rather than a large dev team, since the system is built to be extended without a rebuild.' },
    ],
    ctaTitle: 'Build the site your SEO strategy can actually stand on.',
  },

  'google-ads-ppc': {
    slug: 'google-ads-ppc',
    pillar: 'Performance',
    title: 'Google Ads & PPC',
    metaDescription:
      'Google Ads management from Gobiya, rebuilt around cost per lead: campaign structure, negative keywords, and landing pages that turn ad spend into booked business.',
    heroLines: ['Ad spend,', 'accountable to leads.'],
    lede: 'Most Google Ads accounts are optimized for clicks, not booked business. We rebuild campaign structure, negative keyword lists, and landing pages around a single number that matters — <a href="/outcomes/sales">cost per lead</a> that actually converts.',
    problem: {
      eyebrow: 'The problem',
      statement: 'Broad match keywords, thin negative lists, and a landing page that doesn’t match search intent quietly burn budget on clicks that were never going to become customers.',
    },
    capabilities: [
      { tag: 'Structure', title: 'Campaign rebuilds', desc: 'Tight ad groups, precise match types, and a negative keyword list maintained weekly to cut waste at the source.' },
      { tag: 'Conversion', title: 'Landing page alignment', desc: 'Pages built or rebuilt to match search intent exactly, so the click and the page make the same promise.' },
      { tag: 'Tracking', title: 'Conversion & call tracking', desc: 'Full-funnel tracking wired to actual bookings and calls, not just form fills, so budget follows real revenue.' },
      { tag: 'Testing', title: 'Bid & creative testing', desc: 'Ongoing testing of bid strategy, ad copy, and extensions against cost-per-lead, not click-through rate alone.' },
    ],
    process: [
      { step: '01', title: 'Account audit', desc: 'Full review of current spend, keyword quality, and where budget is leaking against low-intent traffic.' },
      { step: '02', title: 'Rebuild structure', desc: 'Campaigns and ad groups restructured around intent, with negative keywords applied immediately.' },
      { step: '03', title: 'Align landing pages', desc: 'Pages built or adjusted to match the exact promise of each ad, closing the gap between click and conversion.' },
      { step: '04', title: 'Optimize to cost per lead', desc: 'Ongoing bid, budget, and creative decisions made against cost per booked lead, reported monthly.' },
    ],
    faqs: [
      { q: 'Our click-through rate is good — why is cost per lead still high?', a: 'Click-through rate measures whether an ad is compelling, not whether the traffic converts. High CTR with high cost per lead usually points to broad match keywords pulling in low-intent clicks, or a landing page that doesn’t follow through on what the ad promised.' },
      { q: 'How much should we be spending on Google Ads?', a: 'It depends on your margin per customer and current cost per lead, not a rule of thumb. We typically start with a rebuild on existing budget to prove cost-per-lead improvement before recommending any increase in spend.' },
      { q: 'Do you handle both the ads and the landing pages?', a: 'Yes — that alignment is usually where the biggest gains come from, and it overlaps directly with our <a href="/services/cro-ux">CRO &amp; UX analysis</a> work. A well-run campaign sending traffic to a generic homepage still underperforms; matching the landing page to the ad’s specific promise is often the single highest-leverage fix.' },
    ],
    ctaTitle: 'Rebuild your ad account around cost per lead, not clicks.',
  },

  'cro-ux': {
    slug: 'cro-ux',
    pillar: 'Performance',
    title: 'CRO & UX Analysis',
    metaDescription:
      'Conversion rate optimization and UX analysis from Gobiya: find where visitors drop off and fix the specific friction costing you bookings and sales.',
    heroLines: ['More traffic', 'won’t fix a leaky page.'],
    lede: '<a href="/outcomes/rankings">Ranking higher</a> and driving <a href="/outcomes/traffic">more traffic</a> doesn’t matter if visitors land, hesitate, and leave. We analyze behavior, identify the specific point of friction, and fix the page — not with a generic best-practices checklist, but with changes tied to how your actual visitors behave.',
    problem: {
      eyebrow: 'The problem',
      statement: 'Traffic goes up, conversions stay flat, and nobody can point to why — because the site was never actually watched, just assumed to be working.',
    },
    capabilities: [
      { tag: 'Analysis', title: 'Behavior & heatmap review', desc: 'Session recordings and heatmaps reviewed to find exactly where visitors hesitate, scroll away, or abandon a form.' },
      { tag: 'Testing', title: 'A/B & multivariate testing', desc: 'Structured tests on headlines, CTAs, and page layout, measured against actual conversions, not opinions.' },
      { tag: 'Forms', title: 'Form & funnel optimization', desc: 'Multi-step forms, field count, and friction points rebuilt around the fewest steps to a completed lead.' },
      { tag: 'Mobile', title: 'Mobile UX audits', desc: 'Mobile-specific friction — tap targets, load speed, layout shift — audited separately from desktop, since most traffic starts there.' },
    ],
    process: [
      { step: '01', title: 'Behavior audit', desc: 'Heatmaps, session recordings, and funnel drop-off reviewed against real visitor behavior.' },
      { step: '02', title: 'Identify friction', desc: 'Specific points of hesitation and abandonment isolated and prioritized by conversion impact.' },
      { step: '03', title: 'Test changes', desc: 'Targeted A/B tests run on the highest-impact pages, not a full redesign speculatively.' },
      { step: '04', title: 'Roll out & monitor', desc: 'Winning variants shipped permanently, with ongoing monitoring as traffic and behavior shift.' },
    ],
    faqs: [
      { q: 'How is this different from just redesigning the site?', a: 'A redesign changes everything at once, which makes it impossible to know what actually improved conversions. CRO changes one thing at a time, measures the result against real behavior data, and only keeps what provably works.' },
      { q: 'How long before we see results from CRO?', a: 'Meaningful tests need enough traffic to reach statistical confidence, which typically takes two to four weeks per test depending on your traffic volume. We prioritize the highest-traffic, highest-friction pages first so early wins come faster.' },
      { q: 'Do you need a certain amount of traffic for this to work?', a: 'Lower-traffic sites can still benefit from heatmap and session-recording analysis and structural fixes — formal A/B testing just takes longer to reach confidence. We adjust the approach to what your traffic volume can actually support.' },
    ],
    ctaTitle: 'Find out where your site is losing customers.',
  },

  'ai-llm-consulting': {
    slug: 'ai-llm-consulting',
    pillar: 'Performance',
    title: 'AI & LLM Systems Consulting',
    metaDescription:
      'AI and LLM systems consulting from Gobiya: practical guidance on integrating AI search, chatbots, and automation into your marketing and operations stack.',
    heroLines: ['AI, applied —', 'not just discussed.'],
    lede: 'Every vendor is pitching an AI feature right now, and most of it doesn’t hold up past the demo. We help you separate what’s actually useful — AI-assisted content workflows, <a href="/ai-visibility">search integrations</a>, internal automation — from what’s a distraction, and implement the parts that are worth it.',
    problem: {
      eyebrow: 'The problem',
      statement: 'Leadership is under pressure to “do something with AI,” and most of what gets bought in response is either redundant with existing tools or built on a use case that was never actually validated.',
    },
    capabilities: [
      { tag: 'Strategy', title: 'AI readiness assessment', desc: 'A clear-eyed audit of where AI genuinely improves your marketing or operations, and where it’s a solution looking for a problem.' },
      { tag: 'Search', title: 'AI search & visibility integration', desc: 'Connecting your content and technical SEO strategy to how AI Overviews, ChatGPT, and Perplexity actually surface answers.' },
      { tag: 'Automation', title: 'Workflow automation', desc: 'Practical automation of content, reporting, and internal workflows using LLM tooling that fits your existing stack.' },
      { tag: 'Chat', title: 'Chatbot & assistant implementation', desc: 'Customer-facing AI assistants scoped to what they can reliably do, trained on your actual content and offerings.' },
    ],
    process: [
      { step: '01', title: 'Readiness assessment', desc: 'Current tools, workflows, and content reviewed to identify realistic, high-value AI use cases.' },
      { step: '02', title: 'Prioritize & scope', desc: 'Use cases ranked by effort and impact, with a scoped plan for the ones worth building first.' },
      { step: '03', title: 'Implement', desc: 'Integration or build work executed against the scoped plan, tested against real inputs before rollout.' },
      { step: '04', title: 'Train & monitor', desc: 'Team training on the new workflow or tool, with monitoring to catch drift or failure modes early.' },
    ],
    faqs: [
      { q: 'Do we need our own AI strategy, or can we just adopt what our tools already offer?', a: 'Most off-the-shelf AI features are generic by design. A strategy matters when the use case is specific to your business — your content, your customer questions, your operational bottlenecks — which is usually where the actual value is.' },
      { q: 'Is this the same as your GEO and AI content work?', a: 'They’re related but distinct. <a href="/services/geo-ai-content-writing">GEO content writing</a> is about getting your existing pages cited by AI answer engines. This is broader — evaluating and implementing AI tools and systems across marketing and operations, which may or may not involve content at all.' },
      { q: 'We’re worried about AI tools producing generic or inaccurate output. How do you handle that?', a: 'Any AI implementation we build is scoped narrowly and trained on your actual content and data, with a clear boundary on what it should and shouldn’t attempt. Generic, ungrounded output is usually a sign of a tool applied too broadly, not an inherent limitation.' },
    ],
    ctaTitle: 'Figure out what AI is actually worth building.',
  },

  'seo-web-copywriting': {
    slug: 'seo-web-copywriting',
    pillar: 'Creativity',
    title: 'SEO & Web Copywriting',
    metaDescription:
      'SEO and web copywriting from Gobiya: core site and service pages written to rank in Google and convert visitors, mapped to real search intent.',
    heroLines: ['Copy that ranks', 'and reads like it wasn’t written for a bot.'],
    lede: 'Most SEO copy reads like it was written for an algorithm, and most great copy ignores search intent entirely. We write core site and service pages that do both — structured to rank as part of a broader <a href="/services/content-strategy">content strategy</a>, and genuinely worth reading once someone lands.',
    problem: {
      eyebrow: 'The problem',
      statement: 'Keyword-stuffed copy ranks briefly and converts nobody; well-written copy that ignores intent and structure never gets found at all. Most sites end up with one or the other.',
    },
    capabilities: [
      { tag: 'Pages', title: 'Core site copy', desc: 'Homepage, service, and about pages written around real search intent and a clear conversion path, not just keyword density.' },
      { tag: 'Intent', title: 'Search intent mapping', desc: 'Every page built around what someone actually wants when they search that term, not just the term itself.' },
      { tag: 'Voice', title: 'Brand voice development', desc: 'A consistent voice defined once and applied across every page, so the site reads like one business, not a patchwork of vendors.' },
      { tag: 'Structure', title: 'On-page structure & schema', desc: 'Headings, metadata, and structured data built into every page from the draft stage, not bolted on after.' },
    ],
    process: [
      { step: '01', title: 'Intent & keyword research', desc: 'What people actually search for and expect to find, mapped page by page before any writing starts.' },
      { step: '02', title: 'Structure & outline', desc: 'Page architecture and heading structure planned around both search intent and a clear conversion path.' },
      { step: '03', title: 'Write & optimize', desc: 'Copy drafted, edited, and structured with metadata and schema built in from the start.' },
      { step: '04', title: 'Review & publish', desc: 'Client review, technical implementation, and indexation monitoring after publish.' },
    ],
    faqs: [
      { q: 'Will this copy sound like it was written for search engines instead of people?', a: 'That’s exactly what we’re trying to avoid. Modern SEO copy succeeds by genuinely answering what someone’s looking for, in a clear voice — keyword stuffing has been a liability, not an asset, for years now.' },
      { q: 'Can you write copy for our existing pages, or only new ones?', a: 'Both. A lot of our copywriting work is rewriting existing pages that rank poorly or convert poorly, often because they were originally written for a different search intent than the one that actually brings traffic.' },
      { q: 'How do you make sure the copy still sounds like our brand?', a: 'We start with a voice and messaging review — existing materials, how your team actually talks to customers — before writing anything, so the copy reads as an extension of your brand rather than a generic template.' },
    ],
    ctaTitle: 'Get copy that ranks and actually converts.',
  },

  'content-strategy': {
    slug: 'content-strategy',
    pillar: 'Creativity',
    title: 'Content Strategy',
    metaDescription:
      'Content strategy from Gobiya: editorial calendars and topic architecture built around real search demand and AI citation potential, not publishing volume.',
    heroLines: ['A content calendar', 'built on demand, not habit.'],
    lede: 'Publishing on a schedule isn’t a strategy. We build content plans around actual search demand, competitive gaps, and topics with real AI-citation potential — so every published piece is working toward a specific outcome, not just filling a calendar.',
    problem: {
      eyebrow: 'The problem',
      statement: 'Most content calendars are built around what’s easy to write this week, not what buyers are actually searching for — which is why so much published content never earns a single ranking or citation.',
    },
    capabilities: [
      { tag: 'Research', title: 'Topic & gap analysis', desc: 'Search demand and competitor content mapped to find topics worth owning, not just topics that are easy to cover.' },
      { tag: 'Architecture', title: 'Content hub planning', desc: 'Pillar and cluster structures built so individual pieces reinforce each other instead of competing for the same rankings.' },
      { tag: 'Calendar', title: 'Editorial calendar management', desc: 'A working calendar tied to business priorities and seasonal demand, not an arbitrary publishing cadence.' },
      { tag: 'Measurement', title: 'Performance tracking', desc: 'Published content tracked against rankings, traffic, and AI citations, with underperformers flagged for revision or retirement.' },
    ],
    process: [
      { step: '01', title: 'Demand & gap research', desc: 'Search volume, competitor coverage, and AI-citation potential mapped across your category.' },
      { step: '02', title: 'Architecture & calendar', desc: 'A hub-and-spoke content structure and realistic editorial calendar built around prioritized topics.' },
      { step: '03', title: 'Produce & publish', desc: 'Content written, reviewed, and published on schedule, coordinated with copywriting and design as needed.' },
      { step: '04', title: 'Track & refine', desc: 'Ongoing performance review to double down on what’s working and revise or cut what isn’t.' },
    ],
    faqs: [
      { q: 'How much content do we actually need to publish?', a: 'Less than most agencies suggest. A smaller number of well-researched, well-structured pieces targeting real demand consistently outperforms a high-volume calendar of thin, low-intent posts.' },
      { q: 'Do you write the content, or just plan it?', a: 'Both, typically in coordination with our <a href="/services/seo-web-copywriting">SEO &amp; web copywriting</a> and <a href="/services/geo-ai-content-writing">GEO content</a> services — the strategy determines what to write and why, and we can execute the writing directly or hand the plan to your existing team.' },
      { q: 'How do you decide what topics are worth covering?', a: 'We weigh search volume against realistic ranking difficulty, competitive coverage gaps, and how directly the topic connects to a buying decision — a smaller but highly relevant topic often outperforms a bigger, more generic one.' },
    ],
    ctaTitle: 'Build a content plan tied to real demand.',
  },

  'ai-video-ads': {
    slug: 'ai-video-ads',
    pillar: 'Creativity',
    title: 'AI Video & Ads',
    metaDescription:
      'AI-produced video and ad creative from Gobiya: fast-turnaround video assets for paid social and search campaigns, produced without a full production shoot.',
    heroLines: ['Video creative,', 'without the production shoot.'],
    lede: 'Traditional video production is slow and expensive relative to how fast ad creative burns out on paid social. We produce AI-generated and AI-assisted video assets for campaigns — fast iteration, tested variants, without booking a crew for every concept.',
    problem: {
      eyebrow: 'The problem',
      statement: 'Ad creative fatigues within weeks on most paid platforms, but a traditional production cycle takes longer than that to turn around a single new concept.',
    },
    capabilities: [
      { tag: 'Production', title: 'AI-generated video assets', desc: 'Campaign video produced with AI generation and editing tools, turned around in days rather than a full shoot cycle.' },
      { tag: 'Variants', title: 'Creative variant testing', desc: 'Multiple hooks, formats, and edits produced quickly to test against real ad performance, not guesswork.' },
      { tag: 'Formats', title: 'Platform-native formats', desc: 'Assets built to each platform’s actual specs and viewing behavior — vertical, short-form, and native-feeling rather than repurposed.' },
      { tag: 'Integration', title: 'Paid media integration', desc: 'Creative built in coordination with actual <a href="/services/google-ads-ppc">campaign targeting and budget</a>, not produced in isolation from the media plan.' },
    ],
    process: [
      { step: '01', title: 'Concept & scripting', desc: 'Hooks and concepts developed around what’s actually converting on your platforms right now.' },
      { step: '02', title: 'Produce variants', desc: 'Multiple AI-generated or AI-assisted edits produced for testing rather than a single finished asset.' },
      { step: '03', title: 'Test in-platform', desc: 'Variants launched into live campaigns and measured against real performance data.' },
      { step: '04', title: 'Refine & scale', desc: 'Winning creative scaled, underperformers retired, with new variants produced on an ongoing cycle.' },
    ],
    faqs: [
      { q: 'Does AI-generated video actually perform as well as traditionally produced ads?', a: 'It depends on the format and platform — for short-form, hook-driven paid social ads, AI-produced creative tests competitively because viewers are optimizing for the message and pacing, not production polish. For brand-anchor video, a traditional shoot may still be the right call.' },
      { q: 'Can you produce video for our existing brand guidelines?', a: 'Yes — we work from your existing brand assets, footage, and guidelines where they exist, using AI tools to extend and iterate rather than replace what already works.' },
      { q: 'How fast can you turn around a new creative variant?', a: 'Typically days, not weeks, which is the core advantage over traditional production — it lets us respond to real ad fatigue and performance data instead of planning creative cycles months in advance.' },
    ],
    ctaTitle: 'Get ad creative that keeps pace with your campaigns.',
  },

  'digital-pr': {
    slug: 'digital-pr',
    pillar: 'Relations',
    title: 'Digital PR & Media Outreach',
    metaDescription:
      'Digital PR and media outreach from Gobiya: earned press coverage and journalist relationships that build the authority signals search engines and AI systems trust.',
    heroLines: ['Coverage that earns', 'a link and a citation.'],
    lede: 'Digital PR is <a href="/services/authority-link-building">link building</a>’s more visible cousin — real coverage, in real publications, from a pitch a journalist actually wanted to run. We build the story and the relationships, and the authority signal follows naturally.',
    problem: {
      eyebrow: 'The problem',
      statement: 'Most “PR” pitches are thinly disguised link requests, which journalists can spot immediately and ignore — leaving the brand with neither coverage nor a usable backlink.',
    },
    capabilities: [
      { tag: 'Story', title: 'Newsworthy angle development', desc: 'Finding the actual story in your business — data, a milestone, an expert take — that a journalist has a reason to cover.' },
      { tag: 'Outreach', title: 'Journalist relationship building', desc: 'Direct, ongoing relationships with relevant reporters and editors, not one-off blast pitches to a purchased list.' },
      { tag: 'Data', title: 'Data & survey PR', desc: 'Original research and survey campaigns designed specifically to be picked up and cited by media outlets.' },
      { tag: 'Response', title: 'Reactive & expert commentary', desc: 'Positioning your team as a go-to expert source for reporters covering breaking stories in your industry.' },
    ],
    process: [
      { step: '01', title: 'Story & angle development', desc: 'Identifying what about your business, data, or expertise is genuinely newsworthy right now.' },
      { step: '02', title: 'Target & pitch', desc: 'Relevant journalists and publications researched and pitched directly, with an angle built for their specific beat.' },
      { step: '03', title: 'Secure coverage', desc: 'Follow-through with reporters through publication, ensuring accurate representation and a usable link.' },
      { step: '04', title: 'Track & amplify', desc: 'Coverage tracked for authority impact, with earned placements amplified across other channels.' },
    ],
    faqs: [
      { q: 'How is this different from link building?', a: 'Link building often works backward from the link you want. Digital PR works forward from an actual story — the link or citation is a natural byproduct of coverage a journalist chose to run because it was worth reporting.' },
      { q: 'What kind of businesses can realistically get press coverage?', a: 'More than most owners assume. Original data, a genuinely novel local angle, or timely expert commentary can earn coverage even for a small local business — the key is finding the actual story rather than pitching the business itself.' },
      { q: 'How long does it take to see results from a PR campaign?', a: 'Reactive commentary opportunities can land within days; a planned data or survey campaign typically takes four to eight weeks from research to placement. We run both in parallel where it makes sense.' },
    ],
    ctaTitle: 'Get coverage worth linking to.',
  },
};
