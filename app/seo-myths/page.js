import Link from 'next/link';
import { buildMetadata } from '../../lib/meta';
import { MYTHS, TOPICS, TOTAL_QUESTIONS } from '../../lib/seoMyths';
import GameShell from './GameShell';

export const metadata = buildMetadata({
  title: 'Los Angeles SEO Myths vs Facts | Gobiya',
  description:
    'Test your search knowledge with our Los Angeles SEO myth-busting game. Learn what actually works for local rankings and traffic.',
  path: '/seo-myths',
});

// The static list below is the crawlable copy of the game. It also feeds this
// FAQ schema, so the same twelve answers can earn a rich result — the game
// itself is JS-only and would be invisible on its own.
const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: MYTHS.map((m) => ({
    '@type': 'Question',
    name: `${m.claim} Myth or fact?`,
    acceptedAnswer: {
      '@type': 'Answer',
      text: `${m.answer === 'myth' ? 'Myth.' : 'Fact.'} ${m.verdict} ${m.detail}`,
    },
  })),
};

export default function SeoMythsPage() {
  return (
    <main id="top">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />

      {/* The board is the whole page until the run is over. GameShell keeps the
          two sections below rendered in the HTML from the start — for crawlers
          and for anyone without JS — and only reveals them on completion. */}
      <GameShell>
        <section className="section">
          <div className="container container--narrow">
            <h2 className="statement statement--small">All {TOTAL_QUESTIONS} claims, settled.</h2>
            <p className="lede myth-key__lede">
              Every claim from the game, and what is actually true about each one.
            </p>

            <dl className="faq__list myth-key">
              {MYTHS.map((m) => (
                <div className="faq__item" key={m.id} data-reveal>
                  <dt>
                    <span className={`myth-key__tag myth-key__tag--${m.answer}`}>
                      {m.answer}
                    </span>
                    &ldquo;{m.claim}&rdquo;
                  </dt>
                  <dd>
                    <strong>{m.verdict}</strong> {m.detail}{' '}
                    <Link href={TOPICS[m.topic].href} className="myth-key__link">
                      More on {TOPICS[m.topic].label.toLowerCase()}
                    </Link>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="section section--dark">
          <div className="container container--narrow myth-outro">
            <h2 className="statement statement--small">
              Knowing the myths is the easy part.
            </h2>
            <p className="lede">
              The harder question is which of these your own site is getting wrong right
              now. We will look at it and tell you what to fix first — no cost, no
              contract.
            </p>
            <div className="hero__ctas">
              <Link href="/contact" className="btn btn--solid btn--big">
                Schedule a Consultation
              </Link>
              <Link href="/pricing" className="btn btn--ghost btn--big">
                See pricing
              </Link>
            </div>
          </div>
        </section>
      </GameShell>
    </main>
  );
}
