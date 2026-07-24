'use client';

import { useState } from 'react';

export default function ReputationTool() {
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
      const res = await fetch(`/api/tools/reputation?domain=${encodeURIComponent(domain.trim())}`);
      const json = await res.json();
      
      if (!res.ok) throw new Error(json.details || json.error || 'Failed to fetch reputation intelligence');

      setData(json);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return '#16a34a'; // Green
    if (score >= 70) return '#eab308'; // Yellow
    return '#dc2626'; // Red
  };

  return (
    <main id="top">
      <section className="page-hero section">
        <div className="container container--narrow">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>Free Tool</p>
          <h1 className="statement" data-split>Domain Reputation & Threat Check</h1>
          <p className="lede" data-reveal>Check any domain's trust score and history to spot malware, phishing flags, or possible search engine penalties.</p>
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
                    placeholder="bad-actor.com"
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
                    {loading ? 'Analyzing...' : 'Check Reputation'}
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
                <h3 style={{ fontSize: '1.5rem', margin: 0 }}>Reputation Results for: {data.domainName || domain}</h3>
              </div>

              <div style={{ display: 'grid', gap: '1rem' }}>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                  <div className="capability-card" style={{ padding: '2rem', margin: 0, textAlign: 'center', borderTop: `4px solid ${getScoreColor(data.reputationScore)}` }}>
                    <h4 style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '1rem' }}>Overall Trust Score</h4>
                    <p style={{ margin: 0, fontWeight: 700, fontSize: '4rem', color: getScoreColor(data.reputationScore) }}>
                      {data.reputationScore !== undefined ? data.reputationScore : 'N/A'}
                      <span style={{ fontSize: '1.5rem', color: 'var(--text-muted)', fontWeight: 500 }}>/100</span>
                    </p>
                    <p style={{ marginTop: '1rem', color: 'var(--text)' }}>
                      {data.reputationScore >= 90 && "This domain is considered highly trustworthy and safe."}
                      {data.reputationScore >= 70 && data.reputationScore < 90 && "This domain is generally safe but might have some minor flags or lack long-term history."}
                      {data.reputationScore < 70 && "Warning: This domain has a low reputation score. It may be associated with spam, malware, or phishing."}
                    </p>
                  </div>
                </div>

                <div className="capability-card" style={{ padding: '1.5rem', margin: 0, overflowX: 'auto' }}>
                  <h4 style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '1rem' }}>Raw Reputation JSON Payload</h4>
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
