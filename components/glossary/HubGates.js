import Breadcrumbs from '../Breadcrumbs';
import { HubSchema, HubFaqs, HubClosing, RelatedLinks, groupTerms } from './hubShared';

/**
 * Technical SEO & Indexing — a series of gates.
 *
 * Indexation is genuinely a pass/fail sequence, so the page is built as gates a
 * page either clears or does not. Each gate is a full-width band with a heavy
 * rule above it and a pass condition stated plainly, which makes the failure
 * mode of each one the memorable part.
 */
export default function HubGates({ hub, hubForTerm }) {
  return (
    <main id="top" className="ghub ghub--gates">
      <HubSchema hub={hub} />

      <header className="ghub-gates__hero">
        <div className="container container--narrow">
          <Breadcrumbs
            inHero
            items={[
              { label: 'Home', href: '/' },
              { label: 'Glossary', href: '/glossary' },
              { label: hub.title },
            ]}
          />
          <h1 className="ghub-gates__h1">{hub.h1}</h1>
          <p className="lede">{hub.intro}</p>
        </div>
      </header>

      {hub.groups.map((group, gi) => (
        <section
          key={group.label}
          className={`ghub-gates__gate ${gi % 2 === 1 ? 'ghub-gates__gate--alt' : ''}`}
        >
          <div className="container">
            <div className="ghub-gates__rule" aria-hidden="true" />
            <div className="ghub-gates__gateHead">
              <h2 className="ghub-gates__gateLabel">{group.label}</h2>
              <p className="ghub-gates__gateNote">{group.note}</p>
            </div>

            <div className="ghub-gates__terms">
              {groupTerms(group).map((entry) => (
                <article key={entry.slug} id={entry.slug} className="ghub-gates__term">
                  <div className="ghub-gates__termHead">
                    <h3>{entry.term}</h3>
                  </div>
                  <div className="ghub-gates__termBody">
                    <p className="ghub-gates__short">{entry.shortDefinition}</p>
                    <p>{entry.body}</p>
                    <RelatedLinks entry={entry} hubForTerm={hubForTerm} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ))}

      <HubFaqs hub={hub} />
      <HubClosing hub={hub} />
    </main>
  );
}
