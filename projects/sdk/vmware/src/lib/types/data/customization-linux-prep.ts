import {CustomizationIdentitySettings} from './customization-identity-settings';

import {CustomizationName} from './customization-name';

export interface CustomizationLinuxPrep extends CustomizationIdentitySettings {
  domain: string;
  hostName: CustomizationName;
  hwClockUTC?: boolean;
  timeZone?: string;
}