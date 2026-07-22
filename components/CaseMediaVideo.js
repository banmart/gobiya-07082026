'use client';

// Product/commercial video for a case study. Autoplay always starts muted —
// browsers block autoplay-with-sound outright — but when `sound` is true a
// toggle lets the visitor opt into audio themselves (a real user gesture,
// so unmuting is allowed).

import { useRef, useState } from 'react';

const SPEAKER_ON = (
  <path
    d="M4 9v6h4l5 4V5L8 9H4Z M17 8.5a5 5 0 0 1 0 7 M19.5 6a8.5 8.5 0 0 1 0 12"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
);

const SPEAKER_OFF = (
  <path
    d="M4 9v6h4l5 4V5L8 9H4Z M16 9.5l6 5 M22 9.5l-6 5"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
);

export default function CaseMediaVideo({ src, mp4Src, sound, label }) {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);

  function toggleSound() {
    const next = !muted;
    setMuted(next);
    if (videoRef.current) videoRef.current.muted = next;
  }

  return (
    <>
      <video
        ref={videoRef}
        className="case-media__video"
        autoPlay
        loop
        muted
        playsInline
        aria-label={label}
      >
        <source src={src} type="video/webm" />
        {mp4Src && <source src={mp4Src} type="video/mp4" />}
      </video>
      {sound && (
        <button
          type="button"
          className="case-media__sound-btn"
          onClick={toggleSound}
          aria-pressed={!muted}
          aria-label={muted ? 'Turn sound on' : 'Turn sound off'}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            {muted ? SPEAKER_OFF : SPEAKER_ON}
          </svg>
        </button>
      )}
    </>
  );
}
