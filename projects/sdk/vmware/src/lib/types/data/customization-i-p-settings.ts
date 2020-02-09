import {DynamicData} from './dynamic-data';

import {CustomizationIpGenerator} from './customization-ip-generator';
import {CustomizationIPSettingsIpV6AddressSpec} from './customization-i-p-settings-ip-v6address-spec';
import {CustomizationNetBIOSMode} from '../enums/customization-net-b-i-o-s-mode';

export interface CustomizationIPSettings extends DynamicData {
  dnsDomain?: string;
  dnsServerList?: string[];
  gateway?: string[];
  ip: CustomizationIpGenerator;
  ipV6Spec?: CustomizationIPSettingsIpV6AddressSpec;
  netBIOS?: CustomizationNetBIOSMode;
  primaryWINS?: string;
  secondaryWINS?: string;
  subnetMask?: string;
}