'use client';

// Holds the one piece of state the page and the game have to agree on: whether
// the run is finished. Until it is, the page is nothing but the board.
//
// `children` is the answer key and the closing CTA, passed down already
// rendered from the server component. That matters — they stay in the HTML at
// first paint and are only hidden with CSS, so crawlers and no-JS visitors get
// the full content while players still have to earn it.

import { useCallback, useState } from 'react';
import MythGame from './MythGame';

export default function GameShell({ children }) {
  const [unlocked, setUnlocked] = useState(false);
  const onFinish = useCallback(() => setUnlocked(true), []);

  return (
    <>
      <section className="section section--tint myth-section">
        <div className="container container--narrow">
          <h1 className="myth-title">
            SEO Myth or <em>Fact</em>
          </h1>
          <MythGame onFinish={onFinish} />
        </div>
      </section>

      <div className={`myth-locked${unlocked ? ' is-open' : ''}`}>{children}</div>
    </>
  );
}
