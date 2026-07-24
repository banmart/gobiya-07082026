'use client';

import { useState } from 'react';

export default function ThreatTool() {
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
      const res = await fetch(`/api/tools/threat?domain=${encodeURIComponent(domain.trim())}`);
      const json = await res.json();
      
      if (!res.ok) throw new Error(json.details || json.error || 'Failed to fetch intelligence');

      setData(json);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const isThreatDetected = (data) => {
    if (!data) return false;
    // According to WhoisXML Threat Intelligence logic, presence of certain flags dictates threats
    return data.malware?.length > 0 || data.phishing?.length > 0 || data.spam?.length > 0;
  };

  return (
    <main id="top">
      <section className="page-hero section">
        <div className="container container--narrow">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>Free Tool</p>
          <h1 className="statement" data-split>Threat Intelligence Checker</h1>
          <p className="lede" data-reveal>Check any domain against known threat lists to spot malware, phishing, or other malicious activity.</p>
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
                    placeholder="suspicious-link.com"
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
                    {loading ? 'Scanning...' : 'Scan for Threats'}
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
                <h3 style={{ fontSize: '1.5rem', margin: 0 }}>Threat Intelligence Results for: {domain}</h3>
              </div>

              <div style={{ display: 'grid', gap: '1rem' }}>
                
                <div className="capability-card" style={{ padding: '2rem', margin: 0, textAlign: 'center', borderTop: `4px solid ${isThreatDetected(data) ? '#dc2626' : '#16a34a'}` }}>
                  <h4 style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '1rem' }}>Threat Status</h4>
                  {isThreatDetected(data) ? (
                    <>
                      <p style={{ margin: 0, fontWeight: 700, fontSize: '3rem', color: '#dc2626' }}>THREAT DETECTED</p>
                      <p style={{ marginTop: '1rem', color: 'var(--text)' }}>This domain has been flagged in global threat intelligence feeds.</p>
                    </>
                  ) : (
                    <>
                      <p style={{ margin: 0, fontWeight: 700, fontSize: '3rem', color: '#16a34a' }}>CLEAR</p>
                      <p style={{ marginTop: '1rem', color: 'var(--text)' }}>No active malware, phishing, or spam threats detected for this domain.</p>
                    </>
                  )}
                </div>

                <div className="capability-card" style={{ padding: '1.5rem', margin: 0, overflowX: 'auto' }}>
                  <h4 style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '1rem' }}>Raw Intelligence JSON Payload</h4>
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
