import {DynamicData} from './dynamic-data';

import {CustomizationIpGenerator} from './customization-ip-generator';
import {CustomizationNetBIOSMode} from './customization-net-b-i-o-s-mode';
export interface CustomizationIPSettings extends DynamicData {
  dnsDomain?: string;
  dnsServerList?: string[];
  gateway?: string[];
  ip: CustomizationIpGenerator;
  netBIOS?: CustomizationNetBIOSMode;
  primaryWINS?: string;
  secondaryWINS?: string;
  subnetMask?: string;
}
