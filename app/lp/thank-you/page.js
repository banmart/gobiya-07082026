import { CONTACT } from '../../../lib/nav';
import { buildMetadata } from '../../../lib/meta';
import Breadcrumbs from '../../../components/Breadcrumbs';
import SubHero from '../../../components/SubHero';
import ClientLogos from '../../../components/ClientLogos';
import { heroImage } from '../../../lib/heroImages';

export const metadata = buildMetadata({
  title: 'Thanks',
  description: 'Your Q3 Growth Bundle request was received.',
  robots: { index: false, follow: true },
  path: '/lp/thank-you',
});

export default function LpThankYouPage() {
  return (
    <main id="top">
      <SubHero
        image={heroImage(16)}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Thanks' }]}
        eyebrow="Affordable Solutions, Exceptional Service"
        title="You’re In. Your Growth Plan Is on Its Way."
        excerpt="Keep your website running smoothly and your ROI increase with our latest savings and special offers."
        primary={{ text: 'Get Your Free Site Scan', href: '/free-site-scan' }}
        secondary={{ text: 'Call 323-744-1338', href: 'tel:+13237441338' }}
      />

      <section className="mw-simple">
        <div className="container">
          <h2 className="mw-simple__heading">While You <em>Wait</em></h2>
          <p className="mw-simple__intro">
            A few things worth reading before we speak — they cover most of what usually comes up on a
            first call.
          </p>
          <div className="mw-simple__grid">
            <div>
              <h3 className="mw-simple__col-title">See where you stand</h3>
              <p className="mw-simple__col-desc">
                Run a free scan of your site and we&apos;ll show you what search engines and AI crawlers
                can currently read. <a href="/free-site-scan">Start a free site scan</a>.
              </p>
            </div>
            <div>
              <h3 className="mw-simple__col-title">Read the guides</h3>
              <p className="mw-simple__col-desc">
                Five books on search and AI visibility, free to download — including the technical
                foundation behind every build we ship. <a href="/about">Browse the library</a>.
              </p>
            </div>
            <div>
              <h3 className="mw-simple__col-title">Check the work</h3>
              <p className="mw-simple__col-desc">
                Real client outcomes with real numbers, not stock testimonials.{' '}
                <a href="/work">See client stories</a>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ Client Logo Strip ══ */}
      <ClientLogos />

      <section className="mw-navy-banner">
        <div className="container">
          <h2 className="mw-navy-banner__title">Anything you forgot to mention?</h2>
          <p className="lp-banner__dek">
            Reply to the confirmation email or call us directly — it all reaches the same place.
          </p>
          <a href="/" className="mw-navy-banner__btn">Back to Home</a>
        </div>
      </section>
    </main>
  );
}
