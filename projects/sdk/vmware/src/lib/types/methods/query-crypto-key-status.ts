import {ManagedObjectReference} from '../data/managed-object-reference';
import {CryptoKeyId} from '../data/crypto-key-id';


export interface QueryCryptoKeyStatus {
  _this: ManagedObjectReference;
  keyIds?: CryptoKeyId[];
  checkKeyBitMap: number;
}