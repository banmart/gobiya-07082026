import { Suspense } from 'react';
import OnboardingStepper from '../../components/OnboardingStepper';
import { buildMetadata } from '../../lib/meta';
import TopicMarquee from '../../components/TopicMarquee';

export const metadata = buildMetadata({
  title: 'Get Started — Los Angeles SEO & AI Visibility Agency',
  description: 'Tell us about your business in five quick steps and Steve will follow up with what he sees in your search traffic — no generic audit template, no obligation.',
  path: '/onboarding',
});

export default function OnboardingPage() {
  return (
    <main id="top">

      <section className="page-hero section">
        <div className="container container--narrow">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>Get started</p>
          <h1 className="statement" data-split>A few questions, then we'll take it from here.</h1>
          <p className="lede" data-reveal>Five short steps. Steve reads every submission himself and replies within one business day with what he actually sees — not a template.</p>
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

    </main>
  );
}
