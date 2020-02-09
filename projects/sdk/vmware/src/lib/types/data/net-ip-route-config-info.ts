import {DynamicData} from './dynamic-data';

import {NetIpRouteConfigInfoIpRoute} from './net-ip-route-config-info-ip-route';

export interface NetIpRouteConfigInfo extends DynamicData {
  ipRoute?: NetIpRouteConfigInfoIpRoute[];
}