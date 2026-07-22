'use client';
import { useState } from 'react';

const TOOLS = [
  {
    id: 'whois',
    title: 'WHOIS Domain Lookup',
    description: 'Check domain availability and extract raw WHOIS registration data (registrar, creation dates, nameservers) in real-time.',
    status: 'Active',
    category: 'Domain Research',
    href: '/tools/domain-lookup'
  },
  {
    id: 'dns',
    title: 'DNS Lookup API',
    description: 'Query global DNS records (A, MX, TXT, CNAME) instantly to diagnose routing issues and misconfigurations.',
    status: 'Active',
    category: 'Network',
    href: '/tools/dns-lookup'
  },
  {
    id: 'ip-geo',
    title: 'IP Geolocation API',
    description: 'Map IP addresses to precise geographical locations, ASNs, and ISPs for traffic analysis and targeting.',
    status: 'Active',
    category: 'Network',
    href: '/tools/ip-geolocation'
  },
  {
    id: 'domain-rep',
    title: 'Domain Reputation API',
    description: 'Analyze a domain\'s trust score and historical reputation to identify potential search engine penalties or flags.',
    status: 'Active',
    category: 'Security',
    href: '/tools/domain-reputation'
  },
  {
    id: 'web-cat',
    title: 'Website Categorization API',
    description: 'Automatically classify domain content into IAB standard categories for competitive mapping and clustering.',
    status: 'Active',
    category: 'Domain Research',
    href: '/tools/website-categorization'
  },
  {
    id: 'ssl',
    title: 'SSL Certificates API',
    description: 'Verify SSL certificate validity, issuer chains, and expiration dates across extensive server infrastructures.',
    status: 'Active',
    category: 'Security',
    href: '/tools/ssl-certificates'
  },
  {
    id: 'threat',
    title: 'Threat Intelligence API',
    description: 'Cross-reference domains and IPs against global threat feeds to detect malware, phishing, and botnets.',
    status: 'Active',
    category: 'Security',
    href: '/tools/threat-intelligence'
  },
  {
    id: 'email',
    title: 'Email Verification API',
    description: 'Verify MX records and inbox existence to ensure high deliverability and protect sender reputation scores.',
    status: 'Active',
    category: 'Domain Research',
    href: '/tools/email-verification'
  }
];

const CATEGORIES = ['All', 'Domain Research', 'Network', 'Security'];

export default function ToolsHub() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredTools = activeFilter === 'All' 
    ? TOOLS 
    : TOOLS.filter(t => t.category === activeFilter);

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
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                style={{
                  padding: '0.5rem 1.25rem',
                  borderRadius: '2rem',
                  border: `1px solid ${activeFilter === cat ? 'var(--main)' : 'var(--border)'}`,
                  background: activeFilter === cat ? 'var(--main)' : 'transparent',
                  color: activeFilter === cat ? 'var(--light)' : 'var(--text)',
                  cursor: 'pointer',
                  fontWeight: 500,
                  transition: 'all 0.2s ease',
                  outline: 'none'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="capability-grid">
            {filteredTools.map(tool => (
              <div 
                key={tool.id}
                className="capability-card" 
                style={{ opacity: tool.status === 'Coming Soon' ? 0.7 : 1 }}
              >
                <span 
                  className="capability-card__tag" 
                  style={{ 
                    color: tool.status === 'Coming Soon' ? 'var(--text-muted)' : 'inherit',
                    borderColor: tool.status === 'Coming Soon' ? 'var(--border)' : 'inherit'
                  }}
                >
                  {tool.status}
                </span>
                <h3 
                  className="capability-card__title" 
                  style={{ color: tool.status === 'Coming Soon' ? 'var(--text-muted)' : 'inherit' }}
                >
                  {tool.href ? <a href={tool.href}>{tool.title}</a> : tool.title}
                </h3>
                <p className="capability-card__desc">{tool.description}</p>
                
                {tool.href && (
                  <a href={tool.href} className="link-arrow" style={{ marginTop: '1.25rem' }}>
                    Use tool<svg viewBox="0 0 16 16" width="14" height="14"><path d="M2 8h11M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
                  </a>
                )}
              </div>
            ))}
          </div>
          
          {filteredTools.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
              No tools found in this category.
            </div>
          )}

        </div>
      </section>

      {/* Conversion Bridge */}
      <section className="section section--dark" style={{ padding: '4rem 0' }}>
        <div className="container container--narrow" style={{ textAlign: 'center' }}>
          <p className="eyebrow eyebrow--center eyebrow--light" data-reveal><span className="eyebrow__dot"></span>Take Action</p>
          <h2 className="statement" data-split style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', marginBottom: '1rem' }}>Need an automated technical & AI visibility audit?</h2>
          <p className="lede" data-reveal style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>Our engineering team audits site rendering, structured data schema, and AI citation potential end-to-end.</p>
          <a href="/onboarding?goal=ai-visibility" className="btn btn--solid">Get a free technical & AI audit</a>
        </div>
      </section>
    </main>
  );
}
