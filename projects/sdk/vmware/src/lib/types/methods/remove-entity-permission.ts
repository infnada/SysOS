import {ManagedObjectReference} from '../data/managed-object-reference';


export interface RemoveEntityPermission {
  _this: ManagedObjectReference;
  entity: ManagedObjectReference & { $type: 'ManagedEntity'; };
  user: string;
  isGroup: boolean;
}