import { INDUSTRIES } from '../lib/industries';
import Breadcrumbs from './Breadcrumbs';

export default function LocationTemplate({ location }) {
  const localService = INDUSTRIES['local-service'];
  // City-specific FAQs first, shared local-service FAQs after.
  const allFaqs = [location.faq, ...(location.faqs || []), ...localService.faqs];
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allFaqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <main id="top">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="page-hero page-hero--left section">
        <div className="container container--narrow">
          <Breadcrumbs items={[
            { label: 'Home', href: '/' },
            { label: 'Local Service', href: '/industries/local-service' },
            { label: location.name },
          ]} />
          <p className="eyebrow" data-reveal><span className="eyebrow__dot"></span>Local Service Business &middot; {location.name}</p>
          <h1 className="statement" data-split style={{ textAlign: 'left' }}>{location.h1 || `SEO for ${location.name} service businesses.`}</h1>
          <p className="lede" data-reveal dangerouslySetInnerHTML={{ __html: location.intro }} />
          <div className="hero__ctas" data-reveal>
            <a href="/onboarding" className="btn btn--solid">Get a free audit</a>
            <a href="#included" className="btn btn--ghost">How we help</a>
          </div>
        </div>
      </section>

      {/* ══════════ Problem ══════════ */}
      <section className="about section section--tint" id="problem">
        <div className="container container--narrow">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>{localService.problem.eyebrow}</p>
          <h2 className="statement statement--small" data-split>{localService.problem.statement}</h2>
        </div>
      </section>

      {/* ══════════ Capabilities ══════════ */}
      <section className="section" id="included">
        <div className="container container--narrow" style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>How we help {location.name} businesses</p>
        </div>
        <div className="container">
          <div className="capability-grid">
            {localService.capabilities.map((c) => (
              <div className="capability-card" key={c.title} data-reveal>
                <span className="capability-card__tag">{c.tag}</span>
                <h3 className="capability-card__title">{c.title}</h3>
                <p className="capability-card__desc">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ City-specific depth (only cities with `sections` data) ══════════ */}
      {location.sections && (
        <section className="section" id="local-depth">
          <div className="container">
            <div className="article__body">
              {location.sections.map((block) => (
                <div key={block.heading} data-reveal>
                  <h2>{block.heading}</h2>
                  {block.paragraphs.map((p, i) => (
                    <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════ Process ══════════ */}
      <section className="section section--tint" id="process">
        <div className="container container--narrow" style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>How it runs</p>
          <h2 className="statement statement--small" data-split>A defined process, not an open-ended retainer.</h2>
        </div>
        <div className="container container--narrow">
          <ul className="process__list">
            {localService.process.map((p) => (
              <li className="process__item" key={p.step} data-reveal>
                <span className="process__step">{p.step}</span>
                <div>
                  <h3 className="process__title">{p.title}</h3>
                  <p className="process__desc">{p.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ══════════ FAQ ══════════ */}
      <section className="faq section" id="faq">
        <div className="container container--narrow">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>Common questions</p>
          <h2 className="statement statement--small" data-reveal style={{ marginBottom: '3rem' }}>{location.name} local SEO, plainly explained.</h2>
          <dl className="faq__list">
            {allFaqs.map((f) => (
              <div className="faq__item" key={f.q} data-reveal>
                <dt>{f.q}</dt>
                <dd dangerouslySetInnerHTML={{ __html: f.a }} />
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ══════════ CTA ══════════ */}
      <section className="cta section" id="contact">
        <div className="container container--narrow">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>Start a conversation</p>
          <h2 className="cta__title" data-split>Turn {location.name} searches into booked jobs.</h2>
          <div className="cta__actions" data-reveal>
            <a href="/onboarding" className="btn btn--solid btn--big">Book a strategy call</a>
            <a href="tel:+13237441338" className="btn btn--ghost btn--big">323-744-1338</a>
          </div>
        </div>
      </section>

    </main>
  );
}
