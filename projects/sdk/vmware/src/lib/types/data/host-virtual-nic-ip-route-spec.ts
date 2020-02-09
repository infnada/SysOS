import {DynamicData} from './dynamic-data';

import {HostIpRouteConfig} from './host-ip-route-config';

export interface HostVirtualNicIpRouteSpec extends DynamicData {
  ipRouteConfig?: HostIpRouteConfig;
}