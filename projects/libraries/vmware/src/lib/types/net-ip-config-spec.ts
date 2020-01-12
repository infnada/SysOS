import {DynamicData} from './dynamic-data';

import {NetDhcpConfigSpec} from './net-dhcp-config-spec';
import {NetIpConfigSpecIpAddressSpec} from './net-ip-config-spec-ip-address-spec';
export interface NetIpConfigSpec extends DynamicData {
  autoConfigurationEnabled?: boolean;
  dhcp?: NetDhcpConfigSpec;
  ipAddress?: NetIpConfigSpecIpAddressSpec[];
}
