import {HostIpRouteOp} from "./host-ip-route-op";

export interface HostIpRouteTableConfig {
  ipRoute?: HostIpRouteOp[];
  ipv6Route?: HostIpRouteOp[];
}
