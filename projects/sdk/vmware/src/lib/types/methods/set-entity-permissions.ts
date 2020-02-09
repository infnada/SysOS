import {ManagedObjectReference} from '../data/managed-object-reference';
import {Permission} from '../data/permission';


export interface SetEntityPermissions {
  _this: ManagedObjectReference;
  entity: ManagedObjectReference & { $type: 'ManagedEntity'; };
  permission?: Permission[];
}