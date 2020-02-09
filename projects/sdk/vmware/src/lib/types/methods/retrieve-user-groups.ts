import {ManagedObjectReference} from '../data/managed-object-reference';


export interface RetrieveUserGroups {
  _this: ManagedObjectReference;
  domain?: string;
  searchStr: string;
  belongsToGroup?: string;
  belongsToUser?: string;
  exactMatch: boolean;
  findUsers: boolean;
  findGroups: boolean;
}