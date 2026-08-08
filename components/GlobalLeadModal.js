'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

function ModalContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (searchParams?.has('onboarding')) {
      setIsOpen(true);
      document.body.style.overflow = 'hidden';
    } else {
      setIsOpen(false);
      document.body.style.overflow = '';
    }
  }, [searchParams]);

  const close = () => {
    // Remove the ?onboarding=true param
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete('onboarding');
    const newUrl = `${pathname}${newParams.toString() ? `?${newParams.toString()}` : ''}`;
    router.replace(newUrl, { scroll: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    data.current_page = typeof window !== 'undefined' ? window.location.href : 'Unknown';

    try {
      const res = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || 'Failed to submit.');
      }

      setStatus('success');
      setTimeout(() => {
        close();
        setStatus('idle');
      }, 3000);
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMsg(err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={close}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={close} aria-label="Close modal">&times;</button>
        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Request a Quote</h2>
        
        {status === 'success' ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text)' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--main)' }}>Thank you!</h3>
            <p>We have received your details and will be in touch shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input type="text" name="company_website" style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label className="modal-label" htmlFor="lead-name">Name *</label>
                <input className="modal-input" type="text" id="lead-name" name="name" required />
              </div>
              <div>
                <label className="modal-label" htmlFor="lead-email">Email *</label>
                <input className="modal-input" type="email" id="lead-email" name="email" required />
              </div>
            </div>

            <div>
              <label className="modal-label" htmlFor="lead-website">Website URL *</label>
              <input className="modal-input" type="url" id="lead-website" name="website" placeholder="https://" required />
            </div>

            <div>
              <label className="modal-label" htmlFor="lead-source">How did you find us?</label>
              <select className="modal-input" id="lead-source" name="how_found">
                <option value="">Select an option...</option>
                <option value="google">Google Search</option>
                <option value="social">Social Media</option>
                <option value="referral">Referral</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="modal-label" htmlFor="lead-pain">Primary Pain Points</label>
              <textarea className="modal-input" id="lead-pain" name="pain_points" rows="3" placeholder="E.g., Traffic dropped, not ranking, low conversions..."></textarea>
            </div>

            <div>
              <label className="modal-label" htmlFor="lead-outcomes">Desired Outcomes</label>
              <textarea className="modal-input" id="lead-outcomes" name="outcomes" rows="3" placeholder="E.g., Higher rankings, more leads..."></textarea>
            </div>

            {errorMsg && <div style={{ color: '#ef4444', fontSize: '0.875rem' }}>{errorMsg}</div>}

            <button type="submit" className="btn btn--solid" disabled={status === 'submitting'} style={{ marginTop: '0.5rem', width: '100%' }}>
              {status === 'submitting' ? 'Submitting...' : 'Request Quote'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function GlobalLeadModal() {
  return (
    <Suspense fallback={null}>
      <ModalContent />
    </Suspense>
  );
}

