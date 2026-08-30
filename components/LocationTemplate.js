import PageHero from './PageHero';
import CommunityReviews from './CommunityReviews';
import ClosingCta from './ClosingCta';
import ExcellenceGrid from './ExcellenceGrid';
import { AREA_SERVICES } from '../lib/areas';

const BASE = 'https://www.gobiya.com';

// One template for both physical-location pages (/van-nuys-seo,
// /los-angeles-seo). Each location is its own LocalBusiness node in schema,
// linked to the main organization via `branchOf` — the standard pattern for
// a business with more than one Google Business Profile listing, so the
// two pages don't collide with or duplicate the sitewide org entity in
// components/SiteSchema.js.
export default function LocationTemplate({ location }) {
  const path = `/${location.slug}`;
  const fullAddress = `${location.streetAddress}, ${location.addressLocality}, ${location.addressRegion} ${location.postalCode}`;
  const directionsUrl = `https://maps.google.com/?q=${encodeURIComponent(fullAddress)}`;
  const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}&output=embed`;

  const locationSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${BASE}${path}#location`,
    name: 'Gobiya',
    url: `${BASE}${path}`,
    branchOf: { '@id': `${BASE}/#organization` },
    image: `${BASE}/assets/img/og-default.jpg`,
    logo: `${BASE}/assets/img/icon-192.png`,
    telephone: location.phoneHref.replace('tel:', ''),
    priceRange: '$$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: location.streetAddress,
      addressLocality: location.addressLocality,
      addressRegion: location.addressRegion,
      postalCode: location.postalCode,
      addressCountry: location.addressCountry,
    },
    hasMap: directionsUrl,
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '17:00',
    },
    areaServed: location.areaServed.map((a) => ({ '@type': a.type, name: a.name })),
  };

  return (
    <main id="top">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(locationSchema) }}
      />

      {/* ══ 1. Hero ══ */}
      <PageHero
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: location.name }]}
        eyebrow={`SEO & Digital Marketing · ${location.name}`}
        title={location.h1}
        accent={location.tagline}
        dek={location.dek}
        primary={{ text: 'Get Your Analysis', href: '/free-site-scan' }}
        secondary={{ text: `Call ${location.phone}`, href: location.phoneHref }}
      />

      {/* ══ 2. Office details + prose ══ */}
      <section className="gb-body">
        <div className="container">
          <div className="gb-body__grid">
            <div className="gb-body__main gb-prose">
              <h2>{location.name} Office</h2>
              <p>{location.intro}</p>

              <p className="gb-prose__lead-in">What We Do From Here:</p>
              <ul className="gb-checklist">
                {AREA_SERVICES.map((s) => (
                  <li key={s.title}>
                    <a href={s.href} className="gb-checklist__title">
                      {s.title}
                    </a>
                    <span className="gb-checklist__desc">{s.desc}</span>
                  </li>
                ))}
              </ul>

              <p className="gb-prose__contact">
                For immediate assistance,{' '}
                <a href="/contact">contact us</a> or call{' '}
                <a href={location.phoneHref}>{location.phone}</a>.
              </p>
            </div>

            <aside className="gb-body__aside">
              <div className="mw-contact__details">
                <h3 className="mw-contact__details-title">Visit Us</h3>

                <div className="mw-contact__block">
                  <h4 className="mw-contact__label">Address</h4>
                  <p className="mw-contact__value">
                    {location.streetAddress}
                    <br />
                    {location.addressLocality}, {location.addressRegion} {location.postalCode}
                  </p>
                  <a className="mw-contact__action" href={directionsUrl} target="_blank" rel="noopener noreferrer">
                    Get Directions <span aria-hidden="true">→</span>
                  </a>
                </div>

                <div className="mw-contact__block">
                  <h4 className="mw-contact__label">Phone</h4>
                  <p className="mw-contact__value">
                    <a href={location.phoneHref}>{location.phone}</a>
                  </p>
                </div>

                <div className={`mw-contact__block${location.reviewUrl ? '' : ' mw-contact__block--last'}`}>
                  <h4 className="mw-contact__label">Hours</h4>
                  <p className="mw-contact__value">
                    Monday – Friday
                    <br />
                    9:00am – 5:00pm PT
                  </p>
                </div>

                {location.reviewUrl && (
                  <div className="mw-contact__block mw-contact__block--last">
                    <h4 className="mw-contact__label">Reviews</h4>
                    <a className="mw-contact__action" href={location.reviewUrl} target="_blank" rel="noopener noreferrer">
                      Leave Us a Review <span aria-hidden="true">→</span>
                    </a>
                  </div>
                )}
              </div>

              <div className="gb-office-map">
                <iframe
                  src={mapEmbedUrl}
                  title={`Map to Gobiya's ${location.name} office`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ══ 3. Reviews ══ */}
      <CommunityReviews
        heading={`Trusted by Businesses Near ${location.name}`}
        dek="Since 2010, businesses have trusted us for honest, reliable search work."
        more={{ text: 'View all client work', href: '/work' }}
      />

      {/* ══ 4. Closing CTA ══ */}
      <ClosingCta
        title="Contact Our Team Today"
        accent="When in Doubt, Call Gobiya Out!"
        dek={`SEO, AI search, and PPC for ${location.name} businesses. Month-to-month, no long-term contracts, no surprises.`}
        cta={{ text: 'Get Your Analysis', href: '/free-site-scan' }}
        phone={false}
      />

      {/* ══ 5. The four standards ══ */}
      <ExcellenceGrid />
    </main>
  );
}
