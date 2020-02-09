import {DynamicData} from './dynamic-data';

import {NetDhcpConfigInfoDhcpOptions} from './net-dhcp-config-info-dhcp-options';

export interface NetDhcpConfigInfo extends DynamicData {
  ipv4?: NetDhcpConfigInfoDhcpOptions;
  ipv6?: NetDhcpConfigInfoDhcpOptions;
}