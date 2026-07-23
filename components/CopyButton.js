'use client';

import { useState } from 'react';

export default function CopyButton({ text, label = 'Copy' }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable (non-HTTPS/unsupported browser) — no-op,
      // the text is still selectable/readable in the code block itself.
    }
  }

  return (
    <button type="button" className="copy-btn" onClick={handleCopy} aria-label={`${label} to clipboard`}>
      {copied ? 'Copied' : label}
    </button>
  );
}
