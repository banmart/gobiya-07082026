import TopBar from '../../../components/dashboard/TopBar';
import StubCard from '../../../components/dashboard/StubCard';
import { requireUser } from '../../../lib/auth';

export const metadata = {
  title: 'Dashboard',
  robots: { index: false, follow: false },
};

export default async function DashboardPage() {
  const user = await requireUser();
  const businessName = user.client?.name;

  return (
    <>
      <TopBar title="Dashboard" user={user} />
      <div className="app__content">
        <h2 className="app__welcome">
          Welcome back{businessName ? `, ${businessName}` : ''}
        </h2>
        <p className="app__welcome-sub">
          Your tools will appear here as they come online.
        </p>

        <div className="app__cards">
          <StubCard
            title="Google Reviews"
            body="Read, reply to, and request reviews from your Google Business Profile."
          />
          <StubCard
            title="AI Website Audit"
            body="See how your site reads to search engines and AI assistants."
          />
          <StubCard
            title="Research tools"
            body="DNS, WHOIS, SSL, reputation, and the rest of the toolkit, with your own usage limits."
          />
        </div>
      </div>
    </>
  );
}
