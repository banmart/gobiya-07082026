'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserSupabase } from '../../../lib/supabase/client';

const MIN_LENGTH = 10;

export default function SetPasswordForm({ role }) {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setError('');

    if (password.length < MIN_LENGTH) {
      setError(`Use at least ${MIN_LENGTH} characters.`);
      return;
    }
    if (password !== confirm) {
      setError('The two passwords do not match.');
      return;
    }

    setBusy(true);

    // Same reasoning as LoginForm: a throw must not strand the button in its
    // disabled "Saving…" state with nothing rendered to explain it.
    try {
      const supabase = createBrowserSupabase();
      const { error: updateError } = await supabase.auth.updateUser({ password });

      if (updateError) {
        // The user is already authenticated here, so there is no enumeration
        // risk, but upstream wording is still not ours to show.
        console.error('Password update failed:', updateError.message);
        setError('That password could not be saved. Please try a different one.');
        return;
      }

      router.replace(role === 'admin' ? '/admin' : '/dashboard');
      router.refresh();
    } catch (err) {
      console.error('Password update failed:', err);
      setError('Something went wrong saving your password. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      {error ? (
        <p className="auth__error" role="alert">
          {error}
        </p>
      ) : null}

      <div className="auth__field">
        <label className="auth__label" htmlFor="password">
          New password
        </label>
        <input
          className="auth__input"
          id="password"
          type="password"
          autoComplete="new-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="auth__field">
        <label className="auth__label" htmlFor="confirm">
          Confirm password
        </label>
        <input
          className="auth__input"
          id="confirm"
          type="password"
          autoComplete="new-password"
          required
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
      </div>

      <button className="auth__submit" type="submit" title="Save password" disabled={busy}>
        {busy ? 'Saving…' : 'Save password'}
      </button>
    </form>
  );
}
