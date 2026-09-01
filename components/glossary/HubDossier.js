import Breadcrumbs from '../Breadcrumbs';
import { HubSchema, HubFaqs, HubClosing, RelatedLinks, groupTerms } from './hubShared';

/**
 * Authority, Links & Local SEO — a dossier.
 *
 * This is the shortest hub and the one about credibility, so it gets the most
 * editorial treatment: a dark masthead, serif-weight measure, and the two groups
 * set as facing halves of the same argument — trust earned at scale on one side,
 * the same case made to a search engine that already knows where you are on the
 * other.
 */
export default function HubDossier({ hub, hubForTerm }) {
  return (
    <main id="top" className="ghub ghub--dossier">
      <HubSchema hub={hub} />

      <header className="ghub-dos__masthead">
        <div className="container container--narrow">
          <Breadcrumbs
            inHero
            items={[
              { label: 'Home', href: '/' },
              { label: 'Glossary', href: '/glossary' },
              { label: hub.title },
            ]}
          />
          <p className="ghub-dos__kicker">Glossary · {hub.terms.length} terms</p>
          <h1 className="ghub-dos__h1">{hub.h1}</h1>
          <p className="ghub-dos__lede">{hub.intro}</p>
        </div>
      </header>

      <div className="container">
        <div className="ghub-dos__halves">
          {hub.groups.map((group, gi) => (
            <section key={group.label} className="ghub-dos__half">
              <div className="ghub-dos__halfHead">
                <span className="ghub-dos__halfIndex" aria-hidden="true">
                  {gi === 0 ? 'I' : 'II'}
                </span>
                <h2>{group.label}</h2>
                <p>{group.note}</p>
              </div>

              {groupTerms(group).map((entry) => (
                <article key={entry.slug} id={entry.slug} className="ghub-dos__term">
                  <h3>{entry.term}</h3>
                  <p className="ghub-dos__short">{entry.shortDefinition}</p>
                  <p className="ghub-dos__body">{entry.body}</p>
                  <RelatedLinks entry={entry} hubForTerm={hubForTerm} />
                </article>
              ))}
            </section>
          ))}
        </div>
      </div>

      <HubFaqs hub={hub} />
      <HubClosing hub={hub} />
    </main>
  );
}
