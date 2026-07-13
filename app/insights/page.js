import { INSIGHTS } from '../../lib/insights';
import SplitText from '../../components/SplitText';
import InsightsGrid from '../../components/InsightsGrid';
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
          <InsightsGrid
            articles={INSIGHTS.map((a, i) => ({ a, i }))
              .sort((x, y) => new Date(y.a.date) - new Date(x.a.date) || y.i - x.i)
              .map(({ a }) => a)}
          />
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
