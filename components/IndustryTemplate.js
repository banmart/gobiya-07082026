
export default function IndustryTemplate({ industry, cities }) {
  return (
    <main id="top">

      <section className="page-hero section">
        <div className="container container--narrow">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>{industry.eyebrow}</p>
          <h1 className="statement" data-split>{industry.heroLines.join(' ')}</h1>
          <p className="lede" data-reveal dangerouslySetInnerHTML={{ __html: industry.lede }} />
          <div className="hero__ctas" data-reveal>
            <a href="/onboarding" className="btn btn--solid">Get a free audit</a>
            <a href="#included" className="btn btn--ghost">How we help</a>
          </div>
        </div>
      </section>

      {/* ══════════ Problem ══════════ */}
      <section className="about section section--tint" id="problem">
        <div className="container container--narrow">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>{industry.problem.eyebrow}</p>
          <h2 className="statement statement--small" data-split>{industry.problem.statement}</h2>
        </div>
      </section>

      {/* ══════════ Capabilities ══════════ */}
      <section className="section" id="included">
        <div className="container container--narrow" style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>How we help</p>
        </div>
        <div className="container">
          <div className="capability-grid">
            {industry.capabilities.map((c) => (
              <div className="capability-card" key={c.title} data-reveal>
                <span className="capability-card__tag">{c.tag}</span>
                <h3 className="capability-card__title">{c.title}</h3>
                <p className="capability-card__desc" dangerouslySetInnerHTML={{ __html: c.desc }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ Process ══════════ */}
      <section className="section section--tint" id="process">
        <div className="container container--narrow" style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>How it runs</p>
          <h2 className="statement statement--small" data-split>A defined process, not an open-ended retainer.</h2>
        </div>
        <div className="container container--narrow">
          <ul className="process__list">
            {industry.process.map((p) => (
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

      {/* ══════════ Cities ══════════ */}
      {cities && cities.length > 0 && (
        <section className="section" id="cities">
          <div className="container container--narrow" style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
            <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>Cities we serve</p>
            <h2 className="statement statement--small" data-split>Local pages for the areas we work in most.</h2>
          </div>
          <div className="container">
            <ul className="cities__list">
              {cities.map((c) => (
                <li key={c.slug} data-reveal>
                  <a href={`/industries/local-service/${c.slug}`} className="cities__link">{c.name}</a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ══════════ FAQ ══════════ */}
      <section className="faq section" id="faq">
        <div className="container container--narrow">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>Common questions</p>
          <h2 className="statement statement--small" data-reveal style={{ marginBottom: '3rem' }}>{industry.title}, plainly explained.</h2>
          <dl className="faq__list">
            {industry.faqs.map((f) => (
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
          <h2 className="cta__title" data-split>{industry.ctaTitle}</h2>
          <div className="cta__actions" data-reveal>
            <a href="mailto:hello@gobiya.com" className="btn btn--solid btn--big">hello@gobiya.com</a>
            <a href="tel:+13237441338" className="btn btn--ghost btn--big">323-744-1338</a>
          </div>
        </div>
      </section>

    </main>
  );
}
