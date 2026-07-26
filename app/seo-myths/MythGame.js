'use client';

// Myth or Fact — swipe/tap through 12 claims, then a focus round that turns
// the misses into a ranked list of what to work on.
//
// Swipe is an enhancement, never the mechanism: the two buttons and the arrow
// keys do exactly the same thing, so the game is fully playable on a desktop,
// with a keyboard, or by anyone who can't drag accurately. The static copy of
// every claim and answer lives on the page below this component, so nothing
// here is the only route to the content.

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { MYTHS, TOPICS, TOTAL_QUESTIONS } from '../../lib/seoMyths';

// px of horizontal travel before a drag counts as an answer
const COMMIT_DISTANCE = 90;
// how far the card can be dragged before the transform stops tracking 1:1
const MAX_DRAG = 220;

const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

function buildFocusList(answers) {
  const missesByTopic = new Map();
  const totalByTopic = new Map();

  for (const myth of MYTHS) {
    totalByTopic.set(myth.topic, (totalByTopic.get(myth.topic) ?? 0) + 1);
  }
  for (const answer of answers) {
    if (answer.correct) continue;
    missesByTopic.set(answer.topic, (missesByTopic.get(answer.topic) ?? 0) + 1);
  }

  return [...missesByTopic.entries()]
    .map(([topic, missed]) => {
      const total = totalByTopic.get(topic) ?? 1;
      return {
        topic,
        missed,
        total,
        // 1–5 dots by share of that topic missed, so a 2-of-2 miss outranks
        // a 1-of-3 rather than being flattened to "one wrong either way"
        severity: clamp(Math.round((missed / total) * 5), 1, 5),
        ...TOPICS[topic],
      };
    })
    .sort((a, b) => b.severity - a.severity || b.missed - a.missed);
}

export default function MythGame({ onFinish }) {
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [revealed, setRevealed] = useState(null); // the answer just given
  const [drag, setDrag] = useState(0);
  const [dragging, setDragging] = useState(false);

  const pointerId = useRef(null);
  const startX = useRef(0);
  const advanceRef = useRef(null);
  const boardRef = useRef(null);

  const current = MYTHS[index];
  const finished = index >= TOTAL_QUESTIONS;
  const score = answers.filter((a) => a.correct).length;
  const focusList = useMemo(() => (finished ? buildFocusList(answers) : []), [finished, answers]);

  const answer = useCallback(
    (choice) => {
      if (!current || revealed) return;
      const correct = choice === current.answer;
      setRevealed({ ...current, choice, correct });
      setAnswers((prev) => [...prev, { id: current.id, topic: current.topic, choice, correct }]);
      setDrag(0);
      setDragging(false);
    },
    [current, revealed]
  );

  const next = useCallback(() => {
    setRevealed(null);
    setIndex((i) => i + 1);
  }, []);

  const restart = useCallback(() => {
    setIndex(0);
    setAnswers([]);
    setRevealed(null);
    setDrag(0);
    setStarted(true);
  }, []);

  // Keyboard parity with the buttons. Enter/Space advances the verdict so the
  // whole run is playable without ever touching a pointer.
  useEffect(() => {
    if (!started || finished) return undefined;
    const onKey = (e) => {
      if (revealed) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          next();
        }
        return;
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        answer('myth');
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        answer('fact');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [started, finished, revealed, answer, next]);

  // Move focus to the verdict's continue button so a keyboard or screen-reader
  // user lands on the explanation instead of hunting for it.
  useEffect(() => {
    if (revealed && advanceRef.current) advanceRef.current.focus();
  }, [revealed]);

  // Unlocks the answer key and the closing CTA on the page around us. Fires
  // once per run; replaying does not re-lock them.
  useEffect(() => {
    if (finished) onFinish?.();
  }, [finished, onFinish]);

  const onPointerDown = (e) => {
    if (revealed) return;
    pointerId.current = e.pointerId;
    startX.current = e.clientX;
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!dragging || pointerId.current !== e.pointerId) return;
    const dx = e.clientX - startX.current;
    // ease past MAX_DRAG so the card resists rather than flying off
    setDrag(clamp(dx, -MAX_DRAG, MAX_DRAG));
  };

  const endDrag = (e) => {
    if (pointerId.current !== e.pointerId) return;
    pointerId.current = null;
    if (Math.abs(drag) >= COMMIT_DISTANCE) {
      answer(drag < 0 ? 'myth' : 'fact');
    } else {
      setDrag(0);
      setDragging(false);
    }
  };

  // ── intro ──
  if (!started) {
    return (
      <div className="myth-game myth-game--intro">
        <p className="myth-intro__lede">
          Twelve claims about SEO. Some are true, some are things people repeat because
          they heard them somewhere. Call each one, then see what you should actually be
          working on.
        </p>
        <ul className="myth-intro__how">
          <li>Swipe left for myth, right for fact</li>
          <li>Or use the buttons — or your arrow keys</li>
          <li>Takes about two minutes</li>
        </ul>
        <button type="button" className="btn btn--solid btn--big" onClick={() => setStarted(true)}>
          Start the game
        </button>
      </div>
    );
  }

  // ── results + focus round ──
  if (finished) {
    const perfect = score === TOTAL_QUESTIONS;
    return (
      <div className="myth-game myth-game--results">
        <div className="myth-score">
          <span className="myth-score__num">
            {score}
            <span className="myth-score__of">/{TOTAL_QUESTIONS}</span>
          </span>
          <span className="myth-score__label">called correctly</span>
        </div>

        {perfect ? (
          <p className="myth-results__lede">
            A clean sweep. You already know what most of the industry gets wrong — the
            harder question is whether your site reflects it.
          </p>
        ) : (
          <>
            <p className="myth-results__lede">
              Based on the {TOTAL_QUESTIONS - score} you missed, here is where your
              attention is worth the most:
            </p>
            <ol className="myth-focus">
              {focusList.map((item) => (
                <li key={item.topic} className="myth-focus__item">
                  <div className="myth-focus__head">
                    <span className="myth-focus__label">{item.label}</span>
                    <span
                      className="myth-focus__meter"
                      role="img"
                      aria-label={`${item.missed} of ${item.total} missed`}
                    >
                      {[1, 2, 3, 4, 5].map((dot) => (
                        <span
                          key={dot}
                          className={`myth-focus__dot${dot <= item.severity ? ' is-on' : ''}`}
                        />
                      ))}
                    </span>
                  </div>
                  <p className="myth-focus__text">{item.focus}</p>
                  <Link href={item.href} className="link-arrow">
                    {item.label === 'Measurement' ? 'How we report' : `More on ${item.label.toLowerCase()}`}
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ol>
          </>
        )}

        <div className="myth-results__cta">
          <p>
            Want this checked against your actual site instead of a quiz? We will look at
            it and tell you what is worth fixing first.
          </p>
          <div className="myth-results__actions">
            <Link href="/contact" className="btn btn--solid btn--big">
              Get a free AI visibility audit
            </Link>
            <button type="button" className="btn btn--ghost btn--big" onClick={restart}>
              Play again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── play ──
  const tilt = (drag / MAX_DRAG) * 8;
  const leaning = Math.abs(drag) >= COMMIT_DISTANCE ? (drag < 0 ? 'myth' : 'fact') : null;
  const peek = MYTHS[index + 1];

  return (
    <div className="myth-game" ref={boardRef}>
      <div className="myth-progress">
        <span className="myth-progress__count">
          {index + 1} <span>/ {TOTAL_QUESTIONS}</span>
        </span>
        <span className="myth-progress__track" aria-hidden="true">
          <span
            className="myth-progress__fill"
            style={{ transform: `scaleX(${(index + (revealed ? 1 : 0)) / TOTAL_QUESTIONS})` }}
          />
        </span>
        <span className="myth-progress__score">{score} right</span>
      </div>

      <div className="myth-stack">
        {peek && !revealed && <div className="myth-card myth-card--peek" aria-hidden="true" />}

        {revealed ? (
          <div className={`myth-card myth-card--verdict is-${revealed.correct ? 'right' : 'wrong'}`}>
            <span className="myth-verdict__tag">
              {revealed.correct ? 'Correct' : 'Not quite'} — it&rsquo;s a{' '}
              {revealed.answer === 'myth' ? 'myth' : 'fact'}
            </span>
            <p className="myth-verdict__headline">{revealed.verdict}</p>
            <p className="myth-verdict__detail">{revealed.detail}</p>
            <button
              type="button"
              ref={advanceRef}
              className="btn btn--solid myth-verdict__next"
              onClick={next}
            >
              {index + 1 === TOTAL_QUESTIONS ? 'See your results' : 'Next claim'}
            </button>
          </div>
        ) : (
          <div
            className={`myth-card myth-card--claim${dragging ? ' is-dragging' : ''}`}
            style={{ transform: `translateX(${drag}px) rotate(${tilt}deg)` }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
          >
            <p className="myth-card__claim">&ldquo;{current.claim}&rdquo;</p>
            <span
              className={`myth-card__stamp myth-card__stamp--myth${leaning === 'myth' ? ' is-on' : ''}`}
              aria-hidden="true"
            >
              Myth
            </span>
            <span
              className={`myth-card__stamp myth-card__stamp--fact${leaning === 'fact' ? ' is-on' : ''}`}
              aria-hidden="true"
            >
              Fact
            </span>
          </div>
        )}
      </div>

      <div className="myth-controls">
        <button
          type="button"
          className="myth-btn myth-btn--myth"
          onClick={() => answer('myth')}
          disabled={!!revealed}
        >
          Myth
        </button>
        <button
          type="button"
          className="myth-btn myth-btn--fact"
          onClick={() => answer('fact')}
          disabled={!!revealed}
        >
          Fact
        </button>
      </div>

      <p className="myth-hint" aria-hidden="true">
        Swipe the card, tap a button, or use ← →
      </p>

      {/* announced to screen readers; the visible verdict card is the same content */}
      <p className="sr-only" role="status" aria-live="polite">
        {revealed
          ? `${revealed.correct ? 'Correct' : 'Incorrect'}. That claim is a ${revealed.answer}. ${revealed.verdict} ${revealed.detail}`
          : ''}
      </p>
    </div>
  );
}
