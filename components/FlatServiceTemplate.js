import Image from 'next/image';
import Breadcrumbs from './Breadcrumbs';
import HeroQuickForm from './HeroQuickForm';
import TopicMarquee from './TopicMarquee';
import StoryMotif from './StoryMotif';
import HorizontalRail from './sections/HorizontalRail';
import Chapter from './sections/Chapter';
import { CONSULTING_ITEMS } from '../lib/consultingIndex';
import { ServiceIcon } from './icons/HandDrawn';
import { getStory } from '../lib/serviceStory';

export default function FlatServiceTemplate({ service }) {
  const serviceName = service.title.split(' - ')[0];
  const story = getStory(service.slug);

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    serviceType: service.eyebrow,
    description: service.metaDescription || service.intro,
    url: `https://www.gobiya.com/${service.slug}`,
    // Reference the sitewide organization node from components/SiteSchema.js
    // rather than restating it. Declaring a second, @id-less ProfessionalService
    // here put two unlinked copies of the same company on every service page,
    // which splits the entity instead of consolidating it.
    provider: { '@id': 'https://www.gobiya.com/#organization' },
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${serviceName} Capabilities`,
      itemListElement: service.capabilities?.map((c) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: c.title,
          description: c.desc,
        },
      })),
    },
  };

  const faqSchema = service.faqs?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: service.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.a.replace(/<[^>]+>/g, ''),
          },
        })),
      }
    : null;

  return (
    <main id="top">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <section className="page-hero page-hero--left section" style={{ paddingBottom: '3rem' }}>
        <div className="container seo-hero__grid">
          <div>
            <Breadcrumbs items={[
              { label: 'Home', href: '/' },
              { label: 'Services', href: '/services' },
              { label: service.slug },
            ]} />
            <h1 className="statement" data-split style={{ textAlign: 'left', marginInline: 0 }}>{service.h1}</h1>
            <p className="lede" data-reveal style={{ marginInline: 0 }}>{service.intro}</p>
            <div className="hero__ctas" data-reveal style={{ justifyContent: 'flex-start' }}>
              <a href={service.heroCtaHref || "/onboarding"} className="btn btn--solid">{service.heroCtaText || "Get a free audit"}</a>
              <a href="#included" className="btn btn--ghost">What&apos;s included</a>
            </div>
          </div>
          <div>
            <HeroQuickForm defaultService={service.title.split(' - ')[0]} />
          </div>
        </div>
      </section>
      <TopicMarquee topics={service.capabilities ? service.capabilities.map(c => c.title) : ["Technical Infrastructure", "On-Page Architecture", "Local Pack Dominance", "Authority Acquisition"]} />

      {/* ══════════ 01 · The stakes ══════════
          The tension the rest of the page resolves, paired with the topic's
          signature figure. This is the beat the old template was missing —
          it went straight from hero to a number with nothing at stake. */}
      {story.stakes && (
        <section className="section stakes" id="stakes">
          <div className="container stakes__grid">
            <div className="stakes__text">
              <Chapter n={1} label={story.chapters[0].label} />
              <p className="stakes__line" data-split>{story.stakes}</p>
              <p className="stakes__sub" data-reveal>{service.problem.statement}</p>
            </div>
            <div className="stakes__figure" data-parallax="0.12">
              <StoryMotif motif={story.motif} label={story.motifLabel} />
            </div>
          </div>
        </section>
      )}

      {/* ══════════ 02 · The evidence ══════════ */}
      <section className="seo-proof" id="proof">
        <div className="container">
          <div className="seo-proof__grid" style={{ gridTemplateColumns: '1fr' }}>
            <a className="seo-proof__item" data-reveal href={service.datapoint.href} style={{ textDecoration: 'none', color: 'inherit' }}>
              <span className="seo-proof__value">
                <i data-count={service.datapoint.value} data-plain>{service.datapoint.value}</i>
                {service.datapoint.suffix && <em>{service.datapoint.suffix}</em>}
              </span>
              <span className="seo-proof__label">{service.datapoint.label}</span>
              {/* was an inline color: var(--hint) — dark navy on the dark navy
                  band, i.e. invisible. Uses a light token now. */}
              <p className="seo-proof__note">{service.datapoint.sourceNote}</p>
            </a>
          </div>
        </div>
      </section>

      {/* ══════════ Testimonial ══════════ */}
      <section className="testimonials section section--dark" id="testimonial" aria-label={`What ${service.testimonial.company} said`}>
        <div className="container container--narrow">
          <Chapter n={2} label={story.chapters[1].label} light />
          <div className="testimonial-rotator" data-reveal>
            <blockquote className="testimonial-rotator__quote">
              <p>{service.testimonial.quote}</p>
            </blockquote>
            <div className="testimonial-rotator__byline">
              <div className="testimonial-rotator__who">
                {service.testimonial.photo && (
                  <Image
                    src={service.testimonial.photo}
                    alt={service.testimonial.name || service.testimonial.company}
                    width={56}
                    height={56}
                    className="testimonial-rotator__photo"
                  />
                )}
                <p className="testimonial-rotator__attrib">
                  {service.testimonial.name && (
                    <>
                      <span className="testimonial-rotator__name">{service.testimonial.name}</span>
                      <span className="testimonial-rotator__sep" aria-hidden="true">&middot;</span>
                    </>
                  )}
                  <a href={service.testimonial.href} className="testimonial-rotator__company" style={{ textDecoration: 'underline' }}>{service.testimonial.company}</a>
                  <span className="testimonial-rotator__sep" aria-hidden="true">&middot;</span>
                  <span className="testimonial-rotator__role">{service.testimonial.role}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ 03 · The work ══════════
          Cards stagger in as a group rather than each fading on its own —
          reads as one answer with parts, not eight unrelated claims. */}
      <section className="section" id="included">
        <div className="container container--narrow" style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <Chapter n={3} label={story.chapters[2].label} title={`What ${serviceName.toLowerCase()} actually involves.`} />
        </div>
        {/* A rail, not a grid: these are a set of equals, and eight stacked
            cards bury the last four. One gesture holds the whole set, and
            horizontal swiping is native on the phone where most of this
            traffic lands. */}
        <div className="container">
          <HorizontalRail label={`${serviceName} capabilities`}>
            {service.capabilities.map((c) => (
              <article className="capability-card rail__card" key={c.title}>
                <span className="capability-card__tag">{c.tag}</span>
                <h3 className="capability-card__title">{c.title}</h3>
                <p className="capability-card__desc" dangerouslySetInnerHTML={{ __html: c.desc }} />
              </article>
            ))}
          </HorizontalRail>
        </div>
      </section>

      {/* ══════════ 04 · How it runs ══════════
          The connector line draws with scroll position, so the timeline
          builds as you read it instead of arriving whole. */}
      <section className="section section--tint" id="process">
        <div className="container container--narrow" style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <Chapter n={4} label={story.chapters[3].label} title="A defined process, not an open-ended retainer." />
        </div>
        <div className="container container--narrow">
          <ul className="process__list process__list--timeline" data-timeline>
            <span className="process__spine" aria-hidden="true"><i data-timeline-fill /></span>
            {service.process.map((p) => (
              <li className="process__item" key={p.step} data-reveal>
                <span className="process__step">{p.step}</span>
                <div>
                  <h3 className="process__title">{p.title}</h3>
                  <p className="process__desc">{p.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ══════════ 05 · Straight answers ══════════ */}
      <section className="faq section" id="faq">
        <div className="container container--narrow">
          <Chapter n={5} label={story.chapters[4].label} title={`${serviceName}, plainly explained.`} />
          <dl className="faq__list">
            {service.faqs.map((f) => (
              <div className="faq__item" key={f.q} data-reveal>
                <dt>{f.q}</dt>
                <dd dangerouslySetInnerHTML={{ __html: f.a }} />
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ══════════ Related ══════════ */}
      <section className="related section section--tint" id="related">
        <div className="container">
          <div className="related__grid">
            {CONSULTING_ITEMS
              .filter((s) => s.slug !== service.slug)
              .slice(0, 3)
              .map((s) => (
                <a className="svc-card" href={s.href} key={s.slug} data-reveal>
                  <ServiceIcon slug={s.slug} />
                  <span className="svc-card__tag">{s.tag}</span>
                  <h3 className="svc-card__title">{s.title}</h3>
                </a>
              ))}
          </div>
        </div>
      </section>

      {/* ══════════ CTA ══════════ */}
      <section className="cta section" id="contact">
        <div className="container container--narrow">
          <h2 className="cta__title" data-split>{service.ctaTitle}</h2>
          <div className="cta__actions" data-reveal>
            <a href="/onboarding" className="btn btn--solid btn--big">Book a strategy call</a>
            <a href="tel:+13237441338" className="btn btn--ghost btn--big">323-744-1338</a>
          </div>
        </div>
      </section>

    </main>
  );
}
