import Link from 'next/link';
import { CONTACT } from '../../../lib/nav';
import { buildMetadata } from '../../../lib/meta';

export const metadata = buildMetadata({
  title: 'Thanks',
  description: 'Your onboarding submission was received.',
  robots: { index: false, follow: true },
  path: '/onboarding/thank-you',
});

export default function OnboardingThankYouPage() {
  return (
    <main id="top">
      <section className="page-hero section">
        <div className="container container--narrow">
          <p className="eyebrow eyebrow--center"><span className="eyebrow__dot"></span>Thank you</p>
          <h1 className="statement">Got it — Steve will personally review this and reply within one business day.</h1>
          <p className="lede">
            We read every submission ourselves — no automated sequences, no generic templates. In the meantime,
            feel free to look through recent work or reach out directly at{' '}
            <a href={`mailto:${CONTACT.email}`} style={{ borderBottom: '1px solid currentColor' }}>{CONTACT.email}</a>.
          </p>
          <div className="hero__ctas">
            <Link href="/work" className="btn btn--solid">See recent case studies</Link>
            <Link href="/" className="btn btn--ghost">Back to home</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
