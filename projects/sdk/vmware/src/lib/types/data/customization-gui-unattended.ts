import {DynamicData} from './dynamic-data';

import {CustomizationPassword} from './customization-password';

export interface CustomizationGuiUnattended extends DynamicData {
  autoLogon: boolean;
  autoLogonCount: number;
  password?: CustomizationPassword;
  timeZone: number;
}