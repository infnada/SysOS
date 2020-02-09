import {VirtualDevice} from './virtual-device';

import {VirtualMachineVMCIDeviceFilterInfo} from './virtual-machine-v-m-c-i-device-filter-info';

export interface VirtualMachineVMCIDevice extends VirtualDevice {
  allowUnrestrictedCommunication?: boolean;
  filterEnable?: boolean;
  filterInfo?: VirtualMachineVMCIDeviceFilterInfo;
  id?: number;
}