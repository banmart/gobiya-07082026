// The four service-standard cards. Shared by the homepage and /about so the
// same four promises are worded identically on both.

export default function ExcellenceGrid() {
  return (
    <section className="mw-excellence">
      <div className="container">
        <h2 className="mw-excellence__heading">
          Excellence in Every Service
        </h2>
        <p className="mw-excellence__intro">
          From our clear communication to our premium output and quality, we always put your business first.
        </p>

        <div className="mw-excellence__grid">
          <div className="mw-excellence__card">
            <div className="mw-excellence__icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <h3 className="mw-excellence__card-title">Communication You Can Count On</h3>
            <p className="mw-excellence__card-desc">
              Our expert SEO strategy team ensures clear, direct, and transparent communication every step of the way — with no account manager middlemen.
            </p>
          </div>

          <div className="mw-excellence__card">
            <div className="mw-excellence__icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <polyline points="9 12 11 14 15 10" />
              </svg>
            </div>
            <h3 className="mw-excellence__card-title">Transparency You Can Trust</h3>
            <p className="mw-excellence__card-desc">
              You’ll always know what to expect with our open, no-surprise pricing, month-to-month contracts, and free site scans.
            </p>
          </div>

          <div className="mw-excellence__card">
            <div className="mw-excellence__icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="7" />
                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
              </svg>
            </div>
            <h3 className="mw-excellence__card-title">White-Hat Standards You Can Rely On</h3>
            <p className="mw-excellence__card-desc">
              Our team maintains strict search engine guidelines and white-hat SEO practices to protect your brand authority and search rankings.
            </p>
          </div>

          <div className="mw-excellence__card">
            <div className="mw-excellence__icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <h3 className="mw-excellence__card-title">Sixteen Years of Service Excellence</h3>
            <p className="mw-excellence__card-desc">
              Proudly serving Los Angeles and Southern California businesses since 2010 with the same commitment to quality, rankings, and care.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
