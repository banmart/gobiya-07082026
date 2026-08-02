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
              <a href="/services/seo">SEO</a>
              <a href="/services/geo">AI Search</a>
              <a href="/services/content-marketing">Content</a>
              <a href="/services/link-building">Link Building</a>
              <a href="/services/ppc">PPC</a>
              <a href="/services/cro">CRO</a>
              <a href="/services/web-ux">Web UX</a>
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
              <a href="/free-site-scan">Free Site Scan</a>
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

          {/* 5. Areas We Serve Column */}
          <div>
            <h4 className="mw-footer__col-title">Areas We Serve</h4>
            <div className="mw-footer__links">
              <a href="/areas-we-serve/downtown">SEO in Downtown LA</a>
              <a href="/areas-we-serve/koreatown">SEO in Koreatown</a>
              <a href="/areas-we-serve/burbank">SEO in Burbank</a>
              <a href="/areas-we-serve/glendale">SEO in Glendale</a>
              <a href="/areas-we-serve/silverlake">SEO in Silverlake</a>
              <a href="/areas-we-serve/echo-park">SEO in Echo Park</a>
              <a href="/areas-we-serve/los-feliz">SEO in Los Feliz</a>
              <a href="/areas-we-serve/hollywood">SEO in Hollywood</a>
              <a href="/areas-we-serve/studio-city">SEO in Studio City</a>
              <a href="/areas-we-serve/sherman-oaks">SEO in Sherman Oaks</a>
            </div>
          </div>
        </div>

        <div className="mw-footer__bottom">
          <div className="mw-footer__bottom-cta">
            <a href="/free-site-scan" className="mw-footer__cta-btn">Get a FREE site scan</a>
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
