'use client';

import { useState } from 'react';

export default function AuditToolForm({ defaultUrl }) {
  const [url, setUrl] = useState(defaultUrl || '');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  async function handleAudit(e) {
    e.preventDefault();
    if (!url.trim()) return;
    setLoading(true);

    // Simulate real-time website scan
    setTimeout(() => {
      setResult({
        domain: url.replace(/^https?:\/\//i, '').split('/')[0],
        score: Math.floor(82 + Math.random() * 15),
        scannedAt: new Date().toLocaleTimeString(),
        categories: [
          { name: 'AI Assistant Visibility (ChatGPT & Perplexity)', score: 90, status: 'pass' },
          { name: 'Schema & Structured Data (JSON-LD)', score: 85, status: 'pass' },
          { name: 'Mobile Responsiveness & Core Web Vitals', score: 94, status: 'pass' },
          { name: 'Robots.txt & AI Bot Crawler Access', score: 98, status: 'pass' },
        ],
        recommendations: [
          'Add FAQ schema tags to key landing pages to trigger rich snippets in AI Overviews.',
          'Optimize image alt tags with geo-targeted keywords for local search context.',
          'Implement fast cache headers for static assets.',
        ],
      });
      setLoading(false);
    }, 1200);
  }

  return (
    <div>
      <form onSubmit={handleAudit} className="audit__form">
        <div className="auth__field" style={{ marginBottom: 0, flex: 1 }}>
          <label htmlFor="audit-url" className="sr-only">
            Website URL
          </label>
          <input
            id="audit-url"
            className="auth__input"
            type="url"
            placeholder="https://yourwebsite.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn-app" title="Run website scan" disabled={loading}>
          {loading ? 'Scanning Website…' : 'Run Scan'}
        </button>
      </form>

      {result && (
        <div className="audit__results" style={{ marginTop: '2rem' }}>
          <div className="audit__score-box">
            <div className="audit__score-circle">{result.score}</div>
            <div>
              <h3 className="audit__score-title">Scan Report for {result.domain}</h3>
              <p className="text-muted">Generated at {result.scannedAt}</p>
            </div>
          </div>

          <h4 style={{ marginTop: '1.5rem', marginBottom: '0.75rem' }}>Core Categories</h4>
          <div className="audit__categories">
            {result.categories.map((cat, idx) => (
              <div key={idx} className="audit__cat-item">
                <span>{cat.name}</span>
                <span className="audit__cat-score">{cat.score}/100</span>
              </div>
            ))}
          </div>

          <h4 style={{ marginTop: '1.5rem', marginBottom: '0.75rem' }}>AI Recommendations</h4>
          <ul className="audit__recommendations">
            {result.recommendations.map((rec, idx) => (
              <li key={idx}>&bull; {rec}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
