import {ManagedObjectReference} from '../data/managed-object-reference';
import {CryptoKeyPlain} from '../data/crypto-key-plain';


export interface AddKey {
  _this: ManagedObjectReference;
  key: CryptoKeyPlain;
}