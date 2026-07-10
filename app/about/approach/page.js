import Image from 'next/image';
import SplitText from '../../../components/SplitText';
import { buildMetadata } from '../../../lib/meta';

export const metadata = buildMetadata({
  title: 'Our Approach',
  description:
    'How Gobiya works: technical foundation first, transparent reporting tied to real business outcomes, and a defined process instead of an open-ended retainer.',
  path: '/about/approach',
});

export default function ApproachPage() {
  return (
    <main id="top">

      <section className="page-hero section">
        <div className="container container--narrow">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>About · Approach</p>
          <SplitText tag="h1" className="statement" text="Foundation first. Everything else compounds on top of it." splitType="words" delay={18} duration={0.9} />
          <p className="lede" data-reveal>Most SEO failures aren&apos;t a strategy problem — they&apos;re a sequencing problem. Content and links get built on top of a technical foundation that can&apos;t support them. We work in a fixed order for a reason: each layer only works if the one underneath it is solid.</p>
        </div>
      </section>

      {/* ══════════ Principles ══════════ */}
      <section className="section" id="principles">
        <div className="container container--narrow" style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>How we work</p>
          <h2 className="statement statement--small" data-words>Four principles that shape every engagement.</h2>
        </div>
        <div className="container">
          <div className="capability-grid">
            <div className="capability-card" data-reveal>
              <span className="capability-card__tag">01 · Sequence</span>
              <h3 className="capability-card__title">Technical foundation before anything else</h3>
              <p className="capability-card__desc">If a crawler can&apos;t read the page, no amount of content, links, or ad spend on top of it will work. We fix rendering, indexation, and crawl issues before touching strategy.</p>
            </div>
            <div className="capability-card" data-reveal>
              <span className="capability-card__tag">02 · Evidence</span>
              <h3 className="capability-card__title">Diagnosis before prescription</h3>
              <p className="capability-card__desc">We don&apos;t run a standard playbook on every account. Every engagement starts with an audit that determines what&apos;s actually capping performance, not an assumption carried over from the last client.</p>
            </div>
            <div className="capability-card" data-reveal>
              <span className="capability-card__tag">03 · Accountability</span>
              <h3 className="capability-card__title">Reporting tied to revenue, not vanity metrics</h3>
              <p className="capability-card__desc">Traffic and rankings matter because of what they produce. We report on leads, bookings, and sales wherever attribution allows it — not just movement that looks good in isolation.</p>
            </div>
            <div className="capability-card" data-reveal>
              <span className="capability-card__tag">04 · Structure</span>
              <h3 className="capability-card__title">A defined process, not an open-ended retainer</h3>
              <p className="capability-card__desc">Every service runs on a clear four-step process with a visible endpoint for the initial engagement, so you always know what&apos;s being done and why, not just that a monthly invoice went out.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ Three pillars ══════════ */}
      <section className="solutions section section--tint" id="pillars">
        <div className="container container--narrow solutions__head">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>The three pillars</p>
          <h2 className="statement statement--small" data-words>Performance, Creativity, and Relations — built to reinforce each other, not compete for budget.</h2>
        </div>

        <div className="stack">
          <article className="stack__card">
            <div className="stack__inner">
              <div className="stack__text">
                <span className="stack__index">01</span>
                <h3 className="stack__title">Performance<br /><em>Engineering</em></h3>
                <p className="stack__desc">The technical layer everything else depends on — crawlability, rendering, and Core Web Vitals fixed before content or links are asked to do any work.</p>
                <a href="/services/seo-discoverability" className="link-arrow">Explore Performance<svg viewBox="0 0 16 16" width="14" height="14"><path d="M2 8h11M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg></a>
              </div>
              <figure className="stack__media">
                <Image
                  src="/assets/img/mountain-ridges-mist.webp"
                  alt="Layered mountain ridges in morning mist"
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
                <p className="stack__desc">Content built on a solid technical foundation is what actually earns rankings and AI citations — the same words fall flat on a page a crawler can&apos;t properly read.</p>
                <a href="/services/geo-ai-content-writing" className="link-arrow">Explore Creativity<svg viewBox="0 0 16 16" width="14" height="14"><path d="M2 8h11M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg></a>
              </div>
              <figure className="stack__media">
                <Image
                  src="/assets/img/shoreline-aerial.webp"
                  alt="Deep blue open sea meeting the horizon"
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
                <p className="stack__desc">Trust signals — editorial links, consistent citations, entity alignment — compound fastest once the technical and content layers underneath them are already solid.</p>
                <a href="/services/authority-link-building" className="link-arrow">Explore Relations<svg viewBox="0 0 16 16" width="14" height="14"><path d="M2 8h11M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg></a>
              </div>
              <figure className="stack__media">
                <Image
                  src="/assets/img/waterfall-gorge.webp"
                  alt="Waterfall cutting through a green gorge"
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
          <h2 className="cta__title" data-words>See how this approach applies to your site.</h2>
          <div className="cta__actions" data-reveal>
            <a href="mailto:hello@gobiya.com" className="btn btn--solid btn--big">hello@gobiya.com</a>
            <a href="tel:+13237441338" className="btn btn--ghost btn--big">323-744-1338</a>
          </div>
        </div>
      </section>

    </main>
  );
}
