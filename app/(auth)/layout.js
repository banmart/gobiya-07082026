import '../auth.css';

export const metadata = {
  robots: { index: false, follow: false },
};

export default function AuthLayout({ children }) {
  return <div className="auth">{children}</div>;
}
