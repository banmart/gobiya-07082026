import Breadcrumbs from '../Breadcrumbs';
import { HubSchema, HubFaqs, HubClosing, RelatedLinks, groupTerms } from './hubShared';

/**
 * Site Speed, UX & Conversion — a load waterfall.
 *
 * Borrowed from the network panel every developer already reads: staggered bars
 * running left to right, each group offset further along the timeline than the
 * last. The offset is the argument — the reader should see that conversion sits
 * at the far right of a chain that starts with server response time.
 *
 * The bars are decorative and the real content underneath them is ordinary
 * prose, so nothing here depends on the visual metaphor being understood.
 */
export default function HubWaterfall({ hub, hubForTerm }) {
  return (
    <main id="top" className="ghub ghub--waterfall">
      <HubSchema hub={hub} />

      <header className="ghub-wf__hero">
        <div className="container container--narrow">
          <Breadcrumbs
            inHero
            items={[
              { label: 'Home', href: '/' },
              { label: 'Glossary', href: '/glossary' },
              { label: hub.title },
            ]}
          />
          <h1 className="ghub-wf__h1">{hub.h1}</h1>
          <p className="lede">{hub.intro}</p>
        </div>
      </header>

      <div className="container">
        <div className="ghub-wf__chart" aria-hidden="true">
          {hub.groups.map((group, gi) => (
            <div
              key={group.label}
              className="ghub-wf__bar"
              style={{ '--wf-offset': `${gi * 14}%`, '--wf-width': `${34 - gi * 2}%` }}
            >
              <span className="ghub-wf__barLabel">{group.label}</span>
            </div>
          ))}
        </div>

        <div className="ghub-wf__phases">
          {hub.groups.map((group, gi) => (
            <section
              key={group.label}
              className="ghub-wf__phase"
              style={{ '--wf-step': gi }}
            >
              <div className="ghub-wf__phaseHead">
                <span className="ghub-wf__phaseIndex" aria-hidden="true">
                  {gi + 1}/{hub.groups.length}
                </span>
                <h2 className="ghub-wf__phaseLabel">{group.label}</h2>
                <p className="ghub-wf__phaseNote">{group.note}</p>
              </div>

              <div className="ghub-wf__terms">
                {groupTerms(group).map((entry) => (
                  <article key={entry.slug} id={entry.slug} className="ghub-wf__term">
                    <h3>{entry.term}</h3>
                    <p className="ghub-wf__short">{entry.shortDefinition}</p>
                    <p>{entry.body}</p>
                    <RelatedLinks entry={entry} hubForTerm={hubForTerm} />
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      <HubFaqs hub={hub} />
      <HubClosing hub={hub} />
    </main>
  );
}
