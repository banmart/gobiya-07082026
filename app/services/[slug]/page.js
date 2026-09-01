import { notFound } from 'next/navigation';
import { layoutForService } from '../../../components/services';
import { getService, servicePath, SERVICE_SLUGS, keywordFromSlug } from '../../../lib/serviceIndex';
import { buildMetadata } from '../../../lib/meta';

export function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return buildMetadata({
    title: keywordFromSlug(slug),
    description: service.metaDescription,
    path: servicePath(slug),
    parent: 'Services',
  });
}

export default async function Page({ params }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  // Every service has its own layout. A missing one is a build-time error
  // rather than a silent fallback, so a new service cannot quietly reintroduce
  // a shared template.
  const Layout = layoutForService(slug);
  if (!Layout) {
    throw new Error(
      `No layout registered for service "${slug}". Add one in components/services/index.js.`
    );
  }

  return <Layout service={service} />;
}
