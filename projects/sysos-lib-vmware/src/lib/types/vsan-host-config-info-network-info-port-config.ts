import {DynamicData} from './dynamic-data';

import {VsanHostIpConfig} from './vsan-host-ip-config';
export interface VsanHostConfigInfoNetworkInfoPortConfig extends DynamicData {
  device: string;
  ipConfig?: VsanHostIpConfig;
}
