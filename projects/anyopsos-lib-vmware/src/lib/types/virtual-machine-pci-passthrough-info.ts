import {VirtualMachineTargetInfo} from './virtual-machine-target-info';

import {HostPciDevice} from './host-pci-device';
export interface VirtualMachinePciPassthroughInfo extends VirtualMachineTargetInfo {
  pciDevice: HostPciDevice;
  systemId: string;
}
