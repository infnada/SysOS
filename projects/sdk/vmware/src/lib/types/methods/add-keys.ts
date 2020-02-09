import {ManagedObjectReference} from '../data/managed-object-reference';
import {CryptoKeyPlain} from '../data/crypto-key-plain';


export interface AddKeys {
  _this: ManagedObjectReference;
  keys?: CryptoKeyPlain[];
}