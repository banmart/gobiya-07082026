'use client';

import { useState } from 'react';
import { createBrowserSupabase } from '../../../lib/supabase/client';
import { safeNextPath } from '../../../lib/safeNext';

export default function LoginForm({ next }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setBusy(true);
    setError('');

    try {
      const supabase = createBrowserSupabase();
      const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password });

      if (signInError || !data?.user) {
        setError('That email and password combination did not work.');
        setBusy(false);
        return;
      }

      // Determine target destination path
      let targetPath = '/dashboard';
      if (next) {
        targetPath = safeNextPath(next);
      } else {
        try {
          // Race profile lookup with a 1-second timeout so login NEVER gets stuck
          const profilePromise = supabase
            .from('profiles')
            .select('role')
            .eq('id', data.user.id)
            .maybeSingle();

          const timeoutPromise = new Promise((resolve) =>
            setTimeout(() => resolve({ data: null }), 1000)
          );

          const res = await Promise.race([profilePromise, timeoutPromise]);
          const profile = res?.data;

          if (profile?.role === 'admin') {
            targetPath = '/admin';
          }
        } catch (pErr) {
          console.warn('Profile fetch warning on sign-in:', pErr);
        }
      }

      // Hard navigation flushes @supabase/ssr cookies to HTTP headers
      window.location.href = targetPath;
    } catch (err) {
      console.error('Sign-in failed:', err);
      setError('Something went wrong signing you in. Please try again.');
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
        <label className="auth__label" htmlFor="email">
          Email
        </label>
        <input
          className="auth__input"
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="auth__field">
        <label className="auth__label" htmlFor="password">
          Password
        </label>
        <input
          className="auth__input"
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button className="auth__submit" type="submit" disabled={busy}>
        {busy ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  );
}
