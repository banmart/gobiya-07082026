import Breadcrumbs from './Breadcrumbs';
import ServiceSidebar from './ServiceSidebar';

// The single service page layout. All eight service pages render through this
// component in the same shape: subhero, section rail + content column, closing
// CTA. It replaces the old ServiceTemplate/FlatServiceTemplate split, where
// half the pages silently dropped the problem statement, process steps and
// authored CTA that were already written for them in lib/services.js.

export default function ServiceTemplate({ service }) {
  const displayTitle = service.navTitle || service.title;
  const hero = service.hero;

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: displayTitle,
    serviceType: service.eyebrow || displayTitle,
    description: service.metaDescription || service.standfirst,
    url: `https://www.gobiya.com/${service.slug}`,
    provider: { '@id': 'https://www.gobiya.com/#organization' },
    // Every service page is a Los Angeles page, and SiteSchema already declares
    // City: Los Angeles for the organization. Claiming the whole country here
    // would contradict it.
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

      {/* ══ 1. Breadcrumb Bar ══ */}
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: displayTitle },
      ]} />

      {/* ══ 2. Hero ══
          Same pattern as the homepage: image, overlay, white card, headline,
          short excerpt, primary + ghost CTA. The authored headline carries the
          city ("Los Angeles SEO Services to Help Your Business Get Found");
          displayTitle is the short rail label and drops it, which is the wrong
          headline for a city-intent page. */}
      <section
        className="mw-hero"
        style={hero?.image ? { backgroundImage: `url('${hero.image}')` } : undefined}
      >
        <div className="mw-hero__overlay" />
        <div className="container">
          <div className="mw-hero__card">
            <h1 className="mw-hero__title">{service.headline}</h1>
            {hero?.excerpt && <p className="mw-hero__excerpt">{hero.excerpt}</p>}
            <div className="mw-hero__actions">
              <a href={hero?.cta?.href || '/free-site-scan'} className="mw-hero__btn">
                {hero?.cta?.text || 'Get Your Free Site Scan'}
              </a>
              {hero?.cta2 && (
                <a href={hero.cta2.href} className="mw-hero__btn mw-hero__btn--ghost">
                  {hero.cta2.text}
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ══ 3. Section Rail + Content Column ══ */}
      <div className="container">
        <div className="mw-pillar-grid">
          <ServiceSidebar activeSlug={service.slug} />

          <div className="mw-cluster-list">
            {/* The full authored intro, which is too long for the hero card and
                carries inline links the hero excerpt cannot. */}
            {service.standfirst && (
              <div className="mw-cluster-block">
                <div
                  className="mw-cluster-block__desc mw-cluster-block__lede"
                  dangerouslySetInnerHTML={{ __html: service.standfirst }}
                />
              </div>
            )}

            {service.problem && (
              <div id="problem" className="mw-cluster-block">
                <h2 className="mw-cluster-block__title" style={{ textDecoration: 'none' }}>
                  {service.problem.eyebrow}
                </h2>
                <p className="mw-cluster-block__desc">{service.problem.statement}</p>
              </div>
            )}

            {service.capabilities?.map((c, idx) => (
              <div
                key={idx}
                id={idx === 0 ? 'whats-included' : `capability-${idx}`}
                className="mw-cluster-block"
              >
                <h2 className="mw-cluster-block__title">
                  <a href={c.href ?? '/glossary'}>{c.title}</a>
                </h2>
                <p className="mw-cluster-block__desc">{c.desc}</p>
              </div>
            ))}

            {service.process?.length > 0 && (
              <div id="how-it-works" className="mw-cluster-block">
                <h2 className="mw-cluster-block__title" style={{ textDecoration: 'none' }}>
                  How the work runs
                </h2>
                <div className="mw-svc-process__grid" style={{ marginTop: '1.5rem' }}>
                  {service.process.map((p) => (
                    <div key={p.step}>
                      <div className="mw-svc-process__num">{p.step}</div>
                      <h3 className="mw-svc-process__title">{p.title}</h3>
                      <p className="mw-svc-process__desc">{p.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

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

      {/* ══ 4. Bottom Navy CTA Banner ══ */}
      <section className="mw-navy-banner">
        <div className="container">
          <h2 className="mw-navy-banner__title">
            {service.ctaTitle || `Ready to scale your business with ${displayTitle}?`}
          </h2>
          <a href={service.heroCtaHref || '/free-site-scan'} className="mw-navy-banner__btn">
            {service.heroCtaText || 'Schedule a Consultation'}
          </a>
        </div>
      </section>
    </main>
  );
}
