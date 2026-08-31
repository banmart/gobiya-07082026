import TopBar from '../../../../components/dashboard/TopBar';
import { requireAdmin } from '../../../../lib/auth';
import { listFormSubmissions } from '../../../../lib/submissions';

export const metadata = {
  title: 'Leads & Enquiries',
  robots: { index: false, follow: false },
};

function formatDate(value) {
  return new Date(value).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default async function AdminLeadsPage() {
  const user = await requireAdmin();
  const submissions = await listFormSubmissions({ limit: 100 }).catch(() => []);

  return (
    <>
      <TopBar title="Leads & Enquiries" user={user} />
      <main className="app__content" id="top">
        <div className="app__actions">
          <p className="app__welcome-sub" style={{ marginBottom: 0 }}>
            {submissions.length} total lead {submissions.length === 1 ? 'submission' : 'submissions'}
          </p>
        </div>

        {submissions.length === 0 ? (
          <div className="table__empty">No lead form submissions found.</div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Type</th>
                <th scope="col">Contact</th>
                <th scope="col">Phone</th>
                <th scope="col">Company / Website</th>
                <th scope="col">Date</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((sub) => (
                <tr key={sub.id}>
                  <td>
                    <span className={`tag tag--${sub.type}`}>{sub.type}</span>
                  </td>
                  <td>
                    <strong>{sub.name}</strong>
                    <br />
                    <a href={`mailto:${sub.email}`} className="text-muted" title="Email this lead">
                      {sub.email}
                    </a>
                  </td>
                  <td>{sub.phone || '—'}</td>
                  <td>
                    {sub.company && <div>{sub.company}</div>}
                    {sub.website && (
                      <a href={sub.website} target="_blank" rel="noreferrer" className="text-sm" title="Visit this lead's website">
                        {sub.website.replace(/^https?:\/\//, '')}
                      </a>
                    )}
                    {!sub.company && !sub.website && '—'}
                  </td>
                  <td>{formatDate(sub.created_at)}</td>
                  <td>
                    <span className={`status status--${sub.status}`}>{sub.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </>
  );
}
