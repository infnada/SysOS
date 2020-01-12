import {DynamicData} from './dynamic-data';

import {VirtualMachineBootOptionsBootableDevice} from './virtual-machine-boot-options-bootable-device';
import {Long} from './long';
export interface VirtualMachineBootOptions extends DynamicData {
  bootDelay?: Long;
  bootOrder?: VirtualMachineBootOptionsBootableDevice[];
  bootRetryDelay?: Long;
  bootRetryEnabled?: boolean;
  efiSecureBootEnabled?: boolean;
  enterBIOSSetup?: boolean;
  networkBootProtocol?: string;
}
