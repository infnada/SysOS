export interface HostNetworkConfig {
  consoleIpRouteConfig?: HostIpRouteConfig;
  consoleVnic?: HostVirtualNicConfig[];
  dhcp?: HostDhcpServiceConfig[];
  dnsConfig?: HostDnsConfig;
  ipRouteConfig?: HostIpRouteConfig;
  ipV6Enabled?: boolean;
  nat?: HostNatServiceConfig[];
  netStackSpec?: HostNetworkConfigNetStackSpec[];
  pnic?: PhysicalNicConfig[];
  portgroup?: HostPortGroupConfig[];
  proxySwitch?: HostProxySwitchConfig[];
  routeTableConfig?: HostIpRouteTableConfig;
  vnic?: HostVirtualNicConfig[];
  vswitch?: HostVirtualSwitchConfig[];
}
