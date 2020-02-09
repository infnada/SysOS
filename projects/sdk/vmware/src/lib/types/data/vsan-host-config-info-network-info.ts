import {DynamicData} from './dynamic-data';

import {VsanHostConfigInfoNetworkInfoPortConfig} from './vsan-host-config-info-network-info-port-config';

export interface VsanHostConfigInfoNetworkInfo extends DynamicData {
  port?: VsanHostConfigInfoNetworkInfoPortConfig[];
}