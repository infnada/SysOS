import {DynamicData} from './dynamic-data';

import {CustomizationIPSettings} from './customization-i-p-settings';

export interface WitnessNodeInfo extends DynamicData {
  biosUuid?: string;
  ipSettings: CustomizationIPSettings;
}