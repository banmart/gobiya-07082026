import SplitText from '../../components/SplitText';
import OnboardingStepper from '../../components/OnboardingStepper';
import { buildMetadata } from '../../lib/meta';

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
          <SplitText tag="h1" className="statement" text="A few questions, then we'll take it from here." splitType="words" delay={18} duration={0.9} />
          <p className="lede" data-reveal>Five short steps. Steve reads every submission himself and replies within one business day with what he actually sees — not a template.</p>
        </div>
      </section>

      <section className="section section--tint stepper-section">
        <div className="container container--narrow">
          <OnboardingStepper />
        </div>
      </section>

    </main>
  );
}
