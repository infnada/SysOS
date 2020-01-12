import {DynamicData} from './dynamic-data';

import {CustomizationGlobalIPSettings} from './customization-global-i-p-settings';
import {CustomizationIdentitySettings} from './customization-identity-settings';
import {CustomizationAdapterMapping} from './customization-adapter-mapping';
import {CustomizationOptions} from './customization-options';
import {Byte} from './byte';
export interface CustomizationSpec extends DynamicData {
  encryptionKey?: Byte[];
  globalIPSettings: CustomizationGlobalIPSettings;
  identity: CustomizationIdentitySettings;
  nicSettingMap?: CustomizationAdapterMapping[];
  options?: CustomizationOptions;
}
