import LocationTemplate from '../../components/LocationTemplate';
import { getLocation } from '../../lib/locations';
import { buildMetadata } from '../../lib/meta';

const location = getLocation('los-angeles-seo');

export const metadata = buildMetadata({
  title: location.metaTitle,
  description: location.metaDescription,
  path: '/los-angeles-seo',
});

export default function LosAngelesSeoPage() {
  return <LocationTemplate location={location} />;
}
