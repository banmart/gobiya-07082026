import TopBar from '../../../../components/dashboard/TopBar';
import { requireAdmin } from '../../../../lib/auth';
import { listClients } from '../../../../lib/clients';
import ResendInviteButton from './ResendInviteButton';

export const metadata = {
  title: 'Clients',
  robots: { index: false, follow: false },
};

function formatDate(value) {
  return new Date(value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default async function ClientsPage() {
  const user = await requireAdmin();
  const clients = await listClients();

  return (
    <>
      <TopBar title="Clients" user={user} />
      <main className="app__content" id="top">
        <div className="app__actions">
          <p className="app__welcome-sub" style={{ marginBottom: 0 }}>
            {clients.length} {clients.length === 1 ? 'account' : 'accounts'}
          </p>
          <a className="btn-app" href="/admin/clients/new">
            New client
          </a>
        </div>

        {clients.length === 0 ? (
          <div className="table__empty">No clients yet. Create the first one.</div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Business</th>
                <th scope="col">Contact</th>
                <th scope="col">Website</th>
                <th scope="col">Status</th>
                <th scope="col">Added</th>
                <th scope="col">Invite</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id}>
                  <td>{client.name}</td>
                  <td>{client.contact_email}</td>
                  <td>
                    {client.website ? (
                      <a href={client.website} target="_blank" rel="noreferrer">
                        {client.website.replace(/^https?:\/\//, '')}
                      </a>
                    ) : (
                      '—'
                    )}
                  </td>
                  <td>
                    <span className={`status status--${client.status}`}>{client.status}</span>
                  </td>
                  <td>{formatDate(client.created_at)}</td>
                  <td>
                    <ResendInviteButton clientId={client.id} />
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
