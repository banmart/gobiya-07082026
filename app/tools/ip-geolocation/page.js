import { buildMetadata } from '../../../lib/meta';
import IPGeoTool from './IPGeoTool';

export const metadata = buildMetadata({
  title: 'IP Geolocation',
  description:
    'IP geolocation free from Gobiya — run a GEO IP lookup on any IPv4 or IPv6 address and see the city, country, and internet provider behind it. No signup.',
  path: '/tools/ip-geolocation',
  parent: 'Tools',
});

export default function Page() {
  return <IPGeoTool />;
}
