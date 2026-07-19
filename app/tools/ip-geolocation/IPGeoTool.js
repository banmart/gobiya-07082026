'use client';

import { useState } from 'react';

export default function IPGeoTool() {
  const [ip, setIp] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ip) return;

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await fetch(`/api/tools/ip-geo?ip=${encodeURIComponent(ip.trim())}`);
      const json = await res.json();
      
      if (!res.ok) throw new Error(json.details || json.error || 'Failed to fetch IP intelligence');

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
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>Free Infrastructure Utility</p>
          <h1 className="statement" data-split>IP Geolocation Lookup</h1>
          <p className="lede" data-reveal>Map any IPv4 or IPv6 address to precise geographical coordinates, trace its Internet Service Provider, and uncover network intelligence.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container container--narrow">
          <div className="form-panel" style={{ backgroundColor: 'var(--panel)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)' }}>
            <form onSubmit={handleSubmit} className="form">
              <div className="form-group">
                <label htmlFor="ip" className="form-label" style={{ marginBottom: '0.75rem', display: 'block', fontWeight: 500 }}>Enter an IPv4 or IPv6 Address</label>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <input
                    type="text"
                    id="ip"
                    className="form-input"
                    placeholder="8.8.8.8"
                    value={ip}
                    onChange={(e) => setIp(e.target.value)}
                    required
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    style={{ flex: 1, padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'transparent', color: 'var(--text)' }}
                  />
                  <button type="submit" className="btn" disabled={loading} style={{ padding: '0.75rem 1.5rem', whiteSpace: 'nowrap' }}>
                    {loading ? 'Locating...' : 'Track IP Address'}
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
                <h3 style={{ fontSize: '1.5rem', margin: 0 }}>Geolocation Results for: {data.ip || ip}</h3>
              </div>

              <div style={{ display: 'grid', gap: '1rem' }}>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="capability-card" style={{ padding: '1.5rem', margin: 0 }}>
                    <h4 style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Location</h4>
                    <p style={{ margin: 0, fontWeight: 500, fontSize: '1.125rem' }}>
                      {data.location?.city ? `${data.location.city}, ` : ''}
                      {data.location?.region ? `${data.location.region}, ` : ''}
                      {data.location?.country || 'Unknown'}
                    </p>
                    <p style={{ margin: 0, marginTop: '0.5rem', color: 'var(--text-muted)' }}>
                      Lat: {data.location?.lat}, Lng: {data.location?.lng}
                    </p>
                  </div>
                  <div className="capability-card" style={{ padding: '1.5rem', margin: 0 }}>
                    <h4 style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>ISP / Provider</h4>
                    <p style={{ margin: 0, fontWeight: 500, fontSize: '1.125rem' }}>{data.isp || 'N/A'}</p>
                  </div>
                </div>

                <div className="capability-card" style={{ padding: '1.5rem', margin: 0 }}>
                  <h4 style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Network Info</h4>
                  <ul style={{ margin: 0, paddingLeft: '1.25rem', lineHeight: '1.75' }}>
                    <li><strong>Autonomous System:</strong> {data.as?.asn ? `AS${data.as.asn} - ${data.as.name}` : 'N/A'}</li>
                    <li><strong>Connection Type:</strong> {data.connectionType || 'Unknown'}</li>
                    <li><strong>Proxy Detected:</strong> {data.proxy?.proxy ? 'Yes' : 'No'}</li>
                  </ul>
                </div>

                <div className="capability-card" style={{ padding: '1.5rem', margin: 0, overflowX: 'auto' }}>
                  <h4 style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '1rem' }}>Raw IP JSON Payload</h4>
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
