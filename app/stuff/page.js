import fs from 'fs';
import path from 'path';
import Breadcrumbs from '../../components/Breadcrumbs';
import SubHero from '../../components/SubHero';
import ClientLogos from '../../components/ClientLogos';
import BentoVideoCard from '../../components/BentoVideoCard';
import { heroImage } from '../../lib/heroImages';
import { buildMetadata } from '../../lib/meta';

export const dynamic = 'force-dynamic';

export const metadata = buildMetadata({
  title: 'AI Video Marketing & Scroll-Stopping Video Production | Gobiya',
  description:
    'We use AI to create viral, scroll-stopping video ads and brand commercials that are affordable, fast to produce, and SEO-optimized for maximum search and social ROI.',
  path: '/stuff',
});

function formatTitleFromFilename(filename) {
  const nameWithoutExt = filename.replace(/\.webm$/i, '');
  const spaced = nameWithoutExt
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[-_]+/g, ' ')
    .trim();
  return spaced
    .split(' ')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function formatBytes(bytes) {
  if (!bytes || bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

export default async function StuffPage() {
  const targetDirs = [
    { dirPath: path.join(/*turbopackIgnore: true*/ process.cwd(), 'public/assets/videos'), urlPrefix: '/assets/videos/' },
    { dirPath: path.join(/*turbopackIgnore: true*/ process.cwd(), 'public/videos'), urlPrefix: '/videos/' },
  ];

  let videoList = [];

  for (const target of targetDirs) {
    try {
      if (fs.existsSync(target.dirPath)) {
        const files = fs.readdirSync(target.dirPath);
        files
          .filter((file) => file.toLowerCase().endsWith('.webm'))
          .forEach((file) => {
            const filePath = path.join(target.dirPath, file);
            let stat = null;
            try {
              stat = fs.statSync(filePath);
            } catch (e) {}

            videoList.push({
              filename: file,
              title: formatTitleFromFilename(file),
              url: `${target.urlPrefix}${encodeURIComponent(file)}`,
              size: stat ? formatBytes(stat.size) : 'WebM',
              mtimeMs: stat ? stat.mtimeMs : 0,
              mtime: stat ? new Date(stat.mtime).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : null,
            });
          });
      }
    } catch (error) {
      console.error(`Error scanning ${target.dirPath}:`, error);
    }
  }

  // Sort latest first
  videoList.sort((a, b) => b.mtimeMs - a.mtimeMs);

  return (
    <main id="top">
      {/* ══ 2. Hero — Image Background ONLY ══ */}
      <SubHero
        image={heroImage(17)}
        imageOnly={true}
      />

      <section className="page-hero section" style={{ paddingBottom: '1rem' }}>
        <div className="container container--narrow">
          <Breadcrumbs
            inHero
            items={[
              { label: 'Home', href: '/' },
              { label: 'Resources', href: '/insights' },
              { label: 'Video Showcase' },
            ]}
          />
          <h1 className="statement" data-split>We Use AI to Create Viral, Scroll-Stopping Videos That Are Surprisingly Affordable</h1>
          <p className="lede" data-reveal>Stop burning budget on slow camera crews. We combine generative AI workflows with SEO-backed metadata to produce high-converting commercial ads, social reels, and web background videos delivered in days.</p>
        </div>
      </section>

      {/* ══ 3. Bento & Masonry Portfolio Showcase ══ */}
      <section className="section" style={{ background: 'var(--paper)', minHeight: '60vh', paddingBlock: 'clamp(3rem, 5vw, 5rem)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 className="statement statement--small" style={{ margin: 0 }}>
                {videoList.length === 1 ? '1 Video Creative' : `${videoList.length} Video Creatives`} Featured
              </h2>
              <p style={{ color: 'var(--hint)', fontSize: '0.9375rem', marginTop: '0.25rem' }}>
                Bento-grid showcase with auto-adaptive aspect ratios (9:16 reels, 16:9 commercials, 4:3 ads, 1:1 promo cards).
              </p>
            </div>
          </div>

          {videoList.length === 0 ? (
            <div style={{ background: '#FFFFFF', border: '2px dashed var(--border-strong)', borderRadius: '1rem', padding: '4rem 2rem', textAlign: 'center', maxWidth: '36rem', marginInline: 'auto' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎬</div>
              <h3 style={{ fontSize: '1.25rem', color: '#0B1E36', marginBottom: '0.5rem' }}>No video creatives published yet</h3>
              <p style={{ color: 'var(--hint)', fontSize: '0.9375rem', lineHeight: '1.6' }}>
                Add any <code>.webm</code> video asset to <code>public/assets/videos/</code> to showcase it in this high-converting video gallery.
              </p>
            </div>
          ) : (
            <div
              className="bento-video-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gridAutoFlow: 'dense',
                gap: '1.5rem',
              }}
            >
              {videoList.map((video, idx) => {
                const isFeatured = idx === 0 || idx === 5;
                return (
                  <BentoVideoCard
                    key={`${video.url}-${idx}`}
                    video={video}
                    isFeatured={isFeatured}
                  />
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ══ 4. Bottom Sales CTA Banner ══ */}
      <section className="mw-navy-banner">
        <div className="container">
          <h2 className="mw-navy-banner__title">
            Ready for scroll-stopping AI video ads that actually bring in real leads?
          </h2>
          <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/free-site-scan" className="mw-navy-banner__btn">
              Schedule a Video Strategy Session
            </a>
          </div>
        </div>
      </section>

      {/* ══ Client Logo Strip ══ */}
      <ClientLogos />

      {/* Embedded Bento Mobile & Desktop Responsiveness CSS */}
      <style>{`
        @media (max-width: 768px) {
          .bento-card--featured, .bento-card--vertical {
            grid-column: span 1 !important;
            grid-row: span 1 !important;
          }
        }
        .bento-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 30px rgba(11, 30, 54, 0.12) !important;
          border-color: #0B1E36 !important;
        }
      `}</style>
    </main>
  );
}
