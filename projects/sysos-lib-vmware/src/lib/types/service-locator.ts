import {ServiceLocatorCredential} from './service-locator-credential';

export interface ServiceLocator {
  credential: ServiceLocatorCredential;
  instanceUuid: string;
  sslThumbprint?: string;
  url: string;
}
