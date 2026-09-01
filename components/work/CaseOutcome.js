import Breadcrumbs from '../Breadcrumbs';
import {
  CaseSchema,
  CaseLogo,
  CaseVideo,
  CaseBody,
  CaseTakeaways,
  CaseTestimonial,
  CaseClosing,
} from './caseShared';

/**
 * SmileCenter — outcome first.
 *
 * The strongest number on the site (5x patient inquiries) leads, at display
 * size, before anything else. Everything after it is the explanation of how
 * that number happened.
 */
export default function CaseOutcome({ cs }) {
  const m = cs.study.metrics || [];

  return (
    <main id="top" className="case case--outcome">
      <CaseSchema cs={cs} />

      <header className="case-out__hero">
        <div className="container">
          <Breadcrumbs
            inHero
            items={[
              { label: 'Home', href: '/' },
              { label: 'Work', href: '/work' },
              { label: cs.client },
            ]}
          />
          <CaseLogo cs={cs} className="case-out__logo" />
          <p className="case-out__tag">{cs.tag}</p>

          <div className="case-out__figures">
            {m.map((x) => (
              <div key={x.label} className="case-out__figure">
                <span className="case-out__value">{x.value}</span>
                <span className="case-out__label">{x.label}</span>
              </div>
            ))}
          </div>

          <h1 className="case-out__h1">{cs.client}</h1>
          <p className="case-out__dek">{cs.study.dek}</p>
        </div>
      </header>

      <section className="case-out__answer">
        <div className="container container--narrow">
          <p>{cs.study.answer}</p>
        </div>
      </section>

      <div className="container">
        <CaseVideo cs={cs} />
      </div>

      <div className="container container--narrow case-out__body">
        <CaseBody cs={cs} />
        <CaseTakeaways cs={cs} />
      </div>

      <CaseTestimonial cs={cs} />
      <CaseClosing cs={cs} />
    </main>
  );
}
