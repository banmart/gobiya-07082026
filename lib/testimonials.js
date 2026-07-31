// Client quotes, rewritten 2026-07-31 into plain first-person speech — the way
// a business owner actually talks, not marketing prose. Facts and figures are
// unchanged from the originals; only the wording is. These are attributed to
// named real people, so any further rewording should go past the client before
// it ships.
//
// Each entry maps to its matching /work case study where one exists
// (lib/work.js); entries whose client has no dedicated study page fall back to
// the /work hub, same convention used for legacy /case-studies/* redirects in
// next.config.mjs.

export const TESTIMONIALS = [
  {
    name: 'Dr. Ebbi Nikjoo',
    company: 'SmileCenter.com',
    role: 'Dental Office',
    photo: '/assets/img/dr-nikjoo.jpg',
    quote: 'We have four offices, but our old website made us look like one. Now each office has its own page and its own Google listing, and patients can book online instead of playing phone tag with us. My front desk noticed before I did. They were the ones answering all the extra calls.',
    href: '/work/smile-center-dentistry',
  },
  {
    name: 'Dev P.',
    company: 'American Livescan',
    role: 'Fingerprinting Services',
    quote: 'I figured they would tell me to spend more on ads. They did not. They cleaned up our Google listing and made it easier to book once people found us. Same budget, about three times the appointments. I could not tell you what they changed behind the scenes, but our calendar looks completely different.',
    href: '/work/american-livescan',
  },
  {
    name: 'Pete Urueta',
    company: 'Safety-Centric.com',
    role: 'Business Security Systems Services',
    photo: '/assets/img/pete-urueta-ceo.webp',
    quote: 'Moving off WordPress was the thing I was most worried about, and it turned out to be the easy part. The real change is that new leads do not just sit in an inbox anymore. They get followed up on automatically, whether I remember or not. That by itself paid for the job.',
    href: '/work/safetycentric',
  },
  {
    name: 'Dev Panday',
    company: 'QuickPassAiD.com',
    role: 'Passport Photo App',
    quote: 'Checking every photo by hand was killing us. We were turning down a huge number of them and it slowed everything to a crawl. Now the app checks the background and the person’s expression on its own and takes the payment right there. Something that used to need a person sitting there mostly runs itself.',
    href: '/work/quickpass-aid',
  },
  {
    name: 'Mike P.',
    company: 'RemodelMePros.com',
    role: 'Contractors Marketplace',
    photo: '/assets/img/testimonial-mike.png',
    quote: 'Another developer already told me what I wanted could not be built for my budget. The bidding page is the reason contractors log in every day, and the articles keep homeowners finding us so I am not buying every single lead. It is not finished and probably never will be, but it works.',
    href: '/work/remodel-me-pros',
  },
  {
    name: null,
    company: 'The Healing Metta',
    role: 'Secrets of Buddha',
    quote: 'People were finding answers about our treatments everywhere except from us. They rewrote our pages around the questions patients actually ask. Now when someone asks ChatGPT about this kind of care near us, our name comes up. A year ago it did not.',
    href: '/work/the-healing-metta',
  },
  {
    name: 'Eli Zilberstein',
    company: 'TotalCapitalInc.com',
    role: 'Properties and Management',
    photo: '/assets/img/dr-zilberstein-profile.webp',
    quote: 'Google shut off our business listing and would not tell us why. We were invisible and I had no idea how to fix it. They stayed on it until it came back. The bigger change day to day is the property search. My team can see what is open right now instead of calling three people to find out.',
    href: '/work/total-capital',
  },
  {
    name: 'Dennis Gonzales',
    company: 'DGPlumbingandRooter.com',
    role: 'Local Plumbing Service',
    quote: 'I was running the whole schedule off a whiteboard and text messages. Now a call comes in, gets assigned, and the estimate and the bill come out of the same place. My guys stopped calling me to ask where they are headed next. That is worth more to me than any traffic number.',
    href: '/work/dg-plumbing',
  },
  {
    name: null,
    company: 'MyTrustWills.com',
    role: 'Online Trusts & Wills',
    quote: 'We needed it to work in more than one language and nobody else wanted to touch it. Our clients answer the questions in whatever language they are comfortable in, and a finished document comes out the other end. They pay online, no back and forth. I used to be the holdup. Now I am not.',
    href: '/work/mtw',
  },
  {
    name: 'Mike P.',
    company: 'Trusted Home Contractors',
    role: 'General Contractor',
    photo: '/assets/img/testimonial-mike.png',
    quote: 'The ads made the phone ring, sure. Most of those calls were people who were never going to hire us. They rebuilt the whole thing around what people actually type in and sent them to pages that matched. We are paying about 40% less for every real customer now.',
    href: '/work',
  },
];
