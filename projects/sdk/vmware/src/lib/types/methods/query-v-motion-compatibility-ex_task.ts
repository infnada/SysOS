import {ManagedObjectReference} from '../data/managed-object-reference';


export interface QueryVMotionCompatibilityEx_Task {
  _this: ManagedObjectReference;
  vm: ManagedObjectReference & { $type: 'VirtualMachine[]'; };
  host: ManagedObjectReference & { $type: 'HostSystem[]'; };
}