import CookiePreferencesLink from './CookiePreferencesLink';
import { markInner, BRAND_NAVY } from '../lib/brand';
import { FOOTER_NAV, HEADER_CTA, CONTACT } from '../lib/nav';

/* Four link columns, then the office block, then the byline.
 *
 * Three of the columns come from lib/nav.js so the footer and the header name
 * the same pages the same way. The fourth is the company column, which is the
 * CTA plus the two things that are not navigation — the policy and a direct
 * address. */
export default function Footer() {
  return (
    <footer className="gb-footer">
      <div className="container">
        <div className="gb-footer__grid">
          {FOOTER_NAV.map((col) => (
            <div key={col.heading}>
              <h4 className="gb-footer__col-title">{col.heading}</h4>
              <div className="gb-footer__links">
                {col.items.map((item) => (
                  <a key={item.href} href={item.href} title={item.label}>{item.label}</a>
                ))}
              </div>
            </div>
          ))}

          <div>
            <h4 className="gb-footer__col-title">Company</h4>
            <div className="gb-footer__links">
              <a href={HEADER_CTA.href} title={HEADER_CTA.label}>{HEADER_CTA.label}</a>
              <a href="/privacy" title="Privacy Policy">Privacy</a>
              <a href={`mailto:${CONTACT.email}`} title={`Email ${CONTACT.email}`}>{CONTACT.email}</a>
            </div>
          </div>
        </div>

        <div className="gb-footer__office">
          <div className="gb-footer__office-block">
            <h5 className="gb-footer__office-title">Locations</h5>
            <p><a href="/van-nuys-seo" title="Van Nuys SEO office">Van Nuys</a></p>
            <p><a href="/los-angeles-seo" title="Los Angeles SEO office">Los Angeles</a></p>
          </div>
          <div className="gb-footer__office-block">
            <h5 className="gb-footer__office-title">Hours</h5>
            <p>{CONTACT.hoursDays}</p>
            <p>{CONTACT.hoursTime}</p>
          </div>
          <div className="gb-footer__office-block">
            <h5 className="gb-footer__office-title">Direct</h5>
            <p><a href={`mailto:${CONTACT.email}`} title={`Email ${CONTACT.email}`}>{CONTACT.email}</a></p>
            <p><a href={CONTACT.phoneHref} title="Call Gobiya at 323-744-1338">(323) 744-1338</a></p>
          </div>
        </div>

        <div className="gb-footer__bottom">
          <span className="gb-footer__byline">
            Gobiya — search engineering, Los Angeles · Est. 2010
          </span>
          <div className="gb-footer__legal">
            <a href="/privacy" title="Privacy Policy">Privacy</a>
            <a href="/terms" title="Terms of Service">Terms</a>
            <CookiePreferencesLink />
          </div>
          <a href="#top" className="gb-footer__top" title="Back to top of page">Back to top <span aria-hidden="true">&uarr;</span></a>
        </div>
      </div>

      <div className="gb-footer__watermark" aria-hidden="true">
        <svg
          className="gb-footer__watermark-img"
          viewBox="0 0 48 48"
          fill="none"
          dangerouslySetInnerHTML={{ __html: markInner(BRAND_NAVY) }}
        />
      </div>
    </footer>
  );
}
