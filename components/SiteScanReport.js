'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/* Report renderer, and the thing that kicks off the scan.
 *
 * The scan runs from here rather than from the form submit so that the lead is
 * already banked before any of this can fail. The trade is that the visitor
 * watches a progress list for 15-30s, which is why the stages below are named
 * after real checks — it reads as work being done rather than a stalled bar.
 */

const STAGES = [
  'Fetching your page',
  'Checking titles, headings and structured data',
  'Measuring load speed',
  'Checking DNS, certificate and sitemap',
  'Writing up the findings',
];

const SEVERITY_LABEL = { high: 'High priority', medium: 'Worth fixing', low: 'Minor' };

function scoreTone(score) {
  if (score >= 80) return 'good';
  if (score >= 50) return 'warn';
  return 'bad';
}

export default function SiteScanReport({
  id,
  url,
  initialStatus,
  initialScore,
  initialReport,
  initialCollectorStatus,
}) {
  const [status, setStatus] = useState(initialStatus || 'pending');
  const [score, setScore] = useState(initialScore);
  const [report, setReport] = useState(initialReport);
  const [collectorStatus, setCollectorStatus] = useState(initialCollectorStatus);
  const [failReason, setFailReason] = useState('');
  const [stage, setStage] = useState(0);

  // Guards the double-invoke that React 18+ StrictMode does in development.
  // Without it the scan fires twice on every local page load.
  const startedRef = useRef(false);

  const runScan = useCallback(async () => {
    try {
      const res = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const payload = await res.json();

      if (!res.ok) {
        setStatus('failed');
        setFailReason(payload.error || 'The scan could not be completed.');
        return;
      }
      if (payload.status === 'failed') {
        setStatus('failed');
        setFailReason(payload.reason || 'We could not reach that site.');
        return;
      }

      setScore(payload.score);
      setReport(payload.report);
      setCollectorStatus(payload.collectorStatus);
      setStatus('complete');
    } catch {
      setStatus('failed');
      setFailReason('The scan could not be completed. Your details reached us either way.');
    }
  }, [id]);

  useEffect(() => {
    if (status !== 'pending' || startedRef.current) return;
    startedRef.current = true;

    // Purely cosmetic pacing — the API is one request, so there is no real
    // per-stage progress to report. It stops before the last stage so it never
    // claims to be finished while the request is still open.
    const ticker = setInterval(() => {
      setStage((current) => (current < STAGES.length - 1 ? current + 1 : current));
    }, 4000);

    runScan().finally(() => clearInterval(ticker));
    return () => clearInterval(ticker);
  }, [status, runScan]);

  if (status === 'pending') {
    return (
      <section className="scan-report">
        <div className="container container--narrow">
          <p className="scan-report__eyebrow">Scanning</p>
          <h1 className="scan-report__title">Checking {url}</h1>
          <p className="scan-report__dek">
            This takes about half a minute. Leave the page open — the report is emailed to you as
            well, so you will not lose it either way.
          </p>
          <ol className="scan-report__stages">
            {STAGES.map((label, index) => (
              <li
                key={label}
                className={`scan-report__stage${index <= stage ? ' scan-report__stage--active' : ''}`}
              >
                {label}
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  if (status === 'failed') {
    return (
      <section className="scan-report">
        <div className="container container--narrow">
          <p className="scan-report__eyebrow">Site scan</p>
          <h1 className="scan-report__title">We could not scan {url}</h1>
          <p className="scan-report__dek">
            {failReason} That usually means the site is blocking automated requests, is behind a
            firewall, or was briefly down. It does not necessarily mean anything is wrong with it.
          </p>
          <p className="scan-report__dek">
            Your details did reach us. Steve will take a look manually and get back to you.
          </p>
          <ContactBlock id={id} />
        </div>
      </section>
    );
  }

  const unmeasured = Object.entries(collectorStatus || {})
    .filter(([, value]) => value?.state && value.state !== 'ok')
    .map(([key, value]) => ({ key, reason: value.reason }));

  return (
    <section className="scan-report">
      <div className="container container--narrow">
        <p className="scan-report__eyebrow">Site scan results</p>
        <h1 className="scan-report__title">{url}</h1>

        <div className={`scan-report__score scan-report__score--${scoreTone(score)}`}>
          <span className="scan-report__score-num">{score}</span>
          <span className="scan-report__score-max">/100</span>
        </div>

        <p className="scan-report__summary">{report?.summary}</p>

        {report?.findings?.length > 0 && (
          <>
            <h2 className="scan-report__heading">What we found</h2>
            <ul className="scan-report__findings">
              {report.findings.map((finding, index) => (
                <li key={index} className={`scan-report__finding scan-report__finding--${finding.severity}`}>
                  <p className="scan-report__severity">{SEVERITY_LABEL[finding.severity] || 'Note'}</p>
                  <h3 className="scan-report__finding-title">{finding.title}</h3>
                  <p className="scan-report__finding-why">{finding.why}</p>
                  <p className="scan-report__finding-fix"><strong>Fix:</strong> {finding.fix}</p>
                </li>
              ))}
            </ul>
          </>
        )}

        {report?.breakdown?.length > 0 && (
          <>
            <h2 className="scan-report__heading">Every check we ran</h2>
            <ul className="scan-report__checks">
              {report.breakdown.map((item) => (
                <li key={item.id} className={`scan-report__check scan-report__check--${item.state}`}>
                  <span className="scan-report__check-label">{item.label}</span>
                  <span className="scan-report__check-detail">{item.detail}</span>
                </li>
              ))}
            </ul>
          </>
        )}

        {report?.nextSteps?.length > 0 && (
          <>
            <h2 className="scan-report__heading">Where to start</h2>
            <ol className="scan-report__steps">
              {report.nextSteps.map((step, index) => <li key={index}>{step}</li>)}
            </ol>
          </>
        )}

        <p className="scan-report__note">
          This scan looked at the single page above, not every page on the site.
          {unmeasured.length > 0 &&
            ` We could not complete these checks: ${unmeasured.map((u) => u.key).join(', ')}. They are not counted for or against the score.`}
        </p>

        <ContactBlock id={id} />
      </div>
    </section>
  );
}

/* Request-a-time. Updates the existing lead rather than creating a second one —
 * this is one prospect who has now asked for a call, not two enquiries. */
function ContactBlock({ id }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [note, setNote] = useState('');
  const [state, setState] = useState('idle');

  async function submit(event) {
    event.preventDefault();
    if (!email.trim() || !name.trim()) return;
    setState('sending');
    try {
      const res = await fetch('/api/scan/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          name,
          email,
          notes: preferredTime ? `Preferred call time: ${preferredTime}\nNotes: ${note}` : note,
        }),
      });
      setState(res.ok ? 'sent' : 'error');
    } catch {
      setState('error');
    }
  }

  return (
    <div className="scan-cta">
      <h2 className="scan-cta__heading">Want Steve to walk you through this?</h2>

      {state === 'sent' ? (
        <p className="scan-cta__done">
          Got it! Your report has been attached to your request. Steve will confirm a time by email. If it is urgent, call{' '}
          <a href="tel:+13237441338">323-744-1338</a>.
        </p>
      ) : (
        <form className="scan-cta__form" onSubmit={submit}>
          <label className="scan-cta__label" htmlFor="leadName">
            Your Name *
          </label>
          <input
            id="leadName"
            className="scan-cta__input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jane Doe"
            required
          />
          <label className="scan-cta__label" htmlFor="leadEmail">
            Email Address *
          </label>
          <input
            id="leadEmail"
            type="email"
            className="scan-cta__input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jane@company.com"
            required
          />
          <label className="scan-cta__label" htmlFor="preferredTime">
            When suits you for a call? (optional)
          </label>
          <input
            id="preferredTime"
            className="scan-cta__input"
            value={preferredTime}
            onChange={(e) => setPreferredTime(e.target.value)}
            placeholder="e.g. Tuesday or Wednesday afternoon"
          />
          <label className="scan-cta__label" htmlFor="note">
            Anything specific you want covered? (optional)
          </label>
          <textarea
            id="note"
            className="scan-cta__input scan-cta__input--area"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
          />
          <button className="scan-cta__btn" type="submit" disabled={state === 'sending'}>
            {state === 'sending' ? 'Sending…' : 'Attach Report & Request Consultation'}
          </button>
          {state === 'error' && (
            <p className="scan-cta__error">
              That did not send. Call <a href="tel:+13237441338">323-744-1338</a> or email{' '}
              <a href="mailto:steve@gobiya.com">steve@gobiya.com</a>.
            </p>
          )}
        </form>
      )}

      <p className="scan-cta__alt">
        Or reach us directly: <a href="tel:+13237441338">323-744-1338</a> ·{' '}
        <a href="mailto:steve@gobiya.com">steve@gobiya.com</a>
      </p>
    </div>
  );
}
