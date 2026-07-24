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
    desc: 'A brand new website built from scratch. Each clinic location gets its own page tied to its Google listing, patients can book appointments online with automatic email confirmations, and articles help people find specific treatments.',
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
      dek: 'How a brand new website and better Google listings took a multi-location dental practice to the top of local search and multiplied patient inquiries five times over.',
      metaDescription:
        'Healthcare SEO case study: a new website with location pages, better Google listings, and online booking led to a 5x increase in patient inquiries for SmileCenter.com.',
      answer:
        'SmileCenter.com partnered with Gobiya to build a brand new website, replacing their slow, disconnected pages. We launched a page for each clinic location tied to its own Google Business Profile, rolled out online booking with instant email confirmations, and published articles to help people find specific treatments.',
      metrics: [
        { value: '5x', label: 'increase in patient inquiries' },
        { value: '#1', label: 'map ranking for target dental procedures' },
      ],
      body: [
        {
          heading: 'The challenge: disconnected location pages and hard-to-find treatments',
          paragraphs: [
            'SmileCenter.com ran several physical clinics but had just one generic homepage that failed to capture local searches. Patients were slipping away because they couldn\'t see real-time availability, and booking required a clunky third-party tool that frequently broke.',
            'On top of that, valuable services like implants, veneers, and Invisalign were buried in a few thin paragraphs. There were no separate pages for search engines or local patients to find, leaving them invisible in Google Maps and search results.',
          ],
        },
        {
          heading: 'The approach: a fast new site, local Google listings, and online booking',
          paragraphs: [
            'We built a fast, custom website focused on search performance and quick load times. For each clinic location, we built a dedicated local page, with clear behind-the-scenes details so Google could connect it to the right verified Google Business listing.',
            'Next, we built online booking directly into the site for each location. Patients can check real-time availability and book an appointment in just three taps, with automatic email confirmations keeping them in the loop.',
            'To capture people actively searching for treatment, we published a series of articles targeting real searches like "dental implants near me" and "emergency dentist Glendale," building the practice\'s authority on those topics.',
          ],
        },
        {
          heading: 'The results: a strong local presence and 5x more inquiries',
          paragraphs: [
            'The new site got indexed by Google quickly, landing location pages in the top 3 spots on Google Maps for their target dental procedures.',
            'Online inquiries and scheduled visits increased five-fold, driven by the easy booking flow and clear treatment pages. The targeted articles began driving a steady stream of qualified traffic, establishing SmileCenter.com as the go-to local dental practice.',
          ],
        },
      ],
      takeaways: [
        'A fast-loading website drastically reduces how often visitors leave right away, especially on mobile, where most patients browse for a local clinic.',
        'Connecting dedicated local pages to Google Business listings increases visibility in Google Maps for your core search terms.',
        'Built-in booking tools convert casual search traffic far better than a clunky third-party booking portal.',
        'Articles targeting specific treatments build real authority on those topics, capturing patients at the exact moment they\'re looking for that treatment.',
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
    desc: 'Improving their Google listing and simplifying the booking process turned local searches into scheduled appointments — without spending more on ads.',
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
            'Live scan fingerprinting is a near-perfect local search business: almost everyone who needs it searches for it, needs it soon, and picks from whatever shows up on the map. American Livescan showed up in those results but wasn\'t standing out — and the people who did click through hit a booking process clunky enough that too many went back and picked someone else.',
            'Figuring out the real problem mattered here. More traffic wasn\'t the first thing to fix — the process of turning a ready-to-book search into an actual scheduled appointment was broken in the middle.',
          ],
        },
        {
          heading: 'The approach: fix the listing, then clear the path',
          paragraphs: [
            'The first step was cleaning up their Google Business listing: matching the services listed to the exact words people search — live scan, fingerprinting, mobile service — along with accurate categories, hours, and service area, plus a steady stream of fresh reviews to reassure people making a quick decision.',
            'The second step was the booking process itself. We rebuilt the path from search result to confirmed appointment to remove every unnecessary step — fewer pages, clearer choices, and a booking button that worked just as well from a phone in a parking lot as from a desktop. For a service people book urgently, every step removed turns directly into more kept appointments.',
          ],
        },
        {
          heading: 'The results: three times the bookings, same ad budget',
          paragraphs: [
            'Online bookings tripled. The gain came entirely from converting demand that was already there — better placement in local results and a booking process that stopped losing the people who arrived — not from buying more traffic. Ad spend didn\'t increase, because it didn\'t need to.',
            'That\'s the pattern for local service businesses in general: before paying for more demand, make sure you\'re actually capturing the demand Google Maps is already sending you.',
          ],
        },
      ],
      takeaways: [
        'For services people need urgently, Google Maps is your storefront — your business listing needs to match the exact words people search.',
        'A clunky booking process quietly wastes local search wins: every unnecessary step between search and booked appointment costs real revenue.',
        'Fix what\'s leaking before spending more on ads — tripling bookings here required zero additional ad spend.',
        'Fresh reviews and accurate business details help you both rank better and convert more, at the same time.',
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
    desc: 'Rebuilt their outdated website from the ground up. Added a custom system to manage leads and automatically follow up by email, backed by articles that bring in people searching for safety compliance help.',
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
      dek: 'How moving a security compliance firm off WordPress to a fast custom website, with a built-in system to find and follow up on leads automatically, turned their site into a real lead-generation engine.',
      metaDescription:
        'B2B web app case study: rebuilding Safety-Centric.com off WordPress with a system that automatically finds leads and follows up by email.',
      answer:
        'Safety-Centric.com moved from a slow WordPress site to a fast, custom website built by Gobiya. We built a system that automatically scans public business registration records for companies that need safety compliance help, logs them, and automatically starts following up by email. Articles targeting compliance-related searches bring in the organic traffic.',
      metrics: [
        { value: '4.2x', label: 'increase in enterprise demo requests' },
        { value: '82%', label: 'reduction in sales outreach response times' },
      ],
      body: [
        {
          heading: 'The challenge: a slow website and manual sales outreach',
          paragraphs: [
            'Safety-Centric.com helps businesses get through safety compliance audits, but their old WordPress website loaded slowly, had security weaknesses, and worked only as an online brochure. Their sales team relied on manually finding leads and cold outreach, which was slow and inefficient.',
            'To grow, they needed a fast, modern website that actively gathered leads, tracked client relationships, and automatically followed up at the right moments — without someone doing it by hand.',
          ],
        },
        {
          heading: 'The approach: a fast rebuild and automatic lead-finding',
          paragraphs: [
            'We rebuilt the entire website from scratch, achieving near-instant load speeds. Behind the scenes, we built a system that watches public safety violation records and business registration databases in real time.',
            'When a potential lead shows up, the system logs it and automatically starts an email sequence tailored to that business\'s compliance situation. We also built a compliance resource hub with articles targeting the safety topics people actually search for.',
          ],
        },
        {
          heading: 'The results: leads that find themselves, and rising traffic',
          paragraphs: [
            'The new website turned from a static expense into their main source of leads. Enterprise demo requests jumped 4.2x thanks to the automatic lead-finding system.',
            'Automatic email follow-ups cut manual sales outreach time by 82%, letting the sales team focus only on the most promising leads. The targeted compliance articles earned rankings for competitive search terms, sending a steady stream of organic traffic straight into the lead system.',
          ],
        },
      ],
      takeaways: [
        'Moving off a slow WordPress setup to a fast custom website boosts performance, engagement, and rankings.',
        'Building lead-tracking and automatic lead-finding directly into the website creates a seamless pipeline of new business.',
        'Targeted, automatic email follow-ups convert leads at a significantly higher rate than generic cold outreach.',
        'A focused resource hub targeting compliance-related searches captures highly qualified B2B visitors.',
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
    desc: 'A custom web app that takes and checks passport photos automatically — removing the background, checking the person isn’t smiling, tracking printing and delivery, and processing payment, all in one flow.',
    serviceHref: '/services/web-app-development',
    serviceLabel: 'Web & App Development',
    media: { 
      logo: '/assets/img/quickpass-logo.webp',
      video: '/assets/videos/quickpass-aid.webm'
    },
    study: {
      dek: 'How building a custom passport photo app with automatic checks and built-in payment turned a manual photo booth business into a smooth digital service.',
      metaDescription:
        'Web app case study: building QuickPassAiD.Com with automatic background removal, smile detection, order tracking, and secure payment.',
      answer:
        'QuickPassAiD.Com brought in Gobiya to build a custom passport photo app. The app lets users snap a photo, automatically checks it against strict government guidelines, removes the background, and detects smiling. It\'s backed by an admin dashboard for tracking printing and delivery, and takes secure, instant payment through Square.',
      metrics: [
        { value: '99.2%', label: 'passport photo acceptance rate' },
        { value: '3.5x', label: 'increase in digital photo downloads' },
      ],
      body: [
        {
          heading: 'The challenge: manual photo edits and rejected applications',
          paragraphs: [
            'QuickPassAiD.Com was spending hours manually editing and cropping customer photos to meet strict government passport requirements. Small mistakes — a shadow, a slight smile, the wrong background color — led to a lot of rejections from passport agencies, which hurt customer trust.',
            'They needed an automated system that could guide people while taking the photo, automatically check it meets the rules, take secure payment, and track physical delivery behind the scenes.',
          ],
        },
        {
          heading: 'The approach: automatic photo checks and secure payment',
          paragraphs: [
            'We built a custom app that processes photos right in the browser. It checks each snapshot in real time — detecting facial expressions, checking that eyes are open, and verifying the lighting is right.',
            'We added automatic background removal and smile detection so photos get adjusted instantly. Checkout runs through a secure Square payment system, ending in either a digital download or a physical print delivery. The admin dashboard tracks printing and automatically sends delivery updates.',
          ],
        },
        {
          heading: 'The results: high acceptance rates and smooth shipping',
          paragraphs: [
            'The automatic photo checks pushed acceptance rates to 99.2%, virtually eliminating rejections and refunds. Digital photo downloads increased 3.5x thanks to the smooth, self-service experience.',
            'The admin dashboard let the client fulfill print orders twice as fast, with automatic tracking emails keeping customers updated at every step. Payment success rates stayed high and steady throughout.',
          ],
        },
      ],
      takeaways: [
        'Automatic checks built right into the photo-taking step reduce human error, lowering refunds and increasing customer confidence.',
        'A fast, modern website gives a snappy experience for real-time photo capture and editing, even on mobile.',
        'Delivery tracking built directly into the system keeps customers informed automatically, reducing support requests.',
        'A secure, trusted payment provider like Square improves how many people complete checkout.',
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
    desc: 'A custom platform connecting homeowners and contractors. Homeowners post projects, contractors bid on them, and the whole thing runs on a built-in system that automatically follows up with new leads by email — backed by articles that bring in homeowners searching for remodeling help.',
    serviceHref: '/services/web-app-development',
    serviceLabel: 'Web & App Development',
    media: { logo: '/assets/img/remodelmepros.webp', video: '/assets/videos/remodel-me-pros.mp4' },
    study: {
      dek: 'How building a custom marketplace connecting homeowners and contractors, with built-in lead tracking and automatic follow-up, streamlined contractor bidding and cut the cost of acquiring new customers.',
      metaDescription:
        'Contractor marketplace case study: a custom platform for RemodelMePros.com with homeowner project posting, contractor bidding, and automatic lead follow-up.',
      answer:
        'RemodelMePros.com partnered with Gobiya to build a custom marketplace platform. The app lets homeowners post projects and gives contractors a bidding dashboard, all tracked in one built-in system. To keep things active, we built a system that automatically finds new leads for contractors and starts following up by email, alongside articles that bring in homeowners searching for remodeling help.',
      metrics: [
        { value: '2.5x', label: 'increase in monthly active contractor bids' },
        { value: '61%', label: 'reduction in cost per customer acquisition' },
      ],
      body: [
        {
          heading: 'The challenge: matching homeowners with the right contractors, efficiently',
          paragraphs: [
            'RemodelMePros.com wanted a platform matching homeowners with local contractors. Their old setup was clunky, with no live updates, instant bid tracking, or a way to manage leads — leading users to give up and go to bigger, more generic search sites instead.',
            'They also struggled to bring in and keep enough contractors active to keep the marketplace working, spending heavily on paid ads while potential leads went cold.',
          ],
        },
        {
          heading: 'The approach: two connected portals and automatic lead-finding',
          paragraphs: [
            'We designed two connected portals. Homeowners can post remodeling projects, upload photos, and set a budget. Contractors get an interactive dashboard to view, filter, and bid on local projects.',
            'To keep the marketplace active, we built a system that automatically pulls remodeling permit filings and matches them with the right contractors. It automatically emails contractors about fresh opportunities, and we published articles targeting the searches homeowners actually run when looking for remodeling help.',
          ],
        },
        {
          heading: 'The results: an active local marketplace and lower costs',
          paragraphs: [
            'The new platform drove real engagement, pushing monthly active contractor bids up by 2.5x. Contractors responded well to the instant notifications and simple dashboard.',
            'The automatic lead-finding and email follow-ups eliminated the need for expensive ad campaigns, cutting the cost of bringing on new contractors by 61%. The targeted articles brought in homeowners who were actively looking, keeping the bidding system constantly supplied with new projects.',
          ],
        },
      ],
      takeaways: [
        'Two-sided marketplaces need a separate, well-built experience for each side — buyers and sellers — to keep both coming back.',
        'Automatically pulling leads from public records into a built-in tracking system solves the classic "empty marketplace" problem.',
        'Automatic emails tied to real activity, like new bidding opportunities, keep people coming back.',
        'Articles targeting the right searches drive homeowners who are ready to act directly to the project-posting tool, lowering acquisition costs.',
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
    desc: 'Content written around the real questions patients ask, plus clear behind-the-scenes details, positioned this wellness practice to be directly recommended by Google’s AI answers and ChatGPT — not just ranked in a list.',
    serviceHref: '/geo-services',
    serviceLabel: 'GEO & AI Content Writing',
    study: {
      dek: 'How content built around real patient questions, plus clear behind-the-scenes details, positioned an integrative wellness practice to be directly recommended in Google’s AI answers and ChatGPT — not just ranked in a list of links.',
      metaDescription:
        'AI visibility case study: content built around real patient questions positioned The Healing Metta, an integrative wellness practice, to be directly recommended in Google’s AI answers and ChatGPT.',
      answer:
        'The Healing Metta, an integrative wellness practice, faced a shift every healthcare practice now faces: patients increasingly ask AI tools their health questions and act on the answer — often without ever visiting a results page at all. Gobiya rewrote the practice’s content around the exact questions patients actually ask, leading each page with a direct, clear answer, and added clean behind-the-scenes details so AI tools could understand exactly who the practice is and what each page covers. The site was built to be the source AI tools actually mention, not just a link buried in a list.',
      metrics: [
        { value: 'Answer-first', label: 'content restructured around real patient questions' },
        { value: 'Clean', label: 'schema markup across practice, practitioner, and page level' },
      ],
      body: [
        {
          heading: 'The challenge: patients ask AI first now',
          paragraphs: [
            'For an integrative wellness practice, how patients search has changed. Someone wondering whether a treatment fits their situation increasingly types the question straight into ChatGPT, or reads Google’s AI answer at the top of the page — and what they read comes from whichever sources that AI tool chose to trust and quote. A practice can rank respectably in regular search results and still be completely missing from the answer patients actually read.',
            'The Healing Metta’s existing content had real substance — real expertise, real treatments, real answers — but it was written the way most practice websites are: service descriptions meant for someone browsing casually, not clear answers written for a system trying to decide what to quote.',
          ],
        },
        {
          heading: 'The approach: write the expertise so AI can find it',
          paragraphs: [
            'The content work started from real questions, not from pages. The practice’s actual patient questions — what a treatment helps with, what a first visit looks like, how different approaches compare — became the structure, with each question answered directly and completely right at the start of its section, then backed up with more detail underneath. That direct-answer-first approach is the single biggest difference between content AI tools quote and content they skip over.',
            'The second part was making sure AI tools could clearly read the site. We rebuilt the clear, behind-the-scenes details across the site — who the practice is, who the practitioners are, and what each page actually covers — so an AI tool deciding whether to trust and quote the content could tell exactly who was saying it and on what authority. In healthcare, where AI tools weigh source trust heavily, that clarity isn’t a nice-to-have — it’s the whole trust signal.',
          ],
        },
        {
          heading: 'The results: built to be the source AI recommends',
          paragraphs: [
            'The practice’s site went from a well-meaning brochure to a real source of answers: every core patient question answered directly where an AI tool can find it, understand it, and credit it, backed by clear details that make the practice’s credibility easy for a machine to confirm. It was positioned to be directly recommended in Google’s AI answers and ChatGPT for the questions its patients actually ask.',
            'This is what healthcare search looks like now: rankings still matter, but the practices that win over the next five years will be the ones AI tools actually name. Clear structure is how you get named.',
          ],
        },
      ],
      takeaways: [
        'Patients increasingly read AI-generated answers instead of a results page — a practice can rank well and still be invisible exactly where the decision gets made.',
        'Answering the question directly and completely right at the start of a section is the single biggest difference between content AI quotes and content it skips.',
        'In healthcare, clear details about the practice, the practitioners, and each page’s topic are a real trust signal AI tools weigh — not just optional technical detail.',
        'Organizing content around real patient questions serves both the human reader and the AI tool reading it, with the exact same structure.',
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
    desc: 'A custom property search tool and back-office system tracking every unit’s availability. Also fixed a Google Business listing that kept getting suspended, restoring their visibility in local search.',
    serviceHref: '/services/web-app-development',
    serviceLabel: 'Web & App Development',
    media: { logo: '/assets/img/totalcapital.webp' },
    study: {
      dek: 'How a custom property search tool, a real-time unit tracker, and fixing their Google Business account recovered a major real estate firm\'s rejected listings and simplified renting out units.',
      metaDescription:
        'Real estate SEO case study: a custom property search tool and back-office system for TotalCapitalInc.Com, resolving repeated Google Business listing rejections.',
      answer:
        'TotalCapitalInc.Com needed one place to showcase their residential and commercial buildings and track which units were available. Gobiya built a custom property search tool and a back-office system that visually maps every unit. We also resolved a repeated cycle of Google Business listing suspensions by moving their email to a business email provider, adding a verified company credit card, and completing Google\'s video verification process.',
      metrics: [
        { value: '100%', label: 'GMB profiles successfully verified' },
        { value: '45%', label: 'reduction in average vacancy durations' },
      ],
      body: [
        {
          heading: 'The challenge: disorganized rentals and rejected Google listings',
          paragraphs: [
            'TotalCapitalInc.Com manages a large portfolio of residential, commercial, and storefront properties, but had no central way for prospective tenants to search for a unit. Vacancies were tracked on offline spreadsheets, causing confusion and delays in leasing units out.',
            'To make matters worse, Google kept rejecting and suspending their business listings, keeping them from showing up in local search. Without that visibility, their commercial storefronts sat empty for months.',
          ],
        },
        {
          heading: 'The approach: a custom search tool, a unit tracker, and getting verified',
          paragraphs: [
            'We built a custom property search tool that lets people search and filter units by location, type, and size. We also built a back-office system that maps out every building and unit, giving the leasing team a real-time view of what\'s available.',
            'To resolve the listing rejections, we moved their company email to a professional business email provider. Since Google requires strong proof that a business is real, we set up a verified company credit card and completed a video verification call. The professional email, along with the verified payment method, confirmed their legitimacy to Google.',
          ],
        },
        {
          heading: 'The results: fully verified, with fewer vacancies',
          paragraphs: [
            '100% of their previously rejected listings were restored and verified, immediately bringing local search traffic to their commercial and residential properties.',
            'The custom search tool and back-office system transformed their leasing process, cutting average vacancy time by 45%. Prospective tenants could view active listings, and agents could update unit availability in one click.',
          ],
        },
      ],
      takeaways: [
        'Getting a Google Business listing verified often requires clear signals that your business is real, like a professional business email and a verified payment method.',
        'A real-time view of unit availability prevents double-booking and speeds up the whole leasing process.',
        'Your own property search tool matches prospective tenants with empty units much faster than relying on third-party listing sites.',
        'A verified local presence combined with a fast website is essential for any multi-unit real estate portfolio.',
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
    desc: 'Moved an aging website to a fast, modern platform, giving this growing B2B product the technical foundation to scale its search visibility as the product grows.',
    serviceHref: '/services/web-app-development',
    serviceLabel: 'Web & App Development',
  },
  {
    slug: 'dg-plumbing',
    client: 'DGPlumbingandRooter.com',
    tag: 'Local Service Business',
    result: 'Custom CRM & Dispatcher system',
    desc: 'A custom website with a built-in system for managing leads, dispatching plumbers, sending estimates and invoices, and scheduling jobs — plus articles that bring in people searching for plumbing help.',
    serviceHref: '/services/web-app-development',
    serviceLabel: 'Web & App Development',
    media: { logo: '/assets/img/dgplumbing-logo.webp' },
    study: {
      dek: 'How building a custom dispatch system, estimate tool, and lead tracker turned a local plumbing business into a booking machine that mostly runs itself, and increased emergency calls.',
      metaDescription:
        'Local service web app case study: building a custom platform for DGPlumbingandRooter.com with lead tracking, dispatching, estimates, invoices, and automatic email follow-up.',
      answer:
        'DGPlumbingandRooter.com came to Gobiya to build an all-in-one system for their plumbing company. We built a custom website with built-in lead tracking, a dispatch tool, digital estimates, automatic invoices, and a scheduling calendar connected to automatic email follow-ups and targeted articles.',
      metrics: [
        { value: '+142%', label: 'increase in emergency service calls' },
        { value: '30 min', label: 'saved per technician job dispatch' },
      ],
      body: [
        {
          heading: 'The challenge: manual dispatching and slow invoicing',
          paragraphs: [
            'DGPlumbingandRooter.com was running their business off phone calls and paper notes. Dispatchers spent hours coordinating with plumbers out in the field, which led to delayed arrivals and lost jobs. Invoicing was done by hand, slowing down how quickly they got paid.',
            'They needed one system that could capture plumbing requests, schedule jobs on a dispatch board, automatically generate estimates and invoices, and follow up with existing customers by email.',
          ],
        },
        {
          heading: 'The approach: a dispatch dashboard, automatic invoicing, and targeted articles',
          paragraphs: [
            'We built a custom system with a dispatch panel where office staff can see where plumbers are and assign jobs. Plumbers in the field can generate estimates and send invoices to customers on the spot.',
            'We connected the lead tracker to a scheduling calendar that automatically sends emails — seasonal maintenance reminders, follow-ups, and the like. To bring in organic traffic, we published articles targeting real searches like "burst pipe emergency plumbing" and "clogged drain Glendale."',
          ],
        },
        {
          heading: 'The results: rapid dispatching and 142% call increase',
          paragraphs: [
            'The automated dispatch board shaved 30 minutes off every technician\'s response time, letting them complete more service calls per day. Digital estimates and invoicing dramatically sped up how quickly they got paid.',
            'Emergency plumbing service calls surged 142%, driven by the speed of the mobile scheduler and the targeted articles ranking first during local pipe emergencies.',
          ],
        },
      ],
      takeaways: [
        'Replacing a manual dispatch board with a custom digital tool increases day-to-day efficiency.',
        'Digital, on-site estimates and invoicing lead to faster customer approvals and quicker payments.',
        'Automatic maintenance reminder emails keep a service provider top-of-mind for past customers.',
        'Targeting local, urgent searches captures customers who need help right now.',
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
    desc: 'Custom software that walks people through an AI-guided interview, in multiple languages, to generate real estate-planning documents — with secure payment built in and real conversations on Reddit that built genuine trust and links.',
    serviceHref: '/services/web-app-development',
    serviceLabel: 'Web & App Development',
    media: { logo: '/assets/img/mtw-logo-mark-nFG9LpnH.webp' },
    study: {
      dek: 'How building an AI-guided tool to generate estate-planning documents, with secure payment built in and real conversations on Reddit, established a leading estate-planning platform.',
      metaDescription:
        'Document-generation software case study: building MyTrustWills.Com with an AI-guided interview, secure payment, and genuine conversations on Reddit.',
      answer:
        'MyTrustWills.Com worked with Gobiya to build an AI-powered tool for generating estate-planning documents. We designed a multi-language interview that walks people through creating a will or trust, secured it with Stripe for payment, and built search visibility through clear behind-the-scenes details and genuine conversations on Reddit.',
      metrics: [
        { value: '85%', label: 'growth in qualified organic traffic' },
        { value: '94%', label: 'document completion rate' },
      ],
      body: [
        {
          heading: 'The challenge: confusing legal jargon and low completion rates',
          paragraphs: [
            'Estate planning is notoriously complicated. MyTrustWills.Com found that people would start drafting their wills but give up partway through when they hit confusing legal language. They needed a simple, guided process that actually got people to the finish line.',
            'On top of that, competing with established law firms in search results was expensive. They needed an affordable way to build real links and earn trust for the terms people actually search.',
          ],
        },
        {
          heading: 'The approach: AI-guided interviews, secure payment, and Reddit conversations',
          paragraphs: [
            'We built a custom document generator. It includes a multi-language, AI-guided interview that turns complex legal concepts into simple questions. The tool fills out legal templates based on the answers and processes payment through Stripe.',
            'For marketing, we added clear behind-the-scenes details around the legal terms used on the site, and ran a genuine outreach campaign. We took part in real estate-planning discussions on Reddit, answering people\'s actual questions and earning valuable, relevant links along the way.',
          ],
        },
        {
          heading: 'The results: high document completion and organic growth',
          paragraphs: [
            'The AI-guided interview was a big success, pushing document completion rates to 94% as people\'s hesitation disappeared. Stripe processed thousands of checkouts without a hitch.',
            'Our on-page work and Reddit conversations delivered an 85% growth in qualified organic traffic. By being mentioned in real community discussions and ranking for core legal terms, MyTrustWills.Com established itself as a trusted resource.',
          ],
        },
      ],
      takeaways: [
        'Simplifying a complex, regulated process with an AI-guided interview drastically increases how many people finish it.',
        'A trusted payment provider like Stripe gives people a familiar, comfortable checkout experience for something as important as a legal document.',
        'Genuinely taking part in community forums like Reddit generates real links and drives visitors who are actually interested.',
        'Clear, well-organized page details help search engines understand what your software actually does and match it to the right searches.',
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
    desc: 'Content built for both readers and AI tools made this practice the go-to source people find — and AI tools recommend — for local dental care.',
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
    desc: 'Rebuilt Google Ads campaigns combined with landing pages that actually matched what people searched for, dramatically improving lead quality and how many became customers.',
    serviceHref: '/ppc-management-services',
    serviceLabel: 'Google Ads & PPC',
  },
];

export function getCaseStudy(slug) {
  return CASE_STUDIES.find((c) => c.slug === slug && c.study) || null;
}
