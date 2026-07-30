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
    href: '/seo-services',
    desc: 'Fix what stops Google from reading your site, then earn map pack and organic placement.',
  },
  {
    tag: 'AI Search',
    title: 'AI & GEO Optimization',
    href: '/geo-services-los-angeles',
    desc: 'Get named when customers ask ChatGPT, Perplexity, or Google AI Overviews.',
  },
  {
    tag: 'Paid Media',
    title: 'PPC & Lead Generation',
    href: '/ppc-management-services',
    desc: 'Rebuild Google Ads around what a booked job actually costs, not clicks.',
  },
  {
    tag: 'Content',
    title: 'Content Strategy',
    href: '/content-marketing-strategies',
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
    image: heroImage(13),
    excerpt: 'Search visibility in one of the world’s busiest markets.',
    desc: 'Hollywood is one of the most searched locations in the world. Gobiya helps Hollywood businesses stand out on Google, rank above competitors, and get found by AI assistants.',
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
    slug: 'silver-lake',
    name: 'Silver Lake',
    county: 'Los Angeles County',
    region: 'East Los Angeles',
    tagline: 'SEO & Digital Marketing in Silver Lake, LA',
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
