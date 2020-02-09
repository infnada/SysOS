import {DynamicData} from './dynamic-data';

import {KeyProviderId} from './key-provider-id';
import {KmipServerInfo} from './kmip-server-info';

export interface KmipClusterInfo extends DynamicData {
  clusterId: KeyProviderId;
  servers?: KmipServerInfo[];
  useAsDefault: boolean;
}