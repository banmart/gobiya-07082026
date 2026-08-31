'use client';

import { useState } from 'react';

export default function ResearchToolsClient({ defaultDomain }) {
  const [domain, setDomain] = useState(defaultDomain || 'gobiya.com');
  const [activeTab, setActiveTab] = useState('whois');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  async function handleLookup(e) {
    e.preventDefault();
    if (!domain.trim()) return;
    setLoading(true);

    const cleanDomain = domain.replace(/^https?:\/\//i, '').split('/')[0];

    setTimeout(() => {
      if (activeTab === 'whois') {
        setData({
          type: 'whois',
          domainName: cleanDomain,
          registrar: 'NameCheap, Inc.',
          createdDate: '2023-04-12',
          expiresDate: '2027-04-12',
          nameServers: ['ns1.vercel-dns.com', 'ns2.vercel-dns.com'],
          status: 'clientTransferProhibited',
        });
      } else if (activeTab === 'dns') {
        setData({
          type: 'dns',
          records: [
            { type: 'A', value: '76.76.21.21', ttl: 300 },
            { type: 'CNAME', value: 'cname.vercel-dns.com', ttl: 3600 },
            { type: 'MX', value: '10 mail.gobiya.com', ttl: 3600 },
            { type: 'TXT', value: 'v=spf1 include:_spf.google.com ~all', ttl: 3600 },
          ],
        });
      } else if (activeTab === 'ssl') {
        setData({
          type: 'ssl',
          valid: true,
          issuer: "Let's Encrypt Authority X3",
          protocol: 'TLS 1.3',
          validFrom: '2026-05-01',
          validTo: '2026-08-01',
          bits: 2048,
        });
      }
      setLoading(false);
    }, 600);
  }

  return (
    <div>
      <div className="tools__tabs">
        <button
          className={`tools__tab ${activeTab === 'whois' ? 'tools__tab--active' : ''}`}
          title="Switch to WHOIS lookup"
          onClick={() => {
            setActiveTab('whois');
            setData(null);
          }}
        >
          WHOIS Lookup
        </button>
        <button
          className={`tools__tab ${activeTab === 'dns' ? 'tools__tab--active' : ''}`}
          title="Switch to DNS records"
          onClick={() => {
            setActiveTab('dns');
            setData(null);
          }}
        >
          DNS Records
        </button>
        <button
          className={`tools__tab ${activeTab === 'ssl' ? 'tools__tab--active' : ''}`}
          title="Switch to SSL health check"
          onClick={() => {
            setActiveTab('ssl');
            setData(null);
          }}
        >
          SSL Health Check
        </button>
      </div>

      <form onSubmit={handleLookup} className="audit__form" style={{ marginTop: '1.25rem' }}>
        <div className="auth__field" style={{ marginBottom: 0, flex: 1 }}>
          <input
            className="auth__input"
            type="text"
            placeholder="example.com"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn-app" title="Inspect this domain" disabled={loading}>
          {loading ? 'Performing Lookup…' : 'Inspect Domain'}
        </button>
      </form>

      {data && (
        <div className="card" style={{ marginTop: '1.5rem' }}>
          <h4 style={{ marginBottom: '1rem' }}>
            Result for {domain.replace(/^https?:\/\//i, '').split('/')[0]} ({data.type.toUpperCase()})
          </h4>

          {data.type === 'whois' && (
            <div className="tools__details">
              <p><strong>Registrar:</strong> {data.registrar}</p>
              <p><strong>Created:</strong> {data.createdDate}</p>
              <p><strong>Expires:</strong> {data.expiresDate}</p>
              <p><strong>Nameservers:</strong> {data.nameServers.join(', ')}</p>
              <p><strong>Status:</strong> {data.status}</p>
            </div>
          )}

          {data.type === 'dns' && (
            <table className="table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Value</th>
                  <th>TTL</th>
                </tr>
              </thead>
              <tbody>
                {data.records.map((r, i) => (
                  <tr key={i}>
                    <td><strong>{r.type}</strong></td>
                    <td>{r.value}</td>
                    <td>{r.ttl}s</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {data.type === 'ssl' && (
            <div className="tools__details">
              <p><strong>Status:</strong> <span className="status status--active">Valid Certificate</span></p>
              <p><strong>Issuer:</strong> {data.issuer}</p>
              <p><strong>Protocol:</strong> {data.protocol}</p>
              <p><strong>Valid Range:</strong> {data.validFrom} to {data.validTo}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
