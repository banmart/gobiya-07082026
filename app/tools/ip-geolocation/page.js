import { buildMetadata } from '../../../lib/meta';
import IPGeoTool from './IPGeoTool';

export const metadata = buildMetadata({
  title: 'Free IP Geolocation Lookup Tool | Gobiya',
  description: 'Find out roughly where any IP address is located and which internet provider it belongs to. Free tool, no signup required.',
  path: '/tools/ip-geolocation',
});

export default function Page() {
  return <IPGeoTool />;
}
