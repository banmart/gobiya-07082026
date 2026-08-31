'use client';

import { Fragment, useState } from 'react';
import { Icon } from './DisciplineRail';

/* The homepage's "which way in" section. Two doors — national reach or local
   presence — with a scan field above them for the visitor who would rather be
   told what is wrong than pick a service off a list.

   The field prefills /free-site-scan; it does not fire the scan. FreeSiteScanApp
   reads ?url= and still waits for a click, so a shared link can't run a scan on
   open — same contract HeroScanWidget works to. */

const TRACKS = [
  {
    icon: 'globe',
    title: 'Search & AI',
    dek: 'Reach buyers everywhere they look. Technical SEO, GEO, and content built to get your brand cited in Google and AI answers.',
    cta: { text: 'Get Found In AI Search', href: '/services/geo' },
  },
  {
    icon: 'pin',
    title: 'Local',
    dek: 'Build trust in the neighborhoods you serve. Maps, the local pack, and location pages that turn nearby searches into calls.',
    cta: { text: 'Get Found Locally', href: '/los-angeles-seo' },
  },
];

export default function HomeScanChooser() {
  const [site, setSite] = useState('');

  return (
    <section className="gb-chooser">
      <div className="container">
        <h2 className="gb-chooser__title">What&rsquo;s the right fix for your site?</h2>
        <p className="gb-chooser__dek">
          Scan your site to see what&rsquo;s holding it back in search, or pick the
          track that matches how your customers already look for you
        </p>

        <form
          className="gb-scanbar"
          action="/free-site-scan"
          method="get"
          onSubmit={(e) => {
            e.preventDefault();
            const url = site.trim();
            window.location.href = url
              ? `/free-site-scan?url=${encodeURIComponent(url)}`
              : '/free-site-scan';
          }}
        >
          <span className="gb-scanbar__prefix" aria-hidden="true">
            https://
          </span>
          <label className="sr-only" htmlFor="gb-scanbar-domain">
            Your website domain
          </label>
          <input
            id="gb-scanbar-domain"
            name="url"
            type="text"
            inputMode="url"
            autoComplete="url"
            placeholder="Scan your domain"
            className="gb-scanbar__input"
            value={site}
            onChange={(e) => setSite(e.target.value)}
          />
          <button type="submit" className="gb-scanbar__go" aria-label="Scan my site" title="Scan my site">
            <svg
              viewBox="0 0 24 24"
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="6.5" />
              <path d="M16 16l4.5 4.5" />
            </svg>
          </button>
        </form>

        <div className="gb-chooser__tracks">
          {TRACKS.map((t, i) => (
            <Fragment key={t.cta.href}>
              {i > 0 && (
                <span className="gb-chooser__or" aria-hidden="true">
                  or
                </span>
              )}
              <div className="gb-track">
                <h3 className="gb-track__title">{t.title}</h3>
                <span className="gb-track__icon" aria-hidden="true">
                  <Icon name={t.icon} size={40} />
                </span>
                <p className="gb-track__dek">{t.dek}</p>
                <a href={t.cta.href} className="gb-btn gb-btn--accent gb-track__cta" title={t.cta.text}>
                  {t.cta.text}
                </a>
              </div>
            </Fragment>
          ))}
        </div>

        <p className="gb-chooser__foot">
          Need something else? <a href="/services" title="Browse all Gobiya digital marketing services">View all digital services</a>
        </p>
      </div>
    </section>
  );
}
