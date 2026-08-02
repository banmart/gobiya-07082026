'use client';

import { useState } from 'react';

function detectAspectFromFilename(name) {
  if (!name) return null;
  const str = name.toLowerCase();

  // 9:16 vertical patterns (e.g. "9x16", "9-x-16", "9-16", "9_16", "9 16")
  if (/9\s*[xX-]\s*16/.test(str) || /9\s+16/.test(str) || /9_16/.test(str)) {
    return { ratio: '9/16', label: '9:16', isVertical: true };
  }
  // 16:9 widescreen patterns (e.g. "16x9", "16-x-9", "16-9", "16_9", "16 9")
  if (/16\s*[xX-]\s*9/.test(str) || /16\s+9/.test(str) || /16_9/.test(str)) {
    return { ratio: '16/9', label: '16:9', isVertical: false };
  }
  // 4:3 standard patterns (e.g. "4x3", "4-x-3", "4-3", "4_3", "4 3")
  if (/4\s*[xX-]\s*3/.test(str) || /4\s+3/.test(str) || /4_3/.test(str)) {
    return { ratio: '4/3', label: '4:3', isVertical: false };
  }
  // 1:1 square patterns (e.g. "1x1", "1-x-1", "1-1", "1_1", "1 1")
  if (/1\s*[xX-]\s*1/.test(str) || /1\s+1/.test(str) || /1_1/.test(str)) {
    return { ratio: '1/1', label: '1:1', isVertical: false };
  }

  return null;
}

export default function BentoVideoCard({ video, isFeatured }) {
  // Check if title or filename explicitly declares aspect ratio
  const explicitAspect = detectAspectFromFilename(video.filename) || detectAspectFromFilename(video.title);

  const [aspectRatio, setAspectRatio] = useState(
    explicitAspect ? explicitAspect.ratio : isFeatured ? '16/9' : '16/10'
  );
  const [isVertical, setIsVertical] = useState(explicitAspect ? explicitAspect.isVertical : false);

  const handleLoadedMetadata = (e) => {
    // If aspect ratio was explicitly declared in title/filename, respect it
    if (explicitAspect) return;

    const videoEl = e.target;
    const width = videoEl.videoWidth;
    const height = videoEl.videoHeight;

    if (!width || !height) return;

    const ratio = width / height;

    if (ratio < 0.8) {
      // 9:16 Vertical / Short / Reel
      setAspectRatio('9/16');
      setIsVertical(true);
    } else if (ratio >= 0.9 && ratio <= 1.1) {
      // 1:1 Square
      setAspectRatio('1/1');
      setIsVertical(false);
    } else if (ratio >= 1.2 && ratio <= 1.45) {
      // 4:3 Standard
      setAspectRatio('4/3');
      setIsVertical(false);
    } else {
      // 16:9 Widescreen
      setAspectRatio('16/9');
      setIsVertical(false);
    }
  };

  return (
    <article
      className={`bento-card ${isVertical ? 'bento-card--vertical' : ''} ${isFeatured ? 'bento-card--featured' : ''}`}
      style={{
        background: 'var(--surface-raised)',
        border: '1px solid var(--border)',
        borderRadius: '1rem',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 6px 20px rgba(var(--shadow-rgb), 0.05)',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
        gridColumn: isFeatured && !isVertical ? 'span 2' : 'span 1',
        gridRow: isVertical ? 'span 2' : 'span 1',
      }}
    >
      {/* Video Player Frame */}
      <div
        style={{
          background: 'var(--surface-inverse)',
          aspectRatio: aspectRatio,
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
          transition: 'aspect-ratio 0.3s ease',
        }}
      >
        <video
          controls
          preload="metadata"
          onLoadedMetadata={handleLoadedMetadata}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        >
          <source src={video.url} type="video/webm" />
          Your browser does not support WebM video playback.
        </video>
      </div>

      {/* Clean Title Only */}
      <div style={{ padding: '1rem 1.25rem', background: 'var(--surface-raised)' }}>
        <h3 style={{ fontSize: isFeatured ? '1.2rem' : '1.05rem', fontWeight: '700', color: 'var(--text)', margin: 0, lineHeight: '1.35' }}>
          {video.title}
        </h3>
      </div>
    </article>
  );
}
