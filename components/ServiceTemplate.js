import Breadcrumbs from './Breadcrumbs';
import ServiceSidebar from './ServiceSidebar';
import SubHero from './SubHero';
import { servicePath } from '../lib/serviceIndex';

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
          The shared sub-page hero, which is the homepage hero markup: image,
          overlay, white card, primary + ghost CTA, and on phones the media
          lifted into a band above the stacked card. The authored headline
          carries the city ("Los Angeles SEO Services…"); displayTitle is the
          short rail label and drops it, so it runs as the eyebrow instead. The
          hero excerpt is two sentences, which reads as a body paragraph rather
          than a standfirst — hence `description`, not `excerpt`. */}
      <SubHero
        image={hero?.image}
        eyebrow={displayTitle}
        title={service.headline}
        description={hero?.excerpt}
        primary={{
          text: hero?.cta?.text || 'Get Your Free Site Scan',
          href: hero?.cta?.href || '/free-site-scan',
        }}
        secondary={hero?.cta2}
      />

      {/* ══ 3. Section Rail + Content Column ══ */}
      <div className="container">
        <div className="mw-pillar-grid">
          <ServiceSidebar activeSlug={service.slug} />

          {/* The section ids below are the jump targets ServiceSidebar lists —
              #problem, #whats-included, #how-it-works, #faqs. Renaming one here
              silently breaks a rail link, so they stay put. */}
          <div className="mw-svc-body">
            {/* The full authored intro, which is too long for the hero card and
                carries inline links the hero excerpt cannot. */}
            {service.standfirst && (
              <div
                className="mw-svc-lede"
                dangerouslySetInnerHTML={{ __html: service.standfirst }}
              />
            )}

            {service.problem && (
              <section id="problem" className="mw-svc-block mw-svc-block--problem">
                <h2 className="mw-svc-block__title">{service.problem.eyebrow}</h2>
                <p className="mw-svc-block__statement">{service.problem.statement}</p>
              </section>
            )}

            {/* Capabilities were eight to twelve stacked h2 blocks per page, which
                read as an outline rather than an offer. Same copy, same links,
                now one section of cards — the treatment the homepage and the city
                pages already use — so the whole offer is scannable at once. */}
            {service.capabilities?.length > 0 && (
              <section id="whats-included" className="mw-svc-block">
                <h2 className="mw-svc-block__title">What&apos;s included</h2>
                <div className="mw-svc-cards">
                  {service.capabilities.map((c, idx) => (
                    <a key={idx} href={c.href ?? '/glossary'} className="mw-svc-card">
                      {c.tag && <p className="mw-svc-card__tag">{c.tag}</p>}
                      <h3 className="mw-svc-card__title">{c.title}</h3>
                      <p className="mw-svc-card__desc">{c.desc}</p>
                      <span className="mw-svc-card__link">
                        Learn more <span aria-hidden="true">→</span>
                      </span>
                    </a>
                  ))}
                </div>
              </section>
            )}

            {service.process?.length > 0 && (
              <section id="how-it-works" className="mw-svc-block">
                <h2 className="mw-svc-block__title">How the work runs</h2>
                <ol className="mw-svc-steps">
                  {service.process.map((p) => (
                    <li key={p.step} className="mw-svc-step">
                      <span className="mw-svc-step__num">{p.step}</span>
                      <h3 className="mw-svc-step__title">{p.title}</h3>
                      <p className="mw-svc-step__desc">{p.desc}</p>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {service.faqs?.length > 0 && (
              <section id="faqs" className="mw-svc-block">
                <h2 className="mw-svc-block__title">Frequently asked questions</h2>
                <dl className="mw-svc-faq">
                  {service.faqs.map((f, fIdx) => (
                    <div key={fIdx} className="mw-svc-faq__item">
                      <dt className="mw-svc-faq__q">{f.q}</dt>
                      <dd
                        className="mw-svc-faq__a"
                        dangerouslySetInnerHTML={{ __html: f.a }}
                      />
                    </div>
                  ))}
                </dl>
              </section>
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
