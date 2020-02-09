import {ManagedObjectReference} from '../data/managed-object-reference';


export interface LookupVmOverheadMemory {
  _this: ManagedObjectReference;
  vm: ManagedObjectReference & { $type: 'VirtualMachine'; };
  host: ManagedObjectReference & { $type: 'HostSystem'; };
}