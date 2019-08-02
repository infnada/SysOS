import {DistributedVirtualSwitchPortConnection} from "./distributed-virtual-switch-port-connection";
import {HostIpConfig} from "./host-ip-config";
import {HostVirtualNicIpRouteSpec} from "./host-virtual-nic-ip-route-spec";
import {HostVirtualNicOpaqueNetworkSpec} from "./host-virtual-nic-opaque-network-spec";

export interface HostVirtualNicSpec {
  distributedVirtualPort?: DistributedVirtualSwitchPortConnection;
  externalId?: string;
  ip?: HostIpConfig;
  ipRouteSpec?: HostVirtualNicIpRouteSpec;
  mac?: string;
  mtu?: number;
  netStackInstanceKey?: string;
  opaqueNetwork?: HostVirtualNicOpaqueNetworkSpec;
  pinnedPnic?: string;
  portgroup?: string;
  tsoEnabled?: boolean;
}
