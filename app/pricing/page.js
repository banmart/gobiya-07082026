import HeroQuickForm from '../../components/HeroQuickForm';
import { buildMetadata } from '../../lib/meta';
import TopicMarquee from '../../components/TopicMarquee';
import Chapter from '../../components/sections/Chapter';

export const metadata = buildMetadata({
  title: 'Los Angeles SEO Services Pricing & Packages | Gobiya',
  description:
    'Clear, transparent pricing for Los Angeles SEO services, web development, PPC ad management, and AI visibility programs. Packages from $999/mo.',
  path: '/pricing',
});

const TIERS = [
  {
    name: 'Findable',
    price: '$999–$2,500',
    unit: '/mo',
    bestFor: 'You want your business to actually show up when people search for you in Los Angeles.',
    features: [
      { label: 'Fix technical problems keeping Google from finding your site', href: '/seo-services-los-angeles' },
      { label: 'Clear, helpful writing for your homepage and service pages', href: '/content-marketing-services-los-angeles' },
      { label: 'Make sure your name, address, and phone number match everywhere online', href: '/seo-services-los-angeles' },
      { label: 'A simple monthly report showing what changed and why', href: '/seo-services-los-angeles' },
    ],
  },
  {
    name: 'Cited',
    price: '$2,500–$5,500',
    unit: '/mo',
    featured: true,
    badge: 'Most Popular',
    bestFor: "You're already showing up in Google, and you want tools like ChatGPT to start recommending you too.",
    features: [
      { label: 'Everything in Findable, plus:' },
      { label: 'Content written so ChatGPT and Google’s AI answers actually quote your business', href: '/geo-services-los-angeles' },
      { label: 'Regular articles and guides that answer questions your customers are already asking', href: '/content-marketing-services-los-angeles' },
      { label: 'Getting other trusted websites and reporters to write about — and link to — your business', href: '/link-building-services-los-angeles' },
      { label: 'A regular check on whether AI tools are actually mentioning your brand', href: '/ai-visibility' },
    ],
  },
  {
    name: 'Chosen',
    price: '$5,500–$10,000+',
    unit: '/mo',
    bestFor: "You're ready to run ads, fine-tune your website, and get every part of your marketing working toward one thing: more customers choosing you.",
    features: [
      { label: 'Everything in Cited, plus:' },
      { label: 'Google Ads managed so you’re not paying for clicks that never turn into customers', href: '/ppc-management-services-los-angeles' },
      { label: 'Ongoing tests and small changes to your site that turn more visitors into customers', href: '/cro-ux-services-los-angeles' },
      { label: 'Straight answers on which AI tools are actually worth using for your business', href: '/ai-consulting-services-los-angeles' },
      { label: 'A dedicated person on our team who knows your account and answers fast' },
    ],
  },
];

const ADDONS = [
  {
    name: 'A New Website',
    price: 'Starting at $2,500',
    note: 'a one-time project, not a monthly fee',
    href: '/web-development-services-los-angeles',
  },
  {
    name: 'Getting Other Sites to Link to You',
    price: 'From $750/mo',
    note: 'add this to the Findable plan — it’s already included from Cited up',
    href: '/link-building-services-los-angeles',
  },
  {
    name: 'Website Testing & Fixes',
    price: 'From $1,200/mo',
    note: 'add this to Findable or Cited — it’s already included in Chosen',
    href: '/cro-ux-services-los-angeles',
  },
  {
    name: 'AI Strategy Advice',
    price: 'Starting at $2,500',
    note: 'a one-time project — add this to Findable or Cited, or it’s included in Chosen',
    href: '/ai-consulting-services-los-angeles',
  },
  {
    name: 'Google Ads Management',
    price: 'From $1,000/mo + ad spend',
    note: 'add this to Findable or Cited — it’s already included in Chosen',
    href: '/ppc-management-services-los-angeles',
  },
];

export default function PricingPage() {
  return (
    <main id="top">
      <section className="page-hero page-hero--left section" style={{ paddingBottom: '3rem' }}>
        <div className="container seo-hero__grid">
          <div>
            <p className="eyebrow" data-reveal><span className="eyebrow__dot"></span>Pricing · Los Angeles SEO Services</p>
            <h1 className="statement" style={{ textAlign: 'left', marginInline: 0 }} data-split>Clear Pricing for Los Angeles SEO Services</h1>
            <p className="lede" style={{ marginInline: 0 }} data-reveal>We offer three simple plans that cover everything a Los Angeles business needs to be found, trusted, and chosen online — showing up in Google, getting recommended by AI tools like ChatGPT, running ads, and building a site people actually want to use.</p>
          </div>
          <div>
            <HeroQuickForm />
          </div>
        </div>
      </section>
      <TopicMarquee topics={["Los Angeles SEO", "GEO & AI Visibility", "Content Marketing", "Digital PR", "PPC", "Web Development"]} />

      <section className="section" id="tiers">
        <div className="container">
          <Chapter n={1} label="Monthly plans" title="Pick the plan that matches where your business is today." />
          <div className="pricing-grid" data-stagger>
            {TIERS.map((t) => (
              <div className={`pricing-card${t.featured ? ' pricing-card--featured' : ''}`} key={t.name}>
                {t.badge && <span className="pricing-card__badge">{t.badge}</span>}
                <h3 className="pricing-card__name">{t.name}</h3>
                <p className="pricing-card__price">{t.price}<span className="pricing-card__unit">{t.unit}</span></p>
                <p className="pricing-card__best-for">{t.bestFor}</p>
                <ul className="pricing-card__features">
                  {t.features.map((f, i) => (
                    <li className="pricing-card__feature" key={i}>
                      <span className="pricing-card__check">✓</span>
                      {f.href ? <a href={f.href}>{f.label}</a> : f.label}
                    </li>
                  ))}
                </ul>
                <div className="pricing-card__cta">
                  <a href={`/onboarding?tier=${t.name.toLowerCase()}`} className={`btn ${t.featured ? 'btn--solid' : 'btn--ghost'}`}>
                    Get started with {t.name}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tint" id="addons">
        <div className="container">
          <Chapter n={2} label="Individual services" title="Or pick a single service to add to your plan." />
          <div className="addons-grid" data-stagger>
            {ADDONS.map((a) => (
              <a className="addon-card" href={a.href} key={a.name}>
                <div className="addon-card__body">
                  <h3 className="addon-card__name">{a.name}</h3>
                  <p className="addon-card__price">{a.price}</p>
                  <p className="addon-card__note">{a.note}</p>
                </div>
                <span className="link-arrow">
                  Learn more
                  <svg viewBox="0 0 16 16" width="14" height="14">
                    <path d="M2 8h11M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="cta section" id="contact">
        <div className="container container--narrow">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>Need a custom scope?</p>
          <h2 className="cta__title" data-split>Tell us about your goals — we&apos;ll recommend the right scope.</h2>
          <div className="cta__actions" data-reveal>
            <a href="/onboarding" className="btn btn--solid btn--big">Get a free proposal</a>
            <a href="tel:+13237441338" className="btn btn--ghost btn--big">323-744-1338</a>
          </div>
        </div>
      </section>
    </main>
  );
}
