import {VirtualMachineDeviceRuntimeInfoDeviceRuntimeState} from './virtual-machine-device-runtime-info-device-runtime-state';

import {VirtualMachineFeatureRequirement} from './virtual-machine-feature-requirement';
export interface VirtualMachineDeviceRuntimeInfoVirtualEthernetCardRuntimeState extends VirtualMachineDeviceRuntimeInfoDeviceRuntimeState {
  attachmentStatus?: string;
  featureRequirement?: VirtualMachineFeatureRequirement[];
  reservationStatus?: string;
}
