import Image from 'next/image';
import { buildMetadata } from '../../lib/meta';
import SubHero from '../../components/SubHero';
import TopicMarquee from '../../components/TopicMarquee';
import ClientLogos from '../../components/ClientLogos';
import ExcellenceGrid from '../../components/ExcellenceGrid';
import { heroImage } from '../../lib/heroImages';

export const metadata = buildMetadata({
  title: 'Our Proprietary Process for Business Growth | Gobiya',
  description:
    'Discover the Gobiya 4-Step Method: Assess, Prepare, Market, and Scale. Our proven search engineering and AI ranking framework for sustainable business growth.',
  path: '/process',
});

const PROCESS_STEPS = [
  {
    num: '01',
    phase: 'Step 1: Assess',
    title: 'Comprehensive Diagnostic & Opportunity Audit',
    summary:
      'We run an exhaustive technical and algorithmic scan of your web property to isolate crawl bottlenecks, search penalties, code debt, and missed ranking opportunities.',
    details: [
      'Full technical site audit inspecting indexability, DNS, SSL, core web vitals, and Mobile-First rendering.',
      'AI readiness evaluation to measure how AI assistants like ChatGPT, Claude, and Perplexity index and cite your brand.',
      'Competitor gap analysis identifying high-intent keyword targets and under-served market queries.',
      'Clear, actionable roadmap outlining immediate quick wins and structural prerequisites before launching campaigns.',
    ],
    deliverables: 'Complete Audit Report, Technical Deficit Log, and 90-Day Execution Roadmap',
    tag: 'Phase 1 · Foundations',
  },
  {
    num: '02',
    phase: 'Step 2: Prepare',
    title: 'Code Cleanup, Entity Architecture & Content Packaging',
    summary:
      'Before driving new traffic, we fix underlying code defects, structure structured data schemas, and optimize site architecture to maximize crawl efficiency and conversion potential.',
    details: [
      'Backend code remediation: eliminating Javascript rendering errors, broken tags, and slow asset pipelines.',
      'Structured JSON-LD schema engineering for Organization, LocalBusiness, Service, and FAQ entities.',
      'UX and conversion funnel optimization ensuring visitors convert smoothly into phone calls and form submissions.',
      'Content packaging: restructuring landing pages so search crawlers and AI models digest your core value props clearly.',
    ],
    deliverables: 'Cleaned Codebase, Implemented Schema Graph, and Conversion-Optimized Templates',
    tag: 'Phase 2 · Engineering',
  },
  {
    num: '03',
    phase: 'Step 3: Market',
    title: 'High-Intent Search, AI Visibility & Authority Acquisition',
    summary:
      'We deploy a multi-vector growth strategy designed to capture active buyers on Google, Bing, and generative AI platforms.',
    details: [
      'Targeted Organic SEO & Content Publishing targeting commercial-intent queries.',
      'Generative Engine Optimization (GEO) ensuring your business is recommended in AI answer engines.',
      'White-hat digital PR and authority link building to establish domain trust and brand citations.',
      'PPC & Paid Search Management for immediate lead acquisition while organic rankings mature.',
    ],
    deliverables: 'Published High-Rank Content, Authority Backlinks, Active PPC Campaigns, and AI Citation Growth',
    tag: 'Phase 3 · Execution',
  },
  {
    num: '04',
    phase: 'Step 4: Scale',
    title: 'Continuous Optimization, Reporting & Revenue Growth',
    summary:
      'SEO and AI growth is not a one-time setup — we continuously refine, monitor, and adapt to search engine algorithm updates to scale lead flow.',
    details: [
      'Transparent tracking focusing on real qualified leads, phone calls, and revenue growth rather than vanity metrics.',
      'Weekly automated and monthly strategic reviews to tune campaign performance.',
      'Algorithmic protection & rapid adjustments when Google or AI engine updates occur.',
      'Ongoing expansion into adjacent high-value keywords and new geographic sub-markets.',
    ],
    deliverables: 'Real-Time ROI Dashboard, Monthly Strategy Calls, and Continuous Ranking Scaling',
    tag: 'Phase 4 · Expansion',
  },
];

export default function ProcessPage() {
  return (
    <main id="top">
      {/* ══ Hero Banner ══ */}
      <SubHero
        image={heroImage(2)}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Our Process' },
        ]}
        eyebrow="Our Proven Growth Framework"
        title="Our Proprietary Process for Business Growth"
        excerpt="We've spent over 16 years refining a structured 4-step framework that turns technical search engineering and AI optimization into reliable, compounding business growth."
        primary={{ text: 'Get Your Free Site Scan', href: '/free-site-scan' }}
        secondary={{ text: 'Call 323-744-1338', href: 'tel:+13237441338' }}
      />

      <TopicMarquee
        topics={[
          'Technical Audit & Scan',
          'Schema & Entity Prep',
          'High-Intent Content & PPC',
          'Continuous Scale & Optimization',
          'Search & AI Citation',
        ]}
      />

      {/* ══ Overview Statement ══ */}
      <section className="section" id="overview">
        <div className="container container--narrow">
          <p className="mw-steps__sub" style={{ textAlign: 'center' }}>Engineering Built For Results</p>
          <h2 className="statement statement--small" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            A systematic, predictable methodology — zero fluff, open-ended bills, or random tactics.
          </h2>
          <p className="mw-steps__dek" style={{ textAlign: 'center', margin: '0 auto 3rem auto', maxWidth: '46rem' }}>
            Most agencies run standard playbooks regardless of client goals. Our 4-step proprietary process starts by identifying exactly what holds your website back, building a solid technical foundation, and deploying targeted search and AI marketing campaigns that scale revenue.
          </p>
        </div>
      </section>

      {/* ══ Detailed Process Breakdown ══ */}
      <section className="section section--tint" id="steps-detail">
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {PROCESS_STEPS.map((step) => (
              <article
                key={step.num}
                className="mw-local-areas__card"
                style={{
                  padding: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                  borderRadius: '12px',
                  border: '1px solid var(--border)',
                  background: 'var(--surface)',
                }}
              >
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', gap: '0.75rem' }}>
                  <span
                    style={{
                      fontSize: '0.8125rem',
                      fontWeight: '700',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: 'var(--brand, #8B263E)',
                      background: 'rgba(139, 38, 62, 0.08)',
                      padding: '0.35rem 0.75rem',
                      borderRadius: '4px',
                    }}
                  >
                    {step.tag}
                  </span>
                  <span style={{ fontSize: '1.75rem', fontWeight: '800', opacity: 0.35, color: 'var(--ink-500)' }}>
                    {step.num}
                  </span>
                </div>

                <h3 className="mw-steps__heading" style={{ fontSize: 'clamp(1.35rem, 2.5vw, 1.85rem)', marginBottom: '0.5rem', textAlign: 'left' }}>
                  {step.phase}: {step.title}
                </h3>

                <p className="mw-cluster-block__desc" style={{ fontSize: '1.0625rem', color: 'var(--text)', fontWeight: '500', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                  {step.summary}
                </p>

                <div style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{ fontSize: '0.9375rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--ink-500)', marginBottom: '0.75rem' }}>
                    Key Activities &amp; Focus Areas:
                  </h4>
                  <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem', paddingLeft: 0, listStyle: 'none' }}>
                    {step.details.map((item, idx) => (
                      <li key={idx} style={{ display: 'flex', gap: '0.625rem', fontSize: '0.9375rem', color: 'var(--text-muted, #4A5568)', lineHeight: '1.5' }}>
                        <span style={{ color: 'var(--brand, #8B263E)', fontWeight: '700' }}>✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border)', fontSize: '0.875rem', color: 'var(--ink-500)' }}>
                  <strong style={{ color: 'var(--text)' }}>Key Deliverable:</strong> {step.deliverables}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══ Excellence in Every Service ══ */}
      <ExcellenceGrid />

      {/* ══ Client Logos ══ */}
      <ClientLogos />

      {/* ══ Bottom CTA Banner ══ */}
      <section className="mw-navy-banner">
        <div className="container">
          <h2 className="mw-navy-banner__title">
            Ready to experience our proprietary growth process?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', marginBottom: '1.75rem', fontSize: '1.125rem', maxWidth: '36rem', margin: '0 auto 1.75rem auto' }}>
            Get a free site scan today to pinpoint your exact technical opportunities before starting your campaign.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/free-site-scan" className="mw-navy-banner__btn">
              Get Your Free Site Scan
            </a>
            <a href="tel:+13237441338" className="mw-navy-banner__btn" style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.4)', color: '#fff' }}>
              Call 323-744-1338
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
