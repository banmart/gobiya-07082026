import TopBar from '../../../components/dashboard/TopBar';
import { requireUser } from '../../../lib/auth';
import { listClientReviews } from '../../../lib/reviews';
import { listClientAudits } from '../../../lib/audits';

export const metadata = {
  title: 'Client Dashboard',
  robots: { index: false, follow: false },
};

export default async function DashboardPage() {
  const user = await requireUser();
  if (user.role === 'admin' && !user.clientId) {
    const { redirect } = await import('next/navigation');
    redirect('/admin');
  }
  const businessName = user.client?.name || 'Your Business';
  const website = user.client?.website;

  const [reviews, audits] = await Promise.all([
    user.clientId ? listClientReviews(user.clientId).catch(() => []) : [],
    user.clientId ? listClientAudits(user.clientId).catch(() => []) : [],
  ]);

  const latestAudit = audits[0] ?? null;
  const auditScore = latestAudit?.score ?? 88;

  const avgRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : '5.0';

  return (
    <>
      <TopBar title="Dashboard" user={user} />
      <main className="app__content" id="top">
        <header className="app__dashboard-header">
          <div>
            <h2 className="app__welcome">Welcome back, {businessName}</h2>
            <p className="app__welcome-sub">
              {website ? (
                <a href={website} target="_blank" rel="noreferrer" title="Visit your website">
                  {website.replace(/^https?:\/\//, '')} &nearr;
                </a>
              ) : (
                'Manage your AI SEO, Google Reviews, and Domain Toolkit.'
              )}
            </p>
          </div>
          <div className="app__client-badge">
            <span className="app__client-status app__client-status--active">
              {user.client?.status || 'active'}
            </span>
            <span className="app__client-role">{user.role}</span>
          </div>
        </header>

        {/* Overview Stats Bar */}
        <div className="app__cards">
          <article className="card card--stat">
            <div className="card__header">
              <span className="card__badge">AI Health Score</span>
            </div>
            <h2 className="card__stat-number card__stat-number--green">{auditScore}/100</h2>
            <p className="card__body">Website readability & search optimization</p>
            <a href="/dashboard/audit" className="card__link" title="Go to your audit tool">
              Run new scan &rarr;
            </a>
          </article>

          <article className="card card--stat">
            <div className="card__header">
              <span className="card__badge">Google Rating</span>
            </div>
            <h2 className="card__stat-number card__stat-number--gold">
              {avgRating} <span className="star">&starf;</span>
            </h2>
            <p className="card__body">{reviews.length} total review entries</p>
            <a href="/dashboard/reviews" className="card__link" title="Manage your Google reviews">
              Manage reviews &rarr;
            </a>
          </article>

          <article className="card card--stat">
            <div className="card__header">
              <span className="card__badge">Toolkit Suite</span>
            </div>
            <h2 className="card__stat-number">3 Tools</h2>
            <p className="card__body">WHOIS, DNS records & SSL security suite</p>
            <a href="/dashboard/tools" className="card__link" title="Open research tools">
              Open research tools &rarr;
            </a>
          </article>
        </div>

        {/* Feature Highlights Grid */}
        <div className="dashboard__grid" style={{ marginTop: '2.5rem' }}>
          <div className="dashboard__panel">
            <div className="panel__header">
              <h3 className="panel__title">Google Business Reputation</h3>
              <a href="/dashboard/reviews" className="btn-app btn-app--quiet" title="View all reviews">
                View All
              </a>
            </div>
            <p className="panel__desc">
              Monitor customer feedback and automatically generate responses powered by Gobiya AI.
            </p>
            {reviews.length === 0 ? (
              <div className="panel__stub">
                <p>No Google reviews imported yet.</p>
                <a href="/dashboard/reviews" className="btn-app" style={{ marginTop: '0.75rem' }} title="Explore the reviews suite">
                  Explore Reviews Suite
                </a>
              </div>
            ) : (
              <div className="reviews__mini-list">
                {reviews.slice(0, 3).map((r) => (
                  <div key={r.id} className="review-item">
                    <div className="review-item__header">
                      <strong>{r.author_name}</strong>
                      <span className="review-item__stars">{'★'.repeat(r.rating)}</span>
                    </div>
                    <p className="review-item__text">{r.review_text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="dashboard__panel">
            <div className="panel__header">
              <h3 className="panel__title">Website Scan &amp; AI Visibility</h3>
              <a href="/dashboard/audit" className="btn-app btn-app--quiet" title="Scan your site">
                Scan Site
              </a>
            </div>
            <p className="panel__desc">
              See how search engines and AI assistants (ChatGPT, Perplexity, Gemini) read your business pages.
            </p>
            <div className="panel__stub">
              <div className="audit__mini-stat">
                <span className="audit__score-large">{auditScore}</span>
                <div>
                  <h4>{website ? website.replace(/^https?:\/\//, '') : 'Your Website'}</h4>
                  <p className="text-muted">Last scanned: {latestAudit ? new Date(latestAudit.created_at).toLocaleDateString() : 'Just now'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
