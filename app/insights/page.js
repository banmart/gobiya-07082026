import { INSIGHTS } from '../../lib/insights';
import { buildMetadata } from '../../lib/meta';
import Breadcrumbs from '../../components/Breadcrumbs';

export const metadata = buildMetadata({
  title: 'Insights — Search & AI Visibility Guides',
  description:
    'Practical guides on technical SEO, algorithm recovery, AI visibility (GEO), local SEO, and search marketing strategy from the Gobiya team.',
  path: '/insights',
});

export default function InsightsPage() {
  return (
    <main id="top">
      {/* ══ 1. Breadcrumbs ══ */}
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Insights' }]} />

      {/* ══ 2. Subhero Dark Banner (Matching /seo-services-los-angeles) ══ */}
      <section className="mw-subhero">
        <div className="container">
          <h1 className="mw-subhero__title">Insights &amp; Search Guides</h1>
          <p className="mw-subhero__dek">
            Practical guides on technical SEO, algorithm recovery, AI visibility (GEO), local SEO, and search marketing strategy — written to actually answer the question, not just rank for it.
          </p>
        </div>
      </section>

      {/* ══ 3. All Articles Archive List ══ */}
      <section className="section" id="all-articles" style={{ paddingBlock: 'clamp(3.5rem, 6vw, 5rem)', background: '#FFFFFF' }}>
        <div className="container container--narrow">
          <h2 style={{ fontFamily: "'PT Serif', Georgia, serif", fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', color: '#0B1E36', marginBottom: '2rem' }}>
            All {INSIGHTS.length} Articles
          </h2>
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

      {/* ══ 4. Bottom Navy CTA Banner ══ */}
      <section className="mw-navy-banner">
        <div className="container">
          <h2 className="mw-navy-banner__title">
            Have a question these guides didn&apos;t answer?
          </h2>
          <a href="/free-site-scan" className="mw-navy-banner__btn">
            Schedule a Consultation
          </a>
        </div>
      </section>
    </main>
  );
}
