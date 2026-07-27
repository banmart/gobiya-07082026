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

      // Query user role to determine default destination if next is not explicitly provided
      let targetPath = '/dashboard';
      if (next) {
        targetPath = safeNextPath(next);
      } else {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .maybeSingle();

        targetPath = profile?.role === 'admin' ? '/admin' : '/dashboard';
      }

      // Hard navigation ensures browser cookies set by @supabase/ssr are fully flushed
      // and attached to the HTTP request headers for middleware.js and server components.
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
