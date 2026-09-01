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
 * MTW — a document flow.
 *
 * AI document generation with a payment step. The page is laid out as the
 * pipeline a document travels — input, generate, review, pay — with each
 * chapter presented as a station on that line, numbered and connected. The only
 * case study whose chapters carry a running connector.
 */
export default function CaseDocFlow({ cs }) {
  const STATIONS = ['Input', 'Generate', 'Review', 'Pay'];

  return (
    <main id="top" className="case case--doc">
      <CaseSchema cs={cs} />

      <header className="case-doc__hero">
        <div className="container container--narrow">
          <Breadcrumbs
            inHero
            items={[
              { label: 'Home', href: '/' },
              { label: 'Work', href: '/work' },
              { label: cs.client },
            ]}
          />
          <CaseLogo cs={cs} className="case-doc__logo" />
          <p className="case-doc__tag">{cs.tag}</p>
          <h1 className="case-doc__h1">{cs.client}</h1>
          <p className="case-doc__dek">{cs.study.dek}</p>

          <ol className="case-doc__pipeline" aria-hidden="true">
            {STATIONS.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
        </div>
      </header>

      <section className="case-doc__answer">
        <div className="container container--narrow">
          <p>{cs.study.answer}</p>
          <div className="case-doc__metrics">
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

      {/* Chapters as stations on the line. */}
      <div className="container container--narrow">
        <ol className="case-doc__stations">
          {cs.study.body.map((block, i) => (
            <li key={block.heading} className="case-doc__station">
              <span className="case-doc__stationDot" aria-hidden="true">
                {i + 1}
              </span>
              <div className="case-doc__stationBody">
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

        <div className="case-doc__body">
          <CaseTakeaways cs={cs} title="What automating it changed" />
        </div>
      </div>

      <CaseTestimonial cs={cs} />
      <CaseClosing cs={cs} />
    </main>
  );
}
