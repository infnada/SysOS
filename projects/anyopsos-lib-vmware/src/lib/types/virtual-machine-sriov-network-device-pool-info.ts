import {VirtualMachineSriovDevicePoolInfo} from './virtual-machine-sriov-device-pool-info';

export interface VirtualMachineSriovNetworkDevicePoolInfo extends VirtualMachineSriovDevicePoolInfo {
  switchKey?: string;
}
