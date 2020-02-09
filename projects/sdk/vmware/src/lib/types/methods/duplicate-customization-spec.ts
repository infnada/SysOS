import {ManagedObjectReference} from '../data/managed-object-reference';


export interface DuplicateCustomizationSpec {
  _this: ManagedObjectReference;
  name: string;
  newName: string;
}