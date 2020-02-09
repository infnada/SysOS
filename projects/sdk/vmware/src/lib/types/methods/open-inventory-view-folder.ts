import {ManagedObjectReference} from '../data/managed-object-reference';


export interface OpenInventoryViewFolder {
  _this: ManagedObjectReference;
  entity: ManagedObjectReference & { $type: 'ManagedEntity[]'; };
}