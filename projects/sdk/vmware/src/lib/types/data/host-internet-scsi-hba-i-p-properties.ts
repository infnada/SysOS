import {DynamicData} from './dynamic-data';

import {HostInternetScsiHbaIPv6Properties} from './host-internet-scsi-hba-i-pv6properties';

export interface HostInternetScsiHbaIPProperties extends DynamicData {
  address?: string;
  alternateDnsServerAddress?: string;
  arpRedirectEnabled?: boolean;
  defaultGateway?: string;
  dhcpConfigurationEnabled: boolean;
  ipv4Enabled?: boolean;
  ipv6Address?: string;
  ipv6DefaultGateway?: string;
  ipv6Enabled?: boolean;
  ipv6properties?: HostInternetScsiHbaIPv6Properties;
  ipv6SubnetMask?: string;
  jumboFramesEnabled?: boolean;
  mac?: string;
  mtu?: number;
  primaryDnsServerAddress?: string;
  subnetMask?: string;
}