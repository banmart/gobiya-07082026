import { buildMetadata } from '../../lib/meta';
import { CONTACT } from '../../lib/nav';

export const metadata = buildMetadata({
  title: 'Privacy Policy',
  description:
    'How Gobiya collects, uses, and protects your information — analytics, session recording, form submissions, cookies, and your California privacy rights.',
  path: '/privacy',
});

export default function PrivacyPage() {
  return (
    <main id="top">
      <section className="page-hero section">
        <div className="container container--narrow">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>Legal</p>
          <h1 className="statement">Privacy Policy</h1>
          <p className="lede" data-reveal>Last updated July 10, 2026</p>
        </div>
      </section>

      <section className="section" id="body">
        <div className="container">
          <div className="article__body">
            <div>
              <h2>Who we are</h2>
              <p>Gobiya LLC (&ldquo;Gobiya,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;) operates www.gobiya.com from {CONTACT.address1}, {CONTACT.address2}. This policy describes what information we collect when you visit this site or contact us, and how we use it.</p>
            </div>
            <div>
              <h2>Information you give us</h2>
              <p>When you email us, call us, or complete the onboarding questionnaire, we collect the information you provide — typically your name, email address, phone number, company, website domain, and details about your marketing goals. We use it to respond to your inquiry and evaluate whether we can help. Form submissions are delivered to us by email via Resend, our transactional email provider. We do not sell this information, and we do not add you to a marketing list without your consent.</p>
            </div>
            <div>
              <h2>Information collected automatically</h2>
              <p>If you accept analytics cookies from the banner shown on your first visit, we use Google Analytics 4 to understand aggregate site traffic (pages visited, referral sources, approximate location, device type) and Microsoft Clarity to understand how visitors use the site, including session replays, heatmaps, and interaction data. Neither loads, and neither sets a cookie, unless you accept — declining or closing the banner without accepting keeps both off for that visit. Both services collect usage data under their own privacy policies: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a> and <a href="https://privacy.microsoft.com/privacystatement" target="_blank" rel="noopener noreferrer">Microsoft Privacy Statement</a>. The site is hosted on Vercel, which logs standard server request data (IP address, user agent) for security and operations regardless of your cookie choice.</p>
            </div>
            <div>
              <h2>Cookies</h2>
              <p>Analytics cookies are opt-in, set only after you accept them from the banner. You can change your choice at any time via &ldquo;Cookie preferences&rdquo; in the footer, which re-opens the banner, or by blocking/deleting cookies in your browser settings — the site works fully without them. If you&apos;ve accepted, you can also opt out of Google Analytics specifically with the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">Google Analytics opt-out browser add-on</a>.</p>
            </div>
            <div>
              <h2>How long we keep information</h2>
              <p>Inquiry and onboarding information is retained for as long as needed to handle your request and, if you become a client, for the duration of our engagement plus any period required for legal and accounting purposes. Analytics data is retained per the default retention settings of Google Analytics and Microsoft Clarity.</p>
            </div>
            <div>
              <h2>Your California privacy rights</h2>
              <p>If you are a California resident, the California Consumer Privacy Act (CCPA/CPRA) gives you the right to know what personal information we hold about you, to request its deletion, to correct inaccurate information, and to opt out of the sale or sharing of personal information. We do not sell personal information. To exercise any of these rights, email <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> or call <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>. We will not discriminate against you for exercising your rights.</p>
            </div>
            <div>
              <h2>Changes and contact</h2>
              <p>We may update this policy from time to time; the date at the top reflects the latest revision. Questions about this policy or your information can be sent to <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
