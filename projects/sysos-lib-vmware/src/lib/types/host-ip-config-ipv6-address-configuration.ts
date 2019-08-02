import {HostIpConfigIpV6Address} from "./host-ip-config-ipv6-address";

export interface HostIpConfigIpV6AddressConfiguration {
  autoConfigurationEnabled?: boolean;
  dhcpV6Enabled?: boolean;
  ipV6Address?: HostIpConfigIpV6Address[];
}
