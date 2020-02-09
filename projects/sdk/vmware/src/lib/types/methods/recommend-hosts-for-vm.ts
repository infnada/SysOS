import {ManagedObjectReference} from '../data/managed-object-reference';


export interface RecommendHostsForVm {
  _this: ManagedObjectReference;
  vm: ManagedObjectReference & { $type: 'VirtualMachine'; };
  pool?: ManagedObjectReference & { $type: 'ResourcePool'; };
}