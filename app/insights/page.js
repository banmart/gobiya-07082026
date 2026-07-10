import { INSIGHTS } from '../../lib/insights';
import SplitText from '../../components/SplitText';
import { buildMetadata } from '../../lib/meta';

export const metadata = buildMetadata({
  title: 'Insights — SEO, AI Visibility & Search Marketing',
  description:
    'Practical guides on technical SEO, algorithm recovery, AI visibility (GEO), local SEO, and search marketing pricing from the Gobiya team.',
  path: '/insights',
});

export default function InsightsPage() {
  return (
    <main id="top">

      <section className="page-hero section">
        <div className="container container--narrow">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>Insights</p>
          <SplitText tag="h1" className="statement" text="Search marketing, explained plainly." splitType="words" delay={18} duration={0.9} />
          <p className="lede" data-reveal>Practical guides on technical SEO, algorithm recovery, and AI visibility — written to actually answer the question, not just rank for it.</p>
        </div>
      </section>

      {/* ══════════ Article grid ══════════ */}
      <section className="section" id="articles">
        <div className="container">
          <div className="insights__grid">
            {INSIGHTS.map((a) => (
              <a className="insights__card" href={`/insights/${a.slug}`} key={a.slug} data-reveal>
                <span className="insights__card-cat">{a.category}</span>
                <h2 className="insights__card-title">{a.title}</h2>
                <p className="insights__card-dek">{a.dek}</p>
                <span className="link-arrow">Read<svg viewBox="0 0 16 16" width="14" height="14"><path d="M2 8h11M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ CTA ══════════ */}
      <section className="cta section section--tint" id="contact">
        <div className="container container--narrow">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>Start a conversation</p>
          <h2 className="cta__title" data-words>Have a question this didn&apos;t answer?</h2>
          <div className="cta__actions" data-reveal>
            <a href="mailto:hello@gobiya.com" className="btn btn--solid btn--big">hello@gobiya.com</a>
            <a href="tel:+13237441338" className="btn btn--ghost btn--big">323-744-1338</a>
          </div>
        </div>
      </section>

    </main>
  );
}
