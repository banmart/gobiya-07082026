import HeroQuickForm from '../../components/HeroQuickForm';
import { SERVICES } from '../../lib/services';
import { CONSULTING_ITEMS } from '../../lib/consultingIndex';
import { buildMetadata } from '../../lib/meta';
import Chapter from '../../components/sections/Chapter';
import TopicMarquee from '../../components/TopicMarquee';
import Breadcrumbs from '../../components/Breadcrumbs';

export const metadata = buildMetadata({
  title: 'Los Angeles SEO & Digital Marketing Services | Gobiya',
  description:
    'Explore Gobiya’s full suite of Los Angeles SEO services, web design, Google Ads, content marketing, and AI search solutions for LA businesses.',
  path: '/services',
});

const PILLARS = ['Performance', 'Relations'];

export default function ServicesPage() {
  const byPillar = PILLARS.map((pillar) => ({
    pillar,
    items: Object.values(SERVICES).filter((s) => s.pillar === pillar),
  }));

  return (
    <main id="top">
      <section className="page-hero page-hero--left section" style={{ paddingBottom: '3rem' }}>
        <div className="container seo-hero__grid">
          <div>
            <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'services' }]} />
            <h1 className="statement" style={{ textAlign: 'left', marginInline: 0 }} data-split>Los Angeles SEO &amp; Digital Marketing Services</h1>
            <p className="lede" style={{ marginInline: 0 }} data-reveal>Performance, content, and search strategy — marketing services for Los Angeles businesses built to work together under one accountable team, so your business gets found first.</p>
          </div>
          <div>
            <HeroQuickForm />
          </div>
        </div>
      </section>
      <TopicMarquee topics={["Full-Funnel Search Marketing", "Technical Infrastructure", "AI Engine Presence", "Local & B2B Growth", "Revenue Focused"]} />

      <section className="section" id="flat-services">
        <div className="container">
          <Chapter n={1} label="Core services" />
          <div className="insights__grid" data-stagger>
            {CONSULTING_ITEMS.filter((s) => s.tag === 'Consulting').map((s) => (
              <a className="insights__card" href={s.href} key={s.slug}>
                <span className="insights__card-cat">Consulting</span>
                <h2 className="insights__card-title">{s.title}</h2>
                <p className="insights__card-dek">{s.desc}</p>
                <span className="link-arrow">Learn more<svg viewBox="0 0 16 16" width="14" height="14"><path d="M2 8h11M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {byPillar.map(({ pillar, items }, pi) => (
        <section className="section" id={pillar.toLowerCase()} key={pillar}>
          <div className="container">
            <Chapter n={pi + 2} label={pillar} />
            <div className="insights__grid" data-stagger>
              {items.map((s) => (
                <a className="insights__card" href={`/${s.slug}`} key={s.slug}>
                  <span className="insights__card-cat">{s.pillar}</span>
                  <h2 className="insights__card-title">{s.title}</h2>
                  <p className="insights__card-dek">{s.metaDescription}</p>
                  <span className="link-arrow">Learn more<svg viewBox="0 0 16 16" width="14" height="14"><path d="M2 8h11M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg></span>
                </a>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="faq section" id="faq">
        <div className="container container--narrow">
          <Chapter n={PILLARS.length + 2} label="Common questions" />
          <h2 className="statement statement--small" data-reveal style={{ marginBottom: '3rem' }}>
            Los Angeles SEO and digital marketing, plainly explained.
          </h2>
          <dl className="faq__list">
            <div className="faq__item" data-reveal>
              <dt>How do Los Angeles SEO services compare to content marketing?</dt>
              <dd>SEO covers everything that affects whether your site can be found at all — the technical setup, your local reputation online, and how your pages are built. Content marketing is the writing and publishing side. On their own, great content without SEO rarely gets found, and SEO without content leaves you with a clean site and nothing worth reading. We treat them as one job: every page is planned around what people are actually searching for, then written to be found and to turn visitors into customers. <a href="/content-marketing-services-los-angeles">See how our writing and search work fit together.</a></dd>
            </div>
            <div className="faq__item" data-reveal>
              <dt>What is the difference between an SEO agency and a digital marketing agency?</dt>
              <dd>An SEO agency focuses on getting you found in search — rankings, traffic, and the technical and content work behind both. A digital marketing agency usually covers more ground: paid ads, social media, email, and branding, on top of SEO. We sit in between: everything we do starts with search, then extends into content and paid ads as one connected plan instead of separate pieces. <a href="/ppc-management-services-los-angeles">See how our paid ads work fits in.</a></dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="cta section section--tint" id="contact">
        <div className="container container--narrow">
          <h2 className="cta__title" data-split>Not sure which service you need?</h2>
          <div className="cta__actions" data-reveal>
            <a href="/onboarding" className="btn btn--solid btn--big">Book a strategy call</a>
            <a href="tel:+13237441338" className="btn btn--ghost btn--big">323-744-1338</a>
          </div>
        </div>
      </section>

    </main>
  );
}
