import Image from 'next/image';
import PageHero from './PageHero';
import CommunityReviews from './CommunityReviews';
import ClosingCta from './ClosingCta';
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
        title={location.h1}
        dek={location.dek}
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="#0047AB" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/>
          </svg>
        }
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

              {/* Office photo. Optional per location — see `image` in
                  lib/locations.js; a location without one renders nothing. */}
              {location.image && (
                <figure className="gb-office-photo">
                  <Image
                    src={location.image.src}
                    width={location.image.width}
                    height={location.image.height}
                    alt={location.image.alt}
                    sizes="(max-width: 900px) 100vw, 42rem"
                  />
                  {location.image.caption && (
                    <figcaption>{location.image.caption}</figcaption>
                  )}
                </figure>
              )}

              <p className="gb-prose__lead-in">What We Do From Here:</p>
              <ul className="gb-checklist">
                {AREA_SERVICES.map((s) => (
                  <li key={s.title}>
                    <a href={s.href} className="gb-checklist__title" title={s.title}>
                      {s.title}
                    </a>
                    <span className="gb-checklist__desc">{s.desc}</span>
                  </li>
                ))}
              </ul>

              <p className="gb-prose__contact">
                For immediate assistance,{' '}
                <a href="/contact" title="Contact Gobiya">contact us</a> or call{' '}
                <a href={location.phoneHref} title={`Call Gobiya at ${location.phone}`}>{location.phone}</a>.
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
                  <a className="mw-contact__action" href={directionsUrl} target="_blank" rel="noopener noreferrer" title="Get directions to this office">
                    Get Directions <span aria-hidden="true">→</span>
                  </a>
                </div>

                <div className="mw-contact__block">
                  <h4 className="mw-contact__label">Phone</h4>
                  <p className="mw-contact__value">
                    <a href={location.phoneHref} title={`Call Gobiya at ${location.phone}`}>{location.phone}</a>
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
                    <a className="mw-contact__action" href={location.reviewUrl} target="_blank" rel="noopener noreferrer" title="Leave a Google review for Gobiya">
                      Leave Us a Review <span aria-hidden="true">→</span>
                    </a>
                  </div>
                )}
              </div>

              {location.clients && location.clients.length > 0 && (
                <div className="mw-contact__block mw-contact__block--last gb-location-clients">
                  <h4 className="mw-contact__label">Local Clients</h4>
                  <ul className="gb-location-clients__list">
                    {location.clients.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                </div>
              )}

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

    </main>
  );
}
