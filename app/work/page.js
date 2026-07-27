import Breadcrumbs from '../../components/Breadcrumbs';
import { CASE_STUDIES } from '../../lib/work';
import { buildMetadata } from '../../lib/meta';

export const metadata = buildMetadata({
  title: 'Our Work | Los Angeles SEO Client Results & Case Studies',
  description:
    'See real case studies and search growth results from our Los Angeles SEO agency. Learn how we help California businesses grow online.',
  path: '/work',
});

export default function WorkPage() {
  return (
    <main id="top">
      {/* ══ 1. Clean Breadcrumb Bar ══ */}
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Work' }]} />

      {/* ══ 2. Subhero Dark Banner ══ */}
      <section className="mw-subhero">
        <div className="container">
          <h1 className="mw-subhero__title">Client Case Studies &amp; Search Wins</h1>
          <p className="mw-subhero__dek">
            A sample of engagements across local service, healthcare, property management, and B2B clients — each one measured against the same standard: verified organic traffic, rankings, and lead growth.
          </p>
        </div>
      </section>

      {/* ══ 3. Pillar Hierarchical Grid (Left Sidebar + Right Column) ══ */}
      <div className="container">
        <div className="mw-pillar-grid">
          {/* Left Sidebar Index */}
          <aside className="mw-sidebar">
            <div className="mw-sidebar__header">Case Study Index</div>
            <nav className="mw-sidebar__nav">
              {CASE_STUDIES.map((c, idx) => (
                <a
                  key={c.client}
                  href={`#case-${idx}`}
                  className={`mw-sidebar__link ${idx === 0 ? 'is-active' : ''}`}
                >
                  {c.client}
                </a>
              ))}
            </nav>
          </aside>

          {/* Right Content Area (Case Study Sub-Clusters) */}
          <div className="mw-cluster-list">
            {CASE_STUDIES.map((c, idx) => (
              <div key={c.client} id={`case-${idx}`} className="mw-cluster-block">
                <div style={{ fontSize: '0.8125rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#8B263E', marginBottom: '0.35rem' }}>
                  {c.tag}
                </div>
                <h2 className="mw-cluster-block__title">
                  {c.study ? <a href={`/work/${c.slug}`}>{c.client}</a> : c.client}
                </h2>
                <p className="mw-cluster-block__desc" style={{ color: '#0B1E36', fontWeight: '600', marginBottom: '0.5rem' }}>
                  {c.result}
                </p>
                <p className="mw-cluster-block__desc">
                  {c.desc}
                </p>
                <div style={{ marginTop: '1rem' }}>
                  {c.study ? (
                    <a href={`/work/${c.slug}`} className="mw-story-card__btn" style={{ padding: '0.625rem 1.25rem' }}>
                      Read Case Study &rarr;
                    </a>
                  ) : (
                    <a href={c.outcomeHref} className="mw-story-card__btn" style={{ padding: '0.625rem 1.25rem' }}>
                      See {c.tag} &rarr;
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ 4. Bottom Navy CTA Banner ══ */}
      <section className="mw-navy-banner">
        <div className="container">
          <h2 className="mw-navy-banner__title">
            Become the next verified result on this page
          </h2>
          <a href="/free-site-scan" className="mw-navy-banner__btn">
            Schedule a Consultation
          </a>
        </div>
      </section>
    </main>
  );
}
