import {ManagedObjectReference} from '../data/managed-object-reference';


export interface QueryDisksUsingFilter {
  _this: ManagedObjectReference;
  filterId: string;
  compRes: ManagedObjectReference & { $type: 'ComputeResource'; };
}