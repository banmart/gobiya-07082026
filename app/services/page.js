import Breadcrumbs from '../../components/Breadcrumbs';
import CollapsibleSidebar from '../../components/CollapsibleSidebar';
import { CONSULTING_ITEMS } from '../../lib/consultingIndex';
import { buildMetadata } from '../../lib/meta';

export const metadata = buildMetadata({
  title: 'SEO & Growth Services for Business',
  description:
    'Custom SEO, GEO content, Google Ads management, link building, and CRO services for Los Angeles businesses.',
  path: '/services',
});

export default function ServicesPage() {
  return (
    <main id="top">
      {/* ══ 1. Breadcrumb Bar ══ */}
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Services' }]} />

      {/* ══ 2. Subhero Dark Banner ══ */}
      <section className="mw-subhero">
        <div className="container">
          <div className="mw-subhero__content">
            <span className="mw-subhero__eyebrow">OUR CAPABILITIES</span>
            <h1 className="mw-subhero__title">Services Index</h1>
            <p className="mw-subhero__desc">
              Every service we offer is built around one clear goal: helping your business get found, trusted, and chosen.
            </p>
          </div>
        </div>
      </section>

      {/* ══ 3. Hierarchical Pillar Grid (Sidebar + Sub-Clusters) ══ */}
      <div className="container">
        <div className="mw-pillar-grid">
          {/* Left Sidebar */}
          <CollapsibleSidebar headerText="Services Index">
            {CONSULTING_ITEMS.map((s, idx) => (
              <a
                key={s.slug}
                href={`#${s.slug}`}
                className={`mw-sidebar__link ${idx === 0 ? 'is-active' : ''}`}
              >
                {s.title}
              </a>
            ))}
          </CollapsibleSidebar>

          {/* Right Content Area (Sub-Clusters) */}
          <div className="mw-cluster-list">
            {CONSULTING_ITEMS.map((s) => (
              <div key={s.slug} id={s.slug} className="mw-cluster-block">
                <h2 className="mw-cluster-block__title">
                  <a href={s.href}>{s.title}</a>
                </h2>
                <p className="mw-cluster-block__desc">
                  {s.desc}
                </p>
                <div style={{ marginTop: '1rem' }}>
                  <a href={s.href} className="mw-story-card__btn" style={{ padding: '0.625rem 1.25rem' }}>
                    Explore {s.title} &rarr;
                  </a>
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
            Not sure which service your business needs?
          </h2>
          <a href="/free-site-scan" className="mw-navy-banner__btn">
            Schedule a Consultation
          </a>
        </div>
      </section>
    </main>
  );
}
