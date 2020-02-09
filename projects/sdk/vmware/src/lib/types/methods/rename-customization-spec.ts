import {ManagedObjectReference} from '../data/managed-object-reference';


export interface RenameCustomizationSpec {
  _this: ManagedObjectReference;
  name: string;
  newName: string;
}