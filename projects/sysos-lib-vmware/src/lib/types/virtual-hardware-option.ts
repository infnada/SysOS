import {DynamicData} from './dynamic-data';

import {LongOption} from './long-option';
import {IntOption} from './int-option';
import {ResourceConfigOption} from './resource-config-option';
import {VirtualDeviceOption} from './virtual-device-option';
import {Int} from './int';
export interface VirtualHardwareOption extends DynamicData {
  deviceListReadonly: boolean;
  hwVersion: Int;
  licensingLimit?: string[];
  memoryMB: LongOption;
  numCoresPerSocket: IntOption;
  numCPU: Int[];
  numCpuReadonly: boolean;
  numIDEControllers: IntOption;
  numNVDIMMControllers?: IntOption;
  numPCIControllers: IntOption;
  numSIOControllers: IntOption;
  numSupportedWwnNodes?: IntOption;
  numSupportedWwnPorts?: IntOption;
  numTPMDevices?: IntOption;
  numUSBControllers: IntOption;
  numUSBXHCIControllers: IntOption;
  resourceConfigOption: ResourceConfigOption;
  virtualDeviceOption: VirtualDeviceOption[];
}
