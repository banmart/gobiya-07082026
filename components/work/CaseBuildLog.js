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
 * SafetyCentric — a build log.
 *
 * A platform migration plus a CRM and a scraper. The interesting part is the
 * sequence of engineering decisions, so the body runs as log entries against a
 * monospace gutter, and the metrics sit at the end as the result of the log
 * rather than a banner at the top.
 */
export default function CaseBuildLog({ cs }) {
  return (
    <main id="top" className="case case--log">
      <CaseSchema cs={cs} />

      <header className="case-log__hero">
        <div className="container">
          <Breadcrumbs
            inHero
            items={[
              { label: 'Home', href: '/' },
              { label: 'Work', href: '/work' },
              { label: cs.client },
            ]}
          />
          <div className="case-log__heroGrid">
            <div>
              <CaseLogo cs={cs} className="case-log__logo" />
              <p className="case-log__tag">{cs.tag}</p>
              <h1 className="case-log__h1">{cs.client}</h1>
              <p className="case-log__dek">{cs.study.dek}</p>
            </div>
            <p className="case-log__stack">
              <span className="case-log__stackLabel">Scope</span>
              {cs.result}
            </p>
          </div>
        </div>
      </header>

      <section className="case-log__answer">
        <div className="container container--narrow">
          <p>{cs.study.answer}</p>
        </div>
      </section>

      <div className="container">
        <CaseVideo cs={cs} />
      </div>

      {/* Entries against a gutter. */}
      <div className="container container--narrow">
        <ol className="case-log__entries">
          {cs.study.body.map((block, i) => (
            <li key={block.heading} className="case-log__entry">
              <span className="case-log__entryId" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="case-log__entryBody">
                <h2>{block.heading}</h2>
                {block.paragraphs.map((p, j) =>
                  typeof p === 'string' ? (
                    <p key={j} dangerouslySetInnerHTML={{ __html: p }} />
                  ) : null
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* The result, after the log rather than before it. */}
      <section className="case-log__result">
        <div className="container container--narrow">
          <h2 className="case-log__resultTitle">Where it ended up</h2>
          <dl className="case-log__metrics">
            {(cs.study.metrics || []).map((x) => (
              <div key={x.label}>
                <dt>{x.value}</dt>
                <dd>{x.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <div className="container container--narrow case-log__takeaways">
        <CaseTakeaways cs={cs} title="What we would keep doing" />
      </div>

      <CaseTestimonial cs={cs} />
      <CaseClosing cs={cs} />
    </main>
  );
}
