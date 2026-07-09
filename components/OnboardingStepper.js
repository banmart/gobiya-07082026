'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const INDUSTRIES = [
  { value: 'local-service', label: 'Local service business' },
  { value: 'enterprise-b2b', label: 'Enterprise & B2B' },
  { value: 'healthcare', label: 'Healthcare & Dental' },
  { value: 'professional', label: 'Professional services' },
  { value: 'ecommerce', label: 'E-commerce' },
  { value: 'other', label: 'Other' },
];

const GOALS = [
  { value: 'traffic', label: 'More organic traffic' },
  { value: 'rankings', label: 'Higher rankings for target keywords' },
  { value: 'recovery', label: 'Recover from a Google penalty / traffic drop' },
  { value: 'sales', label: 'More sales & leads' },
  { value: 'ai-visibility', label: 'Get cited in ChatGPT, Perplexity & AI Overviews' },
  { value: 'unsure', label: 'Not sure yet — need direction' },
];

const CHALLENGES = [
  { value: 'traffic-drop', label: 'Traffic dropped after an algorithm update' },
  { value: 'no-rankings', label: "Not ranking for the keywords that matter" },
  { value: 'no-ai-visibility', label: 'Not showing up in ChatGPT / AI Overviews' },
  { value: 'conversion', label: 'Site gets visits but not conversions' },
  { value: 'no-strategy', label: 'No real SEO strategy in place yet' },
  { value: 'other', label: 'Something else' },
];

const BUDGETS = [
  { value: 'under-2k', label: 'Under $2,000/mo' },
  { value: '2k-5k', label: '$2,000 – $5,000/mo' },
  { value: '5k-10k', label: '$5,000 – $10,000/mo' },
  { value: '10k-plus', label: '$10,000+/mo' },
  { value: 'unsure', label: 'Not sure yet' },
];

const TIMELINES = [
  { value: 'asap', label: 'ASAP' },
  { value: 'this-month', label: 'This month' },
  { value: 'this-quarter', label: 'This quarter' },
  { value: 'exploring', label: 'Just exploring' },
];

const INITIAL_STATE = {
  name: '',
  email: '',
  phone: '',
  company: '',
  website: '',
  industry: '',
  goal: '',
  challenges: [],
  budget: '',
  timeline: '',
  notes: '',
  company_website: '', // honeypot
};

const STEP_COUNT = 5;

function toggleChallenge(list, value) {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

export default function OnboardingStepper() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(INITIAL_STATE);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError('');
  }

  function validateStep() {
    if (step === 1) {
      if (!form.name.trim() || !form.email.trim()) {
        setError('Name and email are required.');
        return false;
      }
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(form.email.trim())) {
        setError('Please enter a valid email address.');
        return false;
      }
    }
    if (step === 2 && !form.industry) {
      setError('Pick the option closest to your business.');
      return false;
    }
    if (step === 3 && !form.goal) {
      setError('Pick your primary goal.');
      return false;
    }
    if (step === 4 && form.challenges.length === 0) {
      setError('Select at least one challenge.');
      return false;
    }
    return true;
  }

  function goNext() {
    if (!validateStep()) return;
    setStep((s) => Math.min(s + 1, STEP_COUNT));
  }

  function goBack() {
    setError('');
    setStep((s) => Math.max(s - 1, 1));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (step === 5 && (!form.budget || !form.timeline)) {
      setError('Pick a budget range and a timeline.');
      return;
    }

    setStatus('submitting');
    setError('');

    try {
      const res = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const payload = await res.json();
      if (!res.ok) {
        throw new Error(payload.error || 'Something went wrong.');
      }
      setStatus('success');
      router.push('/onboarding/thank-you');
    } catch (err) {
      setStatus('error');
      setError(err.message || 'Something went wrong. Please try again.');
    }
  }

  return (
    <form className="stepper" onSubmit={handleSubmit} noValidate>
      <div className="stepper__progress" role="progressbar" aria-valuemin={1} aria-valuemax={STEP_COUNT} aria-valuenow={step}>
        <div className="stepper__progress-bar" style={{ width: `${(step / STEP_COUNT) * 100}%` }} />
      </div>
      <p className="stepper__step-label">Step {step} of {STEP_COUNT}</p>

      {/* honeypot — hidden from real users, catches bots */}
      <input
        type="text"
        name="company_website"
        value={form.company_website}
        onChange={(e) => update('company_website', e.target.value)}
        className="stepper__honeypot"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      {step === 1 && (
        <fieldset className="stepper__fieldset">
          <legend className="stepper__legend">Let&apos;s start with the basics.</legend>
          <div className="stepper__field">
            <label className="stepper__label" htmlFor="name">Full name *</label>
            <input id="name" className="stepper__input" type="text" value={form.name} onChange={(e) => update('name', e.target.value)} required />
          </div>
          <div className="stepper__field">
            <label className="stepper__label" htmlFor="email">Email *</label>
            <input id="email" className="stepper__input" type="email" value={form.email} onChange={(e) => update('email', e.target.value)} required />
          </div>
          <div className="stepper__field">
            <label className="stepper__label" htmlFor="phone">Phone</label>
            <input id="phone" className="stepper__input" type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} />
          </div>
          <div className="stepper__field">
            <label className="stepper__label" htmlFor="company">Company</label>
            <input id="company" className="stepper__input" type="text" value={form.company} onChange={(e) => update('company', e.target.value)} />
          </div>
          <div className="stepper__field">
            <label className="stepper__label" htmlFor="website">Website URL</label>
            <input id="website" className="stepper__input" type="text" placeholder="yourcompany.com" value={form.website} onChange={(e) => update('website', e.target.value)} />
          </div>
        </fieldset>
      )}

      {step === 2 && (
        <fieldset className="stepper__fieldset">
          <legend className="stepper__legend">What best describes your business?</legend>
          <div className="stepper__options">
            {INDUSTRIES.map((opt) => (
              <button
                type="button"
                key={opt.value}
                className={`stepper__option${form.industry === opt.value ? ' stepper__option--selected' : ''}`}
                onClick={() => update('industry', opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      {step === 3 && (
        <fieldset className="stepper__fieldset">
          <legend className="stepper__legend">What&apos;s the outcome you want most?</legend>
          <div className="stepper__options">
            {GOALS.map((opt) => (
              <button
                type="button"
                key={opt.value}
                className={`stepper__option${form.goal === opt.value ? ' stepper__option--selected' : ''}`}
                onClick={() => update('goal', opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      {step === 4 && (
        <fieldset className="stepper__fieldset">
          <legend className="stepper__legend">What&apos;s not working right now? <span className="stepper__legend-hint">(select all that apply)</span></legend>
          <div className="stepper__options">
            {CHALLENGES.map((opt) => (
              <button
                type="button"
                key={opt.value}
                className={`stepper__option${form.challenges.includes(opt.value) ? ' stepper__option--selected' : ''}`}
                onClick={() => update('challenges', toggleChallenge(form.challenges, opt.value))}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      {step === 5 && (
        <fieldset className="stepper__fieldset">
          <legend className="stepper__legend">Budget & timeline.</legend>
          <p className="stepper__group-label">Monthly budget</p>
          <div className="stepper__options stepper__options--compact">
            {BUDGETS.map((opt) => (
              <button
                type="button"
                key={opt.value}
                className={`stepper__option${form.budget === opt.value ? ' stepper__option--selected' : ''}`}
                onClick={() => update('budget', opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <p className="stepper__group-label">Timeline</p>
          <div className="stepper__options stepper__options--compact">
            {TIMELINES.map((opt) => (
              <button
                type="button"
                key={opt.value}
                className={`stepper__option${form.timeline === opt.value ? ' stepper__option--selected' : ''}`}
                onClick={() => update('timeline', opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <div className="stepper__field">
            <label className="stepper__label" htmlFor="notes">Anything else we should know?</label>
            <textarea id="notes" className="stepper__textarea" rows={4} value={form.notes} onChange={(e) => update('notes', e.target.value)} />
          </div>
        </fieldset>
      )}

      {error && <p className="stepper__error" role="alert">{error}</p>}

      <div className="stepper__nav">
        {step > 1 && (
          <button type="button" className="btn btn--ghost" onClick={goBack} disabled={status === 'submitting'}>
            Back
          </button>
        )}
        {step < STEP_COUNT && (
          <button type="button" className="btn btn--solid" onClick={goNext}>
            Continue
          </button>
        )}
        {step === STEP_COUNT && (
          <button type="submit" className="btn btn--solid" disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Sending…' : 'Submit'}
          </button>
        )}
      </div>
    </form>
  );
}
