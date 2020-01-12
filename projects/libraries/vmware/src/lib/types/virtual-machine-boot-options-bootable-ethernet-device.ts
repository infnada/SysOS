import {VirtualMachineBootOptionsBootableDevice} from './virtual-machine-boot-options-bootable-device';
import {Int} from './int';

export interface VirtualMachineBootOptionsBootableEthernetDevice extends VirtualMachineBootOptionsBootableDevice {
  deviceKey: Int;
}
