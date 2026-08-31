import PageHero from './PageHero';
import ClientLogos from './ClientLogos';
import DataPanel from './sections/DataPanel';
import HierarchyDiagram from './sections/HierarchyDiagram';
import StepList from './sections/StepList';
import ReadingProgress from './sections/ReadingProgress';

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

  return (
    <main id="top">
      <ReadingProgress />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      {/* ══ Hero ══
             The article header runs on the shared navy hero rather than under a
             decorative band: the h1 was previously the second thing on the page
             with 350px of empty navy above it. */}
      <PageHero
        title={article.title}
        dek={article.dek}
        showTrust={false}
      >
        <p className="gb-hero__meta">
          By <a href="/about/steve-martin" title="About Steve Martin">Steve Martin</a> ·{' '}
          <time dateTime={article.date}>
            {new Date(`${article.date}T12:00:00Z`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </time>{' '}
          · {article.readTime}
        </p>
      </PageHero>

      <section className="section" style={{ paddingTop: '2rem', paddingBottom: 0 }}>
        <div className="container container--narrow">
          <div className="article__answer" data-reveal>
            <span className="article__answer-tag">
              <span className="article__answer-dot" aria-hidden="true" />
              The short answer
            </span>
            <p dangerouslySetInnerHTML={{ __html: article.answer }} />
          </div>
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
                  <a href={`#${slugifyHeading(block.heading)}`} title={block.heading}>{block.heading}</a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="article__body">
            {article.body.map((block, bi) => (
              <div key={block.heading} data-reveal>
                <p className="article__chapter-num" aria-hidden="true">
                  {String(bi + 1).padStart(2, '0')}
                  <span className="article__chapter-rule" />
                </p>
                <h2 id={slugifyHeading(block.heading)}>{block.heading}</h2>
                {block.paragraphs.map((p, i) => {
                  if (typeof p === 'string') {
                    return <p key={i} dangerouslySetInnerHTML={{ __html: p }} />;
                  }
                  // Lists and tables get their own presentation rather than
                  // sitting in the prose flow — see components/sections/.
                  if (p.type === 'list') {
                    return <StepList key={i} items={p.items} />;
                  }
                  if (p.type === 'table') {
                    return <DataPanel key={i} headers={p.headers} rows={p.rows} caption={p.caption} />;
                  }
                  if (p.type === 'hierarchy') {
                    return (
                      <HierarchyDiagram
                        key={i}
                        apex={p.apex}
                        apexNote={p.apexNote}
                        branches={p.branches}
                        caption={p.caption}
                      />
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
            <ul data-stagger>
              {article.takeaways.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ══ Client Logo Strip ══ */}
      <ClientLogos />

      {/* ══════════ Related + CTA ══════════ */}
      <section className="cta section" id="contact">
        <div className="container container--narrow">
          <h2 className="cta__title" data-split>See how we approach {article.relatedLabel}.</h2>
          <div className="cta__actions" data-reveal>
            <a href={article.relatedHref} className="btn btn--solid btn--big" title={article.relatedLabel}>{article.relatedLabel}</a>
            <a href="/insights" className="btn btn--ghost btn--big" title="Browse all insights">More Insights</a>
          </div>
        </div>
      </section>
    </main>
  );
}
