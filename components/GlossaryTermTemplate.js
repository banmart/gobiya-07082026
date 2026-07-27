import Breadcrumbs from './Breadcrumbs';
import { getGlossaryTerm } from '../lib/glossary';

export default function GlossaryTermTemplate({ entry }) {
  const relatedTerms = (entry.relatedSlugs || [])
    .map((slug) => getGlossaryTerm(slug))
    .filter(Boolean);

  const termSchema = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: entry.term,
    description: entry.shortDefinition,
    inDefinedTermSet: 'https://www.gobiya.com/glossary',
    url: `https://www.gobiya.com/glossary/${entry.slug}`,
  };

  return (
    <main id="top">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(termSchema) }} />

      <section className="page-hero section">
        <div className="container container--narrow">
          <Breadcrumbs items={[
            { label: 'Home', href: '/' },
            { label: 'Glossary', href: '/glossary' },
            { label: entry.term },
          ]} />
          <span className="insights__card-cat">{entry.category}</span>
          <h1 className="statement" data-split>{entry.term}</h1>
        </div>

        <div className="article__answer" data-reveal>
          <span className="article__answer-tag">
            <span className="article__answer-dot" aria-hidden="true" />
            The short answer
          </span>
          <p>{entry.shortDefinition}</p>
        </div>
      </section>

      <section className="section" id="body">
        <div className="container container--narrow">
          <div className="article__body">
            <p>{entry.body}</p>
          </div>

          {relatedTerms.length > 0 && (
            <div className="glossary-related" data-reveal>
              <h3>Related terms</h3>
              <ul className="glossary-related__list">
                {relatedTerms.map((t) => (
                  <li key={t.slug}>
                    <a href={`/glossary/${t.slug}`} className="link-arrow">
                      {t.term}
                      <svg viewBox="0 0 16 16" width="14" height="14"><path d="M2 8h11M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      <section className="cta section section--tint" id="contact">
        <div className="container container--narrow">
          <h2 className="cta__title" data-split>
            {entry.relatedLabel ? `See how we approach ${entry.relatedLabel.replace(/^See (our )?/i, '')}.` : 'Want help putting this into practice?'}
          </h2>
          <div className="cta__actions" data-reveal>
            {entry.relatedHref && (
              <a href={entry.relatedHref} className="btn btn--solid btn--big">{entry.relatedLabel}</a>
            )}
            <a href="/glossary" className="btn btn--ghost btn--big">More Terms</a>
          </div>
        </div>
      </section>
    </main>
  );
}
