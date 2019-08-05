import {CustomizationIdentitySettings} from './customization-identity-settings';

import {CustomizationGuiRunOnce} from './customization-gui-run-once';
import {CustomizationGuiUnattended} from './customization-gui-unattended';
import {CustomizationIdentification} from './customization-identification';
import {CustomizationLicenseFilePrintData} from './customization-license-file-print-data';
import {CustomizationUserData} from './customization-user-data';
export interface CustomizationSysprep extends CustomizationIdentitySettings {
  guiRunOnce?: CustomizationGuiRunOnce;
  guiUnattended: CustomizationGuiUnattended;
  identification: CustomizationIdentification;
  licenseFilePrintData?: CustomizationLicenseFilePrintData;
  userData: CustomizationUserData;
}
