import {ServiceLocatorCredential} from './service-locator-credential';

export interface ServiceLocatorSAMLCredential extends ServiceLocatorCredential {
  token?: string;
}
