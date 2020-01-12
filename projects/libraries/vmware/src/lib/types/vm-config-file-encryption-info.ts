import {DynamicData} from './dynamic-data';

import {CryptoKeyId} from './crypto-key-id';
export interface VmConfigFileEncryptionInfo extends DynamicData {
  keyId?: CryptoKeyId;
}
