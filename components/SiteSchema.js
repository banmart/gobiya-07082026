import { CONTACT } from '../lib/nav';

const BASE = 'https://www.gobiya.com';

// Sitewide entity graph: the agency (ProfessionalService is a LocalBusiness
// subtype, so it carries both Organization and local signals), the founder,
// and the website. Article schema on insight pages references these @ids.
const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfessionalService',
      '@id': `${BASE}/#organization`,
      name: 'Gobiya',
      legalName: 'Gobiya LLC',
      url: `${BASE}/`,
      logo: `${BASE}/assets/img/logo-gobiya-red.webp`,
      image: `${BASE}/assets/img/og-default.jpg`,
      description:
        'Los Angeles technical SEO and AI visibility agency. Algorithm and penalty recovery, GEO/AI-citation engineering, content strategy, authority building, and custom Next.js development.',
      foundingDate: '2010',
      founder: { '@id': `${BASE}/about/steve-martin#person` },
      telephone: '+1-323-744-1338',
      email: CONTACT.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: CONTACT.address1,
        addressLocality: 'Los Angeles',
        addressRegion: 'CA',
        postalCode: '90010',
        addressCountry: 'US',
      },
      areaServed: [
        { '@type': 'City', name: 'Los Angeles' },
        { '@type': 'State', name: 'California' },
        { '@type': 'Country', name: 'United States' },
      ],
      priceRange: '$$$',
      sameAs: [CONTACT.linkedin, CONTACT.twitter, CONTACT.facebook, CONTACT.yelp],
    },
    {
      '@type': 'Person',
      '@id': `${BASE}/about/steve-martin#person`,
      name: 'Steve Martin',
      url: `${BASE}/about/steve-martin`,
      image: `${BASE}/assets/img/steve-portrait.webp`,
      jobTitle: 'Founder & Principal',
      worksFor: { '@id': `${BASE}/#organization` },
      homeLocation: { '@type': 'Place', name: 'Glendale, CA' },
      alumniOf: { '@type': 'CollegeOrUniversity', name: 'Glendale College' },
      sameAs: [CONTACT.linkedin, CONTACT.twitter],
    },
    {
      '@type': 'WebSite',
      '@id': `${BASE}/#website`,
      name: 'Gobiya',
      url: `${BASE}/`,
      publisher: { '@id': `${BASE}/#organization` },
    },
  ],
};

export default function SiteSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }}
    />
  );
}
