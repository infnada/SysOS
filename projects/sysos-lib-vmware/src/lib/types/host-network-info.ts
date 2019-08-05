import {DynamicData} from './dynamic-data';

import {HostIpRouteConfig} from './host-ip-route-config';
import {HostVirtualNic} from './host-virtual-nic';
import {HostDhcpService} from './host-dhcp-service';
import {HostDnsConfig} from './host-dns-config';
import {HostNatService} from './host-nat-service';
import {HostNetStackInstance} from './host-net-stack-instance';
import {HostOpaqueNetworkInfo} from './host-opaque-network-info';
import {HostOpaqueSwitch} from './host-opaque-switch';
import {PhysicalNic} from './physical-nic';
import {HostPortGroup} from './host-port-group';
import {HostProxySwitch} from './host-proxy-switch';
import {HostIpRouteTableInfo} from './host-ip-route-table-info';
import {HostVirtualSwitch} from './host-virtual-switch';
export interface HostNetworkInfo extends DynamicData {
  consoleIpRouteConfig?: HostIpRouteConfig;
  consoleVnic?: HostVirtualNic[];
  dhcp?: HostDhcpService[];
  dnsConfig?: HostDnsConfig;
  ipRouteConfig?: HostIpRouteConfig;
  nat?: HostNatService[];
  netStackInstance?: HostNetStackInstance[];
  opaqueNetwork?: HostOpaqueNetworkInfo[];
  opaqueSwitch?: HostOpaqueSwitch[];
  pnic?: PhysicalNic[];
  portgroup?: HostPortGroup[];
  proxySwitch?: HostProxySwitch[];
  routeTableInfo?: HostIpRouteTableInfo;
  vnic?: HostVirtualNic[];
  vswitch?: HostVirtualSwitch[];
}
