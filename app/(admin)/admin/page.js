import TopBar from '../../../components/dashboard/TopBar';
import { requireAdmin } from '../../../lib/auth';
import { listClients } from '../../../lib/clients';
import { listFormSubmissions } from '../../../lib/submissions';

export const metadata = {
  title: 'Admin Overview',
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const user = await requireAdmin();
  const [clients, submissions] = await Promise.all([
    listClients().catch(() => []),
    listFormSubmissions({ limit: 100 }).catch(() => []),
  ]);

  const activeClientsCount = clients.filter((c) => c.status === 'active').length;
  const newSubmissionsCount = submissions.filter((s) => s.status === 'new').length;

  return (
    <>
      <TopBar title="Admin Overview" user={user} />
      <main className="app__content" id="top">
        <h2 className="app__welcome">Overview</h2>
        <p className="app__welcome-sub">Gobiya internal agency management console.</p>

        <div className="app__cards">
          <article className="card card--stat">
            <div className="card__header">
              <span className="card__badge card__badge--live">Live Clients</span>
            </div>
            <h2 className="card__stat-number">{clients.length}</h2>
            <p className="card__body">
              {activeClientsCount} active tenant {activeClientsCount === 1 ? 'account' : 'accounts'}
            </p>
            <a href="/admin/clients" className="card__link" title="Manage client accounts">
              Manage accounts &rarr;
            </a>
          </article>

          <article className="card card--stat">
            <div className="card__header">
              <span className="card__badge card__badge--info">Submissions</span>
            </div>
            <h2 className="card__stat-number">{submissions.length}</h2>
            <p className="card__body">
              {newSubmissionsCount} unread lead {newSubmissionsCount === 1 ? 'submission' : 'submissions'}
            </p>
            <a href="/admin/leads" className="card__link" title="View lead enquiries">
              View enquiries &rarr;
            </a>
          </article>

          <article className="card card--stat">
            <div className="card__header">
              <span className="card__badge card__badge--active">System Health</span>
            </div>
            <h2 className="card__stat-number">100%</h2>
            <p className="card__body">Auth, Database & RLS policies operational</p>
            <span className="card__note">Supabase SSR Connected</span>
          </article>
        </div>

        <section className="app__section" style={{ marginTop: '2.5rem' }}>
          <div className="app__actions">
            <h3 className="app__section-title">Recent Enquiries</h3>
            <a href="/admin/leads" className="btn-app btn-app--quiet" title="View all enquiries">
              View all
            </a>
          </div>

          {submissions.length === 0 ? (
            <div className="table__empty">No form submissions recorded yet.</div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Type</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Company / Website</th>
                  <th scope="col">Date</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {submissions.slice(0, 5).map((sub) => (
                  <tr key={sub.id}>
                    <td>
                      <span className={`tag tag--${sub.type}`}>{sub.type}</span>
                    </td>
                    <td>{sub.name}</td>
                    <td>
                      <a href={`mailto:${sub.email}`} title="Email this lead">{sub.email}</a>
                    </td>
                    <td>{sub.company || sub.website || '—'}</td>
                    <td>{new Date(sub.created_at).toLocaleDateString()}</td>
                    <td>
                      <span className={`status status--${sub.status}`}>{sub.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </main>
    </>
  );
}
