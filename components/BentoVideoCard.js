'use client';

import { useState } from 'react';

export default function BentoVideoCard({ video, isFeatured }) {
  const [aspectRatio, setAspectRatio] = useState(isFeatured ? '16/9' : '16/10');
  const [aspectLabel, setAspectLabel] = useState(null);
  const [isVertical, setIsVertical] = useState(false);

  const handleLoadedMetadata = (e) => {
    const videoEl = e.target;
    const width = videoEl.videoWidth;
    const height = videoEl.videoHeight;

    if (!width || !height) return;

    const ratio = width / height;

    if (ratio < 0.8) {
      // 9:16 Vertical / Short / Reel
      setAspectRatio('9/16');
      setAspectLabel('9:16');
      setIsVertical(true);
    } else if (ratio >= 0.9 && ratio <= 1.1) {
      // 1:1 Square
      setAspectRatio('1/1');
      setAspectLabel('1:1');
      setIsVertical(false);
    } else if (ratio >= 1.2 && ratio <= 1.45) {
      // 4:3 Standard
      setAspectRatio('4/3');
      setAspectLabel('4:3');
      setIsVertical(false);
    } else {
      // 16:9 Widescreen
      setAspectRatio('16/9');
      setAspectLabel('16:9');
      setIsVertical(false);
    }
  };

  return (
    <article
      className={`bento-card ${isVertical ? 'bento-card--vertical' : ''} ${isFeatured ? 'bento-card--featured' : ''}`}
      style={{
        background: '#FFFFFF',
        border: '1px solid var(--border)',
        borderRadius: '1rem',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 6px 20px rgba(11, 30, 54, 0.05)',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
        gridColumn: isFeatured && !isVertical ? 'span 2' : 'span 1',
        gridRow: isVertical ? 'span 2' : 'span 1',
      }}
    >
      {/* Video Container (Auto-adapts to 9:16, 1:1, 4:3, or 16:9) */}
      <div
        style={{
          background: '#0B1E36',
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

      {/* Bento Title & Metadata (Folder path removed) */}
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', background: '#FFFFFF' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem' }}>
          <h3 style={{ fontSize: isFeatured ? '1.25rem' : '1.0625rem', fontWeight: '700', color: '#0B1E36', margin: 0, lineHeight: '1.35' }}>
            {video.title}
          </h3>
          <span style={{ background: '#F1F5F9', color: '#475569', fontSize: '0.75rem', fontWeight: '700', padding: '0.2rem 0.5rem', borderRadius: '0.375rem', border: '1px solid #CBD5E1', whiteSpace: 'nowrap' }}>
            {video.size}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.8125rem', color: 'var(--hint)', marginTop: '0.25rem' }}>
          {aspectLabel && (
            <span style={{ background: 'rgba(11, 30, 54, 0.06)', color: '#0B1E36', fontWeight: '700', padding: '0.15rem 0.45rem', borderRadius: '0.25rem', fontSize: '0.75rem' }}>
              {aspectLabel}
            </span>
          )}
          {video.mtime && <span>📅 {video.mtime}</span>}
        </div>
      </div>
    </article>
  );
}
