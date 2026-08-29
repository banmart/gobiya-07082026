import TopBar from '../../../../components/dashboard/TopBar';
import { requireUser } from '../../../../lib/auth';
import ProspectorSuite from '../../../../components/prospector/ProspectorSuite';
import { listProspects } from '../../../../lib/prospector';
import { getDripSequences } from '../../../../lib/drip';

export const metadata = {
  title: 'Leads Prospector & AI Scout',
  robots: { index: false, follow: false },
};

export default async function ClientProspectorPage() {
  const user = await requireUser();
  const [prospectsData, sequences] = await Promise.all([
    listProspects({ clientId: user.clientId, limit: 25 }).catch(() => ({ prospects: [], total: 0 })),
    getDripSequences().catch(() => []),
  ]);

  return (
    <>
      <TopBar title="Leads Prospector" user={user} />
      <main className="app__content" id="top">
        <header className="app__actions" style={{ marginBottom: '1rem' }}>
          <div>
            <h2 className="app__welcome">AI Lead Scout &amp; Cold Outreach</h2>
            <p className="app__welcome-sub">
              Crawl verified local business leads using Perplexity AI and automate cold email drip sequences pitching the Custom AI CRM Offer.
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
