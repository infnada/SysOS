import {VmwareDistributedVirtualSwitchVlanSpec} from './vmware-distributed-virtual-switch-vlan-spec';
import {Int} from './int';

export interface VmwareDistributedVirtualSwitchVlanIdSpec extends VmwareDistributedVirtualSwitchVlanSpec {
  vlanId: Int;
}
