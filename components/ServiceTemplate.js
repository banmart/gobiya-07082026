import Breadcrumbs from './Breadcrumbs';
import SubHero from './SubHero';
import PlatformStrip from './PlatformStrip';
import ClientLogos from './ClientLogos';
import { renderBlock } from './ContentBlocks';
import SavingsOffer from './SavingsOffer';
import { servicePath, SERVICE_LINKS } from '../lib/serviceIndex';
import { SERVICE_BODIES } from '../lib/serviceBodies';
import { AREAS } from '../lib/areas';
import { CONTACT } from '../lib/nav';

// The single service page layout, on the same frame as the city pages in
// app/areas-we-serve/[city]: shared SubHero, then a content column of authored
// blocks (service.problem, service.process, service.capabilities) beside a sticky CTA rail,
// then the closing navy banner. The copy for each service lives in lib/serviceBodies.js
// and renders through the same ContentBlocks renderer the city pages use.

export default function ServiceTemplate({ service }) {
  const displayTitle = service.navTitle || service.title;
  const hero = service.hero;
  const body = SERVICE_BODIES[service.slug];
  const otherServices = SERVICE_LINKS.filter((s) => s.slug !== service.slug);

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: displayTitle,
    serviceType: service.eyebrow || displayTitle,
    description: service.metaDescription || service.standfirst,
    url: `https://www.gobiya.com${servicePath(service.slug)}`,
    provider: { '@id': 'https://www.gobiya.com/#organization' },
    // Every service page is a Los Angeles page, and SiteSchema already declares
    // City: Los Angeles for the organization. Claiming the whole country here
    // would contradict it.
    areaServed: [
      { '@type': 'City', name: 'Los Angeles' },
      { '@type': 'State', name: 'California' },
    ],
  };

  return (
    <main id="top">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* ══ 2. Hero ══ */}
      <SubHero
        image={hero?.image}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: displayTitle },
        ]}
        eyebrow="Affordable Solutions, Exceptional Service"
        // The h1. Each service authors its own in servicesFlat.js / services.js
        // and serviceIndex normalises the two shapes into `headline`, so this
        // is the authored city-intent headline rather than one promo line
        // repeated across all eight pages. The fallback only fires for a
        // service with no authored h1 and no heroLines.
        title={service.headline || 'Exclusive Gobiya Savings'}
        excerpt="Keep your website running smoothly and your ROI increase with our latest savings and special offers."
        primary={{ text: 'Get Your Free Site Scan', href: '/free-site-scan' }}
        secondary={{ text: 'Call 323-744-1338', href: 'tel:+13237441338' }}
      />

      {/* ══ Platform Strip — directly under hero ══ */}
      <PlatformStrip />

      {/* ══ 3. Body: content column + sticky CTA rail ══ */}
      <section className="mw-area-body">
        <div className="container">
          <div className="mw-area-body__grid">
            <div className="mw-area-body__main">
              {body?.map(renderBlock)}

              <h3 className="mw-area-body__services-heading">Areas We Serve</h3>
              <div className="mw-svc-cards mw-svc-cards--two">
                {AREAS.slice(0, 4).map((a) => (
                  <a key={a.slug} href={`/areas-we-serve/${a.slug}`} className="mw-svc-card">
                    <p className="mw-svc-card__tag">{a.region}</p>
                    <h4 className="mw-svc-card__title">{a.name}</h4>
                    <p className="mw-svc-card__desc">{a.excerpt}</p>
                    <span className="mw-svc-card__link">
                      View area <span aria-hidden="true">→</span>
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <aside className="mw-area-body__sidebar">
              <div className="mw-area-body__cta-card">
                <p className="mw-area-body__cta-eyebrow">Free for Los Angeles Businesses</p>
                <h3 className="mw-area-body__cta-title">Get Your Free Website &amp; SEO Scan</h3>
                <p className="mw-area-body__cta-desc">
                  We check your site for hidden errors, Google ranking problems, and AI search gaps, then send you the findings. No cost, no obligation.
                </p>
                <a href="/free-site-scan" className="mw-area-body__cta-btn">
                  Start My Free Scan <span aria-hidden="true">→</span>
                </a>
                <p className="mw-area-body__cta-divider">or call us directly</p>
                <a href={CONTACT.phoneHref} className="mw-area-body__cta-phone">
                  {CONTACT.phone}
                </a>
              </div>

              <div className="mw-area-body__other-areas">
                <h4 className="mw-area-body__other-title">Other Services</h4>
                <ul className="mw-area-body__other-list">
                  {otherServices.map((s) => (
                    <li key={s.slug}>
                      <a href={s.href}>
                        <span className="mw-area-body__other-city">{s.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
                <a href="/services" className="mw-area-body__other-all">
                  All services <span aria-hidden="true">→</span>
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ══ 4. CRM offer — opt-in per service via `showOffer` in lib/services.js ══ */}
      {service.showOffer && <SavingsOffer />}

      {/* ══ 5. Bottom Navy CTA Banner ══ */}
      <section className="mw-navy-banner">
        <div className="container">
          <h2 className="mw-navy-banner__title">
            {service.ctaTitle || service.headline || `Ready to Grow Your Business with ${displayTitle}?`}
          </h2>
          <p className="mw-navy-banner__dek">
            SEO, AI search, and PPC for Los Angeles businesses since 2010. Month-to-month, no long-term contracts, no surprises.
          </p>
          <a href={service.heroCtaHref || '/free-site-scan'} className="mw-navy-banner__btn">
            {service.heroCtaText || 'Get Your Free Site Scan'}
          </a>
        </div>
      </section>
    </main>
  );
}
