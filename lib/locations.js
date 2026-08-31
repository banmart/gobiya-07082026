// Canonical NAP data for Gobiya's two physical locations. /van-nuys-seo and
// /los-angeles-seo both render from this file, and each page's LocalBusiness
// schema reads it directly — a wrong value here is wrong everywhere it's
// used, including against each location's Google Business Profile.
//
// Phone numbers are location-specific tracking numbers, not the general
// site-wide CONTACT.phone in lib/nav.js — the two are allowed to differ.
//
// Hours default to the org-wide hours already declared in lib/nav.js
// (CONTACT.hoursDays/hoursTime) because neither location has published
// different hours. Update per-location if that changes.

export const LOCATIONS = {
  'van-nuys-seo': {
    slug: 'van-nuys-seo',
    name: 'Van Nuys',
    metaTitle: 'Van Nuys SEO | Get Found Across the Valley | Gobiya',
    metaDescription:
      'Van Nuys SEO from a local office on Delano St — local search, AI search, and paid ads that get San Fernando Valley businesses found. Call (323) 744-1338.',
    h1: 'Van Nuys SEO That Gets You Found Across the Valley',
    tagline: 'Our San Fernando Valley Office',
    dek: 'Van Nuys SEO, AI search, and paid ads for businesses across the San Fernando Valley.',
    // Office photo, rendered under the intro by components/LocationTemplate.js.
    // Optional — a location without one simply renders no figure.
    image: {
      src: '/assets/img/van-nuys-office.webp',
      width: 680,
      height: 382,
      alt: 'Gobiya’s Van Nuys office — a workstation showing the Gobiya Marketing site, beside a Google Partners banner',
      caption: 'Inside the Van Nuys office — a Google Partner agency.',
    },
    intro:
      'Van Nuys SEO from Gobiya’s local office puts our search team closer to the San Fernando Valley businesses we work with — retailers, medical offices, home service companies, and professional practices that need to show up on Google, on Google Maps, and in AI answers. We handle the same full range of work here as we do from our Los Angeles headquarters: technical SEO, AI and GEO optimization, PPC, and content built from real search demand.',
    streetAddress: '14553 Delano St #315',
    addressLocality: 'Van Nuys',
    addressRegion: 'CA',
    postalCode: '91411',
    addressCountry: 'US',
    phone: '(323) 744-1338',
    phoneHref: 'tel:+13237441338',
    areaServed: [
      { type: 'City', name: 'Van Nuys' },
      { type: 'AdministrativeArea', name: 'San Fernando Valley' },
      { type: 'AdministrativeArea', name: 'Los Angeles County' },
      { type: 'State', name: 'California' },
    ],
    // Set once the Van Nuys Google Business Profile is live — either the
    // short link (g.page/r/.../review) or search.google.com/local/writereview?placeid=...
    // The "Leave us a review" button only renders when this is set.
    reviewUrl: null,
    clients: [
      'Total Capital Inc.',
      'Van Nuys Offices',
      'Dr. Nati Zilberstein, Gastroenterologist',
      'Dr. Avi Zilberstein, DDS',
    ],
  },
  'los-angeles-seo': {
    slug: 'los-angeles-seo',
    name: 'Los Angeles',
    metaTitle: 'Los Angeles SEO | Be the One Buyers Find First | Gobiya',
    metaDescription:
      'Los Angeles SEO from our Wilshire Blvd headquarters: technical SEO, AI search, and paid ads that make LA businesses the ones buyers find first.',
    h1: 'Los Angeles SEO That Makes You the One Buyers Find First',
    tagline: 'Our Los Angeles Headquarters',
    dek: 'Los Angeles SEO, AI search, and paid ads for businesses across the city and Southern California.',
    intro:
      'Los Angeles SEO is run from our Wilshire Blvd headquarters, working with businesses across the city and the wider Southern California region. Our specialists are seasoned strategists and developers who handle every part of your online presence — technical SEO, AI and GEO optimization, PPC, and content that earns rankings and citations alike.',
    streetAddress: '3580 Wilshire Blvd, STE 132',
    addressLocality: 'Los Angeles',
    addressRegion: 'CA',
    postalCode: '90010',
    addressCountry: 'US',
    phone: '(310) 307-9830',
    phoneHref: 'tel:+13103079830',
    areaServed: [
      { type: 'City', name: 'Los Angeles' },
      { type: 'State', name: 'California' },
    ],
    // No review link for now — set here when one is ready to go live.
    reviewUrl: null,
  },
};

export function getLocation(slug) {
  return LOCATIONS[slug] || null;
}
