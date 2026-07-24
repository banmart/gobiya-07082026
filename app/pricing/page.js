import HeroQuickForm from '../../components/HeroQuickForm';
import { buildMetadata } from '../../lib/meta';
import TopicMarquee from '../../components/TopicMarquee';

export const metadata = buildMetadata({
  title: 'Pricing — Gobiya Marketing Packages',
  description:
    'Gobiya pricing, in plain English. Three simple packages — Findable, Cited, and Chosen — cover everything from showing up in Google to getting recommended by ChatGPT. See what each one includes.',
  path: '/pricing',
});

const TIERS = [
  {
    name: 'Findable',
    price: '$999–$2,500',
    unit: '/mo',
    bestFor: 'You want your business to actually show up when people search for you.',
    features: [
      { label: 'Fix the technical problems keeping Google from finding your site', href: '/seo-services' },
      { label: 'Clear, helpful writing for your homepage and service pages', href: '/content-marketing-services' },
      { label: 'Make sure your name, address, and phone number match everywhere online', href: '/seo-services' },
      { label: 'A simple monthly report showing what changed and why', href: '/seo-services' },
    ],
  },
  {
    name: 'Cited',
    price: '$3,500–$8,500',
    unit: '/mo',
    featured: true,
    badge: 'Most Popular',
    bestFor: "You're already showing up in Google, and you want tools like ChatGPT to start recommending you too.",
    features: [
      { label: 'Everything in Findable, plus:' },
      { label: 'Content written so ChatGPT and Google’s AI answers actually quote your business', href: '/geo-services' },
      { label: 'Regular articles and guides that answer questions your customers are already asking', href: '/content-marketing-services' },
      { label: 'Getting other trusted websites and reporters to write about — and link to — your business', href: '/services/authority-link-building' },
      { label: 'A regular check on whether AI tools are actually mentioning your brand', href: '/ai-visibility' },
    ],
  },
  {
    name: 'Chosen',
    price: '$8,500–$25,000+',
    unit: '/mo',
    bestFor: "You're ready to run ads, fine-tune your website, and get every part of your marketing working toward one thing: more customers choosing you.",
    features: [
      { label: 'Everything in Cited, plus:' },
      { label: 'Google Ads managed so you’re not paying for clicks that never turn into customers', href: '/ppc-management-services' },
      { label: 'Ongoing tests and small changes to your site that turn more visitors into customers', href: '/services/cro-ux' },
      { label: 'Straight answers on which AI tools are actually worth using for your business', href: '/services/ai-llm-consulting' },
      { label: 'A dedicated person on our team who knows your account and answers fast' },
    ],
  },
];

const ADDONS = [
  {
    name: 'A New Website',
    price: 'Starting at $3,500',
    note: 'a one-time project, not a monthly fee',
    href: '/services/web-app-development',
  },
  {
    name: 'Getting Other Sites to Link to You',
    price: 'From $750/mo',
    note: 'add this to the Findable plan — it’s already included from Cited up',
    href: '/services/authority-link-building',
  },
  {
    name: 'Website Testing & Fixes',
    price: 'From $1,200/mo',
    note: 'add this to Findable or Cited — it’s already included in Chosen',
    href: '/services/cro-ux',
  },
  {
    name: 'AI Strategy Advice',
    price: 'Starting at $2,500',
    note: 'a one-time project — add this to Findable or Cited, or it’s included in Chosen',
    href: '/services/ai-llm-consulting',
  },
  {
    name: 'Google Ads Management',
    price: 'From $1,000/mo + ad spend',
    note: 'add this to Findable or Cited — it’s already included in Chosen',
    href: '/ppc-management-services',
  },
];

export default function PricingPage() {
  return (
    <main id="top">

      <section className="page-hero page-hero--left section" style={{ paddingBottom: '3rem' }}>
        <div className="container seo-hero__grid">
          <div>
            <p className="eyebrow" data-reveal><span className="eyebrow__dot"></span>Pricing</p>
            <h1 className="statement" style={{ textAlign: 'left', marginInline: 0 }} data-split>Simple pricing, built around your business.</h1>
            <p className="lede" style={{ marginInline: 0 }} data-reveal>We offer three plans that cover everything a business needs to be found, trusted, and chosen online — showing up in Google, getting recommended by AI tools like ChatGPT, running ads, and building a site people actually want to use. Pick the plan that fits where you are today, or add a single service below.</p>
          </div>
          <div>
            <HeroQuickForm />
          </div>
        </div>
      </section>
      <TopicMarquee topics={["SEO", "GEO & AI Visibility", "Content Marketing", "Digital PR", "PPC", "Web Development"]} />

      <section className="section" id="tiers">
        <div className="container">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>Monthly plans</p>
          <h2 className="statement statement--small" data-split style={{ textAlign: 'center' }}>Pick the plan that matches where your business is today.</h2>
          <div className="pricing-grid">
            {TIERS.map((t) => (
              <div className={`pricing-card${t.featured ? ' pricing-card--featured' : ''}`} key={t.name} data-reveal>
                {t.badge && <span className="pricing-card__badge">{t.badge}</span>}
                <h3 className="pricing-card__name">{t.name}</h3>
                <p className="pricing-card__price">{t.price}<span className="pricing-card__unit">{t.unit}</span></p>
                <p className="pricing-card__best-for">{t.bestFor}</p>
                <ul className="pricing-card__features">
                  {t.features.map((f, i) => (
                    <li key={i}>{f.href ? <a href={f.href}>{f.label}</a> : f.label}</li>
                  ))}
                </ul>
                <a href="/onboarding" className={`btn ${t.featured ? 'btn--ghost-light' : 'btn--ghost'} btn--big`}>Get started</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tint" id="addons">
        <div className="container container--narrow">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>Add-ons</p>
          <h2 className="statement statement--small" data-reveal style={{ textAlign: 'center', marginBottom: '2.5rem' }}>Just need one thing? Add it on its own.</h2>
          <div className="addon-table" data-reveal>
            {ADDONS.map((a) => (
              <a className="addon-row" href={a.href} key={a.name}>
                <span className="addon-row__name">{a.name}</span>
                <span className="addon-row__price">{a.price}</span>
                <span className="addon-row__note">{a.note}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="faq section" id="faq">
        <div className="container container--narrow">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>Common questions</p>
          <h2 className="statement statement--small" data-reveal style={{ marginBottom: '3rem' }}>
            Pricing, plainly explained.
          </h2>
          <dl className="faq__list">
            <div className="faq__item" data-reveal>
              <dt>Are these monthly plans, or one-time projects?</dt>
              <dd>Findable, Cited, and Chosen are monthly plans — we keep working on your business every month. Building a new website is different: that&apos;s a one-time project with its own price, since we build it once instead of every month. AI strategy advice can go either way, depending on what you need.</dd>
            </div>
            <div className="faq__item" data-reveal>
              <dt>How do you decide where I fall within a price range?</dt>
              <dd>It comes down to things like how competitive your industry is, how big your website is, and how much writing and outreach your plan needs. We give you one exact number after we&apos;ve actually looked at your site — never before. Want to see the full breakdown? Read our <a href="/insights/how-much-does-seo-cost">guide on what marketing like this really costs</a>.</dd>
            </div>
            <div className="faq__item" data-reveal>
              <dt>Am I locked into a long contract?</dt>
              <dd>No. Growing your business online takes a little time to show up, so we ask for a few months upfront — but after that, you can stay month-to-month for as long as it&apos;s working for you.</dd>
            </div>
            <div className="faq__item" data-reveal>
              <dt>What if none of these plans quite fit my business?</dt>
              <dd>That&apos;s normal — most businesses don&apos;t fit a plan perfectly, and that&apos;s exactly what the add-ons above are for. We&apos;ll also adjust what&apos;s included in your plan to match what you actually need. <a href="/onboarding">Book a call</a> and we&apos;ll figure it out together.</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="cta section section--tint" id="contact">
        <div className="container container--narrow">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>Start a conversation</p>
          <h2 className="cta__title" data-split>Not sure which package fits?</h2>
          <div className="cta__actions" data-reveal>
            <a href="/onboarding" className="btn btn--solid btn--big">Book a strategy call</a>
            <a href="tel:+13237441338" className="btn btn--ghost btn--big">323-744-1338</a>
          </div>
        </div>
      </section>

    </main>
  );
}
