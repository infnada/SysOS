import {ManagedObjectReference} from '../data/managed-object-reference';


export interface FindExtension {
  _this: ManagedObjectReference;
  extensionKey: string;
}