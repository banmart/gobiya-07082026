import CookiePreferencesLink from './CookiePreferencesLink';
import { markInner, BRAND_NAVY } from '../lib/brand';

export default function Footer() {
  return (
    <footer className="mw-footer">
      <div className="container">
        <div className="mw-footer__grid">
          <div>
            <h4 className="mw-footer__col-title">Services</h4>
            <div className="mw-footer__links">
              <a href="/services/seo">Local &amp; Technical SEO</a>
              <a href="/services/geo">AI &amp; GEO Search</a>
              <a href="/services/content-marketing">Content Strategy</a>
              <a href="/services/link-building">Authority Link Building</a>
              <a href="/services/ppc">PPC Management</a>
              <a href="/services/cro">CRO &amp; Web UX</a>
            </div>
          </div>

          <div>
            <h4 className="mw-footer__col-title">Industries</h4>
            <div className="mw-footer__links">
              <a href="/services">Legal &amp; Professional Services</a>
              <a href="/work/smile-center-dentistry">Healthcare &amp; Dental</a>
              <a href="/work/remodel-me-pros">Home &amp; Building Services</a>
              <a href="/services">B2B &amp; E-Commerce</a>
            </div>
          </div>

          <div>
            <h4 className="mw-footer__col-title">Resources</h4>
            <div className="mw-footer__links">
              <a href="/insights">Knowledge Base</a>
              <a href="/glossary">Glossary</a>
              <a href="/seo-myths">SEO Myths Game</a>
              <a href="/insights/what-is-generative-engine-optimization">AI Visibility Guide</a>
              <a href="/tools">Free Tools Hub</a>
              <a href="/stuff">Video Stuff</a>
            </div>
          </div>

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

          <div>
            <h4 className="mw-footer__col-title">About</h4>
            <div className="mw-footer__links">
              <a href="/about">What We Do</a>
              <a href="/about/approach">Confidentiality &amp; Security</a>
              <a href="/contact">Contact Us</a>
              <a href="/mcp">AI MCP API</a>
              <a href="/about/steve-martin">Leadership</a>
              <a href="/work">Client Stories</a>
              <a href="/free-site-scan">Free Site Scan</a>
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

      {/* Bottom-right brand mark. The same hand-built geometry as the hero
          watermark — corner brackets with the carmine sparkle centred — drawn
          inline from lib/brand.js rather than pulled in as a raster file. Two
          reasons: the old logo-gobiya-red.webp was the wordmark, not the mark,
          and a loaded image resource is an LCP candidate where a painted SVG
          element is not. */}
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
