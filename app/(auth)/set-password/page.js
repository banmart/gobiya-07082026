import { LogoMark } from '../../../components/Logo';
import { getSessionUser } from '../../../lib/auth';
import { redirect } from 'next/navigation';
import SetPasswordForm from './SetPasswordForm';

// See app/(auth)/login/page.js for why this is forced dynamic.
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Set your password',
  robots: { index: false, follow: false },
};

// Reached only with a session already established by /auth/callback. Anyone
// arriving without one gets sent to /login, because there is nothing to update.
export default async function SetPasswordPage() {
  const user = await getSessionUser();
  if (!user) redirect('/login?error=expired_link');

  return (
    <div className="auth__card">
      <LogoMark className="auth__mark" size={34} />
      <h1 className="auth__title">Set your password</h1>
      <p className="auth__intro">
        Choose a password for {user.email}. You&rsquo;ll use it to sign in from now on.
      </p>
      <SetPasswordForm role={user.role} />
    </div>
  );
}
