import {ServiceLocatorCredential} from './service-locator-credential';

export interface ServiceLocatorNamePassword extends ServiceLocatorCredential {
  password: string;
  username: string;
}
