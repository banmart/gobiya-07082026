import SplitText from './SplitText';

export default function ArticleTemplate({ article }) {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.metaDescription,
    datePublished: article.date,
    dateModified: article.date,
    image: 'https://www.gobiya.com/assets/img/og-default.jpg',
    author: {
      '@type': 'Person',
      '@id': 'https://www.gobiya.com/about/steve-martin#person',
      name: 'Steve Martin',
      url: 'https://www.gobiya.com/about/steve-martin',
    },
    publisher: { '@id': 'https://www.gobiya.com/#organization' },
    mainEntityOfPage: `https://www.gobiya.com/insights/${article.slug}`,
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: article.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <main id="top">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="page-hero section">
        <div className="container container--narrow">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>Insights · {article.category}</p>
          <SplitText tag="h1" className="statement" text={article.title} splitType="words" delay={18} duration={0.9} />
          <p className="lede" data-reveal>{article.dek}</p>
          <p className="article__meta" data-reveal>
            By <a href="/about/steve-martin">Steve Martin</a> ·{' '}
            <time dateTime={article.date}>
              {new Date(`${article.date}T12:00:00Z`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </time>{' '}
            · {article.readTime}
          </p>
        </div>

        <div className="article__answer" data-reveal>
          <p>{article.answer}</p>
        </div>
      </section>

      {/* ══════════ Body ══════════ */}
      <section className="section" id="body">
        <div className="container">
          <div className="article__body">
            {article.body.map((block) => (
              <div key={block.heading} data-reveal>
                <h2>{block.heading}</h2>
                {block.paragraphs.map((p, i) => (
                  <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
                ))}
              </div>
            ))}
          </div>

          <div className="article__takeaways" data-reveal>
            <h3>Key takeaways</h3>
            <ul>
              {article.takeaways.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ══════════ FAQ ══════════ */}
      <section className="faq section section--tint" id="faq">
        <div className="container container--narrow">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>Common questions</p>
          <h2 className="statement statement--small" data-reveal style={{ marginBottom: '3rem' }}>{article.title.split(':')[0]}, plainly explained.</h2>
          <dl className="faq__list">
            {article.faqs.map((f) => (
              <div className="faq__item" key={f.q} data-reveal>
                <dt>{f.q}</dt>
                <dd>{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ══════════ Related + CTA ══════════ */}
      <section className="cta section" id="contact">
        <div className="container container--narrow">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>Related</p>
          <h2 className="cta__title" data-words>See how we approach {article.relatedLabel}.</h2>
          <div className="cta__actions" data-reveal>
            <a href={article.relatedHref} className="btn btn--solid btn--big">{article.relatedLabel}</a>
            <a href="/insights" className="btn btn--ghost btn--big">More Insights</a>
          </div>
        </div>
      </section>

    </main>
  );
}
