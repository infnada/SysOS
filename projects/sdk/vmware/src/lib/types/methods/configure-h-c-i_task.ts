import {ManagedObjectReference} from '../data/managed-object-reference';
import {ClusterComputeResourceHCIConfigSpec} from '../data/cluster-compute-resource-h-c-i-config-spec';
import {ClusterComputeResourceHostConfigurationInput} from '../data/cluster-compute-resource-host-configuration-input';


export interface ConfigureHCI_Task {
  _this: ManagedObjectReference;
  clusterSpec: ClusterComputeResourceHCIConfigSpec;
  hostInputs?: ClusterComputeResourceHostConfigurationInput[];
}