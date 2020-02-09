import {CryptoSpec} from './crypto-spec';

import {CryptoKeyId} from './crypto-key-id';

export interface CryptoSpecEncrypt extends CryptoSpec {
  cryptoKeyId: CryptoKeyId;
}