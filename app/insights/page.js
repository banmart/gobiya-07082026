import { INSIGHTS } from '../../lib/insights';
import InsightsGrid from '../../components/InsightsGrid';
import { buildMetadata } from '../../lib/meta';
import TopicMarquee from '../../components/TopicMarquee';

export const metadata = buildMetadata({
  title: 'Insights — SEO & AI Visibility Guides',
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
          <h1 className="statement" data-split>Search marketing, explained plainly.</h1>
          <p className="lede" data-reveal>Practical guides on technical SEO, algorithm recovery, and AI visibility — written to actually answer the question, not just rank for it.</p>
        </div>
      </section>
      <TopicMarquee topics={["SEO News", "Algorithm Updates", "Generative Search Trends", "Digital Marketing Blog", "Agency Perspectives"]} />


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

      {/* ══════════ Full archive ══════════
          InsightsGrid paginates client-side at 6 per page, so only the first 6
          articles ever appear as links in the server-rendered HTML — the other
          28 had no crawlable path from this hub at all. GSC confirmed the
          damage: a cluster of /insights/* URLs sitting at "Discovered -
          currently not indexed" with last_crawl_time null, i.e. found via the
          sitemap but never considered worth fetching, which is what happens to
          a page nothing links to. This list is plain server-rendered anchors
          for every article, so the grid keeps its UX and the crawler gets a
          complete path. */}
      <section className="section section--tint" id="all-articles">
        <div className="container container--narrow">
          <p className="eyebrow"><span className="eyebrow__dot"></span>Full archive</p>
          <h2 className="statement statement--small">All {INSIGHTS.length} articles</h2>
          <ul className="archive-list">
            {INSIGHTS.map((a) => (
              <li key={a.slug} className="archive-list__item">
                <a href={`/insights/${a.slug}`} className="archive-list__link">
                  <span className="archive-list__title">{a.title}</span>
                  <span className="archive-list__meta">{a.category}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ══════════ CTA ══════════ */}
      <section className="cta section section--tint" id="contact">
        <div className="container container--narrow">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>Start a conversation</p>
          <h2 className="cta__title" data-split>Have a question this didn&apos;t answer?</h2>
          <div className="cta__actions" data-reveal>
            <a href="/onboarding" className="btn btn--solid btn--big">Book a strategy call</a>
            <a href="tel:+13237441338" className="btn btn--ghost btn--big">323-744-1338</a>
          </div>
        </div>
      </section>

    </main>
  );
}
