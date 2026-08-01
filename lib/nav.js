import { AREAS } from './areas';

// The city pages, split into three even mega-menu columns.
const AREA_COLUMN_HEADINGS = ['SAN FERNANDO VALLEY & NORTH', 'CENTRAL & EASTSIDE', 'LOS ANGELES PROPER'];
const AREA_COLUMN_ICONS = ['user', 'clipboard', 'briefcase'];
const AREA_COLUMNS = AREA_COLUMN_HEADINGS.map((heading, i) => ({
  heading,
  icon: AREA_COLUMN_ICONS[i],
  items: AREAS.filter((_, idx) => idx % 3 === i).map((area) => ({
    title: area.name,
    href: `/areas-we-serve/${area.slug}`,
    desc: area.excerpt,
  })),
}));

export const MEGA_NAV = [
  {
    label: 'Services',
    href: '/services',
    columns: [
      {
        heading: 'SEARCH & AI OPTIMIZATION',
        icon: 'user',
        items: [
          { title: 'Local & Technical SEO', href: '/services/seo', desc: 'Fix backend code errors and rank #1 on Google Maps and organic search.', badge: 'Popular' },
          { title: 'AI & GEO Search', href: '/services/geo', desc: 'Get cited and recommended directly by ChatGPT and Perplexity AI.' },
        ],
      },
      {
        heading: 'CONTENT & LEAD ACQUISITION',
        icon: 'clipboard',
        items: [
          { title: 'Content Strategy', href: '/services/content-marketing', desc: 'Publish high-intent content built to capture active buyers.' },
          { title: 'Authority Link Building', href: '/services/link-building', desc: 'High-authority editorial mentions and link acquisition.' },
        ],
      },
      {
        heading: 'CONVERSION & PAID ADS',
        icon: 'briefcase',
        items: [
          { title: 'PPC Management', href: '/services/ppc', desc: 'High-ROI Google Ads and conversion funnel management.' },
          { title: 'CRO & Web UX', href: '/services/cro', desc: 'Turn existing site traffic into qualified leads.' },
        ],
      },
    ],
  },
  {
    label: 'Resources',
    href: '/insights',
    columns: [
      {
        heading: 'KNOWLEDGE & GUIDES',
        icon: 'user',
        items: [
          { title: 'Knowledge Base', href: '/insights', desc: 'In-depth analysis on modern SEO, AI visibility, and digital growth.' },
          { title: 'Glossary', href: '/glossary', desc: '75+ comprehensive definitions of search and AI terms.' },
        ],
      },
      {
        heading: 'INTERACTIVE & AI',
        icon: 'clipboard',
        items: [
          { title: 'SEO Myths Game', href: '/seo-myths', desc: 'Interactive breakdown of outdated search tactics.' },
          { title: 'AI Visibility Guide', href: '/insights/what-is-generative-engine-optimization', desc: 'Complete guide to generative engine optimization.', badge: 'Popular' },
          { title: 'Video Stuff', href: '/stuff', desc: 'WebM video vault and media asset library.', badge: 'New' },
        ],
      },
      {
        heading: 'DIAGNOSTIC SUITE',
        icon: 'briefcase',
        items: [
          { title: 'Free Tools Hub', href: '/tools', desc: 'Instant DNS, SSL, IP geolocation, and domain reputation checks.' },
        ],
      },
    ],
  },
  {
    label: 'Areas We Serve',
    href: '/areas-we-serve',
    // Columns are generated from lib/areas.js so adding a city page cannot
    // leave the menu behind — the same reason the sitemap reads that file.
    columns: AREA_COLUMNS,
  },
  {
    label: 'About',
    href: '/about',
    columns: [
      {
        heading: 'COMPANY OVERVIEW',
        icon: 'user',
        items: [
          { title: 'What We Do', href: '/about', desc: 'Fourteen years of search engineering and algorithm recovery.' },
          { title: 'Leadership', href: '/about/steve-martin', desc: 'Founder and Head of Search Strategy.' },
        ],
      },
      {
        heading: 'SECURITY & TRANSPARENCY',
        icon: 'clipboard',
        items: [
          { title: 'Confidentiality & Security', href: '/about/approach', desc: 'Our commitment to data privacy and client protection.', badge: 'Popular' },
          { title: 'AI MCP API', href: '/mcp', desc: 'Model Context Protocol server for AI agent integration.' },
        ],
      },
      {
        heading: 'GET IN TOUCH',
        icon: 'briefcase',
        items: [
          { title: 'Contact Us', href: '/contact', desc: 'Email or call directly — Steve answers both himself.' },
          { title: 'Areas Served', href: '/areas-we-serve', desc: 'Los Angeles neighborhoods and cities we actively serve.', badge: 'New' },
        ],
      },
    ],
  },
  {
    label: 'Work',
    href: '/work',
    columns: [
      {
        heading: 'PROFESSIONAL SERVICES',
        icon: 'user',
        items: [
          { title: 'Legal & Professional Services', href: '/services', desc: 'Law firms, financial advisors, and corporate services.' },
        ],
      },
      {
        heading: 'HEALTHCARE & CONTRACTORS',
        icon: 'clipboard',
        items: [
          { title: 'Healthcare & Dental', href: '/work/smile-center-dentistry', desc: 'Multi-location dental practices and medical clinics.', badge: 'Popular' },
          { title: 'Home & Building Services', href: '/work/remodel-me-pros', desc: 'General contractors, roofers, and home service marketplaces.' },
        ],
      },
      {
        heading: 'B2B & ENTERPRISE',
        icon: 'briefcase',
        items: [
          { title: 'B2B & E-Commerce', href: '/services', desc: 'Scalable web architecture for enterprise distributors and retailers.' },
        ],
      },
    ],
  },
];

export const NAV_ITEMS = [
  { label: 'Services', href: '/services' },
  { label: 'Resources', href: '/insights' },
  { label: 'Areas We Serve', href: '/areas-we-serve' },
  { label: 'About', href: '/about' },
  { label: 'Work', href: '/work' },
];

export const SECONDARY_NAV = [
  {
    heading: 'Firm',
    items: [
      { label: 'Steve Martin', href: '/about/steve-martin' },
      { label: 'Our Approach', href: '/#process' },
      { label: 'Work', href: '/work' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Insights', href: '/insights' },
    ],
  },
  {
    heading: 'Resources',
    items: [
      { label: 'CRO & UX Analysis', href: '/services/cro' },
      { label: 'AI & LLM Systems Consulting', href: '/services/ai-consulting' },
      { label: 'Digital PR & Link Building', href: '/services/link-building' },
      { label: 'Free SEO Tools', href: '/tools' },
      { label: 'SEO Myth or Fact', href: '/seo-myths' },
      { label: 'Video Stuff', href: '/stuff' },
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
