import {DynamicData} from './dynamic-data';

import {HostIpRouteEntry} from './host-ip-route-entry';

export interface HostIpRouteTableInfo extends DynamicData {
  ipRoute?: HostIpRouteEntry[];
  ipv6Route?: HostIpRouteEntry[];
}