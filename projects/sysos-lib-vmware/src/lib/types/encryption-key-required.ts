import {InvalidState} from './invalid-state';

import {CryptoKeyId} from './crypto-key-id';
export interface EncryptionKeyRequired extends InvalidState {
  requiredKey?: CryptoKeyId[];
}
