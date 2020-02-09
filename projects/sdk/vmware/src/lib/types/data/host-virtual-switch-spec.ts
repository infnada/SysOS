import {DynamicData} from './dynamic-data';

import {HostVirtualSwitchBridge} from './host-virtual-switch-bridge';
import {HostNetworkPolicy} from './host-network-policy';

export interface HostVirtualSwitchSpec extends DynamicData {
  bridge?: HostVirtualSwitchBridge;
  mtu?: number;
  numPorts: number;
  policy?: HostNetworkPolicy;
}