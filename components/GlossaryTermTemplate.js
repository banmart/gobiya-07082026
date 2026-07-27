import Breadcrumbs from './Breadcrumbs';
import { getGlossaryTerm } from '../lib/glossary';
import PinnedSections from './PinnedSections';

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

      {/* ══ 1. Breadcrumb Bar ══ */}
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Glossary', href: '/glossary' },
        { label: entry.term },
      ]} />

      {/* ══ 2. Dark Subhero Banner ══ */}
      <section className="mw-subhero">
        <div className="container">
          <span className="mw-subhero__eyebrow">{entry.category}</span>
          <h1 className="mw-subhero__title">{entry.term}</h1>
        </div>
      </section>

      {/* ══ 3. Bento Grid Body ══ */}
      <section className="section gls-body" id="gls-content">
        <div className="container">
          <div className="gls-bento">

            {/* Short Answer — wide card */}
            <div className="gls-card gls-card--answer">
              <span className="gls-card__eyebrow">
                <span className="gls-card__dot" aria-hidden="true" />
                The short answer
              </span>
              <p className="gls-card__answer">{entry.shortDefinition}</p>
            </div>

            {/* Full Explanation */}
            <div className="gls-card gls-card--body">
              <span className="gls-card__label">Full explanation</span>
              <p>{entry.body}</p>
            </div>

            {/* Related Terms */}
            {relatedTerms.length > 0 && (
              <div className="gls-card gls-card--related">
                <span className="gls-card__label">Related terms</span>
                <ul className="gls-related-list">
                  {relatedTerms.map((t) => (
                    <li key={t.slug}>
                      <a href={`/glossary/${t.slug}`} className="gls-related-link">
                        <span>{t.term}</span>
                        <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
                          <path d="M2 8h11M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Service CTA card */}
            {entry.relatedHref && (
              <div className="gls-card gls-card--cta">
                <span className="gls-card__label">Put it to work</span>
                <p className="gls-card__cta-text">See how we apply this for Los Angeles businesses.</p>
                <a href={entry.relatedHref} className="btn btn--solid" style={{ marginTop: '1.25rem' }}>
                  {entry.relatedLabel ?? 'Learn more'}
                </a>
              </div>
            )}

            {/* Back to glossary — always shown */}
            <div className="gls-card gls-card--back">
              <a href="/glossary" className="gls-back-link">
                <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
                  <path d="M14 8H3M7 13L2 8l5-5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                Back to all terms
              </a>
              <p className="gls-card__count">77 terms and growing</p>
            </div>

          </div>
        </div>
      </section>
      <PinnedSections />
    </main>
  );
}
