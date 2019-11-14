import {DynamicData} from './dynamic-data';

import {NetDhcpConfigInfo} from './net-dhcp-config-info';
import {NetIpConfigInfoIpAddress} from './net-ip-config-info-ip-address';
export interface NetIpConfigInfo extends DynamicData {
  autoConfigurationEnabled?: boolean;
  dhcp?: NetDhcpConfigInfo;
  ipAddress?: NetIpConfigInfoIpAddress[];
}
