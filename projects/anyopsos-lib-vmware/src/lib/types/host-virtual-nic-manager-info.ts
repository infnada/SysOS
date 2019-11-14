import {DynamicData} from './dynamic-data';

import {VirtualNicManagerNetConfig} from './virtual-nic-manager-net-config';
export interface HostVirtualNicManagerInfo extends DynamicData {
  netConfig?: VirtualNicManagerNetConfig[];
}
