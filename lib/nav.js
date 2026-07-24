// Primary nav — a flat 7 items, no dropdowns. Every other route in the site's
// IA lives in SECONDARY_NAV instead, which the footer renders as columns and
// the mobile menu renders as a "more" section below the primary 7 — so
// trimming the header to 7 items never actually hides a route.

export const NAV_ITEMS = [
  { label: 'SEO', href: '/seo-services', built: true },
  { label: 'Web Design', href: '/services/web-app-development', built: true },
  { label: 'PPC', href: '/ppc-management-services', built: true },
  { label: 'Content', href: '/content-marketing-services', built: true },
  { label: 'GEO', href: '/geo-services', built: true },
  { label: 'AI', href: '/ai-visibility', built: true },
  { label: 'Work', href: '/work', built: true },
  { label: 'About', href: '/about', built: true },
];

export const SECONDARY_NAV = [
  {
    heading: 'Firm',
    items: [
      { label: 'Steve Martin', href: '/about/steve-martin' },
      { label: 'Our Approach', href: '/about/approach' },
      { label: 'Work', href: '/work' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Insights', href: '/insights' },
    ],
  },
  {
    heading: 'Resources',
    items: [
      { label: 'CRO & UX Analysis', href: '/services/cro-ux' },
      { label: 'AI & LLM Systems Consulting', href: '/services/ai-llm-consulting' },
      { label: 'Digital PR & Link Building', href: '/services/authority-link-building' },
      { label: 'Free SEO Tools', href: '/tools' },
      { label: 'MCP Server', href: '/mcp' },
    ],
  },
];

export const CONTACT = {
  phone: '323-744-1338',
  phoneHref: 'tel:+13237441338',
  email: 'hello@gobiya.com',
  address1: '3580 Wilshire Blvd, Ste 132',
  address2: 'Los Angeles, CA 90010',
  linkedin: 'https://www.linkedin.com/in/stevemartingobiya/',
  twitter: 'https://x.com/SteveMarti66556',
  facebook: 'https://www.facebook.com/people/Gobiya/100064043744190/',
  yelp: 'https://m.yelp.com/biz/gobiya-los-angeles-5',
};
