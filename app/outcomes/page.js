import { OUTCOMES } from '../../lib/outcomes';
import { buildMetadata } from '../../lib/meta';

export const metadata = buildMetadata({
  title: 'Outcomes — Traffic, Rankings, Sales & Penalty Recovery',
  description:
    'What working with Gobiya actually produces: qualified organic traffic, page-one rankings, sales pipeline, and recovery from Google algorithm updates or manual actions.',
  path: '/outcomes',
});

export default function OutcomesPage() {
  const outcomes = Object.values(OUTCOMES);

  return (
    <main id="top">

      <section className="page-hero section">
        <div className="container container--narrow">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>Outcomes</p>
          <h1 className="statement" data-split>Judge us by what changes, not what we do.</h1>
          <p className="lede" data-reveal>Traffic, rankings, and sales are the scoreboard — recovery is the fire drill when an update or a manual action costs you all three at once.</p>
        </div>
      </section>

      <section className="section" id="outcomes">
        <div className="container">
          <div className="insights__grid">
            {outcomes.map((o) => (
              <a className="insights__card" href={`/outcomes/${o.slug}`} key={o.slug} data-reveal>
                <span className="insights__card-cat">Outcome</span>
                <h2 className="insights__card-title">{o.title}</h2>
                <p className="insights__card-dek">{o.metaDescription}</p>
                <span className="link-arrow">See how<svg viewBox="0 0 16 16" width="14" height="14"><path d="M2 8h11M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="cta section section--tint" id="contact">
        <div className="container container--narrow">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>Start a conversation</p>
          <h2 className="cta__title" data-split>Which outcome matters most to you right now?</h2>
          <div className="cta__actions" data-reveal>
            <a href="mailto:hello@gobiya.com" className="btn btn--solid btn--big">hello@gobiya.com</a>
            <a href="tel:+13237441338" className="btn btn--ghost btn--big">323-744-1338</a>
          </div>
        </div>
      </section>

    </main>
  );
}
