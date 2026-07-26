import React from 'react';

export default function TopicMarquee({ topics = [] }) {
  if (!topics || topics.length === 0) return null;

  // Repeat the topics array to ensure the marquee has enough content to loop smoothly
  const displayTopics = [...topics, ...topics, ...topics, ...topics, ...topics];

  return (
    <div className="marquee" aria-hidden="true" style={{ borderTop: 'none', paddingBlock: '1.2rem', backgroundColor: 'var(--bg)', zIndex: 1, position: 'relative' }}>
      <div className="marquee__track">
        {displayTopics.map((topic, i) => (
          <span 
            className="marquee__item" 
            key={i} 
            style={{ fontSize: 'clamp(0.9rem, 1.4vw, 1.15rem)', color: 'var(--hint)', border: '1px solid var(--border)', padding: '0.35rem 1rem', borderRadius: '4px' }}
          >
            {topic}
          </span>
        ))}
      </div>
    </div>
  );
}
