import { Suspense } from 'react';
import FreeSiteScanApp from '../../components/FreeSiteScanApp';
import TestimonialsCompact from '../../components/TestimonialsCompact';
import PlatformStrip from '../../components/PlatformStrip';
import { buildMetadata } from '../../lib/meta';

export const metadata = buildMetadata({
  title: 'Free Site Scan | Instant SEO & AI Visibility Audit | Gobiya',
  description:
    'Run a free site scan and get an instant audit of your speed, SEO tags, mobile performance, and AI search readiness. No signup, no sales call.',
  // The canonical is this page's own URL. It pointed at '?onboarding=true',
  // which is the homepage lead modal — a canonical to a different page throws
  // away every signal this one earns.
  path: '/free-site-scan',
});

export default function OnboardingPage() {
  return (
    <main id="top">
      <section className="section section--tint">
        <div className="container">
          {/* FreeSiteScanApp reads useSearchParams, so the static prerender
              stops at this boundary and ships the fallback — which meant the
              page's h1 and opening copy never reached the HTML a crawler sees.
              The fallback now renders the same heading the app does, so the
              markup is identical before and after hydration and there is never
              more than one h1 on the page. */}
          <Suspense
            fallback={
              <div className="fss-app">
                <div className="fss-hero-box">
                  <div className="fss-badge">Real-Time Domain &amp; AI Audit</div>
                  <h1 className="fss-hero-title">Free Site Scan: Find Out Why You&rsquo;re Not Being Found</h1>
                  <p className="fss-hero-subtitle">
                    Enter your domain and the free site scan checks your Core Web Vitals, on-page SEO, security, and AI search readiness (ChatGPT, Perplexity &amp; Google Overviews) in about a minute.
                  </p>
                </div>
              </div>
            }
          >
            <FreeSiteScanApp />
          </Suspense>
        </div>
      </section>

      <PlatformStrip />
      <TestimonialsCompact />
      <div className="mw-navy-divider" />
    </main>
  );
}
