// Shared navigation structure — used by the desktop dropdown nav and the mobile menu.
// `built: true` marks routes that actually exist; unbuilt routes are left in the
// structure intentionally (this is the full target IA) but won't resolve yet.

export const NAV_ITEMS = [
  {
    label: 'Consulting',
    href: '/services',
    built: true,
    groups: [
      {
        group: 'Performance',
        items: [
          { label: 'SEO Services', href: '/seo-services', built: true },
          { label: 'Web & App Development', href: '/services/web-app-development', built: true },
          { label: 'PPC Management Services', href: '/ppc-management-services', built: true },
          { label: 'CRO & UX Analysis', href: '/services/cro-ux', built: true },
          { label: 'AI & LLM Systems Consulting', href: '/services/ai-llm-consulting', built: true },
        ],
      },
      {
        group: 'Creativity',
        items: [
          { label: 'Content Marketing Services', href: '/content-marketing-services', built: true },
          { label: 'GEO Services', href: '/geo-services', built: true },
        ],
      },
      {
        group: 'Relations',
        items: [
          { label: 'Digital PR & Link Building', href: '/services/authority-link-building', built: true },
        ],
      },
    ],
  },
  {
    label: 'Outcomes',
    href: '/outcomes',
    built: true,
    groups: [
      {
        items: [
          { label: 'Traffic', href: '/outcomes/traffic', built: true },
          { label: 'Rankings', href: '/outcomes/rankings', built: true },
          { label: 'Sales', href: '/outcomes/sales', built: true },
          { label: 'Google Penalty Recovery', href: '/outcomes/recovery', built: true },
        ],
      },
    ],
  },
  { label: 'AI Visibility', href: '/ai-visibility', built: true },
  {
    label: 'Industries',
    href: '/industries',
    built: true,
    groups: [
      {
        items: [
          { label: 'Enterprise & B2B', href: '/industries/enterprise-b2b', built: true },
          { label: 'Local Service Business', href: '/industries/local-service', built: true },
          { label: 'Healthcare & Dental', href: '/industries/healthcare', built: true },
          { label: 'Professional Services', href: '/industries/professional-services', built: true },
        ],
      },
    ],
  },
  { label: 'Tools', href: '/tools', built: true },
  {
    label: 'About',
    href: '/about',
    built: true,
    groups: [
      {
        items: [
          { label: 'Company', href: '/about', built: true },
          { label: 'Steve Martin', href: '/about/steve-martin', built: true },
          { label: 'Approach', href: '/about/approach', built: true },
          { label: 'Work', href: '/work', built: true },
        ],
      },
    ],
  },
  { label: 'Insights', href: '/insights', built: true },
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
