import { notFound } from 'next/navigation';
import ServiceTemplate from '../../../components/ServiceTemplate';
import { getService, servicePath, SERVICE_SLUGS } from '../../../lib/serviceIndex';
import { buildMetadata } from '../../../lib/meta';

// One route for all nine services, replacing the near-identical flat pages
// that each did nothing but call getService and render this template. Those
// old flat URLs are 301s in next.config.mjs.
export function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return buildMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: servicePath(slug),
  });
}

export default async function Page({ params }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  return <ServiceTemplate service={service} />;
}
