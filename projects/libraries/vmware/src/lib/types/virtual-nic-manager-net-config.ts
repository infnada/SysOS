import {DynamicData} from './dynamic-data';

import {HostVirtualNic} from './host-virtual-nic';
export interface VirtualNicManagerNetConfig extends DynamicData {
  candidateVnic?: HostVirtualNic[];
  multiSelectAllowed: boolean;
  nicType: string;
  selectedVnic?: string[];
}
