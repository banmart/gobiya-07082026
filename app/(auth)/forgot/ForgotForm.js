'use client';

import { useState } from 'react';

export default function ForgotForm() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setBusy(true);

    await fetch('/api/auth/forgot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    // Always report success, whatever the response. Reporting "no such
    // account" would turn this form into an account-enumeration oracle.
    setSent(true);
    setBusy(false);
  }

  if (sent) {
    return (
      <p className="auth__note" role="status">
        If an account exists for {email}, a reset link is on its way. The link
        expires in one hour.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="auth__field">
        <label className="auth__label" htmlFor="email">
          Email
        </label>
        <input
          className="auth__input"
          id="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button className="auth__submit" type="submit" title="Send reset link" disabled={busy}>
        {busy ? 'Sending…' : 'Send reset link'}
      </button>
    </form>
  );
}
