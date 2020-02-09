import {ManagedObjectReference} from '../data/managed-object-reference';


export interface DeleteCustomizationSpec {
  _this: ManagedObjectReference;
  name: string;
}