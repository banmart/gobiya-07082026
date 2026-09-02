'use client';

import { useState, useEffect } from 'react';
import SplitHero from './SplitHero';

/**
 * The homepage hero.
 *
 * Only two things are its own: which of the two photographs it shows, and the
 * copy. The markup is SplitHero, the same component every sub page renders, so
 * the homepage cannot drift away from the pages that are meant to match it.
 */
const HERO_IMAGES = [
  { src: '/assets/img/hero-analytics-man.webp', width: 800, height: 447 },
  { src: '/assets/img/hero-tech-seo.webp', width: 800, height: 447 },
];

export default function HomeSplitHero() {
  const [hero, setHero] = useState(HERO_IMAGES[0]);

  useEffect(() => {
    setHero(HERO_IMAGES[Math.floor(Math.random() * HERO_IMAGES.length)]);
  }, []);

  // Real characters below, not HTML entities: the copy is a prop VALUE now, and
  // JSX only decodes entities in element content. A &rsquo; here would render
  // as the seven literal characters.
  return (
    <SplitHero
      eyebrow="Proudly Serving Los Angeles Since 2009"
      title="Get an organic search presence that matches your brand"
      dek="Keep your business ahead in Google, AI answers, maps, and conversion-ready search with Los Angeles’s top-rated digital marketing agency."
      primary={{ text: 'GET STARTED', href: '/free-site-scan' }}
      secondary={{ text: 'CONTACT US', href: '/contact' }}
      image={hero}
      imageAlt="SEO & AI Search Performance Consultant"
    />
  );
}
