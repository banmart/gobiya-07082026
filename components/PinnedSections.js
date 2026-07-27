import Link from 'next/link';
import { INSIGHTS } from '../lib/insights';
import { CASE_STUDIES } from '../lib/work';
import { TESTIMONIALS } from '../lib/testimonials';

const STORY_IMAGES = [
  '/assets/img/smilecenter.webp',
  '/assets/img/americanlivescan.webp',
  '/assets/img/access-control-lady.webp',
  '/assets/img/remodelmepros.webp',
  '/assets/img/totalcapital.webp',
];

export default function PinnedSections() {
  const latestArticles = INSIGHTS.slice(0, 3);
  const latestWork = CASE_STUDIES.slice(0, 3);
  const latestStories = TESTIMONIALS.slice(0, 3);

  return (
    <div className="pinned-sections" style={{ borderTop: '1px solid var(--border)' }}>
      {/* Real Stories from Real Clients */}
      <section className="mw-stories" style={{ paddingBlock: 'clamp(3rem, 5vw, 4rem)', background: '#fff' }}>
        <div className="container">
          <h2 className="mw-stories__heading" style={{ marginBottom: '2.5rem', fontSize: '2rem' }}>Real Stories from Real Clients</h2>
          <div 
            className="mw-stories__list-compact" 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
              gap: '1.5rem',
              maxWidth: '1000px',
              marginInline: 'auto'
            }}
          >
            {latestStories.map((item, idx) => (
              <div
                key={idx}
                className="mw-story-card"
                style={{ 
                  backgroundImage: `url('${STORY_IMAGES[idx % STORY_IMAGES.length]}')`,
                  minHeight: '400px'
                }}
              >
                <div className="mw-story-card__content" style={{ padding: '1.5rem' }}>
                  <div className="mw-story-card__meta" style={{ marginBottom: '0.75rem' }}>
                    Industry: <strong>{item.role}</strong>
                  </div>
                  <p className="mw-story-card__desc" style={{ fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '1rem' }}>
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <div style={{ marginBottom: '1rem', fontSize: '0.8rem', color: '#0B1E36', fontWeight: '700' }}>
                    — {item.name ? `${item.name}, ` : ''}{item.company}
                  </div>
                  <a href={item.href} className="mw-story-card__btn" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                    Read More
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="section" style={{ background: 'var(--paper)', paddingBlock: 'clamp(3rem, 5vw, 4rem)' }}>
        <div className="container">
          <h2 className="statement statement--small" style={{ marginBottom: '2rem', textAlign: 'center', fontSize: '1.75rem' }}>Related Articles</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', maxWidth: '1000px', marginInline: 'auto' }}>
            {latestArticles.map((article) => (
              <a href={`/insights/${article.slug}`} key={article.slug} style={{ textDecoration: 'none', color: 'inherit', display: 'flex' }}>
                <div style={{ padding: '1.5rem', background: '#fff', borderRadius: '0.5rem', display: 'flex', flexDirection: 'column', width: '100%', border: '1px solid var(--border)', transition: 'transform 0.2s, box-shadow 0.2s', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', lineHeight: '1.4' }}>{article.title}</h3>
                  <p style={{ color: 'var(--hint)', fontSize: '0.9rem', marginBottom: '1.5rem', flex: 1, lineHeight: '1.5' }}>{article.dek}</p>
                  <span className="link-arrow" style={{ marginTop: 'auto', fontSize: '0.9rem', fontWeight: '600' }}>
                    Read Article <svg viewBox="0 0 16 16" width="14" height="14"><path d="M2 8h11M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Related Work/Clients */}
      <section className="section" style={{ paddingBlock: 'clamp(3rem, 5vw, 4rem)', background: '#fff' }}>
        <div className="container">
          <h2 className="statement statement--small" style={{ marginBottom: '2rem', textAlign: 'center', fontSize: '1.75rem' }}>Related Work & Clients</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', maxWidth: '1000px', marginInline: 'auto' }}>
            {latestWork.map((work) => (
              <a href={`/work/${work.slug}`} key={work.slug} style={{ textDecoration: 'none', color: 'inherit', display: 'flex' }}>
                <div style={{ padding: '1.5rem', background: 'var(--paper)', borderRadius: '0.5rem', display: 'flex', flexDirection: 'column', width: '100%', border: '1px solid var(--border)', transition: 'transform 0.2s, box-shadow 0.2s' }}>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', lineHeight: '1.4' }}>{work.title}</h3>
                  <p style={{ color: 'var(--hint)', fontSize: '0.9rem', marginBottom: '1.5rem', flex: 1 }}>{work.industry}</p>
                  <span className="link-arrow" style={{ marginTop: 'auto', fontSize: '0.9rem', fontWeight: '600' }}>
                    View Case Study <svg viewBox="0 0 16 16" width="14" height="14"><path d="M2 8h11M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
