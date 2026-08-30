import { buildMetadata } from '../../../lib/meta';
import IPGeoTool from './IPGeoTool';

export const metadata = buildMetadata({
  title: 'IP Geolocation | See the City and ISP Behind Any IP',
  description:
    'IP geolocation free from Gobiya — run a GEO IP lookup on any IPv4 or IPv6 address and see the city, country, and internet provider behind it. No signup.',
  path: '/tools/ip-geolocation',
  // Authored to length — ships without the ' — Gobiya' tail.
  brandSuffix: false,
});

export default function Page() {
  return <IPGeoTool />;
}
