import {HostIpRouteConfig} from './host-ip-route-config';

import {HostVirtualNicConnection} from './host-virtual-nic-connection';

export interface HostIpRouteConfigSpec extends HostIpRouteConfig {
  gatewayDeviceConnection?: HostVirtualNicConnection;
  ipV6GatewayDeviceConnection?: HostVirtualNicConnection;
}