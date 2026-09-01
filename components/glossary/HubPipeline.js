import Breadcrumbs from '../Breadcrumbs';
import { HubSchema, HubFaqs, HubClosing, RelatedLinks, groupTerms } from './hubShared';

/**
 * AI Search & GEO — a pipeline.
 *
 * The five groups are the five stages a page travels to become a citation, so
 * the layout is a numbered vertical spine with the stages hanging off it. The
 * reader should come away understanding that these are sequential: a page that
 * fails stage four is never evaluated at stage two.
 */
export default function HubPipeline({ hub, hubForTerm }) {
  return (
    <main id="top" className="ghub ghub--pipeline">
      <HubSchema hub={hub} />

      <header className="ghub-pipeline__hero">
        <div className="container container--narrow">
          <Breadcrumbs
            inHero
            items={[
              { label: 'Home', href: '/' },
              { label: 'Glossary', href: '/glossary' },
              { label: hub.title },
            ]}
          />
          <h1 className="ghub-pipeline__h1">{hub.h1}</h1>
          <p className="lede">{hub.intro}</p>
          <p className="ghub-pipeline__count">
            <strong>{hub.terms.length} terms</strong> across {hub.groups.length} stages
          </p>
        </div>
      </header>

      <div className="container">
        <ol className="ghub-pipeline__stages">
          {hub.groups.map((group, gi) => (
            <li key={group.label} className="ghub-stage">
              <div className="ghub-stage__marker" aria-hidden="true">
                <span className="ghub-stage__num">{String(gi + 1).padStart(2, '0')}</span>
              </div>

              <div className="ghub-stage__content">
                <h2 className="ghub-stage__label">{group.label}</h2>
                <p className="ghub-stage__note">{group.note}</p>

                <div className="ghub-stage__terms">
                  {groupTerms(group).map((entry) => (
                    <article key={entry.slug} id={entry.slug} className="ghub-term">
                      <h3 className="ghub-term__name">{entry.term}</h3>
                      <p className="ghub-term__short">{entry.shortDefinition}</p>
                      <p className="ghub-term__body">{entry.body}</p>
                      <RelatedLinks entry={entry} hubForTerm={hubForTerm} />
                    </article>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <HubFaqs hub={hub} />
      <HubClosing hub={hub} />
    </main>
  );
}
