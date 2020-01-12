import {DynamicData} from './dynamic-data';

import {NetIpRouteConfigInfoGateway} from './net-ip-route-config-info-gateway';
import {Int} from './int';
export interface NetIpRouteConfigInfoIpRoute extends DynamicData {
  gateway: NetIpRouteConfigInfoGateway;
  network: string;
  prefixLength: Int;
}
