import Image from 'next/image';
import Breadcrumbs from '../../../components/Breadcrumbs';
import CollapsibleSidebar from '../../../components/CollapsibleSidebar';
import { buildMetadata } from '../../../lib/meta';

export const metadata = buildMetadata({
  title: 'Steve Martin — Founder & Head of Strategy | Gobiya',
  description:
    'Meet Steve Martin, founder of Gobiya. Over 30 years of web design, technical development, and SEO experience in Los Angeles.',
  path: '/about/steve-martin',
});

const STEVE_TOPICS = [
  {
    id: 'background',
    title: 'Background & 30-Year Web Career',
    desc: 'Steve started building commercial websites in 1996, watching the internet evolve from early static HTML pages to modern AI-driven search engines. Over three decades, he has designed, developed, and managed hundreds of custom websites and search strategies.',
  },
  {
    id: 'philosophy',
    title: 'No-Nonsense Growth Philosophy',
    desc: 'Marketing agencies often hide behind vanity metrics like impressions and click-through rates. Steve’s approach is straightforward: measure success by bottom-line business growth, phone calls, and revenue generated for clients.',
  },
  {
    id: 'direct-accountability',
    title: 'Direct Client Communication',
    desc: 'At Gobiya, clients speak directly to the person doing the work. There are no junior account managers or layers of relay communication between strategy and execution.',
  },
];

export default function SteveMartinPage() {
  return (
    <main id="top">
      {/* ══ 1. Clean Breadcrumb Bar ══ */}
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about' },
        { label: 'Steve Martin' },
      ]} />

      {/* ══ 2. Subhero Dark Banner ══ */}
      <section className="mw-subhero">
        <div className="container">
          <h1 className="mw-subhero__title">Steve Martin — Founder &amp; Head of Strategy</h1>
          <p className="mw-subhero__dek">
            Hands-on web design experience since 1996. Over 30 years of watching search and the web evolve, adapting every time. A career spent in web design, development, and search engineering.
          </p>
        </div>
      </section>

      {/* ══ 3. Pillar Hierarchical Grid (Left Sidebar + Right Column) ══ */}
      <div className="container">
        <div className="mw-pillar-grid">
          {/* Left Sidebar Index */}
          <CollapsibleSidebar headerText="Steve Martin">
            {STEVE_TOPICS.map((t, idx) => (
              <a
                key={t.id}
                href={`#${t.id}`}
                className={`mw-sidebar__link ${idx === 0 ? 'is-active' : ''}`}
              >
                {t.title}
              </a>
            ))}
          </CollapsibleSidebar>

          {/* Right Content Area */}
          <div className="mw-cluster-list">
            {/* Bio Card Header */}
            <div id="biography" className="mw-cluster-block" style={{ background: '#FFFFFF', padding: '1.75rem', border: '1px solid #E2E8F0', borderRadius: '4px' }}>
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                <Image
                  src="/assets/img/sm.jpg"
                  alt="Steve Martin"
                  width={100}
                  height={100}
                  style={{ borderRadius: '4px', objectFit: 'cover' }}
                />
                <div>
                  <h2 style={{ fontFamily: 'PT Serif, Georgia, serif', fontSize: '1.5rem', color: '#0B1E36', margin: 0 }}>
                    Steve Martin
                  </h2>
                  <p style={{ fontSize: '0.9375rem', color: '#8B263E', fontWeight: '600', margin: '0.25rem 0 0 0' }}>
                    Founder &amp; Principal Search Strategist
                  </p>
                  <p style={{ fontSize: '0.875rem', color: '#64748B', margin: '0.25rem 0 0 0' }}>
                    Gobiya LLC · Los Angeles, California
                  </p>
                </div>
              </div>
              <p className="mw-cluster-block__desc">
                {STEVE_TOPICS[0].desc} Steve works directly with every client rather than handing engagements off to an account manager or junior team.
              </p>
            </div>

            {/* Sub-Clusters */}
            {STEVE_TOPICS.slice(1).map((t) => (
              <div key={t.id} id={t.id} className="mw-cluster-block">
                <h2 className="mw-cluster-block__title">
                  <a href="/#process">{t.title}</a>
                </h2>
                <p className="mw-cluster-block__desc">
                  {t.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ 4. Bottom Navy CTA Banner ══ */}
      <section className="mw-navy-banner">
        <div className="container">
          <h2 className="mw-navy-banner__title">
            Work directly with the person doing the work
          </h2>
          <a href="/free-site-scan" className="mw-navy-banner__btn">
            Schedule a Consultation
          </a>
        </div>
      </section>
    </main>
  );
}
