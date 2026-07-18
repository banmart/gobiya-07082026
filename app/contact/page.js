import { CONTACT } from '../../lib/nav';
import { buildMetadata } from '../../lib/meta';

export const metadata = buildMetadata({
  title: 'Contact — Los Angeles SEO & AI Visibility Agency',
  description: 'Reach Gobiya at hello@gobiya.com or 323-744-1338. 3580 Wilshire Blvd, Ste 132, Los Angeles, CA 90010.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <main id="top">

      <section className="page-hero section">
        <div className="container container--narrow">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>Contact</p>
          <h1 className="statement" data-split>Let's talk about what's actually happening in your search traffic.</h1>
          <p className="lede" data-reveal>Send your domain and we&apos;ll return what we see — the technical issues, the AI-citation gaps, and where the fastest wins actually are. No generic audit template, no obligation. Prefer a form? <a href="/onboarding">Start with the five-step questionnaire</a> and Steve will follow up directly.</p>
        </div>
      </section>

      <section className="contact section section--tint" id="contact-details">
        <div className="container contact__grid">
          <div className="contact__col">
            <p className="eyebrow" data-reveal><span className="eyebrow__dot"></span>Direct</p>
            <ul className="contact__list">
              <li data-reveal>
                <span className="contact__label">Email</span>
                <a href={`mailto:${CONTACT.email}`} className="contact__value">{CONTACT.email}</a>
              </li>
              <li data-reveal>
                <span className="contact__label">Phone</span>
                <a href={CONTACT.phoneHref} className="contact__value">{CONTACT.phone}</a>
              </li>
              <li data-reveal>
                <span className="contact__label">Office</span>
                <span className="contact__value">{CONTACT.address1}<br />{CONTACT.address2}</span>
              </li>
            </ul>
          </div>
          <div className="contact__col">
            <p className="eyebrow" data-reveal><span className="eyebrow__dot"></span>Elsewhere</p>
            <ul className="contact__list">
              <li data-reveal>
                <span className="contact__label">LinkedIn</span>
                <a href={CONTACT.linkedin} className="contact__value" target="_blank" rel="noopener noreferrer">Steve Martin</a>
              </li>
              <li data-reveal>
                <span className="contact__label">X (Twitter)</span>
                <a href={CONTACT.twitter} className="contact__value" target="_blank" rel="noopener noreferrer">@SteveMarti66556</a>
              </li>
              <li data-reveal>
                <span className="contact__label">Facebook</span>
                <a href={CONTACT.facebook} className="contact__value" target="_blank" rel="noopener noreferrer">Gobiya</a>
              </li>
              <li data-reveal>
                <span className="contact__label">Yelp</span>
                <a href={CONTACT.yelp} className="contact__value" target="_blank" rel="noopener noreferrer">Gobiya — Los Angeles</a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="cta section" id="get-in-touch">
        <div className="container container--narrow">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>Ready when you are</p>
          <h2 className="cta__title" data-split>Email or call — Steve reads and answers both himself.</h2>
          <div className="cta__actions" data-reveal>
            <a href={`mailto:${CONTACT.email}`} className="btn btn--solid btn--big">{CONTACT.email}</a>
            <a href={CONTACT.phoneHref} className="btn btn--ghost btn--big">{CONTACT.phone}</a>
          </div>
        </div>
      </section>

    </main>
  );
}
