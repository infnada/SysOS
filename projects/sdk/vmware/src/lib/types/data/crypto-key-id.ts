import {DynamicData} from './dynamic-data';

import {KeyProviderId} from './key-provider-id';

export interface CryptoKeyId extends DynamicData {
  keyId: string;
  providerId?: KeyProviderId;
}