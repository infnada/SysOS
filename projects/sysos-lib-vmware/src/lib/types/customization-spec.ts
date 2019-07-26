import {CustomizationGlobalIPSettings} from "./customization-global-ip-settings";
import {CustomizationIdentitySettings} from "./customization-identity-settings";
import {CustomizationAdapterMapping} from "./customization-adapter-mapping";
import {CustomizationOptions} from "./customization-options";

export interface CustomizationSpec {
  encryptionKey?: string[];
  globalIPSettings: CustomizationGlobalIPSettings;
  identity: CustomizationIdentitySettings;
  nicSettingMap?: CustomizationAdapterMapping[];
  options?: CustomizationOptions;
}
