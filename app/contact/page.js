import Breadcrumbs from '../../components/Breadcrumbs';
import SubHero from '../../components/SubHero';
import ClientLogos from '../../components/ClientLogos';
import CollapsibleSidebar from '../../components/CollapsibleSidebar';
import { CONTACT } from '../../lib/nav';
import { heroImage } from '../../lib/heroImages';
import { buildMetadata } from '../../lib/meta';

export const metadata = buildMetadata({
  title: 'Contact Us | Los Angeles SEO Agency',
  description:
    'Contact Gobiya SEO in Los Angeles. Direct founder access, quick response within 1 business day, & clear advice. Call 323-744-1338.',
  path: '/contact',
});

const CONTACT_TOPICS = [
  {
    id: 'free-scan',
    title: 'Request a Free Website & SEO Scan',
    desc: 'Get an expert audit of your website backend code, Google ranking health, and AI search visibility. We deliver actionable findings with no cost or obligation.',
    href: '/free-site-scan',
    cta: 'Start Your Free Scan',
  },
  {
    id: 'direct-phone',
    title: 'Call Us Directly',
    desc: `Prefer to speak with Steve immediately? Call ${CONTACT.phone} during Los Angeles business hours (9am - 6pm PST, Mon - Fri).`,
    href: CONTACT.phoneHref,
    cta: `Call ${CONTACT.phone}`,
  },
  {
    id: 'consultation',
    title: 'Schedule a Consultation',
    desc: 'Discuss your search engine optimization, content strategy, or PPC advertising goals directly with our lead strategist.',
    href: '/free-site-scan',
    cta: 'Schedule Your Consultation',
  },
  {
    id: 'office-address',
    title: 'Office Address',
    desc: `${CONTACT.address1}, ${CONTACT.address2}.`,
    href: 'https://maps.google.com/?q=3580+Wilshire+Blvd,+Ste+132,+Los+Angeles,+CA+90010',
    cta: 'Get Directions',
  },
];

export default function ContactPage() {
  return (
    <main id="top">
      {/* ══ 2. SubHero Banner ══ */}
      <SubHero
        image={heroImage(4)}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
        eyebrow="Affordable Solutions, Exceptional Service"
        title="Exclusive Gobiya Savings"
        excerpt="Keep your website running smoothly and your ROI increase with our latest savings and special offers."
        primary={{ text: 'Get Your Free Site Scan', href: '/free-site-scan' }}
        secondary={{ text: 'Call 323-744-1338', href: 'tel:+13237441338' }}
      />

      {/* ══ 3. Hierarchical Pillar Grid ══ */}
      <div className="container">
        <div className="mw-pillar-grid">
          {/* Left Sidebar */}
          <CollapsibleSidebar headerText="Contact Topics">
            {CONTACT_TOPICS.map((topic, idx) => (
              <a
                key={topic.id}
                href={`#${topic.id}`}
                className={`mw-sidebar__link ${idx === 0 ? 'is-active' : ''}`}
              >
                {topic.title}
              </a>
            ))}
          </CollapsibleSidebar>

          {/* Right Content Area */}
          <div className="mw-cluster-list">
            {CONTACT_TOPICS.map((topic) => (
              <div key={topic.id} id={topic.id} className="mw-cluster-block">
                <h2 className="mw-cluster-block__title">
                  <a href={topic.href}>{topic.title}</a>
                </h2>
                <p className="mw-cluster-block__desc">
                  {topic.desc}
                </p>
                <div style={{ marginTop: '1rem' }}>
                  <a href={topic.href} className="mw-story-card__btn" style={{ padding: '0.625rem 1.25rem' }}>
                    {topic.cta} &rarr;
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ 4. Client Logo Strip ══ */}
      <ClientLogos />

      {/* ══ 5. Bottom Navy CTA Banner ══ */}
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
