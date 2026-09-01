import Image from 'next/image';
import { FOUNDER, credentials, yearsExperience } from '../lib/authority';

/**
 * The byline block: who wrote this, why they are qualified, and when it was
 * last checked.
 *
 * Every figure comes from lib/authority.js. Nothing here asserts a
 * certification, award or partner status — none has been supplied, and
 * inventing one on the block Google reads for trust signals would defeat the
 * purpose of having it.
 *
 * `reviewed` is a real date or nothing. A "last reviewed" line that is not
 * backed by an actual review is worse than no line at all, so the caller has to
 * pass one for it to appear.
 */
export default function AuthorCard({ reviewed, compact = false }) {
  const creds = credentials();

  return (
    <aside className={`authorcard${compact ? ' authorcard--compact' : ''}`}>
      <div className="authorcard__head">
        <Image
          src="/assets/img/steve-portrait.webp"
          alt={FOUNDER.name}
          width={compact ? 48 : 64}
          height={compact ? 48 : 64}
          className="authorcard__portrait"
        />
        <div>
          <p className="authorcard__label">Written by</p>
          <p className="authorcard__name">
            <a href={FOUNDER.url}>{FOUNDER.name}</a>
          </p>
          <p className="authorcard__role">
            {FOUNDER.jobTitle} · {yearsExperience()} years building for the web
          </p>
        </div>
      </div>

      {!compact && (
        <ul className="authorcard__creds">
          {creds.map((c) => (
            <li key={c.label}>
              <strong>{c.label}</strong>
              <span>{c.detail}</span>
            </li>
          ))}
        </ul>
      )}

      {reviewed && (
        <p className="authorcard__reviewed">
          Last reviewed{' '}
          <time dateTime={reviewed}>
            {new Date(reviewed).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </p>
      )}
    </aside>
  );
}
