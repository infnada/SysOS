import {VirtualMachineBootOptionsBootableDevice} from './virtual-machine-boot-options-bootable-device';
import {Int} from './int';

export interface VirtualMachineBootOptionsBootableDiskDevice extends VirtualMachineBootOptionsBootableDevice {
  deviceKey: Int;
}
