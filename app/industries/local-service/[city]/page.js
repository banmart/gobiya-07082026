import { notFound } from 'next/navigation';
import LocationTemplate from '../../../../components/LocationTemplate';
import { LOCATIONS, LOCATIONS_LIST } from '../../../../lib/locations';
import { buildMetadata } from '../../../../lib/meta';

export function generateStaticParams() {
  return LOCATIONS_LIST.map((l) => ({ city: l.slug }));
}

export async function generateMetadata({ params }) {
  const { city } = await params;
  const location = LOCATIONS[city];
  if (!location) return {};
  return buildMetadata({
    title: `Local SEO in ${location.name}, CA`,
    description: location.metaDescription,
    path: `/industries/local-service/${location.slug}`,
  });
}

export default async function Page({ params }) {
  const { city } = await params;
  const location = LOCATIONS[city];
  if (!location) notFound();
  return <LocationTemplate location={location} />;
}
