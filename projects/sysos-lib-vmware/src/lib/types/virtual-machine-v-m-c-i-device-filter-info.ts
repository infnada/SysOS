import {DynamicData} from './dynamic-data';

import {VirtualMachineVMCIDeviceFilterSpec} from './virtual-machine-v-m-c-i-device-filter-spec';
export interface VirtualMachineVMCIDeviceFilterInfo extends DynamicData {
  filters?: VirtualMachineVMCIDeviceFilterSpec[];
}
