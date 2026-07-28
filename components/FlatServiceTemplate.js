import Image from 'next/image';
import Breadcrumbs from './Breadcrumbs';
import { CONTACT } from '../lib/nav';

const CLEAN_SERVICE_NAMES = {
  'seo-services-los-angeles': 'Local & Technical SEO',
  'web-development-services-los-angeles': 'Web Design & Development',
  'ppc-management-services-los-angeles': 'PPC & Lead Generation',
  'content-marketing-services-los-angeles': 'Content Marketing Strategy',
  'geo-services-los-angeles': 'AI & GEO Search Optimization',
  'link-building-services-los-angeles': 'Digital PR & Link Building',
  'cro-ux-services-los-angeles': 'CRO & Web UX Optimization',
  'ai-consulting-services-los-angeles': 'AI Systems & LLM Consulting',
};

export default function FlatServiceTemplate({ service }) {
  const displayTitle = CLEAN_SERVICE_NAMES[service.slug] || service.eyebrow || service.title.split('|')[0].trim();

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: displayTitle,
    serviceType: service.eyebrow,
    description: service.metaDescription || service.intro,
    url: `https://www.gobiya.com/${service.slug}`,
    provider: { '@id': 'https://www.gobiya.com/#organization' },
    // Every flat service page is a Los Angeles page, and SiteSchema already
    // declares City: Los Angeles for the organization. Claiming the whole
    // country here contradicted it.
    areaServed: [
      { '@type': 'City', name: 'Los Angeles' },
      { '@type': 'State', name: 'California' },
    ],
  };

  const faqSchema = service.faqs?.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a.replace(/<[^>]+>/g, ''),
      },
    })),
  } : null;

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

      {/* ══ 1. Clean Breadcrumb Bar ══ */}
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: displayTitle },
      ]} />

      {/* ══ 2. Subhero Dark Banner ══ */}
      <section className="mw-subhero">
        <div className="container">
          {/* The authored h1 carries the city ("Los Angeles SEO Services to Help
              Your Business Get Found"); displayTitle is the short breadcrumb
              label ("Local & Technical SEO") and drops it, which is the wrong
              headline for a city-intent page. Fall back only if h1 is missing. */}
          <h1 className="mw-subhero__title">{service.h1 || displayTitle}</h1>
          <p className="mw-subhero__dek">{service.intro}</p>
        </div>
      </section>

      {/* ══ Problem statement + headline metric ══
          Both come straight from lib/servicesFlat.js. Each is guarded so a page
          without the field renders nothing rather than an empty shell. */}
      {(service.problem || service.datapoint) && (
        <section className="mw-svc-proof">
          <div className="container">
            <div className="mw-svc-proof__grid">
              {service.problem && (
                <div>
                  <p className="mw-svc-proof__eyebrow">{service.problem.eyebrow}</p>
                  <p className="mw-svc-proof__statement">{service.problem.statement}</p>
                </div>
              )}
              {service.datapoint && (
                <div className="mw-svc-proof__stat">
                  <div className="mw-svc-proof__num">
                    {service.datapoint.value.toFixed(service.datapoint.decimals ?? 0)}
                    {service.datapoint.suffix || ''}
                  </div>
                  <div className="mw-svc-proof__label">{service.datapoint.label}</div>
                  {service.datapoint.sourceNote && (
                    <p className="mw-svc-proof__source">
                      {service.datapoint.href ? (
                        <a href={service.datapoint.href}>{service.datapoint.sourceNote}</a>
                      ) : (
                        service.datapoint.sourceNote
                      )}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ══ 3. Pillar Hierarchical Grid (Left Sidebar + Right Column) ══ */}
      <div className="container">
        <div className="mw-pillar-grid">
          {/* Left Sidebar Index */}
          <aside className="mw-sidebar">
            <div className="mw-sidebar__header">Service Topics</div>
            <nav className="mw-sidebar__nav">
              {service.capabilities?.map((c, idx) => (
                <a key={idx} href={`#capability-${idx}`} className={`mw-sidebar__link ${idx === 0 ? 'is-active' : ''}`}>
                  {c.title}
                </a>
              ))}
              {service.faqs?.length > 0 && (
                <a href="#faqs" className="mw-sidebar__link">Common Questions</a>
              )}
            </nav>
          </aside>

          {/* Right Content Area */}
          <div className="mw-cluster-list">
            {/* Capabilities Sub-Clusters */}
            {service.capabilities?.map((c, idx) => (
              <div key={idx} id={`capability-${idx}`} className="mw-cluster-block">
                <h2 className="mw-cluster-block__title">
                  <a href={c.href ?? '/glossary'}>{c.title}</a>
                </h2>
                <p className="mw-cluster-block__desc">
                  {c.desc}
                </p>
              </div>
            ))}

            {/* FAQs Sub-Cluster */}
            {service.faqs?.length > 0 && (
              <div id="faqs" className="mw-cluster-block">
                <h2 className="mw-cluster-block__title" style={{ textDecoration: 'none' }}>
                  Frequently Asked Questions
                </h2>
                <dl className="faq__list" style={{ marginTop: '1.5rem' }}>
                  {service.faqs.map((f, fIdx) => (
                    <div key={fIdx} className="faq__item">
                      <dt style={{ fontFamily: 'PT Serif, Georgia, serif', color: '#0B1E36', fontWeight: '700' }}>{f.q}</dt>
                      <dd style={{ marginTop: '0.5rem', color: '#475569' }} dangerouslySetInnerHTML={{ __html: f.a }} />
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ══ How the work runs ══ */}
      {service.process?.length > 0 && (
        <section className="mw-svc-process">
          <div className="container">
            <h2 className="mw-svc-process__heading">How the work runs</h2>
            <div className="mw-svc-process__grid">
              {service.process.map((p) => (
                <div key={p.step} className="mw-svc-process__step">
                  <div className="mw-svc-process__num">{p.step}</div>
                  <h3 className="mw-svc-process__title">{p.title}</h3>
                  <p className="mw-svc-process__desc">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══ Client proof ══ */}
      {service.testimonial && (
        <section className="mw-svc-quote">
          <div className="container">
            <blockquote className="mw-svc-quote__text">
              &ldquo;{service.testimonial.quote}&rdquo;
            </blockquote>
            <div className="mw-svc-quote__who">
              {service.testimonial.photo && (
                <Image
                  src={service.testimonial.photo}
                  alt={service.testimonial.name || service.testimonial.company}
                  width={48}
                  height={48}
                  className="mw-svc-quote__avatar"
                />
              )}
              <div>
                <strong>
                  {service.testimonial.name ? `${service.testimonial.name}, ` : ''}
                  {service.testimonial.company}
                </strong>
                {service.testimonial.role && <div>{service.testimonial.role}</div>}
              </div>
            </div>
            {service.testimonial.href && (
              <a href={service.testimonial.href} className="mw-svc-quote__link">
                Read the case study
              </a>
            )}
          </div>
        </section>
      )}

      {/* ══ Where we work + how to reach us ══
          Suburb names are plain text on purpose: every one of those legacy URLs
          now 308s to this page, so linking them would re-fragment exactly what
          the redirect consolidation fixed. */}
      {service.serviceAreas?.length > 0 && (
        <section className="mw-svc-areas">
          <div className="container">
            <h2 className="mw-svc-areas__heading">Where we work</h2>
            <p className="mw-svc-areas__list">{service.serviceAreas.join(' · ')}</p>
            <p className="mw-svc-areas__nap">
              {CONTACT.address1}, {CONTACT.address2} ·{' '}
              <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
            </p>
          </div>
        </section>
      )}

      {/* ══ 4. Bottom Navy CTA Banner ══ */}
      <section className="mw-navy-banner">
        <div className="container">
          <h2 className="mw-navy-banner__title">
            {service.ctaTitle || `Ready to scale your business with ${displayTitle}?`}
          </h2>
          <a href="/free-site-scan" className="mw-navy-banner__btn">
            Schedule a Consultation
          </a>
        </div>
      </section>
    </main>
  );
}
