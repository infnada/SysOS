import {ManagedObjectReference} from '../data/managed-object-reference';
import {CryptoKeyPlain} from '../data/crypto-key-plain';


export interface EnableCrypto {
  _this: ManagedObjectReference;
  keyPlain: CryptoKeyPlain;
}