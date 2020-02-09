import {ManagedObjectReference} from '../data/managed-object-reference';


export interface FindRulesForVm {
  _this: ManagedObjectReference;
  vm: ManagedObjectReference & { $type: 'VirtualMachine'; };
}