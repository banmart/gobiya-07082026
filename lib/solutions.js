// Data index for problem-phrased solution pages (/solutions/*)
// Each solution addresses a high-intent pain point and links directly into canonical services.

export const SOLUTIONS = {
  'traffic-dropped-rankings-flat': {
    slug: 'traffic-dropped-rankings-flat',
    metaTitle: 'Traffic Dropped or Rankings Flat? Recovery & Growth Strategy | Gobiya',
    metaDescription: 'Is your website traffic stalling or dropping after a Google update? Diagnose indexing blocks, technical errors, and entity gaps to restore rankings.',
    eyebrow: 'PROBLEM-SOLVING GUIDE · ALGORITHM RECOVERY & RANKING BOUNCEBACK',
    title: 'Traffic Dropped or Rankings Flat?',
    subtitle: 'Diagnose indexing blocks, algorithmic penalties, and content decay — then rebuild authority that commands Google & AI search.',
    painPoint: 'You noticed a sudden cliff in organic traffic after a core update, or your non-brand rankings have been stuck on page 2 for months regardless of new posts.',
    diagnosis: [
      {
        title: 'Technical Crawl & Indexing Blocks',
        desc: 'Canonical loops, renders failing silently, or server delays blocking Googlebot from indexing your high-value URLs.',
        serviceLink: { title: 'Explore Technical SEO', href: '/services/technical-seo' },
      },
      {
        title: 'Content Thinness & Entity Gaps',
        desc: 'Over-optimized or repetitive copy that lacks original statistical data or direct answer density for modern search algorithms.',
        serviceLink: { title: 'Explore Content Strategy', href: '/services/content-marketing' },
      },
      {
        title: 'Loss of Domain Authority',
        desc: 'Competitors acquiring high-trust editorial citations while your link profile stays stagnant or diluted.',
        serviceLink: { title: 'Explore Link Building', href: '/services/link-building' },
      },
    ],
    recommendedServices: ['technical-seo', 'content-marketing', 'link-building'],
    faq: [
      {
        q: 'How quickly can traffic recover after a core update drop?',
        a: 'Technical fixes like resolving render blocks or disavowing toxic link spikes often reflect within 3–6 weeks as Google recrawls. Algorithmic recovery typically stabilizes on the subsequent core update rollout once quality signals reset.',
      },
      {
        q: 'How do you tell if a drop is technical vs content related?',
        a: 'We isolate template-level render issues in Search Console against query-level impression share drops. If an entire section dropped uniformly, it is technical; if specific topics decayed, it is content/entity related.',
      },
    ],
  },
  'not-showing-up-in-chatgpt': {
    slug: 'not-showing-up-in-chatgpt',
    metaTitle: 'Not Showing Up in ChatGPT & AI Search? GEO Optimization | Gobiya',
    metaDescription: 'Learn why your brand is invisible when prospective buyers ask ChatGPT, Perplexity, or Gemini for recommendations — and how to earn direct citations.',
    eyebrow: 'PROBLEM-SOLVING GUIDE · GENERATIVE ENGINE OPTIMIZATION (GEO)',
    title: 'Not Showing Up in ChatGPT & AI Search?',
    subtitle: 'Re-engineer your digital footprint so AI assistants extract, quote, and cite your brand when buyers ask for recommendations.',
    painPoint: 'Your buyers are asking AI assistants for vendor comparisons and local service leaders, but ChatGPT, Perplexity, and Gemini cite your competitors instead.',
    diagnosis: [
      {
        title: 'Lack of Structured Answer Density',
        desc: 'Your pages contain fluff rather than concise, factual answer blocks that LLM crawlers can cleanly parse and extract.',
        serviceLink: { title: 'Explore AI Search (GEO)', href: '/services/geo' },
      },
      {
        title: 'Weak Entity Grounding & Knowledge Graph Presence',
        desc: 'AI models rely on structured schema and verified third-party citations to trust a brand enough to recommend it by name.',
        serviceLink: { title: 'Explore AI Systems & Consulting', href: '/services/ai-consulting' },
      },
      {
        title: 'Unoptimized Content Architecture',
        desc: 'Informational pages missing the specific conversational query patterns buyers type into ChatGPT and Perplexity.',
        serviceLink: { title: 'Explore Content Strategy', href: '/services/content-marketing' },
      },
    ],
    recommendedServices: ['geo', 'ai-consulting', 'content-marketing'],
    faq: [
      {
        q: 'How does ChatGPT decide which websites to cite in its answers?',
        a: 'ChatGPT Search uses live web retrieval combined with RAG (Retrieval-Augmented Generation). It favors pages with high answer density, clear schema, recent updates, and strong domain entity trust.',
      },
      {
        q: 'Is GEO separate from traditional SEO?',
        a: 'GEO builds directly on top of SEO. Your site still needs fast loading speeds and indexability, but GEO adds structured data, prompt-aligned heading hierarchies, and entity verification.',
      },
    ],
  },
  'site-is-slow-losing-leads': {
    slug: 'site-is-slow-losing-leads',
    metaTitle: 'Site is Slow & Losing Leads? Speed & CRO Rebuild | Gobiya',
    metaDescription: 'Fix slow site load times, poor Core Web Vitals, and broken conversion paths. Turn existing visitors into booked appointments and qualified leads.',
    eyebrow: 'PROBLEM-SOLVING GUIDE · SPEED, UX & CONVERSION RATE OPTIMIZATION',
    title: 'Site is Slow & Losing Leads?',
    subtitle: 'Eliminate bloat, pass Core Web Vitals, and streamline conversion paths so every visitor converts into revenue.',
    painPoint: 'You have decent site traffic, but visitors bounce before the page fully loads — or browse multiple pages without filling out a form or requesting a quote.',
    diagnosis: [
      {
        title: 'Bloated WordPress / Legacy CMS Tech Stack',
        desc: 'Unused plugins, unoptimized images, and render-blocking scripts dragging down speed and failing Core Web Vitals.',
        serviceLink: { title: 'Explore Web Design & Dev', href: '/services/web-dev' },
      },
      {
        title: 'Confusing UX & Weak Call to Action Hierarchy',
        desc: 'Visitors cannot easily find what they need or encounter high-friction forms on mobile devices.',
        serviceLink: { title: 'Explore Conversion Optimization (CRO)', href: '/services/cro' },
      },
      {
        title: 'Inefficient Paid Ad Landing Pages',
        desc: 'Ad campaigns sending high-cost clicks to generic homepages instead of dedicated high-converting landing pages.',
        serviceLink: { title: 'Explore PPC & Lead Acquisition', href: '/services/ppc' },
      },
    ],
    recommendedServices: ['web-dev', 'cro', 'ppc'],
    faq: [
      {
        q: 'Will rebuilding our site on Next.js improve lead conversion?',
        a: 'Yes. Next.js delivers sub-second page loads, zero layout shift, and optimal mobile UX. Speed directly reduces bounce rates, especially on paid ad traffic.',
      },
      {
        q: 'How does site speed affect Google rankings?',
        a: 'Core Web Vitals (LCP, CLS, INP) are official Google ranking signals. Slow pages get demoted in mobile search results and convert fewer visitors.',
      },
    ],
  },
};

export const SOLUTION_SLUGS = Object.keys(SOLUTIONS);

export function getSolution(slug) {
  return SOLUTIONS[slug] || null;
}

export const solutionPath = (slug) => `/solutions/${slug}`;
