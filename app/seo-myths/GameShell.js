'use client';

import { useCallback, useState } from 'react';
import MythGame from './MythGame';
import Breadcrumbs from '../../components/Breadcrumbs';

export default function GameShell({ children }) {
  const [unlocked, setUnlocked] = useState(false);
  const onFinish = useCallback(() => setUnlocked(true), []);

  return (
    <>

      <section className="section section--tint myth-section">
        <div className="container container--narrow">
          <Breadcrumbs inHero items={[{ label: 'Home', href: '/' }, { label: 'seo-myths' }]} />
          <h1 className="myth-title">
            Los Angeles SEO Myths or <em>Facts</em>
          </h1>
          <MythGame onFinish={onFinish} />
        </div>
      </section>


      <div className={`myth-locked${unlocked ? ' is-open' : ''}`}>{children}</div>
    </>
  );
}
