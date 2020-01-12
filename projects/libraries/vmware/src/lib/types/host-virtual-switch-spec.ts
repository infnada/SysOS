import {DynamicData} from './dynamic-data';

import {HostVirtualSwitchBridge} from './host-virtual-switch-bridge';
import {HostNetworkPolicy} from './host-network-policy';
import {Int} from './int';
export interface HostVirtualSwitchSpec extends DynamicData {
  bridge?: HostVirtualSwitchBridge;
  mtu?: Int;
  numPorts: Int;
  policy?: HostNetworkPolicy;
}
