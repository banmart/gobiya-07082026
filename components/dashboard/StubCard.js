// Placeholder for a feature slice that has not shipped yet. Every card says
// plainly that it is not ready, so nothing in the shell looks broken.
export default function StubCard({ title, body, badge = 'Coming soon' }) {
  return (
    <article className="card">
      <span className="card__badge">{badge}</span>
      <h2 className="card__title">{title}</h2>
      <p className="card__body">{body}</p>
    </article>
  );
}
