import { INSIGHTS } from '../../lib/insights';
import { buildMetadata } from '../../lib/meta';
import Breadcrumbs from '../../components/Breadcrumbs';
import InsightsArchive from '../../components/InsightsArchive';

export const metadata = buildMetadata({
  title: 'Insights — Search & AI Visibility Guides',
  description:
    'Practical guides on technical SEO, algorithm recovery, AI visibility (GEO), local SEO, and search marketing strategy from the Gobiya team.',
  path: '/insights',
});

// The array is in the order articles were written, which is close to but not
// actually date order — so a new entry appended to the end rendered last.
// Sorting here keeps the archive newest-first no matter where an entry lands.
const ARCHIVE = [...INSIGHTS].sort((a, b) => b.date.localeCompare(a.date));

export default function InsightsPage() {
  return (
    <main id="top">
      {/* ══ 1. Breadcrumbs ══ */}
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Insights' }]} />

      {/* ══ 2. Subhero Dark Banner (Matching /services/seo) ══ */}
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
          <InsightsArchive articles={ARCHIVE} />
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
