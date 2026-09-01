import Breadcrumbs from '../Breadcrumbs';
import { HubSchema, HubFaqs, HubClosing, RelatedLinks, groupTerms } from './hubShared';

/**
 * PPC & Paid Media — a ledger.
 *
 * Paid media is the one topic here that is literally about money moving, so the
 * page is set as an account statement: a sticky running index down the left, and
 * bands of rows on the right read top to bottom in the order spend flows through
 * an account. Terms are rows, not cards — a deliberate contrast with the other
 * five hubs.
 */
export default function HubLedger({ hub, hubForTerm }) {
  return (
    <main id="top" className="ghub ghub--ledger">
      <HubSchema hub={hub} />

      <header className="ghub-ledger__hero">
        <div className="container">
          <Breadcrumbs
            inHero
            items={[
              { label: 'Home', href: '/' },
              { label: 'Glossary', href: '/glossary' },
              { label: hub.title },
            ]}
          />
          <div className="ghub-ledger__heroGrid">
            <div>
              <h1 className="ghub-ledger__h1">{hub.h1}</h1>
              <p className="lede">{hub.intro}</p>
            </div>
            <dl className="ghub-ledger__stats">
              <div>
                <dt>Terms</dt>
                <dd>{hub.terms.length}</dd>
              </div>
              <div>
                <dt>Sections</dt>
                <dd>{hub.groups.length}</dd>
              </div>
            </dl>
          </div>
        </div>
      </header>

      <div className="container">
        <div className="ghub-ledger__grid">
          <nav className="ghub-ledger__index" aria-label="Sections on this page">
            <p className="ghub-ledger__indexTitle">On this page</p>
            <ol>
              {hub.groups.map((group) => (
                <li key={group.label}>
                  <a href={`#${slugify(group.label)}`}>{group.label}</a>
                  <span className="ghub-ledger__indexCount">{group.terms.length}</span>
                </li>
              ))}
              <li>
                <a href="#faq">Common questions</a>
                <span className="ghub-ledger__indexCount">{hub.faqs.length}</span>
              </li>
            </ol>
          </nav>

          <div className="ghub-ledger__body">
            {hub.groups.map((group) => (
              <section
                key={group.label}
                id={slugify(group.label)}
                className="ghub-ledger__band"
              >
                <div className="ghub-ledger__bandHead">
                  <h2>{group.label}</h2>
                  <p>{group.note}</p>
                </div>

                <dl className="ghub-ledger__rows">
                  {groupTerms(group).map((entry) => (
                    <div key={entry.slug} id={entry.slug} className="ghub-ledger__row">
                      <dt className="ghub-ledger__term">{entry.term}</dt>
                      <dd className="ghub-ledger__def">
                        <p className="ghub-ledger__short">{entry.shortDefinition}</p>
                        <p className="ghub-ledger__long">{entry.body}</p>
                        <RelatedLinks entry={entry} hubForTerm={hubForTerm} />
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            ))}
          </div>
        </div>
      </div>

      <HubFaqs hub={hub} />
      <HubClosing hub={hub} />
    </main>
  );
}

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
