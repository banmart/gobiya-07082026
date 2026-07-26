import { LogoMark } from '../../../components/Logo';
import ForgotForm from './ForgotForm';

export const metadata = {
  title: 'Reset your password',
  robots: { index: false, follow: false },
};

export default function ForgotPage() {
  return (
    <div className="auth__card">
      <LogoMark className="auth__mark" size={34} />
      <h1 className="auth__title">Reset your password</h1>
      <p className="auth__intro">
        Enter your email and we&rsquo;ll send you a link to choose a new password.
      </p>
      <ForgotForm />
      <p className="auth__foot">
        <a href="/login">Back to sign in</a>
      </p>
    </div>
  );
}
