import {DynamicData} from './dynamic-data';

import {HostIpRouteOp} from './host-ip-route-op';

export interface HostIpRouteTableConfig extends DynamicData {
  ipRoute?: HostIpRouteOp[];
  ipv6Route?: HostIpRouteOp[];
}