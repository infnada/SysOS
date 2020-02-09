import {ManagedObjectReference} from '../data/managed-object-reference';


export interface DeleteFile {
  _this: ManagedObjectReference;
  datastorePath: string;
}