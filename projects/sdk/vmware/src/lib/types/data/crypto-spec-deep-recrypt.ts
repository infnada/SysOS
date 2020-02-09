import {CryptoSpec} from './crypto-spec';

import {CryptoKeyId} from './crypto-key-id';

export interface CryptoSpecDeepRecrypt extends CryptoSpec {
  newKeyId: CryptoKeyId;
}