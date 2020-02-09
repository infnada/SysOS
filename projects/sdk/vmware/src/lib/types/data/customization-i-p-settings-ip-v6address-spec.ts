import {DynamicData} from './dynamic-data';

import {CustomizationIpV6Generator} from './customization-ip-v6generator';

export interface CustomizationIPSettingsIpV6AddressSpec extends DynamicData {
  gateway?: string[];
  ip: CustomizationIpV6Generator[];
}