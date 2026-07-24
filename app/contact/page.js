import HeroQuickForm from '../../components/HeroQuickForm';
import { CONTACT } from '../../lib/nav';
import { buildMetadata } from '../../lib/meta';
import TopicMarquee from '../../components/TopicMarquee';

export const metadata = buildMetadata({
  title: 'Contact — Los Angeles SEO & AI Visibility Agency',
  description: 'Reach Gobiya at hello@gobiya.com or 323-744-1338. 3580 Wilshire Blvd, Ste 132, Los Angeles, CA 90010.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <main id="top">

      
      <section className="page-hero page-hero--left section" style={{ paddingBottom: '3rem' }}>
        <div className="container seo-hero__grid">
          <div>
            
        
          <p className="eyebrow" data-reveal><span className="eyebrow__dot"></span>Contact · Los Angeles SEO &amp; AI Visibility Agency</p>
          <h1 className="statement" style={{ textAlign: 'left', marginInline: 0 }} data-split>Let's talk about what's actually happening in your search traffic.</h1>
          <p className="lede" style={{ marginInline: 0 }} data-reveal>Send us your website address and we&apos;ll tell you what we find — the technical problems, where you&apos;re missing out on AI recommendations, and where the fastest wins actually are. No generic template, no obligation. Prefer a form? <a href="/onboarding">Start with our five-step questionnaire</a> and Steve will follow up directly.</p>
        
          </div>
          <div>
            <HeroQuickForm />
          </div>
        </div>
      </section>
      <TopicMarquee topics={["Schedule Consultation", "SEO Audit", "Speak With Experts", "Los Angeles Office", "Digital Growth"]} />



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

      <section className="faq section" id="faq">
        <div className="container container--narrow">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>Before you reach out</p>
          <h2 className="statement statement--small" data-reveal style={{ marginBottom: '3rem' }}>
            A few things people usually ask first.
          </h2>
          <dl className="faq__list">
            <div className="faq__item" data-reveal>
              <dt>What should I include when I reach out?</dt>
              <dd>Your website address, at minimum — that&apos;s enough for us to take a first look at how well Google and AI tools can read your site before we talk. If you already know the problem (a traffic drop, a rebuild gone wrong, an ad account burning through budget), mention it — it saves a round of back-and-forth.</dd>
            </div>
            <div className="faq__item" data-reveal>
              <dt>How fast will I hear back?</dt>
              <dd>Steve reads and answers messages himself, usually within one business day. There&apos;s no ticketing queue or account-manager relay in between.</dd>
            </div>
            <div className="faq__item" data-reveal>
              <dt>Is the initial audit actually free, or is that a sales pitch?</dt>
              <dd dangerouslySetInnerHTML={{ __html: 'It&apos;s a real look at your site&apos;s technical health and AI visibility, not a scripted pitch deck. Prefer a structured version of that same conversation? <a href="/onboarding">Start the five-step questionnaire</a> instead.' }} />
            </div>
          </dl>
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
