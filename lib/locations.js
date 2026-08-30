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
    metaTitle: 'SEO Van Nuys | Gobiya Digital Marketing Office',
    metaDescription:
      'Gobiya’s Van Nuys office serves San Fernando Valley businesses with SEO, AI search, and paid ads. Call (323) 744-1338 or stop by.',
    h1: 'SEO Van Nuys Businesses Trust',
    tagline: 'Our San Fernando Valley Office',
    dek: 'Local search, AI search, and paid ads for businesses across Van Nuys and the San Fernando Valley.',
    intro:
      'Gobiya’s Van Nuys office puts our search team closer to the San Fernando Valley businesses we work with — retailers, medical offices, home service companies, and professional practices that need to show up on Google, on Google Maps, and in AI answers. We handle the same full range of work here as we do from our Los Angeles headquarters: technical SEO, AI and GEO optimization, PPC, and content built from real search demand.',
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
  },
  'los-angeles-seo': {
    slug: 'los-angeles-seo',
    name: 'Los Angeles',
    metaTitle: 'SEO Los Angeles | Gobiya Headquarters',
    metaDescription:
      'Gobiya’s Los Angeles headquarters on Wilshire Blvd. SEO, AI search, and paid ads for businesses across LA. Call (310) 307-9830.',
    h1: 'SEO Los Angeles Businesses Trust',
    tagline: 'Our Los Angeles Headquarters',
    dek: 'Local search, AI search, and paid ads for businesses across Los Angeles and Southern California.',
    intro:
      'Gobiya is headquartered on Wilshire Blvd in Los Angeles, working with businesses across the city and the wider Southern California region. Our specialists are seasoned strategists and developers who handle every part of your online presence — technical SEO, AI and GEO optimization, PPC, and content that earns rankings and citations alike.',
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
