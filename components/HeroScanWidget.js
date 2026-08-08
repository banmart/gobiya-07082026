'use client';

import { useState } from 'react';

/* The hero's right-hand panel. The homepage hero used to be copy-only; this
   puts the site scan — the one thing every visitor is being asked to do — in
   the fold itself instead of one click away.

   One field, one button, and both of them do something. This panel briefly
   carried three tabs (Site Scan / AI Visibility / Rankings) and an optional
   competitor field; neither was wired. The tabs appended ?focus= and the
   competitor appended ?vs=, and nothing on /free-site-scan read either one —
   all three tabs ran the same scan and the competitor was discarded.

   The rule for anything added back here: the scan API takes one URL and
   returns one report, so a control only belongs in this panel once the report
   behind it actually changes. Competitor comparison is a real feature and a
   real piece of work in the scan API — not a second text input. */

export default function HeroScanWidget() {
  const [site, setSite] = useState('');

  return (
    <div className="mw-scanwidget">
      <form
        className="mw-scanwidget__body"
        action="/free-site-scan"
        method="get"
        onSubmit={(e) => {
          e.preventDefault();
          const url = site.trim();
          // FreeSiteScanApp prefills its input from ?url= — it does not
          // auto-run, so a shared link can't fire a scan on open.
          window.location.href = url
            ? `/free-site-scan?url=${encodeURIComponent(url)}`
            : '?onboarding=true';
        }}
      >
        <p className="mw-scanwidget__title">Free site scan</p>

        <div className="mw-scanwidget__field">
          <label className="mw-scanwidget__label" htmlFor="hero-scan-site">
            Your website
          </label>
          <input
            id="hero-scan-site"
            name="url"
            type="text"
            inputMode="url"
            autoComplete="url"
            placeholder="yourbusiness.com"
            className="mw-scanwidget__input"
            value={site}
            onChange={(e) => setSite(e.target.value)}
          />
        </div>

        <div className="mw-scanwidget__meta">
          <span className="mw-scanwidget__note">
            Checks speed, code, tags, schema and AI search readiness.
          </span>
          <span className="mw-scanwidget__chip">No credit card</span>
        </div>

        <button type="submit" className="mw-scanwidget__submit">
          Run My Free Scan
        </button>

        <p className="mw-scanwidget__footnote">
          Results in about 60 seconds. <a href="/pricing">See what a full audit covers</a>
        </p>
      </form>
    </div>
  );
}
