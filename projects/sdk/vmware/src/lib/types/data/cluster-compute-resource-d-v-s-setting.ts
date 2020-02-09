import {DynamicData} from './dynamic-data';

import {ClusterComputeResourceDVSSettingDVPortgroupToServiceMapping} from './cluster-compute-resource-d-v-s-setting-d-v-portgroup-to-service-mapping';
import {ManagedObjectReference} from './managed-object-reference';

export interface ClusterComputeResourceDVSSetting extends DynamicData {
  dvPortgroupSetting?: ClusterComputeResourceDVSSettingDVPortgroupToServiceMapping[];
  dvSwitch: ManagedObjectReference & { $type: 'DistributedVirtualSwitch'; };
  pnicDevices?: string[];
}