'use client';

import { useEffect, useState } from 'react';

/* Large digital-clock countdown for the homepage offer card.

   Distinct from CountdownBadge, which renders the same idea as a single line
   of text inside a small pill — this one is the display piece, so it splits
   into padded cells with tabular digits.

   Nothing renders a real number until after mount. The server has no idea what
   time it is in the visitor's browser, so any server-rendered digit is a
   guaranteed hydration mismatch; the placeholders below hold the exact final
   layout so there's no shift when the first tick lands. */

const UNITS = [
  { key: 'days', label: 'Days' },
  { key: 'hours', label: 'Hrs' },
  { key: 'minutes', label: 'Min' },
  { key: 'seconds', label: 'Sec' },
];

function remaining(target) {
  const distance = target - Date.now();
  if (distance <= 0) {
    return { ended: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  return {
    ended: false,
    days: Math.floor(distance / 86400000),
    hours: Math.floor((distance % 86400000) / 3600000),
    minutes: Math.floor((distance % 3600000) / 60000),
    seconds: Math.floor((distance % 60000) / 1000),
  };
}

export default function OfferCountdown({
  targetDate,
  label = 'Offer ends in',
  endedLabel = 'This offer has ended',
}) {
  const [left, setLeft] = useState(null);

  useEffect(() => {
    const target = new Date(targetDate).getTime();
    if (Number.isNaN(target)) return;

    const tick = () => setLeft(remaining(target));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const ended = left?.ended === true;

  /* The digits are hidden from assistive tech and the whole clock carries one
     label instead. A live region ticking once a second is unusable — it would
     interrupt the reader every second for as long as the section is open. */
  const spoken = left
    ? ended
      ? endedLabel
      : `${label} ${left.days} days, ${left.hours} hours, ${left.minutes} minutes, ${left.seconds} seconds`
    : label;

  return (
    <div className="mw-countdown">
      <p className="mw-countdown__label">{ended ? endedLabel : label}</p>
      <div className="mw-countdown__clock" role="timer" aria-live="off" aria-label={spoken}>
        {UNITS.map((unit, i) => (
          <span className="mw-countdown__group" key={unit.key}>
            {i > 0 && (
              <span className="mw-countdown__sep" aria-hidden="true">
                :
              </span>
            )}
            <span className="mw-countdown__cell" aria-hidden="true">
              <span className="mw-countdown__num">
                {left ? String(left[unit.key]).padStart(2, '0') : '--'}
              </span>
              <span className="mw-countdown__unit">{unit.label}</span>
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
