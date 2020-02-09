import {DynamicData} from './dynamic-data';

import {CustomizationGlobalIPSettings} from './customization-global-i-p-settings';
import {CustomizationIdentitySettings} from './customization-identity-settings';
import {CustomizationAdapterMapping} from './customization-adapter-mapping';
import {CustomizationOptions} from './customization-options';

export interface CustomizationSpec extends DynamicData {
  encryptionKey?: number[];
  globalIPSettings: CustomizationGlobalIPSettings;
  identity: CustomizationIdentitySettings;
  nicSettingMap?: CustomizationAdapterMapping[];
  options?: CustomizationOptions;
}