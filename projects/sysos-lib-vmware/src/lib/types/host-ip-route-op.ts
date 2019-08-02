import {HostIpRouteEntry} from "./host-ip-route-entry";

export interface HostIpRouteOp {
  changeOperation: string;
  route: HostIpRouteEntry;
}
