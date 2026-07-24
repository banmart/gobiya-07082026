'use client';

import { useState } from 'react';

export default function EmailTool() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await fetch(`/api/tools/email-verify?email=${encodeURIComponent(email.trim())}`);
      const json = await res.json();
      
      if (!res.ok) throw new Error(json.details || json.error || 'Failed to verify email');

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
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>Free Tool</p>
          <h1 className="statement" data-split>Email Verification Tool</h1>
          <p className="lede" data-reveal>Check whether an email address is real and can actually receive mail, to help protect your sender reputation.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container container--narrow">
          <div className="form-panel" style={{ backgroundColor: 'var(--panel)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)' }}>
            <form onSubmit={handleSubmit} className="form">
              <div className="form-group">
                <label htmlFor="email" className="form-label" style={{ marginBottom: '0.75rem', display: 'block', fontWeight: 500 }}>Enter an Email Address</label>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <input
                    type="email"
                    id="email"
                    className="form-input"
                    placeholder="user@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    style={{ flex: 1, padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'transparent', color: 'var(--text)' }}
                  />
                  <button type="submit" className="btn" disabled={loading} style={{ padding: '0.75rem 1.5rem', whiteSpace: 'nowrap' }}>
                    {loading ? 'Verifying...' : 'Verify Email'}
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
                <h3 style={{ fontSize: '1.5rem', margin: 0 }}>Verification Results for: {data.emailAddress || email}</h3>
              </div>

              <div style={{ display: 'grid', gap: '1rem' }}>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="capability-card" style={{ padding: '1.5rem', margin: 0, borderTop: `4px solid ${data.formatCheck === 'true' ? '#16a34a' : '#dc2626'}` }}>
                    <h4 style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Syntax & Format</h4>
                    <p style={{ margin: 0, fontWeight: 600, fontSize: '1.25rem', color: data.formatCheck === 'true' ? '#16a34a' : '#dc2626' }}>
                      {data.formatCheck === 'true' ? 'Valid' : 'Invalid'}
                    </p>
                  </div>
                  <div className="capability-card" style={{ padding: '1.5rem', margin: 0, borderTop: `4px solid ${data.smtpCheck === 'true' ? '#16a34a' : '#dc2626'}` }}>
                    <h4 style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>SMTP Existence</h4>
                    <p style={{ margin: 0, fontWeight: 600, fontSize: '1.25rem', color: data.smtpCheck === 'true' ? '#16a34a' : '#dc2626' }}>
                      {data.smtpCheck === 'true' ? 'Mailbox Found' : 'Not Found / Unreachable'}
                    </p>
                  </div>
                </div>

                <div className="capability-card" style={{ padding: '1.5rem', margin: 0 }}>
                  <h4 style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '1rem' }}>Detailed Flags</h4>
                  <ul style={{ margin: 0, paddingLeft: '1.25rem', lineHeight: '1.75' }}>
                    <li><strong>Disposable Email:</strong> {data.disposableCheck === 'true' ? 'Yes (Risky)' : 'No'}</li>
                    <li><strong>Free Provider:</strong> {data.freeCheck === 'true' ? 'Yes (e.g. Gmail, Yahoo)' : 'No (Custom Domain)'}</li>
                    <li><strong>Catch-All Domain:</strong> {data.catchAllCheck === 'true' ? 'Yes' : 'No'}</li>
                  </ul>
                </div>

                <div className="capability-card" style={{ padding: '1.5rem', margin: 0, overflowX: 'auto' }}>
                  <h4 style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '1rem' }}>Raw Verification JSON Payload</h4>
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
