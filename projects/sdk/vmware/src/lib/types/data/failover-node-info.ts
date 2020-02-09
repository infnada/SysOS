import {DynamicData} from './dynamic-data';

import {CustomizationIPSettings} from './customization-i-p-settings';

export interface FailoverNodeInfo extends DynamicData {
  biosUuid?: string;
  clusterIpSettings: CustomizationIPSettings;
  failoverIp?: CustomizationIPSettings;
}