import { notFound } from 'next/navigation';
import SubHero from '../../../components/SubHero';
import PlatformStrip from '../../../components/PlatformStrip';
import TestimonialsCompact from '../../../components/TestimonialsCompact';
import ClientLogos from '../../../components/ClientLogos';
import { heroImage } from '../../../lib/heroImages';
import { buildMetadata } from '../../../lib/meta';
import { getSolution, SOLUTION_SLUGS, solutionPath } from '../../../lib/solutions';
import { getService } from '../../../lib/serviceIndex';

export function generateStaticParams() {
  return SOLUTION_SLUGS.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const sol = getSolution(slug);
  if (!sol) return {};
  return buildMetadata({
    title: sol.metaTitle,
    description: sol.metaDescription,
    path: solutionPath(slug),
    parent: 'Solutions',
  });
}

export default async function SolutionDetailPage({ params }) {
  const { slug } = await params;
  const sol = getSolution(slug);
  if (!sol) notFound();

  return (
    <main id="top">
      {/* ══ SubHero ══ */}
      <SubHero
        image={heroImage(3)}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Solutions', href: '/solutions' },
          { label: sol.title },
        ]}
        eyebrow={sol.eyebrow}
        title={sol.title}
        excerpt="Expert Service in Los Angeles and the San Fernando Valley"
        dek={sol.subtitle}
        primary={{ text: 'Request a Quote', href: '?onboarding=true' }}
        secondary={{ text: 'Call 323-744-1338', href: 'tel:+13237441338' }}
      />

      <PlatformStrip />

      {/* ══ Pain Point & Diagnosis Section ══ */}
      <section className="mw-excellence" style={{ paddingBlock: 'clamp(4rem, 7vw, 6rem)' }}>
        <div className="container" style={{ maxWidth: '56rem' }}>
          <div
            style={{
              background: 'var(--surface-raised)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              padding: '2rem',
              marginBottom: '3rem',
            }}
          >
            <h2 style={{ fontSize: '1.25rem', color: 'var(--main)', marginBottom: '0.5rem', fontWeight: 700 }}>
              The Core Problem
            </h2>
            <p style={{ fontSize: '1.125rem', lineHeight: 1.6, color: 'var(--text)', margin: 0 }}>
              {sol.painPoint}
            </p>
          </div>

          <h2 className="mw-excellence__heading" style={{ textAlign: 'left', marginBottom: '2rem' }}>
            Diagnostic Breakdown & Root Causes
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', marginBottom: '4rem' }}>
            {sol.diagnosis.map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--rule)',
                  borderRadius: '10px',
                  padding: '1.75rem',
                }}
              >
                <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.5rem' }}>
                  {idx + 1}. {item.title}
                </h3>
                <p style={{ fontSize: '1rem', lineHeight: 1.65, color: 'var(--ink-600)', marginBottom: '1rem' }}>
                  {item.desc}
                </p>
                <a
                  href={item.serviceLink.href}
                  title={item.serviceLink.title}
                  style={{
                    fontWeight: 600,
                    color: 'var(--link)',
                    textDecoration: 'none',
                    fontSize: '0.9375rem',
                  }}
                >
                  {item.serviceLink.title} &rarr;
                </a>
              </div>
            ))}
          </div>

          {/* ══ Recommended Canonical Services ══ */}
          <h2 className="mw-excellence__heading" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
            Targeted Services to Resolve This Challenge
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(16rem, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
            {sol.recommendedServices.map((svcSlug) => {
              const svc = getService(svcSlug);
              if (!svc) return null;
              return (
                <a
                  key={svcSlug}
                  href={`/services/${svcSlug}`}
                  className="mw-excellence__card"
                  title={svc.navTitle}
                  style={{ textDecoration: 'none' }}
                >
                  <h3 className="mw-excellence__card-title" style={{ fontSize: '1.25rem' }}>
                    {svc.navTitle}
                  </h3>
                  <p className="mw-excellence__card-desc" style={{ fontSize: '0.9375rem' }}>
                    {svc.standfirst ? svc.standfirst.slice(0, 100) + '...' : 'Explore targeted service details & scope.'}
                  </p>
                  <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--link)', marginTop: 'auto' }}>
                    Learn More &rarr;
                  </span>
                </a>
              );
            })}
          </div>

          {/* ══ FAQ Section ══ */}
          {sol.faq && sol.faq.length > 0 && (
            <div>
              <h2 className="mw-excellence__heading" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
                Frequently Asked Questions
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {sol.faq.map((item, i) => (
                  <div key={i} style={{ borderBottom: '1px solid var(--rule)', paddingBottom: '1.25rem' }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text)' }}>
                      {item.q}
                    </h3>
                    <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--ink-600)', margin: 0 }}>
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ══ Client social proof ══ */}
      <TestimonialsCompact heading="What Los Angeles Clients Say" />
      <ClientLogos />

      {/* ══ Bottom CTA Banner ══ */}
      <section className="mw-navy-banner">
        <div className="container">
          <h2 className="mw-navy-banner__title">Ready to fix this on your site?</h2>
          <a href="?onboarding=true" className="mw-navy-banner__btn" title="Request a Quote">
            Request a Quote
          </a>
        </div>
      </section>
    </main>
  );
}
