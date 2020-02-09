import {DynamicData} from './dynamic-data';

import {HostIpConfigIpV6AddressConfiguration} from './host-ip-config-ip-v6address-configuration';

export interface HostIpConfig extends DynamicData {
  dhcp: boolean;
  ipAddress?: string;
  ipV6Config?: HostIpConfigIpV6AddressConfiguration;
  subnetMask?: string;
}