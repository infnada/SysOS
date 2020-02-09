import {CryptoSpecNoOp} from './crypto-spec-no-op';

import {CryptoKeyId} from './crypto-key-id';

export interface CryptoSpecRegister extends CryptoSpecNoOp {
  cryptoKeyId: CryptoKeyId;
}