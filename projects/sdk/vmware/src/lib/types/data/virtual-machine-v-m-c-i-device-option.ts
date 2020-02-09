import {VirtualDeviceOption} from './virtual-device-option';

import {BoolOption} from './bool-option';
import {VirtualMachineVMCIDeviceOptionFilterSpecOption} from './virtual-machine-v-m-c-i-device-option-filter-spec-option';

export interface VirtualMachineVMCIDeviceOption extends VirtualDeviceOption {
  allowUnrestrictedCommunication: BoolOption;
  filterSpecOption?: VirtualMachineVMCIDeviceOptionFilterSpecOption;
  filterSupported?: BoolOption;
}