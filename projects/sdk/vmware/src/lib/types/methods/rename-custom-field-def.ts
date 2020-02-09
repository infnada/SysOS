import {ManagedObjectReference} from '../data/managed-object-reference';


export interface RenameCustomFieldDef {
  _this: ManagedObjectReference;
  key: number;
  name: string;
}