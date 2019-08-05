import {CustomizationOptions} from './customization-options';

import {CustomizationSysprepRebootOption} from './customization-sysprep-reboot-option';
export interface CustomizationWinOptions extends CustomizationOptions {
  changeSID: boolean;
  deleteAccounts: boolean;
  reboot?: CustomizationSysprepRebootOption;
}
