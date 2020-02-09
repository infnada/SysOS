import {DynamicData} from './dynamic-data';

import {NetDhcpConfigSpecDhcpOptionsSpec} from './net-dhcp-config-spec-dhcp-options-spec';

export interface NetDhcpConfigSpec extends DynamicData {
  ipv4?: NetDhcpConfigSpecDhcpOptionsSpec;
  ipv6?: NetDhcpConfigSpecDhcpOptionsSpec;
}