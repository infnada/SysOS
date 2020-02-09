import {ManagedObjectReference} from '../data/managed-object-reference';


export interface CreateLocalDatastore {
  _this: ManagedObjectReference;
  name: string;
  path: string;
}