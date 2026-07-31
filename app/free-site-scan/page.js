import { Suspense } from 'react';
import Image from 'next/image';
import OnboardingStepper from '../../components/OnboardingStepper';
import TopicMarquee from '../../components/TopicMarquee';
import Breadcrumbs from '../../components/Breadcrumbs';
import SubHero from '../../components/SubHero';
import ClientLogos from '../../components/ClientLogos';
import { heroImage } from '../../lib/heroImages';
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

      {/* ══ 2. SubHero Banner ══ */}
      <SubHero
        image={heroImage(5)}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Schedule a Consultation' }]}
        eyebrow="Affordable Solutions, Exceptional Service"
        title="Exclusive Gobiya Savings"
        excerpt="Keep your website running smoothly and your ROI increase with our latest savings and special offers."
        primary={{ text: 'Get Your Free Site Scan', href: '/free-site-scan' }}
        secondary={{ text: 'Call 323-744-1338', href: 'tel:+13237441338' }}
      />

      <TopicMarquee topics={["5-Step Questionnaire", "Website Scan Intake", "Tailored Proposal", "Direct Founder Review", "Fast Turnaround"]} />

      <section className="section section--tint stepper-section">
        <div className="container container--narrow">
          <Suspense fallback={<div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>Loading form...</div>}>
            <OnboardingStepper />
          </Suspense>
        </div>
      </section>

      {/* ══ Client Logo Trust Bar ══ */}
      <ClientLogos heading="The SEO Firm Trusted by Hundreds of Entrepreneurs" />
      <div className="mw-navy-divider" />

    </main>
  );
}
