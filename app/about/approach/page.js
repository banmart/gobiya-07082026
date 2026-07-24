import HeroQuickForm from '../../../components/HeroQuickForm';
import Image from 'next/image';
import { buildMetadata } from '../../../lib/meta';
import TopicMarquee from '../../../components/TopicMarquee';

export const metadata = buildMetadata({
  title: 'Our SEO Process | How Gobiya Works With Clients',
  description:
    'How Gobiya works: fix the technical basics first, report on real results you can see, and follow a clear process — not an open-ended bill.',
  path: '/about/approach',
});

export default function ApproachPage() {
  return (
    <main id="top">

      
      <section className="page-hero page-hero--left section" style={{ paddingBottom: '3rem' }}>
        <div className="container seo-hero__grid">
          <div>
            
        
          <p className="eyebrow" data-reveal><span className="eyebrow__dot"></span>Our SEO Process &amp; Methodology</p>
          <h1 className="statement" style={{ textAlign: 'left', marginInline: 0 }} data-split>Foundation first. Everything else compounds on top of it.</h1>
          <p className="lede" style={{ marginInline: 0 }} data-reveal>Most SEO problems aren&apos;t about strategy — they&apos;re about order. Content and links get built on top of a technical foundation that can&apos;t actually support them. We always work in the same order, for one reason: each step only works if the one before it is solid.</p>
        
          </div>
          <div>
            <HeroQuickForm />
          </div>
        </div>
      </section>
      <TopicMarquee topics={["Data-Driven SEO", "Search Algorithms", "AI Analysis", "White Hat Techniques", "Sustainable Growth"]} />



      {/* ══════════ Principles ══════════ */}
      <section className="section" id="principles">
        <div className="container container--narrow" style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>How we work</p>
          <h2 className="statement statement--small" data-split>Four principles that shape every engagement.</h2>
        </div>
        <div className="container">
          <div className="capability-grid">
            <div className="capability-card" data-reveal>
              <span className="capability-card__tag">01 · Sequence</span>
              <h3 className="capability-card__title">Technical foundation before anything else</h3>
              <p className="capability-card__desc">If Google can&apos;t actually read your page, nothing else matters — no amount of content, links, or ad spend on top of it will help. We fix those basic technical problems first, before touching anything else.</p>
            </div>
            <div className="capability-card" data-reveal>
              <span className="capability-card__tag">02 · Evidence</span>
              <h3 className="capability-card__title">We look before we act</h3>
              <p className="capability-card__desc">We don&apos;t run the same playbook for every client. Every project starts with a real look at your website to find out what&apos;s actually holding it back — not a guess carried over from someone else&apos;s business.</p>
            </div>
            <div className="capability-card" data-reveal>
              <span className="capability-card__tag">03 · Accountability</span>
              <h3 className="capability-card__title">We report on results that matter, not just numbers</h3>
              <p className="capability-card__desc">Traffic and rankings only matter because of what they lead to. Whenever we can track it, we report on real leads, bookings, and sales — not just movement that looks good but doesn&apos;t mean much on its own.</p>
            </div>
            <div className="capability-card" data-reveal>
              <span className="capability-card__tag">04 · Structure</span>
              <h3 className="capability-card__title">A clear process, not an open-ended bill</h3>
              <p className="capability-card__desc">Every service follows a clear, four-step process with a visible end point for the first phase of work, so you always know what we&apos;re doing and why — not just that a monthly invoice went out.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ Three pillars ══════════ */}
      <section className="solutions section section--tint" id="pillars">
        <div className="container container--narrow solutions__head">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>The three pillars</p>
          <h2 className="statement statement--small" data-split>Performance, Creativity, and Relations — three parts of your marketing that work together, not against each other.</h2>
        </div>

        <div className="stack">
          <article className="stack__card">
            <div className="stack__inner">
              <div className="stack__text">
                <span className="stack__index">01</span>
                <h3 className="stack__title">Performance<br /><em>Engineering</em></h3>
                <p className="stack__desc">The technical groundwork everything else depends on — making sure your site loads fast and Google can actually read it, before content or links are asked to do any work.</p>
                <a href="/seo-services" className="link-arrow">Explore Performance<svg viewBox="0 0 16 16" width="14" height="14"><path d="M2 8h11M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg></a>
              </div>
              <figure className="stack__media">
                <Image
                  src="/assets/img/open-office-desks.webp"
                  alt="Engineers working at individual workstations in an open office"
                  fill
                  sizes="(max-width: 768px) 100vw, 55vw"
                  loading="lazy"
                />
              </figure>
            </div>
          </article>

          <article className="stack__card">
            <div className="stack__inner">
              <div className="stack__text">
                <span className="stack__index">02</span>
                <h3 className="stack__title">Creativity<br /><em>&amp; Content</em></h3>
                <p className="stack__desc">Great content only works once the technical foundation is solid — the same well-written page falls flat if Google can&apos;t properly read it in the first place.</p>
                <a href="/geo-services" className="link-arrow">Explore Creativity<svg viewBox="0 0 16 16" width="14" height="14"><path d="M2 8h11M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg></a>
              </div>
              <figure className="stack__media">
                <Image
                  src="/assets/img/office-lounge-meeting.webp"
                  alt="Two colleagues in conversation at a lounge table in a wood-paneled office"
                  fill
                  sizes="(max-width: 768px) 100vw, 55vw"
                  loading="lazy"
                />
              </figure>
            </div>
          </article>

          <article className="stack__card">
            <div className="stack__inner">
              <div className="stack__text">
                <span className="stack__index">03</span>
                <h3 className="stack__title">Relations<br /><em>&amp; Authority</em></h3>
                <p className="stack__desc">Building real trust — other sites linking to you, consistent listings, a business people actually recognize — works best once the technical and content pieces underneath are already solid.</p>
                <a href="/services/authority-link-building" className="link-arrow">Explore Relations<svg viewBox="0 0 16 16" width="14" height="14"><path d="M2 8h11M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg></a>
              </div>
              <figure className="stack__media">
                <Image
                  src="/assets/img/corporate-atrium-walking.webp"
                  alt="Professionals walking through a glass-walled corporate atrium"
                  fill
                  sizes="(max-width: 768px) 100vw, 55vw"
                  loading="lazy"
                />
              </figure>
            </div>
          </article>
        </div>
      </section>

      {/* ══════════ CTA ══════════ */}
      <section className="cta section" id="contact">
        <div className="container container--narrow">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>Start a conversation</p>
          <h2 className="cta__title" data-split>See how this approach applies to your site.</h2>
          <div className="cta__actions" data-reveal>
            <a href="/onboarding" className="btn btn--solid btn--big">Book a strategy call</a>
            <a href="tel:+13237441338" className="btn btn--ghost btn--big">323-744-1338</a>
          </div>
        </div>
      </section>

    </main>
  );
}
