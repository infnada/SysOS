import {DynamicData} from './dynamic-data';

import {CustomizationSpecInfo} from './customization-spec-info';
import {CustomizationSpec} from './customization-spec';

export interface CustomizationSpecItem extends DynamicData {
  info: CustomizationSpecInfo;
  spec: CustomizationSpec;
}