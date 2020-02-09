import {ManagedObjectReference} from '../data/managed-object-reference';
import {Permission} from '../data/permission';


export interface ResetEntityPermissions {
  _this: ManagedObjectReference;
  entity: ManagedObjectReference & { $type: 'ManagedEntity'; };
  permission?: Permission[];
}