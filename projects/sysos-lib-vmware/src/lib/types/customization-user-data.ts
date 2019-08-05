import {DynamicData} from './dynamic-data';

import {CustomizationName} from './customization-name';
export interface CustomizationUserData extends DynamicData {
  computerName: CustomizationName;
  fullName: string;
  orgName: string;
  productId: string;
}
