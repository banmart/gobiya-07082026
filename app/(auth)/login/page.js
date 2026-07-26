import { LogoMark } from '../../../components/Logo';
import { getSessionUser } from '../../../lib/auth';
import { safeNextPath } from '../../../lib/safeNext';
import { redirect } from 'next/navigation';
import LoginForm from './LoginForm';

// Forced dynamic: this page checks the session on every request via
// getSessionUser(), which reads cookies(). Without this, Next attempts to
// prerender the page at build time and fails outright if Supabase env vars
// are unset in that environment, instead of falling back to per-request
// rendering.
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Sign in',
  robots: { index: false, follow: false },
};

// /auth/callback redirects here with ?error= when a link cannot be verified.
// Without these messages an expired invite would silently dump the user on a
// blank sign-in form with no idea what went wrong.
const ERRORS = {
  expired_link: 'That link has expired or was already used. Request a new one below.',
  invalid_link: "That link doesn't look right. Request a new one below.",
};

export default async function LoginPage({ searchParams }) {
  const user = await getSessionUser();
  if (user) redirect(user.role === 'admin' ? '/admin' : '/dashboard');

  const params = await searchParams;
  // Sanitised here, on the server, before it is ever handed to the client
  // component. /login is not a middleware-matched route, so this value can
  // come straight from an attacker-supplied link.
  const next = safeNextPath(params?.next);
  const errorMessage = ERRORS[params?.error];

  return (
    <div className="auth__card">
      <LogoMark className="auth__mark" size={34} />
      <h1 className="auth__title">Sign in</h1>
      <p className="auth__intro">Access your Gobiya dashboard.</p>

      {errorMessage ? (
        <p className="auth__note" role="alert">
          {errorMessage} <a href="/forgot">Send me a new link</a>.
        </p>
      ) : null}

      <LoginForm next={next} />
      <p className="auth__foot">
        <a href="/forgot">Forgot your password?</a>
      </p>
    </div>
  );
}
