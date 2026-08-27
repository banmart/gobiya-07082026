import { INSIGHTS } from '../../lib/insights';
import { buildMetadata } from '../../lib/meta';
import SubHero from '../../components/SubHero';
import ClientLogos from '../../components/ClientLogos';
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
      {/* ══ 2. Hero ══
             Carries the page's h1. It used to be a background band with no
             copy in it, which left /insights with no h1 at all. */}
      <SubHero
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Insights' }]}
        eyebrow="Knowledge Base · Search & AI Visibility"
        title="Plain-English Answers on Search and AI Visibility"
        excerpt={`${ARCHIVE.length} Guides for Los Angeles Business Owners`}
        dek="Practical guides on technical SEO, algorithm recovery, AI visibility (GEO), local SEO, and search marketing strategy — written by the people doing the work."
        primary={{ text: 'Get Your Analysis', href: '/free-site-scan' }}
        secondary={{ text: 'Contact Us', href: '/contact' }}
      />

      {/* ══ 3. All Articles Archive List ══ */}
      <section className="section" id="all-articles" style={{ paddingBlock: 'clamp(3.5rem, 6vw, 5rem)', background: 'var(--surface-raised)' }}>
        <div className="container container--narrow">
          <InsightsArchive articles={ARCHIVE} />
        </div>
      </section>

      {/* ══ 4. Client Logo Strip ══ */}
      <ClientLogos />

      {/* ══ 5. Bottom Navy CTA Banner ══ */}
      <section className="mw-navy-banner">
        <div className="container">
          <h2 className="mw-navy-banner__title">
            Have a question these guides didn&apos;t answer?
          </h2>
          <a href="?onboarding=true" className="mw-navy-banner__btn">
            Schedule a Consultation
          </a>
        </div>
      </section>
    </main>
  );
}
