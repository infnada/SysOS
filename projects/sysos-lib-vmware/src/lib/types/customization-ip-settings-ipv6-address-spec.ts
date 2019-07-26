import {CustomizationIpV6Generator} from "./customization-ipv6-generator";

export interface CustomizationIPSettingsIpV6AddressSpec {
  gateway?: string[];
  ip: CustomizationIpV6Generator[];
}
