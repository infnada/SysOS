import {DynamicData} from './dynamic-data';

import {CustomizationPassword} from './customization-password';
import {Int} from './int';
export interface CustomizationGuiUnattended extends DynamicData {
  autoLogon: boolean;
  autoLogonCount: Int;
  password?: CustomizationPassword;
  timeZone: Int;
}
