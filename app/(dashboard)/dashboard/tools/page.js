import TopBar from '../../../../components/dashboard/TopBar';
import { requireUser } from '../../../../lib/auth';
import ResearchToolsClient from './ResearchToolsClient';

export const metadata = {
  title: 'Research Tools',
  robots: { index: false, follow: false },
};

export default async function ToolsPage() {
  const user = await requireUser();
  const defaultDomain = user.client?.website
    ? user.client.website.replace(/^https?:\/\//i, '').split('/')[0]
    : 'gobiya.com';

  return (
    <>
      <TopBar title="Research Tools" user={user} />
      <main className="app__content" id="top">
        <div className="app__actions">
          <div>
            <h2 className="app__welcome">Domain & Technical Tools</h2>
            <p className="app__welcome-sub">
              Inspect WHOIS records, DNS resolution, and SSL certificates for your domain.
            </p>
          </div>
        </div>

        <div style={{ maxWidth: '42rem' }}>
          <ResearchToolsClient defaultDomain={defaultDomain} />
        </div>
      </main>
    </>
  );
}
