import Image from 'next/image';
import Breadcrumbs from '../../components/Breadcrumbs';
import { buildMetadata } from '../../lib/meta';

export const metadata = buildMetadata({
  title: 'About Gobiya | Independent Los Angeles Digital Strategy Firm',
  description:
    'Founded in 2010 in Los Angeles, Gobiya is an independent search and AI consulting firm specializing in scaling small and medium-sized businesses.',
  path: '/about',
});

const BOOKS = [
  {
    title: 'ACQUIRED',
    subtitle: 'The Art of Scaling a Business to $100M',
    tag: 'REVENUE & GROWTH',
    bg: '#0B1E36',
    border: '#F5B83D',
    pdf: '/downloads/acquired-guide-to-scaling.pdf',
  },
  {
    title: 'THE ART OF AI SEARCH',
    subtitle: 'The Complete Guide to Search & AI Visibility',
    tag: 'AI VISIBILITY',
    bg: '#8B263E',
    border: '#FFFFFF',
    pdf: '/downloads/the-art-of-ai-search.pdf',
  },
  {
    title: 'THE ARCHITECTURE HANDBOOK',
    subtitle: 'Technical SEO & Search Architecture',
    tag: 'TECHNICAL FRAMEWORK',
    bg: '#1E293B',
    border: '#F5B83D',
    pdf: '/downloads/technical-seo-architecture.pdf',
  },
  {
    title: 'CLOSING THE DEAL',
    subtitle: 'Converting Search Traffic into Revenue',
    tag: 'CRO & LEAD GEN',
    bg: '#0F172A',
    border: '#E2E8F0',
    pdf: '/downloads/closing-the-deal-cro.pdf',
  },
  {
    title: "A BEGINNER'S GUIDE TO AI SEARCH",
    subtitle: 'Lessons Learned Scaling Top Rankings',
    tag: 'SEO MANUAL',
    bg: '#1E3A8A',
    border: '#93C5FD',
    pdf: '/downloads/beginners-guide-to-ai-search.pdf',
  },
];

export default function AboutPage() {
  return (
    <main id="top">
      {/* ══ 1. Breadcrumbs ══ */}
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
          { label: 'What We Do' },
        ]}
      />

      {/* ══ 2. Dark Hero Banner ══ */}
      <section
        className="mw-subhero"
        style={{
          background:
            'linear-gradient(90deg, rgba(11, 30, 54, 0.95) 0%, rgba(11, 30, 54, 0.8) 100%), url("/assets/img/hero-office-bg.jpg") center/cover no-repeat',
          paddingBlock: 'clamp(4rem, 7vw, 6rem)',
        }}
      >
        <div className="container">
          <h1 className="mw-subhero__title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontFamily: "'PT Serif', Georgia, serif" }}>
            About
          </h1>
        </div>
      </section>

      {/* ══ 3. Intro & 3-Column Features Section ══ */}
      <section className="mw-simple">
        <div className="container">
          <h2 className="mw-simple__heading" style={{ color: '#8B263E' }}>
            Scaling a Business is Complicated – We Make it Simple
          </h2>
          <p className="mw-simple__intro">
            We have invested over a decade honing the <em>Gobiya 4-Step Method</em> for scaling search and AI rankings. This documented framework has been refined over hundreds of successful growth campaigns and provides you with proven steps to minimize risk and maximize growth.
          </p>

          <div className="mw-simple__grid">
            <div>
              <h3 className="mw-simple__col-title">Tailored Approach</h3>
              <p className="mw-simple__col-desc">
                There&apos;s only one business in the world like yours – work with a team that gives you individual attention. We customize our process based on your needs and the size, industry, and type of business.
              </p>
            </div>
            <div>
              <h3 className="mw-simple__col-title">No Contracts</h3>
              <p className="mw-simple__col-desc">
                Grow now or scale later – unlike other digital marketing agencies, Gobiya requires no long-term commitments. We&apos;re here to help you achieve measurable organic growth either way.
              </p>
            </div>
            <div>
              <h3 className="mw-simple__col-title">Confidentiality &amp; Integrity</h3>
              <p className="mw-simple__col-desc">
                Confidentiality and data security are paramount to a successful partnership. We strategically release information about your growth strategy in measured, verified stages as the campaign unfolds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 4. Mid Navy CTA Banner ══ */}
      <section className="mw-navy-banner">
        <div className="container">
          <h2 className="mw-navy-banner__title" style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontFamily: "'PT Serif', Georgia, serif" }}>
            We Can Help You Scale Now or in the Future
          </h2>
          <p style={{ maxWidth: '46rem', marginInline: 'auto', marginTop: '1rem', marginBottom: '1.25rem', color: '#CBD5E1', fontSize: '1.0625rem', lineHeight: '1.6' }}>
            Scale your business now if you are ready or prepare for search dominance years in advance to maximize your market share – either way, we&apos;re here to help.
          </p>
          <p style={{ maxWidth: '46rem', marginInline: 'auto', marginBottom: '2rem', color: '#94A3B8', fontSize: '0.9375rem', lineHeight: '1.6' }}>
            Contact us today to see how we can help you navigate one of life&apos;s most consequential business decisions. There are no obligations.
          </p>
          <a href="/free-site-scan" className="mw-topbar__btn" style={{ padding: '0.875rem 2rem', fontSize: '1rem', display: 'inline-block' }}>
            Contact Us To See How We Can Help You
          </a>
        </div>
      </section>

      {/* ══ 5. The Gobiya Team & Founder Section ══ */}
      <section className="section" style={{ background: '#FFFFFF', paddingBlock: 'clamp(4rem, 7vw, 6rem)' }}>
        <div className="container">
          <h2 style={{ fontFamily: "'PT Serif', Georgia, serif", fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', color: '#8B263E', textAlign: 'center', marginBottom: '1.25rem' }}>
            The Gobiya Team
          </h2>
          <p style={{ maxWidth: '54rem', marginInline: 'auto', textAlign: 'center', fontSize: '1.0625rem', lineHeight: '1.65', color: '#475569', marginBottom: '3.5rem' }}>
            Our team members have completed hundreds of growth campaigns on behalf of our clients. Many have owned and managed their own companies and know what it takes to successfully scale a business. We are equal parts search expert, strategist, and trusted confidant — an ally you can rely on to act in your best interests from the first consultation to the day your search traffic dominates.
          </p>

          {/* Founder Profile Card */}
          <div style={{ background: '#FAFAFA', border: '1px solid #E2E8F0', borderRadius: '8px', padding: 'clamp(2rem, 4vw, 3rem)', maxWidth: '54rem', marginInline: 'auto', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              <Image
                src="/assets/img/sm.jpg"
                alt="Steve Martin"
                width={72}
                height={72}
                style={{ borderRadius: '50%', objectFit: 'cover', border: '2px solid #8B263E' }}
              />
              <div>
                <h3 style={{ fontFamily: "'PT Serif', Georgia, serif", fontSize: '1.5rem', color: '#8B263E', margin: 0 }}>
                  Steve Martin
                </h3>
                <div style={{ fontSize: '1.0625rem', fontWeight: '700', color: '#0B1E36', marginTop: '0.25rem' }}>
                  President and Founder of Gobiya
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.9375rem', lineHeight: '1.65', color: '#334155', marginBottom: '1.5rem' }}>
              In addition to our experienced team of search strategists, you will work directly with our founder, Steve Martin.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '0.9375rem', lineHeight: '1.65', color: '#334155' }}>
              <div>
                <strong style={{ color: '#0B1E36' }}>Founder and President:</strong> Founded Gobiya in 2010, focusing on technical SEO, organic search strategy, and AI visibility for middle-market and local businesses.
              </div>
              <div>
                <strong style={{ color: '#0B1E36' }}>Web Design Experience Since 1996:</strong> Over 30 years of hands-on web design, development, technical search strategy, and digital lead growth experience since 1996.
              </div>
              <div>
                <strong style={{ color: '#0B1E36' }}>300+ Campaigns:</strong> Successfully participated in or managed search strategies for over 300 privately held companies representing B2B, healthcare, legal, home services, and e-commerce.
              </div>
              <div>
                <strong style={{ color: '#0B1E36' }}>Author of 5 Books on Search &amp; AI:</strong> <em>The Art of AI Search</em>, <em>Acquired</em>, <em>The Architecture Handbook</em>, <em>Closing the Deal</em>, and <em>A Beginner&apos;s Guide to AI Search</em>.
              </div>
              <div>
                <strong style={{ color: '#0B1E36' }}>Host of AI &amp; Search Podcast:</strong> Host of the #1 podcast on scaling business visibility with search and AI.
              </div>
            </div>

            {/* Book Covers Row */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', marginTop: '2.5rem' }}>
              {BOOKS.map((b, bIdx) => (
                <a
                  key={bIdx}
                  href={b.pdf}
                  download
                  title={`Download ${b.title} Guide (PDF)`}
                  style={{
                    width: '135px',
                    height: '185px',
                    background: b.bg,
                    color: '#FFFFFF',
                    border: `1px solid ${b.border}`,
                    borderRadius: '4px',
                    padding: '0.875rem 0.625rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    textAlign: 'center',
                    boxShadow: '0 6px 14px rgba(0,0,0,0.12)',
                    textDecoration: 'none',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ fontSize: '0.625rem', fontWeight: '700', letterSpacing: '0.05em', color: b.border }}>
                    {b.tag}
                  </div>
                  <div style={{ fontFamily: "'PT Serif', Georgia, serif", fontSize: '0.875rem', fontWeight: '700', lineHeight: '1.2' }}>
                    {b.title}
                  </div>
                  <div style={{ fontSize: '0.625rem', opacity: 0.8, lineHeight: '1.2' }}>
                    {b.subtitle}
                  </div>
                  <div style={{ fontSize: '0.5625rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: b.border, borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '0.25rem' }}>
                    Download PDF ↓
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ 6. The 4-Step Method Section ══ */}
      <section className="mw-steps" id="process">
        <div className="container">
          <p className="mw-steps__sub">Our Proven Approach</p>
          <h2 className="mw-steps__heading" style={{ fontFamily: "'PT Serif', Georgia, serif", color: '#8B263E' }}>
            The Gobiya 4-Step Method
          </h2>
          <p className="mw-steps__dek">
            We&apos;ve spent over a decade perfecting the process of scaling search and AI rankings. Here&apos;s the result:
          </p>

          <div className="mw-steps__grid">
            <div className="mw-step-card">
              <div className="mw-step-card__header">Step 1: Assess</div>
              <p className="mw-step-card__desc">
                Our assessment helps you determine if you&apos;re ready to scale now and what steps to take before beginning the search process.
              </p>
            </div>
            <div className="mw-step-card">
              <div className="mw-step-card__header">Step 2: Prepare</div>
              <p className="mw-step-card__desc">
                Once you decide to scale, we begin to professionally package your company before going to market, ensuring optimal presentation.
              </p>
            </div>
            <div className="mw-step-card">
              <div className="mw-step-card__header">Step 3: Market</div>
              <p className="mw-step-card__desc">
                We develop and execute a strategic marketing campaign focused on targeting the right type of buyers, including high-intent organic leads.
              </p>
            </div>
            <div className="mw-step-card">
              <div className="mw-step-card__header">Step 4: Scale</div>
              <p className="mw-step-card__desc">
                We&apos;re with you every step of the way until the growth clears, providing support and guidance throughout the process.
              </p>
            </div>
          </div>

          <div className="mw-steps__btn-wrap">
            <a href="/#process" className="mw-steps__btn">
              View our proprietary process for growing a business
            </a>
          </div>
        </div>
      </section>

      {/* ══ 7. Navy Section: "Scaling Your Business is a Big Decision" (New Screenshot 1) ══ */}
      <section className="mw-navy-banner" style={{ paddingBlock: 'clamp(4rem, 7vw, 6rem)' }}>
        <div className="container container--narrow" style={{ textAlign: 'center' }}>
          <h2 style={{ fontFamily: "'PT Serif', Georgia, serif", fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', color: '#FFFFFF', marginBottom: '1.25rem' }}>
            Scaling Your Business is a Big Decision
          </h2>
          <p style={{ color: '#CBD5E1', fontSize: '1.0625rem', lineHeight: '1.65', marginBottom: '2.5rem', maxWidth: '44rem', marginInline: 'auto' }}>
            We understand that scaling a business can be complex, intimidating, stressful, and time-consuming. Scaling your company represents the culmination of years of hard work, dedication, and sacrifice. There&apos;s simply too much at stake to short-cut the growth process.
          </p>

          <h3 style={{ fontSize: '1.125rem', fontWeight: '700', color: '#FFFFFF', marginBottom: '1.75rem' }}>
            Our growth process is designed to produce:
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left', maxWidth: '38rem', marginInline: 'auto', color: '#E2E8F0', fontSize: '1rem', lineHeight: '1.6' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <span style={{ color: '#F5B83D', fontWeight: 'bold', fontSize: '1.2rem', lineHeight: 1 }}>■</span>
              <div>
                <strong>Multiple high-intent inquiries</strong> from a targeted audience of prospective clients, enterprise leads, and industry buyers.
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <span style={{ color: '#F5B83D', fontWeight: 'bold', fontSize: '1.2rem', lineHeight: 1 }}>■</span>
              <div>
                <strong>A transparent campaign strategy</strong> that produces a win-win for both your team and your revenue pipeline.
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <span style={{ color: '#F5B83D', fontWeight: 'bold', fontSize: '1.2rem', lineHeight: 1 }}>■</span>
              <div>
                <strong>The best, market-driven offer</strong> for you with the optimal combination of search visibility and technical authority.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 8. White Section & 3-Columns: "Scaling a Business is a Big Deal" (New Screenshot 1 & 2) ══ */}
      <section className="section" style={{ background: '#FFFFFF', paddingBlock: 'clamp(4rem, 7vw, 6rem)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '52rem', marginInline: 'auto', marginBottom: '3.5rem' }}>
            <h2 style={{ fontFamily: "'PT Serif', Georgia, serif", fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', color: '#8B263E', marginBottom: '1.25rem' }}>
              Scaling a Business is a Big Deal
            </h2>
            <p style={{ fontSize: '1.0625rem', lineHeight: '1.65', color: '#475569' }}>
              Don&apos;t sell yourself short – there&apos;s simply too much at stake. Your company represents the culmination of years of hard work, dedication, and sacrifice, and stepping up your market position is a big deal. We understand that scaling a business is complex, stressful, and time-consuming. We&apos;re here to help.
            </p>
          </div>

          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h3 style={{ fontFamily: "'PT Serif', Georgia, serif", fontSize: '1.375rem', color: '#0B1E36', textDecoration: 'underline', textUnderlineOffset: '6px' }}>
              Our sales strategy is designed to:
            </h3>
          </div>

          <div className="mw-simple__grid">
            <div>
              <h4 className="mw-simple__col-title">Maximize Your Price &amp; Reach</h4>
              <p className="mw-simple__col-desc">
                Multiple competing organic placements from a targeted audience of high-intent searchers and AI recommendation tools ensure you capture the best market share possible.
              </p>
            </div>
            <div>
              <h4 className="mw-simple__col-title">Make It Easy</h4>
              <p className="mw-simple__col-desc">
                Our streamlined approach allows you to focus on running your business with minimal stress while we execute the technical optimization.
              </p>
            </div>
            <div>
              <h4 className="mw-simple__col-title">Maintain Security</h4>
              <p className="mw-simple__col-desc">
                Confidential campaign execution and data privacy that produce a win-win for both your company and your prospective buyers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 9. Navy Resources Section: "The Most Comprehensive Library..." (New Screenshot 2) ══ */}
      <section className="mw-navy-banner" style={{ paddingBlock: 'clamp(4rem, 7vw, 6rem)' }}>
        <div className="container container--narrow" style={{ textAlign: 'center' }}>
          <h2 style={{ fontFamily: "'PT Serif', Georgia, serif", fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', color: '#FFFFFF', marginBottom: '2.5rem' }}>
            The Most Comprehensive Library on Search &amp; AI Visibility
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left', maxWidth: '42rem', marginInline: 'auto', color: '#E2E8F0', fontSize: '1rem', lineHeight: '1.6', marginBottom: '3rem' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <span style={{ color: '#F5B83D', fontWeight: 'bold', fontSize: '1.2rem', lineHeight: 1 }}>■</span>
              <div>
                <strong>Books</strong> — <em>The Art of AI Search</em>, <em>A Beginner&apos;s Guide to AI Search</em>, <em>The Architecture Handbook</em>, <em>Closing the Deal</em>, and <em>Acquired</em> – written by Steve Martin, founder of Gobiya.
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <span style={{ color: '#F5B83D', fontWeight: 'bold', fontSize: '1.2rem', lineHeight: 1 }}>■</span>
              <div>
                <strong>AI &amp; Search Podcast</strong> — The #1 podcast on Scaling Business Visibility with over 150 episodes.
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <span style={{ color: '#F5B83D', fontWeight: 'bold', fontSize: '1.2rem', lineHeight: 1 }}>■</span>
              <div>
                <strong>Search Encyclopedia</strong> — 800+ pages of articles on every step of the process of scaling search and AI rankings.
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <span style={{ color: '#F5B83D', fontWeight: 'bold', fontSize: '1.2rem', lineHeight: 1 }}>■</span>
              <div>
                <strong>Downloads</strong> — Download forms, checklists, and technical audit frameworks for growing your web presence.
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <span style={{ color: '#F5B83D', fontWeight: 'bold', fontSize: '1.2rem', lineHeight: 1 }}>■</span>
              <div>
                <strong>Gobiya University</strong> — In-depth courses led by industry experts on SEO and AI search optimization.
              </div>
            </div>
          </div>

          <a href="/insights" className="mw-topbar__btn" style={{ padding: '0.875rem 2rem', fontSize: '1rem', display: 'inline-block' }}>
            Browse All Our Content By Topic
          </a>
        </div>
      </section>

      {/* ══ 10. Schedule a Free Consultation Calendar Section (New Screenshot 3) ══ */}
      <section className="mw-consultation">
        <div className="container">
          <div className="mw-consultation__grid">
            <div>
              <h2 className="mw-consultation__title">Schedule a Free Consultation</h2>
              <p className="mw-consultation__sub">Scaling your business is a big deal</p>
              <p className="mw-consultation__dek">
                You&apos;ve invested your blood, sweat, and tears into an enterprise that has provided for you, your family and your employees. The moment has finally come for you to start a new chapter in your digital growth. Explore your options now.
              </p>
              <a href="/free-site-scan" className="mw-consultation__btn">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                Schedule Your Consultation
              </a>
            </div>

            <div className="mw-consultation__phone">
              <div className="mw-phone-mockup">
                <div className="mw-phone-mockup__notch" />
                <div className="mw-phone-mockup__time">9:41</div>
                <div className="mw-phone-mockup__cal">
                  <div className="mw-phone-mockup__days">
                    <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
                  </div>
                  <div className="mw-phone-mockup__grid">
                    <span className="mute">26</span><span className="mute">27</span><span className="mute">28</span><span className="mute">29</span><span className="mute">30</span><span className="mute">31</span><span>01</span>
                    <span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span className="active">7</span><span>8</span>
                    <span>9</span><span>10</span><span>11</span><span>12</span><span>13</span><span>14</span><span>15</span>
                    <span>16</span><span>17</span><span>18</span><span>19</span><span>20</span><span>21</span><span>22</span>
                    <span>23</span><span>24</span><span>25</span><span>26</span><span>27</span><span>28</span><span>29</span>
                    <span>31</span><span className="mute">1</span><span className="mute">2</span><span className="mute">3</span><span className="mute">4</span><span className="mute">5</span><span className="mute">6</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
