import Image from 'next/image';

export default function CaseStudyTemplate({ cs }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${cs.client}: ${cs.result}`,
    description: cs.study.metaDescription,
    image: 'https://www.gobiya.com/assets/img/og-default.jpg',
    about: { '@type': 'Organization', name: cs.client },
    author: {
      '@type': 'Person',
      '@id': 'https://www.gobiya.com/about/steve-martin#person',
      name: 'Steve Martin',
      url: 'https://www.gobiya.com/about/steve-martin',
    },
    publisher: { '@id': 'https://www.gobiya.com/#organization' },
    mainEntityOfPage: `https://www.gobiya.com/work/${cs.slug}`,
  };

  return (
    <main id="top">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="page-hero section">
        <div className="container container--narrow">
          {cs.media?.logo && (
            <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>
              <img src={cs.media.logo} alt={`${cs.client} logo`} style={{ height: '60px', width: 'auto', objectFit: 'contain' }} />
            </div>
          )}
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>Case study · {cs.tag}</p>
          <h1 className="statement" data-split>{`${cs.client}: ${cs.result}`}</h1>
          {cs.study?.dek && <p className="lede" data-reveal>{cs.study.dek}</p>}
          {cs.url && (
            <div data-reveal style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'center' }}>
              <a href={cs.url} target="_blank" rel="noopener noreferrer" className="link-arrow">
                Visit {cs.client}
                <svg viewBox="0 0 16 16" width="14" height="14" style={{ marginLeft: '0.5rem' }}><path d="M2 8h11M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
              </a>
            </div>
          )}
        </div>

        <div className="article__answer" data-reveal>
          <p>{cs.study.answer}</p>
        </div>
      </section>

      {/* ══════════ Product screencast ══════════ */}
      {cs.media?.video && (
        <section className="section case-media" id="media">
          <div className="container">
            <div className="case-media__frame">
              <video
                className="case-media__video"
                src={cs.media.video}
                autoPlay
                loop
                muted
                playsInline
                aria-label={`${cs.client} product screencast`}
              />
              {cs.media?.logo && (
                <div className="case-media__logo">
                  <img src={cs.media.logo} alt={`${cs.client} logo`} style={{ maxWidth: '200px', maxHeight: '60px', objectFit: 'contain' }} />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ══════════ Headline metrics ══════════ */}
      <section className="section section--tint" id="results">
        <div className="container">
          <div className="capability-grid">
            {cs.study.metrics.map((m) => (
              <div className="capability-card" key={m.label} data-reveal>
                <h3 className="capability-card__title" style={{ fontSize: '2.5rem' }}>{m.value}</h3>
                <p className="capability-card__desc">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ Body ══════════ */}
      <section className="section" id="body">
        <div className="container">
          <div className="article__body">
            {cs.study.body.map((block) => (
              <div key={block.heading} data-reveal>
                <h2>{block.heading}</h2>
                {block.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            ))}
          </div>

          <div className="article__takeaways" data-reveal>
            <h3>What this engagement proves</h3>
            <ul>
              {cs.study.takeaways.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ══════════ Client testimonial ══════════ */}
      {cs.study.testimonial && (
        <section className="testimonials section section--dark" id="testimonial" aria-label={`What ${cs.client} said`}>
          <div className="container container--narrow">
            <p className="eyebrow eyebrow--center eyebrow--light" data-reveal><span className="eyebrow__dot"></span>In their own words</p>
            <div className="testimonial-rotator" data-reveal>
              <blockquote className="testimonial-rotator__quote">
                <p>{cs.study.testimonial.quote}</p>
              </blockquote>
              <div className="testimonial-rotator__byline">
                <p className="testimonial-rotator__attrib">
                  {cs.study.testimonial.name && (
                    <>
                      <span className="testimonial-rotator__name">{cs.study.testimonial.name}</span>
                      <span className="testimonial-rotator__sep" aria-hidden="true">·</span>
                    </>
                  )}
                  <span className="testimonial-rotator__company">{cs.client}</span>
                  <span className="testimonial-rotator__sep" aria-hidden="true">·</span>
                  <span className="testimonial-rotator__role">{cs.study.testimonial.role}</span>
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ══════════ Related pages ══════════ */}
      <section className="section section--tint" id="related">
        <div className="container container--narrow">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>Go deeper</p>
          <div className="hero__ctas" data-reveal>
            <a href={cs.serviceHref} className="btn btn--ghost">{cs.serviceLabel}</a>
            <a href={cs.industryHref} className="btn btn--ghost">{cs.tag}</a>
            <a href={cs.outcomeHref} className="btn btn--ghost">The outcome</a>
          </div>
        </div>
      </section>

      {/* ══════════ CTA ══════════ */}
      <section className="cta section" id="contact">
        <div className="container container--narrow">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>Start a conversation</p>
          <h2 className="cta__title" data-split>Your business could be the next case study.</h2>
          <div className="cta__actions" data-reveal>
            <a href="/onboarding" className="btn btn--solid btn--big">Start onboarding</a>
            <a href="/work" className="btn btn--ghost btn--big">More client work</a>
          </div>
        </div>
      </section>

    </main>
  );
}
