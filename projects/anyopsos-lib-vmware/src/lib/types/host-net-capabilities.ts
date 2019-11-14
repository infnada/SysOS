import {DynamicData} from './dynamic-data';
import {Int} from './int';

export interface HostNetCapabilities extends DynamicData {
  canSetPhysicalNicLinkSpeed: boolean;
  dhcpOnVnicSupported: boolean;
  dnsConfigSupported: boolean;
  ipRouteConfigSupported: boolean;
  maxPortGroupsPerVswitch?: Int;
  nicTeamingPolicy?: string[];
  supportsNetworkHints: boolean;
  supportsNicTeaming: boolean;
  supportsVlan: boolean;
  usesServiceConsoleNic: boolean;
  vnicConfigSupported: boolean;
  vswitchConfigSupported: boolean;
}
