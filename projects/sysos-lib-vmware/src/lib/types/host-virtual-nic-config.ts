import {DynamicData} from './dynamic-data';

import {HostVirtualNicSpec} from './host-virtual-nic-spec';
export interface HostVirtualNicConfig extends DynamicData {
  changeOperation?: string;
  device?: string;
  portgroup: string;
  spec?: HostVirtualNicSpec;
}
