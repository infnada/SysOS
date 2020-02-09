import {ManagedObjectReference} from '../data/managed-object-reference';
import {CryptoKeyId} from '../data/crypto-key-id';


export interface RemoveKeys {
  _this: ManagedObjectReference;
  keys?: CryptoKeyId[];
  force: boolean;
}