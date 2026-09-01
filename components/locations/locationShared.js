import ClientLogos from '../ClientLogos';
import CommunityReviews from '../CommunityReviews';
import { CONTACT } from '../../lib/nav';
import { FOUNDED_YEAR } from '../../lib/authority';

const BASE = 'https://www.gobiya.com';

/**
 * Shared pieces for the four location pages.
 *
 * Only schema, proof and the closing block live here. The two office pages and
 * the two service-area pages each have their own layout, because a page with a
 * real address on it is making a different argument from one that is not.
 */

/** LocalBusiness node for a location that has a real, staffed address. */
export function officeSchema(location) {
  const url = `${BASE}/${location.slug}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': `${url}#localbusiness`,
        name: `Gobiya — ${location.name}`,
        url,
        telephone: location.phone,
        parentOrganization: { '@id': `${BASE}/#organization` },
        address: {
          '@type': 'PostalAddress',
          streetAddress: location.streetAddress,
          addressLocality: location.addressLocality,
          addressRegion: location.addressRegion,
          postalCode: location.postalCode,
          addressCountry: location.addressCountry,
        },
        // Neither location publishes hours of its own, so both carry the
        // org-wide 9–5 weekday hours (CONTACT.hoursDays / hoursTime).
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '17:00',
        },
        areaServed: (location.areaServed || []).map((a) => ({
          '@type': a.type,
          name: a.name,
        })),
      },
      breadcrumbs(url, location.name),
    ],
  };
}

/**
 * Service node for an area we cover without an address there.
 *
 * Deliberately not a LocalBusiness: claiming a physical presence in a city we
 * do not have an office in is exactly the signal Google's local spam policies
 * exist to catch.
 */
export function areaSchema(area) {
  const url = `${BASE}/${area.liveSlug}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: `SEO in ${area.name}`,
        serviceType: 'Search Engine Optimization',
        url,
        provider: { '@id': `${BASE}/#organization` },
        areaServed: [
          { '@type': 'City', name: area.name },
          { '@type': 'AdministrativeArea', name: area.region },
          { '@type': 'AdministrativeArea', name: area.county },
          { '@type': 'State', name: 'California' },
        ],
      },
      breadcrumbs(url, area.name),
    ],
  };
}

function breadcrumbs(url, name) {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumbs`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/` },
      { '@type': 'ListItem', position: 2, name, item: url },
    ],
  };
}

export function LocationSchema({ schema }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function LocationProof({ featured }) {
  return (
    <>
      <ClientLogos />
      <CommunityReviews
        heading="Trusted by Businesses Across Los Angeles"
        dek={`Since ${FOUNDED_YEAR}, Los Angeles businesses have trusted us for honest, reliable search work.`}
        featured={featured}
        more={{ text: 'View all client work', href: '/work' }}
      />
    </>
  );
}

export function LocationCta({ title, phone = CONTACT.phone, phoneHref }) {
  return (
    <section className="cta section section--tint" id="contact">
      <div className="container container--narrow">
        <h2 className="cta__title">{title}</h2>
        <div className="cta__actions">
          <a href="?onboarding=true" className="btn btn--solid btn--big" title="Schedule a free consultation">
            Schedule a Consultation
          </a>
          <a href={phoneHref || `tel:+13237441338`} className="btn btn--ghost btn--big" title={`Call Gobiya at ${phone}`}>
            {phone}
          </a>
        </div>
      </div>
    </section>
  );
}
