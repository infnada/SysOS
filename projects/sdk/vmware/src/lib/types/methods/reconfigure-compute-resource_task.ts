import {ManagedObjectReference} from '../data/managed-object-reference';
import {ComputeResourceConfigSpec} from '../data/compute-resource-config-spec';


export interface ReconfigureComputeResource_Task {
  _this: ManagedObjectReference;
  spec: ComputeResourceConfigSpec;
  modify: boolean;
}