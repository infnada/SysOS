import {DynamicData} from './dynamic-data';

import {ClusterComputeResourceDvsProfileDVPortgroupSpecToServiceMapping} from './cluster-compute-resource-dvs-profile-d-v-portgroup-spec-to-service-mapping';
import {ManagedObjectReference} from './managed-object-reference';

export interface ClusterComputeResourceDvsProfile extends DynamicData {
  dvPortgroupMapping?: ClusterComputeResourceDvsProfileDVPortgroupSpecToServiceMapping[];
  dvsName?: string;
  dvSwitch?: ManagedObjectReference & { $type: 'DistributedVirtualSwitch'; };
  pnicDevices?: string[];
}