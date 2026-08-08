'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';

const STAGES = [
  'Fetching live page structure & metadata',
  'Analyzing titles, headings and schema markup',
  'Measuring load speed & Core Web Vitals',
  'Checking DNS, SSL security and sitemap index',
  'Generating AI visibility breakdown & key fixes',
];

const SEVERITY_LABEL = { high: 'High priority', medium: 'Worth fixing', low: 'Minor' };

function scoreTone(score) {
  if (score >= 80) return 'good';
  if (score >= 50) return 'warn';
  return 'bad';
}

export default function FreeSiteScanApp() {
  const searchParams = useSearchParams();
  const [inputUrl, setInputUrl] = useState('');
  const [phase, setPhase] = useState('input'); // input | scanning | report | failed
  const [auditId, setAuditId] = useState(null);
  const [scannedUrl, setScannedUrl] = useState('');
  const [score, setScore] = useState(null);
  const [report, setReport] = useState(null);
  const [collectorStatus, setCollectorStatus] = useState({});
  const [stage, setStage] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  const [failReason, setFailReason] = useState('');

  // Accordion open/collapse state for scan result sections (default open)
  const [openAccordions, setOpenAccordions] = useState({
    summary: true,
    findings: true,
    checklist: true,
    nextSteps: true,
  });

  const toggleAccordion = (key) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Lead form state
  const [leadForm, setLeadForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    notes: '',
    company_website: '', // honeypot
  });
  const [leadStatus, setLeadStatus] = useState('idle'); // idle | submitting | success | error
  const [leadError, setLeadError] = useState('');

  const tickerRef = useRef(null);

  // The homepage hero widget hands the domain over as ?url=. Prefill only —
  // the visitor still presses the button, so a shared or bookmarked link can't
  // fire a scan (and burn the API quota) just by being opened.
  useEffect(() => {
    const fromQuery = searchParams.get('url');
    if (fromQuery) setInputUrl(fromQuery);
  }, [searchParams]);

  const startScan = async (e) => {
    e.preventDefault();
    const raw = inputUrl.trim();
    if (!raw) {
      setErrorMsg('Please enter a website URL.');
      return;
    }

    setErrorMsg('');
    setPhase('scanning');
    setStage(0);

    try {
      const res = await fetch('/api/scan/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: raw }),
      });
      const data = await res.json();

      if (!res.ok) {
        setPhase('input');
        setErrorMsg(data.error || 'Could not validate URL.');
        return;
      }

      setAuditId(data.auditId);
      setScannedUrl(data.url);
      executeFullScan(data.auditId);
    } catch {
      setPhase('input');
      setErrorMsg('Network error starting scan. Please try again.');
    }
  };

  const executeFullScan = useCallback(async (id) => {
    tickerRef.current = setInterval(() => {
      setStage((current) => (current < STAGES.length - 1 ? current + 1 : current));
    }, 4000);

    try {
      const res = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const payload = await res.json();

      clearInterval(tickerRef.current);

      if (!res.ok) {
        setPhase('failed');
        setFailReason(payload.error || 'The scan could not be completed.');
        return;
      }

      if (payload.status === 'failed') {
        setPhase('failed');
        setFailReason(payload.reason || 'We could not reach that site.');
        return;
      }

      setScore(payload.score);
      setReport(payload.report);
      setCollectorStatus(payload.collectorStatus || {});
      setPhase('report');
    } catch {
      clearInterval(tickerRef.current);
      setPhase('failed');
      setFailReason('The scan could not be completed due to a connection error.');
    }
  }, []);

  useEffect(() => {
    return () => {
      if (tickerRef.current) clearInterval(tickerRef.current);
    };
  }, []);

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    if (!leadForm.name.trim() || !leadForm.email.trim()) {
      setLeadError('Name and email are required.');
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(leadForm.email.trim())) {
      setLeadError('Please enter a valid email address.');
      return;
    }

    setLeadStatus('submitting');
    setLeadError('');

    try {
      const res = await fetch('/api/scan/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: auditId,
          ...leadForm,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Could not submit your lead details.');
      }

      setLeadStatus('success');
    } catch (err) {
      setLeadStatus('error');
      setLeadError(err.message || 'Failed to submit lead details. Please try again.');
    }
  };

  const unmeasured = Object.entries(collectorStatus || {})
    .filter(([, value]) => value?.state && value.state !== 'ok')
    .map(([key, value]) => ({ key, reason: value.reason }));

  return (
    <div className="fss-app">
      {/* ══ PHASE 1: URL ENTRY FORM ══ */}
      {phase === 'input' && (
        <div className="fss-hero-box">
          <div className="fss-badge">Real-Time Domain &amp; AI Audit</div>
          <h1 className="fss-hero-title">Find Out Why You’re Not Being Found, Free</h1>
          <p className="fss-hero-subtitle">
            Enter your domain to instantly scan your website for Core Web Vitals, on-page SEO, security, and AI search readiness (ChatGPT, Perplexity &amp; Google Overviews).
          </p>

          <form className="fss-url-form" onSubmit={startScan} noValidate>
            <div className="fss-input-group">
              <span className="fss-input-icon">🌐</span>
              <input
                type="text"
                className="fss-url-input"
                placeholder="yourcompany.com or https://..."
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                autoFocus
              />
              <button type="submit" className="fss-scan-btn">
                Scan Site Free
              </button>
            </div>
            {errorMsg && <p className="fss-error-text" role="alert">{errorMsg}</p>}
          </form>

          <div className="fss-no-website-row">
            <button
              type="button"
              className="fss-no-website-btn"
              onClick={() => {
                setPhase('no-website');
                setLeadStatus('idle');
                setLeadError('');
              }}
            >
              Building a new business? <u>I don&apos;t have a website yet &rarr;</u>
            </button>
          </div>

          <div className="fss-trust-row">
            <span>✨ 100% Free &amp; Instant</span>
            <span>⚡ Real-Time Data (No Fabricated Metrics)</span>
            <span>👤 Direct Review by Steve Martin</span>
          </div>
        </div>
      )}

      {/* ══ PHASE 2: LIVE SCANNING PROGRESS ══ */}
      {phase === 'scanning' && (
        <div className="fss-scan-progress">
          <div className="fss-progress-card">
            <span className="fss-pulsing-dot" />
            <h2 className="fss-progress-title">Scanning {scannedUrl}</h2>
            <p className="fss-progress-dek">
              Our automated tools are fetching your page, measuring load performance, checking domain signals, and compiling AI recommendations. This takes ~20–30 seconds.
            </p>

            <div className="fss-progress-bar-wrap">
              <div
                className="fss-progress-bar-fill"
                style={{ width: `${Math.min(100, Math.max(15, ((stage + 1) / STAGES.length) * 100))}%` }}
              />
            </div>

            <ol className="fss-stages-list">
              {STAGES.map((label, index) => (
                <li
                  key={label}
                  className={`fss-stage-item ${index <= stage ? 'fss-stage-item--active' : ''}`}
                >
                  <span className="fss-stage-icon">
                    {index < stage ? '✓' : index === stage ? '⏳' : '○'}
                  </span>
                  <span>{label}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}

      {/* ══ PHASE 2 FAIL: HONEST FALLBACK ══ */}
      {phase === 'failed' && (
        <div className="fss-failed-card">
          <h2 className="fss-failed-title">We could not scan {scannedUrl}</h2>
          <p className="fss-failed-reason">
            {failReason} This usually happens if the domain is blocking automated crawlers, behind a firewall, or temporarily unavailable.
          </p>
          <p className="fss-failed-dek">
            You can still submit your details below to have Steve review your website manually!
          </p>

          <div className="fss-lead-card" style={{ marginTop: '2rem' }}>
            <h3 className="fss-lead-title">Request a Manual Audit from Steve</h3>
            {leadStatus === 'success' ? (
              <div className="fss-lead-success">
                ✅ <strong>Details Received!</strong> Steve will personally audit {scannedUrl} and send you his findings within 24 hours.
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="fss-lead-form">
                <input
                  type="text"
                  name="company_website"
                  value={leadForm.company_website}
                  onChange={(e) => setLeadForm({ ...leadForm, company_website: e.target.value })}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />
                <div className="fss-form-row">
                  <div className="fss-field">
                    <label htmlFor="failed-name">Full Name *</label>
                    <input
                      id="failed-name"
                      type="text"
                      value={leadForm.name}
                      onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="fss-field">
                    <label htmlFor="failed-email">Email Address *</label>
                    <input
                      id="failed-email"
                      type="email"
                      value={leadForm.email}
                      onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <button type="submit" className="fss-submit-btn" disabled={leadStatus === 'submitting'}>
                  {leadStatus === 'submitting' ? 'Submitting…' : 'Request Manual Audit'}
                </button>
              </form>
            )}
          </div>

          <button type="button" className="fss-retry-btn" onClick={() => setPhase('input')}>
            ← Try another URL
          </button>
        </div>
      )}

      {/* ══ PHASE: NO WEBSITE YET (DIRECT CONSULTATION FORM) ══ */}
      {phase === 'no-website' && (
        <div className="fss-no-website-container">
          <div className="fss-lead-card" id="no-website-form">
            <div className="fss-lead-header">
              <span className="fss-lead-badge">New Website &amp; SEO Strategy</span>
              <h2 className="fss-lead-title">Planning a New Website Build?</h2>
              <p className="fss-lead-subtitle">
                Tell us about your project and business goals. Steve Martin will personally outline the ideal site structure, tech stack, and launch strategy built for Google and AI search from day one.
              </p>
            </div>

            {leadStatus === 'success' ? (
              <div className="fss-lead-success">
                <div className="fss-success-icon">🚀</div>
                <h3>Project Request Received!</h3>
                <p>
                  We have received your project details. Steve will review your requirements and reach out within 24 business hours to discuss your new website build.
                </p>
                <p className="fss-direct-contact">
                  Need immediate help? Call Steve directly at <a href="tel:+13237441338">323-744-1338</a> or email <a href="mailto:hello@gobiya.com">hello@gobiya.com</a>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="fss-lead-form" noValidate>
                {/* Honeypot */}
                <input
                  type="text"
                  name="company_website"
                  value={leadForm.company_website}
                  onChange={(e) => setLeadForm({ ...leadForm, company_website: e.target.value })}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="fss-form-grid">
                  <div className="fss-field">
                    <label htmlFor="nw-name">Full Name *</label>
                    <input
                      id="nw-name"
                      type="text"
                      placeholder="Jane Doe"
                      value={leadForm.name}
                      onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="fss-field">
                    <label htmlFor="nw-email">Email Address *</label>
                    <input
                      id="nw-email"
                      type="email"
                      placeholder="jane@company.com"
                      value={leadForm.email}
                      onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="fss-field">
                    <label htmlFor="nw-phone">Phone Number (optional)</label>
                    <input
                      id="nw-phone"
                      type="tel"
                      placeholder="(323) 555-0199"
                      value={leadForm.phone}
                      onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                    />
                  </div>

                  <div className="fss-field">
                    <label htmlFor="nw-company">Business Name / Industry *</label>
                    <input
                      id="nw-company"
                      type="text"
                      placeholder="e.g., Dental Practice, Security, Plumbing"
                      value={leadForm.company}
                      onChange={(e) => setLeadForm({ ...leadForm, company: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="fss-field fss-field--full">
                  <label htmlFor="nw-notes">What are your website goals or target launch timeline?</label>
                  <textarea
                    id="nw-notes"
                    rows={3}
                    placeholder="e.g., We need a brand new site with local SEO built in, aiming to launch next month..."
                    value={leadForm.notes}
                    onChange={(e) => setLeadForm({ ...leadForm, notes: e.target.value })}
                  />
                </div>

                {leadError && <p className="fss-error-text" role="alert">{leadError}</p>}

                <button type="submit" className="fss-submit-btn" disabled={leadStatus === 'submitting'}>
                  {leadStatus === 'submitting' ? 'Submitting Request…' : 'Request New Website Consultation'}
                </button>

                <p className="fss-disclaimer">
                  No pushy sales calls. Steve personally reviews every submission. By submitting, you agree to our <a href="/privacy">Privacy Policy</a>.
                </p>
              </form>
            )}

            <button type="button" className="fss-retry-btn" style={{ marginTop: '1.5rem' }} onClick={() => setPhase('input')}>
              &larr; Back to free site scan
            </button>
          </div>
        </div>
      )}

      {/* ══ PHASE 3: LIGHTWEIGHT SEMI-DETAILED REPORT (COLLAPSIBLE ACCORDIONS) ══ */}
      {phase === 'report' && (
        <div className="fss-report-container">
          <div className="fss-report-header">
            <div className="fss-report-meta">
              <span className="fss-report-label">Site Scan Report</span>
              <h1 className="fss-report-url">{scannedUrl}</h1>
            </div>
            <div className={`fss-score-badge fss-score-badge--${scoreTone(score)}`}>
              <span className="fss-score-val">{score}</span>
              <span className="fss-score-max">/100</span>
              <span className="fss-score-label">Overall Health</span>
            </div>
          </div>

          {/* Accordion Section 1: AI Summary */}
          {report?.summary && (
            <div className="fss-report-section fss-accordion-card">
              <button
                type="button"
                className={`fss-accordion-header ${openAccordions.summary ? 'fss-accordion-header--open' : ''}`}
                onClick={() => toggleAccordion('summary')}
                aria-expanded={openAccordions.summary}
              >
                <h2 className="fss-section-heading">Executive AI Summary</h2>
                <span className="fss-accordion-icon">{openAccordions.summary ? '▲' : '▼'}</span>
              </button>
              {openAccordions.summary && (
                <div className="fss-accordion-content">
                  <p className="fss-summary-text">{report.summary}</p>
                </div>
              )}
            </div>
          )}

          {/* Accordion Section 2: Key Findings */}
          {report?.findings?.length > 0 && (
            <div className="fss-report-section fss-accordion-card">
              <button
                type="button"
                className={`fss-accordion-header ${openAccordions.findings ? 'fss-accordion-header--open' : ''}`}
                onClick={() => toggleAccordion('findings')}
                aria-expanded={openAccordions.findings}
              >
                <h2 className="fss-section-heading">Key Findings &amp; High-Impact Fixes</h2>
                <span className="fss-accordion-icon">{openAccordions.findings ? '▲' : '▼'}</span>
              </button>
              {openAccordions.findings && (
                <div className="fss-accordion-content">
                  <div className="fss-findings-grid">
                    {report.findings.map((finding, index) => (
                      <div key={index} className={`fss-finding-card fss-finding-card--${finding.severity}`}>
                        <div className="fss-finding-badge">{SEVERITY_LABEL[finding.severity] || 'Note'}</div>
                        <h3 className="fss-finding-title">{finding.title}</h3>
                        <p className="fss-finding-why">{finding.why}</p>
                        <div className="fss-finding-fix">
                          <strong>Action Item:</strong> {finding.fix}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Accordion Section 3: Checks Breakdown */}
          {report?.breakdown?.length > 0 && (
            <div className="fss-report-section fss-accordion-card">
              <button
                type="button"
                className={`fss-accordion-header ${openAccordions.checklist ? 'fss-accordion-header--open' : ''}`}
                onClick={() => toggleAccordion('checklist')}
                aria-expanded={openAccordions.checklist}
              >
                <h2 className="fss-section-heading">Technical &amp; On-Page Audit Checklist</h2>
                <span className="fss-accordion-icon">{openAccordions.checklist ? '▲' : '▼'}</span>
              </button>
              {openAccordions.checklist && (
                <div className="fss-accordion-content">
                  <ul className="fss-checks-list">
                    {report.breakdown.map((item) => (
                      <li key={item.id} className={`fss-check-item fss-check-item--${item.state}`}>
                        <span className="fss-check-status">
                          {item.state === 'pass' ? '✓' : item.state === 'warn' ? '⚠️' : item.state === 'fail' ? '❌' : '○'}
                        </span>
                        <span className="fss-check-label">{item.label}</span>
                        <span className="fss-check-detail">{item.detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Accordion Section 4: Priority Next Steps */}
          {report?.nextSteps?.length > 0 && (
            <div className="fss-report-section fss-accordion-card">
              <button
                type="button"
                className={`fss-accordion-header ${openAccordions.nextSteps ? 'fss-accordion-header--open' : ''}`}
                onClick={() => toggleAccordion('nextSteps')}
                aria-expanded={openAccordions.nextSteps}
              >
                <h2 className="fss-section-heading">Priority Next Steps</h2>
                <span className="fss-accordion-icon">{openAccordions.nextSteps ? '▲' : '▼'}</span>
              </button>
              {openAccordions.nextSteps && (
                <div className="fss-accordion-content">
                  <ol className="fss-steps-list">
                    {report.nextSteps.map((step, idx) => (
                      <li key={idx}>{step}</li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          )}

          {unmeasured.length > 0 && (
            <p className="fss-unmeasured-note">
              Note: The following checks could not be measured on this run: {unmeasured.map((u) => u.key).join(', ')}. They were omitted from scoring.
            </p>
          )}

          {/* ══ PHASE 4: LEAD GENERATION FORM (PERMANENTLY OPEN / NON-COLLAPSIBLE) ══ */}
          <div className="fss-lead-card" id="lead-form">
            <div className="fss-lead-header">
              <span className="fss-lead-badge">Free Follow-Up Strategy</span>
              <h2 className="fss-lead-title">Want Steve to walk you through these findings?</h2>
              <p className="fss-lead-subtitle">
                Submit your details below to attach this report to a free consultation with Steve. We&apos;ll also email a copy of this full audit report directly to your inbox.
              </p>
            </div>

            {leadStatus === 'success' ? (
              <div className="fss-lead-success">
                <div className="fss-success-icon">🎉</div>
                <h3>Report Attached &amp; Emailed!</h3>
                <p>
                  We have emailed your site report to <strong>{leadForm.email}</strong> and attached it to your consultation request. Steve will review your website data and reach out within 24 business hours.
                </p>
                <p className="fss-direct-contact">
                  Need immediate help? Call Steve directly at <a href="tel:+13237441338">323-744-1338</a> or email <a href="mailto:hello@gobiya.com">hello@gobiya.com</a>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="fss-lead-form" noValidate>
                {/* Honeypot */}
                <input
                  type="text"
                  name="company_website"
                  value={leadForm.company_website}
                  onChange={(e) => setLeadForm({ ...leadForm, company_website: e.target.value })}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="fss-form-grid">
                  <div className="fss-field">
                    <label htmlFor="lead-name">Full Name *</label>
                    <input
                      id="lead-name"
                      type="text"
                      placeholder="Jane Doe"
                      value={leadForm.name}
                      onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="fss-field">
                    <label htmlFor="lead-email">Email Address *</label>
                    <input
                      id="lead-email"
                      type="email"
                      placeholder="jane@company.com"
                      value={leadForm.email}
                      onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="fss-field">
                    <label htmlFor="lead-phone">Phone Number (optional)</label>
                    <input
                      id="lead-phone"
                      type="tel"
                      placeholder="(323) 555-0199"
                      value={leadForm.phone}
                      onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                    />
                  </div>

                  <div className="fss-field">
                    <label htmlFor="lead-company">Company Name (optional)</label>
                    <input
                      id="lead-company"
                      type="text"
                      placeholder="Acme Inc."
                      value={leadForm.company}
                      onChange={(e) => setLeadForm({ ...leadForm, company: e.target.value })}
                    />
                  </div>
                </div>

                <div className="fss-field fss-field--full">
                  <label htmlFor="lead-notes">Any specific questions or goals? (optional)</label>
                  <textarea
                    id="lead-notes"
                    rows={3}
                    placeholder="e.g., We want to improve our local rankings or ChatGPT recommendations..."
                    value={leadForm.notes}
                    onChange={(e) => setLeadForm({ ...leadForm, notes: e.target.value })}
                  />
                </div>

                {leadError && <p className="fss-error-text" role="alert">{leadError}</p>}

                <button type="submit" className="fss-submit-btn" disabled={leadStatus === 'submitting'}>
                  {leadStatus === 'submitting' ? 'Attaching & Emailing Report…' : 'Attach Report & Submit Request'}
                </button>

                <p className="fss-disclaimer">
                  No pushy sales calls. Steve personally reviews every submission. By submitting, you agree to our <a href="/privacy">Privacy Policy</a>.
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
