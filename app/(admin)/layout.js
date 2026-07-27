import '../dashboard.css';
// Same reason as the dashboard layout: the new-client form reuses the
// auth__field / auth__label / auth__input rules defined in auth.css.
import '../auth.css';
import Sidebar from '../../components/dashboard/Sidebar';
import { requireAdmin } from '../../lib/auth';

export const metadata = {
  robots: { index: false, follow: false },
};

const NAV = [
  { label: 'Overview', href: '/admin' },
  { label: 'Clients', href: '/admin/clients' },
  { label: 'Leads & Enquiries', href: '/admin/leads' },
  { label: 'Leads Prospector', href: '/admin/prospector' },
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
