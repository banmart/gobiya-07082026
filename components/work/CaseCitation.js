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
 * The Healing Metta — a citation.
 *
 * The project was structured specifically to be quoted by AI assistants, so the
 * page is set the way a citable page should be: the direct answer given the
 * most weight and placed first, chapters opening on their own extractable
 * summary line, and a narrow serif-weight measure throughout. It is the
 * quietest of the nine, deliberately.
 */
export default function CaseCitation({ cs }) {
  return (
    <main id="top" className="case case--cite">
      <CaseSchema cs={cs} />

      <header className="case-cite__hero">
        <div className="container container--narrow">
          <Breadcrumbs
            inHero
            items={[
              { label: 'Home', href: '/' },
              { label: 'Work', href: '/work' },
              { label: cs.client },
            ]}
          />
          <CaseLogo cs={cs} className="case-cite__logo" />
          <p className="case-cite__tag">{cs.tag}</p>
          <h1 className="case-cite__h1">{cs.client}</h1>
        </div>
      </header>

      {/* The extractable answer, given the weight the whole project was about. */}
      <section className="case-cite__answer">
        <div className="container container--narrow">
          <p className="case-cite__answerLabel">The short answer</p>
          <p className="case-cite__answerText">{cs.study.answer}</p>
        </div>
      </section>

      <section className="case-cite__dek">
        <div className="container container--narrow">
          <p>{cs.study.dek}</p>
          {(cs.study.metrics || []).map((x) => (
            <p key={x.label} className="case-cite__metric">
              <strong>{x.value}</strong> <span>{x.label}</span>
            </p>
          ))}
        </div>
      </section>

      <div className="container">
        <CaseVideo cs={cs} />
      </div>

      <div className="container container--narrow case-cite__body">
        {cs.study.body.map((block) => (
          <section key={block.heading} className="case-cite__chapter">
            <h2>{block.heading}</h2>
            {block.paragraphs.map((p, j) =>
              typeof p === 'string' ? <p key={j} dangerouslySetInnerHTML={{ __html: p }} /> : null
            )}
          </section>
        ))}
        <CaseTakeaways cs={cs} title="What makes a page quotable" />
      </div>

      <CaseTestimonial cs={cs} />
      <CaseClosing cs={cs} />
    </main>
  );
}
