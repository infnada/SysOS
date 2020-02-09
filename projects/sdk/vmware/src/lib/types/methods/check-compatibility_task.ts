import {ManagedObjectReference} from '../data/managed-object-reference';


export interface CheckCompatibility_Task {
  _this: ManagedObjectReference;
  vm: ManagedObjectReference & { $type: 'VirtualMachine'; };
  host?: ManagedObjectReference & { $type: 'HostSystem'; };
  pool?: ManagedObjectReference & { $type: 'ResourcePool'; };
  testType?: string[];
}