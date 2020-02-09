import {DynamicData} from './dynamic-data';

import {HostIpRouteEntry} from './host-ip-route-entry';

export interface HostIpRouteOp extends DynamicData {
  changeOperation: string;
  route: HostIpRouteEntry;
}