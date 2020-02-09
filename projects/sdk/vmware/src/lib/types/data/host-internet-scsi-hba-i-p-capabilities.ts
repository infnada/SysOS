import {DynamicData} from './dynamic-data';


export interface HostInternetScsiHbaIPCapabilities extends DynamicData {
  addressSettable: boolean;
  alternateDnsServerAddressSettable: boolean;
  arpRedirectSettable?: boolean;
  defaultGatewaySettable: boolean;
  hostNameAsTargetAddress?: boolean;
  ipConfigurationMethodSettable: boolean;
  ipv4EnableSettable?: boolean;
  ipv6DefaultGatewaySettable?: boolean;
  ipv6DhcpConfigurationSettable?: boolean;
  ipv6EnableSettable?: boolean;
  ipv6LinkLocalAutoConfigurationSettable?: boolean;
  ipv6MaxStaticAddressesSupported?: number;
  ipv6PrefixLength?: number;
  ipv6PrefixLengthSettable?: boolean;
  ipv6RouterAdvertisementConfigurationSettable?: boolean;
  ipv6Supported?: boolean;
  mtuSettable?: boolean;
  nameAliasSettable?: boolean;
  primaryDnsServerAddressSettable: boolean;
  subnetMaskSettable: boolean;
}