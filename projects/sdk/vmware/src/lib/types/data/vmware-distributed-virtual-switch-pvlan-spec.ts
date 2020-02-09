import {VmwareDistributedVirtualSwitchVlanSpec} from './vmware-distributed-virtual-switch-vlan-spec';


export interface VmwareDistributedVirtualSwitchPvlanSpec extends VmwareDistributedVirtualSwitchVlanSpec {
  pvlanId: number;
}