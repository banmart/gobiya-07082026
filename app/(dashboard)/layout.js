import '../dashboard.css';
import Sidebar from '../../components/dashboard/Sidebar';
import { requireUser } from '../../lib/auth';

export const metadata = {
  robots: { index: false, follow: false },
};

const NAV = [
  { label: 'Overview', href: '/dashboard' },
  { label: 'Settings', href: '/dashboard/settings' },
];

export default async function DashboardLayout({ children }) {
  // Middleware already turned away anonymous requests; this is the check that
  // guarantees a profile exists before any child renders.
  await requireUser();

  return (
    <div className="app">
      <Sidebar items={NAV} heading="Dashboard" />
      <div className="app__main">{children}</div>
    </div>
  );
}
