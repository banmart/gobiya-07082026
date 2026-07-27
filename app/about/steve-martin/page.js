import Image from 'next/image';
import Breadcrumbs from '../../../components/Breadcrumbs';
import { buildMetadata } from '../../../lib/meta';

export const metadata = buildMetadata({
  title: 'Steve Martin | Los Angeles SEO Expert & Founder',
  description:
    'Steve Martin is the founder of Gobiya, a Los Angeles SEO expert with 25+ years in web development and search. Talk to Steve about your site.',
  path: '/about/steve-martin',
});

const STEVE_TOPICS = [
  {
    id: 'biography',
    title: 'Biography & Founder Background',
    desc: 'Steve grew up in Glendale, CA, and got his start in 1996 studying web design at Glendale College — early enough to have built for the web before Google existed. He founded Gobiya in 2010 after over a decade spent in web development and search engineering.',
  },
  {
    id: 'philosophy',
    title: 'Search Philosophy',
    desc: '“Every update since Panda has punished the same thing, in a different disguise: sites that were built for search engines instead of the people using them.”',
  },
  {
    id: 'specialties',
    title: 'Core Specializations',
    desc: 'Technical SEO & SSR rendering, Google manual penalty & algorithm recovery, Core Web Vitals performance tuning, and Generative Engine Optimization (GEO) for ChatGPT and Perplexity.',
  },
  {
    id: 'timeline',
    title: 'Career Timeline (1996 – Present)',
    desc: 'Over 25 years of tracking search shifts: Glendale College (1996), AT&T WorldNet & Webcastr (1996-2010), Gobiya Founded (2010), LLC Incorporated (2012), Google Partner Certification (2015-19), AI Search Visibility (2024-Present).',
  },
];

export default function SteveMartinPage() {
  return (
    <main id="top">
      {/* ══ 1. Clean Breadcrumb Bar ══ */}
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about' },
        { label: 'Steve Martin' },
      ]} />

      {/* ══ 2. Subhero Dark Banner ══ */}
      <section className="mw-subhero">
        <div className="container">
          <h1 className="mw-subhero__title">Steve Martin — Founder &amp; Head of Strategy</h1>
          <p className="mw-subhero__dek">
            Twenty-five years of watching search change and adapting every time. A career spent in web development and search engineering, close enough to the ground to track every major Google shift.
          </p>
        </div>
      </section>

      {/* ══ 3. Pillar Hierarchical Grid (Left Sidebar + Right Column) ══ */}
      <div className="container">
        <div className="mw-pillar-grid">
          {/* Left Sidebar Index */}
          <aside className="mw-sidebar">
            <div className="mw-sidebar__header">Steve Martin</div>
            <nav className="mw-sidebar__nav">
              {STEVE_TOPICS.map((t, idx) => (
                <a
                  key={t.id}
                  href={`#${t.id}`}
                  className={`mw-sidebar__link ${idx === 0 ? 'is-active' : ''}`}
                >
                  {t.title}
                </a>
              ))}
            </nav>
          </aside>

          {/* Right Content Area */}
          <div className="mw-cluster-list">
            {/* Bio Card Header */}
            <div id="biography" className="mw-cluster-block" style={{ background: '#FFFFFF', padding: '1.75rem', border: '1px solid #E2E8F0', borderRadius: '4px' }}>
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                <Image
                  src="/assets/img/sm.jpg"
                  alt="Steve Martin"
                  width={100}
                  height={100}
                  style={{ borderRadius: '4px', objectFit: 'cover' }}
                />
                <div>
                  <h2 style={{ fontFamily: 'PT Serif, Georgia, serif', fontSize: '1.5rem', color: '#0B1E36', margin: 0 }}>
                    Steve Martin
                  </h2>
                  <p style={{ fontSize: '0.9375rem', color: '#8B263E', fontWeight: '600', margin: '0.25rem 0 0 0' }}>
                    Founder &amp; Principal Search Strategist
                  </p>
                  <p style={{ fontSize: '0.875rem', color: '#64748B', margin: '0.25rem 0 0 0' }}>
                    Gobiya LLC · Los Angeles, California
                  </p>
                </div>
              </div>
              <p className="mw-cluster-block__desc">
                {STEVE_TOPICS[0].desc} Steve works directly with every client rather than handing engagements off to an account manager or junior team.
              </p>
            </div>

            {/* Sub-Clusters */}
            {STEVE_TOPICS.slice(1).map((t) => (
              <div key={t.id} id={t.id} className="mw-cluster-block">
                <h2 className="mw-cluster-block__title">
                  <a href="/#process">{t.title}</a>
                </h2>
                <p className="mw-cluster-block__desc">
                  {t.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ 4. Bottom Navy CTA Banner ══ */}
      <section className="mw-navy-banner">
        <div className="container">
          <h2 className="mw-navy-banner__title">
            Work directly with the person doing the work
          </h2>
          <a href="/free-site-scan" className="mw-navy-banner__btn">
            Schedule a Consultation
          </a>
        </div>
      </section>
    </main>
  );
}
