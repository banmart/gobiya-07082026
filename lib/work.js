// Case study data. Every entry renders as a card on /work. Entries that also
// carry a `study` object get a full page at /work/[slug] — cards, sitemap, and
// generateStaticParams all key off the presence of `study`, so partially
// migrated entries stay cards-only until their study content is written.
// Metrics in `study` content must be client-approved before an entry ships.

export const CASE_STUDIES = [
  {
    slug: 'smile-center-dentistry',
    url: 'https://smilecenter.com?ref=gobiya&utm_source=gobiya&utm_medium=referral&utm_campaign=portfolio',
    client: 'SmileCenter.com',
    tag: 'Healthcare & Dental',
    result: '5x patient inquiry increase',
    desc: 'A full website creation built on React/Vite. Features custom localized location pages mapped to individual Google My Business profiles, an integrated multi-location scheduler with email notifications, and targeted procedure articles.',
    serviceHref: '/seo-services',
    serviceLabel: 'SEO & Discoverability',
    media: {
      video: '/assets/videos/smilecenter-screencast.webm',
      logo: '/assets/img/smilecenter.webp',
      logoAlt: 'SmileCenter.com logo',
      logoWidth: 200,
      logoHeight: 37,
    },
    study: {
      dek: 'How a complete React/Vite website build and local GMB alignment took a multi-location dental practice to top-tier search visibility and multiplied patient inquiries five times over.',
      metaDescription:
        'Healthcare SEO case study: A React/Vite site rebuild with location pages, GMB sync, and a custom scheduler yielded a 5x patient inquiry increase for SmileCenter.com.',
      answer:
        'SmileCenter.com partnered with Gobiya to build a custom React/Vite platform replacing their slow, fragmented pages. We launched hyper-localized location pages integrated with optimized Google Business Profiles, rolled out an automated multi-location scheduler with instant email confirmations, and published targeted procedure articles to capture high-value organic traffic.',
      metrics: [
        { value: '5x', label: 'increase in patient inquiries' },
        { value: '#1', label: 'map ranking for target dental procedures' },
      ],
      body: [
        {
          heading: 'The challenge: fragmented location pages and low procedure intent',
          paragraphs: [
            'SmileCenter.com operated several physical clinics but had a single, generic web homepage that failed to capture local-intent searches. Patient leads were leaking because users couldn\'t see immediate availability, and booking required a disjointed third-party portal that frequently errored.',
            'Additionally, high-value dental services like implants, veneers, and invisalign were buried in thin paragraphs. There were no distinct, crawlable pages for search engines or local users to find, leaving them invisible in local map packs and organic listings.',
          ],
        },
        {
          heading: 'The approach: React/Vite speed, localized GMB integration, and scheduling',
          paragraphs: [
            'We engineered a custom React/Vite website focused on core search performance and lightning-fast load times. For each clinic location, we designed specific local pages optimized with Schema markup (LocalBusiness JSON-LD) and synced them directly to verified Google My Business listings.',
            'Next, we built a location-specific scheduling interface directly into the React app. This allowed patients to check real-time availability and book in just three taps, with automated email notifications powered by transactional relays keeping them confirmed.',
            'To capture high-intent searches, we launched a series of targeted procedure articles optimizing for exact keywords like "dental implants near me" and "emergency dentist Glendale," establishing topical authority.',
          ],
        },
        {
          heading: 'The results: a unified map pack presence and 5x conversion rates',
          paragraphs: [
            'The new React/Vite architecture unlocked rapid organic indexation, positioning location pages in the top 3 spots of Google Map Packs for their target dental procedures.',
            'Online inquiries and scheduled visits increased five-fold, driven by the friction-free booking flow and clear procedures pages. The targeted articles began driving consistent qualified blog traffic, establishing SmileCenter.com as the preeminent local dental authority.',
          ],
        },
      ],
      takeaways: [
        'Fast-rendering React/Vite pages drastically reduce bounce rates, especially on mobile devices where patients browse local clinics.',
        'Syncing dedicated local landing pages with Google My Business profiles increases local map pack visibility for core search terms.',
        'Built-in, native scheduling tools convert passive search traffic far better than disjointed third-party portals.',
        'Targeted procedure articles establish topical authority, capturing patients at the exact moment they seek treatment.',
      ],
      testimonial: {
        quote: 'We had four locations and one website that treated them like they were all the same place. The new build gave every office its own page tied to its own Google listing, and the scheduler finally stopped being a phone-tag situation. Front desk noticed the difference before I did — they were the ones fielding all the new calls.',
        name: 'Dr. Ebbi Nikjoo',
        role: 'Dental Office',
        photo: '/assets/img/dr-nikjoo.jpg',
      },
    },
  },
  {
    slug: 'american-livescan',
    url: 'https://www.americanlivescan.com?ref=gobiya&utm_source=gobiya&utm_medium=referral&utm_campaign=portfolio',
    client: 'American Livescan',
    tag: 'Local Service Business',
    media: { logo: '/assets/img/americanlivescan.webp' },
    result: '3x increase in online bookings',
    desc: 'Google Business Profile optimization and a rebuilt booking path turned local fingerprinting searches into scheduled appointments, without adding ad spend.',
    serviceHref: '/seo-services',
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
      testimonial: {
        quote: 'Honestly I expected to be told I needed to spend more on ads. Instead we fixed the Google listing and shortened the path from "found us" to "booked." Same budget, roughly three times the appointments. I still don’t fully understand what changed on the backend, but the calendar tells the story.',
        name: 'Dev P.',
        role: 'Fingerprinting Services',
      },
    },
  },
  {
    slug: 'safetycentric',
    url: 'https://www.safety-centric.com?ref=gobiya&utm_source=gobiya&utm_medium=referral&utm_campaign=portfolio',
    client: 'Safety-Centric.com',
    tag: 'Professional Services',
    result: 'React/Vite redesign + CRM and scraper',
    desc: 'Redesigned from WordPress to React/Vite. Integrated a custom CRM, a leads/scraper propagator, and automated email drip campaigns, backed by keyword-targeted articles to capture safety-compliance traffic.',
    serviceHref: '/services/web-app-development',
    serviceLabel: 'Web & App Development',
    media: {
      video: '/assets/videos/safety-centric-commercial.webm',
      videoMp4: '/assets/videos/safety-centric-commercial.mp4',
      hasSound: true,
      logo: '/assets/img/safetycentric-logo.png',
      logoAlt: 'Safety-Centric.com logo',
      logoWidth: 140,
      logoHeight: 78,
      gallery: [
        { type: 'image', src: '/assets/img/access-control-lady.webp', alt: 'A Safety-Centric client using a mobile access control app' },
        { type: 'video', src: '/assets/videos/safetycentric----homepage.webm', label: 'Safety-Centric.com product screencast' },
      ],
    },
    study: {
      dek: 'How transitioning a security compliance firm from WordPress to React/Vite, coupled with a built-in CRM and scraper propagator, transformed their site into an automated lead-generation engine.',
      metaDescription:
        'B2B Web App case study: Redesigning Safety-Centric.com from WordPress to React/Vite with a custom CRM, lead scraper, and automated email drips.',
      answer:
        'Safety-Centric.com moved from a slow WordPress site to a custom React/Vite web application built by Gobiya. We integrated a proprietary scraper propagator that captures public business registration alerts, matches safety needs, updates a built-in CRM, and triggers automated email drips. A targeted compliance keyword strategy drives the organic traffic.',
      metrics: [
        { value: '4.2x', label: 'increase in enterprise demo requests' },
        { value: '82%', label: 'reduction in sales outreach response times' },
      ],
      body: [
        {
          heading: 'The challenge: a sluggish WordPress site and manual sales outreach',
          paragraphs: [
            'Safety-Centric.com helps enterprises navigate safety compliance audits, but their old WordPress website loaded slowly, suffered from security vulnerabilities, and acted only as a static brochure. The sales team relied on manual lead scraping and cold outreach, which was inefficient and slow.',
            'To scale, they needed a fast, modern web presence that actively gathered leads, tracked client relationships, and automatically followed up on compliance milestones without human intervention.',
          ],
        },
        {
          heading: 'The approach: React/Vite, a custom leads propagator, and automated campaigns',
          paragraphs: [
            'We rebuilt the entire front-end on React/Vite, achieving near-instant load speeds. Behind the scenes, we developed a leads scraper propagator that monitors occupational safety violations and public business registration databases in real-time.',
            'When a potential lead is identified, the system propagates it to the built-in CRM and triggers a contextual email drip campaign tailored to their compliance status. We also designed a compliance knowledge hub with targeted articles focused on high-traffic safety keywords.',
          ],
        },
        {
          heading: 'The results: automated client acquisition and soaring traffic',
          paragraphs: [
            'The custom React/Vite application turned the website from a static expense into their primary lead-generation source. Enterprise demo requests spiked 4.2x as a result of the scraper database alignment.',
            'Automated email drips reduced manual sales outreach cycles by 82%, allowing representatives to focus solely on high-value qualified leads. The targeted compliance articles secured rankings for high-competition keywords, funneling organic traffic straight to the scraper database.',
          ],
        },
      ],
      takeaways: [
        'Replacing WordPress with React/Vite boosts site performance, leading to higher engagement and organic rankings.',
        'Embedding a CRM and scraper propagator directly into the website codebase creates a seamless lead pipeline.',
        'Contextual email drip campaigns triggered by real-time scrapers convert leads at a significantly higher rate than generic cold outreach.',
        'A focused knowledge hub targeting regulatory compliance keywords captures highly qualified B2B searchers.',
      ],
      testimonial: {
        quote: 'Moving off WordPress was the part I was most nervous about and it turned out to be the easy part. The bigger deal was the CRM and the drip campaigns — leads used to sit in an inbox until someone remembered them. Now they get followed up whether I’m paying attention or not.',
        name: 'Pete Urueta',
        role: 'Business Security Systems Services',
        photo: '/assets/img/pete-urueta-ceo.webp',
      },
    },
  },
  {
    slug: 'quickpass-aid',
    url: 'https://www.quickpassaid.com?ref=gobiya&utm_source=gobiya&utm_medium=referral&utm_campaign=portfolio',
    client: 'QuickPassAiD.Com',
    tag: 'Local Service Business',
    result: 'Custom verification app & Square gateway',
    desc: 'A custom React/Vite web application that captures and validates passport photos. It automatically removes backgrounds, detects facial expressions (smiling/neutral), tracks printing and delivery on an admin backend, and processes payments via Square.',
    serviceHref: '/services/web-app-development',
    serviceLabel: 'Web & App Development',
    media: { 
      logo: '/assets/img/quickpass-logo.webp',
      video: '/assets/videos/quickpass-aid.webm'
    },
    study: {
      dek: 'How building a custom passport photo validation app with React/Vite and Square payments turned a manual photo booth business into a high-converting digital service.',
      metaDescription:
        'Web App case study: Building QuickPassAiD.Com on React/Vite with automatic background removal, smile detection, order tracking, and Square payment gateway.',
      answer:
        'QuickPassAiD.Com engaged Gobiya to build a custom React/Vite passport photo application. The app allows users to snap a photo, automatically validates it for strict government guidelines, removes the background, and detects smiling. The system is backed by an admin print and delivery tracker and is integrated with Square for secure, instant payments.',
      metrics: [
        { value: '99.2%', label: 'passport photo acceptance rate' },
        { value: '3.5x', label: 'increase in digital photo downloads' },
      ],
      body: [
        {
          heading: 'The challenge: manual photo adjustments and compliance rejections',
          paragraphs: [
            'QuickPassAiD.Com was spending hours manually editing and cropping customer photos to meet strict government passport requirements. Minor errors like shadow lines, slight smiles, or off-color backgrounds resulted in high rejection rates from passport agencies, hurting customer trust.',
            'They needed an automated solution that could guide the user during capture, validate compliance algorithmically, process secure payments, and manage physical delivery tracking on the backend.',
          ],
        },
        {
          heading: 'The approach: custom canvas rendering, computer vision, and Square',
          paragraphs: [
            'We engineered a custom React/Vite app utilizing client-side image processing. We built a validation layer that analyzes snapshots in real-time, detecting facial expressions, checking for open eyes, and verifying lighting levels.',
            'We integrated automated background removal APIs and smile-detection modules to adjust photos instantly. The checkout flow features a secure Square payments gateway, leading either to a digital download or physical print delivery. The admin panel tracks print production and ships with automated carrier notifications.',
          ],
        },
        {
          heading: 'The results: high acceptance rates and streamlined shipping',
          paragraphs: [
            'The automated validation engine drove photo acceptance rates to 99.2%, virtually eliminating rejections and customer refunds. Digital photo downloads increased 3.5x as a result of the seamless self-service UI.',
            'The admin panel allowed the client to fulfill print orders twice as fast, with automated tracking emails keeping customers updated at every delivery stage. Square transaction success rates remained high and stable.',
          ],
        },
      ],
      takeaways: [
        'Client-side validation rules reduce human error, lowering refunds and increasing customer confidence.',
        'React/Vite provides a snappy interface for real-time video capture and canvas manipulation on mobile browsers.',
        'Fulfillment tracking integrated directly with delivery carriers keeps users informed, reducing support tickets.',
        'Secure, trusted payment gateways like Square optimize conversion rates during checkout.',
      ],
      testimonial: {
        quote: 'The photo validation was the whole ballgame. We were rejecting a huge share of submissions manually and it was killing us on turnaround. Having it check the background and the expression automatically, then run payment through Square in the same flow, took a process that needed a person and made it something that mostly runs itself.',
        name: 'Dev Panday',
        role: 'Passport Photo App',
      },
    },
  },
  {
    slug: 'remodel-me-pros',
    url: 'https://remodelmepros.com?ref=gobiya&utm_source=gobiya&utm_medium=referral&utm_campaign=portfolio',
    client: 'RemodelMePros.com',
    tag: 'Local Service Business',
    result: 'React/Vite marketplace & CRM build',
    desc: 'A custom React/Vite portal connecting homeowners and contractors. Includes project posting tools, contractor bidding dashboards, a built-in CRM, and a scraper propagator that triggers automated email drip campaigns, alongside targeted SEO article campaigns.',
    serviceHref: '/services/web-app-development',
    serviceLabel: 'Web & App Development',
    media: { logo: '/assets/img/remodelmepros.webp', video: '/assets/videos/remodel-me-pros.mp4' },
    study: {
      dek: 'How building a custom contractor-homeowner marketplace with React/Vite, integrated CRM, and automated lead propagation streamlined contractor bidding and cut user acquisition costs.',
      metaDescription:
        'Contractor Marketplace case study: React/Vite build for RemodelMePros.com with homeowner posting, contractor bidding, lead scraper, and CRM.',
      answer:
        'RemodelMePros.com partnered with Gobiya to build a marketplace application using React/Vite. The app hosts a job posting tool for homeowners and a bidding dashboard for contractors, managed by an integrated CRM. To boost engagement, we built a lead scraper propagator that feeds leads to contractors and initiates automated email drips, alongside targeted SEO article campaigns.',
      metrics: [
        { value: '2.5x', label: 'increase in monthly active contractor bids' },
        { value: '61%', label: 'reduction in cost per customer acquisition' },
      ],
      body: [
        {
          heading: 'The challenge: matching homeowners with qualified contractors efficiently',
          paragraphs: [
            'RemodelMePros.com wanted to create a platform matching homeowners with local contractors. Their old setup was clunky, lacking live updates, instant bid tracking, or a built-in CRM, leading users to abandon the platform for larger, generic search aggregators.',
            'They also struggled to acquire and nurture new contractors to keep the marketplace liquid, spending heavily on paid ads while letting potential leads go cold.',
          ],
        },
        {
          heading: 'The approach: a dual React portal, CRM, and scraper propagation',
          paragraphs: [
            'We designed a dual-portal architecture on React/Vite. Homeowners can post remodeling projects, upload photos, and list budget parameters. Contractors get an interactive dashboard to view, filter, and bid on local projects.',
            'To solve the liquidity problem, we built an automated scraper propagator that pulls remodeling permit filings and matches them with contractors in the CRM. The system triggers automated email drip campaigns that notify contractors of fresh opportunities, and we published targeted articles to capture remodeling search keywords.',
          ],
        },
        {
          heading: 'The results: a thriving local marketplace and lower acquisition costs',
          paragraphs: [
            'The new platform catalyzed active engagement, pushing monthly active contractor bids up by 2.5x. Contractors responded enthusiastically to the instant notification system and streamlined dashboard.',
            'The automated scraper and email drip campaigns eliminated expensive ad campaigns, reducing contractor acquisition costs by 61%. Targeted SEO articles generated high-intent homeowner traffic, keeping the bidding system constantly supplied with new projects.',
          ],
        },
      ],
      takeaways: [
        'Dual-sided marketplaces require separate, optimized interfaces for demand and supply to ensure high retention.',
        'Automating lead propagation from public records to a built-in CRM solves marketplace cold-start problems.',
        'Transactional email drips tied to user activity (like bidding notifications) keep user return rates high.',
        'Targeted SEO articles drive high-intent homeowners directly to posting tools, lowering acquisition costs.',
      ],
      testimonial: {
        quote: 'Two-sided marketplaces are hard and I’d already had one developer tell me it couldn’t be done for what I wanted to spend. The bidding dashboard is what contractors actually log in for, and the SEO articles kept homeowners coming in without me buying every lead. It’s not finished — it probably never is — but it works.',
        name: 'Mike P.',
        role: 'Contractors Marketplace',
        photo: '/assets/img/testimonial-mike.png',
      },
    },
  },
  {
    slug: 'the-healing-metta',
    url: 'https://thehealingmetta.com?ref=gobiya&utm_source=gobiya&utm_medium=referral&utm_campaign=portfolio',
    client: 'The Healing Metta',
    tag: 'Healthcare & Dental',
    media: { logo: '/assets/img/medicine-metta-favicon.webp' },
    result: 'Structured for AI-answer citation',
    desc: 'Patient-question content and clean schema markup positioned an integrative wellness practice to be cited directly in AI Overviews and ChatGPT answers, not just ranked.',
    serviceHref: '/geo-services',
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
      testimonial: {
        quote: 'Users were finding answers about our treatments everywhere except from us. The shift was writing for the questions people actually ask, and structuring it so the AI tools could read it properly. When someone asks ChatGPT about integrative care in our area now, we come up. That wasn’t true a year ago.',
        name: null,
        role: 'Secrets of Buddha',
      },
    },
  },
  {
    slug: 'total-capital',
    url: 'https://www.totalcapital.com?ref=gobiya&utm_source=gobiya&utm_medium=referral&utm_campaign=portfolio',
    client: 'TotalCapitalInc.Com',
    tag: 'Enterprise & B2B',
    result: 'Custom property search engine & Admin CRM',
    desc: 'A custom property search engine and Admin CRM mapping all units for rental availability. Includes SEO recovery, resolving Google My Business verification suspensions via Google Workspace transition and corporate credit card backing.',
    serviceHref: '/services/web-app-development',
    serviceLabel: 'Web & App Development',
    media: { logo: '/assets/img/totalcapital.webp' },
    study: {
      dek: 'How a custom property search engine, an interactive unit CRM, and a strategic Google Workspace transition recovered a major real estate firm\'s rejected GMB listings and simplified rentals.',
      metaDescription:
        'Real Estate SEO case study: Custom property search engine and Admin CRM for TotalCapitalInc.Com, resolving Google My Business rejections through Google Workspace authentication.',
      answer:
        'TotalCapitalInc.Com needed a unified digital solution to showcase residential and commercial buildings and track unit availability. Gobiya built a custom property search engine and an admin CRM mapping every unit visually. We also resolved a complex Google My Business suspension cycle by migrating their email to Google Workspace, establishing a verified credit card on file, and securing video verification.',
      metrics: [
        { value: '100%', label: 'GMB profiles successfully verified' },
        { value: '45%', label: 'reduction in average vacancy durations' },
      ],
      body: [
        {
          heading: 'The challenge: rental property disorganization and rejected GMB profiles',
          paragraphs: [
            'TotalCapitalInc.Com manages a large portfolio of residential, commercial, and storefront properties, but had no centralized search engine for prospective tenants. Vacancies were tracked on offline spreadsheets, causing confusion and delays in leasing units.',
            'To make matters worse, Google kept rejecting and suspending their Google My Business (GMB) listings, preventing them from showing up for local searches. Without local visibility, their commercial storefronts sat empty for months.',
          ],
        },
        {
          heading: 'The approach: a custom search engine, unit CRM, and Workspace verification',
          paragraphs: [
            'We developed a custom property search engine in React/Vite, allowing users to search and filter units by location, type, and size. We built an Admin CRM that maps out every building and unit, giving the leasing team a real-time availability chart.',
            'To resolve the GMB rejections, we moved their domain email system to Google Workspace. Since Google requires strong proof of entity, we established a corporate credit card on file and scheduled a video verification walkthrough. The professional Workspace email, matched with financial backing, verified their legitimacy to Google.',
          ],
        },
        {
          heading: 'The results: full verification and reduced vacancies',
          paragraphs: [
            '100% of their previously rejected GMB profiles were successfully restored and verified, immediately driving local search traffic to their commercial and residential properties.',
            'The custom search engine and CRM system transformed their leasing workflow, dropping average vacancy durations by 45%. Prospects could view active listings, and agents could update unit availability in one click.',
          ],
        },
      ],
      takeaways: [
        'Google Business Profile verification requires professional entity signals like Google Workspace emails and verified payment profiles.',
        'Real-time availability maps in a custom CRM prevent double-booking and speed up the leasing funnel.',
        'An organic property search engine matches prospects with empty spaces much faster than third-party listing sites.',
        'A verified local footprint combined with a fast website is essential for multi-unit real estate portfolios.',
      ],
      testimonial: {
        quote: 'The Google Business Profile suspension was the emergency — we were invisible and nobody at Google would tell us why. Getting that untangled took persistence I did not have. The property search tool was the part that changed how we operate, though. Our team can see live availability across every unit instead of asking three people.',
        name: 'Eli Zilberstein',
        role: 'Properties and Management',
        photo: '/assets/img/eli-zilberstein-suit-home.webp',
      },
    },
  },
  {
    slug: 'tidder',
    client: 'Tidder',
    tag: 'Enterprise & B2B',
    result: 'Custom Next.js platform, built to scale',
    desc: 'A legacy platform migration to a custom Next.js build gave a growing B2B product the rendering performance and structured-data foundation to scale search visibility with the product.',
    serviceHref: '/services/web-app-development',
    serviceLabel: 'Web & App Development',
  },
  {
    slug: 'dg-plumbing',
    client: 'DGPlumbingandRooter.com',
    tag: 'Local Service Business',
    result: 'Custom CRM & Dispatcher system',
    desc: 'A React/Vite custom build integrating a CRM, dispatcher, estimates, invoices, and scheduling calendar with automated email drip campaigns, alongside targeted keyword articles.',
    serviceHref: '/services/web-app-development',
    serviceLabel: 'Web & App Development',
    media: { logo: '/assets/img/dgplumbing-logo.webp' },
    study: {
      dek: 'How building a custom dispatcher, estimates engine, and CRM on React/Vite turned a local plumbing operation into an automated booking machine and increased emergency calls.',
      metaDescription:
        'Local Service Web App case study: Building a React/Vite platform for DGPlumbingandRooter.com with a CRM, dispatcher, estimate/invoice tools, and email drip marketing.',
      answer:
        'DGPlumbingandRooter.com came to Gobiya to build an all-in-one system for their plumbing company. We engineered a custom React/Vite website with a built-in CRM, dispatcher tool, digital estimates, automated invoices, and a scheduling calendar synced with automated email drip campaigns and targeted articles.',
      metrics: [
        { value: '+142%', label: 'increase in emergency service calls' },
        { value: '30 min', label: 'saved per technician job dispatch' },
      ],
      body: [
        {
          heading: 'The challenge: manual dispatching and slow invoicing',
          paragraphs: [
            'DGPlumbingandRooter.com was running their business via phone calls and paper notes. Dispatchers spent hours coordinating with plumbers in the field, leading to delayed arrivals and lost jobs. Invoicing was done manually, slowing down payment collection.',
            'They needed a unified web application that could capture plumbing requests, schedule jobs on a dispatcher board, auto-generate estimates and invoices, and nurture existing customers via email campaigns.',
          ],
        },
        {
          heading: 'The approach: React/Vite dashboard, invoice automation, and keyword targeting',
          paragraphs: [
            'We built a custom React/Vite application featuring a dispatcher panel where office staff can view plumber locations and assign tickets. The field app allows plumbers to generate estimates and send invoices to customers on-site.',
            'We connected the CRM to a scheduling calendar that automatically triggers email drip campaigns (e.g. seasonal maintenance reminders, follow-ups). To drive organic traffic, we published targeted articles focusing on terms like "burst pipe emergency plumbing" and "clogged drain Glendale."',
          ],
        },
        {
          heading: 'The results: rapid dispatching and 142% call increase',
          paragraphs: [
            'The automated dispatch board shaved 30 minutes off every technician\'s response cycle, allowing them to complete more service calls per day. Digital estimates and invoicing boosted payment speeds dramatically.',
            'Emergency plumbing service calls surged 142%, driven by the speed of the mobile scheduler and the authority of the targeted keyword articles that ranked first during local pipe disasters.',
          ],
        },
      ],
      takeaways: [
        'Replacing manual dispatch boards with custom web-based tools increases operational efficiency.',
        'On-site digital estimation and invoicing lead to faster customer approvals and immediate payments.',
        'Triggering email drips for maintenance schedules keeps a service provider top-of-mind for past clients.',
        'Targeting localized emergency keywords captures high-intent customers who need help immediately.',
      ],
      testimonial: {
        quote: 'I was running dispatch off a whiteboard and text messages. Now the calls come in, get assigned, and the estimate and invoice come out of the same system. My techs stopped calling me to ask where they’re going next, which is worth more to me than the traffic numbers.',
        name: 'Dennis Gonzales',
        role: 'Local Plumbing Service',
      },
    },
  },
  {
    slug: 'mtw',
    url: 'https://www.mytrustwills.com?ref=gobiya&utm_source=gobiya&utm_medium=referral&utm_campaign=portfolio',
    client: 'MyTrustWills.Com',
    tag: 'Professional Services',
    result: 'AI document generation & Stripe payment',
    desc: 'Custom document generation software featuring a multi-language AI estate planning interview, Stripe payment gateway, Reddit backlink conversations, and optimized entity schema.',
    serviceHref: '/services/web-app-development',
    serviceLabel: 'Web & App Development',
    media: { logo: '/assets/img/mtw-logo-mark-nFG9LpnH.webp' },
    study: {
      dek: 'How building an AI-guided document generation engine with Stripe integration and driving trust via organic Reddit marketing established a leading estate planning platform.',
      metaDescription:
        'Document Gen Software case study: Building MyTrustWills.Com on React/Vite with AI interviews, Stripe integration, and organic Reddit link building.',
      answer:
        'MyTrustWills.Com collaborated with Gobiya to build an AI-powered estate planning document generation tool. We designed a multi-language interview wizard that auto-compiles legal wills and trusts, secured it with Stripe payments, and optimized search visibility using entity-level Schema markup and organic conversation building on Reddit.',
      metrics: [
        { value: '85%', label: 'growth in qualified organic traffic' },
        { value: '94%', label: 'document completion rate' },
      ],
      body: [
        {
          heading: 'The challenge: complex legal jargon and low customer completion',
          paragraphs: [
            'Estate planning is notoriously complicated. MyTrustWills.Com found that users would start drafting their wills but abandon the process when confronted with complex legal jargon. They lacked an intuitive interview flow to guide users to completion.',
            'Additionally, competing with established law firms in search results was highly expensive. They needed a cost-effective, organic strategy to build backlinks and establish domain trust for high-value keywords.',
          ],
        },
        {
          heading: 'The approach: AI-guided interviews, Stripe, and Reddit conversations',
          paragraphs: [
            'We engineered a custom document generator on React/Vite. We built a multi-language, conversational AI interview wizard that translates complex legal concepts into simple questions. The application compiles legal templates based on user responses and processes checkout via Stripe.',
            'For marketing, we focused on entity optimization (marking up legal terms via JSON-LD) and executed an organic off-page campaign. We engaged in high-quality estate planning discussions on Reddit, answering user questions and earning valuable context-rich backlinks.',
          ],
        },
        {
          heading: 'The results: high document completion and organic growth',
          paragraphs: [
            'The conversational AI interview was a massive success, driving document completion rates to 94% as user hesitation evaporated. Stripe payment integrations processed thousands of checkout requests flawlessly.',
            'Our on-page entity optimization and Reddit conversation building delivered an 85% growth in qualified organic traffic. By being cited in active community discussions and ranking for core legal terms, MyTrustWills.Com established itself as a trusted digital resource.',
          ],
        },
      ],
      takeaways: [
        'Simplifying complex regulatory processes with AI-guided conversational interviews drastically increases conversion.',
        'Stripe integrations provide an optimized, familiar checkout experience for high-stakes document generation.',
        'Engaging in organic community forums like Reddit generates authentic backlinks and drives high-intent referral traffic.',
        'On-page entity optimization helps search engines classify software capabilities and match them to queries.',
      ],
      testimonial: {
        quote: 'The multi-language interview was non-negotiable for us and nobody else wanted to touch it. Clients answer questions in the language they’re comfortable in and a real document comes out the other end. Payments through Stripe, no back and forth. It removed the bottleneck that was me.',
        name: null,
        role: 'Online Trusts & Wills',
      },
    },
  },
  {
    slug: 'sonrisa-dental',
    url: 'https://www.sonrisaortho.com?ref=gobiya&utm_source=gobiya&utm_medium=referral&utm_campaign=portfolio',
    client: 'Sonrisa Dental',
    tag: 'Healthcare & Dental',
    media: { logo: '/assets/img/sonrisa-dental.webp' },
    result: 'Top 3 ranking for 15+ core procedures',
    desc: 'An AI-friendly content architecture and structured data implementation made this practice the go-to cited source for local dental search.',
    serviceHref: '/geo-services',
    serviceLabel: 'GEO & AI Content Writing',
  },
  {
    slug: 'trusted-home-contractors',
    url: 'https://trustedhomecontractors.com?ref=gobiya&utm_source=gobiya&utm_medium=referral&utm_campaign=portfolio',
    client: 'Trusted Home Contractors',
    tag: 'Local Service Business',
    media: { 
      logo: '/assets/img/trusted-logo.webp',
      video: '/assets/videos/trusted-home.webm'
    },
    result: '40% reduction in customer acquisition cost',
    desc: 'A restructured Google Ads campaign combined with intent-matched landing pages dramatically improved lead quality and conversion rates.',
    serviceHref: '/ppc-management-services',
    serviceLabel: 'Google Ads & PPC',
  },
];

export function getCaseStudy(slug) {
  return CASE_STUDIES.find((c) => c.slug === slug && c.study) || null;
}
