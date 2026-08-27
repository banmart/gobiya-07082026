/* Site navigation.
 *
 * The header is two rows. The top row is the short institutional set — the
 * pages a visitor reads to decide whether to trust us — plus the one CTA. The
 * second row is the practice: the six disciplines we sell, each opening onto
 * the pages that belong to it, then the coverage page.
 *
 * Every href here has to resolve to a real route. Services live under
 * /services/<slug> (see lib/serviceIndex.js) and solutions under
 * /solutions/<slug> (lib/solutions.js).
 */

export const TOP_NAV = [
  { label: 'Work', href: '/work' },
  { label: 'Insights', href: '/insights' },
  { label: 'About', href: '/about' },
];

// The header CTA, in one place: it appears in the top row, in the mobile menu
// and in the footer, and the three drifting apart is how a site ends up with
// two different names for the same thing.
export const HEADER_CTA = { label: 'Book a diagnostic', href: '?onboarding=true' };

export const PRACTICE_NAV = [
  {
    label: 'Technical SEO',
    href: '/services/technical-seo',
    items: [
      { label: 'Technical SEO overview', href: '/services/technical-seo' },
      { label: 'Traffic dropped, rankings flat', href: '/solutions/traffic-dropped-rankings-flat' },
      { label: 'Site is slow, losing leads', href: '/solutions/site-is-slow-losing-leads' },
      { label: 'Free site scan', href: '/free-site-scan' },
    ],
  },
  {
    label: 'AI Search & GEO',
    href: '/services/geo',
    items: [
      { label: 'AI search (GEO) overview', href: '/services/geo' },
      { label: 'Not showing up in ChatGPT', href: '/solutions/not-showing-up-in-chatgpt' },
      { label: 'AI systems & consulting', href: '/services/ai-consulting' },
      { label: 'MCP server for AI agents', href: '/mcp' },
    ],
  },
  {
    label: 'Content',
    href: '/services/content-marketing',
    items: [
      { label: 'Content marketing overview', href: '/services/content-marketing' },
      { label: 'Insights knowledge base', href: '/insights' },
      { label: 'Search & AI glossary', href: '/glossary' },
      { label: 'SEO myth or fact', href: '/seo-myths' },
    ],
  },
  {
    label: 'Digital PR',
    href: '/services/link-building',
    items: [
      { label: 'Digital PR & link building', href: '/services/link-building' },
      { label: 'Client work', href: '/work' },
    ],
  },
  {
    label: 'PPC',
    href: '/services/ppc',
    items: [
      { label: 'PPC & lead generation', href: '/services/ppc' },
      { label: 'Conversion rate optimization', href: '/services/cro' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },
  {
    label: 'Web Development',
    href: '/services/web-dev',
    items: [
      { label: 'Web design & development', href: '/services/web-dev' },
      { label: 'Web UX & interface design', href: '/services/web-ux' },
      { label: 'Our process', href: '/process' },
    ],
  },
  {
    label: 'Areas we serve',
    href: '/areas-we-serve',
    items: null,
  },
];

export const FOOTER_NAV = [
  {
    heading: 'Services',
    items: [
      { label: 'Technical SEO', href: '/services/technical-seo' },
      { label: 'AI search (GEO)', href: '/services/geo' },
      { label: 'Content marketing', href: '/services/content-marketing' },
      { label: 'Digital PR', href: '/services/link-building' },
      { label: 'PPC', href: '/services/ppc' },
      { label: 'Web development', href: '/services/web-dev' },
    ],
  },
  {
    heading: 'Practice',
    items: [
      { label: 'All services', href: '/services' },
      { label: 'Work', href: '/work' },
      { label: 'Areas we serve', href: '/areas-we-serve' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    heading: 'Resources',
    items: [
      { label: 'Insights', href: '/insights' },
      { label: 'Glossary', href: '/glossary' },
      { label: 'Solutions', href: '/solutions' },
      { label: 'SEO myths', href: '/seo-myths' },
      { label: 'Free tools', href: '/tools' },
    ],
  },
];

export const CONTACT = {
  phone: '323-744-1338',
  phoneHref: 'tel:+13237441338',
  email: 'hello@gobiya.com',
  address1: '3580 Wilshire Blvd, Ste 132',
  address2: 'Los Angeles, CA 90010',
  region: 'Serving Southern California',
  hoursDays: 'Monday – Friday',
  hoursTime: '09:00 – 17:00 PT',
  linkedin: 'https://www.linkedin.com/in/stevemartingobiya/',
  twitter: 'https://x.com/SteveMarti66556',
  facebook: 'https://www.facebook.com/people/Gobiya/100064043744190/',
  yelp: 'https://m.yelp.com/biz/gobiya-los-angeles-5',
};
