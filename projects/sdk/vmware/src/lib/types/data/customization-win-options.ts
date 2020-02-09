import {CustomizationOptions} from './customization-options';

import {CustomizationSysprepRebootOption} from '../enums/customization-sysprep-reboot-option';

export interface CustomizationWinOptions extends CustomizationOptions {
  changeSID: boolean;
  deleteAccounts: boolean;
  reboot?: CustomizationSysprepRebootOption;
}