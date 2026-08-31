'use client';

import { useState } from 'react';

export default function HomeDomainScanBanner() {
  const [site, setSite] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = site.trim();
    window.location.href = url
      ? `/free-site-scan?url=${encodeURIComponent(url)}`
      : '/free-site-scan';
  };

  return (
    <section className="hdsb">
      <span className="hdsb__dot hdsb__dot--left"  aria-hidden="true" />
      <span className="hdsb__dot hdsb__dot--right" aria-hidden="true" />

      <div className="container hdsb__inner">
        <h2 className="hdsb__title">See exactly what&rsquo;s holding your site back</h2>
        <p className="hdsb__sub">
          Free domain scan — technical SEO, AI visibility, and local signals in one report
        </p>

        <form className="hdsb__bar" onSubmit={handleSubmit}>
          <span className="hdsb__prefix" aria-hidden="true">https://</span>
          <label className="sr-only" htmlFor="hdsb-input">Your website domain</label>
          <input
            id="hdsb-input"
            name="url"
            type="text"
            inputMode="url"
            autoComplete="url"
            placeholder="yourdomain.com"
            className="hdsb__input"
            value={site}
            onChange={(e) => setSite(e.target.value)}
          />
          <button type="submit" className="hdsb__go" aria-label="Scan my site" title="Scan my site">
            <svg
              viewBox="0 0 24 24"
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="6.5" />
              <path d="M16 16l4.5 4.5" />
            </svg>
          </button>
        </form>
      </div>
    </section>
  );
}
