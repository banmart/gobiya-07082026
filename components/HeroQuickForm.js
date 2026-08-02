'use client';

import { useState } from 'react';

export default function HeroQuickForm() {
  const [status, setStatus] = useState('idle'); // 'idle', 'submitting', 'success', 'error'
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
      if (!res.ok) {
        throw new Error(result.error || 'Failed to send request.');
      }

      setStatus('success');
      e.target.reset();
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMsg(err.message);
    }
  };

  return (
    <div
      className="hero-quick-form"
      style={{
        background: 'var(--surface-raised)',
        border: '1px solid var(--border)',
        borderRadius: '8px',
        padding: '2rem',
        boxShadow: 'none',
        width: '100%',
        maxWidth: '420px',
        margin: '0 auto',
        textAlign: 'left',
      }}
    >
      <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text)' }}>Request a Consultation</h3>
      <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: '1.4' }}>
        Serving <strong style={{ color: 'var(--text)', fontWeight: 600 }}>Koreatown, Los Angeles, Hollywood, Beverly Hills, and Van Nuys.</strong>
      </p>

      {status === 'success' ? (
        <div
          style={{
            padding: '1rem',
            background: 'rgba(22, 163, 74, 0.12)',
            border: '1px solid rgba(22, 163, 74, 0.3)',
            borderRadius: '6px',
            color: 'var(--text)',
            fontSize: '0.9375rem',
          }}
        >
          Thank you! We&apos;ll be in touch shortly.
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <input type="text" name="company_website" style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />

          <div>
            <label
              htmlFor="hqf-name"
              style={{
                display: 'block',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: 'var(--text-muted)',
                marginBottom: '0.375rem',
              }}
            >
              Name <span style={{ color: 'var(--main)' }}>*</span>
            </label>
            <input
              type="text"
              id="hqf-name"
              name="name"
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                background: 'var(--surface-sunken)',
                border: '1px solid var(--border)',
                borderRadius: '6px',
                color: 'var(--text)',
                outline: 'none',
                fontSize: '0.9375rem',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--border-strong)')}
              onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
            />
          </div>

          <div>
            <label
              htmlFor="hqf-email"
              style={{
                display: 'block',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: 'var(--text-muted)',
                marginBottom: '0.375rem',
              }}
            >
              Email <span style={{ color: 'var(--main)' }}>*</span>
            </label>
            <input
              type="email"
              id="hqf-email"
              name="email"
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                background: 'var(--surface-sunken)',
                border: '1px solid var(--border)',
                borderRadius: '6px',
                color: 'var(--text)',
                outline: 'none',
                fontSize: '0.9375rem',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--border-strong)')}
              onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
            />
          </div>

          <div>
            <label
              htmlFor="hqf-phone"
              style={{
                display: 'block',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: 'var(--text-muted)',
                marginBottom: '0.375rem',
              }}
            >
              Phone
            </label>
            <input
              type="tel"
              id="hqf-phone"
              name="phone"
              style={{
                width: '100%',
                padding: '0.75rem',
                background: 'var(--surface-sunken)',
                border: '1px solid var(--border)',
                borderRadius: '6px',
                color: 'var(--text)',
                outline: 'none',
                fontSize: '0.9375rem',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--border-strong)')}
              onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
            />
          </div>

          <div>
            <label
              htmlFor="hqf-message"
              style={{
                display: 'block',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: 'var(--text-muted)',
                marginBottom: '0.375rem',
              }}
            >
              Message
            </label>
            <textarea
              id="hqf-message"
              name="message"
              rows="2"
              style={{
                width: '100%',
                padding: '0.75rem',
                background: 'var(--surface-sunken)',
                border: '1px solid var(--border)',
                borderRadius: '6px',
                color: 'var(--text)',
                outline: 'none',
                resize: 'vertical',
                fontSize: '0.9375rem',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--border-strong)')}
              onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
            ></textarea>
          </div>

          {status === 'error' && <div style={{ color: 'var(--main)', fontSize: '0.875rem' }}>{errorMsg}</div>}

          <button
            type="submit"
            disabled={status === 'submitting'}
            style={{
              marginTop: '0.5rem',
              background: 'var(--main)',
              color: '#ffffff',
              border: 'none',
              padding: '0.875rem',
              borderRadius: '6px',
              fontWeight: '600',
              cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
              opacity: status === 'submitting' ? 0.7 : 1,
              transition: 'background 0.2s, opacity 0.2s',
              fontSize: '0.9375rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            {status === 'submitting' ? 'Sending...' : 'Send Request'}
          </button>

          <p style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '-0.25rem', lineHeight: '1.4' }}>
            By submitting this form, you agree to our{' '}
            <a href="/privacy" style={{ color: 'var(--text)', textDecoration: 'underline' }}>
              Privacy Policy
            </a>{' '}
            and{' '}
            <a href="/terms" style={{ color: 'var(--text)', textDecoration: 'underline' }}>
              Terms of Service
            </a>
            . We will never share your information.
          </p>
        </form>
      )}
    </div>
  );
}
