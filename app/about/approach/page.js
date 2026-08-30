import TopicMarquee from '../../../components/TopicMarquee';
import Image from 'next/image';
import { buildMetadata } from '../../../lib/meta';
import Breadcrumbs from '../../../components/Breadcrumbs';
import SubHero from '../../../components/SubHero';
import ClientLogos from '../../../components/ClientLogos';
import { heroImage } from '../../../lib/heroImages';

export const metadata = buildMetadata({
  title: 'Our Approach to SEO | A Process, Not a Black Box | Gobiya',
  description:
    'Our approach to SEO: fix the technical basics first, report results you can actually see, and follow a documented process — not an open-ended bill.',
  path: '/about/approach',
});

export default function ApproachPage() {
  return (
    <main id="top">

      {/* ══ 2. SubHero Banner ══ */}
      <SubHero
        image={heroImage(2)}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
          { label: 'Our Approach' },
        ]}
        eyebrow="Our Approach · Confidentiality & Security"
        title="Our Approach: An SEO Process That Takes the Guesswork Out"
        excerpt="A Documented Method, Used on Every Los Angeles Engagement"
        dek="Our approach, start to finish: how we scope the work, protect your data and your logins, and report on what actually changed. Nothing here is a black box."
        primary={{ text: 'Request a Quote', href: '?onboarding=true' }}
        secondary={{ text: 'Call 323-744-1338', href: 'tel:+13237441338' }}
      />

      <TopicMarquee topics={["Technical Foundation", "Schema & Entity Engineering", "Content Silos", "White-Hat Link Building", "Sustainable Ranking Growth"]} />



      {/* ══════════ Principles ══════════ */}
      <section className="section" id="principles">
        <div className="container container--narrow" style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <h2 className="statement statement--small">Four principles that shape every engagement.</h2>
        </div>
        <div className="container">
          <div className="capability-grid">
            <div className="capability-card">
              <span className="capability-card__tag">01 · Sequence</span>
              <h3 className="capability-card__title">Technical foundation before anything else</h3>
              <p className="capability-card__desc">If Google can&apos;t actually read your page, nothing else matters — no amount of content, links, or ad spend on top of it will help. We fix those basic technical problems first, before touching anything else.</p>
            </div>
            <div className="capability-card">
              <span className="capability-card__tag">02 · Evidence</span>
              <h3 className="capability-card__title">We look before we act</h3>
              <p className="capability-card__desc">We don&apos;t run the same playbook for every client. Every project starts with a real look at your website to find out what&apos;s actually holding it back — not a guess carried over from someone else&apos;s business.</p>
            </div>
            <div className="capability-card">
              <span className="capability-card__tag">03 · Accountability</span>
              <h3 className="capability-card__title">We report on results that matter, not just numbers</h3>
              <p className="capability-card__desc">Traffic and rankings only matter because of what they lead to. Whenever we can track it, we report on real leads, bookings, and sales — not just movement that looks good but doesn&apos;t mean much on its own.</p>
            </div>
            <div className="capability-card">
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
          <h2 className="statement statement--small">Performance, Creativity, and Relations — three parts of your marketing that work together, not against each other.</h2>
        </div>

        <div className="stack">
          <article className="stack__card">
            <div className="stack__inner">
              <div className="stack__text">
                <span className="stack__index">01</span>
                <h3 className="stack__title">Performance<br /><em>Engineering</em></h3>
                <p className="stack__desc">The technical groundwork everything else depends on — making sure your site loads fast and Google can actually read it, before content or links are asked to do any work.</p>
                <a href="/services/technical-seo" className="link-arrow">Explore Performance<svg viewBox="0 0 16 16" width="14" height="14"><path d="M2 8h11M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg></a>
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
                <a href="/services/geo" className="link-arrow">Explore Creativity<svg viewBox="0 0 16 16" width="14" height="14"><path d="M2 8h11M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg></a>
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
                <a href="/services/link-building" className="link-arrow">Explore Relations<svg viewBox="0 0 16 16" width="14" height="14"><path d="M2 8h11M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg></a>
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

      {/* ══ Client Logo Strip ══ */}
      <ClientLogos />

      {/* ══════════ CTA ══════════ */}
      <section className="cta section" id="contact">
        <div className="container container--narrow">
          <h2 className="cta__title">See how this approach applies to your site.</h2>
          <div className="cta__actions">
            <a href="?onboarding=true" className="btn btn--solid btn--big">Schedule a Consultation</a>
            <a href="tel:+13237441338" className="btn btn--ghost btn--big">323-744-1338</a>
          </div>
        </div>
      </section>

    </main>
  );
}
