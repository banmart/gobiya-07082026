import Breadcrumbs from '../../components/Breadcrumbs';
import ContactForm from '../../components/ContactForm';
import { CONTACT } from '../../lib/nav';
import { buildMetadata } from '../../lib/meta';

export const metadata = buildMetadata({
  title: 'Contact Us | Talk Straight to a Los Angeles SEO | Gobiya',
  description:
    'Contact Gobiya SEO in Los Angeles and talk straight to the founder — a real answer within one business day, no sales script. Call 323-744-1338.',
  path: '/contact',
});

const DIRECTIONS_URL =
  'https://maps.google.com/?q=3580+Wilshire+Blvd,+Ste+132,+Los+Angeles,+CA+90010';

export default function ContactPage() {
  return (
    <main id="top">

      {/* ══ Page heading ══
          The page carried no h1 at all — the form and the office card both
          open on h2s. The heading and the line under it are the page's only
          prose, so they carry the keyword. */}
      <section className="page-hero section" style={{ paddingBottom: '2rem' }}>
        <div className="container container--narrow">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} />
          <h1 className="statement">Contact Us — Talk Straight to a Los Angeles SEO</h1>
          <p className="lede">
            Contact Gobiya and you reach the person who does the work, not a queue.
            Tell us what your site is doing wrong and you&rsquo;ll get a straight
            answer within one business day &mdash; no sales script, no obligation.
          </p>
        </div>
      </section>

      {/* ══ Form + office details ══ */}
      <section className="mw-contact">
        <div className="container">
          <div className="mw-contact__grid">
            <ContactForm />

            <aside className="mw-contact__details">
              <h2 className="mw-contact__details-title">Our office</h2>

              <div className="mw-contact__block">
                <h3 className="mw-contact__label">Address</h3>
                <p className="mw-contact__value">
                  {CONTACT.address1}
                  <br />
                  {CONTACT.address2}
                </p>
                <a className="mw-contact__action" href={DIRECTIONS_URL} target="_blank" rel="noopener noreferrer">
                  Get Directions <span aria-hidden="true">→</span>
                </a>
              </div>

              <div className="mw-contact__block">
                <h3 className="mw-contact__label">Phone</h3>
                <p className="mw-contact__value">
                  <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
                </p>
              </div>

              <div className="mw-contact__block">
                <h3 className="mw-contact__label">Email</h3>
                <p className="mw-contact__value">
                  <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
                </p>
              </div>

              <div className="mw-contact__block">
                <h3 className="mw-contact__label">Hours</h3>
                <p className="mw-contact__value">
                  Monday &ndash; Friday, 9am &ndash; 6pm PST
                  <br />
                  Saturday &amp; Sunday, by appointment
                </p>
              </div>

              <div className="mw-contact__block">
                <h3 className="mw-contact__label">Service area</h3>
                <p className="mw-contact__value">
                  Los Angeles, the San Fernando Valley, and the wider Southern California
                  region &mdash; plus remote clients nationwide.
                </p>
                <a className="mw-contact__action" href="/los-angeles-seo">
                  See Areas We Serve <span aria-hidden="true">→</span>
                </a>
              </div>

              <div className="mw-contact__block mw-contact__block--last">
                <h3 className="mw-contact__label">Elsewhere</h3>
                <ul className="mw-contact__social">
                  <li>
                    <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                  </li>
                  <li>
                    <a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
                  </li>
                  <li>
                    <a href={CONTACT.twitter} target="_blank" rel="noopener noreferrer">X</a>
                  </li>
                  <li>
                    <a href={CONTACT.yelp} target="_blank" rel="noopener noreferrer">Yelp</a>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>



      <section className="mw-navy-banner">
        <div className="container">
          <h2 className="mw-navy-banner__title">
            Prefer a 5-step structured questionnaire?
          </h2>
          <a href="?onboarding=true" className="mw-navy-banner__btn">
            Schedule a Consultation
          </a>
        </div>
      </section>
    </main>
  );
}
