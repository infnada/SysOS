import {VmwareDistributedVirtualSwitchVlanSpec} from './vmware-distributed-virtual-switch-vlan-spec';

import {NumericRange} from './numeric-range';
export interface VmwareDistributedVirtualSwitchTrunkVlanSpec extends VmwareDistributedVirtualSwitchVlanSpec {
  vlanId?: NumericRange[];
}
