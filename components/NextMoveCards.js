'use client';

import { useState } from 'react';

/* "Pick your next move" — the homepage's service picker.
   Replaces the old photo bento grid. A photo of a stock office told a visitor
   nothing about the service; these cards show a small diagram of the thing the
   service actually moves (a rankings curve, an AI answer with a citation, a
   link graph), which is the whole point of the panel.

   Every visual is inline SVG/CSS on tokens, so both themes and both color
   schemes follow automatically — no new image assets, nothing to re-export
   when the palette changes. */

const GROUPS = [
  { id: 'popular', label: 'Most Requested' },
  { id: 'found', label: 'Get Found' },
  { id: 'cited', label: 'Get Cited' },
  { id: 'convert', label: 'Convert' },
];

const CARDS = [
  {
    id: 'technical',
    title: 'Fix what Google can’t crawl',
    blurb: 'Technical SEO',
    href: '/services/technical-seo',
    groups: ['popular', 'found'],
    tone: 'navy',
    art: 'chart',
  },
  {
    id: 'geo',
    title: 'Get quoted by ChatGPT & Gemini',
    blurb: 'AI search optimization',
    href: '/services/geo',
    groups: ['popular', 'cited'],
    tone: 'carmine',
    art: 'answer',
  },
  {
    id: 'content',
    title: 'Content that answers the question',
    blurb: 'Content marketing',
    href: '/services/content-marketing',
    groups: ['cited', 'found'],
    tone: 'gold',
    art: 'pages',
  },
  {
    id: 'links',
    title: 'Earn links that actually count',
    blurb: 'Link building',
    href: '/services/link-building',
    groups: ['found'],
    tone: 'navy',
    art: 'links',
  },
  {
    id: 'cro',
    title: 'Turn visitors into booked jobs',
    blurb: 'Conversion optimization',
    href: '/services/cro',
    groups: ['popular', 'convert'],
    tone: 'carmine',
    art: 'funnel',
  },
  {
    id: 'web',
    title: 'A site built to be indexed',
    blurb: 'Web design & development',
    href: '/services/web-dev',
    groups: ['convert', 'found'],
    tone: 'gold',
    art: 'build',
  },
];

function Art({ kind }) {
  if (kind === 'chart') {
    return (
      <svg className="mw-move-card__art-svg" viewBox="0 0 220 120" role="img" aria-hidden="true">
        <g className="mw-move-card__grid">
          {[24, 48, 72, 96].map((y) => (
            <line key={y} x1="8" y1={y} x2="212" y2={y} />
          ))}
        </g>
        <polyline
          className="mw-move-card__line"
          points="12,102 44,92 76,96 108,68 140,58 172,34 204,20"
        />
        <circle className="mw-move-card__dot" cx="204" cy="20" r="5" />
      </svg>
    );
  }

  if (kind === 'answer') {
    return (
      <div className="mw-move-card__answer">
        <div className="mw-move-card__answer-q">&ldquo;Best plumber in Los Angeles?&rdquo;</div>
        <div className="mw-move-card__answer-bar" />
        <div className="mw-move-card__answer-bar mw-move-card__answer-bar--short" />
        <div className="mw-move-card__answer-cite">
          <span className="mw-move-card__answer-num">1</span> yourbusiness.com
        </div>
      </div>
    );
  }

  if (kind === 'pages') {
    return (
      <div className="mw-move-card__pages">
        {[0, 1, 2].map((i) => (
          <div key={i} className={`mw-move-card__page mw-move-card__page--${i}`}>
            <span /><span /><span />
          </div>
        ))}
      </div>
    );
  }

  if (kind === 'links') {
    return (
      <svg className="mw-move-card__art-svg" viewBox="0 0 220 120" role="img" aria-hidden="true">
        <g className="mw-move-card__edges">
          <line x1="110" y1="60" x2="40" y2="26" />
          <line x1="110" y1="60" x2="34" y2="92" />
          <line x1="110" y1="60" x2="184" y2="30" />
          <line x1="110" y1="60" x2="190" y2="88" />
        </g>
        <circle className="mw-move-card__node" cx="40" cy="26" r="7" />
        <circle className="mw-move-card__node" cx="34" cy="92" r="7" />
        <circle className="mw-move-card__node" cx="184" cy="30" r="7" />
        <circle className="mw-move-card__node" cx="190" cy="88" r="7" />
        <circle className="mw-move-card__hub" cx="110" cy="60" r="13" />
      </svg>
    );
  }

  if (kind === 'funnel') {
    return (
      <div className="mw-move-card__funnel">
        <div className="mw-move-card__funnel-row"><span style={{ width: '100%' }} /><em>1,000 visits</em></div>
        <div className="mw-move-card__funnel-row"><span style={{ width: '62%' }} /><em>620 read on</em></div>
        <div className="mw-move-card__funnel-row"><span style={{ width: '24%' }} /><em>240 calls</em></div>
      </div>
    );
  }

  return (
    <div className="mw-move-card__build">
      <div className="mw-move-card__build-bar" />
      <div className="mw-move-card__build-grid">
        <span /><span /><span /><span /><span /><span />
      </div>
    </div>
  );
}

export default function NextMoveCards() {
  const [group, setGroup] = useState('popular');
  const shown = CARDS.filter((c) => c.groups.includes(group));

  return (
    <section className="mw-move">
      <div className="container">
        <h2 className="mw-move__heading">Pick your next move</h2>

        <div className="mw-move__tabs" role="tablist" aria-label="Service categories">
          {GROUPS.map((g) => (
            <button
              key={g.id}
              type="button"
              role="tab"
              aria-selected={g.id === group}
              className={`mw-move__tab${g.id === group ? ' is-active' : ''}`}
              onClick={() => setGroup(g.id)}
            >
              {g.label}
            </button>
          ))}
        </div>

        <div className="mw-move__rail">
          {shown.map((card) => (
            <a
              key={card.id}
              href={card.href}
              className={`mw-move-card mw-move-card--${card.tone}`}
            >
              <div className="mw-move-card__head">
                <span className="mw-move-card__eyebrow">{card.blurb}</span>
                <h3 className="mw-move-card__title">{card.title}</h3>
              </div>
              <div className="mw-move-card__art">
                <Art kind={card.art} />
              </div>
              <span className="mw-move-card__go">Learn more &rarr;</span>
            </a>
          ))}
        </div>

        <div className="mw-move__footer">
          <a href="/services" className="mw-simple__btn">
            Explore All Services <span>&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
}
