import { notFound } from 'next/navigation';
import { getHub, HUB_SLUGS, hubForTerm } from '../../../lib/glossaryHubs';
import { layoutForHub } from '../../../components/glossary';
import { buildMetadata } from '../../../lib/meta';

// This route used to serve 77 individual term pages averaging 69 words each.
// It now serves the six hub pages those terms were consolidated onto; the term
// URLs 301 to an anchor here, generated in next.config.mjs from the same
// taxonomy this file reads.
export function generateStaticParams() {
  return HUB_SLUGS.map((slug) => ({ slug }));
}

// The term slugs are redirected before routing, so nothing else should ever
// reach this route.
export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const hub = getHub(slug);
  if (!hub) return {};
  return buildMetadata({
    title: hub.title,
    description: hub.metaDescription,
    path: `/glossary/${hub.slug}`,
    parent: 'Glossary',
  });
}

export default async function Page({ params }) {
  const { slug } = await params;
  const hub = getHub(slug);
  if (!hub) notFound();

  const Layout = layoutForHub(hub.slug);
  if (!Layout) notFound();

  return <Layout hub={hub} hubForTerm={hubForTerm} />;
}
