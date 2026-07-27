import Breadcrumbs from '../../components/Breadcrumbs';
import { buildMetadata } from '../../lib/meta';

export const metadata = buildMetadata({
  title: 'About Gobiya | Independent Los Angeles SEO Firm',
  description:
    'Founded in 2010 in Los Angeles, Gobiya is an independent Web AI & SEO consulting firm specializing in ranking small and medium-sized businesses.',
  path: '/about',
});

const ABOUT_TOPICS = [
  {
    title: 'Why Us',
    href: '/about',
    desc: 'Get started today. At Gobiya, there are never any long-term contracts. We earn your business every month through clear, verified search growth.',
  },
  {
    title: 'Our 4-Step Process',
    href: '/#process',
    desc: 'We have spent over a decade perfecting our documented framework: Assess, Prepare, Market, and Scale. Minimize risk and maximize price.',
  },
  {
    title: 'Meet Your Team',
    href: '/about/steve-martin',
    desc: 'Work directly with Steve Martin and our senior search strategists. No account-manager relays or overseas outsourcing.',
  },
  {
    title: 'Client Stories & Closed Transactions',
    href: '/work',
    desc: 'Real growth numbers and verified Search Console lead increases from active clients across Southern California.',
  },
  {
    title: 'Confidentiality & Security',
    href: '/terms#privacy',
    desc: 'Data protection and client confidentiality are paramount to a successful partnership. We release data in measured stages.',
  },
];

export default function AboutPage() {
  return (
    <main id="top">
      {/* ══ 1. Breadcrumb Bar ══ */}
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'About' }]} />

      {/* ══ 2. Subhero Dark Banner ══ */}
      <section className="mw-subhero">
        <div className="container">
          <h1 className="mw-subhero__title">About Gobiya</h1>
          <p className="mw-subhero__dek">
            Fourteen years of technical search engine optimization, algorithm recovery, and B2B pipeline engineering — built for small and medium-sized businesses.
          </p>
        </div>
      </section>

      {/* ══ 3. Hierarchical Pillar Grid (Sidebar + Sub-Clusters) ══ */}
      <div className="container">
        <div className="mw-pillar-grid">
          {/* Left Sidebar */}
          <aside className="mw-sidebar">
            <div className="mw-sidebar__header">About Topics</div>
            <nav className="mw-sidebar__nav">
              {ABOUT_TOPICS.map((topic, idx) => (
                <a
                  key={topic.title}
                  href={`#topic-${idx}`}
                  className={`mw-sidebar__link ${idx === 0 ? 'is-active' : ''}`}
                >
                  {topic.title}
                </a>
              ))}
            </nav>
          </aside>

          {/* Right Content Area (Sub-Clusters) */}
          <div className="mw-cluster-list">
            {ABOUT_TOPICS.map((topic, idx) => (
              <div key={topic.title} id={`topic-${idx}`} className="mw-cluster-block">
                <h2 className="mw-cluster-block__title">
                  <a href={topic.href}>{topic.title}</a>
                </h2>
                <p className="mw-cluster-block__desc">
                  {topic.desc}
                </p>
                <div style={{ marginTop: '1rem' }}>
                  <a href={topic.href} className="mw-story-card__btn" style={{ padding: '0.625rem 1.25rem' }}>
                    Learn More &rarr;
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
            Ready to work directly with the team doing the work?
          </h2>
          <a href="/free-site-scan" className="mw-navy-banner__btn">
            Schedule a Consultation
          </a>
        </div>
      </section>
    </main>
  );
}
