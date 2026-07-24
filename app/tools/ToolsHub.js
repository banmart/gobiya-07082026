'use client';
import { useState } from 'react';

const TOOLS = [
  {
    id: 'whois',
    title: 'WHOIS Domain Lookup',
    description: 'Check if a domain is available, and see who registered it, when, and which servers manage it.',
    status: 'Active',
    category: 'Domain Research',
    href: '/tools/domain-lookup'
  },
  {
    id: 'dns',
    title: 'DNS Lookup',
    description: 'Look up a domain’s technical records instantly to spot setup problems or errors.',
    status: 'Active',
    category: 'Network',
    href: '/tools/dns-lookup'
  },
  {
    id: 'ip-geo',
    title: 'IP Geolocation',
    description: 'Find out roughly where an IP address is located and which internet provider it belongs to.',
    status: 'Active',
    category: 'Network',
    href: '/tools/ip-geolocation'
  },
  {
    id: 'domain-rep',
    title: 'Domain Reputation Check',
    description: 'Check a domain’s trust score and history to see if it’s ever been flagged or penalized by search engines.',
    status: 'Active',
    category: 'Security',
    href: '/tools/domain-reputation'
  },
  {
    id: 'web-cat',
    title: 'Website Categorization',
    description: 'Automatically sort a website into standard industry categories — useful for comparing it to competitors.',
    status: 'Active',
    category: 'Domain Research',
    href: '/tools/website-categorization'
  },
  {
    id: 'ssl',
    title: 'SSL Certificate Checker',
    description: 'Check whether a website’s security certificate is valid, who issued it, and when it expires.',
    status: 'Active',
    category: 'Security',
    href: '/tools/ssl-certificates'
  },
  {
    id: 'threat',
    title: 'Threat Intelligence Check',
    description: 'Check a domain or IP address against known threat lists to spot malware, phishing, or other risks.',
    status: 'Active',
    category: 'Security',
    href: '/tools/threat-intelligence'
  },
  {
    id: 'email',
    title: 'Email Verification',
    description: 'Check whether an email address is real and can actually receive mail, to help protect your sender reputation.',
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
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>Free Tools</p>
          <h1 className="statement" data-split>Free SEO & Domain Tools</h1>
          <p className="lede" data-reveal>Free tools anyone can use to check a domain&apos;s details, security, and reputation — the same kind of research we do ourselves before taking on a new client.</p>
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
          <p className="eyebrow eyebrow--center eyebrow--light" data-reveal><span className="eyebrow__dot"></span>Want more?</p>
          <h2 className="statement" data-split style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', marginBottom: '1rem' }}>Want a full check of your whole site, not just one piece?</h2>
          <p className="lede" data-reveal style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>Our team checks your whole site — how well it loads, whether Google and AI tools can read it, and where you&apos;re missing out.</p>
          <a href="/onboarding?goal=ai-visibility" className="btn btn--solid">Get a free full site check</a>
        </div>
      </section>
    </main>
  );
}
