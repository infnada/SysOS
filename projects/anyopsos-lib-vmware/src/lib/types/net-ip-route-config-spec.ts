import {DynamicData} from './dynamic-data';

import {NetIpRouteConfigSpecIpRouteSpec} from './net-ip-route-config-spec-ip-route-spec';
export interface NetIpRouteConfigSpec extends DynamicData {
  ipRoute?: NetIpRouteConfigSpecIpRouteSpec[];
}
