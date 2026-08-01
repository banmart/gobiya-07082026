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
          { title: 'AI & LLM Consulting', href: '/services/ai-consulting', desc: 'Put AI to work inside the business, not just in the marketing.' },
        ],
      },
      {
        heading: 'CONTENT & LEAD ACQUISITION',
        icon: 'clipboard',
        items: [
          { title: 'Content Strategy', href: '/services/content-marketing', desc: 'Publish high-intent content built to capture active buyers.' },
          { title: 'Authority Link Building', href: '/services/link-building', desc: 'High-authority editorial mentions and link acquisition.' },
          { title: 'All Services', href: '/services', desc: 'Every service in one place, with what each one actually covers.' },
        ],
      },
      {
        heading: 'CONVERSION, ADS & BUILD',
        icon: 'briefcase',
        items: [
          { title: 'PPC Management', href: '/services/ppc', desc: 'High-ROI Google Ads and conversion funnel management.' },
          { title: 'CRO & Web UX', href: '/services/cro', desc: 'Turn existing site traffic into qualified leads.' },
          { title: 'Web & App Development', href: '/services/web-dev', desc: 'Sites built with SEO in from day one, not bolted on later.' },
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
          { title: 'Free Tools Hub', href: '/tools', desc: 'All eight checks in one place — DNS, SSL, reputation and more.' },
          { title: 'Free Site Scan', href: '/free-site-scan', desc: 'A real report on your site, emailed to you. No cost, no obligation.', badge: 'Popular' },
          { title: 'Domain Lookup', href: '/tools/domain-lookup', desc: 'Registration, ownership and history for any domain.' },
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
    // Renamed from Industries. The columns now point at the case studies that
    // actually exist in lib/work.js rather than sending four of six links back
    // to /services, which is what the industry framing had been doing.
    columns: [
      {
        heading: 'HEALTHCARE & PROFESSIONAL',
        icon: 'user',
        items: [
          { title: 'SmileCenter.com', href: '/work/smile-center-dentistry', desc: 'Four dental offices that read as one. Now each ranks on its own.', badge: 'Popular' },
          { title: 'The Healing Metta', href: '/work/the-healing-metta', desc: 'Wellness practice built for local search from the ground up.' },
          { title: 'MyTrustWills.com', href: '/work/mtw', desc: 'Estate planning, made findable for the people already looking.' },
        ],
      },
      {
        heading: 'HOME & FIELD SERVICES',
        icon: 'clipboard',
        items: [
          { title: 'RemodelMePros.com', href: '/work/remodel-me-pros', desc: 'Contractor marketplace competing against national directories.' },
          { title: 'DG Plumbing & Rooter', href: '/work/dg-plumbing', desc: 'Emergency plumbing, won on the searches that convert same-day.' },
          { title: 'Safety-Centric.com', href: '/work/safetycentric', desc: 'Commercial security integrator across LA and Orange County.' },
        ],
      },
      {
        heading: 'B2B & COMPLIANCE',
        icon: 'briefcase',
        items: [
          { title: 'American Livescan', href: '/work/american-livescan', desc: 'Same ad budget, roughly three times the appointments.' },
          { title: 'TotalCapitalInc.com', href: '/work/total-capital', desc: 'Commercial lending, ranked against far larger competitors.' },
          { title: 'All Case Studies', href: '/work', desc: 'Every engagement, with the numbers behind it.' },
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
