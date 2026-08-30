import ServiceAreaTemplate from '../../components/ServiceAreaTemplate';
import { getLiveArea } from '../../lib/areas';
import { buildMetadata } from '../../lib/meta';

const area = getLiveArea('studio-city-seo');

export const metadata = buildMetadata({
  title: area.metaTitle,
  description: area.metaDescription,
  path: '/studio-city-seo',
  brandSuffix: area.brandSuffix,
});

export default function StudioCitySeoPage() {
  return <ServiceAreaTemplate area={area} />;
}
