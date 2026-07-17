import { LogoMark } from '../../components/Logo';
import { buildMetadata } from '../../lib/meta';

export const metadata = buildMetadata({
  title: 'Brand Preview',
  description: 'Internal brand lockup preview.',
  path: '/brand-preview',
  robots: { index: false, follow: false },
});

const Row = ({ dark, children }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '3rem',
      padding: '3rem',
      background: dark ? 'var(--overlay)' : '#fff',
      color: dark ? '#f4f7fb' : 'var(--darkest)',
      borderBottom: '1px solid var(--border)',
    }}
  >
    {children}
  </div>
);

export default function BrandPreview() {
  return (
    <main style={{ paddingTop: 'calc(var(--nav-h) + 2rem)' }}>
      <Row>
        <LogoMark size={16} />
        <LogoMark size={28} />
        <LogoMark size={48} />
        <LogoMark size={120} />
        <span className="nav__logo"><LogoMark size={30} /><span className="nav__logo-word">Gobiya</span></span>
      </Row>
      <Row dark>
        <LogoMark size={16} light />
        <LogoMark size={28} light />
        <LogoMark size={48} light />
        <LogoMark size={120} light />
        <span className="nav__logo" style={{ color: '#f4f7fb' }}><LogoMark size={30} light /><span className="nav__logo-word">Gobiya</span></span>
      </Row>
    </main>
  );
}
