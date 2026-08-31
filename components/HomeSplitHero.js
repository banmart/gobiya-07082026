'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

const HERO_IMAGES = [
  { src: '/assets/img/hero-analytics-man.webp', width: 800, height: 447 },
  { src: '/assets/img/hero-tech-seo.webp',      width: 800, height: 447 },
];

export default function HomeSplitHero() {
  const [hero, setHero] = useState(HERO_IMAGES[0]);

  useEffect(() => {
    setHero(HERO_IMAGES[Math.floor(Math.random() * HERO_IMAGES.length)]);
  }, []);

  return (
    <section className="gh-split-hero">
      <div className="container">
        <div className="gh-split-hero__grid">

          {/* ── Copy column ── */}
          <div className="gh-split-hero__copy">
            <p className="gh-split-hero__badge">
              Proudly Serving Los Angeles Since 2009
            </p>

            <h1 className="gh-split-hero__title">
              Get an organic search presence that matches your brand
            </h1>

            <p className="gh-split-hero__dek">
              Keep your business ahead in Google, AI answers, maps, and conversion-ready search with Los Angeles&rsquo;s top-rated digital marketing agency.
            </p>

            <div className="gh-split-hero__actions">
              <a href="/free-site-scan" className="gh-split-hero__btn-gold" title="Start your free site scan">
                GET STARTED
              </a>
              <a href="/contact" className="gh-split-hero__btn-ghost" title="Get in touch with our team">
                CONTACT US
              </a>
            </div>

            {/* ── Social proof & ratings matching 800.com ── */}
            <div className="gh-split-hero__social-proof">
              <span className="gh-split-hero__proof-label">
                Trusted by over 500+ companies
              </span>
              <div className="gh-split-hero__badges">
                {/* Trustpilot */}
                <div className="gh-badge-pill gh-badge-pill--trustpilot" title="Trustpilot 5-Star Rated">
                  <span className="gh-badge-pill__icon">★</span>
                  <span className="gh-badge-pill__brand">Trustpilot</span>
                  <span className="gh-badge-pill__stars">★★★★★</span>
                </div>

                {/* Clutch */}
                <div className="gh-badge-pill gh-badge-pill--clutch" title="Clutch 5.0 Rated">
                  <span className="gh-badge-pill__brand">Clutch</span>
                  <span className="gh-badge-pill__score">5.0</span>
                  <span className="gh-badge-pill__stars">★★★★★</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Visual column: Single large image with maximum size and gutter ── */}
          <div className="gh-split-hero__visual" aria-hidden="true">
            <Image
              src={hero.src}
              alt="SEO & AI Search Performance Consultant"
              width={hero.width}
              height={hero.height}
              priority
              className="gh-split-hero__img"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
