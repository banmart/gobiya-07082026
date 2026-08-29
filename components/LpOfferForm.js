'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LpOfferForm({ source }) {
  const router = useRouter();
  const [status, setStatus] = useState('idle'); // 'idle', 'submitting', 'error'
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    data.current_page = typeof window !== 'undefined' ? window.location.href : 'Unknown';

    try {
      const res = await fetch('/api/lp-offer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || 'Failed to send request.');
      }

      router.push('/lp/thank-you');
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMsg(err.message);
    }
  };

  return (
    <div className="lp-form">
      <h2 className="lp-form__title">Claim the Custom AI CRM Offer</h2>
      <p className="lp-form__sub">
        Tell us where to send the details — Steve replies within one business day.
      </p>

      <form onSubmit={handleSubmit} className="lp-form__form">
        {/* Honeypot — a real user never sees this, a bot fills it in. */}
        <input type="text" name="company_website" className="lp-form__honeypot" tabIndex="-1" autoComplete="off" aria-hidden="true" />
        <input type="hidden" name="ref" value={source} />
        <input type="hidden" name="offer" value="Custom AI CRM" />

        <div className="lp-form__field">
          <label htmlFor="lpf-name" className="lp-form__label">
            Name <span className="lp-form__req" aria-hidden="true">*</span>
          </label>
          <input type="text" id="lpf-name" name="name" required autoComplete="name" className="lp-form__input" />
        </div>

        <div className="lp-form__field">
          <label htmlFor="lpf-email" className="lp-form__label">
            Email <span className="lp-form__req" aria-hidden="true">*</span>
          </label>
          <input type="email" id="lpf-email" name="email" required autoComplete="email" className="lp-form__input" />
        </div>

        <div className="lp-form__field">
          <label htmlFor="lpf-phone" className="lp-form__label">Phone</label>
          <input type="tel" id="lpf-phone" name="phone" autoComplete="tel" className="lp-form__input" />
        </div>

        <div className="lp-form__field">
          <label htmlFor="lpf-message" className="lp-form__label">What do you need?</label>
          <textarea id="lpf-message" name="message" rows="2" className="lp-form__input lp-form__input--area"></textarea>
        </div>

        {status === 'error' && (
          <p className="lp-form__error" role="alert">{errorMsg}</p>
        )}

        <button type="submit" disabled={status === 'submitting'} className="lp-form__submit">
          {status === 'submitting' ? 'Sending…' : 'Claim Offer'}
        </button>

        <p className="lp-form__legal">
          By submitting this form, you agree to our <a href="/privacy">Privacy Policy</a> and{' '}
          <a href="/terms">Terms of Service</a>. We will never share your information.
        </p>
      </form>
    </div>
  );
}
