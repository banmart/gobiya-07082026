import PageHero from './PageHero';
import DisciplineRail from './DisciplineRail';
import PackagesOffer from './PackagesOffer';
import CommunityReviews from './CommunityReviews';
import ClosingCta from './ClosingCta';
import ExcellenceGrid from './ExcellenceGrid';
import { renderBlock } from './ContentBlocks';
import { servicePath, SERVICE_LINKS } from '../lib/serviceIndex';
import { SERVICE_BODIES } from '../lib/serviceBodies';
import { CONTACT } from '../lib/nav';

// The single service page layout, on the homepage's frame and in the order a
// service page is read:
//
//   hero → discipline rail → "<Service> Services" prose beside the service
//   sidebar → sub-topic sections → areas → packages → reviews → closing CTA →
//   the four standards.
//
// Same section vocabulary and same components as app/page.js, so a visitor
// moving from / to a service page keeps the frame and meets the promises in the
// order they already read them.
//
// Everything each service authors in servicesFlat.js / services.js — intro,
// problem, capabilities, featureRows, process, datapoint, serviceAreas,
// testimonial — lands on the page. Only `faqs` stays schema-only.

export default function ServiceTemplate({ service }) {
  const displayTitle = service.navTitle || service.title;
  const hero = service.hero;
  const body = SERVICE_BODIES[service.slug];
  const areas = service.serviceAreas || [];

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

  const faqSchema = service.faqs?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: service.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.a,
          },
        })),
      }
    : null;

  return (
    <main id="top">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* ══ 1. Hero ══ */}
      <PageHero
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: displayTitle },
        ]}
        eyebrow={`${displayTitle} · Los Angeles`}
        title={service.headline || `${displayTitle} in Los Angeles`}
        accent="Expert Service in Los Angeles and the San Fernando Valley"
        dek={hero?.excerpt}
        primary={{
          text: service.heroCtaText || 'Get Your Analysis',
          href: service.heroCtaHref || '/free-site-scan',
        }}
        secondary={{ text: `Call ${CONTACT.phone}`, href: CONTACT.phoneHref }}
      />

      {/* ══ 2. Discipline rail ══ */}
      <DisciplineRail active={service.slug} />

      {/* ══ 3. Body — prose beside the service sidebar ══ */}
      <section className="gb-body">
        <div className="container">
          <div className="gb-body__grid">
            <div className="gb-body__main gb-prose">
              <h2>{displayTitle} Services</h2>
              {service.intro && <p>{service.intro}</p>}

              {service.problem && (
                <div className="gb-callout">
                  {service.problem.eyebrow && (
                    <p className="gb-callout__eyebrow">{service.problem.eyebrow}</p>
                  )}
                  <p className="gb-callout__text">{service.problem.statement}</p>
                </div>
              )}

              {service.capabilities?.length > 0 && (
                <>
                  <p className="gb-prose__lead-in">
                    Give us a call for immediate assistance with:
                  </p>
                  <ul className="gb-checklist">
                    {service.capabilities.map((cap) => (
                      <li key={cap.title}>
                        {cap.href ? (
                          <a href={cap.href} className="gb-checklist__title">
                            {cap.title}
                          </a>
                        ) : (
                          <span className="gb-checklist__title">{cap.title}</span>
                        )}
                        {cap.desc && <span className="gb-checklist__desc">{cap.desc}</span>}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {service.datapoint && (
                <p className="gb-evidence">
                  <strong>
                    {service.datapoint.value}
                    {service.datapoint.suffix || ''}
                  </strong>{' '}
                  {service.datapoint.label}.{' '}
                  {service.datapoint.href ? (
                    <a href={service.datapoint.href}>{service.datapoint.sourceNote}</a>
                  ) : (
                    service.datapoint.sourceNote
                  )}
                </p>
              )}

              {/* Sub-topic sections. Each authored row is one h2 and its copy —
                  the same shape the "Clearing Bathroom Drains" style section
                  takes: a specific problem, what we do about it, one link. */}
              {service.featureRows?.map((row) => (
                <div key={row.title} className="gb-prose__block">
                  <h2>{row.title}</h2>
                  {row.lede && <p className="gb-prose__lede">{row.lede}</p>}
                  {row.dek && <p>{row.dek}</p>}
                  {row.list?.length > 0 && (
                    <ul className="gb-checklist gb-checklist--plain">
                      {row.list.map((item) => (
                        <li key={item}>
                          <span className="gb-checklist__title">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {row.stats?.length > 0 && (
                    <ul className="gb-prose__stats">
                      {row.stats.map((s) => (
                        <li key={s.label}>
                          <strong>{s.num}</strong>
                          <span>{s.label}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {row.link && (
                    <p className="gb-prose__more">
                      <a href={row.link.href}>
                        {row.link.text} <span aria-hidden="true">&rarr;</span>
                      </a>
                    </p>
                  )}
                </div>
              ))}

              {/* A service that authors blocks in the old vocabulary instead of
                  featureRows still renders here. The two never both exist. */}
              {body?.map(renderBlock)}

              {service.process?.length > 0 && (
                <div className="gb-prose__block">
                  <h2>How the Work Runs</h2>
                  <ol className="gb-steps">
                    {service.process.map((step, i) => (
                      <li key={step.title}>
                        <span className="gb-steps__num">{String(i + 1).padStart(2, '0')}</span>
                        <span className="gb-steps__title">{step.title}</span>
                        <span className="gb-steps__desc">{step.desc}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              <p className="gb-prose__contact">
                For immediate assistance with your {displayTitle.toLowerCase()} project,{' '}
                <a href="/contact">contact us</a> at{' '}
                <a href={CONTACT.phoneHref}>(323) 744-1338</a>.
              </p>
            </div>

            <aside className="gb-body__aside">
              <nav className="gb-sidebar" aria-label="Services">
                <a href="/services" className="gb-sidebar__title">
                  Services
                </a>
                <ul className="gb-sidebar__list">
                  {SERVICE_LINKS.map((s) => (
                    <li key={s.slug}>
                      <a
                        href={s.href}
                        className={s.slug === service.slug ? 'is-current' : undefined}
                        aria-current={s.slug === service.slug ? 'page' : undefined}
                      >
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="gb-cta-card">
                <p className="gb-cta-card__eyebrow">Free for Los Angeles Businesses</p>
                <p className="gb-cta-card__title">Get Your Free Website &amp; SEO Scan</p>
                <p className="gb-cta-card__desc">
                  We check your site for hidden errors, Google ranking problems, and AI
                  search gaps, then send you the findings. No cost, no obligation.
                </p>
                <a href="/free-site-scan" className="gb-btn gb-btn--accent gb-cta-card__btn">
                  Get Your Analysis
                </a>
                <p className="gb-cta-card__divider">or call us directly</p>
                <a href={CONTACT.phoneHref} className="gb-cta-card__phone">
                  {CONTACT.phone}
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ══ 4. Where this service runs ══ */}
      {areas.length > 0 && (
        <section className="mw-local-areas">
          <div className="container">
            <h2 className="mw-local-areas__heading">
              {displayTitle} For Our Local Communities
            </h2>
            <p className="mw-local-areas__intro">
              From local map pack dominance to national enterprise architecture, we&rsquo;re
              committed to scaling businesses across LA.
            </p>
            <ul className="mw-local-areas__columns">
              {areas.map((area) => (
                <li key={area} className="mw-local-areas__item">
                  {area}
                </li>
              ))}
            </ul>
            <p className="mw-local-areas__beyond">
              <a href="/areas-we-serve" className="mw-local-areas__beyond-link">
                &amp; Beyond!
              </a>{' '}
              <span>(Greater Los Angeles Area &amp; San Fernando Valley)</span>
            </p>
          </div>
        </section>
      )}

      {/* ══ 5. Packages ══ */}
      <PackagesOffer
        title={`Exclusive Savings on Expert ${displayTitle}`}
        sub="Exclusive Gobiya Performance Packages"
        dek="Professional service, exceptional value. Explore our current promotions."
        more={{ text: 'View all pricing', href: '/pricing' }}
      />

      {/* ══ 6. Reviews ══ */}
      <CommunityReviews
        heading="Trusted by Businesses Across Los Angeles"
        dek="Since 2009, Los Angeles businesses have trusted us for honest, reliable search work."
        featured={service.testimonial}
        more={{ text: 'View all client work', href: '/work' }}
      />

      {/* ══ 7. Closing CTA ══ */}
      <ClosingCta
        title="Contact Our Team Today"
        accent="When in Doubt, Call Gobiya Out!"
        dek={
          service.ctaTitle ||
          'SEO, AI search, and PPC for Los Angeles businesses since 2009. Month-to-month, no long-term contracts, no surprises.'
        }
        cta={{
          text: service.heroCtaText || 'Get Your Analysis',
          href: service.heroCtaHref || '/free-site-scan',
        }}
        phone
      />

      {/* ══ 8. The four standards ══ */}
      <ExcellenceGrid />
    </main>
  );
}
