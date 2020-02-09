import {ManagedObjectReference} from '../data/managed-object-reference';
import {CryptoKeyId} from '../data/crypto-key-id';


export interface RemoveKey {
  _this: ManagedObjectReference;
  key: CryptoKeyId;
  force: boolean;
}