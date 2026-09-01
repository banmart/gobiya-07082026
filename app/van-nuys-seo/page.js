import LocOfficeVisit from '../../components/locations/LocOfficeVisit';
import { getLocation } from '../../lib/locations';
import { buildMetadata } from '../../lib/meta';

const location = getLocation('van-nuys-seo');

export const metadata = buildMetadata({
  title: location.metaTitle,
  description: location.metaDescription,
  path: '/van-nuys-seo',
});

export default function VanNuysSeoPage() {
  return <LocOfficeVisit location={location} />;
}
