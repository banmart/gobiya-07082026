import { Suspense } from 'react';
import FreeSiteScanApp from '../../components/FreeSiteScanApp';
import TestimonialsCompact from '../../components/TestimonialsCompact';
import PlatformStrip from '../../components/PlatformStrip';
import { buildMetadata } from '../../lib/meta';

export const metadata = buildMetadata({
  title: 'Free Site Scan & AI Visibility Audit',
  description:
    'Enter your website domain to get an instant AI and technical audit report covering speed, SEO tags, mobile performance, and AI search readiness.',
  path: '/free-site-scan',
});

export default function OnboardingPage() {
  return (
    <main id="top">
      <section className="section section--tint">
        <div className="container">
          <Suspense fallback={<div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>Loading scan tool...</div>}>
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
