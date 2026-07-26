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

    // Same guard as the auth forms: a throw must not strand the button in its
    // disabled state with nothing rendered to explain it.
    try {
      const supabase = createBrowserSupabase();
      // RLS allows this row and this column only; role and client_id are pinned
      // by the update policy's with check clause.
      //
      // .select('id').single() is not decoration. The real boundary is
      // `id = auth.uid()` in the policy, so a wrong userId prop cannot write to
      // someone else's row — but it would match zero rows and PostgREST would
      // still report success, so the UI would claim "Saved." having written
      // nothing. This turns that into a visible failure.
      const { error } = await supabase
        .from('profiles')
        .update({ full_name: fullName.trim() || null })
        .eq('id', userId)
        .select('id')
        .single();

      if (error) {
        console.error('Name update failed:', error.message);
        setStatus('That could not be saved.');
        return;
      }

      setStatus('Saved.');
      router.refresh();
    } catch (err) {
      console.error('Name update failed:', err);
      setStatus('Something went wrong. Please try again.');
    } finally {
      setBusy(false);
    }
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

    try {
      const supabase = createBrowserSupabase();
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        // Upstream wording is not ours to show — Supabase's own minimum can
        // contradict the stricter rule enforced just above, which would read
        // as the app disagreeing with itself.
        console.error('Password update failed:', error.message);
        setStatus('That password could not be saved. Please try a different one.');
        return;
      }

      setStatus('Password updated.');
      setPassword('');
      setConfirm('');
    } catch (err) {
      console.error('Password update failed:', err);
      setStatus('Something went wrong. Please try again.');
    } finally {
      setBusy(false);
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
