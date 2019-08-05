import {DynamicData} from './dynamic-data';

import {HostAuthenticationStoreInfo} from './host-authentication-store-info';
export interface HostAuthenticationManagerInfo extends DynamicData {
  authConfig: HostAuthenticationStoreInfo[];
}
