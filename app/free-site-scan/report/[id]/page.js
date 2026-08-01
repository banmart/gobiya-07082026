import { notFound } from 'next/navigation';
import { createAdminSupabase } from '../../../../lib/supabase/admin';
import SiteScanReport from '../../../../components/SiteScanReport';
import PlatformStrip from '../../../../components/PlatformStrip';
import { buildMetadata } from '../../../../lib/meta';

/* The report is behind an unguessable UUID rather than a login: the visitor has
 * to reach it from the email as well as the redirect, and it contains nothing
 * secret — only public facts about a site they own.
 *
 * noindex because these are per-visitor pages. */
export const metadata = buildMetadata({
  title: 'Your Site Scan Report',
  description: 'The results of your free Gobiya site scan.',
  path: '/free-site-scan',
  robots: { index: false, follow: false },
});

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export default async function ReportPage({ params }) {
  const { id } = await params;

  // Read on the server with the service-role client. RLS on ai_audits has no
  // anonymous policy, so this is the only way the page can see the row — and it
  // keeps every Supabase credential out of the browser bundle.
  const admin = createAdminSupabase();
  const { data: audit, error } = await admin
    .from('ai_audits')
    .select('id, url, status, score, report_data, collector_status')
    .eq('id', id)
    .single();

  if (error || !audit) notFound();

  return (
    <main id="top">
      <SiteScanReport
        id={audit.id}
        url={audit.url}
        initialStatus={audit.status}
        initialScore={audit.score}
        initialReport={audit.report_data}
        initialCollectorStatus={audit.collector_status}
      />
      <PlatformStrip />
      <div className="mw-navy-divider" />
    </main>
  );
}
