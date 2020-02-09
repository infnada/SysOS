import {ManagedObjectReference} from '../data/managed-object-reference';
import {CryptoKeyPlain} from '../data/crypto-key-plain';


export interface ChangeKey_Task {
  _this: ManagedObjectReference;
  newKey: CryptoKeyPlain;
}