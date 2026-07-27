import Breadcrumbs from '../../components/Breadcrumbs';
import { buildMetadata } from '../../lib/meta';

export const metadata = buildMetadata({
  title: 'Los Angeles AI Visibility & Search Services | Gobiya',
  description:
    'Get your brand cited in ChatGPT, Perplexity, and Google AI Overviews with our Los Angeles AI visibility and search optimization services.',
  path: '/ai-visibility',
});

const AI_TOPICS = [
  {
    id: 'what-is-geo',
    title: 'Generative Engine Optimization (GEO)',
    desc: 'Getting your business built so an AI tool trusts it enough to recommend it. More buyers now ask AI tools directly before clicking a search link.',
  },
  {
    id: 'platforms',
    title: 'ChatGPT, Perplexity & AI Overviews Presence',
    desc: 'Every major AI tool reads your site differently. We format your entity schema and authority signals so you show up as the primary recommendation.',
  },
  {
    id: 'how-it-works',
    title: 'The Gobiya AI Visibility System',
    desc: 'We clean up hidden code errors, structure structured data schemas, and publish authoritative content specifically indexed by AI web crawlers.',
  },
  {
    id: 'audit-scan',
    title: 'AI Visibility & Entity Analysis',
    desc: 'Send us your domain and we will evaluate how ChatGPT, Perplexity, and Google AI Overviews perceive your business.',
  },
];

export default function AIVisibilityPage() {
  return (
    <main id="top">
      {/* ══ 1. Clean Breadcrumb Bar ══ */}
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'AI Search & Visibility' }]} />

      {/* ══ 2. Subhero Dark Banner ══ */}
      <section className="mw-subhero">
        <div className="container">
          <h1 className="mw-subhero__title">AI Search &amp; Visibility</h1>
          <p className="mw-subhero__dek">
            More buyers now get answers straight from AI tools — ChatGPT, Perplexity, Google&apos;s AI Overviews — before clicking a link. We ensure your business is cited and recommended.
          </p>
        </div>
      </section>

      {/* ══ 3. Pillar Hierarchical Grid (Sidebar + Sub-Clusters) ══ */}
      <div className="container">
        <div className="mw-pillar-grid">
          {/* Left Sidebar */}
          <aside className="mw-sidebar">
            <div className="mw-sidebar__header">AI Topics</div>
            <nav className="mw-sidebar__nav">
              {AI_TOPICS.map((topic, idx) => (
                <a
                  key={topic.id}
                  href={`#${topic.id}`}
                  className={`mw-sidebar__link ${idx === 0 ? 'is-active' : ''}`}
                >
                  {topic.title}
                </a>
              ))}
            </nav>
          </aside>

          {/* Right Content Area */}
          <div className="mw-cluster-list">
            {AI_TOPICS.map((topic) => (
              <div key={topic.id} id={topic.id} className="mw-cluster-block">
                <h2 className="mw-cluster-block__title">
                  <a href="/free-site-scan">{topic.title}</a>
                </h2>
                <p className="mw-cluster-block__desc">
                  {topic.desc}
                </p>
                <div style={{ marginTop: '1rem' }}>
                  <a href="/free-site-scan" className="mw-story-card__btn" style={{ padding: '0.625rem 1.25rem' }}>
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
            Want to see how ChatGPT currently describes your business?
          </h2>
          <a href="/free-site-scan" className="mw-navy-banner__btn">
            Schedule a Consultation
          </a>
        </div>
      </section>
    </main>
  );
}
