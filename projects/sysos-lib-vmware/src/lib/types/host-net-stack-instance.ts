import {HostDnsConfig} from "./host-dns-config";
import {HostIpRouteConfig} from "./host-ip-route-config";
import {HostIpRouteTableConfig} from "./host-ip-route-table-config";

export interface HostNetStackInstance {
  congestionControlAlgorithm?: string;
  dnsConfig?: HostDnsConfig;
  ipRouteConfig?: HostIpRouteConfig;
  ipV6Enabled?: boolean;
  key?: string;
  name?: string;
  requestedMaxNumberOfConnections?: number;
  routeTableConfig?: HostIpRouteTableConfig;
}
