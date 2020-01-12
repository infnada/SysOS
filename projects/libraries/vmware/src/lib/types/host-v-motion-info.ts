import {DynamicData} from './dynamic-data';

import {HostIpConfig} from './host-ip-config';
import {HostVMotionNetConfig} from './host-v-motion-net-config';
export interface HostVMotionInfo extends DynamicData {
  ipConfig?: HostIpConfig;
  netConfig?: HostVMotionNetConfig;
}
