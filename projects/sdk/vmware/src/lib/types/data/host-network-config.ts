import {DynamicData} from './dynamic-data';

import {HostIpRouteConfig} from './host-ip-route-config';
import {HostVirtualNicConfig} from './host-virtual-nic-config';
import {HostDhcpServiceConfig} from './host-dhcp-service-config';
import {HostDnsConfig} from './host-dns-config';
import {HostNatServiceConfig} from './host-nat-service-config';
import {HostNetworkConfigNetStackSpec} from './host-network-config-net-stack-spec';
import {PhysicalNicConfig} from './physical-nic-config';
import {HostPortGroupConfig} from './host-port-group-config';
import {HostProxySwitchConfig} from './host-proxy-switch-config';
import {HostIpRouteTableConfig} from './host-ip-route-table-config';
import {HostVirtualSwitchConfig} from './host-virtual-switch-config';

export interface HostNetworkConfig extends DynamicData {
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