import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
import {ClusterComputeResourceHostVmkNicInfo} from './cluster-compute-resource-host-vmk-nic-info';

export interface ClusterComputeResourceHostConfigurationInput extends DynamicData {
  allowedInNonMaintenanceMode?: boolean;
  host: ManagedObjectReference & { $type: 'HostSystem'; };
  hostVmkNics?: ClusterComputeResourceHostVmkNicInfo[];
}