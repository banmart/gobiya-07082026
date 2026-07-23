import { Suspense } from 'react';
import Image from 'next/image';
import OnboardingStepper from '../../components/OnboardingStepper';
import { buildMetadata } from '../../lib/meta';
import TopicMarquee from '../../components/TopicMarquee';

export const metadata = buildMetadata({
  title: 'Get Started — Los Angeles SEO & AI Visibility Agency',
  description: 'Tell us about your business in five quick steps and Steve will follow up with what he sees in your search traffic — no generic audit template, no obligation.',
  path: '/onboarding',
});

// Real, verifiable facts only (no follower counts / fabricated numbers) —
// same figures used on /about and in lib/work.js.
const TRUST_STATS = [
  'Founded 2010',
  'BBB A+ Rated',
  'Google Partner 2015–2019',
  '9 Client Case Studies',
];

const CLIENT_LOGOS = [
  { src: '/assets/img/americanlivescan.webp', alt: 'American Livescan' },
  { src: '/assets/img/smilecenter.webp', alt: 'SmileCenter.com' },
  { src: '/assets/img/totalcapital.webp', alt: 'TotalCapitalInc.Com' },
  { src: '/assets/img/remodelmepros.webp', alt: 'RemodelMePros.com' },
  { src: '/assets/img/safetycentric-logo.png', alt: 'Safety-Centric.com' },
  { src: '/assets/img/dgplumbing-logo.webp', alt: 'DGPlumbingandRooter.com' },
  { src: '/assets/img/mtw-logo-mark-nFG9LpnH.webp', alt: 'MyTrustWills.Com' },
  { src: '/assets/img/quickpass-logo.webp', alt: 'QuickPassAiD.Com' },
  { src: '/assets/img/trusted-logo.webp', alt: 'Trusted Home Contractors' },
];

export default function OnboardingPage() {
  return (
    <main id="top">

      <section className="page-hero section">
        <div className="container container--narrow">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>Get started</p>
          <h1 className="statement" data-split>A few questions, then we'll take it from here.</h1>
          <p className="lede" data-reveal>Five short steps. Steve reads every submission himself and replies within one business day with what he actually sees — not a template.</p>
          <ul className="hero-trust" data-reveal>
            {TRUST_STATS.map((stat) => (
              <li key={stat}>{stat}</li>
            ))}
          </ul>
        </div>
      </section>
      <TopicMarquee topics={["Begin Onboarding", "Strategy Discovery", "Initial Audit", "Client Setup", "SEO Intake"]} />


      <section className="section section--tint stepper-section">
        <div className="container container--narrow">
          <Suspense fallback={<div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>Loading form...</div>}>
            <OnboardingStepper />
          </Suspense>
        </div>
      </section>

      {/* ══ Client logo marquee, directly above the global footer ══ */}
      <section className="logo-strip section" aria-label="Selected clients">
        <div className="container container--narrow portfolio__head">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>Who we&apos;ve built for</p>
        </div>
        <div className="marquee" aria-hidden="true">
          <div className="marquee__track">
            {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((l, i) => (
              <span className="logo-strip__item" key={i}>
                <Image src={l.src} alt={i < CLIENT_LOGOS.length ? l.alt : ''} width={220} height={80} loading="lazy" />
              </span>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
