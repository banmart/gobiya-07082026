import TopBar from '../../../../components/dashboard/TopBar';
import { requireUser } from '../../../../lib/auth';
import { NameForm, PasswordForm } from './SettingsForms';

export const metadata = {
  title: 'Settings',
  robots: { index: false, follow: false },
};

export default async function SettingsPage() {
  const user = await requireUser();

  return (
    <>
      <TopBar title="Settings" user={user} />
      <main className="app__content" id="top">
        <h2 className="app__welcome">Settings</h2>
        <p className="app__welcome-sub">
          Signed in as {user.email}
          {user.client?.name ? ` · ${user.client.name}` : ''}
        </p>

        <div className="app__cards">
          <NameForm userId={user.id} initialName={user.fullName} />
          <PasswordForm />
        </div>
      </main>
    </>
  );
}
