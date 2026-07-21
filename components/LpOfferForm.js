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
    <div className="hero-quick-form" style={{
      background: '#ffffff',
      border: '1px solid #e5e5e5',
      borderRadius: '8px',
      padding: '2rem',
      boxShadow: 'none',
      width: '100%',
      maxWidth: '420px',
      margin: '0 auto',
      textAlign: 'left'
    }}>
      <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#111827', fontFamily: 'var(--font-heading)' }}>Claim the Q3 Growth Bundle</h3>
      <p style={{ fontSize: '0.8125rem', color: '#4b5563', marginBottom: '1.5rem', lineHeight: '1.4' }}>
        Tell us where to send the details — Steve replies within one business day.
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <input type="text" name="company_website" style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />
        <input type="hidden" name="ref" value={source} />
        <input type="hidden" name="offer" value="Q3 Growth Bundle" />

        <div>
          <label htmlFor="lpf-name" style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#4b5563', marginBottom: '0.375rem' }}>Name <span style={{color: '#e41613'}}>*</span></label>
          <input type="text" id="lpf-name" name="name" required style={{ width: '100%', padding: '0.75rem', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '6px', color: '#111827', outline: 'none', fontSize: '0.9375rem', transition: 'border-color 0.2s' }} onFocus={(e) => e.target.style.borderColor = '#9ca3af'} onBlur={(e) => e.target.style.borderColor = '#e5e7eb'} />
        </div>

        <div>
          <label htmlFor="lpf-email" style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#4b5563', marginBottom: '0.375rem' }}>Email <span style={{color: '#e41613'}}>*</span></label>
          <input type="email" id="lpf-email" name="email" required style={{ width: '100%', padding: '0.75rem', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '6px', color: '#111827', outline: 'none', fontSize: '0.9375rem', transition: 'border-color 0.2s' }} onFocus={(e) => e.target.style.borderColor = '#9ca3af'} onBlur={(e) => e.target.style.borderColor = '#e5e7eb'} />
        </div>

        <div>
          <label htmlFor="lpf-phone" style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#4b5563', marginBottom: '0.375rem' }}>Phone</label>
          <input type="tel" id="lpf-phone" name="phone" style={{ width: '100%', padding: '0.75rem', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '6px', color: '#111827', outline: 'none', fontSize: '0.9375rem', transition: 'border-color 0.2s' }} onFocus={(e) => e.target.style.borderColor = '#9ca3af'} onBlur={(e) => e.target.style.borderColor = '#e5e7eb'} />
        </div>

        <div>
          <label htmlFor="lpf-message" style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#4b5563', marginBottom: '0.375rem' }}>Message</label>
          <textarea id="lpf-message" name="message" rows="2" style={{ width: '100%', padding: '0.75rem', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '6px', color: '#111827', outline: 'none', resize: 'vertical', fontSize: '0.9375rem', transition: 'border-color 0.2s' }} onFocus={(e) => e.target.style.borderColor = '#9ca3af'} onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}></textarea>
        </div>

        {status === 'error' && (
          <div style={{ color: '#ef4444', fontSize: '0.875rem' }}>{errorMsg}</div>
        )}

        <button type="submit" disabled={status === 'submitting'} style={{ marginTop: '0.5rem', background: '#e41613', color: '#fff', border: 'none', padding: '0.875rem', borderRadius: '6px', fontWeight: '600', cursor: status === 'submitting' ? 'not-allowed' : 'pointer', opacity: status === 'submitting' ? 0.7 : 1, transition: 'background 0.2s, opacity 0.2s', fontSize: '0.9375rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
          {status === 'submitting' ? 'Sending...' : 'Claim Offer'}
        </button>

        <p style={{ fontSize: '0.6875rem', color: '#6b7280', textAlign: 'center', marginTop: '-0.25rem', lineHeight: '1.4' }}>
          By submitting this form, you agree to our <a href="/privacy" style={{ color: '#4b5563', textDecoration: 'underline' }}>Privacy Policy</a> and <a href="/terms" style={{ color: '#4b5563', textDecoration: 'underline' }}>Terms of Service</a>. We will never share your information.
        </p>
      </form>
    </div>
  );
}
