import Breadcrumbs from '../../components/Breadcrumbs';
import { buildMetadata } from '../../lib/meta';
import { CONTACT } from '../../lib/nav';

export const metadata = buildMetadata({
  title: 'Areas We Serve in Los Angeles | Gobiya SEO',
  description: 'Gobiya SEO serves businesses across Los Angeles — Burbank, Glendale, Hollywood, Silver Lake, Studio City, Sherman Oaks, Koreatown, Echo Park, Los Feliz, Downtown LA, and more. Request a Quote today.',
  path: '/areas-we-serve',
});

const BASE = 'https://www.gobiya.com';

// LA County neighborhoods and cities we actively serve.
const LA_COUNTY = [
  'Burbank', 'Glendale', 'Hollywood', 'Silver Lake', 'Echo Park',
  'Los Feliz', 'Studio City', 'Sherman Oaks', 'Koreatown',
  'Downtown Los Angeles', 'Pasadena', 'Alhambra', 'Arcadia',
  'Monrovia', 'San Dimas', 'West Covina', 'El Monte',
  'Whittier', 'Downey', 'Compton', 'Torrance', 'Hawthorne',
  'Inglewood', 'Culver City', 'Santa Monica', 'Venice',
  'West Hollywood', 'Beverly Hills', 'Encino', 'Woodland Hills',
  'Van Nuys', 'North Hollywood', 'Northridge', 'Chatsworth',
  'Reseda', 'Tarzana', 'Canoga Park', 'Thousand Oaks',
  'Long Beach', 'Carson', 'Lakewood', 'Norwalk',
  'Pomona', 'Covina', 'Glendora', 'La Puente',
  'East Los Angeles', 'Boyle Heights', 'Montebello', 'Bell Gardens',
];

// Orange County cities we serve.
const ORANGE_COUNTY = [
  'Anaheim', 'Santa Ana', 'Irvine', 'Orange',
  'Fullerton', 'Garden Grove', 'Huntington Beach', 'Oceanside',
  'Costa Mesa', 'Mission Viejo', 'Buena Park', 'Newport Beach',
  'Lake Forest', 'Tustin', 'Westminster', 'Yorba Linda',
  'Fountain Valley', 'Laguna Niguel', 'San Clemente', 'Aliso Viejo',
];

// All areas listed on this page — used for schema areaServed.
const ALL_AREAS = [
  ...LA_COUNTY.map((name) => ({ name, county: 'Los Angeles County', state: 'CA' })),
  ...ORANGE_COUNTY.map((name) => ({ name, county: 'Orange County', state: 'CA' })),
];

// Schema: one Service + one LocalBusiness stub tied to the org @id.
// areaServed covers every city/neighborhood we list on this page so the
// declaration is honest and verifiable from a single canonical URL.
const areasSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      name: 'SEO & Digital Marketing — Los Angeles & Orange County',
      serviceType: 'Search engine optimization',
      description:
        'Gobiya provides SEO, AI search (GEO), PPC, and content marketing for businesses across Los Angeles County and Orange County, CA.',
      url: `${BASE}/areas-we-serve`,
      provider: { '@id': `${BASE}/#organization` },
      areaServed: ALL_AREAS.map((a) => ({
        '@type': 'Place',
        name: a.name,
        containedInPlace: {
          '@type': 'AdministrativeArea',
          name: a.county,
          containedInPlace: { '@type': 'State', name: 'California' },
        },
      })),
    },
    {
      // Stub merges with the main org entity in SiteSchema via shared @id.
      '@type': 'LocalBusiness',
      '@id': `${BASE}/#organization`,
      name: 'Gobiya',
      url: `${BASE}/`,
      telephone: '+1-323-744-1338',
      email: CONTACT.email,
      areaServed: [
        { '@type': 'AdministrativeArea', name: 'Los Angeles County' },
        { '@type': 'AdministrativeArea', name: 'Orange County' },
        { '@type': 'State', name: 'California' },
      ],
    },
  ],
};

export default function AreasWeServePage() {
  return (
    <main id="top">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(areasSchema) }}
      />

      {/* ══ Coverage listing ══ */}
      <section className="mw-areas-index">
        <div className="container">
          <h2 className="mw-areas-index__heading">Cities &amp; Neighborhoods We Serve</h2>
          <p className="mw-areas-index__intro">
            Gobiya works with businesses across Los Angeles County and Orange County. If your city is listed below, we know your market.
          </p>

          <div className="mw-areas-coverage">
            <div className="mw-areas-coverage__county">
              <h3 className="mw-areas-coverage__county-name">Los Angeles County</h3>
              <ul className="mw-areas-coverage__list">
                {LA_COUNTY.map((city) => (
                  <li key={city} className="mw-areas-coverage__item">
                    <span className="mw-areas-coverage__pin" aria-hidden="true">📍</span>
                    {city}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mw-areas-coverage__county">
              <h3 className="mw-areas-coverage__county-name">Orange County</h3>
              <ul className="mw-areas-coverage__list">
                {ORANGE_COUNTY.map((city) => (
                  <li key={city} className="mw-areas-coverage__item">
                    <span className="mw-areas-coverage__pin" aria-hidden="true">📍</span>
                    {city}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mw-areas-index__note">
            Don&apos;t see your city? We serve all of Southern California —&nbsp;
            <a href="/contact">contact us</a> and we&apos;ll let you know how we can help.
          </p>
        </div>
      </section>

      {/* ══ Closing CTA ══ */}
      <section className="mw-area-bottom-cta">
        <div className="container">
          <h2 className="mw-area-bottom-cta__title">
            Ready to Grow Your Business?
          </h2>
          <p className="mw-area-bottom-cta__desc">
            SEO, AI search, and PPC across Los Angeles and Orange County since 2010. Month-to-month, no long-term contracts, no surprises.
          </p>
          <div className="mw-area-bottom-cta__actions">
            <a href="?onboarding=true" className="mw-area-cta__btn mw-area-cta__btn--primary">
              Request a Quote
            </a>
            <a href="/contact" className="mw-area-cta__btn mw-area-cta__btn--secondary">
              Contact Us
            </a>
          </div>
          <div className="mw-cta-arrow-wrapper">
            <img src="/assets/img/get-started-grey.png" alt="Get started today" className="mw-arrow-img mw-arrow-img--light" />
            <img src="/assets/img/get-started-arrow.png" alt="Get started today" className="mw-arrow-img mw-arrow-img--dark" />
          </div>
        </div>
      </section>
    </main>
  );
}
