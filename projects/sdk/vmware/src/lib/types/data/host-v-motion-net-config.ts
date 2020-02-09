import {DynamicData} from './dynamic-data';

import {HostVirtualNic} from './host-virtual-nic';

export interface HostVMotionNetConfig extends DynamicData {
  candidateVnic?: HostVirtualNic[];
  selectedVnic?: string;
}