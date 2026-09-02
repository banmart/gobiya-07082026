'use client';

import { useState } from 'react';

const TABS = [
  {
    label: 'Rank in Google Search',
    heading: 'Get on page one — and stay there',
    bullets: [
      'Technical audits that find what\'s blocking your rankings and fix it fast.',
      'Content built around what your buyers actually search, not vanity keywords.',
      'Link authority signals that tell Google you\'re the trusted local expert.',
    ],
    img: { src: '/assets/img/business-tab.webp', alt: 'Google search ranking dashboard' },
  },
  {
    label: 'Get Cited by AI',
    heading: 'Show up when AI answers the question',
    bullets: [
      'Pages structured so ChatGPT, Gemini and Perplexity quote you by name.',
      'Schema and entity markup that ties every answer back to your brand.',
      'AI citation tracking across all major platforms — not assumed, verified.',
    ],
    img: { src: '/assets/img/ai-search-tab.webp', alt: 'AI citation dashboard' },
  },
  {
    label: 'Win the Local Map',
    heading: 'Own the map pack in your service area',
    bullets: [
      'Google Business Profile optimization tuned to the local algorithm.',
      'NAP consistency and citation health across every directory that matters.',
      'Geo-grid rank tracking so you see exactly where you win — and where you don\'t.',
    ],
    img: { src: '/assets/img/map-pack-tab.webp', alt: 'Local map rank tracking' },
  },
  {
    label: 'Convert More Visitors',
    heading: 'Turn traffic into leads, not bounces',
    bullets: [
      'CRO audits that find the page leaks costing you conversions today.',
      'Landing pages built to capture the lead, not just describe the service.',
      'Core Web Vitals and speed budgets locked in before launch.',
    ],
    img: { src: '/assets/img/revenue-fourth-tab.webp', alt: 'Conversion rate optimization dashboard' },
  },
];

/**
 * The tabbed benefit section.
 *
 * Content is props now, with the homepage's own values as the defaults — so
 * <HomeBenefitTabs /> renders exactly what it rendered before, and a sub page
 * gets the same section with its own tabs in it. Nothing about the arrangement
 * is configurable, which is the point: the pattern is global, the copy is not.
 */
export default function HomeBenefitTabs({
  tabs = TABS,
  title = 'How Gobiya grows your business',
  sub = 'Search, AI, maps, and conversions — every channel working together',
  cta = { text: 'Get Started', href: '?onboarding=true' },
}) {
  const [active, setActive] = useState(0);
  const tab = tabs[active];

  return (
    <section className="hbt">
      <div className="container">

        <div className="hbt__header">
          <h2 className="hbt__title">{title}</h2>
          {sub && <p className="hbt__sub">{sub}</p>}
        </div>

        {/* ── Tab nav ── */}
        <div className="hbt__nav" role="tablist">
          {tabs.map((t, i) => (
            <button
              key={t.label}
              role="tab"
              aria-selected={i === active}
              className={`hbt__tab${i === active ? ' hbt__tab--active' : ''}`}
              onClick={() => setActive(i)}
              title={t.heading}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ── Tab panel ── */}
        <div className="hbt__panel" role="tabpanel">
          <div className="hbt__copy">
            <h3 className="hbt__panel-heading">{tab.heading}</h3>
            <ul className="hbt__bullets">
              {tab.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>

          <div className="hbt__visual" aria-hidden="true">
            {tab.img.src ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={tab.img.src} alt={tab.img.alt} className="hbt__img" />
            ) : (
              <div className="hbt__placeholder">
                <span className="hbt__placeholder-label">{tab.img.alt}</span>
              </div>
            )}
          </div>
        </div>

        {cta && (
          <div className="hbt__footer">
            <a href={cta.href} className="gb-btn gb-btn--accent" title={cta.text}>
              {cta.text}
            </a>
          </div>
        )}

      </div>
    </section>
  );
}
