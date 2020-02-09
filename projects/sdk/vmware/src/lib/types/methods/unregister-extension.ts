import {ManagedObjectReference} from '../data/managed-object-reference';


export interface UnregisterExtension {
  _this: ManagedObjectReference;
  extensionKey: string;
}