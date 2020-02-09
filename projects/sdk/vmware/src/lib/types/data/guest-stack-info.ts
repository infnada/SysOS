import {DynamicData} from './dynamic-data';

import {NetDhcpConfigInfo} from './net-dhcp-config-info';
import {NetDnsConfigInfo} from './net-dns-config-info';
import {NetIpRouteConfigInfo} from './net-ip-route-config-info';
import {KeyValue} from './key-value';

export interface GuestStackInfo extends DynamicData {
  dhcpConfig?: NetDhcpConfigInfo;
  dnsConfig?: NetDnsConfigInfo;
  ipRouteConfig?: NetIpRouteConfigInfo;
  ipStackConfig?: KeyValue[];
}