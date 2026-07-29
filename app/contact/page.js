import Breadcrumbs from '../../components/Breadcrumbs';
import CollapsibleSidebar from '../../components/CollapsibleSidebar';
import { CONTACT } from '../../lib/nav';
import { buildMetadata } from '../../lib/meta';

export const metadata = buildMetadata({
  title: 'Contact Gobiya | Los Angeles SEO Agency',
  description:
    'Get in touch with Gobiya, your local Los Angeles SEO and AI search marketing team. Request a free site scan or consultation.',
  path: '/contact',
});

const CONTACT_TOPICS = [
  {
    id: 'direct-email',
    title: 'Direct Email & Founder Contact',
    desc: `Reach Steve Martin directly at ${CONTACT.email}. Every message is read and answered personally within 1 business day.`,
    href: `mailto:${CONTACT.email}`,
    cta: `Send Email: ${CONTACT.email}`,
  },
  {
    id: 'direct-phone',
    title: 'Direct Phone & Consultation',
    desc: `Call us directly at ${CONTACT.phone} to discuss your site traffic, search issues, or upcoming website launch.`,
    href: CONTACT.phoneHref,
    cta: `Call Now: ${CONTACT.phone}`,
  },
  {
    id: 'office-address',
    title: 'Los Angeles Headquarters',
    desc: `${CONTACT.address1}, ${CONTACT.address2}. Located in Los Angeles, California.`,
    href: '#office-address',
    cta: 'View Location',
  },
  {
    id: 'free-scan',
    title: 'Schedule a Strategic Intake Consultation',
    desc: 'Send us your website address and we will tell you what we find — technical code errors, missing AI citations, and fast wins.',
    href: '/free-site-scan',
    cta: 'Schedule Your Consultation',
  },
];

export default function ContactPage() {
  return (
    <main id="top">
      {/* ══ 1. Breadcrumbs ══ */}
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} />

      {/* ══ 2. Subhero Dark Banner ══ */}
      <section className="mw-subhero">
        <div className="container">
          <h1 className="mw-subhero__title">Contact Our Los Angeles Team</h1>
          <p className="mw-subhero__dek">
            Direct founder contact. No ticketing queue or account-manager relay in between — Steve reads and answers every message himself.
          </p>
        </div>
      </section>

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

      {/* ══ 4. Bottom Navy CTA Banner ══ */}
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
