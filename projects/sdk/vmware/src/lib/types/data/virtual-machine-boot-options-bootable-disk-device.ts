import {VirtualMachineBootOptionsBootableDevice} from './virtual-machine-boot-options-bootable-device';


export interface VirtualMachineBootOptionsBootableDiskDevice extends VirtualMachineBootOptionsBootableDevice {
  deviceKey: number;
}