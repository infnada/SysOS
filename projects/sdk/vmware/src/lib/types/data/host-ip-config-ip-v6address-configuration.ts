import {DynamicData} from './dynamic-data';

import {HostIpConfigIpV6Address} from './host-ip-config-ip-v6address';

export interface HostIpConfigIpV6AddressConfiguration extends DynamicData {
  autoConfigurationEnabled?: boolean;
  dhcpV6Enabled?: boolean;
  ipV6Address?: HostIpConfigIpV6Address[];
}