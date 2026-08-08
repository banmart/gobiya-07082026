// Canonical city data for /areas-we-serve/* pages.
// Each slug must match the actual Next.js route segment exactly.
//
// `image` is the hero background, taken from the site-wide rotation in
// lib/heroImages.js rather than named here — the index page holds position 9
// and the cities run 10–19, so neighbouring cards in the /areas-we-serve grid
// never open onto the same photograph. Those files are 2752x1536, near enough
// 16:9, which is what the shared hero needs: below 768px it crops to a 56.25vw
// band above the card, so anything squarer would letterbox. `excerpt` is the
// one bold line under the headline — short enough to read at a glance on a
// phone.

import { heroImage } from './heroImages';

// The four services every city page and the index offer, in one place so the
// two pages cannot drift apart. Same shape as the homepage service cards: a
// short category label, the service name, one plain sentence.
export const AREA_SERVICES = [
  {
    tag: 'Organic Search',
    title: 'Local & Technical SEO',
    href: '/services/technical-seo',
    desc: 'Fix what stops Google from reading your site, then earn map pack and organic placement.',
  },
  {
    tag: 'AI Search',
    title: 'AI & GEO Optimization',
    href: '/services/geo',
    desc: 'Get named when customers ask ChatGPT, Perplexity, or Google AI Overviews.',
  },
  {
    tag: 'Paid Media',
    title: 'PPC & Lead Generation',
    href: '/services/ppc',
    desc: 'Rebuild Google Ads around what a booked job actually costs, not clicks.',
  },
  {
    tag: 'Content',
    title: 'Content Strategy',
    href: '/services/content-marketing',
    desc: 'Publish pages built from real search demand that Google and AI tools both trust.',
  },
];

export const AREAS = [
  {
    slug: 'burbank',
    name: 'Burbank',
    county: 'Los Angeles County',
    region: 'San Fernando Valley',
    tagline: 'SEO & Digital Marketing in Burbank, CA',
    // Authored title, shipped verbatim: brandSuffix: false keeps the ' — Gobiya'
    // tail off it so the two target phrases stay the whole of the title.
    metaTitle: 'SEO Burbank | Digital Marketing Agency Burbank',
    brandSuffix: false,
    metaDescription:
      'Need SEO Burbank businesses can measure? Gobiya is a digital marketing agency Burbank owners trust for local search, AI search, and paid ads.',
    h1: 'SEO Burbank: The Digital Marketing Agency Burbank Businesses Trust',
    heroExcerpt:
      'Local search, AI search, and paid ads for businesses across Burbank and the San Fernando Valley.',
    body: [
      { h2: 'SEO Burbank Business Owners Can Measure' },
      { excerpt: 'Search & Website Optimization in the Burbank Area' },
      {
        p: 'Gobiya is a digital marketing agency Burbank companies call when they want to be found — on Google, on Google Maps, and in AI answers. We provide comprehensive search optimization for businesses throughout the greater Burbank area. Our specialists are seasoned strategists and developers, so every project is executed efficiently and held to the highest standard of quality. Our team is made up of experienced professionals who have spent years building, optimizing, and rescuing websites. We’re proud to be part of this community and to help the businesses around us get found.',
      },
      { cta: true },
      { button: { text: 'Get a FREE Site Audit' } },
      { h3: 'SEO Services We Provide' },
      {
        p: 'A modern website is a network of interconnected systems that demands trained professionals for proper build, optimization, and repair. At Gobiya SEO, we’re proud to field a team of experienced strategists, writers, and developers equipped to handle every part of your online presence.',
      },
      { h4: 'We can help you with:' },
      {
        list: [
          'SEO optimization',
          'Website design, redesign, upgrades, and migrations',
          'AI-ready content',
          'Technical SEO audits',
          'Local SEO and Google Business Profile management',
          'Link building and digital PR',
          'Analytics and performance reporting',
          'And more',
        ],
      },
      { h3: 'Why Choose Gobiya SEO?' },
      {
        p: 'Gobiya SEO has built a reputation as a dependable, trusted search partner in the Burbank area. Backed by a team of highly trained and experienced specialists, we’re dedicated to delivering exceptional results on every engagement.',
      },
      {
        p: 'What separates us from the competition is our commitment to quality execution. Whether you need an urgent fix after a ranking drop, ongoing content and technical maintenance, or a full site rebuild and migration, Gobiya SEO has you covered. Contact our professional team today and see our client service and technical expertise for yourself.',
      },
      { cta: true },
    ],
    image: heroImage(10),
    excerpt: 'SEO, AI search, and paid ads for Burbank businesses.',
    desc: 'Burbank is home to major entertainment studios, production companies, and thousands of small businesses. Gobiya helps Burbank businesses get found on Google, AI search, and beyond.',
    details: [
      'Steps from Warner Bros., Disney, and NBC Universal — Burbank businesses compete in one of the most media-savvy markets in the country.',
      'We help local shops, restaurants, medical offices, and service companies in Burbank rank #1 on Google Maps and organic search.',
      'Our AI & GEO search strategy ensures your Burbank business gets cited by ChatGPT, Perplexity, and Google AI Overviews.',
    ],
  },
  {
    slug: 'echo-park',
    name: 'Echo Park',
    county: 'Los Angeles County',
    region: 'East Los Angeles',
    tagline: 'SEO & Digital Marketing in Echo Park, LA',
    h1: 'Echo Park SEO That Gets Your Business Found First',
    metaTitle: 'Echo Park CA SEO Company | Gobiya SEO',
    metaDescription:
      'Looking for a trusted digital marketing & SEO expert in Echo Park CA? Gobiya SEO builds fast websites and content that ranks. Call now for a free site audit!',
    body: [
      { h2: 'Echo Park SEO & Digital Marketing' },
      { excerpt: 'Search Optimization & Website Services in the Echo Park Area' },
      {
        p: 'Gobiya SEO provides comprehensive search optimization for the independent shops, cafés, studios, and service businesses throughout Echo Park. Our specialists are hands-on strategists, writers, and developers who take every project seriously and hold it to a high standard of quality. Our team has spent years helping small businesses get found by the customers already searching for them. We’re proud to be part of this community and to help our neighbors grow.',
      },
      { cta: true },
      { button: { text: 'Get a FREE Site Audit' } },
      { h3: 'SEO Services We Provide' },
      {
        p: 'A modern website is a set of connected systems that requires trained professionals to build, optimize, and maintain. At Gobiya SEO, we’re proud to field a team equipped to handle every part of your online presence.',
      },
      { h4: 'We can help you with:' },
      {
        list: [
          'SEO optimization',
          'Website design, redesign, upgrades, and migrations',
          'AI-ready content',
          'Technical SEO audits',
          'Local SEO and Google Business Profile management',
          'Link building and digital PR',
          'Analytics and performance reporting',
          'And more',
        ],
      },
      { h3: 'Why Choose Gobiya SEO?' },
      {
        p: 'Gobiya SEO has built a reputation as a dependable, trusted search partner in the Echo Park area. Backed by a team of skilled and experienced specialists, we’re focused on delivering results our clients can actually measure.',
      },
      {
        p: 'What separates us from the competition is our commitment to quality execution. Whether you need a quick fix after a ranking drop, ongoing content and technical maintenance, or a full site rebuild and migration, Gobiya SEO has you covered. Contact our team today and see our client service and technical expertise for yourself.',
      },
      { cta: true },
    ],
    image: heroImage(11),
    excerpt: 'Helping Echo Park shops and studios get found.',
    desc: 'Echo Park is a vibrant, artistic neighborhood with a growing small business scene. Gobiya helps Echo Park businesses build a strong online presence and capture local search traffic.',
    details: [
      'Echo Park\'s diverse mix of boutiques, cafés, fitness studios, and creative agencies all benefit from strong local SEO.',
      'We specialize in Google Business Profile optimization and local map pack rankings for Echo Park neighborhoods.',
      'Our content strategies help Echo Park businesses get cited by AI tools and dominate niche local search queries.',
    ],
  },
  {
    slug: 'glendale',
    name: 'Glendale',
    county: 'Los Angeles County',
    region: 'Verdugo Valley',
    tagline: 'SEO & Digital Marketing in Glendale, CA',
    h1: 'Glendale SEO That Turns Local Searches Into Customers',
    metaTitle: 'Glendale Local SEO Company | SEO Marketing Agency Glendale',
    metaDescription:
      'Gobiya is a Glendale local SEO company and SEO marketing agency in Glendale, CA. Local SEO, Google Business Profile, and content that ranks in AI answers.',
    body: [
      { h2: 'Glendale Local SEO Company: SEO Marketing Agency in Glendale' },
      { excerpt: 'SEO & Website Optimization in the Los Angeles Area' },
      {
        p: 'Gobiya SEO is a Glendale local SEO company working with small businesses and enterprise brands throughout Glendale and the greater Los Angeles area. Glendale holds a special place for us as our founder, Steve Martin, grew up, went to school, and started his website design career right here in Glendale back in 1996. Our specialists are seasoned strategists and developers who make sure your search presence is built to last and held to the highest standard of quality. We’re honored to serve this community and help our local neighbors grow.',
      },
      { cta: { lead: 'Please reach out to us at', style: 'text' } },
      { h3: 'What Our Glendale SEO Marketing Agency Provides' },
      {
        p: 'Search visibility is a complex system that requires skilled professionals to build, maintain, and repair. As an SEO marketing agency Glendale businesses can reach in person, we field a team of experienced strategists, writers, and developers capable of handling every part of your online presence.',
      },
      { h4: 'We can help you with:' },
      {
        list: [
          'SEO optimization',
          'Website design, redesign, upgrades, and migrations',
          'AI-ready content',
          'Technical SEO audits',
          'Local SEO and Google Business Profile management',
          'Link building and digital PR',
          'Analytics and performance reporting',
          'And more',
        ],
      },
      { h3: 'Why Choose Gobiya SEO?' },
      {
        p: 'Gobiya SEO has established itself as a reliable and trusted local SEO company in the Los Angeles area, helping Glendale businesses show up on Google and in AI answers alike. With a team of highly skilled and experienced specialists, we’re committed to delivering exceptional results for our clients.',
      },
      {
        p: 'Our commitment to quality execution sets us apart from our competitors. Whether you need an urgent fix after a ranking drop, ongoing content and technical maintenance, or a full site rebuild and migration, Gobiya SEO has you covered. Reach out to our professional team today to experience our client service and expertise firsthand.',
      },
      { cta: { lead: 'Please reach out to us at' } },
    ],
    // developer-dashboard-review.webp is a two-panel composite with a hard seam
    // down the middle — it reads as a rendering bug at hero width.
    image: heroImage(12),
    excerpt: 'Our founder’s home town, and our closest local market.',
    desc: 'Glendale is one of the largest cities in Los Angeles County, with a business base running from Brand Blvd retail to dental, legal, and creative studios. Gobiya helps Glendale businesses get found on Google, in the map pack, and in AI search.',
    details: [
      'Brand Blvd, the Americana, and the Galleria pull shoppers in from across the Verdugos — local search is how most of them decide where to stop first.',
      'We work with the dental, medical, legal, and home-service practices that make up much of Glendale\'s business base, on Google Maps placement and organic rankings.',
      'Gobiya\'s founder lives in Glendale, so it is the one market we know as residents as well as consultants.',
    ],
  },
  {
    slug: 'hollywood',
    name: 'Hollywood',
    county: 'Los Angeles County',
    region: 'Central Los Angeles',
    tagline: 'SEO & Digital Marketing in Hollywood, CA',
    metaTitle: 'Hollywood SEO Company | Hollywood Search Engine Optimization Services',
    // Authored to length — no ' — Gobiya' tail. See buildMetadata in lib/meta.js.
    brandSuffix: false,
    metaDescription:
      'Looking for a Hollywood SEO company? Gobiya delivers Hollywood search engine optimization services that get you found on Google and cited by AI.',
    h1: 'Hollywood SEO That Puts Your Business in the Spotlight',
    heroEyebrow: 'Serving Hollywood Since 2010',
    heroExcerpt:
      'Gobiya is a Hollywood SEO company offering search engine optimization services that put your business in front of the people already looking for it.',
    body: [
      { h2: 'Hollywood Search Engine Optimization Services' },
      { excerpt: 'Search Optimization & Website Services in the Hollywood Area' },
      {
        p: 'Gobiya is a Hollywood SEO company working with creative agencies, studios, retailers, and service businesses across Hollywood and the surrounding neighborhoods. Our specialists are experienced strategists, writers, and developers who treat every project with the same care and technical rigor, whether it’s a five-page site or a thousand-URL migration. Our team has spent years helping businesses climb the results page and stay there. We’re proud to work in a neighborhood where standing out is the whole job.',
      },
      { cta: true },
      { button: { text: 'Get a FREE Site Audit' } },
      { h3: 'Hollywood SEO Services We Provide' },
      {
        p: 'Search visibility depends on dozens of moving parts working together — site speed, structure, content, authority, and how well machines can read all of it. Our Hollywood search engine optimization services cover every one of those pieces rather than just the easy ones.',
      },
      { h4: 'We can help you with:' },
      {
        list: [
          'SEO optimization',
          'Website design, redesign, upgrades, and migrations',
          'AI-ready content',
          'Technical SEO audits',
          'Local SEO and Google Business Profile management',
          'Link building and digital PR',
          'Analytics and performance reporting',
          'And more',
        ],
      },
      { h3: 'Why Choose Gobiya as Your Hollywood SEO Company?' },
      {
        p: 'Gobiya has earned a reputation across the Hollywood area as a search partner that shows the work and reports the numbers honestly. Backed by a team of skilled, experienced specialists, we’re focused on results our clients can actually measure — traffic, calls, and revenue, not vanity rankings.',
      },
      {
        p: 'What separates our Hollywood search engine optimization services from the competition is our commitment to doing the work properly the first time. Whether you’re recovering from a sudden traffic drop, need steady content and technical upkeep, or are planning a full rebuild without losing hard-won rankings, Gobiya has you covered. Contact our Hollywood SEO team today and see our client service and technical depth for yourself.',
      },
      { cta: { phone: '323-744-1338' } },
    ],
    image: heroImage(13),
    excerpt: 'Search visibility in one of the world’s busiest markets.',
    desc: 'Hollywood is one of the most searched locations in the world. Gobiya is a Hollywood SEO company providing search engine optimization services that help local businesses stand out on Google, rank above competitors, and get found by AI assistants.',
    details: [
      'From the Walk of Fame to Highland Ave, Hollywood businesses face enormous online competition — we help you win it.',
      'We build AI-ready content architectures that get Hollywood restaurants, hotels, studios, and agencies cited by ChatGPT and Claude.',
      'Our PPC management drives high-intent foot traffic and online leads for Hollywood businesses of every size.',
    ],
  },
  {
    slug: 'los-feliz',
    name: 'Los Feliz',
    county: 'Los Angeles County',
    region: 'East Hollywood / Eastside',
    tagline: 'SEO & Digital Marketing in Los Feliz, LA',
    h1: 'Los Feliz SEO That Brings the Neighborhood to Your Door',
    metaTitle: 'Los Feliz CA SEO Company | Gobiya SEO',
    metaDescription:
      'Searching for a reliable digital marketing & SEO expert in Los Feliz CA? Gobiya SEO provides affordable website and SEO services. Call now for a free site audit!',
    body: [
      { h3: 'Los Feliz SEO & Digital Marketing' },
      { excerpt: 'Search Optimization & Website Services in the Los Feliz Area' },
      {
        p: 'Gobiya SEO provides comprehensive search optimization for the boutiques, restaurants, wellness studios, and professional practices throughout Los Feliz. Our specialists are experienced strategists, writers, and developers who handle every project efficiently and hold it to a high standard of quality. Our team has spent years helping neighborhood businesses turn local searches into paying customers. We’re proud to be part of this community and to help our neighbors grow.',
      },
      { cta: true },
      { button: { text: 'Get a FREE Site Audit' } },
      { h3: 'SEO Services We Provide' },
      {
        p: 'A modern website is a set of connected systems that requires trained professionals to build, optimize, and maintain. At Gobiya SEO, we’re proud to field a team equipped to handle every part of your online presence.',
      },
      { h4: 'We can help you with:' },
      {
        list: [
          'SEO optimization',
          'Website design, redesign, upgrades, and migrations',
          'AI-ready content',
          'Technical SEO audits',
          'Local SEO and Google Business Profile management',
          'Link building and digital PR',
          'Analytics and performance reporting',
          'And more',
        ],
      },
      { h3: 'Why Choose Gobiya SEO?' },
      {
        p: 'Gobiya SEO has built a reputation as a dependable, trusted search partner in the Los Feliz area. Backed by a team of skilled and experienced specialists, we’re focused on delivering results our clients can measure.',
      },
      {
        p: 'What separates us from the competition is our commitment to quality execution. Whether you need a fast fix after a ranking drop, ongoing content and technical upkeep, or a full site rebuild and migration, Gobiya SEO has you covered. Contact our team today and see our client service and technical expertise for yourself.',
      },
      { cta: true },
    ],
    image: heroImage(14),
    excerpt: 'Local search built around Los Feliz customers.',
    desc: 'Los Feliz is a tree-lined, community-centered neighborhood with a loyal local customer base. Gobiya helps Los Feliz businesses grow their search presence and attract more local customers.',
    details: [
      'Los Feliz\'s boutique shops, health clinics, yoga studios, and restaurants all compete for local search visibility.',
      'We help Los Feliz businesses rank on Google Maps and appear in AI search results for local intent queries.',
      'Our white-hat, honest approach has helped Los Angeles Eastside businesses grow online since 2010.',
    ],
  },
  {
    slug: 'sherman-oaks',
    name: 'Sherman Oaks',
    county: 'Los Angeles County',
    region: 'San Fernando Valley',
    tagline: 'SEO & Digital Marketing in Sherman Oaks, CA',
    h1: 'Sherman Oaks SEO That Makes You the Obvious Choice',
    metaTitle: 'SEO Company Sherman Oaks | Local SEO Services | SEO San Fernando Valley',
    metaDescription:
      'Looking for a reliable internet marketing & SEO expert in Sherman Oaks CA? Gobiya SEO provides affordable website and AI SEO services. Call now for a free site audit!',
    body: [
      { h2: 'Sherman Oaks SEO & Website Marketing' },
      { excerpt: 'Search Optimization & Website Services in the Sherman Oaks Area' },
      {
        p: 'Gobiya SEO provides comprehensive search optimization for businesses throughout Sherman Oaks and the surrounding San Fernando Valley. Our local specialists are experienced strategists, writers, and developers who make sure every project is executed efficiently and held to the highest standard of quality work. Our team has spent years at helping local businesses get found online. We’re proud to be part of this community and to help our neighbors grow.',
      },
      { cta: { tail: 'for all your website and SEO needs.' } },
      { button: { text: 'Get a FREE Site Audit' } },
      { h3: 'Sherman Oaks SEO Company: Local SEO Services Across the San Fernando Valley' },
      {
        p: 'A modern website is a network of connected systems & platforms that requires trained professionals to build, optimize, and maintain. At Gobiya SEO, we’re proud to field a team equipped to handle every part of your online presence.',
      },
      { h4: 'We can help you with:' },
      {
        list: [
          'SEO optimization',
          'Website design, redesign, upgrades, and migrations',
          'AI-ready content',
          'Technical SEO audits',
          'Local SEO and Google Business Profile management',
          'Link building and digital PR',
          'Analytics and performance reporting',
          'And more',
        ],
      },
      { h3: 'Why Choose Gobiya SEO?' },
      {
        p: 'Gobiya SEO has built a reputation as a dependable, trusted search partner in the Sherman Oaks area. Backed by a team of skilled and experienced specialists, we’re dedicated to delivering measurable results on every engagement.',
      },
      {
        p: 'What separates us from the competition is our commitment to our quality execution. Whether you need an urgent fix after a ranking drop, ongoing content and technical maintenance, or a full site rebuild and migration, Gobiya SEO has you covered. Contact our team today and see our client service and technical expertise for yourself.',
      },
      { cta: true },
    ],
    image: heroImage(15),
    excerpt: 'A Valley-local team, working Sherman Oaks since 2010.',
    desc: 'Sherman Oaks is a major commercial and residential hub in the San Fernando Valley. Gobiya has helped Sherman Oaks businesses recover from ranking drops and grow their digital presence since 2010.',
    details: [
      'Sherman Oaks is one of the Valley\'s most competitive local search markets — especially for legal, dental, and medical practices.',
      'We provide technical SEO audits, Google Business Profile recovery, and PPC management for Sherman Oaks businesses.',
      'Our team is local to the San Fernando Valley and understands the Sherman Oaks market inside and out.',
    ],
  },
  {
    slug: 'silverlake',
    name: 'Silver Lake',
    county: 'Los Angeles County',
    region: 'East Los Angeles',
    tagline: 'SEO & Digital Marketing in Silver Lake, LA',
    h1: 'Silver Lake SEO That Gets You Found Before the Competition',
    metaTitle: 'SEO Company Silver Lake CA | Gobiya SEO',
    metaDescription:
      'Searching for a dependable digital marketing & SEO expert in Silver Lake CA? Gobiya SEO builds fast websites and content that earns rankings.',
    body: [
      { h2: 'Silver Lake SEO & Digital Marketing' },
      { excerpt: 'Search Optimization & Website Services in the Silver Lake Area' },
      {
        p: 'Gobiya SEO provides end-to-end search optimization for the independent shops, restaurants, studios, and professional practices that make up Silver Lake. Our specialists are hands-on strategists, writers, and developers who build sites meant to be found — not just admired. Our team has spent years turning quiet websites into steady sources of calls and customers. We’re glad to work in a neighborhood where small, independent businesses set the tone, and we build for exactly that kind of client.',
      },
      { cta: true },
      { button: { text: 'Get a FREE Site Audit' } },
      { h3: 'SEO Services We Provide' },
      {
        p: 'Ranking well isn’t one task — it’s a stack of them, from technical health and page speed to content quality and the authority your site has earned over time. At Gobiya SEO, we’re proud to field a team that handles the whole stack, including the unglamorous technical work most agencies quietly skip.',
      },
      { h4: 'We can help you with:' },
      {
        list: [
          'SEO optimization',
          'Website design, redesign, upgrades, and migrations',
          'AI-ready content',
          'Technical SEO audits',
          'Local SEO and Google Business Profile management',
          'Link building and digital PR',
          'Analytics and performance reporting',
          'And more',
        ],
      },
      { h3: 'Why Choose Gobiya SEO?' },
      {
        p: 'Gobiya SEO has become a trusted search partner for Silver Lake businesses that want real growth without the jargon and guesswork. Backed by a team of skilled, experienced specialists, we explain what we’re doing, why it matters, and what it’s producing — every month.',
      },
      {
        p: 'What separates us from the competition is our commitment to doing the work right the first time. Whether you need to recover from a drop in traffic, keep your content and technical health on track month to month, or rebuild your site without surrendering the rankings you’ve already earned, Gobiya SEO has you covered. Contact our team today and see our client service and technical depth for yourself.',
      },
      { cta: true },
    ],
    image: heroImage(16),
    excerpt: 'Search work that keeps up with Silver Lake.',
    desc: 'Silver Lake is one of LA\'s most trendy and digitally-savvy neighborhoods. Gobiya helps Silver Lake businesses build strong SEO foundations and compete in a fast-moving local market.',
    details: [
      'Silver Lake\'s creative economy — from coffee shops to design studios — depends on strong online visibility to attract customers.',
      'We specialize in content strategy and AI-ready SEO that helps Silver Lake businesses get recommended by AI tools.',
      'Our transparent, no-contract approach has made us a trusted partner for Silver Lake small businesses since 2010.',
    ],
  },
  {
    slug: 'studio-city',
    name: 'Studio City',
    county: 'Los Angeles County',
    region: 'San Fernando Valley',
    tagline: 'SEO & Digital Marketing in Studio City, CA',
    // Authored title, shipped verbatim: brandSuffix: false keeps the ' — Gobiya'
    // tail off it so the three target phrases stay the whole of the title.
    metaTitle: 'Technical SEO Services Studio City | Lead Generation | Digital Marketing Company',
    brandSuffix: false,
    metaDescription:
      'Gobiya delivers technical SEO services Studio City businesses use for lead generation — a digital marketing company with 16 years of search engineering.',
    h1: 'Studio City SEO Services Made Affordable',
    heroExcerpt:
      'Search engineering, local visibility, and qualified calls for businesses across Studio City and the San Fernando Valley.',
    body: [
      { h2: 'Technical SEO Services Studio City Businesses Rely On' },
      { excerpt: 'Search Optimization & Website Services in the Studio City Area' },
      {
        p: 'Gobiya SEO is a digital marketing company serving small and medium-sized businesses across Studio City and the surrounding San Fernando Valley. Our search strategists, content creators, and web developers build campaigns around lead generation rather than vanity metrics: organic traffic, top Google Maps rankings, and qualified calls that turn into work.',
      },
      { cta: { phone: '323-744-1338', tail: 'for all your website & SEO needs.' } },
      { button: { text: 'Get a FREE Site Audit' } },
      { h3: 'SEO Services We Provide' },
      {
        p: 'A modern website requires technical precision, schema architecture, and ongoing optimization. At Gobiya SEO, our digital marketing team is equipped to handle every aspect of your online presence so your business stands out on Google and generative AI platforms.',
      },
      { h4: 'We can help you with:' },
      {
        list: [
          'SEO optimization',
          'Website design, redesign, upgrades, and migrations',
          'AI-ready content',
          'Technical SEO audits',
          'Local SEO and Google Business Profile management',
          'Link building and digital PR',
          'Analytics and performance reporting',
          'And more',
        ],
      },
      { h3: 'Why Choose Gobiya SEO?' },
      {
        p: 'Gobiya SEO has built a stellar reputation as a reliable, results-driven SEO services provider and digital marketing company in Studio City. Backed by over 16 years of search engineering experience, we focus on delivering transparent, measurable growth.',
      },
      {
        p: 'What separates us from other digital marketing agencies is our commitment to quality execution. Whether you need a fast recovery after an algorithm update, steady technical upkeep, or a complete website redesign and migration, Gobiya SEO has you covered. Contact our Studio City digital marketing specialists today.',
      },
      { cta: { phone: '323-744-1338' } },
    ],
    image: heroImage(17),
    excerpt: 'Google and AI visibility for Studio City businesses.',
    desc: 'Studio City is a prime upscale neighborhood at the foot of the Hollywood Hills. Gobiya helps Studio City businesses achieve top Google rankings and AI search visibility.',
    details: [
      'Studio City\'s restaurants, boutiques, and professional services all compete for top local search placement.',
      'We help Studio City businesses rank on Google Maps, recover from algorithm updates, and grow with paid ads.',
      'Our team has served Studio City and the surrounding Valley area for over 16 years.',
    ],
  },
  {
    slug: 'koreatown',
    name: 'Koreatown',
    county: 'Los Angeles County',
    region: 'Central Los Angeles',
    tagline: 'SEO & Digital Marketing in Koreatown, LA',
    h1: 'Koreatown SEO That Puts You Ahead of the Business Two Doors Down',
    metaTitle: 'Koreatown Website & SEO Company | Gobiya SEO Los Angeles',
    metaDescription:
      'Looking for a reliable website & SEO expert in Koreatown LA? Gobiya SEO builds sites that rank and content that converts. Call today for a free site audit!',
    body: [
      { h2: 'Koreatown SEO & Digital Marketing' },
      { excerpt: 'Search Optimization & Website Services in the Koreatown Area' },
      {
        p: 'Gobiya SEO provides complete search optimization for the restaurants, salons, medical offices, law firms, and retail businesses packed into Koreatown. Our specialists are hands-on strategists, writers, and developers who understand that in one of the densest commercial districts in Los Angeles, being invisible on Google means losing customers to the business two doors down. Our team has spent years helping local businesses claim the top of the map pack and hold it. We’re proud to work in a neighborhood where competition is fierce and reputation travels fast.',
      },
      { cta: true },
      { button: { text: 'Get a FREE Site Audit' } },
      { h3: 'SEO Services We Provide' },
      {
        p: 'Search performance comes down to how well your site is built, how useful your content is, and how much authority you’ve earned and all three need constant attention. At Gobiya SEO, we’re proud to field a team that covers every part of that picture, from server response times to the review strategy behind your Google listing.',
      },
      { h4: 'We can help you with:' },
      {
        list: [
          'SEO optimization',
          'Website design, redesign, upgrades, and migrations',
          'AI-ready content',
          'Technical SEO audits',
          'Local SEO and Google Business Profile management',
          'Link building and digital PR',
          'Analytics and performance reporting',
          'And more',
        ],
      },
      { h3: 'Why Choose Gobiya SEO?' },
      {
        p: 'Gobiya SEO has built a reputation among Koreatown businesses as a search partner that delivers measurable results instead of monthly jargon. Backed by a team of skilled, experienced specialists, we focus on the numbers that actually matter to an owner phone calls, bookings, foot traffic, and revenue.',
      },
      {
        p: 'What separates us from the competition is our commitment to doing the work properly the first time. Whether you’re recovering from a sudden drop in traffic, need consistent content and technical upkeep, or want a full rebuild that doesn’t cost you the rankings you’ve already earned, Gobiya SEO has you covered. Contact our team today and see our client service and technical depth for yourself.',
      },
      { cta: true },
    ],
    image: heroImage(18),
    excerpt: 'Standing out in one of LA’s densest markets.',
    // The only city with an `office`: 90010 is Gobiya's own ZIP, so this is the
    // one page that can carry a street address without claiming a location the
    // business does not have. Values are duplicated nowhere — the page reads
    // phone and email from lib/nav.js CONTACT, and the street/city/ZIP here
    // match components/SiteSchema.js exactly, because both end up in JSON-LD
    // under the same organization @id and must not contradict each other.
    office: {
      street: '3580 Wilshire Blvd, Ste 132',
      locality: 'Los Angeles',
      region: 'CA',
      postalCode: '90010',
      note: 'Our office is on Wilshire Blvd in Wilshire Center, minutes from Koreatown — 90010 is our own ZIP code.',
    },
    desc: 'Koreatown is one of LA\'s densest and most vibrant urban neighborhoods, with thousands of businesses competing for visibility. Gobiya helps Koreatown businesses win on Google, Yelp, and AI search.',
    details: [
      'Koreatown\'s restaurants, spas, medical offices, and retail shops face one of LA\'s most competitive local search environments.',
      'We provide bilingual-aware content strategies and AI search optimization for Koreatown businesses serving diverse communities.',
      'Our Google Business Profile and local SEO services have helped Koreatown businesses recover and grow their digital footprint.',
    ],
  },
  {
    slug: 'downtown',
    name: 'Downtown Los Angeles',
    county: 'Los Angeles County',
    region: 'Central Los Angeles',
    tagline: 'SEO & Digital Marketing in Downtown LA',
    h1: 'Downtown LA SEO That Makes Your Business Impossible to Miss',
    metaTitle: 'Downtown Los Angeles SEO Company | Gobiya SEO',
    metaDescription:
      'Looking for a reliable Digital marketing & SEO expert in Downtown Los Angeles? Look no further than Gobiya SEO! Our team is dedicated to providing top-quality website and SEO services. Call now!',
    // Authored body. When `body` is present the city page renders it in place
    // of the generated heading + region/county strip + details list.
    body: [
      { h2: 'Downtown Los Angeles SEO' },
      { excerpt: 'SEO & Optimization in the Los Angeles Area' },
      {
        p: 'Gobiya SEO provides comprehensive SEO services for SMBs throughout the greater Los Angeles area. Our experts are experienced in AI and SEO, so every website optimization is completed efficiently and held to the highest standard and guidelines. Our team is made up of seasoned professionals who have spent decades designing websites, recovering rankings, boosting ad campaigns and getting found with AI. We are proud to be part of this community and to protect the people and businesses around us.',
      },
      { cta: true },
      { h3: 'SEO Services We Provide' },
      {
        p: 'A modern website is a multi-platform system that demands trained professionals for proper build, optimization, reporting, and recovery. At Gobiya SEO, we’re proud to field a team of experienced strategists, writers, and developers equipped to handle every part of your search and AI visibility.',
      },
      { h4: 'We can help you with:' },
      {
        list: [
          'SEO optimization',
          'Website design, redesign, upgrades, and migrations',
          'AI-ready content',
          'Technical SEO audits and site health monitoring',
          'Local SEO and Google Business Profile management',
          'Link building and digital PR',
          'Analytics, tracking, and performance reporting',
          'And more',
        ],
      },
      { h3: 'Why Choose Gobiya SEO?' },
      {
        p: 'Gobiya SEO has built a reputation as a dependable, trusted search partner for businesses that need to be found — on Google and in AI answers alike. Backed by a team of highly trained and experienced specialists, we’re dedicated to delivering exceptional work on every engagement.',
      },
      {
        p: 'What separates us from the competition is our commitment to quality execution. Whether you need an urgent fix after a ranking drop, ongoing content and technical maintenance, or a full site rebuild and migration, Gobiya SEO has you covered. Contact our professional team today and see our client service and technical expertise for yourself.',
      },
      { cta: true },
    ],
    image: heroImage(19),
    excerpt: 'Search authority for the center of the city.',
    desc: 'Downtown Los Angeles is the business and cultural heart of the city. Gobiya helps DTLA businesses rank higher, attract more customers, and dominate both Google and AI search results.',
    details: [
      'Downtown LA is home to law firms, financial services, hotels, restaurants, and thousands of small businesses all competing online.',
      'We provide comprehensive SEO, PPC management, and AI search strategies for businesses in the DTLA market.',
      'Our team helps Downtown LA businesses get cited in AI assistants, recover from Google ranking drops, and build lasting search authority.',
    ],
  },
];
