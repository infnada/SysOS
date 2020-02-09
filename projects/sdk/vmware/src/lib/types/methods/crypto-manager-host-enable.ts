import {ManagedObjectReference} from '../data/managed-object-reference';
import {CryptoKeyPlain} from '../data/crypto-key-plain';


export interface CryptoManagerHostEnable {
  _this: ManagedObjectReference;
  initialKey: CryptoKeyPlain;
}