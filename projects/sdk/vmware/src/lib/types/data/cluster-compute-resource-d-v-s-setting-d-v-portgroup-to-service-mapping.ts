import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';

export interface ClusterComputeResourceDVSSettingDVPortgroupToServiceMapping extends DynamicData {
  dvPortgroup: ManagedObjectReference & { $type: 'DistributedVirtualPortgroup'; };
  service: string;
}