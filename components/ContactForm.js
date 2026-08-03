'use client';

import { useState } from 'react';

/* The message form on /contact. Same POST target and honeypot field as
   HeroQuickForm — /api/quick-contact — but full-width, with a subject line and
   a real message box, because this is the page a visitor lands on when they
   already know what they want to say. Styling is in globals.css under
   .mw-cform rather than inline, since this form is large enough that inline
   style props would bury the markup. */

const SUBJECTS = [
  'New project inquiry',
  'SEO / AI visibility',
  'Website or web app build',
  'Existing client support',
  'Something else',
];

export default function ContactForm() {
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    data.current_page = typeof window !== 'undefined' ? window.location.href : 'Unknown';

    try {
      const res = await fetch('/api/quick-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Failed to send your message.');

      setStatus('success');
      e.target.reset();
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message);
    }
  };

  if (status === 'success') {
    return (
      <div className="mw-cform">
        <h2 className="mw-cform__title">Thanks — your message is in.</h2>
        <p className="mw-cform__dek">
          Steve reads these himself and replies within one business day. If it&apos;s
          urgent, call <a href="tel:+13237441338">323-744-1338</a>.
        </p>
        <button type="button" className="mw-cform__btn" onClick={() => setStatus('idle')}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className="mw-cform">
      <h2 className="mw-cform__title">Send us a message</h2>
      <p className="mw-cform__dek">
        Tell us what you&apos;re working on. You&apos;ll hear back within one business day —
        from the person who does the work, not a sales rep.
      </p>

      <form onSubmit={handleSubmit} className="mw-cform__form" noValidate={false}>
        {/* Honeypot — real people never see or fill this. */}
        <input
          type="text"
          name="company_website"
          className="mw-cform__honeypot"
          tabIndex="-1"
          autoComplete="off"
          aria-hidden="true"
        />

        <div className="mw-cform__row">
          <div className="mw-cform__field">
            <label className="mw-cform__label" htmlFor="cf-name">
              Name <span className="mw-cform__req">*</span>
            </label>
            <input
              className="mw-cform__input"
              type="text"
              id="cf-name"
              name="name"
              autoComplete="name"
              required
            />
          </div>

          <div className="mw-cform__field">
            <label className="mw-cform__label" htmlFor="cf-company">
              Company
            </label>
            <input
              className="mw-cform__input"
              type="text"
              id="cf-company"
              name="company"
              autoComplete="organization"
            />
          </div>
        </div>

        <div className="mw-cform__row">
          <div className="mw-cform__field">
            <label className="mw-cform__label" htmlFor="cf-email">
              Email <span className="mw-cform__req">*</span>
            </label>
            <input
              className="mw-cform__input"
              type="email"
              id="cf-email"
              name="email"
              autoComplete="email"
              required
            />
          </div>

          <div className="mw-cform__field">
            <label className="mw-cform__label" htmlFor="cf-phone">
              Phone
            </label>
            <input
              className="mw-cform__input"
              type="tel"
              id="cf-phone"
              name="phone"
              autoComplete="tel"
            />
          </div>
        </div>

        <div className="mw-cform__row">
          <div className="mw-cform__field">
            <label className="mw-cform__label" htmlFor="cf-website">
              Website
            </label>
            <input
              className="mw-cform__input"
              type="text"
              id="cf-website"
              name="website"
              placeholder="yourbusiness.com"
            />
          </div>

          <div className="mw-cform__field">
            <label className="mw-cform__label" htmlFor="cf-subject">
              What&apos;s this about?
            </label>
            <select className="mw-cform__input" id="cf-subject" name="subject" defaultValue={SUBJECTS[0]}>
              {SUBJECTS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mw-cform__field">
          <label className="mw-cform__label" htmlFor="cf-message">
            Message <span className="mw-cform__req">*</span>
          </label>
          <textarea
            className="mw-cform__input mw-cform__textarea"
            id="cf-message"
            name="message"
            rows="6"
            required
          />
        </div>

        {status === 'error' && (
          <p className="mw-cform__error" role="alert">
            {errorMsg} You can also email{' '}
            <a href="mailto:hello@gobiya.com">hello@gobiya.com</a>.
          </p>
        )}

        <div className="mw-cform__actions">
          <button type="submit" className="mw-cform__btn" disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Sending…' : 'Send Message'}
          </button>
          <p className="mw-cform__fine">
            By submitting this form you agree to our <a href="/privacy">Privacy Policy</a> and{' '}
            <a href="/terms">Terms of Service</a>. We never share your information.
          </p>
        </div>
      </form>
    </div>
  );
}
