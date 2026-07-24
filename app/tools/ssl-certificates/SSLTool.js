'use client';

import { useState } from 'react';

export default function SSLTool() {
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
      const res = await fetch(`/api/tools/ssl?domain=${encodeURIComponent(domain.trim())}`);
      const json = await res.json();
      
      if (!res.ok) throw new Error(json.details || json.error || 'Failed to fetch SSL intelligence');

      setData(json.certificates || json); // Certificates is usually an array
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
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>Free Tool</p>
          <h1 className="statement" data-split>SSL Certificate Checker</h1>
          <p className="lede" data-reveal>Check whether a website's security certificate is valid, see which other domains it covers, and verify who issued it.</p>
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
                    placeholder="github.com"
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
                    {loading ? 'Auditing...' : 'Check SSL'}
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
                <h3 style={{ fontSize: '1.5rem', margin: 0 }}>SSL Audit Results for: {domain}</h3>
              </div>

              <div style={{ display: 'grid', gap: '1rem' }}>
                
                {Array.isArray(data) && data.length > 0 ? (
                  data.map((cert, index) => (
                    <div key={index} className="capability-card" style={{ padding: '2rem', margin: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
                        <div>
                          <h4 style={{ fontSize: '1.125rem', margin: '0 0 0.25rem 0', fontWeight: 600 }}>{cert.subject?.commonName || 'Unknown Common Name'}</h4>
                          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.875rem' }}>Issued by: {cert.issuer?.organization || cert.issuer?.commonName || 'Unknown'}</p>
                        </div>
                        <div>
                          {new Date(cert.validTo) > new Date() ? (
                            <span style={{ display: 'inline-block', padding: '0.25rem 0.75rem', backgroundColor: '#dcfce7', color: '#16a34a', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: 600 }}>Valid</span>
                          ) : (
                            <span style={{ display: 'inline-block', padding: '0.25rem 0.75rem', backgroundColor: '#fee2e2', color: '#dc2626', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: 600 }}>Expired</span>
                          )}
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                        <div>
                          <h5 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Valid From</h5>
                          <p style={{ margin: 0, fontWeight: 500 }}>{cert.validFrom ? new Date(cert.validFrom).toLocaleDateString() : 'N/A'}</p>
                        </div>
                        <div>
                          <h5 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Valid To</h5>
                          <p style={{ margin: 0, fontWeight: 500 }}>{cert.validTo ? new Date(cert.validTo).toLocaleDateString() : 'N/A'}</p>
                        </div>
                      </div>

                      {cert.subjectAlternativeNames && cert.subjectAlternativeNames.length > 0 && (
                        <div>
                          <h5 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Subject Alternative Names (SANs)</h5>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            {cert.subjectAlternativeNames.map((san, i) => (
                              <span key={i} style={{ padding: '0.25rem 0.5rem', backgroundColor: 'var(--border)', borderRadius: '0.25rem', fontSize: '0.75rem' }}>{san}</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="capability-card" style={{ padding: '2rem', textAlign: 'center' }}>
                    <p style={{ margin: 0, color: 'var(--text-muted)' }}>No SSL certificates could be retrieved for this domain.</p>
                  </div>
                )}

                <div className="capability-card" style={{ padding: '1.5rem', margin: 0, overflowX: 'auto' }}>
                  <h4 style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '1rem' }}>Raw SSL JSON Payload</h4>
                  <pre style={{ fontSize: '0.75rem', margin: 0 }}>{JSON.stringify(data, null, 2)}</pre>
                </div>

              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
