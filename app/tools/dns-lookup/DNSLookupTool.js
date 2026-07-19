'use client';

import { useState } from 'react';

export default function DNSLookupTool() {
  const [domain, setDomain] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('All Records'); // 'All Records', 'A/AAAA', 'MX', 'TXT', 'Raw Data'

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!domain) return;

    setLoading(true);
    setError(null);
    setData(null);
    setActiveTab('All Records');

    try {
      const res = await fetch(`/api/tools/dns?domain=${encodeURIComponent(domain.trim())}`);
      const json = await res.json();
      
      if (!res.ok) throw new Error(json.details || json.error || 'Failed to fetch DNS intelligence');

      setData(json.DNSData || json);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getRecordsByType = (typeGroup) => {
    if (!data || !data.dnsRecords) return [];
    
    if (typeGroup === 'A/AAAA') {
      return data.dnsRecords.filter(r => r.dnsType === 1 || r.dnsType === 28 || r.type === 'A' || r.type === 'AAAA');
    }
    if (typeGroup === 'MX') {
      return data.dnsRecords.filter(r => r.dnsType === 15 || r.type === 'MX');
    }
    if (typeGroup === 'TXT') {
      return data.dnsRecords.filter(r => r.dnsType === 16 || r.type === 'TXT');
    }
    return data.dnsRecords;
  };

  return (
    <main id="top">
      <section className="page-hero section">
        <div className="container container--narrow">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>Free Infrastructure Utility</p>
          <h1 className="statement" data-split>Global DNS Record Lookup</h1>
          <p className="lede" data-reveal>Query global DNS records instantly to diagnose routing issues, verify email configurations, and inspect server IP addresses.</p>
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
                    {loading ? 'Querying DNS...' : 'Check DNS Records'}
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
                <h3 style={{ fontSize: '1.5rem', margin: 0 }}>DNS Results for: {data.domainName || domain}</h3>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                {['All Records', 'A/AAAA', 'MX', 'TXT', 'Raw Data'].map((tab) => (
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
                
                {activeTab !== 'Raw Data' ? (
                  <div className="capability-card" style={{ padding: '1.5rem', margin: 0, overflowX: 'auto' }}>
                    <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid var(--border)' }}>
                          <th style={{ padding: '1rem 0', color: 'var(--text-muted)' }}>Type</th>
                          <th style={{ padding: '1rem 0', color: 'var(--text-muted)' }}>Name</th>
                          <th style={{ padding: '1rem 0', color: 'var(--text-muted)' }}>Target / Content</th>
                          <th style={{ padding: '1rem 0', color: 'var(--text-muted)' }}>TTL</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getRecordsByType(activeTab).length > 0 ? (
                          getRecordsByType(activeTab).map((record, i) => (
                            <tr key={i} style={{ borderBottom: '1px solid var(--border)', fontSize: '0.875rem' }}>
                              <td style={{ padding: '1rem 0', fontWeight: 600 }}>{record.type || record.dnsType}</td>
                              <td style={{ padding: '1rem 0' }}>{record.name}</td>
                              <td style={{ padding: '1rem 0', wordBreak: 'break-all', paddingRight: '1rem' }}>
                                {record.target || record.address || record.strings?.join(' ') || record.host || JSON.stringify(record)}
                              </td>
                              <td style={{ padding: '1rem 0' }}>{record.ttl}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="4" style={{ padding: '2rem 0', textAlign: 'center', color: 'var(--text-muted)' }}>
                              No records found for this filter.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="capability-card" style={{ padding: '1.5rem', margin: 0, overflowX: 'auto' }}>
                    <h4 style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '1rem' }}>Raw DNS JSON Payload</h4>
                    <pre style={{ fontSize: '0.75rem', margin: 0 }}>{JSON.stringify(data, null, 2)}</pre>
                  </div>
                )}

              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
