'use client';

import { useState } from 'react';

export default function DomainLookupTool() {
  const [domain, setDomain] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!domain) return;

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await fetch(`/api/domain-lookup?domain=${encodeURIComponent(domain.trim())}`);
      const json = await res.json();
      
      if (!res.ok) throw new Error(json.error || 'Failed to fetch domain intelligence');

      setData(json);
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
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>Infrastructure Tool</p>
          <h1 className="statement" data-split>Domain Name Lookup</h1>
          <p className="lede" data-reveal>Check WHOIS registration data, nameservers, and availability in real-time.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container container--narrow">
          <div className="form-panel" style={{ backgroundColor: 'var(--panel)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)' }}>
            <form onSubmit={handleSubmit} className="form">
              <div className="form-group">
                <label htmlFor="domain" className="form-label" style={{ marginBottom: '0.75rem', display: 'block', fontWeight: 500 }}>Domain Name</label>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <input
                    type="text"
                    id="domain"
                    className="form-input"
                    placeholder="e.g., example.com"
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
                    {loading ? 'Looking up...' : 'Search'}
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

          {data && (
            <div style={{ marginTop: '3rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.5rem', margin: 0 }}>Results for {data.domain || domain}</h3>
                {data.available ? (
                  <span className="eyebrow" style={{ color: 'var(--main)' }}>Available</span>
                ) : (
                  <span className="eyebrow" style={{ color: 'var(--dark)' }}>Registered</span>
                )}
              </div>

              {!data.available ? (
                <div style={{ display: 'grid', gap: '1rem' }}>
                  <div className="capability-card" style={{ padding: '1.5rem', margin: 0 }}>
                    <h4 style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Registrar</h4>
                    <p style={{ margin: 0, fontWeight: 500 }}>{data.registrar || 'N/A'}</p>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                    <div className="capability-card" style={{ padding: '1.5rem', margin: 0 }}>
                      <h4 style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Domain Age</h4>
                      <p style={{ margin: 0, fontWeight: 500 }}>{data.domainAgeDays} days</p>
                    </div>
                    <div className="capability-card" style={{ padding: '1.5rem', margin: 0 }}>
                      <h4 style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Created On</h4>
                      <p style={{ margin: 0, fontWeight: 500 }}>{data.creationDate ? new Date(data.creationDate).toLocaleDateString() : 'N/A'}</p>
                    </div>
                    <div className="capability-card" style={{ padding: '1.5rem', margin: 0 }}>
                      <h4 style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Expires On</h4>
                      <p style={{ margin: 0, fontWeight: 500 }}>{data.expirationDate ? new Date(data.expirationDate).toLocaleDateString() : 'N/A'}</p>
                    </div>
                  </div>

                  {data.nameservers && data.nameservers.length > 0 && (
                    <div className="capability-card" style={{ padding: '1.5rem', margin: 0 }}>
                      <h4 style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Nameservers</h4>
                      <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
                        {data.nameservers.map((ns, i) => (
                          <li key={i} style={{ paddingBottom: '0.25rem' }}>{ns}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div className="capability-card" style={{ padding: '2rem', textAlign: 'center' }}>
                  <p style={{ fontSize: '1.125rem', marginBottom: '1rem', color: 'var(--dark)' }}>Good news! <strong>{domain}</strong> appears to be available for registration.</p>
                  <p style={{ color: 'var(--text-muted)' }}>We couldn't find an existing WHOIS record.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
