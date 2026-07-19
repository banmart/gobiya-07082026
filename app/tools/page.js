import { buildMetadata } from '../../lib/meta';

export const metadata = buildMetadata({
  title: 'SEO Tools & Utilities',
  description: 'Free technical SEO and discoverability tools built by Gobiya.',
  path: '/tools',
});

export default function ToolsPage() {
  return (
    <main id="top">
      <section className="page-hero section">
        <div className="container container--narrow">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>Free Utilities</p>
          <h1 className="statement" data-split>SEO & Discoverability Tools</h1>
          <p className="lede" data-reveal>A collection of internal utilities we use to audit, verify, and diagnose search presence — made available for public use.</p>
        </div>
      </section>

      <section className="section" id="tools" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="capability-grid">
            <div className="capability-card" data-reveal>
              <a href="/tools/domain-lookup" className="capability-card__tag">Infrastructure</a>
              <h3 className="capability-card__title"><a href="/tools/domain-lookup">Domain Name Lookup</a></h3>
              <p className="capability-card__desc">Check domain availability and extract raw WHOIS registration data (registrar, creation dates, nameservers) in real-time.</p>
              <a href="/tools/domain-lookup" className="link-arrow" style={{ marginTop: '1.25rem' }}>Use tool<svg viewBox="0 0 16 16" width="14" height="14"><path d="M2 8h11M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg></a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
