import CookiePreferencesLink from './CookiePreferencesLink';
import { markInner, BRAND_NAVY } from '../lib/brand';

export default function Footer() {
  return (
    <footer className="mw-footer">
      <div className="container">
        <div className="mw-footer__grid">
          {/* 1. Services Column */}
          <div>
            <h4 className="mw-footer__col-title">Services</h4>
            <div className="mw-footer__links">
              <a href="/services">All Services</a>
              <a href="/services/technical-seo">SEO</a>
              <a href="/services/geo">AI Search</a>
              <a href="/services/content-marketing">Content</a>
              <a href="/services/link-building">Link Building</a>
              <a href="/services/ppc">PPC</a>
              <a href="/services/cro">CRO</a>
              <a href="/services/web-dev">Web Dev</a>
              <a href="/services/ai-consulting">AI Consulting</a>
            </div>
          </div>

          {/* 2. About Column (placed directly after Services) */}
          <div>
            <h4 className="mw-footer__col-title">About</h4>
            <div className="mw-footer__links">
              <a href="/about">What We Do</a>
              <a href="/work">Work</a>
              <a href="/about/approach">Security</a>
              <a href="/about/steve-martin">Leadership</a>
              <a href="/contact">Contact Us</a>
              <a href="/areas-we-serve">Areas We Serve</a>
              <a href="?onboarding=true">Request a Quote</a>
            </div>
          </div>

          {/* 3. Resources Column */}
          <div>
            <h4 className="mw-footer__col-title">Resources</h4>
            <div className="mw-footer__links">
              <a href="/insights">Knowledge Base</a>
              <a href="/glossary">Glossary</a>
              <a href="/seo-myths">SEO Myths Game</a>
              <a href="/insights/what-is-generative-engine-optimization">AI Visibility Guide</a>
              <a href="/stuff">Video Stuff</a>
              <a href="/mcp">AI MCP API</a>
            </div>
          </div>

          {/* 4. Free Tools Column */}
          <div>
            <h4 className="mw-footer__col-title">Free Tools</h4>
            <div className="mw-footer__links">
              <a href="/tools">Free Tools Hub</a>
              <a href="/tools/dns-lookup">DNS Lookup</a>
              <a href="/tools/domain-lookup">Domain Lookup</a>
              <a href="/tools/domain-reputation">Domain Reputation</a>
              <a href="/tools/email-verification">Email Verification</a>
              <a href="/tools/ip-geolocation">IP Geolocation</a>
              <a href="/tools/ssl-certificates">SSL Certificates</a>
              <a href="/tools/threat-intelligence">Threat Intelligence</a>
              <a href="/tools/website-categorization">Website Categorization</a>
            </div>
          </div>

        </div>

        <div className="mw-footer__bottom">
          <div className="mw-footer__bottom-cta">
            <a href="?onboarding=true" className="mw-footer__cta-btn">Request a Quote</a>
          </div>
          <div className="mw-footer__legal-links">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms &amp; Conditions</a>
            <a href="/terms#disclaimer">Standard Disclaimer</a>
            <CookiePreferencesLink />
          </div>
          <div>Copyright © 2026 Gobiya LLC. All Rights Reserved.</div>
        </div>
      </div>

      <div className="mw-footer__watermark-wrap" aria-hidden="true">
        <svg
          className="mw-footer__watermark-img"
          viewBox="0 0 48 48"
          fill="none"
          dangerouslySetInnerHTML={{ __html: markInner(BRAND_NAVY) }}
        />
      </div>
    </footer>
  );
}
