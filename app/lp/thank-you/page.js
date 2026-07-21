import Link from 'next/link';
import { CONTACT } from '../../../lib/nav';
import { buildMetadata } from '../../../lib/meta';

export const metadata = buildMetadata({
  title: 'Thanks',
  description: 'Your Q3 Growth Bundle request was received.',
  robots: { index: false, follow: true },
  path: '/lp/thank-you',
});

export default function LpThankYouPage() {
  return (
    <main id="top">
      <section className="page-hero section">
        <div className="container container--narrow">
          <p className="eyebrow eyebrow--center"><span className="eyebrow__dot"></span>Thank you</p>
          <h1 className="statement">Got it — Steve will personally review this and reply within one business day.</h1>
          <p className="lede">
            We read every submission ourselves — no automated sequences, no generic templates. In the meantime,
            feel free to reach out directly at{' '}
            <a href={`mailto:${CONTACT.email}`} style={{ borderBottom: '1px solid currentColor' }}>{CONTACT.email}</a>{' '}
            or call <a href={CONTACT.phoneHref} style={{ borderBottom: '1px solid currentColor' }}>{CONTACT.phone}</a>.
          </p>
          <div className="hero__ctas">
            <Link href="/" className="btn btn--solid">Back to home</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
