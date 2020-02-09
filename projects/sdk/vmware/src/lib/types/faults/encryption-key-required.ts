import {InvalidState} from './invalid-state';

import {CryptoKeyId} from '../data/crypto-key-id';

export interface EncryptionKeyRequired extends InvalidState {
  requiredKey?: CryptoKeyId[];
}