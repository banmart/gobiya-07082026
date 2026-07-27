import { Suspense } from 'react';
import Image from 'next/image';
import OnboardingStepper from '../../components/OnboardingStepper';
import { buildMetadata } from '../../lib/meta';
import TopicMarquee from '../../components/TopicMarquee';
import Breadcrumbs from '../../components/Breadcrumbs';

export const metadata = buildMetadata({
  title: 'Get Started — Free SEO & AI Scan',
  description:
    'Five quick steps, then Steve follows up with what he sees in your search traffic. No generic scan template, no obligation.',
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
];

export default function OnboardingPage() {
  return (
    <main id="top">

      {/* ══ 1. Breadcrumb Bar ══ */}
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Schedule a Consultation' }]} />

      {/* ══ 2. Dark Subhero ══ */}
      <section className="mw-subhero">
        <div className="container">
          <h1 className="mw-subhero__title">A few questions, then we&apos;ll take it from here.</h1>
          <p className="mw-subhero__dek">Five short steps. Steve reads every submission himself and replies within one business day with what he actually sees — not a template.</p>
          <ul className="mw-subhero__trust">
            {TRUST_STATS.map((stat) => (
              <li key={stat}>{stat}</li>
            ))}
          </ul>
        </div>
      </section>

      <TopicMarquee topics={["5-Step Questionnaire", "Website Scan Intake", "Tailored Proposal", "Direct Founder Review", "Fast Turnaround"]} />

      <section className="section section--tint stepper-section">
        <div className="container container--narrow">
          <Suspense fallback={<div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>Loading form...</div>}>
            <OnboardingStepper />
          </Suspense>
        </div>
      </section>

      {/* ══ Client Logo Trust Bar ══ */}
      <section className="mw-trust">
        <div className="container">
          <h2 className="mw-trust__heading">
            The SEO Firm Trusted by Hundreds of Entrepreneurs
          </h2>
          <div className="mw-trust__logos">
            {CLIENT_LOGOS.map((logo, idx) => (
              <div key={idx} className="mw-trust__logo-item">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={180}
                  height={65}
                  style={{ objectFit: 'contain', maxHeight: '55px', width: 'auto' }}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="mw-navy-divider" />

    </main>
  );
}
