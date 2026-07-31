'use client';

import { useCallback, useState } from 'react';
import MythGame from './MythGame';
import SubHero from '../../components/SubHero';
import Breadcrumbs from '../../components/Breadcrumbs';
import ClientLogos from '../../components/ClientLogos';
import { heroImage } from '../../lib/heroImages';

export default function GameShell({ children }) {
  const [unlocked, setUnlocked] = useState(false);
  const onFinish = useCallback(() => setUnlocked(true), []);

  return (
    <>
      <SubHero image={heroImage(4)} imageOnly={true} />

      <section className="section section--tint myth-section">
        <div className="container container--narrow">
          <Breadcrumbs inHero items={[{ label: 'Home', href: '/' }, { label: 'seo-myths' }]} />
          <h1 className="myth-title">
            Los Angeles SEO: Myth or <em>Fact</em>
          </h1>
          <MythGame onFinish={onFinish} />
        </div>
      </section>

      <ClientLogos />

      <div className={`myth-locked${unlocked ? ' is-open' : ''}`}>{children}</div>
    </>
  );
}
