import {DynamicData} from './dynamic-data';


export interface HostNetCapabilities extends DynamicData {
  canSetPhysicalNicLinkSpeed: boolean;
  dhcpOnVnicSupported: boolean;
  dnsConfigSupported: boolean;
  ipRouteConfigSupported: boolean;
  ipV6Supported: boolean;
  maxPortGroupsPerVswitch?: number;
  nicTeamingPolicy?: string[];
  supportsNetworkHints: boolean;
  supportsNicTeaming: boolean;
  supportsVlan: boolean;
  usesServiceConsoleNic: boolean;
  vnicConfigSupported: boolean;
  vswitchConfigSupported: boolean;
}