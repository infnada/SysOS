import {ManagedObjectReference} from '../data/managed-object-reference';


export interface RenameDatastore {
  _this: ManagedObjectReference;
  newName: string;
}