import {DynamicData} from './dynamic-data';

import {CustomizationIPSettings} from './customization-i-p-settings';
export interface NodeNetworkSpec extends DynamicData {
  ipSettings: CustomizationIPSettings;
}
