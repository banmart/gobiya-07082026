import { LogoMark } from '../../../components/Logo';
import { getSessionUser } from '../../../lib/auth';
import { safeNextPath } from '../../../lib/safeNext';
import { redirect } from 'next/navigation';
import LoginForm from './LoginForm';

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
  const next = params?.next ? safeNextPath(params.next) : null;
  // Object.hasOwn, not a bare lookup: ?error=__proto__ would otherwise return
  // Object.prototype, which is truthy and an object, and React throws
  // "Objects are not valid as a React child" — a 500 on the sign-in page.
  const errorMessage = Object.hasOwn(ERRORS, params?.error ?? '')
    ? ERRORS[params.error]
    : null;

  return (
    <div className="auth__card">
      <LogoMark className="auth__mark" size={34} />
      <h1 className="auth__title">Sign in</h1>
      <p className="auth__intro">Access your Gobiya dashboard.</p>

      {errorMessage ? (
        <p className="auth__note" role="alert">
          {errorMessage} <a href="/forgot" title="Request a new password reset link">Send me a new link</a>.
        </p>
      ) : null}

      <LoginForm next={next} />
      <p className="auth__foot">
        <a href="/forgot" title="Forgot your password?">Forgot your password?</a>
      </p>
    </div>
  );
}
