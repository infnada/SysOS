import {DynamicData} from './dynamic-data';

import {CryptoKeyId} from './crypto-key-id';
export interface CryptoKeyPlain extends DynamicData {
  algorithm: string;
  keyData: string;
  keyId: CryptoKeyId;
}
