import Breadcrumbs from '../../../components/Breadcrumbs';
import SubHero from '../../../components/SubHero';
import PlatformStrip from '../../../components/PlatformStrip';
import { AREAS, AREA_SERVICES } from '../../../lib/areas';
import { buildMetadata } from '../../../lib/meta';
import { heroImage } from '../../../lib/heroImages';
import { CONTACT } from '../../../lib/nav';
import { notFound } from 'next/navigation';
import { renderBlock } from '../../../components/ContentBlocks';
import ClientLogos from '../../../components/ClientLogos';

const BASE = 'https://www.gobiya.com';

// Google Maps deep link, no API key and no stored coordinates — the address
// string is the query, so it can never drift out of sync with the one rendered
// on the page or the one in the JSON-LD.
const mapUrl = (o) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `Gobiya, ${o.street}, ${o.locality}, ${o.region} ${o.postalCode}`
  )}`;

// Page schema for a city.
//
// Two nodes. The Place is what the page is *about* — the neighborhood — and the
// service node names the agency as provider without inventing a second business
// entity: it points at the sitewide @id from components/SiteSchema.js.
//
// Only the city that has an `office` gets a PostalAddress, and when it does the
// street, locality, region and postal code are the same strings SiteSchema
// publishes under the same @id. Repeating them there is what lets Google merge
// the two into one business rather than reading them as conflicting claims. No
// geo coordinates and no opening hours: neither is recorded anywhere, and
// guessing them would be a fabricated local signal.
function citySchema(area) {
  const provider = { '@id': `${BASE}/#organization` };

  const graph = [
    {
      '@type': 'Service',
      name: `SEO & Digital Marketing in ${area.name}`,
      serviceType: 'Search engine optimization',
      description: area.desc,
      url: `${BASE}/areas-we-serve/${area.slug}`,
      provider,
      areaServed: [
        { '@type': 'Place', name: area.name },
        { '@type': 'AdministrativeArea', name: area.region },
        { '@type': 'City', name: 'Los Angeles' },
        { '@type': 'State', name: 'California' },
      ],
    },
  ];

  if (area.office) {
    graph.push({
      '@type': 'ProfessionalService',
      '@id': `${BASE}/#organization`,
      name: 'Gobiya',
      legalName: 'Gobiya LLC',
      url: `${BASE}/`,
      telephone: '+1-323-744-1338',
      email: CONTACT.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: area.office.street,
        addressLocality: area.office.locality,
        addressRegion: area.office.region,
        postalCode: area.office.postalCode,
        addressCountry: 'US',
      },
      hasMap: mapUrl(area.office),
      areaServed: [
        { '@type': 'Place', name: area.name },
        { '@type': 'City', name: 'Los Angeles' },
      ],
      sameAs: [CONTACT.linkedin, CONTACT.twitter, CONTACT.facebook, CONTACT.yelp],
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}

export async function generateStaticParams() {
  return AREAS.map((area) => ({ city: area.slug }));
}

export async function generateMetadata({ params }) {
  const { city } = await params;
  const area = AREAS.find((a) => a.slug === city);
  if (!area) return {};
  // A city can override either field in lib/areas.js with authored copy;
  // anything not overridden falls back to the generated pattern.
  return buildMetadata({
    title: area.metaTitle || `${area.tagline} | Gobiya SEO`,
    description:
      area.metaDescription ||
      `${area.desc} Get a FREE site scan today — serving ${area.name} since 2010.`,
    path: `/areas-we-serve/${area.slug}`,
  });
}

export default async function AreaPage({ params }) {
  const { city } = await params;
  const area = AREAS.find((a) => a.slug === city);
  if (!area) notFound();

  const otherAreas = AREAS.filter((a) => a.slug !== city);

  return (
    <main id="top">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(citySchema(area)) }}
      />

      {/* ══ Hero — card contains city title, eyebrow, excerpt & CTAs ══ */}
      <SubHero
        image={area.image || heroImage(cityIdx + 1)}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Areas We Serve', href: '/areas-we-serve' },
          { label: area.name },
        ]}
        eyebrow="Affordable Solutions, Exceptional Service"
        title="Exclusive Gobiya Savings"
        excerpt="Keep your website running smoothly and your ROI increase with our latest savings and special offers."
        primary={{ text: 'Get Your Free Site Scan', href: '/free-site-scan' }}
        secondary={{ text: 'Call 323-744-1338', href: 'tel:+13237441338' }}
      />

      {/* ══ Platform Strip — directly under hero ══ */}
      <PlatformStrip />

      {/* ══ Body: content column + sticky CTA rail ══ */}
      <section className="mw-area-body">
        <div className="container">
          <div className="mw-area-body__grid">
            <div className="mw-area-body__main">
              {area.body ? (
                area.body.map(renderBlock)
              ) : (
                <>
                  <h2 className="mw-area-body__heading">
                    Serving {area.name} Businesses Since 2010
                  </h2>

                  <dl className="mw-area-meta">
                    <div className="mw-area-meta__item">
                      <dt className="mw-area-meta__label">Region</dt>
                      <dd className="mw-area-meta__value">{area.region}</dd>
                    </div>
                    <div className="mw-area-meta__item">
                      <dt className="mw-area-meta__label">County</dt>
                      <dd className="mw-area-meta__value">{area.county}</dd>
                    </div>
                    <div className="mw-area-meta__item">
                      <dt className="mw-area-meta__label">Working here since</dt>
                      <dd className="mw-area-meta__value">2010</dd>
                    </div>
                  </dl>

                  <ul className="mw-area-points">
                    {area.details.map((point, i) => (
                      <li key={i} className="mw-area-points__item">{point}</li>
                    ))}
                  </ul>
                </>
              )}

              <h3 className="mw-area-body__services-heading">
                Our Services in {area.name}
              </h3>
              <div className="mw-svc-cards mw-svc-cards--two">
                {AREA_SERVICES.map((s) => (
                  <a key={s.href} href={s.href} className="mw-svc-card">
                    <p className="mw-svc-card__tag">{s.tag}</p>
                    <h4 className="mw-svc-card__title">{s.title}</h4>
                    <p className="mw-svc-card__desc">{s.desc}</p>
                    <span className="mw-svc-card__link">
                      View service <span aria-hidden="true">→</span>
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <aside className="mw-area-body__sidebar">
              {/* Only rendered for the city we actually sit in — see the `office`
                  note in lib/areas.js. */}
              {area.office && (
                <div className="mw-area-office">
                  <p className="mw-area-office__label">Visit Our Office</p>
                  <address className="mw-area-office__address">
                    <span className="mw-area-office__name">Gobiya LLC</span>
                    {area.office.street}
                    <br />
                    {area.office.locality}, {area.office.region} {area.office.postalCode}
                  </address>
                  <dl className="mw-area-office__contact">
                    <dt>Phone</dt>
                    <dd>
                      <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
                    </dd>
                    <dt>Email</dt>
                    <dd>
                      <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
                    </dd>
                  </dl>
                  {area.office.note && (
                    <p className="mw-area-office__note">{area.office.note}</p>
                  )}
                  <a
                    href={mapUrl(area.office)}
                    className="mw-area-office__map"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get directions <span aria-hidden="true">→</span>
                  </a>
                </div>
              )}

              <div className="mw-area-body__cta-card">
                <p className="mw-area-body__cta-eyebrow">Free for {area.name} Businesses</p>
                <h3 className="mw-area-body__cta-title">Get Your Free Website &amp; SEO Scan</h3>
                <p className="mw-area-body__cta-desc">
                  We check your site for hidden errors, Google ranking problems, and AI search gaps, then send you the findings. No cost, no obligation.
                </p>
                <a href="/free-site-scan" className="mw-area-body__cta-btn">
                  Start My Free Scan <span aria-hidden="true">→</span>
                </a>
                <p className="mw-area-body__cta-divider">or call us directly</p>
                <a href="tel:+13237441338" className="mw-area-body__cta-phone">
                  323-744-1338
                </a>
              </div>

              <div className="mw-area-body__other-areas">
                <h4 className="mw-area-body__other-title">Other Areas We Serve</h4>
                <ul className="mw-area-body__other-list">
                  {otherAreas.map((a) => (
                    <li key={a.slug}>
                      <a href={`/areas-we-serve/${a.slug}`}>
                        <span className="mw-area-body__other-city">{a.name}</span>
                        <span className="mw-area-body__other-region">{a.region}</span>
                      </a>
                    </li>
                  ))}
                </ul>
                <a href="/areas-we-serve" className="mw-area-body__other-all">
                  All areas we serve <span aria-hidden="true">→</span>
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ══ Closing CTA ══ */}
      <section className="mw-area-bottom-cta">
        <div className="container">
          <h2 className="mw-area-bottom-cta__title">
            Ready to Grow Your {area.name} Business?
          </h2>
          <p className="mw-area-bottom-cta__desc">
            SEO, AI search, and PPC for {area.name} and all of Los Angeles since 2010. Month-to-month, no long-term contracts, no surprises.
          </p>
          <div className="mw-area-bottom-cta__actions">
            <a href="/free-site-scan" className="mw-area-cta__btn mw-area-cta__btn--primary">
              Get Your Free Site Scan
            </a>
            <a href="/services" className="mw-area-cta__btn mw-area-cta__btn--secondary">
              View All Services
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
