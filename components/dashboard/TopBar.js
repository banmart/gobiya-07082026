export default function TopBar({ title, user }) {
  return (
    <header className="app__topbar">
      <h1 className="app__topbar-title">{title}</h1>
      <span className="app__topbar-user">{user.fullName || user.email}</span>
    </header>
  );
}
