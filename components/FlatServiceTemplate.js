import Breadcrumbs from './Breadcrumbs';

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
          <h1 className="mw-subhero__title">{displayTitle}</h1>
          <p className="mw-subhero__dek">{service.intro}</p>
        </div>
      </section>

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

      {/* ══ 4. Bottom Navy CTA Banner ══ */}
      <section className="mw-navy-banner">
        <div className="container">
          <h2 className="mw-navy-banner__title">
            Ready to scale your business with {displayTitle}?
          </h2>
          <a href="/free-site-scan" className="mw-navy-banner__btn">
            Schedule a Consultation
          </a>
        </div>
      </section>
    </main>
  );
}
