import {DynamicData} from './dynamic-data';

import {NetDnsConfigInfo} from './net-dns-config-info';
import {NetIpConfigInfo} from './net-ip-config-info';
import {NetBIOSConfigInfo} from './net-b-i-o-s-config-info';
import {Int} from './int';
export interface GuestNicInfo extends DynamicData {
  connected: boolean;
  deviceConfigId: Int;
  dnsConfig?: NetDnsConfigInfo;
  ipAddress?: string[];
  ipConfig?: NetIpConfigInfo;
  macAddress?: string;
  netBIOSConfig?: NetBIOSConfigInfo;
  network?: string;
}
