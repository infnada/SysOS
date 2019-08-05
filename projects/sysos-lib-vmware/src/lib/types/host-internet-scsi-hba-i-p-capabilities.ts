import {DynamicData} from './dynamic-data';

export interface HostInternetScsiHbaIPCapabilities extends DynamicData {
  addressSettable: boolean;
  alternateDnsServerAddressSettable: boolean;
  arpRedirectSettable?: boolean;
  defaultGatewaySettable: boolean;
  hostNameAsTargetAddress?: boolean;
  ipConfigurationMethodSettable: boolean;
  mtuSettable?: boolean;
  nameAliasSettable?: boolean;
  primaryDnsServerAddressSettable: boolean;
  subnetMaskSettable: boolean;
}
