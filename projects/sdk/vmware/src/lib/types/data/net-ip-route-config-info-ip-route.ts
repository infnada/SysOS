import {DynamicData} from './dynamic-data';

import {NetIpRouteConfigInfoGateway} from './net-ip-route-config-info-gateway';

export interface NetIpRouteConfigInfoIpRoute extends DynamicData {
  gateway: NetIpRouteConfigInfoGateway;
  network: string;
  prefixLength: number;
}