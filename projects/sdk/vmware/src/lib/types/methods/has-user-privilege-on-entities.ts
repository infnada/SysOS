import {ManagedObjectReference} from '../data/managed-object-reference';


export interface HasUserPrivilegeOnEntities {
  _this: ManagedObjectReference;
  entities: ManagedObjectReference[];
  userName: string;
  privId?: string[];
}