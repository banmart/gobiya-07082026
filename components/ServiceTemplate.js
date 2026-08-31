import PageHero from './PageHero';
import PlatformStrip from './PlatformStrip';
import ClientLogos from './ClientLogos';
import PackagesOffer from './PackagesOffer';
import CommunityReviews from './CommunityReviews';
import ClosingCta from './ClosingCta';
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

const SERVICE_ICONS = {
  'technical-seo': (
    <svg viewBox="0 0 24 24" fill="none" stroke="#0047AB" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><path d="M11 8v6M8 11h6"/>
    </svg>
  ),
  'geo': (
    <svg viewBox="0 0 24 24" fill="none" stroke="#0047AB" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 8v4l3 3"/><path d="M18 2l2 2-2 2M20 4h-4"/>
    </svg>
  ),
  'content-marketing': (
    <svg viewBox="0 0 24 24" fill="none" stroke="#0047AB" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
    </svg>
  ),
  'link-building': (
    <svg viewBox="0 0 24 24" fill="none" stroke="#0047AB" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
    </svg>
  ),
  'ppc': (
    <svg viewBox="0 0 24 24" fill="none" stroke="#0047AB" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23,6 13.5,15.5 8.5,10.5 1,18"/><polyline points="17,6 23,6 23,12"/>
    </svg>
  ),
  'cro': (
    <svg viewBox="0 0 24 24" fill="none" stroke="#0047AB" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
    </svg>
  ),
  'web-dev': (
    <svg viewBox="0 0 24 24" fill="none" stroke="#0047AB" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16,18 22,12 16,6"/><polyline points="8,6 2,12 8,18"/>
    </svg>
  ),
  'web-ux': (
    <svg viewBox="0 0 24 24" fill="none" stroke="#0047AB" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
    </svg>
  ),
  'ai-consulting': (
    <svg viewBox="0 0 24 24" fill="none" stroke="#0047AB" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
};

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
        title={service.headline || `${displayTitle} in Los Angeles`}
        dek={hero?.excerpt}
        icon={SERVICE_ICONS[service.slug] || null}
        primary={{
          text: service.heroCtaText || 'Get Your Analysis',
          href: service.heroCtaHref || '/free-site-scan',
        }}
        secondary={{ text: `Call ${CONTACT.phone}`, href: CONTACT.phoneHref }}
      />

      {/* ══ 2. Platform strip ══ */}
      <PlatformStrip />

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
                          <a href={cap.href} className="gb-checklist__title" title={cap.title}>
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
                    <a href={service.datapoint.href} title={service.datapoint.sourceNote}>{service.datapoint.sourceNote}</a>
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
                      <a href={row.link.href} title={row.link.text}>
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
                <a href="/contact" title="Contact Gobiya">contact us</a> at{' '}
                <a href={CONTACT.phoneHref} title="Call Gobiya at 323-744-1338">(323) 744-1338</a>.
              </p>
            </div>

            <aside className="gb-body__aside">
              <nav className="gb-sidebar" aria-label="Services">
                <a href="/services" className="gb-sidebar__title" title="All services">
                  Services
                </a>
                <ul className="gb-sidebar__list">
                  {SERVICE_LINKS.map((s) => (
                    <li key={s.slug}>
                      <a
                        href={s.href}
                        className={s.slug === service.slug ? 'is-current' : undefined}
                        aria-current={s.slug === service.slug ? 'page' : undefined}
                        title={s.title}
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
                <a href="/free-site-scan" className="gb-btn gb-btn--accent gb-cta-card__btn" title="Get your free site analysis">
                  Get Your Analysis
                </a>
                <p className="gb-cta-card__divider">or call us directly</p>
                <a href={CONTACT.phoneHref} className="gb-cta-card__phone" title="Call Gobiya at 323-744-1338">
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
              <a href="/los-angeles-seo" className="mw-local-areas__beyond-link" title="SEO services in Greater Los Angeles and San Fernando Valley">
                &amp; Beyond!
              </a>{' '}
              <span>(Greater Los Angeles Area &amp; San Fernando Valley)</span>
            </p>
          </div>
        </section>
      )}

      {/* ══ 5. Client logos ══ */}
      <ClientLogos />

      {/* ══ 6. Packages ══ */}
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

    </main>
  );
}
