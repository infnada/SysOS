import {DynamicData} from './dynamic-data';

import {HostVirtualNicSpec} from './host-virtual-nic-spec';

export interface HostVirtualNic extends DynamicData {
  device: string;
  key: string;
  port?: string;
  portgroup: string;
  spec: HostVirtualNicSpec;
}