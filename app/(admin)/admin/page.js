import TopBar from '../../../components/dashboard/TopBar';
import StubCard from '../../../components/dashboard/StubCard';
import { requireAdmin } from '../../../lib/auth';
import { listClients } from '../../../lib/clients';

export const metadata = {
  title: 'Admin',
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const user = await requireAdmin();
  const clients = await listClients();

  return (
    <>
      <TopBar title="Admin" user={user} />
      <main className="app__content" id="top">
        <h2 className="app__welcome">Overview</h2>
        <p className="app__welcome-sub">Gobiya internal console.</p>

        <div className="app__cards">
          <article className="card">
            <span className="card__badge">Live</span>
            <h2 className="card__title">{clients.length}</h2>
            <p className="card__body">
              {clients.length === 1 ? 'client account' : 'client accounts'}
            </p>
          </article>
          <StubCard
            title="Form submissions"
            body="Contact, onboarding, and landing-page submissions, stored and searchable."
          />
          <StubCard
            title="Review activity"
            body="Google review volume and response rate across every client."
          />
        </div>
      </main>
    </>
  );
}
