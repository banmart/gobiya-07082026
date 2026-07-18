import { buildMetadata } from '../../lib/meta';
import { CONTACT } from '../../lib/nav';
import TopicMarquee from '../../components/TopicMarquee';

export const metadata = buildMetadata({
  title: 'Terms of Use',
  description: 'Terms of use for www.gobiya.com, the website of Gobiya LLC, a Los Angeles technical SEO and AI visibility agency.',
  path: '/terms',
});

export default function TermsPage() {
  return (
    <main id="top">
      <section className="page-hero section">
        <div className="container container--narrow">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>Legal</p>
          <h1 className="statement">Terms of Use</h1>
          <p className="lede" data-reveal>Last updated July 10, 2026</p>
        </div>
      </section>
      <TopicMarquee topics={["Terms of Service", "Legal Agreement", "Agency Terms", "Client Policies", "Copyright"]} />


      <section className="section" id="body">
        <div className="container">
          <div className="article__body">
            <div>
              <h2>Agreement</h2>
              <p>By using www.gobiya.com (the &ldquo;Site&rdquo;), operated by Gobiya LLC, you agree to these terms. If you do not agree, please do not use the Site. Client engagements are governed by separate written agreements; nothing on the Site constitutes an offer of services on specific terms.</p>
            </div>
            <div>
              <h2>Content and no professional advice</h2>
              <p>Articles, guides, and other content on the Site are provided for general information. They reflect our experience and opinions at the time of writing; search engines and AI platforms change frequently, and results described for past clients do not guarantee similar outcomes. Content on the Site is not legal, financial, or professional advice for your specific situation.</p>
            </div>
            <div>
              <h2>Intellectual property</h2>
              <p>The Site&rsquo;s content, design, and branding are the property of Gobiya LLC or used with permission. You may quote and link to our content with attribution; you may not republish substantial portions commercially without our written consent.</p>
            </div>
            <div>
              <h2>Disclaimer and limitation of liability</h2>
              <p>The Site is provided &ldquo;as is&rdquo; without warranties of any kind, express or implied. To the maximum extent permitted by law, Gobiya LLC is not liable for any indirect, incidental, or consequential damages arising from your use of the Site or reliance on its content.</p>
            </div>
            <div>
              <h2>Third-party links</h2>
              <p>The Site links to third-party websites and services we do not control. We are not responsible for their content or privacy practices. See our <a href="/privacy">Privacy Policy</a> for how visitor data is handled on this Site.</p>
            </div>
            <div>
              <h2>Governing law and contact</h2>
              <p>These terms are governed by the laws of the State of California. Questions can be sent to <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> or {CONTACT.address1}, {CONTACT.address2}.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
