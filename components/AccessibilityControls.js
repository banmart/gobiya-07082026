'use client';

import { useState, useEffect } from 'react';

const STORAGE_KEY = 'gobiya-a11y-settings';

export default function AccessibilityControls() {
  const [isOpen, setIsOpen] = useState(false);
  const [textSize, setTextSize] = useState('normal'); // 'normal' | 'large' | 'xlarge'
  const [highContrast, setHighContrast] = useState(false);
  const [highlightLinks, setHighlightLinks] = useState(false);
  const [grayscale, setGrayscale] = useState(false);

  // Load saved preferences on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.textSize) setTextSize(parsed.textSize);
        if (typeof parsed.highContrast === 'boolean') setHighContrast(parsed.highContrast);
        if (typeof parsed.highlightLinks === 'boolean') setHighlightLinks(parsed.highlightLinks);
        if (typeof parsed.grayscale === 'boolean') setGrayscale(parsed.grayscale);
      }
    } catch (e) {
      // Ignore storage errors
    }
  }, []);

  // Apply classes to root element whenever states change
  useEffect(() => {
    const root = document.documentElement;

    // Text size
    root.classList.remove('a11y-text-large', 'a11y-text-xlarge');
    if (textSize === 'large') root.classList.add('a11y-text-large');
    if (textSize === 'xlarge') root.classList.add('a11y-text-xlarge');

    // High Contrast
    if (highContrast) {
      root.classList.add('a11y-high-contrast');
    } else {
      root.classList.remove('a11y-high-contrast');
    }

    // Highlight Links
    if (highlightLinks) {
      root.classList.add('a11y-highlight-links');
    } else {
      root.classList.remove('a11y-highlight-links');
    }

    // Grayscale
    if (grayscale) {
      root.classList.add('a11y-grayscale');
    } else {
      root.classList.remove('a11y-grayscale');
    }

    // Save to localStorage
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ textSize, highContrast, highlightLinks, grayscale })
      );
    } catch (e) {}
  }, [textSize, highContrast, highlightLinks, grayscale]);

  const resetAll = () => {
    setTextSize('normal');
    setHighContrast(false);
    setHighlightLinks(false);
    setGrayscale(false);
  };

  return (
    <div className="a11y-widget">
      {/* Trigger Button */}
      <button
        type="button"
        className={`a11y-widget__trigger ${isOpen ? 'is-active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Accessibility & Visual Controls"
        title="Accessibility & Visual Controls"
        aria-expanded={isOpen}
      >
        <svg
          viewBox="0 0 24 24"
          width="22"
          height="22"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="4" r="2" />
          <path d="M19 13v-2a2 2 0 0 0-2-2h-3V5a1 1 0 0 0-1-1h-3a1 1 0 0 0-1 1v6a2 2 0 0 0 2 2h3v5a2 2 0 0 0 2 2h2" />
          <circle cx="9" cy="18" r="4" />
        </svg>
        <span className="a11y-widget__trigger-label">Accessibility</span>
      </button>

      {/* Control Panel Popover */}
      {isOpen && (
        <div className="a11y-panel" role="dialog" aria-label="Visual Control Settings">
          <div className="a11y-panel__header">
            <h3 className="a11y-panel__title">Visual Controls</h3>
            <button
              type="button"
              className="a11y-panel__close"
              onClick={() => setIsOpen(false)}
              aria-label="Close accessibility menu"
            >
              &times;
            </button>
          </div>

          <div className="a11y-panel__body">
            {/* Text Size Control */}
            <div className="a11y-group">
              <label className="a11y-group__label">Text Size</label>
              <div className="a11y-btn-grid">
                <button
                  type="button"
                  className={`a11y-option-btn ${textSize === 'normal' ? 'is-active' : ''}`}
                  onClick={() => setTextSize('normal')}
                >
                  100%
                </button>
                <button
                  type="button"
                  className={`a11y-option-btn ${textSize === 'large' ? 'is-active' : ''}`}
                  onClick={() => setTextSize('large')}
                >
                  115%
                </button>
                <button
                  type="button"
                  className={`a11y-option-btn ${textSize === 'xlarge' ? 'is-active' : ''}`}
                  onClick={() => setTextSize('xlarge')}
                >
                  130%
                </button>
              </div>
            </div>

            {/* High Contrast Toggle */}
            <div className="a11y-group">
              <button
                type="button"
                className={`a11y-toggle-btn ${highContrast ? 'is-active' : ''}`}
                onClick={() => setHighContrast(!highContrast)}
              >
                <span className="a11y-toggle-btn__icon">🌓</span>
                <span>High Contrast Mode</span>
                <span className="a11y-toggle-btn__status">{highContrast ? 'ON' : 'OFF'}</span>
              </button>
            </div>

            {/* Highlight Links Toggle */}
            <div className="a11y-group">
              <button
                type="button"
                className={`a11y-toggle-btn ${highlightLinks ? 'is-active' : ''}`}
                onClick={() => setHighlightLinks(!highlightLinks)}
              >
                <span className="a11y-toggle-btn__icon">🔗</span>
                <span>Highlight All Links</span>
                <span className="a11y-toggle-btn__status">{highlightLinks ? 'ON' : 'OFF'}</span>
              </button>
            </div>

            {/* Grayscale Mode Toggle */}
            <div className="a11y-group">
              <button
                type="button"
                className={`a11y-toggle-btn ${grayscale ? 'is-active' : ''}`}
                onClick={() => setGrayscale(!grayscale)}
              >
                <span className="a11y-toggle-btn__icon">👁️</span>
                <span>Grayscale / Invert Colors</span>
                <span className="a11y-toggle-btn__status">{grayscale ? 'ON' : 'OFF'}</span>
              </button>
            </div>

            {/* Reset Button */}
            <div className="a11y-panel__footer">
              <button type="button" className="a11y-reset-btn" onClick={resetAll}>
                Reset to Default
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
