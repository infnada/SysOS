import {ManagedObjectReference} from '../data/managed-object-reference';


export interface SetPublicKey {
  _this: ManagedObjectReference;
  extensionKey: string;
  publicKey: string;
}