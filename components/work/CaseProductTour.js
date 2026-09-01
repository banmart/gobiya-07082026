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
 * QuickPass Aid — a product tour.
 *
 * A custom verification app with a payment gateway. Seeing it work is the
 * argument, so the screencast runs full-bleed directly under the title, before
 * any prose. The chapters then sit beside a sticky caption rail, like the notes
 * beside a demo.
 */
export default function CaseProductTour({ cs }) {
  return (
    <main id="top" className="case case--tour">
      <CaseSchema cs={cs} />

      <header className="case-tour__hero">
        <div className="container container--narrow">
          <Breadcrumbs
            inHero
            items={[
              { label: 'Home', href: '/' },
              { label: 'Work', href: '/work' },
              { label: cs.client },
            ]}
          />
          <CaseLogo cs={cs} className="case-tour__logo" />
          <p className="case-tour__tag">{cs.tag}</p>
          <h1 className="case-tour__h1">{cs.client}</h1>
          <p className="case-tour__dek">{cs.study.dek}</p>
        </div>
      </header>

      {/* The build, first. */}
      <div className="case-tour__stage">
        <div className="container">
          <CaseVideo cs={cs} />
        </div>
      </div>

      <div className="container">
        <div className="case-tour__grid">
          <aside className="case-tour__rail">
            <p className="case-tour__railLabel">What it does</p>
            <p className="case-tour__railText">{cs.study.answer}</p>
            <ul className="case-tour__railMetrics">
              {(cs.study.metrics || []).map((x) => (
                <li key={x.label}>
                  <strong>{x.value}</strong>
                  <span>{x.label}</span>
                </li>
              ))}
            </ul>
          </aside>

          <div className="case-tour__notes">
            {cs.study.body.map((block) => (
              <section key={block.heading} className="case-tour__note">
                <h2>{block.heading}</h2>
                {block.paragraphs.map((p, j) =>
                  typeof p === 'string' ? (
                    <p key={j} dangerouslySetInnerHTML={{ __html: p }} />
                  ) : null
                )}
              </section>
            ))}
            <CaseTakeaways cs={cs} title="What the build gave them" />
          </div>
        </div>
      </div>

      <CaseTestimonial cs={cs} />
      <CaseClosing cs={cs} />
    </main>
  );
}
