import TopBar from '../../../../components/dashboard/TopBar';
import { requireUser } from '../../../../lib/auth';
import AuditToolForm from './AuditToolForm';

export const metadata = {
  title: 'AI Website Audit',
  robots: { index: false, follow: false },
};

export default async function AuditPage() {
  const user = await requireUser();
  const defaultUrl = user.client?.website || 'https://';

  return (
    <>
      <TopBar title="AI Website Audit" user={user} />
      <main className="app__content" id="top">
        <div className="app__actions">
          <div>
            <h2 className="app__welcome">AI Website Audit Tool</h2>
            <p className="app__welcome-sub">
              Evaluate your site accessibility, schema markup, and AI Overview indexing.
            </p>
          </div>
        </div>

        <div className="card" style={{ maxWidth: '42rem' }}>
          <AuditToolForm defaultUrl={defaultUrl} />
        </div>
      </main>
    </>
  );
}
