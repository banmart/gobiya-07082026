import Breadcrumbs from './Breadcrumbs';

function slugifyHeading(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

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
          <Breadcrumbs items={[
            { label: 'Home', href: '/' },
            { label: 'Insights', href: '/insights' },
            { label: article.title },
          ]} />
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>Insights · {article.category}</p>
          <h1 className="statement" data-split>{article.title}</h1>
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
          <p dangerouslySetInnerHTML={{ __html: article.answer }} />
        </div>
      </section>

      {/* ══════════ Body ══════════ */}
      <section className="section" id="body">
        <div className="container">
          <nav className="article__toc" aria-label="Table of contents" data-reveal>
            <h3>On this page</h3>
            <ol>
              {article.body.map((block) => (
                <li key={block.heading}>
                  <a href={`#${slugifyHeading(block.heading)}`}>{block.heading}</a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="article__body">
            {article.body.map((block) => (
              <div key={block.heading} data-reveal>
                <h2 id={slugifyHeading(block.heading)}>{block.heading}</h2>
                {block.paragraphs.map((p, i) => {
                  if (typeof p === 'string') {
                    return <p key={i} dangerouslySetInnerHTML={{ __html: p }} />;
                  }
                  if (p.type === 'list') {
                    return (
                      <ul key={i}>
                        {p.items.map((item, ii) => (
                          <li key={ii} dangerouslySetInnerHTML={{ __html: item }} />
                        ))}
                      </ul>
                    );
                  }
                  if (p.type === 'table') {
                    return (
                      <div className="article__table-wrap" key={i}>
                        <table className="article__table">
                          <thead>
                            <tr>
                              {p.headers.map((h, hi) => (
                                <th key={hi}>{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {p.rows.map((row, ri) => (
                              <tr key={ri}>
                                {row.map((cell, ci) => (
                                  <td key={ci} dangerouslySetInnerHTML={{ __html: cell }} />
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    );
                  }
                  if (p.type === 'image') {
                    return (
                      <figure className="article__figure" key={i}>
                        <img src={p.src} alt={p.alt} loading="lazy" />
                        {p.caption && <figcaption>{p.caption}</figcaption>}
                      </figure>
                    );
                  }
                  return null;
                })}
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
                <dd dangerouslySetInnerHTML={{ __html: f.a }} />
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ══════════ Related + CTA ══════════ */}
      <section className="cta section" id="contact">
        <div className="container container--narrow">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>Related</p>
          <h2 className="cta__title" data-split>See how we approach {article.relatedLabel}.</h2>
          <div className="cta__actions" data-reveal>
            <a href={article.relatedHref} className="btn btn--solid btn--big">{article.relatedLabel}</a>
            <a href="/insights" className="btn btn--ghost btn--big">More Insights</a>
          </div>
        </div>
      </section>

    </main>
  );
}
