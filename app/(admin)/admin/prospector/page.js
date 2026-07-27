import TopBar from '../../../../components/dashboard/TopBar';
import { requireAdmin } from '../../../../lib/auth';
import ProspectorSuite from '../../../../components/prospector/ProspectorSuite';
import { listProspects } from '../../../../lib/prospector';
import { getDripSequences } from '../../../../lib/drip';

export const metadata = {
  title: 'Leads Prospector & Drip Campaigns',
  robots: { index: false, follow: false },
};

export default async function AdminProspectorPage() {
  const user = await requireAdmin();
  const [prospectsData, sequences] = await Promise.all([
    listProspects({ limit: 25 }).catch(() => ({ prospects: [], total: 0 })),
    getDripSequences().catch(() => []),
  ]);

  return (
    <>
      <TopBar title="Leads Prospector & AI Scout" user={user} />
      <main className="app__content" id="top">
        <header className="app__actions" style={{ marginBottom: '1rem' }}>
          <div>
            <h2 className="app__welcome">Leads Prospector &amp; Email Campaigns</h2>
            <p className="app__welcome-sub">
              Crawl live business prospects with Perplexity AI and automate cold email drip sequences pitching the Q3 Growth Bundle Offer ($2,500 Web Dev + CRM + YouTube Ads).
            </p>
          </div>
        </header>

        <ProspectorSuite
          initialProspects={prospectsData.prospects}
          totalCount={prospectsData.total}
          initialSequences={sequences}
        />
      </main>
    </>
  );
}
