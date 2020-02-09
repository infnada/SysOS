import {ManagedObjectReference} from '../data/managed-object-reference';


export interface CloseInventoryViewFolder {
  _this: ManagedObjectReference;
  entity: ManagedObjectReference & { $type: 'ManagedEntity[]'; };
}