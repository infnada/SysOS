import {CustomizationIpGenerator} from './customization-ip-generator';
import {CustomizationIPSettingsIpV6AddressSpec} from './customization-ip-settings-ipv6-address-spec';
import {CustomizationNetBIOSMode} from './customization-netbios-mode';

export interface CustomizationIPSettings {
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
