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
            style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', color: 'var(--text-light)', border: '1px solid var(--border)', padding: '0.4rem 1.2rem', borderRadius: '4px' }}
          >
            {topic}
          </span>
        ))}
      </div>
    </div>
  );
}
