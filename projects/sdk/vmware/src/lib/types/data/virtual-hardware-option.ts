import {DynamicData} from './dynamic-data';

import {LongOption} from './long-option';
import {IntOption} from './int-option';
import {ResourceConfigOption} from './resource-config-option';
import {VirtualDeviceOption} from './virtual-device-option';

export interface VirtualHardwareOption extends DynamicData {
  deviceListReadonly: boolean;
  hwVersion: number;
  licensingLimit?: string[];
  memoryMB: LongOption;
  numCoresPerSocket: IntOption;
  numCPU: number[];
  numCpuReadonly: boolean;
  numIDEControllers: IntOption;
  numNVDIMMControllers?: IntOption;
  numPCIControllers: IntOption;
  numPS2Controllers: IntOption;
  numSIOControllers: IntOption;
  numSupportedWwnNodes?: IntOption;
  numSupportedWwnPorts?: IntOption;
  numTPMDevices?: IntOption;
  numUSBControllers: IntOption;
  numUSBXHCIControllers: IntOption;
  resourceConfigOption: ResourceConfigOption;
  virtualDeviceOption: VirtualDeviceOption[];
}