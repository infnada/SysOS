import {ManagedObjectReference} from '../data/managed-object-reference';


export interface CreateSecondaryVM_Task {
  _this: ManagedObjectReference;
  host?: ManagedObjectReference & { $type: 'HostSystem'; };
}