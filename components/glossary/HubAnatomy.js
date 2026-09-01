import Breadcrumbs from '../Breadcrumbs';
import { HubSchema, HubFaqs, HubClosing, RelatedLinks, groupTerms } from './hubShared';

/**
 * On-Page & Content SEO — a page anatomy.
 *
 * The subject is literally the parts of a web page, so the layout is a labelled
 * diagram: a sticky wireframe of a document on the left, with each group's terms
 * beside the part of the page they govern. The wireframe is inert decoration —
 * every term is a normal heading and paragraph in the source order a crawler
 * reads.
 */
export default function HubAnatomy({ hub, hubForTerm }) {
  return (
    <main id="top" className="ghub ghub--anatomy">
      <HubSchema hub={hub} />

      <header className="ghub-anat__hero">
        <div className="container container--narrow">
          <Breadcrumbs
            inHero
            items={[
              { label: 'Home', href: '/' },
              { label: 'Glossary', href: '/glossary' },
              { label: hub.title },
            ]}
          />
          <h1 className="ghub-anat__h1">{hub.h1}</h1>
          <p className="lede">{hub.intro}</p>
        </div>
      </header>

      <div className="container">
        <div className="ghub-anat__grid">
          <aside className="ghub-anat__figure" aria-hidden="true">
            <div className="ghub-anat__wire">
              <span className="ghub-anat__wireTab">browser tab · title tag</span>
              <div className="ghub-anat__wirePage">
                <div className="ghub-anat__wireH1">H1</div>
                <div className="ghub-anat__wireLine ghub-anat__wireLine--long" />
                <div className="ghub-anat__wireLine" />
                <div className="ghub-anat__wireH2">H2</div>
                <div className="ghub-anat__wireLine ghub-anat__wireLine--long" />
                <div className="ghub-anat__wireLine ghub-anat__wireLine--short" />
                <div className="ghub-anat__wireH2">H2</div>
                <div className="ghub-anat__wireLine" />
                <div className="ghub-anat__wireSchema">{'{ schema }'}</div>
              </div>
            </div>
          </aside>

          <div className="ghub-anat__content">
            {hub.groups.map((group) => (
              <section key={group.label} className="ghub-anat__part">
                <div className="ghub-anat__partHead">
                  <h2>{group.label}</h2>
                  <p>{group.note}</p>
                </div>

                {groupTerms(group).map((entry) => (
                  <article key={entry.slug} id={entry.slug} className="ghub-anat__term">
                    <h3>{entry.term}</h3>
                    <p className="ghub-anat__short">{entry.shortDefinition}</p>
                    <p>{entry.body}</p>
                    <RelatedLinks entry={entry} hubForTerm={hubForTerm} />
                  </article>
                ))}
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
