import {DynamicData} from './dynamic-data';

import {CryptoKeyId} from './crypto-key-id';

export interface VmDiskFileEncryptionInfo extends DynamicData {
  keyId?: CryptoKeyId;
}