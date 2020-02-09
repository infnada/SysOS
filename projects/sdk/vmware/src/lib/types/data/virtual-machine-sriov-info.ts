import {VirtualMachinePciPassthroughInfo} from './virtual-machine-pci-passthrough-info';

import {VirtualMachineSriovDevicePoolInfo} from './virtual-machine-sriov-device-pool-info';

export interface VirtualMachineSriovInfo extends VirtualMachinePciPassthroughInfo {
  devicePool?: VirtualMachineSriovDevicePoolInfo;
  pnic?: string;
  virtualFunction: boolean;
}