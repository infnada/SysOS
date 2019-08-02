import {HostVirtualSwitchBridge} from "./host-cirtual-switch-bridge";
import {HostNetworkPolicy} from "./host-network-policy";

export interface HostVirtualSwitchSpec {
  bridge?: HostVirtualSwitchBridge;
  mtu?: number;
  numPorts: number;
  policy?: HostNetworkPolicy;
}
