import {DynamicData} from './dynamic-data';

import {VirtualMachineBootOptionsBootableDevice} from './virtual-machine-boot-options-bootable-device';

export interface VirtualMachineBootOptions extends DynamicData {
  bootDelay?: number;
  bootOrder?: VirtualMachineBootOptionsBootableDevice[];
  bootRetryDelay?: number;
  bootRetryEnabled?: boolean;
  efiSecureBootEnabled?: boolean;
  enterBIOSSetup?: boolean;
  networkBootProtocol?: string;
}