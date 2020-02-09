import {DynamicData} from './dynamic-data';

import {CustomizationLicenseDataMode} from '../enums/customization-license-data-mode';

export interface CustomizationLicenseFilePrintData extends DynamicData {
  autoMode: CustomizationLicenseDataMode;
  autoUsers?: number;
}