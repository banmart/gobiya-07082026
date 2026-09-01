import LocAreaBrief from '../../components/locations/LocAreaBrief';
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
  return <LocAreaBrief area={area} />;
}
