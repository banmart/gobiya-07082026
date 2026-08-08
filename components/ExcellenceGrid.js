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
          No jargon, no shortcuts, no surprises. Just work that puts your business first.
        </p>

        <div className="mw-excellence__grid">
          <div className="mw-excellence__card">

            <h3 className="mw-excellence__card-title">Communication You Can Count On</h3>
            <p className="mw-excellence__card-desc">
              Straight talk, every step. No account managers, no runaround — you deal directly with the people doing the work.
            </p>
          </div>

          <div className="mw-excellence__card">

            <h3 className="mw-excellence__card-title">Transparency You Can Trust</h3>
            <p className="mw-excellence__card-desc">
              No-surprise pricing. Month-to-month contracts. Free site scans. You&apos;ll always know exactly what you&apos;re getting.
            </p>
          </div>

          <div className="mw-excellence__card">

            <h3 className="mw-excellence__card-title">White-Hat Standards You Can Rely On</h3>
            <p className="mw-excellence__card-desc">
              We play by Google&apos;s rules, not around them — protecting your rankings and your brand for the long run.
            </p>
          </div>

          <div className="mw-excellence__card">

            <h3 className="mw-excellence__card-title">Sixteen Years of Service Excellence</h3>
            <p className="mw-excellence__card-desc">
              Serving Los Angeles and Southern California since 2010, with the same care on day 5,000 as day one.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
