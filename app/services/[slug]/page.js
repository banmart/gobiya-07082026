import { notFound } from 'next/navigation';
import ServiceTemplate from '../../../components/ServiceTemplate';
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
  return <ServiceTemplate service={service} />;
}
