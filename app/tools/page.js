import { buildMetadata } from '../../lib/meta';

export const metadata = buildMetadata({
  title: 'Intelligence & Research Tools Suite',
  description: 'Enterprise-grade domain intelligence, DNS, and IP research utilities.',
  path: '/tools',
});

export default function ToolsPage() {
  return (
    <main id="top">
      <section className="page-hero section">
        <div className="container container--narrow">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>Internal Infrastructure</p>
          <h1 className="statement" data-split>Intelligence & Research Suite</h1>
          <p className="lede" data-reveal>Powered by our enterprise partnerships, these tools allow us to conduct deep technical investigations, from raw WHOIS records to comprehensive domain reputation mapping.</p>
        </div>
      </section>

      <section className="section" id="tools" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="capability-grid">
            
            {/* Active Tool */}
            <div className="capability-card" data-reveal>
              <a href="/tools/domain-lookup" className="capability-card__tag">Active</a>
              <h3 className="capability-card__title"><a href="/tools/domain-lookup">WHOIS Domain Lookup</a></h3>
              <p className="capability-card__desc">Check domain availability and extract raw WHOIS registration data (registrar, creation dates, nameservers) in real-time.</p>
              <a href="/tools/domain-lookup" className="link-arrow" style={{ marginTop: '1.25rem' }}>Use tool<svg viewBox="0 0 16 16" width="14" height="14"><path d="M2 8h11M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg></a>
            </div>

            {/* Coming Soon Tools */}
            <div className="capability-card" data-reveal style={{ opacity: 0.7 }}>
              <span className="capability-card__tag" style={{ color: 'var(--text-muted)', borderColor: 'var(--border)' }}>Coming Soon</span>
              <h3 className="capability-card__title" style={{ color: 'var(--text-muted)' }}>DNS Lookup API</h3>
              <p className="capability-card__desc">Query global DNS records (A, MX, TXT, CNAME) instantly to diagnose routing issues and misconfigurations.</p>
            </div>

            <div className="capability-card" data-reveal style={{ opacity: 0.7 }}>
              <span className="capability-card__tag" style={{ color: 'var(--text-muted)', borderColor: 'var(--border)' }}>Coming Soon</span>
              <h3 className="capability-card__title" style={{ color: 'var(--text-muted)' }}>IP Geolocation API</h3>
              <p className="capability-card__desc">Map IP addresses to precise geographical locations, ASNs, and ISPs for traffic analysis and targeting.</p>
            </div>

            <div className="capability-card" data-reveal style={{ opacity: 0.7 }}>
              <span className="capability-card__tag" style={{ color: 'var(--text-muted)', borderColor: 'var(--border)' }}>Coming Soon</span>
              <h3 className="capability-card__title" style={{ color: 'var(--text-muted)' }}>Domain Reputation API</h3>
              <p className="capability-card__desc">Analyze a domain's trust score and historical reputation to identify potential search engine penalties or flags.</p>
            </div>

            <div className="capability-card" data-reveal style={{ opacity: 0.7 }}>
              <span className="capability-card__tag" style={{ color: 'var(--text-muted)', borderColor: 'var(--border)' }}>Coming Soon</span>
              <h3 className="capability-card__title" style={{ color: 'var(--text-muted)' }}>Website Categorization API</h3>
              <p className="capability-card__desc">Automatically classify domain content into IAB standard categories for competitive mapping and clustering.</p>
            </div>

            <div className="capability-card" data-reveal style={{ opacity: 0.7 }}>
              <span className="capability-card__tag" style={{ color: 'var(--text-muted)', borderColor: 'var(--border)' }}>Coming Soon</span>
              <h3 className="capability-card__title" style={{ color: 'var(--text-muted)' }}>SSL Certificates API</h3>
              <p className="capability-card__desc">Verify SSL certificate validity, issuer chains, and expiration dates across extensive server infrastructures.</p>
            </div>

            <div className="capability-card" data-reveal style={{ opacity: 0.7 }}>
              <span className="capability-card__tag" style={{ color: 'var(--text-muted)', borderColor: 'var(--border)' }}>Coming Soon</span>
              <h3 className="capability-card__title" style={{ color: 'var(--text-muted)' }}>Threat Intelligence API</h3>
              <p className="capability-card__desc">Cross-reference domains and IPs against global threat feeds to detect malware, phishing, and botnets.</p>
            </div>

            <div className="capability-card" data-reveal style={{ opacity: 0.7 }}>
              <span className="capability-card__tag" style={{ color: 'var(--text-muted)', borderColor: 'var(--border)' }}>Coming Soon</span>
              <h3 className="capability-card__title" style={{ color: 'var(--text-muted)' }}>Email Verification API</h3>
              <p className="capability-card__desc">Verify MX records and inbox existence to ensure high deliverability and protect sender reputation scores.</p>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
