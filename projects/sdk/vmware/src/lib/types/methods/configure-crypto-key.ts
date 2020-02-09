import {ManagedObjectReference} from '../data/managed-object-reference';
import {CryptoKeyId} from '../data/crypto-key-id';


export interface ConfigureCryptoKey {
  _this: ManagedObjectReference;
  keyId?: CryptoKeyId;
}