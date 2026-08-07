import Breadcrumbs from '../../components/Breadcrumbs';
import SubHero from '../../components/SubHero';
import PlatformStrip from '../../components/PlatformStrip';
import ClientLogos from '../../components/ClientLogos';
import CollapsibleSidebar from '../../components/CollapsibleSidebar';
import { CONSULTING_ITEMS } from '../../lib/consultingIndex';
import { heroImage } from '../../lib/heroImages';
import { buildMetadata } from '../../lib/meta';

export const metadata = buildMetadata({
  title: 'Los Angeles SEO & Growth Services | Built Around Your Next Win',
  description:
    'Los Angeles SEO, GEO, content, PPC, CRO, and web design services — all built around one goal: the growth outcome you actually want, not just more tactics.',
  path: '/seo-services',
});

export default function ServicesPage() {
  return (
    <main id="top">
      {/* ══ 2. SubHero Banner ══ */}
      <SubHero
        image={heroImage(1)}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Services' }]}
        eyebrow="Affordable Solutions, Exceptional Service"
        title="Every Outcome You've Been Chasing, Under One Roof"
        excerpt="Pick the win you need. We'll show you exactly how we get there."
        primary={{ text: 'Get Your Free Site Scan', href: '/free-site-scan' }}
        secondary={{ text: 'Call 323-744-1338', href: 'tel:+13237441338' }}
      />

      {/* ══ Platform Strip — directly under hero ══ */}
      <PlatformStrip />

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

      {/* ══ 5. Bottom Navy CTA Banner ══ */}
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
