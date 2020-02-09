import {DynamicData} from './dynamic-data';

import {HostVirtualNicSpec} from './host-virtual-nic-spec';

export interface ClusterComputeResourceHostVmkNicInfo extends DynamicData {
  nicSpec: HostVirtualNicSpec;
  service: string;
}