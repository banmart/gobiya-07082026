import SubHero from '../../components/SubHero';
import PlatformStrip from '../../components/PlatformStrip';
import { heroImage } from '../../lib/heroImages';
import { buildMetadata } from '../../lib/meta';
import { SOLUTIONS, SOLUTION_SLUGS, solutionPath } from '../../lib/solutions';

export const metadata = buildMetadata({
  title: 'Search & Growth Solutions | Problem-Phrased Guides | Gobiya',
  description:
    'Identify your exact website performance issue — traffic drops, AI invisibility, or low lead conversion — and discover targeted technical solutions.',
  path: '/solutions',
});

export default function SolutionsPage() {
  return (
    <main id="top">
      {/* ══ 1. SubHero Banner ══ */}
      <SubHero
        image={heroImage(2)}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Solutions' }]}
        eyebrow="Solutions · Problem-Phrased Growth Guides"
        title="Start With the Problem You’re Facing — We’ll Build the Path Out"
        excerpt="Diagnosis First, for Los Angeles and the San Fernando Valley"
        dek="Whether traffic dropped after a core update, your brand is absent from ChatGPT, or your site is leaking leads — select your challenge below."
        primary={{ text: 'Request a Quote', href: '?onboarding=true' }}
        secondary={{ text: 'Call 323-744-1338', href: 'tel:+13237441338' }}
      />

      <PlatformStrip />

      {/* ══ 2. Solutions Cards List ══ */}
      <section className="mw-excellence" style={{ paddingBlock: 'clamp(4rem, 7vw, 6rem)' }}>
        <div className="container">
          <h2 className="mw-excellence__heading">Common Search & Growth Challenges</h2>
          <p className="mw-excellence__intro">
            Click into any challenge to view the technical diagnostic steps and the exact services engineered to solve it.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(20rem, 1fr))', gap: '2rem' }}>
            {SOLUTION_SLUGS.map((slug) => {
              const sol = SOLUTIONS[slug];
              return (
                <a
                  key={slug}
                  href={solutionPath(slug)}
                  className="mw-excellence__card"
                  style={{ textDecoration: 'none', height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--main)',
                      marginBottom: '0.5rem',
                    }}
                  >
                    PROBLEM GUIDE
                  </span>
                  <h3 className="mw-excellence__card-title" style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>
                    {sol.title}
                  </h3>
                  <p className="mw-excellence__card-desc" style={{ flexGrow: 1, marginBottom: '1.5rem' }}>
                    {sol.painPoint}
                  </p>
                  <span
                    style={{
                      fontSize: '0.9375rem',
                      fontWeight: 600,
                      color: 'var(--link)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    View Diagnostic & Solution &rarr;
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ 3. Bottom Navy CTA Banner ══ */}
      <section className="mw-navy-banner">
        <div className="container">
          <h2 className="mw-navy-banner__title">Need an expert diagnostic on your site?</h2>
          <a href="?onboarding=true" className="mw-navy-banner__btn">
            Request a Quote
          </a>
        </div>
      </section>
    </main>
  );
}
