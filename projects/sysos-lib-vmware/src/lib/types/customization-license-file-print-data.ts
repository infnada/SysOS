import {DynamicData} from './dynamic-data';

import {CustomizationLicenseDataMode} from './customization-license-data-mode';
import {Int} from './int';
export interface CustomizationLicenseFilePrintData extends DynamicData {
  autoMode: CustomizationLicenseDataMode;
  autoUsers?: Int;
}
