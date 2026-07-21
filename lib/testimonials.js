// Real client quotes, lightly edited only for length. Each entry maps to its
// matching /work case study where one exists (lib/work.js); entries whose
// client has no dedicated study page fall back to the /work hub, same
// convention used for legacy /case-studies/* redirects in next.config.mjs.

export const TESTIMONIALS = [
  {
    name: 'Dr. Ebbi Nikjoo',
    company: 'SmileCenter.com',
    role: 'Dental Office',
    quote: 'We had four locations and one website that treated them like they were all the same place. The new build gave every office its own page tied to its own Google listing, and the scheduler finally stopped being a phone-tag situation. Front desk noticed the difference before I did — they were the ones fielding all the new calls.',
    href: '/work/smile-center-dentistry',
  },
  {
    name: 'Dev P.',
    company: 'American Livescan',
    role: 'Fingerprinting Services',
    quote: 'Honestly I expected to be told I needed to spend more on ads. Instead we fixed the Google listing and shortened the path from "found us" to "booked." Same budget, roughly three times the appointments. I still don’t fully understand what changed on the backend, but the calendar tells the story.',
    href: '/work/american-livescan',
  },
  {
    name: 'Pete Urueta',
    company: 'Safety-Centric.com',
    role: 'Business Security Systems Services',
    quote: 'Moving off WordPress was the part I was most nervous about and it turned out to be the easy part. The bigger deal was the CRM and the drip campaigns — leads used to sit in an inbox until someone remembered them. Now they get followed up whether I’m paying attention or not.',
    href: '/work/safetycentric',
  },
  {
    name: 'Dev Panday',
    company: 'QuickPassAiD.com',
    role: 'Passport Photo App',
    quote: 'The photo validation was the whole ballgame. We were rejecting a huge share of submissions manually and it was killing us on turnaround. Having it check the background and the expression automatically, then run payment through Square in the same flow, took a process that needed a person and made it something that mostly runs itself.',
    href: '/work/quickpass-aid',
  },
  {
    name: 'Mike P.',
    company: 'RemodelMePros.com',
    role: 'Contractors Marketplace',
    quote: 'Two-sided marketplaces are hard and I’d already had one developer tell me it couldn’t be done for what I wanted to spend. The bidding dashboard is what contractors actually log in for, and the SEO articles kept homeowners coming in without me buying every lead. It’s not finished — it probably never is — but it works.',
    href: '/work/remodel-me-pros',
  },
  {
    name: null,
    company: 'The Healing Metta',
    role: 'Secrets of Buddha',
    quote: 'Users were finding answers about our treatments everywhere except from us. The shift was writing for the questions people actually ask, and structuring it so the AI tools could read it properly. When someone asks ChatGPT about integrative care in our area now, we come up. That wasn’t true a year ago.',
    href: '/work/the-healing-metta',
  },
  {
    name: 'Eli Zilberstein',
    company: 'TotalCapitalInc.com',
    role: 'Properties and Management',
    quote: 'The Google Business Profile suspension was the emergency — we were invisible and nobody at Google would tell us why. Getting that untangled took persistence I did not have. The property search tool was the part that changed how we operate, though. Our team can see live availability across every unit instead of asking three people.',
    href: '/work/total-capital',
  },
  {
    name: 'Dennis Gonzales',
    company: 'DGPlumbingandRooter.com',
    role: 'Local Plumbing Service',
    quote: 'I was running dispatch off a whiteboard and text messages. Now the calls come in, get assigned, and the estimate and invoice come out of the same system. My techs stopped calling me to ask where they’re going next, which is worth more to me than the traffic numbers.',
    href: '/work/dg-plumbing',
  },
  {
    name: null,
    company: 'MyTrustWills.com',
    role: 'Online Trusts & Wills',
    quote: 'The multi-language interview was non-negotiable for us and nobody else wanted to touch it. Clients answer questions in the language they’re comfortable in and a real document comes out the other end. Payments through Stripe, no back and forth. It removed the bottleneck that was me.',
    href: '/work/mtw',
  },
  {
    name: 'Mike P.',
    company: 'Trusted Home Contractors',
    role: 'General Contractor',
    quote: 'Our ads were working in the sense that the phone rang. They weren’t working in the sense that most of those calls were tire-kickers. Rebuilding the campaigns around what people were actually searching for, and sending them to pages that matched, cut what we pay per real customer by about 40%.',
    href: '/work',
  },
];
