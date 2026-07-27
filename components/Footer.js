import CookiePreferencesLink from './CookiePreferencesLink';
import { CONTACT } from '../lib/nav';

export default function Footer() {
  return (
    <footer className="mw-footer">
      <div className="container">
        <div className="mw-footer__grid">
          <div>
            <h4 className="mw-footer__col-title">Consulting</h4>
            <div className="mw-footer__links">
              <a href="/about">Why Us</a>
              <a href="/about/steve-martin">Meet Your Team</a>
              <a href="/contact#faq">FAQs</a>
              <a href="/about/approach">Our Process</a>
              <a href="/work">Client Stories</a>
              <a href="/services">Industry Experience</a>
              <a href="/work">Closed Transactions</a>
              <a href="/onboarding">Free Site Scan</a>
            </div>
          </div>

          <div>
            <h4 className="mw-footer__col-title">Services</h4>
            <div className="mw-footer__links">
              <a href="/seo-services-los-angeles">Local &amp; Technical SEO</a>
              <a href="/geo-services-los-angeles">AI &amp; GEO Search</a>
              <a href="/content-marketing-services-los-angeles">Content Strategy</a>
              <a href="/link-building-services-los-angeles">Authority Link Building</a>
              <a href="/ppc-management-services-los-angeles">PPC Management</a>
              <a href="/cro-ux-services-los-angeles">CRO &amp; Web UX</a>
            </div>
          </div>

          <div>
            <h4 className="mw-footer__col-title">Industries</h4>
            <div className="mw-footer__links">
              <a href="/services">Legal &amp; Professional Services</a>
              <a href="/work/smile-center-dentistry">Healthcare &amp; Dental</a>
              <a href="/work/remodelmepros">Home &amp; Building Services</a>
              <a href="/services">B2B &amp; E-Commerce</a>
            </div>
          </div>

          <div>
            <h4 className="mw-footer__col-title">Resources</h4>
            <div className="mw-footer__links">
              <a href="/insights">Knowledge Base</a>
              <a href="/seo-myths">SEO Myths Game</a>
              <a href="/ai-visibility">AI Visibility Guide</a>
              <a href="/insights">Gobiya Insights</a>
              <a href="/tools">Free Tools Hub</a>
            </div>
          </div>

          <div>
            <h4 className="mw-footer__col-title">About</h4>
            <div className="mw-footer__links">
              <a href="/about">What We Do</a>
              <a href="/about/approach">Confidentiality &amp; Security</a>
              <a href="/contact">Contact Us</a>
              <a href="/mcp">AI MCP API</a>
              <a href="/about/steve-martin">Leadership</a>
            </div>
          </div>

          <div>
            <h4 className="mw-footer__col-title">Contact</h4>
            <div className="mw-footer__links">
              <span>Gobiya LLC</span>
              <span>{CONTACT.address1}</span>
              <span>{CONTACT.address2}</span>
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
            </div>
          </div>
        </div>

        <div className="mw-footer__bottom">
          <div className="mw-footer__legal-links">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms &amp; Conditions</a>
            <a href="/terms#disclaimer">Standard Disclaimer</a>
            <CookiePreferencesLink />
          </div>
          <div>Copyright © 2026 Gobiya LLC. All Rights Reserved.</div>
        </div>
      </div>
    </footer>
  );
}
