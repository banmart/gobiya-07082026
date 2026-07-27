import Image from 'next/image';
import { buildMetadata } from '../lib/meta';

export const metadata = buildMetadata({
  title: 'Gobiya SEO Consultants Los Angeles',
  description:
    'We are an independent Web AI & SEO consulting firm specializing in the optimization and rankings of small and medium-sized businesses.',
  path: '/',
});

const CLIENT_LOGOS = [
  { src: '/assets/img/americanlivescan.webp', alt: 'American Livescan' },
  { src: '/assets/img/smilecenter.webp', alt: 'SmileCenter.com' },
  { src: '/assets/img/totalcapital.webp', alt: 'TotalCapitalInc.Com' },
  { src: '/assets/img/remodelmepros.webp', alt: 'RemodelMePros.com' },
  { src: '/assets/img/safetycentric-logo.png', alt: 'Safety-Centric.com' },
  { src: '/assets/img/dgplumbing-logo.webp', alt: 'DGPlumbingandRooter.com' },
];

export default function Home() {
  return (
    <main id="top">

      {/* ══ 1. Top Announcement Bar ══ */}
      <div className="mw-topbar">
        <div className="container mw-topbar__inner">
          <span className="mw-topbar__text">
            Search &amp; AI Visibility – They say ranking a business is an art – we&apos;ve turned it into a science
          </span>
          <a href="/onboarding" className="mw-topbar__btn">
            Schedule a Consultation
          </a>
        </div>
      </div>

      {/* ══ 2. Hero with Floating White Card ══ */}
      <section
        className="mw-hero"
        style={{ backgroundImage: `url('/assets/img/office-collage-montage.webp')` }}
      >
        <div className="mw-hero__overlay" />
        <div className="container">
          <div className="mw-hero__card">
            <h1 className="mw-hero__title">Web AI &amp; SEO Experts</h1>
            <p className="mw-hero__excerpt">
              We&apos;re an independent Web AI &amp; SEO consulting firm specializing in the optimization and rankings of small and medium-sized businesses.
            </p>
            <a href="#process" className="mw-hero__btn">
              View Our Process
            </a>
          </div>
        </div>
      </section>

      {/* ══ 3. Trust Bar / Client Logo Strip ══ */}
      <section className="mw-trust">
        <div className="container">
          <h2 className="mw-trust__heading">
            The SEO Firm Trusted by Hundreds of Entrepreneurs
          </h2>
          <div className="mw-trust__logos">
            {CLIENT_LOGOS.map((logo, idx) => (
              <div key={idx} className="mw-trust__logo-item">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={180}
                  height={65}
                  style={{ objectFit: 'contain', maxHeight: '55px', width: 'auto' }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solid Navy Divider Line */}
      <div className="mw-navy-divider" />

      {/* ══ 4. "Digital Growth is Complicated – We Make it Simple" ══ */}
      <section className="mw-simple">
        <div className="container">
          <h2 className="mw-simple__heading">
            Digital Growth is Complicated – <em>We Make it Simple</em>
          </h2>
          <p className="mw-simple__intro">
            We have invested over a decade honing the <em>Gobiya 4-Step Method</em> for scaling search visibility. This documented framework has been refined over hundreds of successful campaigns and provides you with proven steps to minimize risk and maximize qualified leads.
          </p>

          <div className="mw-simple__grid">
            <div>
              <h3 className="mw-simple__col-title">A Tailored Approach</h3>
              <p className="mw-simple__col-desc">
                There&apos;s only one business in the world like yours – work with a team that gives you individual attention. We customize our process based on your needs and the size, industry, and type of business.
              </p>
            </div>
            <div>
              <h3 className="mw-simple__col-title">No Long-Term Contracts</h3>
              <p className="mw-simple__col-desc">
                Grow now or scale later – unlike traditional SEO agencies, Gobiya requires no long-term commitments. We&apos;re here to earn your business every single month through clear, measurable results.
              </p>
            </div>
            <div>
              <h3 className="mw-simple__col-title">Full Transparency &amp; Security</h3>
              <p className="mw-simple__col-desc">
                Transparency and account safety are paramount to a successful partnership. We strategically track and report your site performance in real-time, giving you full control as your lead volume expands.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 5. By the Numbers Banner ══ */}
      <section className="mw-stats">
        <div className="container">
          <div className="mw-stats__grid">
            <div>
              <div className="mw-stats__num">15+</div>
              <div className="mw-stats__label">Years Experience</div>
            </div>
            <div>
              <div className="mw-stats__num">500+</div>
              <div className="mw-stats__label">SEO &amp; AI Scans</div>
            </div>
            <div>
              <div className="mw-stats__num">Top 1%</div>
              <div className="mw-stats__label">AI Search Visibility</div>
            </div>
            <div>
              <div className="mw-stats__num">1</div>
              <div className="mw-stats__label">Goal: Scale Your Business</div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 6. Meet Your Point Person ══ */}
      <section className="mw-person">
        <div className="container">
          <h2 className="mw-person__heading">Meet Your Point Person</h2>

          <div className="mw-person__card">
            <Image
              src="/assets/img/steve-martin-headshot.webp"
              alt="Steve Martin"
              width={120}
              height={120}
              className="mw-person__avatar"
            />
            <div>
              <h3 className="mw-person__name">Steve Martin</h3>
              <p className="mw-person__role">Founder and Head of Search Strategy</p>
              <p className="mw-person__bio">
                Steve founded Gobiya in 2010 and is an active practitioner in technical search engine optimization, content strategy, and AI search systems. He has over 15 years of experience helping small and medium-sized businesses dominate Google, ChatGPT, and Perplexity search results. Steve manages sell-side search strategies and leads every client account directly.
              </p>
            </div>
          </div>

          <div className="mw-person__btn-wrap">
            <a href="/about/steve-martin" className="mw-person__btn">
              See Our Full Team
            </a>
          </div>
        </div>
      </section>

      {/* ══ 7. Full-Width Navy Banner ══ */}
      <section className="mw-navy-banner">
        <div className="container">
          <h2 className="mw-navy-banner__title">
            Go with a team of experts whose only specialty is growing your business
          </h2>
          <a href="/onboarding" className="mw-navy-banner__btn">
            Schedule a Consultation
          </a>
        </div>
      </section>

      {/* ══ 8. The 4-Step Method Section ══ */}
      <section className="mw-steps" id="process">
        <div className="container">
          <p className="mw-steps__sub">Our Proven Approach</p>
          <h2 className="mw-steps__heading">The Gobiya 4-Step Method</h2>
          <p className="mw-steps__dek">
            We&apos;ve spent over a decade perfecting the process of scaling search and AI rankings. Here&apos;s the result:
          </p>

          <div className="mw-steps__grid">
            <div className="mw-step-card">
              <div className="mw-step-card__header">Step 1: Assess</div>
              <p className="mw-step-card__desc">
                Our technical scan helps you determine if your site is findable by Google and AI tools, and what exact steps to take before launching your growth campaign.
              </p>
            </div>
            <div className="mw-step-card">
              <div className="mw-step-card__header">Step 2: Prepare</div>
              <p className="mw-step-card__desc">
                Once we begin, we clean up hidden code errors, optimize your site architecture, and package your company content for optimal presentation.
              </p>
            </div>
            <div className="mw-step-card">
              <div className="mw-step-card__header">Step 3: Market</div>
              <p className="mw-step-card__desc">
                We develop and execute a strategic search &amp; AI marketing campaign focused on placing your business directly in front of high-intent buyers.
              </p>
            </div>
            <div className="mw-step-card">
              <div className="mw-step-card__header">Step 4: Scale</div>
              <p className="mw-step-card__desc">
                We&apos;re with you every step of the way until your search leads clear, providing continuous optimization and guidance throughout the process.
              </p>
            </div>
          </div>

          <div className="mw-steps__btn-wrap">
            <a href="/about/approach" className="mw-steps__btn">
              View Our Proprietary Process for Business Growth
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
