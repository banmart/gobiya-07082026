import ServiceAreaTemplate from '../../components/ServiceAreaTemplate';
import { getLiveArea } from '../../lib/areas';
import { buildMetadata } from '../../lib/meta';

const area = getLiveArea('glendale-seo');

export const metadata = buildMetadata({
  title: area.metaTitle,
  description: area.metaDescription,
  path: '/glendale-seo',
  brandSuffix: area.brandSuffix,
});

export default function GlendaleSeoPage() {
  return <ServiceAreaTemplate area={area} />;
}
