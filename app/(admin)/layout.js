import '../dashboard.css';
import Sidebar from '../../components/dashboard/Sidebar';
import { requireAdmin } from '../../lib/auth';

export const metadata = {
  robots: { index: false, follow: false },
};

const NAV = [
  { label: 'Overview', href: '/admin' },
  { label: 'Clients', href: '/admin/clients' },
];

export default async function AdminLayout({ children }) {
  await requireAdmin();

  return (
    <div className="app">
      <Sidebar items={NAV} heading="Admin" />
      <div className="app__main">{children}</div>
    </div>
  );
}
