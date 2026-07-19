// Case study data. Every entry renders as a card on /work. Entries that also
// carry a `study` object get a full page at /work/[slug] — cards, sitemap, and
// generateStaticParams all key off the presence of `study`, so partially
// migrated entries stay cards-only until their study content is written.
// Metrics in `study` content must be client-approved before an entry ships.

export const CASE_STUDIES = [
  {
    slug: 'smile-center-dentistry',
    client: 'Smile Center Dentistry',
    tag: 'Healthcare & Dental',
    result: '5x increase in patient inquiries',
    desc: 'A full technical SEO rebuild and local search overhaul turned a barely-findable practice site into the top local result for its core procedures — with patient inquiries following directly.',
    industryHref: '/industries/healthcare',
    outcomeHref: '/outcomes/traffic',
    serviceHref: '/services/seo-discoverability',
    serviceLabel: 'SEO & Discoverability',
    media: {
      video: '/assets/videos/smilecenter-screencast.webm',
      logo: '/assets/img/smilecenter.webp',
      logoAlt: 'Smile Center Dentistry logo',
      logoWidth: 200,
      logoHeight: 37,
    },
    study: {
      dek: 'How a full technical rebuild and local search overhaul took a dental practice from barely findable to the top local result for its core procedures — and multiplied patient inquiries five times over.',
      metaDescription:
        'Dental SEO case study: a technical SEO rebuild and local search overhaul took Smile Center Dentistry from barely findable to the top local result for its core procedures, with a 5x increase in patient inquiries.',
      answer:
        'Smile Center Dentistry came to Gobiya with a website that was effectively invisible for the procedures that drive the practice. A full technical SEO rebuild — crawlability, page structure, structured data, and Core Web Vitals — combined with a local search overhaul across its Google Business Profile and citation footprint made the practice the top local result for its core procedures. Patient inquiries increased 5x.',
      metrics: [
        { value: '5x', label: 'increase in patient inquiries' },
        { value: '#1', label: 'local result for core procedures' },
      ],
      body: [
        {
          heading: 'The challenge: a practice patients couldn’t find',
          paragraphs: [
            'Smile Center Dentistry had the problem that quietly caps growth for a lot of established practices: the dentistry was good, the reviews were good, and the website might as well not have existed. Searches for the procedures the practice actually wanted to book — its core, high-value treatments — surfaced competitors, directories, and insurance aggregators. The practice’s own pages were nowhere patients would realistically look.',
            'This is rarely a content problem alone, and it wasn’t here. The site’s underlying technical condition kept search engines from crawling, understanding, and trusting its pages — which meant every dollar and hour spent on anything downstream of that foundation was being wasted.',
          ],
        },
        {
          heading: 'The approach: rebuild the foundation, then win the map',
          paragraphs: [
            'The engagement ran in two connected tracks. The first was a full technical rebuild of the site’s search foundation: clean crawlable page structure, one clearly-scoped page per core procedure instead of thin overlapping ones, dentistry-appropriate structured data so search engines could parse who the practice is and what each page treats, and Core Web Vitals brought into healthy range so page experience stopped working against rankings.',
            'The second track was the local search overhaul. For a dental practice, the map pack and the organic results are one battle, not two. That meant a systematic Google Business Profile rebuild — categories, services, photos, and review flow aligned with the procedures the practice wanted to win — plus a citation cleanup so the practice’s name, address, and phone data agreed everywhere search engines checked.',
            'Both tracks reinforced each other deliberately: procedure pages gave the Business Profile something authoritative to land on, and the strengthened local entity signals fed back into how the rebuilt pages ranked.',
          ],
        },
        {
          heading: 'The results: top local result, 5x the inquiries',
          paragraphs: [
            'The practice became the top local result for its core procedures — the searches that actually produce booked treatment plans, not vanity keywords. Patient inquiries rose to five times their previous level, and they arrived through the channels the rebuild had engineered: procedure pages that rank, and a Business Profile that converts nearby searches into calls and form fills.',
            'The result held because it was built on foundation, not tactics. A technically sound site with clean local signals doesn’t need to be re-won every algorithm update — it compounds.',
          ],
        },
      ],
      takeaways: [
        'Technical invisibility caps everything downstream — no amount of content or ads fixes a site search engines can’t properly crawl and classify.',
        'For local healthcare, organic rankings and the map pack are one battle: procedure pages and the Google Business Profile have to be built to reinforce each other.',
        'One clearly-scoped page per core procedure beats thin overlapping pages — for rankings, for patients, and for AI-generated answers.',
        'Foundation-first results compound instead of resetting with every algorithm update.',
      ],
    },
  },
  {
    slug: 'american-livescan',
    client: 'American Livescan',
    tag: 'Local Service Business',
    media: { logo: '/assets/img/americanlivescan.webp' },
    result: '3x increase in online bookings',
    desc: 'Google Business Profile optimization and a rebuilt booking path turned local fingerprinting searches into scheduled appointments, without adding ad spend.',
    industryHref: '/industries/local-service',
    outcomeHref: '/outcomes/sales',
    serviceHref: '/services/seo-discoverability',
    serviceLabel: 'SEO & Discoverability',
    study: {
      dek: 'How Google Business Profile optimization and a rebuilt booking path tripled online bookings for a local fingerprinting service — without a dollar of added ad spend.',
      metaDescription:
        'Local SEO case study: Google Business Profile optimization and a rebuilt booking path tripled online bookings for American Livescan, a Los Angeles fingerprinting service, with no added ad spend.',
      answer:
        'American Livescan, a Los Angeles live scan fingerprinting service, was getting found by nearby searchers but losing them before they booked. Gobiya rebuilt its Google Business Profile around the exact services people search for and rebuilt the booking path so a search became a scheduled appointment in as few steps as possible. Online bookings tripled — with no additional advertising spend.',
      metrics: [
        { value: '3x', label: 'increase in online bookings' },
        { value: '$0', label: 'added ad spend' },
      ],
      body: [
        {
          heading: 'The challenge: visibility without bookings',
          paragraphs: [
            'Live scan fingerprinting is a near-perfect local search business: nearly everyone who needs it searches for it, needs it soon, and picks from whatever the map shows them. American Livescan was present in those results but underperforming in them — and the searchers who did click through hit a booking experience with enough friction that too many of them went back to the results page and chose someone else.',
            'The diagnosis mattered here. More traffic wasn’t the first problem to solve; the practice of turning an intent-loaded local search into a scheduled appointment was broken in the middle.',
          ],
        },
        {
          heading: 'The approach: win the profile, then clear the path',
          paragraphs: [
            'The first track was a systematic Google Business Profile optimization: service listings matched to the exact terms people search — live scan, fingerprinting, mobile service — accurate categories, hours, and service-area data, and a review cadence that kept fresh, relevant proof in front of searchers making a fast decision.',
            'The second track was the booking path itself. The route from search result to confirmed appointment was rebuilt to remove every step that didn’t need to exist — fewer pages, clearer choices, and a booking action that worked as well from a phone in a parking lot as from a desktop. For a service people book on urgency, every removed step converts directly into kept appointments.',
          ],
        },
        {
          heading: 'The results: three times the bookings, same ad budget',
          paragraphs: [
            'Online bookings tripled. The gain came entirely from converting demand that already existed — better placement in local results and a booking path that stopped leaking the searchers who arrived — not from buying more traffic. Ad spend didn’t increase; it didn’t need to.',
            'That’s the pattern for local service businesses generally: before paying to acquire more demand, capture the demand the map is already sending.',
          ],
        },
      ],
      takeaways: [
        'For urgency-driven local services, the map pack is the storefront — the Google Business Profile has to match the exact words searchers use.',
        'Conversion friction silently discards local search wins: every unnecessary step between search and booked appointment costs real revenue.',
        'Fix the leak before buying more water — tripling bookings required zero additional ad spend.',
        'Review freshness and accurate service data are ranking and conversion levers at the same time.',
      ],
    },
  },
  {
    slug: 'safetycentric',
    client: 'SafetyCentric',
    tag: 'Professional Services',
    result: 'Authority rebuilt after a name change',
    desc: 'Editorial link acquisition and citation cleanup re-established domain trust for a security integration firm after a brand transition threatened to reset its search equity.',
    industryHref: '/industries/professional-services',
    outcomeHref: '/outcomes/rankings',
    serviceHref: '/services/authority-link-building',
    serviceLabel: 'Authority & Link Building',
    media: {
      video: '/assets/videos/sc-hero-background-compressed.webm',
      logo: '/assets/img/safetycentric-logo.png',
      logoAlt: 'SafetyCentric logo',
      logoWidth: 140,
      logoHeight: 78,
    },
    study: {
      dek: 'How editorial link acquisition and a systematic citation cleanup re-established domain trust for a security integration firm after a brand transition put years of search equity at risk.',
      metaDescription:
        'Rebranding SEO case study: editorial link acquisition and citation cleanup rebuilt domain authority for SafetyCentric, a security integration firm, after a name change threatened to reset its search equity.',
      answer:
        'SafetyCentric, a California security integration firm, went through a brand transition — and a name change is one of the most dangerous moments in a company’s search life. Years of accumulated trust signals point at an identity that no longer matches what the web says about you. Gobiya ran a two-front authority rebuild: editorial link acquisition under the new name, and a citation cleanup that reconciled the old identity with the new one everywhere search engines looked. Domain trust was re-established instead of reset.',
      metrics: [
        { value: 'Rebuilt', label: 'domain authority under the new brand' },
        { value: 'Editorial', label: 'links earned in relevant trade coverage — not bought' },
      ],
      body: [
        {
          heading: 'The challenge: a name change that could reset everything',
          paragraphs: [
            'Search engines don’t rank websites so much as they rank entities — a business with a name, an address, a history, and a web of references that all agree with each other. A brand transition breaks that agreement. The links, citations, and mentions that took years to accumulate suddenly point at a name that no longer matches the site, and search engines respond the only way they can: with reduced confidence.',
            'For SafetyCentric, a security integration firm whose buyers are institutions doing careful vendor research, that confidence gap was a business risk, not just a rankings one. The firm needed its new identity to inherit the authority the old one had earned — something that doesn’t happen by default.',
          ],
        },
        {
          heading: 'The approach: reconcile the old identity, earn under the new one',
          paragraphs: [
            'The first front was reconciliation. Every citation that mattered — directories, industry listings, local data aggregators, the references search engines use to corroborate who a business is — was systematically updated or corrected so the old name, address, and profile data stopped contradicting the new brand. This is unglamorous work, and it’s also the difference between a transition and a reset: an entity graph that agrees with itself again.',
            'The second front was earning fresh authority under the new name. Editorial link acquisition targeted publications and industry coverage relevant to security integration — real mentions in places the firm’s buyers and search engines both respect. No purchased placements, no link schemes; links that read as evidence the new brand is the same trusted operator, because they are.',
          ],
        },
        {
          heading: 'The results: trust carried across the transition',
          paragraphs: [
            'Domain trust was re-established under the new brand instead of starting over from zero. Rankings that a botched transition would have surrendered were defended, and the firm’s new name accumulated its own editorial footprint — the kind of authority signal that compounds and that competitors can’t easily replicate.',
            'The engagement is a template for any firm facing a rebrand: the search equity you’ve built is portable, but only if the move is engineered — the web has to be told, consistently and everywhere, that the new name is the same trusted entity.',
          ],
        },
      ],
      takeaways: [
        'A name change is an entity problem before it’s a rankings problem — every citation that contradicts the new brand erodes search-engine confidence.',
        'Citation cleanup is the unglamorous half of a rebrand that decides whether authority transfers or resets.',
        'Editorial links earned in relevant trade coverage rebuild trust in a way purchased placements never will.',
        'Search equity survives a rebrand only when the transition is engineered — it does not carry over by default.',
      ],
    },
  },
  {
    slug: 'quickpass-aid',
    client: 'QuickPass AiD',
    tag: 'Local Service Business',
    media: { logo: '/assets/img/quickpass-logo.webp' },
    result: 'Technical foundation rebuilt for indexation',
    desc: 'A client-side-only site that was invisible to crawlers was rebuilt server-rendered, unlocking indexation for an identity-verification service across multiple locations.',
    industryHref: '/industries/local-service',
    outcomeHref: '/outcomes/traffic',
    serviceHref: '/services/web-app-development',
    serviceLabel: 'Web & App Development',
    study: {
      dek: 'How a client-side-only site that crawlers saw as an empty shell was rebuilt server-rendered — unlocking indexation for an identity-verification service operating across multiple locations.',
      metaDescription:
        'Technical SEO case study: QuickPass AiD’s client-side-only site was invisible to search crawlers. A server-rendered rebuild unlocked indexation for its identity-verification services across multiple locations.',
      answer:
        'QuickPass AiD, an identity-verification service with multiple locations, had a website that looked complete in a browser and nearly empty to search engines. The site rendered entirely client-side: crawlers fetching its pages received a JavaScript shell with none of the content inside. Gobiya rebuilt the site server-rendered, so every page ships as full HTML on first response. Indexation unlocked across every location and service page — search visibility the business had technically owned all along, finally switched on.',
      metrics: [
        { value: 'Empty', label: 'what crawlers saw before the rebuild' },
        { value: 'Every', label: 'location and service page indexable after' },
      ],
      body: [
        {
          heading: 'The challenge: a site search engines couldn’t read',
          paragraphs: [
            'In a browser, the QuickPass AiD site worked fine. To a crawler, it was close to blank. The site was built client-side-only: the server responded with a nearly empty HTML shell, and JavaScript assembled the actual content afterward. Search engines that don’t fully execute JavaScript — and the growing set of AI crawlers that mostly don’t — saw pages with nothing on them worth indexing.',
            'For a multi-location service business, the damage multiplies. Every location page, every service page — each one a chance to be found by someone searching nearby — was invisible for the same underlying reason. No amount of content work or link building fixes a page a crawler can’t read.',
          ],
        },
        {
          heading: 'The approach: server-render everything, change nothing for users',
          paragraphs: [
            'The fix was architectural, not cosmetic: rebuild the site so every page is rendered on the server and arrives as complete HTML on the first response. Users saw the same site; crawlers, for the first time, saw the actual content — headings, service descriptions, location data, all present before a single line of JavaScript runs.',
            'The rebuild also imposed the structure a multi-location service needs to be found: a clearly-scoped page per location and per service with clean URLs and internal links tying them together, so search engines could understand not just that the pages existed but how the business’s footprint fit together.',
          ],
        },
        {
          heading: 'The results: indexation unlocked, visibility switched on',
          paragraphs: [
            'With full HTML reaching crawlers, indexation unlocked across the site — every location, every service, eligible to rank for the local searches that drive this kind of business. The site went from technically invisible to structurally sound, and the same fix future-proofed it for AI search: systems like ChatGPT and Perplexity cite pages they can read as raw HTML, which client-side-only sites systematically fail.',
            'This is the case that proves a point we make often: for JavaScript-heavy sites, server-side rendering is the single highest-leverage SEO decision available — because it doesn’t improve a signal, it removes a disqualifier.',
          ],
        },
      ],
      takeaways: [
        'A site can look perfect in a browser and be nearly blank to crawlers — client-side-only rendering is the most common way businesses are invisible without knowing it.',
        'Server-side rendering removes a disqualifier rather than improving a signal, which is why it outranks almost any other technical fix in leverage.',
        'Multi-location businesses multiply the cost of rendering problems: every location page is invisible for the same reason.',
        'The same rebuild that unlocks Google indexation unlocks AI-search citability — most AI crawlers read raw HTML only.',
      ],
    },
  },
  {
    slug: 'remodel-me-pros',
    client: 'Remodel Me Pros',
    tag: 'Local Service Business',
    media: { logo: '/assets/img/remodelmepros.webp' },
    result: '61% reduction in cost per lead',
    desc: 'A Google Ads rebuild — tighter match types, aggressive negative keywords, landing pages matched to intent — cut wasted spend without cutting lead volume.',
    industryHref: '/industries/local-service',
    outcomeHref: '/outcomes/sales',
    serviceHref: '/services/google-ads-ppc',
    serviceLabel: 'Google Ads & PPC',
    study: {
      dek: 'How a disciplined Google Ads rebuild — tighter match types, aggressive negative keywords, landing pages matched to intent — cut cost per lead 61% for a remodeling contractor without cutting lead volume.',
      metaDescription:
        'Google Ads case study: a campaign rebuild with tighter match types, aggressive negative keywords, and intent-matched landing pages cut Remodel Me Pros’ cost per lead by 61% without reducing lead volume.',
      answer:
        'Remodel Me Pros, a remodeling contractor, was buying leads at a price that quietly ate its margins — the account was spending heavily on clicks that were never going to become jobs. Gobiya rebuilt the Google Ads account around one principle: pay only for intent. Tighter match types, an aggressive negative-keyword program, and landing pages rebuilt to match what each searcher actually wanted cut cost per lead by 61% — while lead volume held.',
      metrics: [
        { value: '−61%', label: 'cost per lead' },
        { value: 'Held', label: 'lead volume — no drop while costs fell' },
      ],
      body: [
        {
          heading: 'The challenge: paying full price for the wrong clicks',
          paragraphs: [
            'The account looked busy — spend going out, clicks coming in, leads arriving. The problem was underneath: loose match types let Google expand the ads onto searches that were near the business but not of it, and every one of those clicks cost the same real money as a qualified one. In home services, where a single job is worth thousands, it’s easy for an account like this to look "fine" while burning more than half its budget on searchers who were never going to hire anyone.',
          ],
        },
        {
          heading: 'The approach: pay for intent, nothing else',
          paragraphs: [
            'The rebuild started with match-type discipline: campaigns restructured so the ads ran against the searches the business actually wanted to win, not Google’s loose interpretation of them. Alongside that, an aggressive negative-keyword program — built and expanded continuously from real search-term data — systematically walled off the DIY searches, the job seekers, the bargain hunters, and the adjacent services the contractor doesn’t offer.',
            'The other half of cost per lead is what happens after the click, so the landing pages were matched to intent rather than pointing everything at one generic page. A searcher looking for a kitchen remodel landed on kitchens; a bathroom searcher landed on bathrooms — with the proof, the photos, and the ask matched to the job they were considering. Same traffic, meaningfully more of it converting.',
          ],
        },
        {
          heading: 'The results: 61% cheaper leads, none lost',
          paragraphs: [
            'Cost per lead fell 61%. The volume of leads did not fall with it — because the spend that was eliminated had been producing clicks, not customers. The account ended up doing what a well-run local service account should do: turning the same budget into roughly two and a half times the efficiency, with search-term reports clean enough to audit at a glance.',
            'The broader lesson for local service advertisers: before raising budgets, find out what fraction of current spend is buying intent. It’s usually less than anyone expects — and fixing it is the cheapest growth available.',
          ],
        },
      ],
      takeaways: [
        'Loose match types quietly convert ad budget into unqualified clicks — match-type discipline is the first lever, not the last.',
        'Negative keywords are a program, not a set-up task: built continuously from real search-term data.',
        'Landing pages matched to searcher intent move cost per lead as much as anything inside the ads account.',
        'A 61% CPL reduction with flat lead volume means the eliminated spend was never producing customers in the first place.',
      ],
    },
  },
  {
    slug: 'the-healing-metta',
    client: 'The Healing Metta',
    tag: 'Healthcare & Dental',
    media: { logo: '/assets/img/medicine-metta-favicon.webp' },
    result: 'Structured for AI-answer citation',
    desc: 'Patient-question content and clean schema markup positioned an integrative wellness practice to be cited directly in AI Overviews and ChatGPT answers, not just ranked.',
    industryHref: '/industries/healthcare',
    outcomeHref: '/outcomes/rankings',
    serviceHref: '/services/geo-ai-content-writing',
    serviceLabel: 'GEO & AI Content Writing',
    study: {
      dek: 'How patient-question content and clean schema markup positioned an integrative wellness practice to be cited directly in AI Overviews and ChatGPT answers — not just ranked in a list of links.',
      metaDescription:
        'GEO case study: patient-question content architecture and clean schema markup positioned The Healing Metta, an integrative wellness practice, to be cited directly in AI Overviews and ChatGPT answers.',
      answer:
        'The Healing Metta, an integrative wellness practice, faced the shift every healthcare practice now faces: patients increasingly ask AI systems their health questions and act on the answer — often without visiting a results page at all. Gobiya restructured the practice’s content around the exact questions patients actually ask, leading each with a direct, extractable answer, and rebuilt its schema markup so AI systems could parse who the practice is and what each page addresses. The site was engineered to be the source AI answers cite, not just a link in a list.',
      metrics: [
        { value: 'Answer-first', label: 'content restructured around real patient questions' },
        { value: 'Clean', label: 'schema markup across practice, practitioner, and page level' },
      ],
      body: [
        {
          heading: 'The challenge: patients ask AI first now',
          paragraphs: [
            'For an integrative wellness practice, the searcher journey has changed shape. A prospective patient wondering whether a treatment fits their situation increasingly types the question into ChatGPT or gets an AI Overview above the results — and the answer they read comes from whichever sources the AI system chose to trust and quote. A practice can rank respectably in traditional results and still be entirely absent from the answers patients actually read.',
            'The Healing Metta’s existing content had the substance — real expertise, real treatments, real answers — but it was structured the way practice websites usually are: service descriptions written for a browsing visitor, not extractable answers written for a system deciding what to quote.',
          ],
        },
        {
          heading: 'The approach: structure the expertise for extraction',
          paragraphs: [
            'The content work started from the questions, not the pages. The practice’s real patient questions — what conditions a treatment addresses, what a first visit looks like, how approaches differ — became the organizing structure, with each question answered directly and completely in the first sentences of its section, then supported underneath. That answer-first architecture is the single biggest structural difference between content AI systems quote and content they skip.',
            'The second track was machine readability. Clean, healthcare-appropriate schema markup was rebuilt across the site — the practice as an entity, the practitioners behind it, and what each page actually addresses — so an AI system deciding whether to trust and cite the content could resolve exactly who was saying it and on what authority. In healthcare, where AI systems weigh source credibility heavily, that entity clarity is not optional plumbing; it’s the trust signal.',
          ],
        },
        {
          heading: 'The results: built to be the cited source',
          paragraphs: [
            'The practice’s site went from a well-meaning brochure to an extraction-ready knowledge source: every core patient question answered directly where an AI system can find, parse, and attribute it, backed by entity markup that makes the practice’s credibility machine-legible. It was positioned to be cited directly in AI Overviews and ChatGPT answers for the questions its patients actually ask.',
            'This is the shape of healthcare search now: rankings still matter, but the practices that win the next five years will be the ones AI answers name. Structure is how you get named.',
          ],
        },
      ],
      takeaways: [
        'Patients increasingly read AI-generated answers instead of results pages — a practice can rank well and still be invisible where decisions happen.',
        'Answer-first structure — the complete answer in the first sentences of a section — is the biggest single difference between content AI quotes and content it skips.',
        'In healthcare, entity-level schema (practice, practitioner, page topic) is a trust signal AI systems weigh, not optional markup.',
        'Organizing content around real patient questions serves the human reader and the citing machine with the same structure.',
      ],
    },
  },
  {
    slug: 'total-capital',
    client: 'Total Capital',
    tag: 'Enterprise & B2B',
    media: { logo: '/assets/img/totalcapital.webp' },
    result: '5.7x return on Google Ads spend',
    desc: 'A campaign rebuild around qualified-lead intent, on a $15K/month budget, turned an underperforming account into one of the strongest ROAS accounts in the portfolio.',
    industryHref: '/industries/enterprise-b2b',
    outcomeHref: '/outcomes/sales',
    serviceHref: '/services/google-ads-ppc',
    serviceLabel: 'Google Ads & PPC',
  },
  {
    slug: 'tidder',
    client: 'Tidder',
    tag: 'Enterprise & B2B',
    result: 'Custom Next.js platform, built to scale',
    desc: 'A legacy platform migration to a custom Next.js build gave a growing B2B product the rendering performance and structured-data foundation to scale search visibility with the product.',
    industryHref: '/industries/enterprise-b2b',
    outcomeHref: '/outcomes/traffic',
    serviceHref: '/services/web-app-development',
    serviceLabel: 'Web & App Development',
  },
  {
    slug: 'dg-plumbing',
    client: 'DG Plumbing',
    tag: 'Local Service Business',
    media: { logo: '/assets/img/dgplumbing-logo.webp' },
    result: '142% increase in emergency calls',
    desc: 'A complete local SEO overhaul and Google Business Profile optimization helped this local plumber dominate the map pack for emergency services.',
    industryHref: '/industries/local-service',
    outcomeHref: '/outcomes/sales',
    serviceHref: '/services/seo-discoverability',
    serviceLabel: 'SEO & Discoverability',
  },
  {
    slug: 'mtw',
    client: 'MTW',
    tag: 'Professional Services',
    media: { logo: '/assets/img/mtw-logo-mark-nFG9LpnH.webp' },
    result: '85% growth in qualified organic traffic',
    desc: 'Technical SEO and targeted content strategy established topical authority, driving a sustained increase in high-intent B2B inquiries.',
    industryHref: '/industries/professional-services',
    outcomeHref: '/outcomes/traffic',
    serviceHref: '/services/seo-discoverability',
    serviceLabel: 'SEO & Discoverability',
  },
  {
    slug: 'sonrisa-dental',
    client: 'Sonrisa Dental',
    tag: 'Healthcare & Dental',
    media: { logo: '/assets/img/sonrisa-dental.webp' },
    result: 'Top 3 ranking for 15+ core procedures',
    desc: 'An AI-friendly content architecture and structured data implementation made this practice the go-to cited source for local dental search.',
    industryHref: '/industries/healthcare',
    outcomeHref: '/outcomes/rankings',
    serviceHref: '/services/geo-ai-content-writing',
    serviceLabel: 'GEO & AI Content Writing',
  },
  {
    slug: 'trusted-home-contractors',
    client: 'Trusted Home Contractors',
    tag: 'Local Service Business',
    media: { logo: '/assets/img/trusted-logo.webp' },
    result: '40% reduction in customer acquisition cost',
    desc: 'A restructured Google Ads campaign combined with intent-matched landing pages dramatically improved lead quality and conversion rates.',
    industryHref: '/industries/local-service',
    outcomeHref: '/outcomes/sales',
    serviceHref: '/services/google-ads-ppc',
    serviceLabel: 'Google Ads & PPC',
  },
];

export function getCaseStudy(slug) {
  return CASE_STUDIES.find((c) => c.slug === slug && c.study) || null;
}
