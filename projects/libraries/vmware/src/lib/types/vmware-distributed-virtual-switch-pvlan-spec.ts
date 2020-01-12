import {VmwareDistributedVirtualSwitchVlanSpec} from './vmware-distributed-virtual-switch-vlan-spec';
import {Int} from './int';

export interface VmwareDistributedVirtualSwitchPvlanSpec extends VmwareDistributedVirtualSwitchVlanSpec {
  pvlanId: Int;
}
