import {VirtualDeviceBackingInfo} from './virtual-device-backing-info';

import {DistributedVirtualSwitchPortConnection} from './distributed-virtual-switch-port-connection';

export interface VirtualEthernetCardDistributedVirtualPortBackingInfo extends VirtualDeviceBackingInfo {
  port: DistributedVirtualSwitchPortConnection;
}