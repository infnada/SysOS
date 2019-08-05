import {DynamicData} from './dynamic-data';

import {ServiceLocatorCredential} from './service-locator-credential';
export interface ServiceLocator extends DynamicData {
  credential: ServiceLocatorCredential;
  instanceUuid: string;
  sslThumbprint?: string;
}
