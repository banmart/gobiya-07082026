import SubHero from '../../components/SubHero';
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

      <SubHero
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
        eyebrow="Contact · Los Angeles"
        title="Contact Us — Talk Straight to a Los Angeles SEO"
        dek="Contact Gobiya and you reach the person who does the work, not a queue. Tell us what your site is doing wrong and you'll get a straight answer within one business day — no sales script, no obligation."
        primary={{ text: 'Call 323-744-1338', href: 'tel:+13237441338' }}
        secondary={{ text: 'Email Us', href: `mailto:${CONTACT.email}` }}
        showTrust={false}
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
                <a className="mw-contact__action" href={DIRECTIONS_URL} target="_blank" rel="noopener noreferrer" title="Get directions to our Los Angeles office">
                  Get Directions <span aria-hidden="true">→</span>
                </a>
              </div>

              <div className="mw-contact__block">
                <h3 className="mw-contact__label">Phone</h3>
                <p className="mw-contact__value">
                  <a href={CONTACT.phoneHref} title="Call Gobiya">{CONTACT.phone}</a>
                </p>
              </div>

              <div className="mw-contact__block">
                <h3 className="mw-contact__label">Email</h3>
                <p className="mw-contact__value">
                  <a href={`mailto:${CONTACT.email}`} title="Email Gobiya">{CONTACT.email}</a>
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
                <a className="mw-contact__action" href="/los-angeles-seo" title="See areas we serve in Los Angeles">
                  See Areas We Serve <span aria-hidden="true">→</span>
                </a>
              </div>

              <div className="mw-contact__block mw-contact__block--last">
                <h3 className="mw-contact__label">Elsewhere</h3>
                <ul className="mw-contact__social">
                  <li>
                    <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" title="Gobiya on LinkedIn">LinkedIn</a>
                  </li>
                  <li>
                    <a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer" title="Gobiya on Facebook">Facebook</a>
                  </li>
                  <li>
                    <a href={CONTACT.twitter} target="_blank" rel="noopener noreferrer" title="Gobiya on X (Twitter)">X</a>
                  </li>
                  <li>
                    <a href={CONTACT.yelp} target="_blank" rel="noopener noreferrer" title="Gobiya on Yelp">Yelp</a>
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
          <a href="?onboarding=true" className="mw-navy-banner__btn" title="Schedule a free strategy consultation">
            Schedule a Consultation
          </a>
        </div>
      </section>
    </main>
  );
}
