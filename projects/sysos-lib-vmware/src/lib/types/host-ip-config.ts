import {HostIpConfigIpV6AddressConfiguration} from "./host-ip-config-ipv6-address-configuration";

export interface HostIpConfig {
  dhcp: boolean;
  ipAddress?: string;
  ipV6Config?: HostIpConfigIpV6AddressConfiguration;
  subnetMask?: string;
}
