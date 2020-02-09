import {DynamicData} from './dynamic-data';

import {VirtualMachineDeviceRuntimeInfoDeviceRuntimeState} from './virtual-machine-device-runtime-info-device-runtime-state';

export interface VirtualMachineDeviceRuntimeInfo extends DynamicData {
  key: number;
  runtimeState: VirtualMachineDeviceRuntimeInfoDeviceRuntimeState;
}