import {ManagedObjectReference} from '../data/managed-object-reference';
import {ClusterComputeResourceHostConfigurationInput} from '../data/cluster-compute-resource-host-configuration-input';
import {SDDCBase} from '../data/s-d-d-c-base';


export interface ExtendHCI_Task {
  _this: ManagedObjectReference;
  hostInputs?: ClusterComputeResourceHostConfigurationInput[];
  vSanConfigSpec?: SDDCBase;
}