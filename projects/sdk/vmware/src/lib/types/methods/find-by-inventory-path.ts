import {ManagedObjectReference} from '../data/managed-object-reference';


export interface FindByInventoryPath {
  _this: ManagedObjectReference;
  inventoryPath: string;
}