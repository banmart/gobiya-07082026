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
 * DG Plumbing — a dispatch board.
 *
 * A CRM and dispatcher for a trade business, so the page borrows the board the
 * client actually works from: metrics as job cards across the top, and chapters
 * as ticket rows on a ruled grid with a status column. The most utilitarian of
 * the nine, which suits the client.
 */
export default function CaseDispatch({ cs }) {
  return (
    <main id="top" className="case case--dis">
      <CaseSchema cs={cs} />

      <header className="case-dis__hero">
        <div className="container">
          <Breadcrumbs
            inHero
            items={[
              { label: 'Home', href: '/' },
              { label: 'Work', href: '/work' },
              { label: cs.client },
            ]}
          />
          <CaseLogo cs={cs} className="case-dis__logo" />
          <p className="case-dis__tag">{cs.tag}</p>
          <h1 className="case-dis__h1">{cs.client}</h1>
          <p className="case-dis__dek">{cs.study.dek}</p>
        </div>
      </header>

      <section className="case-dis__board">
        <div className="container">
          <div className="case-dis__cards">
            {(cs.study.metrics || []).map((x) => (
              <div key={x.label} className="case-dis__card">
                <strong>{x.value}</strong>
                <span>{x.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="case-dis__answer">
        <div className="container container--narrow">
          <p>{cs.study.answer}</p>
        </div>
      </section>

      <div className="container">
        <CaseVideo cs={cs} />
      </div>

      {/* Chapters as ticket rows. */}
      <div className="container">
        <div className="case-dis__tickets">
          {cs.study.body.map((block, i) => (
            <section key={block.heading} className="case-dis__ticket">
              <div className="case-dis__ticketMeta">
                <span className="case-dis__ticketId" aria-hidden="true">
                  #{String(i + 1).padStart(3, '0')}
                </span>
                <span className="case-dis__ticketStatus">Done</span>
              </div>
              <div className="case-dis__ticketBody">
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

      <div className="container container--narrow case-dis__body">
        <CaseTakeaways cs={cs} title="What changed on the ground" />
      </div>

      <CaseTestimonial cs={cs} />
      <CaseClosing cs={cs} />
    </main>
  );
}
