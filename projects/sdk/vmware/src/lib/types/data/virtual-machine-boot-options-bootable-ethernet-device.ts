import {VirtualMachineBootOptionsBootableDevice} from './virtual-machine-boot-options-bootable-device';


export interface VirtualMachineBootOptionsBootableEthernetDevice extends VirtualMachineBootOptionsBootableDevice {
  deviceKey: number;
}