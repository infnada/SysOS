import {DynamicData} from './dynamic-data';

import {DistributedVirtualSwitchPortConnection} from './distributed-virtual-switch-port-connection';
import {HostVirtualNicOpaqueNetworkSpec} from './host-virtual-nic-opaque-network-spec';

export interface HostVirtualNicConnection extends DynamicData {
  dvPort?: DistributedVirtualSwitchPortConnection;
  opNetwork?: HostVirtualNicOpaqueNetworkSpec;
  portgroup?: string;
}