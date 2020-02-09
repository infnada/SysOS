import {ManagedObjectReference} from '../data/managed-object-reference';
import {DatacenterConfigSpec} from '../data/datacenter-config-spec';


export interface ReconfigureDatacenter_Task {
  _this: ManagedObjectReference;
  spec: DatacenterConfigSpec;
  modify: boolean;
}