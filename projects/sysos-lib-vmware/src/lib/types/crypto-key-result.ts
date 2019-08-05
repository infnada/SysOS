import {DynamicData} from './dynamic-data';

import {CryptoKeyId} from './crypto-key-id';
export interface CryptoKeyResult extends DynamicData {
  keyId: CryptoKeyId;
  reason?: boolean;
}
