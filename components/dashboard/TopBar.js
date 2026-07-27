export default function TopBar({ title, user }) {
  return (
    <header className="app__topbar">
      <h1 className="app__topbar-title">{title}</h1>
      <div className="app__topbar-right">
        <span className="app__topbar-user">{user.fullName || user.email}</span>
        <form action="/auth/signout" method="post" style={{ display: 'inline' }}>
          <button className="btn-logout" type="submit">
            Log out
          </button>
        </form>
      </div>
    </header>
  );
}
