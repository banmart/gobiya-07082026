import Breadcrumbs from '../Breadcrumbs';
import {
  CaseSchema,
  CaseLogo,
  CaseVideo,
  CaseTakeaways,
  CaseTestimonial,
  CaseClosing,
} from './caseShared';

/**
 * Total Capital — a system diagram.
 *
 * A property search engine and an admin CRM that had to talk to each other, for
 * an enterprise reader who wants the architecture before the outcome. The page
 * opens on the three pieces and the wires between them, then explains each
 * piece as a labelled component rather than a narrative chapter.
 */
export default function CaseSystem({ cs }) {
  return (
    <main id="top" className="case case--sys">
      <CaseSchema cs={cs} />

      <header className="case-sys__hero">
        <div className="container">
          <Breadcrumbs
            inHero
            items={[
              { label: 'Home', href: '/' },
              { label: 'Work', href: '/work' },
              { label: cs.client },
            ]}
          />
          <CaseLogo cs={cs} className="case-sys__logo" />
          <p className="case-sys__tag">{cs.tag}</p>
          <h1 className="case-sys__h1">{cs.client}</h1>
          <p className="case-sys__dek">{cs.study.dek}</p>

          <div className="case-sys__diagram" aria-hidden="true">
            <span className="case-sys__node">Property search</span>
            <span className="case-sys__wire" />
            <span className="case-sys__node case-sys__node--core">Shared data layer</span>
            <span className="case-sys__wire" />
            <span className="case-sys__node">Admin CRM</span>
          </div>
          <p className="case-sys__diagramNote">
            Two front ends, one source of truth. Most of the work was in the
            middle.
          </p>
        </div>
      </header>

      <section className="case-sys__answer">
        <div className="container container--narrow">
          <p>{cs.study.answer}</p>
        </div>
      </section>

      <div className="container">
        <CaseVideo cs={cs} />
      </div>

      {/* Chapters as spec'd components. */}
      <div className="container">
        <div className="case-sys__components">
          {cs.study.body.map((block, i) => (
            <section key={block.heading} className="case-sys__component">
              <header className="case-sys__componentHead">
                <span className="case-sys__componentId" aria-hidden="true">
                  C{i + 1}
                </span>
                <h2>{block.heading}</h2>
              </header>
              {block.paragraphs.map((p, j) =>
                typeof p === 'string' ? (
                  <p key={j} dangerouslySetInnerHTML={{ __html: p }} />
                ) : null
              )}
            </section>
          ))}
        </div>
      </div>

      <section className="case-sys__spec">
        <div className="container container--narrow">
          <ul className="case-sys__metrics">
            {(cs.study.metrics || []).map((x) => (
              <li key={x.label}>
                <strong>{x.value}</strong> {x.label}
              </li>
            ))}
          </ul>
          <CaseTakeaways cs={cs} title="What the architecture bought them" />
        </div>
      </section>

      <CaseTestimonial cs={cs} />
      <CaseClosing cs={cs} />
    </main>
  );
}
