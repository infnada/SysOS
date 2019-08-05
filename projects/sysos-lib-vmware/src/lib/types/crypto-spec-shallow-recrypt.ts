import {CryptoSpec} from './crypto-spec';

import {CryptoKeyId} from './crypto-key-id';
export interface CryptoSpecShallowRecrypt extends CryptoSpec {
  newKeyId: CryptoKeyId;
}
