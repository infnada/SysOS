import {DynamicData} from './dynamic-data';

import {HostDnsConfig} from './host-dns-config';
import {HostIpRouteConfig} from './host-ip-route-config';
import {HostIpRouteTableConfig} from './host-ip-route-table-config';
export interface HostNetStackInstance extends DynamicData {
  congestionControlAlgorithm?: string;
  dnsConfig?: HostDnsConfig;
  ipRouteConfig?: HostIpRouteConfig;
  key?: string;
  name?: HostIpRouteTableConfig;
}
