import {ManagedObjectReference} from '../data/managed-object-reference';


export interface RetrieveEntityPermissions {
  _this: ManagedObjectReference;
  entity: ManagedObjectReference & { $type: 'ManagedEntity'; };
  inherited: boolean;
}