import {ManagedObjectReference} from '../data/managed-object-reference';


export interface AddAuthorizationRole {
  _this: ManagedObjectReference;
  name: string;
  privIds?: string[];
}