'use client';

import { useState } from 'react';

export default function DomainLookupTool() {
  const [domain, setDomain] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('Overview'); // 'Overview', 'Dates', 'Nameservers', 'Raw Data'

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!domain) return;

    setLoading(true);
    setError(null);
    setData(null);
    setActiveTab('Overview');

    try {
      const res = await fetch(`/api/domain-lookup?domain=${encodeURIComponent(domain.trim())}`);
      const json = await res.json();
      
      if (!res.ok) throw new Error(json.details || json.error || 'Failed to fetch domain intelligence');

      setData(json.WhoisRecord || json);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main id="top">
      <section className="page-hero section">
        <div className="container container--narrow">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>Free Infrastructure Utility</p>
          <h1 className="statement" data-split>WHOIS Domain Name Lookup & DNS Intelligence</h1>
          <p className="lede" data-reveal>Perform a deep-dive WHOIS search to instantly uncover a domain's availability, registration dates, registrar details, and DNS nameserver configurations.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container container--narrow">
          <div className="form-panel" style={{ backgroundColor: 'var(--panel)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)' }}>
            <form onSubmit={handleSubmit} className="form">
              <div className="form-group">
                <label htmlFor="domain" className="form-label" style={{ marginBottom: '0.75rem', display: 'block', fontWeight: 500 }}>Enter a Domain Name (e.g., example.com)</label>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <input
                    type="text"
                    id="domain"
                    className="form-input"
                    placeholder="google.com"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    required
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    style={{ flex: 1, padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'transparent', color: 'var(--text)' }}
                  />
                  <button type="submit" className="btn" disabled={loading} style={{ padding: '0.75rem 1.5rem', whiteSpace: 'nowrap' }}>
                    {loading ? 'Analyzing Domain...' : 'Run WHOIS Check'}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {error && (
            <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: '#fee2e2', color: '#991b1b', borderRadius: '0.5rem', border: '1px solid #f87171' }}>
              <strong>Error:</strong> {error}
            </div>
          )}

          {data && (() => {
            const isAvailable = data.dataError === 'MISSING_WHOIS_DATA';
            return (
            <div style={{ marginTop: '3rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.5rem', margin: 0 }}>Registration Results for: {data.domainName || domain}</h3>
                {isAvailable ? (
                  <span className="eyebrow" style={{ color: 'var(--main)' }}>Domain Available</span>
                ) : (
                  <span className="eyebrow" style={{ color: 'var(--dark)' }}>Domain Registered</span>
                )}
              </div>

              {!isAvailable ? (
                <>
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                    {['Overview', 'Dates', 'Nameservers', 'Raw Data'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{
                          padding: '0.5rem 1.25rem',
                          borderRadius: '2rem',
                          border: `1px solid ${activeTab === tab ? 'var(--main)' : 'var(--border)'}`,
                          background: activeTab === tab ? 'var(--main)' : 'transparent',
                          color: activeTab === tab ? 'var(--light)' : 'var(--text)',
                          cursor: 'pointer',
                          fontWeight: 500,
                          transition: 'all 0.2s ease',
                          outline: 'none'
                        }}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  <div style={{ display: 'grid', gap: '1rem' }}>
                    
                    {activeTab === 'Overview' && (
                      <div className="capability-card" style={{ padding: '2rem', margin: 0 }}>
                        <h4 style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Current Registrar</h4>
                        <p style={{ margin: 0, fontWeight: 500, fontSize: '1.125rem' }}>{data.registrarName || 'N/A'}</p>
                        {data.contactEmail && (
                          <div style={{ marginTop: '1rem' }}>
                            <h4 style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Abuse Contact</h4>
                            <p style={{ margin: 0, fontWeight: 500 }}>{data.contactEmail}</p>
                          </div>
                        )}
                      </div>
                    )}

                    {activeTab === 'Dates' && (
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div className="capability-card" style={{ padding: '1.5rem', margin: 0 }}>
                          <h4 style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Registration Date</h4>
                          <p style={{ margin: 0, fontWeight: 500 }}>{data.createdDateNormalized ? new Date(data.createdDateNormalized).toLocaleDateString() : 'N/A'}</p>
                        </div>
                        <div className="capability-card" style={{ padding: '1.5rem', margin: 0 }}>
                          <h4 style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Expiration Date</h4>
                          <p style={{ margin: 0, fontWeight: 500 }}>{data.expiresDateNormalized ? new Date(data.expiresDateNormalized).toLocaleDateString() : 'N/A'}</p>
                        </div>
                      </div>
                    )}

                    {activeTab === 'Nameservers' && (
                      <div className="capability-card" style={{ padding: '1.5rem', margin: 0 }}>
                        <h4 style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>DNS Nameservers</h4>
                        {data.nameServers?.hostNames && data.nameServers.hostNames.length > 0 ? (
                          <ul style={{ margin: 0, paddingLeft: '1.25rem', lineHeight: '1.75' }}>
                            {data.nameServers.hostNames.map((ns, i) => (
                              <li key={i}>{ns}</li>
                            ))}
                          </ul>
                        ) : (
                          <p style={{ margin: 0 }}>No nameservers found for this domain.</p>
                        )}
                      </div>
                    )}

                    {activeTab === 'Raw Data' && (
                      <div className="capability-card" style={{ padding: '1.5rem', margin: 0, overflowX: 'auto' }}>
                        <h4 style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '1rem' }}>Raw WHOIS JSON Payload</h4>
                        <pre style={{ fontSize: '0.75rem', margin: 0 }}>{JSON.stringify(data, null, 2)}</pre>
                      </div>
                    )}

                  </div>
                </>
              ) : (
                <div className="capability-card" style={{ padding: '2rem', textAlign: 'center' }}>
                  <p style={{ fontSize: '1.125rem', marginBottom: '1rem', color: 'var(--dark)' }}>Good news! <strong>{domain}</strong> appears to be an available domain.</p>
                  <p style={{ color: 'var(--text-muted)' }}>We couldn't find an active WHOIS registration record.</p>
                </div>
              )}
            </div>
            );
          })()}
        </div>
      </section>
    </main>
  );
}
