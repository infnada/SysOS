import {DynamicData} from './dynamic-data';

import {CustomizationIPSettings} from './customization-i-p-settings';
export interface CustomizationAdapterMapping extends DynamicData {
  adapter: CustomizationIPSettings;
  macAddress?: string;
}
