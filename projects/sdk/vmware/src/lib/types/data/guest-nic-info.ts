import {DynamicData} from './dynamic-data';

import {NetDnsConfigInfo} from './net-dns-config-info';
import {NetIpConfigInfo} from './net-ip-config-info';
import {NetBIOSConfigInfo} from './net-b-i-o-s-config-info';

export interface GuestNicInfo extends DynamicData {
  connected: boolean;
  deviceConfigId: number;
  dnsConfig?: NetDnsConfigInfo;
  ipAddress?: string[];
  ipConfig?: NetIpConfigInfo;
  macAddress?: string;
  netBIOSConfig?: NetBIOSConfigInfo;
  network?: string;
}