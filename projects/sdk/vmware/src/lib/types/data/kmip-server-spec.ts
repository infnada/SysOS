import {DynamicData} from './dynamic-data';

import {KeyProviderId} from './key-provider-id';
import {KmipServerInfo} from './kmip-server-info';

export interface KmipServerSpec extends DynamicData {
  clusterId: KeyProviderId;
  info: KmipServerInfo;
  password?: string;
}