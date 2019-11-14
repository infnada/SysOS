import {DynamicData} from './dynamic-data';
import {Int} from './int';

export interface HostInternetScsiHbaIPProperties extends DynamicData {
  address?: string;
  alternateDnsServerAddress?: string;
  arpRedirectEnabled?: boolean;
  defaultGateway?: string;
  dhcpConfigurationEnabled: boolean;
  jumboFramesEnabled?: boolean;
  mac?: string;
  mtu?: Int;
  primaryDnsServerAddress?: string;
  subnetMask?: string;
}
