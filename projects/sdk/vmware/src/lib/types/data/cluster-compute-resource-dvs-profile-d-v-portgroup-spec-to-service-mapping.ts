import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
import {DVPortgroupConfigSpec} from './d-v-portgroup-config-spec';

export interface ClusterComputeResourceDvsProfileDVPortgroupSpecToServiceMapping extends DynamicData {
  dvPortgroup?: ManagedObjectReference & { $type: 'DistributedVirtualPortgroup'; };
  dvPortgroupSpec?: DVPortgroupConfigSpec;
  service: string;
}