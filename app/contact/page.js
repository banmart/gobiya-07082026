import SubHero from '../../components/SubHero';
import ContactForm from '../../components/ContactForm';
import { CONTACT } from '../../lib/nav';
import { heroImage } from '../../lib/heroImages';
import { buildMetadata } from '../../lib/meta';

export const metadata = buildMetadata({
  title: 'Contact Us | Los Angeles SEO Agency',
  description:
    'Contact Gobiya SEO in Los Angeles. Direct founder access, quick response within 1 business day, & clear advice. Call 323-744-1338.',
  path: '/contact',
});

const DIRECTIONS_URL =
  'https://maps.google.com/?q=3580+Wilshire+Blvd,+Ste+132,+Los+Angeles,+CA+90010';

export default function ContactPage() {
  return (
    <main id="top">
      <SubHero
        image={heroImage(4)}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
        eyebrow="We'd Like to Hear From You"
        title="One Call, and the Person Who Does the Work Picks Up"
        excerpt="Call, email, or send us a note below. You'll talk to the person who does the work — not a call center."
        primary={{ text: `Call ${CONTACT.phone}`, href: CONTACT.phoneHref }}
        secondary={{ text: 'Get Your Free Site Scan', href: '/free-site-scan' }}
      />

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
                <a className="mw-contact__action" href="/areas-we-serve">
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
          <a href="/free-site-scan" className="mw-navy-banner__btn">
            Schedule a Consultation
          </a>
        </div>
      </section>
    </main>
  );
}
