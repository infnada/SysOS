import {KeyProviderId} from './key-provider-id';

export interface CryptoKeyId {
  keyId: string;
  providerId?: KeyProviderId;
}
