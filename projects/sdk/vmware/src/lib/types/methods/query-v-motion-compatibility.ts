import {ManagedObjectReference} from '../data/managed-object-reference';


export interface QueryVMotionCompatibility {
  _this: ManagedObjectReference;
  vm: ManagedObjectReference & { $type: 'VirtualMachine'; };
  host: ManagedObjectReference & { $type: 'HostSystem[]'; };
  compatibility?: string[];
}