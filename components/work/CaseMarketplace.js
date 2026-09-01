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
 * RemodelMePros — a marketplace.
 *
 * A two-sided platform: homeowners on one side, contractors on the other. The
 * page keeps that split visible, alternating chapters left and right of a
 * centre join, so the reader can see the build had to satisfy two audiences at
 * once.
 */
export default function CaseMarketplace({ cs }) {
  return (
    <main id="top" className="case case--market">
      <CaseSchema cs={cs} />

      <header className="case-mkt__hero">
        <div className="container container--narrow">
          <Breadcrumbs
            inHero
            items={[
              { label: 'Home', href: '/' },
              { label: 'Work', href: '/work' },
              { label: cs.client },
            ]}
          />
          <CaseLogo cs={cs} className="case-mkt__logo" />
          <p className="case-mkt__tag">{cs.tag}</p>
          <h1 className="case-mkt__h1">{cs.client}</h1>

          <div className="case-mkt__sides">
            <span className="case-mkt__side">Homeowners</span>
            <span className="case-mkt__join" aria-hidden="true" />
            <span className="case-mkt__side">Contractors</span>
          </div>

          <p className="case-mkt__dek">{cs.study.dek}</p>
        </div>
      </header>

      <section className="case-mkt__answer">
        <div className="container container--narrow">
          <p>{cs.study.answer}</p>
          <div className="case-mkt__metrics">
            {(cs.study.metrics || []).map((x) => (
              <p key={x.label}>
                <strong>{x.value}</strong> {x.label}
              </p>
            ))}
          </div>
        </div>
      </section>

      <div className="container">
        <CaseVideo cs={cs} />
      </div>

      {/* Chapters alternate across a centre join. */}
      <div className="case-mkt__axis">
        <div className="container">
          {cs.study.body.map((block, i) => (
            <section
              key={block.heading}
              className={`case-mkt__row ${i % 2 ? 'case-mkt__row--right' : 'case-mkt__row--left'}`}
            >
              <div className="case-mkt__rowInner">
                <h2>{block.heading}</h2>
                {block.paragraphs.map((p, j) =>
                  typeof p === 'string' ? (
                    <p key={j} dangerouslySetInnerHTML={{ __html: p }} />
                  ) : null
                )}
              </div>
            </section>
          ))}
        </div>
      </div>

      <div className="container container--narrow case-mkt__body">
        <CaseTakeaways cs={cs} title="What both sides needed" />
      </div>

      <CaseTestimonial cs={cs} />
      <CaseClosing cs={cs} />
    </main>
  );
}
