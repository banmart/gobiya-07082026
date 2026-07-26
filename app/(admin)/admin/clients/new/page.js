import TopBar from '../../../../../components/dashboard/TopBar';
import { requireAdmin } from '../../../../../lib/auth';
import NewClientForm from './NewClientForm';

export const metadata = {
  title: 'New client',
  robots: { index: false, follow: false },
};

export default async function NewClientPage() {
  const user = await requireAdmin();

  return (
    <>
      <TopBar title="New client" user={user} />
      <main className="app__content" id="top">
        <h2 className="app__welcome">Create a client</h2>
        <p className="app__welcome-sub">
          They&rsquo;ll get an email inviting them to set a password.
        </p>
        <div style={{ maxWidth: '32rem' }}>
          <NewClientForm />
        </div>
      </main>
    </>
  );
}
