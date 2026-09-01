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
 * American LiveScan — a booking funnel.
 *
 * The project turned searches into appointments, so the page is the funnel:
 * each body chapter is a stage, narrowing down the page, with the metric
 * attached to the stage it belongs to instead of collected in a hero strip.
 */
export default function CaseFunnel({ cs }) {
  const chapters = cs.study.body;
  const metrics = cs.study.metrics || [];

  return (
    <main id="top" className="case case--funnel">
      <CaseSchema cs={cs} />

      <header className="case-fun__hero">
        <div className="container container--narrow">
          <Breadcrumbs
            inHero
            items={[
              { label: 'Home', href: '/' },
              { label: 'Work', href: '/work' },
              { label: cs.client },
            ]}
          />
          <CaseLogo cs={cs} className="case-fun__logo" />
          <p className="case-fun__tag">{cs.tag}</p>
          <h1 className="case-fun__h1">{cs.client}</h1>
          <p className="case-fun__dek">{cs.study.dek}</p>
          <p className="case-fun__answer">{cs.study.answer}</p>
        </div>
      </header>

      <div className="container">
        <CaseVideo cs={cs} />
      </div>

      {/* Chapters as funnel stages: each band is narrower than the one above. */}
      <div className="case-fun__stack">
        {chapters.map((block, i) => (
          <section
            key={block.heading}
            className="case-fun__stage"
            style={{ '--stage': i, '--stages': chapters.length }}
          >
            <div className="case-fun__stageInner">
              <span className="case-fun__stageNum" aria-hidden="true">
                Stage {i + 1}
              </span>
              <h2>{block.heading}</h2>
              {block.paragraphs.map((p, j) =>
                typeof p === 'string' ? <p key={j} dangerouslySetInnerHTML={{ __html: p }} /> : null
              )}
              {metrics[i] && (
                <p className="case-fun__stageMetric">
                  <strong>{metrics[i].value}</strong> {metrics[i].label}
                </p>
              )}
            </div>
          </section>
        ))}
      </div>

      {/* Any metric that did not line up with a chapter still gets shown. */}
      {metrics.length > chapters.length && (
        <section className="case-fun__rest">
          <div className="container container--narrow">
            {metrics.slice(chapters.length).map((x) => (
              <p key={x.label}>
                <strong>{x.value}</strong> {x.label}
              </p>
            ))}
          </div>
        </section>
      )}

      <div className="container container--narrow case-fun__body">
        <CaseTakeaways cs={cs} title="What moved the bookings" />
      </div>

      <CaseTestimonial cs={cs} />
      <CaseClosing cs={cs} />
    </main>
  );
}
