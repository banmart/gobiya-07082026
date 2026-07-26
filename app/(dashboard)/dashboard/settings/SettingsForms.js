'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserSupabase } from '../../../../lib/supabase/client';

const MIN_LENGTH = 10;

export function NameForm({ userId, initialName }) {
  const router = useRouter();
  const [fullName, setFullName] = useState(initialName || '');
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setBusy(true);
    setStatus('');

    const supabase = createBrowserSupabase();
    // RLS allows this row and this column only; role and client_id are pinned
    // by the update policy's with check clause.
    const { error } = await supabase
      .from('profiles')
      .update({ full_name: fullName.trim() || null })
      .eq('id', userId);

    setStatus(error ? 'That could not be saved.' : 'Saved.');
    setBusy(false);
    if (!error) router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="card" noValidate>
      <h2 className="card__title">Your name</h2>
      <div className="auth__field" style={{ marginTop: '1rem' }}>
        <label className="auth__label" htmlFor="fullName">
          Full name
        </label>
        <input
          className="auth__input"
          id="fullName"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </div>
      {status ? <p className="card__body">{status}</p> : null}
      <button className="btn-app" type="submit" disabled={busy}>
        {busy ? 'Saving…' : 'Save'}
      </button>
    </form>
  );
}

export function PasswordForm() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setStatus('');

    if (password.length < MIN_LENGTH) {
      setStatus(`Use at least ${MIN_LENGTH} characters.`);
      return;
    }
    if (password !== confirm) {
      setStatus('The two passwords do not match.');
      return;
    }

    setBusy(true);
    const supabase = createBrowserSupabase();
    const { error } = await supabase.auth.updateUser({ password });
    setStatus(error ? error.message : 'Password updated.');
    setBusy(false);
    if (!error) {
      setPassword('');
      setConfirm('');
    }
  }

  return (
    <form onSubmit={onSubmit} className="card" noValidate>
      <h2 className="card__title">Password</h2>
      <div className="auth__field" style={{ marginTop: '1rem' }}>
        <label className="auth__label" htmlFor="newPassword">
          New password
        </label>
        <input
          className="auth__input"
          id="newPassword"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="auth__field">
        <label className="auth__label" htmlFor="confirmPassword">
          Confirm password
        </label>
        <input
          className="auth__input"
          id="confirmPassword"
          type="password"
          autoComplete="new-password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
      </div>
      {status ? <p className="card__body">{status}</p> : null}
      <button className="btn-app" type="submit" disabled={busy}>
        {busy ? 'Saving…' : 'Update password'}
      </button>
    </form>
  );
}
