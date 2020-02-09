import {ManagedObjectReference} from '../data/managed-object-reference';
import {ClusterComputeResourceHCIConfigSpec} from '../data/cluster-compute-resource-h-c-i-config-spec';


export interface ValidateHCIConfiguration {
  _this: ManagedObjectReference;
  hciConfigSpec?: ClusterComputeResourceHCIConfigSpec;
  hosts?: ManagedObjectReference & { $type: 'HostSystem[]'; };
}