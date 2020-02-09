import {DynamicData} from './dynamic-data';

import {CustomizationPassword} from './customization-password';

export interface CustomizationIdentification extends DynamicData {
  domainAdmin?: string;
  domainAdminPassword?: CustomizationPassword;
  joinDomain?: string;
  joinWorkgroup?: string;
}