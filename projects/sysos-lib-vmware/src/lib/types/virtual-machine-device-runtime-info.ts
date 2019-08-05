import {DynamicData} from './dynamic-data';

import {VirtualMachineDeviceRuntimeInfoDeviceRuntimeState} from './virtual-machine-device-runtime-info-device-runtime-state';
import {Int} from './int';
export interface VirtualMachineDeviceRuntimeInfo extends DynamicData {
  key: Int;
  runtimeState: VirtualMachineDeviceRuntimeInfoDeviceRuntimeState;
}
