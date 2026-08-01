import { Suspense } from 'react';
import OnboardingStepper from '../../components/OnboardingStepper';
import TestimonialsCompact from '../../components/TestimonialsCompact';
import PlatformStrip from '../../components/PlatformStrip';
import { buildMetadata } from '../../lib/meta';

export const metadata = buildMetadata({
  title: 'Free Full Site Scan & AI Visibility Audit',
  description:
    'Five quick steps, then Steve follows up with what he sees in your search traffic. No generic scan template, no obligation.',
  path: '/free-site-scan',
});

// Real, verifiable facts only (no follower counts / fabricated numbers) —
// same figures used on /about and in lib/work.js.
const TRUST_STATS = [
  'Founded 2010',
  'Direct founder review — Steve reads every submission',
  '24-hour turnaround on business days',
  'No cost, no obligation, no pushy sales sequence',
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

      <section className="section section--tint stepper-section">
        <div className="container container--narrow">
          <h1 className="fss-heading">
            Free Full Site Scan &amp; AI Visibility Audit
          </h1>
          <Suspense fallback={<div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>Loading form...</div>}>
            <OnboardingStepper />
          </Suspense>
        </div>
      </section>

      {/* ══ Platform Strip — the same global logo row that sits under the hero
             site-wide, standing in for the client brand logos here ══ */}
      <PlatformStrip />

      <TestimonialsCompact />
      <div className="mw-navy-divider" />

    </main>
  );
}
